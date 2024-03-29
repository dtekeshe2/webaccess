package zw.co.telecel.vas.services;

import com.google.inject.Guice;
import com.google.inject.Injector;
import zw.co.telecel.dto.DataBundleDTO;
import zw.co.telecel.vas.dao.UserDao;
import zw.co.telecel.vas.dto.WebAccessCommand;
import zw.co.telecel.vas.model.BalanceDTO;
import zw.co.telecel.vas.model.User;
import zw.co.telecel.vas.services.billing.inject.BillingPlatformInterfaceModule;
import zw.co.telecel.vas.services.legacy.billing.BillingPlatformInterface;
import zw.co.telecel.vas.services.legacy.impl.DatabaseBackedSecurityTokenSender;
import zw.co.telecel.vas.services.legacy.impl.RegisterCommandProcessor;
import zw.co.telecel.vas.services.legacy.impl.WebAccessCommandProcessor;
import zw.co.telecel.vas.util.TransactionException;
import zw.co.telecel.vas.util.legacy.HttpResponseWriter;
import zw.co.telecel.vas.util.legacy.WebAccessCommandParser;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Map;
import static java.util.UUID.randomUUID;

import static zw.co.telecel.vas.services.util.Util.*;

/**
 * david@tekeshe.com
 */

@javax.servlet.annotation.WebServlet ( name = "webAccess", value = {"/billing-platform"}, asyncSupported = true,
                                        initParams = { @WebInitParam(name = "thread-pool-size", value = "3") } )
public class HttpBillingPlatformInterface extends HttpServlet {

    private BillingPlatformInterface billingPlatformInterface;

    private WebAccessCommandProcessor registrationCommandProcessor;
    /**
     *
     * Init resources
     *
     * @throws javax.servlet.ServletException
     */
    public void init() throws ServletException {

        Injector injector = Guice.createInjector(new BillingPlatformInterfaceModule());
        billingPlatformInterface = injector.getInstance(BillingPlatformInterface.class);

        registrationCommandProcessor = new RegisterCommandProcessor(new DatabaseBackedSecurityTokenSender());
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {

            WebAccessCommand webAccessCommand = WebAccessCommandParser.parse(request.getParameter("service-command"));
            Map<String, String[]> params = request.getParameterMap();
            String mobileNumber = params.get("mobile-number") != null ? params.get("mobile-number")[0] : null;

            switch (webAccessCommand) {
                case REGISTER_SUBSCRIBER:

                    if ( ! "PREPAID".equalsIgnoreCase(billingPlatformInterface.subscribedPackage(mobileNumber)) )
                        throw new TransactionException("This service is for prepaid customers only");

                    registrationCommandProcessor.process( request.getParameterMap(),
                                                           webAccessCommand,
                                                            null, response);

                case GET_MOBILE_ACCOUNT_LIST:
                    HttpResponseWriter.write( billingPlatformInterface.balances( mobileNumber ), response );
                    break;

                case DATA_BUNDLE_PRICE_LIST:
                    HttpResponseWriter.write( billingPlatformInterface.dataBundleList(), response );
                    break;

                case DATA_BUNDLE_PURCHASE:
                    String uuid = randomUUID().toString().replaceAll("-","").toUpperCase();
                    String productCode = params.get("product-code")[0];
                    String beneficiaryId = params.get("beneficiary-id")[0];
                    String paymentMethod = params.get("payment-method")[0];
                    String oneTimePassword = params.get("one-time-password")[0];
                    String dataBundleServiceCommand = params.get("data-bundle-service-command")[0];

                    BalanceDTO[] dataBundlePurchaseResult
                            = billingPlatformInterface.dataBundlePurchase(
                                                            uuid, mobileNumber, productCode, beneficiaryId,
                                                            paymentMethod, oneTimePassword, dataBundleServiceCommand );
                    DataBundleDTO dataBundle = billingPlatformInterface.dataBundleList().get(productCode);
                    String[] result = dataBundleResponse (  dataBundlePurchaseResult,
                                                            dataBundle,
                                                            paymentMethod,
                                                            dataBundleServiceCommand );
                    HttpResponseWriter.write(result[0], response );

                    User source = UserDao.findUser( mobileNumber );

                    // Notify source device
                    billingPlatformInterface.sendMessage(
                            new BigInteger("" + (System.currentTimeMillis() + 1)),
                            "SMS".equalsIgnoreCase(source.getNotificationAgent())
                                    ? source.getMobileNumber() : source.getEmailAddress(),
                            source.getNotificationAgent(), result[0] );

                    User beneficiary = null;

                    if (! mobileNumber.equals( beneficiaryId ) ) {

                        try {
                            beneficiary = UserDao.findUser(beneficiaryId);
                        } catch (Exception e) {
                        }

                        // Notify beneficiary device
                        billingPlatformInterface.sendMessage(
                                new BigInteger("" + (System.currentTimeMillis() + 2)),
                                beneficiary != null && !"SMS".equalsIgnoreCase(beneficiary.getNotificationAgent())
                                        ? beneficiary.getEmailAddress() : beneficiaryId,
                                beneficiary == null ? "SMS" : source.getNotificationAgent(), result[1]);
                    }

                    persistDataBundleResponse(  "" + (System.currentTimeMillis() + 3),
                                                dataBundlePurchaseResult,
                                                dataBundle,
                                                paymentMethod);

                    break;

                case AIRTIME_TRANSFER:

                    uuid = randomUUID().toString().replaceAll("-","").toUpperCase();
                    beneficiaryId = params.get("beneficiary-id")[0];
                    BigDecimal amount = new BigDecimal(params.get("amount")[0]);
                    paymentMethod = null;
                    oneTimePassword = null;
                    try {
                        paymentMethod = params.get("payment-method")[0];
                        oneTimePassword = params.get("one-time-password")[0];
                    } catch(Exception e) {
                        e.printStackTrace();
                    }

                    BalanceDTO[] balances =
                            billingPlatformInterface.transfer(
                                    uuid, mobileNumber, beneficiaryId, amount, paymentMethod, oneTimePassword);
                    // Call prepaid platform
                    result = balanceTransferResponse( balances, amount, uuid, paymentMethod );

                    // Notify web user
                    HttpResponseWriter.write( result[0], response );

                    source = UserDao.findUser( mobileNumber );
                    beneficiary = null;
                    try {
                        beneficiary = UserDao.findUser(beneficiaryId);
                    }catch(Exception e ){
                    }

                    // Notify source device
                    billingPlatformInterface.sendMessage(
                            new BigInteger("" + (System.currentTimeMillis() + 1)),
                            "SMS".equalsIgnoreCase(source.getNotificationAgent())
                                    ? source.getMobileNumber() : source.getEmailAddress(),
                            source.getNotificationAgent(), result[0] );

                    // Notify beneficiary device
                    billingPlatformInterface.sendMessage(
                            new BigInteger("" + System.currentTimeMillis() + 4 ),
                            beneficiary != null && !"SMS".equalsIgnoreCase( beneficiary.getNotificationAgent())
                                    ? beneficiary.getEmailAddress() : beneficiaryId,
                            beneficiary == null ? "SMS" : source.getNotificationAgent(), result[1] );

                    persistBalanceTransferResponse(     balances,
                                                        amount,
                                                        "" + (System.currentTimeMillis() + 5),
                                                        paymentMethod );

                    break;

                case VOUCHER_RECHARGE:
                    try {
                        uuid = randomUUID().toString().replaceAll("-", "").toUpperCase();
                        beneficiaryId = params.get("beneficiary-id")[0];
                        String rechargeVoucher = params.get("recharge-voucher")[0];

                        BalanceDTO rechargeResult = billingPlatformInterface.recharge(uuid, beneficiaryId, rechargeVoucher);

                        String[] rechargeResponse = voucherRechargeResponse(uuid, mobileNumber, rechargeResult);

                        // Notify web user
                        HttpResponseWriter.write(rechargeResponse[0], response);

                        source = UserDao.findUser(mobileNumber);

//                    Notify source device
                        billingPlatformInterface.sendMessage(
                                new BigInteger("" + (System.currentTimeMillis() + 1)),
                                "SMS".equalsIgnoreCase(source.getNotificationAgent())
                                        ? source.getMobileNumber() : source.getEmailAddress(),
                                source.getNotificationAgent(), rechargeResponse[0]);

                        // Notify beneficiary if different from source
                        if (rechargeResponse.length == 2) {
                            try {
                                beneficiary = UserDao.findUser(beneficiaryId);
                            } catch (Exception e) {
                                beneficiary = null;
                            }

                            billingPlatformInterface.sendMessage(
                                    new BigInteger("" + (System.currentTimeMillis() + 2)),
                                    beneficiary != null && !"SMS".equalsIgnoreCase(beneficiary.getNotificationAgent())
                                            ? beneficiary.getEmailAddress() : beneficiaryId,
                                    beneficiary == null ? "SMS" : source.getNotificationAgent(), rechargeResponse[1]);
                        }

                        persistVoucherRechargeResponse( "" + (System.currentTimeMillis() + 1),
                                                        mobileNumber,
                                                        rechargeResult,
                                                        "VOUCHER");
                    } catch( Exception e ) {
                        HttpResponseWriter.write(e.getMessage(), response);
                    }
                    break;

                case TRANSACTION_HISTORY:
                    HttpResponseWriter.write( transactionHistory( mobileNumber,
                                                                  billingPlatformInterface.dataBundleList() ),
                                              response );
                    break;
            }
        } catch ( Exception e ) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            HttpResponseWriter.write(
                    e != null ? e.getMessage() : "System error occurred. Please retry in a few minutes", response );
        }
    }

    /**
     * Reclaim resources.
     */
    public void destroy() {
    }
}
