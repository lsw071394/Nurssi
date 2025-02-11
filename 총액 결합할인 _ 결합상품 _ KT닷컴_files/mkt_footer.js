/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

var $j = jQuery.noConflict() , $ = $j;

// DATA - 배포파일(cashing)
var cfmFooterNow = new Date();
var cfmFooterVersion = '?version=' + cfmFooterNow.getFullYear() +''+ (cfmFooterNow.getMonth()+1) +''+ cfmFooterNow.getDate() +''+ cfmFooterNow.getHours();
document.write('<script src="' + cfm_domain + '/js/json/'+ mKt_common.pageType() +'_footer_html.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //푸터
document.write('<script src="' + cfm_domain + '/js/json/cl_smarttalk_txt.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //스마트톡(케이톡) 말풍선
document.write('<script src="' + cfm_domain + '/js/json/cl_footer_tab.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //TAB
document.write('<script src="' + cfm_domain + '/js/json/cl_footer_tabBtn.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //TAB 버튼(메인만노출)-2차
document.write('<script src="' + cfm_domain + '/js/json/cl_footer_tab_mypage.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //TAB
document.write('<script src="' + cfm_domain + '/js/json/cl_footer_tab_benefit.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //TAB

var smartTalkTxt = [];          //케이톡 데이터
var rollingSmartTalkLinkTxt;    //말풍선 롤링
var rollingSmartTalkLinkCnt = 0; //말풍선 카운터

var cfmFooterOptions = '';
var cfmFooterNowDate;
var cfmFooterAreaTarget = '#mCfm'+ ktChannel +'Footer ';
var cfmFooterAreaHtml = {

	//초기화 & 세팅
	init: function(options){        
        if(mKt_common.isNull(options) == ''){
            cfmFooterOptions = '';
        }else{
            cfmFooterOptions = options;
        }

        //screen API
        mKt_api.statsScreen(); 

        if(!mKtHIDEFOOTER){
            if(!appChk){ //모바일웹(앱이아닌경우)

                //Html import
                document.writeln(cfmFooterDiv);
            }
        }
	},

    //페이지통계
    statPage: function(){
        common_log.log('mkt_footer.js statPage() [s.pageName:'+ s.pageName +', muCd: '+ ktMenuCd +', ktMenuCode: '+ ktMenuCode +']');

        //0709 캠페인 오퍼,반응 정보
        try {
            ot.m.muCd = ktMenuCd;
        } catch(e) {
            common_log.log('mkt_footer.js ot.m.muCd [' + e.message + ']');
        }

        if(mKt_common.isNull(s.pageName) != ''){
            if(!appChk){ //모바일웹(앱이아닌경우)
                //Adobe, 구글
                try{ 
                    _satellite.pageBottom();
                }catch(e){
                    common_log.log('mkt_footer.js _satellite.pageBottom() [' + e.message + ']');
                };

                //구마케팅시스템 klog
                klog.cookietrace(s.pageName, null, ktMenuCode);
            }       
            
            //온라인마케팅시스템 omsf
            try {
                o.m.muCd = ktMenuCd;
                omsf.pageLog();
            } catch(e){
                common_log.log('mkt_footer.js omsf.pageLog() [' + e.message + ']');
            }
        }
    },

    //페이지통계
    statPageLaunch: function(klogpageName){
        common_log.log('mkt_footer.js statPageLaunch() [_commonDL.pageInfo.page_name:'+ klogpageName +', muCd: '+ ktMenuCd +', ktMenuCode: '+ ktMenuCode +']');
        
        //0709 캠페인 오퍼,반응 정보
        try {
            ot.m.muCd = ktMenuCd;
        } catch(e) {
            common_log.log('mkt_footer.js ot.m.muCd [' + e.message + ']');
        }

        try {
            if(mKt_common.isNull(klogpageName) != ''){
                if(!appChk){ //모바일웹(앱이아닌경우)    
                    //구마케팅시스템 klog
                    klog.cookietrace(klogpageName, null, ktMenuCode);
                }       
                
                //온라인마케팅시스템 omsf
               o.m.muCd = ktMenuCd;
               omsf.pageLog();
            }            
        } catch (e) {
            common_log.log('mkt_footer.js omsf.pageLog() [' + e.message + ']');
        }        
    },

    //TAB - 하단(home, 마이,혜택)-2차
    tabBar: function(){
        if(ktMenuCd != 'MBA000'){ //로그인 해당메뉴는 무조건 비노출 23 모바일 케이티 개편으로 마이 혜택 탭 미노출은 cms제어

            try {
                var tabHtml = $j('<aside class="floating-tabbar">'+
                        '	<div class="floating-tabbar-dim"></div>'+
                        '	<a role="button" href="javascript:mKt_common.ktMenuLinkStat(\''+cfmFooterTabJson[0].areaSetList[0].areaContsList[0].urlInfo+'\', \'^mKT-개인_공통^TabBar^'+cfmFooterTabJson[0].areaSetList[0].areaContsList[0].statInfo+'\',  \'_self\')" id="footerMyBtn">마이</a>'+
                        '   <a role="button" href="javascript:mKt_common.ktMenuLinkStat(\'' + cfm_domain +'\', \'^mKT-개인_공통^TabBar^홈\',  \'_self\')" class="btn-tabbar-home" role="button">홈</a>'+
                        '	<a role="button" href="javascript:mKt_common.ktMenuLinkStat(\''+cfmFooterTabJson[0].areaSetList[0].areaContsList[1].urlInfo+'\', \'^mKT-개인_공통^TabBar^'+cfmFooterTabJson[0].areaSetList[0].areaContsList[1].statInfo+'\',  \'_self\')" id="footerBenefitBtn">샵</a>'+
                        '</aside>');		
                        
                var mainHtml = $j('<main class="benefits tabbar-layer" aria-hidden="true"></main><main class="mypage tabbar-layer" aria-hidden="true"></main>');
                
                $j('main.cfmClmain').after(tabHtml);
                $j('body').append(mainHtml);
                
            
                //탭바버튼(메인만)
                //if($j('#ktMainYn').length){    
                    var html = $j('<div class="floating-tabbar-btn_wrap floating-tabbar-btn-5">');
                    
                    if(cfmFooterTabBtnJson.length > 0){
                        var liData = 0;
                        $j.each(cfmFooterTabBtnJson, function(i, item){
                            var li;
                            var itemFloatTarget = '';
                            
                            if(item.contsDivType=="24"){
                                if (item.mblNewWndwType !== undefined && item.svcUrl !== undefined) {
                                    if(item.mblNewWndwType == "01"){ //본창 _self
                                        li = $j('<a href="javascript:mKt_common.ktMenuLinkStat(\''+item.svcUrl+'\',\''+item.statInfo+'\', \'_self\' ,\''+item.menuCd+'\' )" class="btn-tabbar-link" role="button"><span><span class="wthtxt">' + item.subTitle +'</span></span></a>');
                                    }else if(item.mblNewWndwType == "02"){//새창 _blank
                                        li = $j('<a href="javascript:mKt_common.ktMenuLinkStat(\''+item.svcUrl+'\',\''+item.statInfo+'\',\'_blank\' ,\''+item.menuCd+'\' )" class="btn-tabbar-link" role="button" title="새창열림"><span><span class="wthtxt">' + item.subTitle +'</span></span></a>');
                                    }else if(item.mblNewWndwType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
                                        li = $j('<a href="javascript:mKt_common.ktMenuLinkStat(\''+item.svcUrl+'\',\''+item.statInfo+'\',\'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\',\''+item.menuCd+'\' )" class="btn-tabbar-link" role="button" title="새창열림"><span><span class="wthtxt">' + item.subTitle +'</span></span></a>');
                                    }
                                    itemFloatTarget = item.mblNewWndwType;
                                }
                            }else if(item.contsDivType=="25"){
                                if (item.floatTrgtType !== undefined && item.urlInfo !== undefined) {
                                    if(item.floatTrgtType == "01"){ //본창 _self
                                        li = $j('<a href="javascript:mKt_common.ktMenuLinkStat(\''+item.urlInfo+'\',\''+item.statInfo+'\',\'_self\' ,\''+item.menuCd+'\' )" class="btn-tabbar-link" role="button"><span><span class="wthtxt">' + item.title +'</span></span></a>');
                                    }else if(item.floatTrgtType == "02"){//새창 _blank
                                        li = $j('<a href="javascript:mKt_common.ktMenuLinkStat(\''+item.urlInfo+'\',\''+item.statInfo+'\', \'_blank\' ,\''+item.menuCd+'\' )" class="btn-tabbar-link" role="button" title="새창열림"><span><span class="wthtxt">' + item.title +'</span></span></a>');
                                    }else if(item.floatTrgtType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
                                        li = $j('<a href="javascript:mKt_common.ktMenuLinkStat(\''+item.urlInfo+'\',\''+item.statInfo+'\',\'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\' ,\''+item.menuCd+'\' )" class="btn-tabbar-link" role="button" title="새창열림"><span><span class="wthtxt">' + item.title +'</span></span></a>');
                                    }
                                    itemFloatTarget = item.floatTrgtType;
                                }
                            }

                            if (li !== undefined) {
                                liData = liData+1;
                                li.find('span:eq(0)').attr('style', 'background-image:url('+ cfm_domain + item.imgPath +')');
                                html.append(li);
                                
                                $j('.floating-tabbar-open').append(html);
                            }
                        });

                        if (liData == 0) {
                            $j('.btn-tabbar-open').attr("style","display:none");
                        }
                    }else{
                        $j('.btn-tabbar-open').attr("style","display:none");
                    }
                    
    
                    //tabHtml.find('.floating-tabbar-open').append(html);
                    floatOnload();
                    //ui('ASIDE', '.floating-tabbar'); //ui 처리 mkt_ui.js 호출 
                //}else{
                //  $j("#footermaintabberOpenbtn").remove();
                //}
            
                $j.each(cfmFooterTabMyPageJson[0].areaSetList[0].areaContsList, function(i, item){
                    $j("#footerMyBtn").html(item.htmlInfo);
                });
                $j.each(cfmFooterTabBenefitJson[0].areaSetList[0].areaContsList, function(i, item){
                    $j("#footerBenefitBtn").html(item.htmlInfo);
                });
                
                if(cfmFooterOptions.indexOf("SwitchBar:hide") !== -1){
                    loadTabBarChk = 'N';
                }
                
                if(mKt_common.isNull(loadTabBarChk) == 'N'){
                    tabHtml.attr('aria-hidden','true');
                    tabHtml.data('show', 'N');
                    //tabHtml.hide();
                    $j('aside.floating-tabbar').hide();
                }
                
            } catch (e) {
                common_log.log('mkt_footer.js cfmFooterAreaHtml.tabBar() [' + e.message + ']');
            }
				
        }
    },

    //TAB 로딩시 바로 노출시
   /* tabBarLoadShow: function(){
        var benefitsTab = (top.location.href.indexOf('#benefits') > -1 || top.location.href.indexOf('tab=benefits') > -1);
        var mypageTab = (top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('tab=mypage') > -1);
        
        if(benefitsTab){ //혜택
            $j('.floating-tabbar-be').trigger('click');                     
        }else if(mypageTab){ //마이
            $j('.floating-tabbar-my').trigger('click');         
        }               
    },*/

    //스마트톡(케이트톡) - 우측하단
    smartTalkIcon: function(){
        if(mKt_common.isNull(loadKTalkChk) != 'N'){
            var html = $j('<div class="footer-float-icon-item" id="cfmSmartTalk">'+
                        '   <div class="cfmSmartTalkLink">'+
                        '       <a href="#" title="새창" id="cfmSmartTalkLink">'+
                        '           <span class="cfmSmartTalkLinkImg"><span class="hidetxt">챗봇</span></span>'+
                        '           <span class="cfmSmartTalkLinkTxt" style="display:none;"><span class="cfmSmartTalkLinkTxtP"></span></span>'+
                        '       </a>'+
                        '   </div>'+
                        '   <div class="cfmSmartTalkLinkChatDiv" style="display:none;"></div>'+
                        '</div>');

            //$j(cfmFooterAreaTarget + '.footer-float-icon-div').prepend(html);
            $j(".footer-float-icon-item").last().before(html);
            //링크정보
            mKt_common.linkInfo('common', 'click', $j('.cfmSmartTalkLink a'), {}, '2');

            //컨텐츠-CMS
            try {
                var isShow = false;
                var areaData = cfmSmartTalkTxtJson[0];
                if ((areaData.showYn == 'Y' && areaData.showPerdType == '01') || (areaData.showYn == 'Y' && (cfmFooterNowDate >= areaData.showSdate && cfmFooterNowDate <= areaData.showEdate))){ //영역노출여부    
                    $j.each(areaData.areaSetList[0].areaContsList, function(i, item){
                        if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmFooterNowDate >= item.showSdate && cfmFooterNowDate <= item.showEdate))){
                            smartTalkTxt.push(item);
                            isShow = true;
                        }
                    });
                }

                if(areaData.omsShowYn == 'Y'){ //온마시 말풍선 연동
                    campaignChatbot();
                }else{ //CMS 스마트톡(케이톡) 말풍선 노출 - 2차                    
                    cfmFooterAreaHtml.smartTalkLinkTxt();
                }
            } catch(e) {
                common_log.log('mkt_footer.js smartTalkIcon() [' + e.message + ']');
            }         
        }
    },

    //스마트톡(케이톡) 말풍선 - CMS
    smartTalkLinkTxt: function(){
        var html = $j('#cfmSmartTalk');

        //설정 데이터 없을시
        if(smartTalkTxt.length == 0) smartTalkTxt.push({title: "무엇이든 물어보세요", statInfo: "무엇이든 물어보세요"});

        //문구 롤링
        html.find('.cfmSmartTalkLinkTxtP').html(smartTalkTxt[0].title);
        html.find('.cfmSmartTalkLinkTxtP').attr('data-urlInfo', smartTalkTxt[0].urlInfo);
        html.find('.cfmSmartTalkLinkTxtP').attr('data-statInfo', smartTalkTxt[0].statInfo);
        
        var th = html.find('.cfmSmartTalkLinkTxt');
        th.show();

        clearInterval(rollingSmartTalkLinkTxt);
        rollingSmartTalkLinkTxt = setInterval(function(){
			if (th.css('display') == 'none'){
				th.show();

				if((smartTalkTxt.length - 1) <= rollingSmartTalkLinkCnt){
					rollingSmartTalkLinkCnt = 0;
				}else{
					rollingSmartTalkLinkCnt += 1;
                }
			
                $j('.cfmSmartTalkLinkTxtP').html(smartTalkTxt[rollingSmartTalkLinkCnt].title);
                $j('.cfmSmartTalkLinkTxtP').attr('data-urlInfo', smartTalkTxt[rollingSmartTalkLinkCnt].urlInfo);
                $j('.cfmSmartTalkLinkTxtP').attr('data-statInfo', smartTalkTxt[rollingSmartTalkLinkCnt].statInfo);
			
			}
			else{
				th.hide();	
			}
        }, 5000);

    },

    //스마트톡(케이톡) 말풍선 - 온마시 callback
    callbackCampaignChatbot: function(type, result){
        if(type == 'success'){
            $j('.cfmSmartTalkLink .cfmSmartTalkLinkTxt').hide();
            $j('.cfmSmartTalkLinkChatDiv').show();
            $j('.cfmSmartTalkLinkChatDiv').html(result.html);

            //5초후 사라짐 추가 - 온경혁 2차
            setTimeout(function(){ 
                $j(".cfmSmartTalkLinkChatDiv").fadeOut().attr("aria-hiden", "true");
                cfmFooterAreaHtml.smartTalkView();
            }, 5000);
        }
    },

    /*CMS 챗봇말풍선 다시 보여줌
    * 온경혁2차에서 사라졌던 기능 재설정
    * 말풍선 재귀호출 로직 삽입하면서 온마시 말풍선 노출 후 CMS 챗봇말풍선 로직 추가
    */
    smartTalkView : function(){
        setTimeout(function(){ 
            $j('.cfmSmartTalkLinkChatDiv').hide();
            $j('.cfmSmartTalkLink .cfmSmartTalkLinkTxt').show();
            cfmFooterAreaHtml.smartTalkLinkTxt();
        }, 1000);
    }, 

    //매장찾기 - 우측하단
    fintShopIcon: function(){
        if(mKt_common.isNull(loadFintShopChk) == 'Y'){
            var html = $j('<div class="footer-float-icon-item">'+
            '   <div class="cfmFintShop">'+
            '       <a href="#" class="cfmFintShop-banner">'+
            '           <span class="cfmFintShopLinkTxt">가까운 대리점 찾기</span>'+
            '           <span class="cfmFintShopGudTxt"><em><em>가까운 대리점 찾기</em></em></span>'+
            '       </a>'+
            '   </div>'+
            '</div>');
            
            //5초후 사라짐 추가 - 2차
            setTimeout(function(){
            	$j('.cfmFintShopGudTxt').hide()
            }, 5000);
            
            //링크정보
            mKt_common.linkInfo('common', 'click', html.find('a'), {svcUrl:'https://m.help.kt.com/store/s_KtStoreSearch.do', statInfo:'^mKT-개인_공통^플로팅메뉴^매장찾기'}, '1');

            //$j(cfmFooterAreaTarget + '.footer-float-icon-div').prepend(html);
            //$j("#last-footer-float-icon-item").before(html);
            $j(".footer-float-icon-item").last().before(html);
        }
    },

    //만족도조사 - 우측하단
    satisfaction: function(){
        mKt_common.standAloneInfo(); //정보조회
        var isCookie = mKt_common.getArrayCookie('stsfcSurvey', sdegWidgetId);        
        if(mKt_common.isNull(loadStsfcSurveyChk) == 'Y' && isCookie === ''){
            var html = $j('<div class="footer-float-icon-item">'+
            '   <span class="btn-ffloat-icon">'+
            '       <a href="#" class="dispProtectedInfoBtn">'+
            '           <span class="hidetxt">만족도조사</span>'+
            '       </a>'+
            '   </span>'+
            '</div>');

            //링크정보
            mKt_common.linkInfo('common', 'click', html.find('a'), {svcUrl:'stsfcSurvey', statInfo:'^mKT-개인_공통^플로팅메뉴^만족도조사'}, '1');

            //$j(cfmFooterAreaTarget + '.footer-float-icon-div').prepend(html);
            //$j("#last-footer-float-icon-item").before(html);
            $j(".footer-float-icon-item").last().before(html);
        }
    }
}

$j(document).ready(function(){
    if(!mKtHIDEFOOTER){
        if(!appChk){ //모바일웹(앱이아닌경우)
            function loadScreenChk(){
                if(cfmloadScreen){	//screen API 로드 true   
                    cfmFooterNowDate = mKt_common.dateFormat('YYYY.MM.DD HH:mm:ss');

                    cfmFooterAreaHtml.tabBar(); // TAB
                    cfmFooterAreaHtml.satisfaction(); //만족도조사                    
                    cfmFooterAreaHtml.fintShopIcon(); //매장찾기 
                    cfmFooterAreaHtml.smartTalkIcon(); //스마트톡(케이트톡)	
                }else{
                    setTimeout(function(){ loadScreenChk(); }, 200);
                }
            }

            loadScreenChk();

            // Google Tag Manager
            try {
                if (mKt_common.isNull(googleTagBody) !== '') {
                    $j('body').prepend(googleTagBody);
                }
            } catch(e){
                common_log.log('Google Tag Magnger body [' + e.message + ']');
            }
        }

        if (kt_adobeLaunch !== 'Y') {cfmFooterAreaHtml.statPage();} //페이지통계 
    }
});