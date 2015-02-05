/*!CK:445188084!*//*1408338544,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["VXHuU"]); }

__d("TimelineCapsule",["Arbiter","CSS","DataStore","DOM","DOMQuery","DOMScroll","Parent","TimelineConstants","TimelineLegacySections","UserAgent_DEPRECATED","Vector","$","createArrayFrom","csx","isEmpty","queryThenMutateDOM"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){var w=(function(){var x=45,y=15,z={},aa={};function ba(oa){return h.hasClass(oa,'fbTimelineBalancer');}function ca(oa){return oa.getAttribute('data-spine');}function da(oa){return h.hasClass(oa,'placeholderUnit');}function ea(oa,pa){if(pa)return (i.get(n.DS_SIDEORG,oa.id)||oa.getAttribute('data-side'));return oa.getAttribute('data-side');}function fa(oa,pa){i.set(n.DS_SIDEORG,oa.id,ea(oa,true));oa.setAttribute('data-side',pa);}function ga(oa){return oa.getAttribute('data-size');}function ha(oa){if(h.hasClass(oa,'fbTimelineOneColumn')&&oa.prevSibling&&h.hasClass(oa.prevSibling,'fbTimelineOneColumn'))return y*2;if(h.hasClass(oa,'fbTimelineIndeterminateContent'))return 0;return y;}function ia(oa,pa){var qa=0;if(h.shown(oa)&&!h.hasClass(oa,'placeholderUnit'))qa=oa.offsetHeight+ha(oa);i.set(n.DS_HEIGHT,oa.id,parseInt(qa,10));}function ja(oa){var pa=i.get(n.DS_HEIGHT,oa.id,null);return pa;}function ka(oa,pa){if(ga(pa)=='2'){return 0;}else if(ea(pa)=='r'){return oa+ja(pa);}else return oa-ja(pa);}function la(oa){k.scry(oa,"._3ram").forEach(function(pa){var qa=pa.getAttribute('data-endmarker'),ra=pa.getAttribute('data-pageindex'),sa=function(){if(!pa.parentNode)return;i.set(n.DS_LOADED,oa.id,ra);j.remove(pa);g.inform(n.SECTION_FULLY_LOADED,{scrubberKey:qa,pageIndex:ra,capsuleID:oa.id,childCount:oa.childNodes.length});};if(o.get(qa)){sa();}else var ta=g.subscribe(n.SECTION_REGISTERED,function(ua,va){if(va.scrubberKey===qa){sa();ta.unsubscribe();}});});g.inform('TimelineCapsule/balanced',{capsule:oa});}function ma(oa){if(u(z[oa.id]))return;var pa=ba(oa)?oa.firstChild:oa,qa=pa.childNodes.length,ra={},sa={},ta,ua=y,va=y,wa,xa=[];for(var ya=0;ya<qa;ya++){ta=pa.childNodes[ya];if(h.hasClass(ta,'fbTimelineUnit')){wa=k.scry(ta,'div.timelineUnitContainer')[0];if(wa)sa[ta.id]=wa.getAttribute('data-time');if(!da(ta)&&h.shown(ta)){if(ga(ta)=='2'){ra[ta.id]=Math.max(ua,va);ua=va=ra[ta.id]+ja(ta);}else if(ea(ta)=='r'){ra[ta.id]=va;va+=ja(ta);}else{ra[ta.id]=ua;ua+=ja(ta);}if(ea(ta,true)=='l'||ga(ta)=='2')xa.push(ta.id);}}}for(ya=0;ya<xa.length-1;++ya){var za=xa[ya],ab=xa[ya+1],bb=ra[za]+x,cb=ra[ab];for(var db in z[oa.id]){if(bb>cb)break;var eb=z[oa.id][db];if(h.shown(eb))continue;if(sa[db]<=sa[za]&&sa[db]>sa[ab]){eb.style.top=bb+"px";bb+=x;h.show(eb);}}}}function na(oa,pa){var qa=m.byAttribute(oa,'data-size');if(qa){if(h.hasClass(oa.parentNode,'timelineReportContent')){pa(oa);}else pa(qa);w.balanceCapsule(m.byClass(qa,'fbTimelineCapsule'));}}return {removeUnit:function(oa){na(oa,function(pa){j.remove(pa);});},removeUnitWithID:function(oa){w.removeUnit(r(oa));},hideUnit:function(oa){na(oa,function(pa){h.addClass(pa,'fbTimelineColumnHidden');});},undoHideUnit:function(oa,pa){j.remove(m.byClass(pa,'hiddenText'));na(oa,function(qa){h.removeClass(qa,'fbTimelineColumnHidden');});},unplacehold:function(oa){var pa=r(oa);pa.style.top=null;h.removeClass(pa,'visiblePlaceholder');h.removeClass(pa,'placeholder');var qa=m.byClass(pa,'fbTimelineCapsule');delete z[qa.id][oa];w.balanceCapsule(qa);},scrollToCapsule:function(oa){if(!aa.hasOwnProperty(oa.id)){var pa=q.getElementPosition(oa.parentNode);l.scrollTo(new q(q.getScrollPosition().x,pa.y-n.SCROLL_TO_OFFSET,'document'));aa[oa.id]=true;}},balanceCapsuleFromChild:function(oa,pa){w.balanceCapsule(m.byClass(oa,'fbTimelineCapsule'),pa);},balanceCapsuleDeferred:function(oa,pa){setTimeout(w.balanceCapsule.bind(null,oa,pa),0);},balanceCapsule:function(oa,pa){if(!oa||!oa.childNodes)return;var qa=0,ra,sa=document.createDocumentFragment(),ta=[],ua=[],va=[],wa=false,xa=pa&&pa.heights_action;if(pa&&pa.tail_balance)i.set(n.DS_TAILBALANCE,oa.id,pa.tail_balance);if(p.chrome()||p.webkit())h.toggleClass(oa,'webkitFix');for(var ya=0;ya<oa.childNodes.length;ya++){ra=oa.childNodes[ya];if(ca(ra)){continue;}else if(ba(ra)){s(ra.firstChild.childNodes).forEach(function(gb){ia(gb,xa);});continue;}ia(ra,xa);if(ea(ra,true)=='r'){ua.push(ra);}else ta.push(ra);va.push(ra);if(ga(ra)!='2')if((qa>0&&ea(ra)=='r')||(qa<0&&ea(ra)=='l'))wa=true;qa=ka(qa,ra);}var za=[],ab=[],bb=[];k.scry(oa,'li.fbTimelineBalancer').forEach(function(gb){var hb=s(gb.firstChild.childNodes);if(gb.getAttribute('data-nonunits')){bb=bb.concat(hb);}else if(ea(gb)=='left'){za=za.concat(hb);}else if(ea(gb)=='right')ab=ab.concat(hb);});if(wa){oa.style.minHeight=oa.offsetHeight;ta.forEach(function(gb){if(ga(gb)!='2')fa(gb,'l');});ua.forEach(function(gb){if(ga(gb)!='2')fa(gb,'r');});var cb=j.create('li',{className:'fbTimelineBalancer'},j.create('ol',null,ta));cb.setAttribute('data-side','left');j.prependContent(oa,cb);za=ta.concat(za);var db=j.create('li',{className:'fbTimelineBalancer'},j.create('ol',null,ua));db.setAttribute('data-side','right');j.prependContent(oa,db);ab=ua.concat(ab);qa=0;}while(bb.length)sa.appendChild(bb.shift());while((qa>=0&&za.length)||(qa<0&&ab.length)){if(qa>=0){ra=za.shift();}else ra=ab.shift();sa.appendChild(ra);qa=ka(qa,ra);}oa.appendChild(sa);k.scry(oa,'li.fbTimelineBalancer').forEach(function(gb){if(!gb.firstChild.childNodes.length)j.remove(gb);});var eb=(pa&&pa.tail_balance)||i.get(n.DS_TAILBALANCE,oa.id);if(eb)qa=w.tailBalance(oa,qa,eb);if(wa){va.forEach(function(gb){if(gb.parentNode!==oa){oa.appendChild(gb);qa=ka(qa,gb);}});oa.style.minHeight=null;}var fb=m.byClass(oa,'fbTimelineSection');if(fb)i.set(n.DS_COLUMN_HEIGHT_DIFFERENTIAL,fb.id,qa);z[oa.id]={};k.scry(oa,'li.placeholderUnit').forEach(function(gb){z[oa.id][gb.id]=gb;});ma(oa);la(oa);},tailBalance:function(oa,pa,qa){if(!oa)return pa;var ra=[],sa=[],ta=[],ua=[];k.scry(oa,'li.fbTimelineBalancer').forEach(function(wa){var xa=s(wa.firstChild.childNodes);if(wa.getAttribute('data-nonunits')){ua=ua.concat(xa);}else if(ea(wa)=='left'){sa=sa.concat(xa);}else if(ea(wa)=='right')ta=ta.concat(xa);ra=ra.concat(xa);});if((qa==n.FIXED_SIDE_RIGHT&&sa.length)||(qa==n.FIXED_SIDE_LEFT&&ta.length))return pa;var va=document.createDocumentFragment();if(ra)while(ra.length){if(qa!=n.FIXED_SIDE_NONE)if(ga(ra[0])!='2')if(pa>=0){fa(ra[0],'l');}else fa(ra[0],'r');pa=ka(pa,ra[0]);va.appendChild(ra.shift());}oa.appendChild(va);k.scry(oa,'li.fbTimelineBalancer').forEach(function(wa){if(!wa.firstChild.childNodes.length)j.remove(wa);});return pa;},loadTwoColumnUnits:function(oa){var pa=r(oa);v(function(){var qa=m.byClass(pa,'fbTimelineSection');if(qa){var ra=k.find(pa,"._3rbf"),sa=k.find(pa,"._3rbh"),ta=sa.offsetHeight-ra.offsetHeight;i.set(n.DS_COLUMN_HEIGHT_DIFFERENTIAL,qa.id,ta);}},la.bind(null,pa));}};})();e.exports=a.TimelineCapsule||w;},null);
__d("TimelineCapsuleUtilities",["CSS"],function(a,b,c,d,e,f,g){var h={setFirstUnit:function(i){var j=true;for(var k=0;k<i.childNodes.length;++k){var l=i.childNodes[k];if(l.id.indexOf('tl_unit_')===0)if(j){j=false;g.addClass(l,'firstUnit');}else{g.removeClass(l,'firstUnit');break;}}}};e.exports=h;},null);
__d("TimelineComposer",["Arbiter","Bootloader","ComposerXMarauderLogger","ComposerXStore","CSS","DOM","Parent","Run","TimelineCapsule","TimelineCapsuleUtilities","$","getObjectValues","goURI"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t;function u(){i.logCompleted(t.id);}function v(x){if(x.hidePost){u();return;}if(x.redirect){var y=j.getAllForComposer(t.id);r(y).forEach(function(aa){if(aa.reset)aa.reset(aa);});s(x.redirect);u();return;}if(!x.streamStory){window.location.reload();return;}if(x.backdatedTime){h.loadModules(["TimelineStoryPublisher"],function(aa){aa.publish(x);});u();return;}var z=w.renderCapsuleBasedStory(t,x.streamStory);g.inform('TimelineComposer/on_after_publish',z,g.BEHAVIOR_PERSISTENT);u();}var w={init:function(x){t=q(x);var y=g.subscribe('composer/publish',function(event,z){if(z.composer_id===t.id)v(z);});n.onLeave(y.unsubscribe.bind(y));},renderCapsuleBasedStory:function(x,y){var z=m.byClass(x,'fbTimelineCapsule');if(!z)return;var aa=m.byClass(x,'fbTimelineUnit'),ba=aa.nextSibling;if(ba&&ba.getAttribute('data-spine'))aa=aa.nextSibling;l.insertAfter(aa,y);var ca=y;if(k.hasClass(y,'fbTimelineUnit'))ca=l.find(y,'div.timelineUnitContainer');h.loadModules(["Animation"],function(da){new da(ca).from('backgroundColor','#fff8dd').to('backgroundColor','#fff').duration(2000).ease(da.ease.both).go();});p.setFirstUnit(z);o.balanceCapsule(z);return y;}};e.exports=a.TimelineComposer||w;},null);
__d("TimelineUnitSelector",["DOMQuery","csx"],function(a,b,c,d,e,f,g,h){var i={getUnitsWithTime:function(j){var k=g.scry(j,"._5jmm[data-time]");return k[0]?k:g.scry(j,'div.timelineUnitContainer[data-time]');}};e.exports=i;},null);
__d("TimelineComposerUtilities",["Event","Arbiter","Bootloader","CSS","DOM","DOMQuery","Parent","TimelineUnitSelector","Vector","cx","csx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r=86400*31,s=86400000,t={listenToSetEstimatedDate:function(u,v){return h.subscribe('ComposerXTimelineTagger/init',function(w,x){if(l.contains(u,x.datePickerElement)){t.setEstimatedDate(x.datePickerInstance,v());x.composerTimelineTagger.switchToTagger('date');}});},listenToPublish:function(u,v){if(u.root)u=u.root;return h.subscribe('composer/publish',function(event,w){if(w.composer_id===u.id)i.loadModules(["TimelineStoryPublisher"],function(x){x.publish(w);v&&v();});});},listenToAnotherComposerOpen:function(u,v){return h.subscribe('composer/mutate',function(w,x){if(x!==u)v();});},listenToCancel:function(u,v){return g.listen(u,'click',function(event){if(m.byClass(event.getTarget(),"_306"))v();});},setEstimatedDate:function(u,v){var w,x;if(v&&j.hasClass(v,'fbTimelineCapsule')){w=v.getAttribute('data-start');x=v.getAttribute('data-end');if(w&&x){var y=new Date(x*1000),z=new Date();if(y>z){u.setDate(z.getFullYear(),z.getMonth()+1,z.getDate());}else if(x-w>2*r){u.setDate(y.getFullYear());}else u.setDate(y.getFullYear(),y.getMonth()+1);}return;}var aa=m.byClass(v,'fbTimelineCapsule');if(aa){w=aa.getAttribute('data-start');x=aa.getAttribute('data-end');var ba=o.getElementPosition(v).y,ca=[x,null],da=[w,null],ea=n.getUnitsWithTime(aa);for(var fa=0;fa<ea.length;fa++){var ga=ea[fa],ha=k.scry(ga.parentNode,'.spinePointer')[0];if(!ha)continue;var ia=o.getElementPosition(ha).y;if(ia<=ba){if(!ca[1]||ia>ca[1])ca=[ga.getAttribute('data-time'),ia];}else if(!da[1]||ia<da[1])da=[ga.getAttribute('data-time'),ia];}if(ca[0]!==null&&da[0]!==null){var ja=Math.round((parseInt(ca[0],10)+parseInt(da[0],10))/2)*1000;ja=Math.min(new Date()-s,ja);u.setDateWithTimestamp(ja);}}}};e.exports=t;},null);
__d("TimelineContentLoader",["Arbiter","CSS","DOM","DOMScroll","Event","OnVisible","Parent","ScrollingPager","TimelineConstants","TimelineController","TimelineLegacySections","TimelineSmartInsert","TimelineURI","UIPagelet","Vector","$","arrayContains","copyProperties","createArrayFrom","csx","debounce","ge","getElementText","startsWith","tx","userAction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea,fa){var ga=false,ha,ia=null,ja={},ka=[],la=[],ma=[],na={},oa={},pa={},qa={},ra=null,sa=false,ta=null;function ua(db,eb,fb,gb,hb){"use strict";this.node=db;this.loaded=gb;this.canScrollLoad=true;this.canUnload=eb!=cb.RECENT;this.scrubberKey=eb;this.historicUnitCount=hb;this._pageletLoadData=fb;this._expandPageletLoadData={};this.rightColumnFinished=false;}ua.prototype.load=function(db,eb){"use strict";if(this.loaded)return;var fb=this._pageletLoadData;g.inform(o.SECTION_LOADING,{data:fb,scrubberKey:this.scrubberKey});this.loaded=true;h.removeClass(this.node,'fbTimelineTimePeriodUnexpanded');h.removeClass(this.node,'fbTimelineTimePeriodSuppressed');var gb='ProfileTimelineSectionPagelet',hb=this.scrubberKey==cb.WAY_BACK;if(hb)gb='ProfileTimelineRemainingYearsPagelet';fb.highlight_unit_data=db;fb.parent_key=this.parentKey;fb.force_no_friend_activity=sa;h.conditionClass(this.node,'combinedSections',fb.combine_sections);h.conditionClass(this.node,'fbTimelineSectionLoading',!fb.combine_sections);this.canScrollLoad=false;var ib=null;if(eb&&!fb.combine_sections){this.node.style.minHeight=window.innerHeight+'px';ib=function(){this.node.style.minHeight='';za(this.scrubberKey);}.bind(this);}else if(fb.combine_sections)ib=function(){za(this.scrubberKey);cb.hideSection(this.scrubberKey);}.bind(this);var jb=fb.combine_sections&&hb;pa[this.scrubberKey]=t.loadFromEndpoint(gb,jb?fb.unit_container_id+'_left':this.node.id,fb,{usePipe:true,jsNonblock:true,constHeight:true,append:jb,finallyHandler:ib});ab();};ua.prototype.preload=function(){"use strict";h.addClass(this.node,'fbTimelineTimePeriodSuppressed');h.removeClass(this.node,'fbTimelineTimePeriodUnexpanded');var db=i.find(this.node,'span.sectionLabel');if(db.getAttribute('data-original-label')){i.setContent(db,db.getAttribute('data-original-label'));db.removeAttribute('data-original-label');}};ua.prototype.unload=function(){"use strict";if(!this.loaded||!this.canUnload)return;this.loaded=false;pa[this.scrubberKey]&&pa[this.scrubberKey].cancel();h.addClass(this.node,'fbTimelineTimePeriodUnexpanded');h.removeClass(this.node,'fbTimelineTimePeriodSuppressed');if(this.node.nextSibling&&h.hasClass(this.node.nextSibling,'fbTimelineSection')){i.setContent(this.node,this.node.nextSibling);h.show(this.node.firstChild);}else i.empty(this.node);this.deactivateScrollLoad();};ua.prototype.activateScrollLoad=function(){"use strict";this.canScrollLoad=true;h.removeClass(this.node,'fbTimelineTimePeriodSuppressed');h.addClass(this.node,'fbTimelineTimePeriodUnexpanded');oa[this.scrubberKey]&&oa[this.scrubberKey].reset();};ua.prototype.deactivateScrollLoad=function(){"use strict";if(!this.loaded){this.canScrollLoad=false;h.removeClass(this.node,'fbTimelineTimePeriodUnexpanded');h.addClass(this.node,'fbTimelineTimePeriodSuppressed');oa[this.scrubberKey]&&oa[this.scrubberKey].remove();}};ua.prototype.setExpandLoadData=function(db){"use strict";this._expandPageletLoadData=db;return this;};ua.prototype.appendData=function(db){"use strict";x(this._pageleLoadData,db);return this;};ua.prototype.expandSubSections=function(){"use strict";if(this.subSections.length)cb.navigateToSection(this.subSections[0].scrubberKey);};ua.prototype.expand=function(db){"use strict";if(!this.loaded)return;ra.add_event('expand_'+this.scrubberKey);var eb=i.find(this.node,'.fbTimelineSectionExpander');h.addClass(eb.firstChild,'async_saving');db&&h.addClass(db,'async_saving');cb.navigateToSection(this.scrubberKey);i.scry(this.node,'.fbTimelineCapsule').forEach(i.remove);this._expandPageletLoadData.new_expand=true;pa[this.scrubberKey]&&pa[this.scrubberKey].cancel();pa[this.scrubberKey]=t.loadFromEndpoint('ProfileTimelineSectionPagelet',eb.id,this._expandPageletLoadData,{usePipe:true,jsNonblock:true,constHeight:true});};ua.prototype.isPermalinkPeriod=function(){"use strict";return this._pageletLoadData.is_permalink_period;};ua.prototype.shouldCombineSections=function(){"use strict";return this._pageletLoadData.combine_sections;};function va(){if(ga)return;p.register(p.CONTENT,cb);ra=fa('timeline').uai('init','scrubber',false);ga=true;}var wa=aa(function(db,eb,fb){var gb=q.get(db).historicUnitCount;eb-=gb;fb-=1;if(gb==-1||fb<=0||eb<0)return;var hb=cb.getNextSectionKey(db);if(hb){q.get(hb).load();wa(hb,eb,fb);}},500);function xa(db,eb,fb,gb){var hb=cb.getNextSectionKey(eb);if(hb){oa[hb]=new l(db,ya.bind(null,hb),false,fb||1000);}else if(eb!==cb.WAY_BACK){gb=gb?gb:0;if(gb>80)return null;setTimeout(xa.bind(null,db,eb,fb,gb+1),250);}}function ya(db){var eb=q.get(db);if(eb&&eb.canScrollLoad){ra.add_event("scroll_load_"+db);eb.load();if(ta&&!eb.shouldCombineSections())wa(db,ta.required_units,ta.max_parallelism);}}function za(db){var eb=oa[db];if(eb){eb.remove();oa[db]=null;i.remove(eb.getElement());}}function ab(){var db,eb,fb=false;for(var gb=0;gb<ka.length;gb++){var hb=ka[gb];if(!hb)continue;var ib=q.get(hb);if(ib&&(ib.canScrollLoad||ib.loaded)){if(!ib.loaded){h.removeClass(ib.node,'fbTimelineTimePeriodSuppressed');h.addClass(ib.node,'fbTimelineTimePeriodUnexpanded');}if(db&&eb){bb(db,eb);if(fb)db.deactivateScrollLoad();fb=true;}db=null;eb=null;continue;}else if(db){eb=ib;ib.deactivateScrollLoad();}else{db=ib;if(fb)ib.activateScrollLoad();}h.removeClass(ib.node,'fbTimelineTimePeriodSuppressed');h.addClass(ib.node,'fbTimelineTimePeriodUnexpanded');}}function bb(db,eb){h.removeClass(eb.node,'fbTimelineTimePeriodUnexpanded');h.addClass(eb.node,'fbTimelineTimePeriodSuppressed');var fb=i.find(db.node,'span.sectionLabel'),gb=i.find(eb.node,'span.sectionLabel');if(!gb.getAttribute('data-original-label'))gb.setAttribute('data-original-label',ca(gb));if(fb.getAttribute('data-month')&&gb.getAttribute('data-month')&&fb.getAttribute('data-year')==gb.getAttribute('data-year')){i.setContent(gb,ea._("Show {month1} - {month2} {year}",{month1:gb.getAttribute('data-month'),month2:fb.getAttribute('data-month'),year:fb.getAttribute('data-year')}));}else if(fb.getAttribute('data-year')!==gb.getAttribute('data-year')){i.setContent(gb,ea._("Show {year1} - {year2}",{year1:gb.getAttribute('data-year'),year2:fb.getAttribute('data-year')}));}else i.setContent(gb,ea._("Show {year}",{year:gb.getAttribute('data-year')}));}var cb={WAY_BACK:'way_back',RECENT:'recent',HEADER_SCROLL_CUTOFF:80,CURRENT_SECTION_OFFSET:150,FOOTER_HEIGHT:60,registerTimePeriod:function(db,eb,fb,gb,hb,ib,jb){va();if(w(ma,eb))return;if(la)x(fb,la);var kb=new ua(db,eb,fb,gb,jb);if(!hb){ka[ib]=eb;ja[eb]=true;}else{kb.parentKey=hb;q.get(hb).subSections=q.get(hb).subSections||[];q.get(hb).subSections[ib]=kb;}if(kb.shouldCombineSections())p.hideStickyHeaderNavSectionMenu();q.set(eb,kb);cb.checkCurrentSectionChange();g.inform(o.SECTION_REGISTERED,{scrubberKey:eb,period:kb});},reset:function(){for(var db in oa)oa[db]&&oa[db].remove();for(var eb in pa)pa[eb]&&pa[eb].cancel();for(var fb in qa){qa[fb].unsubscribe();delete qa[fb];}ha&&ha.unsubscribe();ha=null;q.removeAll();ia=null;ja={};ka=[];la=[];ma=[];na={};oa={};pa={};ra=null;sa=false;ga=false;},checkCurrentSectionChange:function(){var db=cb.getCurrentSection(),eb=ia&&ia.scrubberKey;if(db&&db.scrubberKey!==eb&&!db.isPermalinkPeriod()){ia=db;var fb=db.scrubberKey,gb=db.parentKey;if(!gb){gb=fb;fb=null;}p.sectionHasChanged(gb,fb);}},setParallelLoadConfig:function(db){ta=db;},getCurrentSection:function(){var db={},eb=q.getAll();for(var fb in eb){var gb=eb[fb];if(!gb.loaded||na[gb.scrubberKey])continue;var hb=u.getElementPosition(gb.node,'viewport').y;if(gb.scrubberKey=='recent')hb--;if(hb<cb.CURRENT_SECTION_OFFSET)db[hb]=gb;}var ib=Math.max.apply(null,Object.keys(db)),jb=ib==-Infinity;if(!jb){return db[ib];}else if(ka[0])return q.get(ka[0]);return null;},capsuleForCurrentSection:function(){var db=cb.getCurrentSection();return db&&i.scry(db.node,'.fbTimelineCapsule')[0];},enableScrollLoad:function(db,eb,fb,gb){db=v(db);var hb=m.byClass(db,'fbTimelineSection')||db.parentNode,ib=hb&&i.scry(hb,'.fbTimelineCapsule')[0];if(!ib)return;if(fb===null){xa(db,eb,gb);}else p.runOnceWhenSectionFullyLoaded(xa.bind(null,db,eb,gb),eb,fb);},loadNextSectionOnClick:function(db,eb){db=v(db);k.listen(db,'click',function(fb){fb.prevent();i.remove(db);ya(cb.getNextSectionKey(eb));});},expandSectionOnClick:function(db,eb){k.listen(db,'click',function(fb){fb.prevent();q.get(eb).expand();});},expandSubSectionsOnClick:function(db,eb){k.listen(db,'click',function(fb){fb.prevent();q.get(eb).expandSubSections();});},getNextSectionKey:function(db){for(var eb=0;eb<ka.length-1;eb++)if(ka[eb]==db){while(eb<ka.length-1&&!ka[eb+1])eb++;return ka[eb+1];}var fb=q.get(db);if(!fb||!fb.parentKey)return;var gb=q.get(fb.parentKey);if(!gb)return;for(var hb=0;hb<gb.subSections.length-1;hb++)if(gb.subSections[hb].scrubberKey==db)return gb.subSections[hb+1].scrubberKey;},hideSection:function(db){var eb=q.get(db);eb&&h.hide(i.find(eb.node,'.fbTimelineSection'));var fb=p.getCurrentScrubber();if(fb){var gb=null;if(!ja[db]){var hb=eb.parentKey;gb=p.getCurrentScrubber().getSubnav(hb,db);}else gb=p.getCurrentScrubber().getNav(db);gb&&h.hide(gb);}var ib=p.getCurrentStickyHeaderNav();ib&&ib.removeTimePeriod(db);na[db]=true;},loadSectionOnClick:function(db,eb){k.listen(db,'click',function(fb){fb.prevent();q.get(eb).load();});},removeSection:function(db){for(var eb in ka)if(ka[eb]==db){ka[eb]=null;break;}q.remove(db);delete ja[db];if(db in oa){oa[db].remove();delete oa[db];}var fb=p.getCurrentStickyHeaderNav();fb&&fb.removeTimePeriod(db);ma.push(db);},removeSectionParent:function(db){i.remove(v(db).parentNode);},navigateToSection:function(db,eb,fb){ra.add_event("nav_"+db);eb=!!eb;var gb=db,hb=q.get(db);if(!hb)return;if(!hb.loaded){r.enable();i.scry(v('timeline_tab_content'),'.fbTimelineShowOlderSections').forEach(i.remove);}if(!ja[db]){if(!hb.loaded)hb.node.style.minHeight=u.getViewportDimensions().y+'px';var ib=g.subscribe(o.SECTION_FULLY_LOADED,function(pb,qb){if(qb.scrubberKey===db){hb.node.style.minHeight='';ib.unsubscribe();}});gb=hb.parentKey;var jb=q.get(gb).node;if(!h.hasClass(jb,'fbTimelineSectionExpanded')){j.scrollTo(jb,0);h.addClass(jb,'fbTimelineSectionExpanded');i.scry(jb,'.fbTimelineCapsule').forEach(i.remove);i.scry(jb,'div.fbTimelineSectionExpandPager').forEach(i.remove);i.scry(jb,'div.fbTimelineContentHeader').forEach(i.remove);i.scry(jb,"._5vf").forEach(function(pb){if(!pb.getAttribute('data-subsection'))i.remove(pb);});}var kb=cb.getNextSectionKey(gb);if(kb&&oa[kb])oa[kb].setBuffer(0);}for(var lb=0;lb<ka.length;lb++){var mb=ka[lb];if(!mb)continue;if(mb==gb)break;q.get(mb).deactivateScrollLoad();i.scry(v('timeline_tab_content'),'.fbTimelineSectionExpandPager').forEach(function(pb){var qb=n.getInstance(pb.id);qb&&qb.removeOnVisible();});}cb.adjustContentPadding();hb.load(fb,true);ab();var nb=u.getScrollPosition().x,ob=u.getElementPosition(hb.node).y;if(!eb)j.scrollTo(new u(nb,ob-o.SCROLL_TO_OFFSET,'document'),true,false,false,0,function(){var pb=u.getElementPosition(hb.node).y;j.scrollTo(new u(nb,pb-o.SCROLL_TO_OFFSET,'document'),false);var qb=i.scry(hb.node,'h3.uiHeaderTitle')[0];if(qb){qb.tabIndex=0;qb.focus();}});},adjustContentPadding:function(){var db=ba('timeline_tab_content');if(!db)return;if(p.isOneColumnMinimal())return;var eb=p.getCurrentKey()||s.TIMELINE_KEY;if(eb!==s.TIMELINE_KEY)return;var fb=ka.length-1,gb=q.get(ka[fb]);db.style.paddingBottom=gb&&gb.loaded?null:u.getViewportDimensions().y-cb.CURRENT_SECTION_OFFSET-cb.HEADER_SCROLL_CUTOFF-cb.FOOTER_HEIGHT+'px';},adjustContentPaddingAfterLoad:function(db,eb){p.runOnceWhenSectionFullyLoaded(cb.adjustContentPadding,db,eb);},appendContentAfterLoad:function(db,eb,fb){p.runOnceWhenSectionFullyLoaded(i.appendContent.bind(null,v(db),eb),fb,'0');},markSectionAsLoaded:function(db,eb,fb){p.runOnceWhenSectionFullyLoaded(function(){ba(db)&&h.removeClass(v(db).parentNode,'fbTimelineSectionLoading');},eb,fb);},suppressSectionsAbove:function(db){var eb,fb;for(var gb=0;gb<ka.length;gb++){var hb=ka[gb];if(!hb)continue;eb=q.get(hb).node;fb=null;if(y(db.parentNode.children).indexOf(db)<=y(eb.parentNode.children).indexOf(eb)){fb=hb;break;}q.get(hb).deactivateScrollLoad();}if(fb)cb.navigateToSection(fb,true);},forceNoFriendActivity:function(){sa=true;},removeDupes:function(db){var eb=ba(db);if(!eb)return;var fb=i.scry(eb,'li.fbTimelineUnit'),gb={};for(var hb=0;hb<fb.length;hb++){var ib=fb[hb];if(ib.id&&da(ib.id,'tl_unit_')){var jb=ib.id.substring(8,ib.id.length),kb=i.scry(ib,'div.timelineUnitContainer');if(kb.length>0)jb=jb+kb[0].getAttribute('data-time');if(gb.hasOwnProperty(jb)){ib.id='dupe_unit_'+Math.random();ib.className="hidden_elem";}else gb[jb]=1;}}},removeLoadingState:function(db){ba(db)&&h.removeClass(v(db),'fbTimelineSectionLoading');},setExpandLoadDataForSection:function(db,eb){var fb=q.get(db);fb&&fb.setExpandLoadData(eb);},appendSectionDataForAllSections:function(db){la=db;for(var eb=0;eb<ka.length-1;eb++){var fb=ka[eb];if(!fb)continue;var gb=q.get(fb);gb&&gb.appendData(db);}},updatePagerAfterLoad:function(db,eb,fb,gb,hb){var ib=n.getInstance(db.firstChild.id);if(!ib){qa[db.firstChild.id]=g.subscribe(n.REGISTERED,function(jb,kb){qa[db.firstChild.id].unsubscribe();delete qa[db.firstChild.id];if(kb.id===db.firstChild.id)cb.updatePagerAfterLoad(db,eb,fb,gb,hb);});return;}p.runOnceWhenSectionFullyLoaded(function(){h.removeClass(db,'fbTimelineHiddenPager');ib.checkBuffer();},fb,gb);if(hb)p.runOnceWhenSectionFullyLoaded(p.adjustScrollingPagerBuffer.bind(null,db.firstChild.id,eb),fb,gb);},showAfterLoad:function(db,eb,fb){p.runOnceWhenSectionFullyLoaded(function(){var gb=ba(db);gb&&h.show(gb);},eb,fb);},repositionDialog:function(db){g.subscribe(o.SECTION_LOADED,function(){db.updatePosition();});},rightColumnFinished:function(db){var eb=q.get(db);eb.rightColumnFinished=true;},addUnrankedUnits:function(db){var eb=v(db),fb=i.scry(eb,'li.fbTimelineUnit');for(var gb=fb.length-1;gb>=0;gb--){var hb=fb[gb];i.insertAfter(eb,hb);h.addClass(i.find(hb,'div.timelineUnitContainer'),'fbTimelineHighlightUnit');}i.remove(eb);}};e.exports=cb;},null);
__d("TimelineLogging",["TimelineController","reportData"],function(a,b,c,d,e,f,g,h){var i=false,j=0,k=null,l=null,m={init:function(n){if(i)return;j=n;g.register(g.LOGGING,this);},reset:function(){i=false;j=0;k=null;},log:function(n,o){o.profile_id=j;h(n,{gt:o});},logSectionChange:function(n,o){var p={timeline_section_change:1,key:n};if(k&&n==k){p.timeline_scrubber=1;k=null;}if(l&&n==l){p.sticky_header_nav=1;l=null;}m.log('timeline',p);},logScrubberClick:function(n){k=n;},logStickyHeaderNavClick:function(n){l=n;}};e.exports=m;},null);
__d("TimelineSpinelessComposer",["Arbiter","Bootloader","ComposerXMarauderLogger","CSS","Run","TimelineComposer","TimelineComposerUtilities","cx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o;function p(){i.logCompleted(o.id);}function q(s){if(s.hidePost){p();return;}if(!s.streamStory){window.location.reload();return;}if(s.backdatedTime){h.loadModules(["TimelineStoryPublisher"],function(t){t.publish(s);});p();return;}l.renderCapsuleBasedStory(o,s.streamStory);p();}var r={init:function(s){o=s;var t=g.subscribe('composer/publish',function(event,u){if(u.composer_id===o.id)q(u);});k.onLeave(t.unsubscribe.bind(t));}};e.exports=r;},null);
__d("TimelineStickyRightColumn",["Arbiter","CSS","DOMQuery","Event","PhotoSnowlift","Run","Style","TimelineContentLoader","Vector","csx","queryThenMutateDOM"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r=100,s=15,t=15,u=35,v=false,w=null,x=null,y,z,aa,ba,ca,da,ea,fa;function ga(){if(k.getInstance().isOpen)return;y=n.getCurrentSection();if(!y||!y.rightColumnFinished)return;var oa=i.scry(y.node,"._3rbf")[0],pa=i.scry(y.node,"._3rbh")[0];z=oa?oa.offsetHeight:0;aa=pa?pa.offsetHeight:0;ba=o.getViewportDimensions().y;ea=oa?o.getElementPosition(oa).y:0;fa=document.body.clientWidth<document.body.scrollWidth;}function ha(){if(!y||k.getInstance().isOpen)return;if(x&&x!==y){var oa=i.scry(x.node,"._3rbh")[0];if(oa)ja(oa,'','','');}var pa=i.scry(y.node,"._3rbh")[0];if(!pa)return;if(fa){ja(pa,'','','');return;}if(!y||!y.rightColumnFinished)return;ia(y);x=h.hasClass(pa,'fixed_always')?y:null;}function ia(oa){if(aa>=z||z<=ba)return;da=ca;ca=o.getScrollPosition().y;var pa,qa=i.scry(oa.node,"._3rbh")[0];if(!qa)return;if(ca<=ea-ka()){ja(qa,'','','');return;}if(z+ea<=ca+Math.min(aa+ka(),ba-t-u)){ja(qa,'absolute','',t+'px');return;}if(aa>ba-t-ka()){if(ca<da){var ra=false;if(qa.style.position==='absolute')if(qa.style.top!==''&&ca+ka()-ea<=parseInt(qa.style.top,10)){ra=true;}else if(qa.style.bottom!==''&&ca<=(ea+z-ka())-aa)ra=true;if(ra){ja(qa,'fixed',ka()+'px','');return;}else if(qa.style.position==='absolute'&&qa.style.top){return;}else if(h.hasClass(qa,'fixed_always')){if(parseInt(qa.style.top,10)>=ka())return;pa=ca-ea-(aa-(ba-u));if(da)pa+=da-ca;ja(qa,'absolute',pa+'px','');return;}}else{var sa=false;if(qa.style.position==='absolute'||(qa.style.position===''&&!h.hasClass(qa,'fixed_always'))){pa=qa.style.top?parseInt(qa.style.top,10):0;if(ca+ba>=ea+pa+aa+u)sa=true;}if(sa){pa=ba-aa-t-u;ja(qa,'fixed',pa+'px','');return;}else if(ca==da){return;}else if(h.hasClass(qa,'fixed_always')){if(parseInt(qa.style.top,10)>=ka()){pa=ca-ea+ka();if(da)pa+=da-ca;ja(qa,'absolute',pa+'px','');return;}}else if(qa.style.position==='absolute')return;}}else ja(qa,'fixed',ka()+'px','');}function ja(oa,pa,qa,ra){m.set(oa,'bottom',ra);if(pa==='fixed'){h.addClass(oa,'fixed_always');m.set(oa,'position','');}else{h.removeClass(oa,'fixed_always');m.set(oa,'position',pa);}m.set(oa,'top',qa);g.inform('reflow');}function ka(){return h.hasClass(document.documentElement,'tinyViewport')?s:r;}function la(){q(ga,ha);}function ma(){v=false;x=null;while(w.length)w.pop().remove();w=null;}var na={init:function(){if(v)return;v=true;w=[j.listen(window,'scroll',la),j.listen(window,'resize',la)];l.onLeave(ma);},adjust:function(){if(v){ga();ha();}}};e.exports=na;},null);