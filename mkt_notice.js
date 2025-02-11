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

//통합팝업
var mainNoticeResult;
var loopcount = 0;
var cfmPortalToastCnt = 0;
var cfmPortalMainToastHtml = '';
cfmPortalMainToastHtml += '<div class="main-popup-dim black-dim" style=" visibility: visible;" >';
cfmPortalMainToastHtml += '   <div class="cfm-layer layer-notice toast-type" id="mainpop02" style="display:none">';
cfmPortalMainToastHtml += '   	<h2 tabindex="0">메인팝업</h2>'; /* 20240207 웹접근성 개선 : 팝업 타이틀이 있는 경우 타이틀이 포커스 받을 수 있도록 유지 */
cfmPortalMainToastHtml += '   	<div class="layer-contents popup-layer-contents">';
cfmPortalMainToastHtml += '   		<div class="toast-swiper">';
cfmPortalMainToastHtml += '   			<div class="controls-direction">';
cfmPortalMainToastHtml += '   				<button role="button" class="swiper-button-prev"><span class="hidetxt">이전 배너 보기</span></button>';
cfmPortalMainToastHtml += '   				<button role="button" class="swiper-button-next"><span class="hidetxt">다음 배너 보기</span></button>';
cfmPortalMainToastHtml += '   			</div>';
cfmPortalMainToastHtml += '   			<div class="swiper-controle-wrap">';
cfmPortalMainToastHtml += '   				<div class="swiper-pagination"></div>';
cfmPortalMainToastHtml += '   				<div class="controls-autoplay">';
cfmPortalMainToastHtml += '   					<button role="button" class="swiper-button-stop"><span class="hidetxt">자동 롤링 중지</span></button>';
cfmPortalMainToastHtml += '   					<button role="button" class="swiper-button-play active"><span class="hidetxt">자동 롤링 실행</span></button>';
cfmPortalMainToastHtml += '   				</div>';
cfmPortalMainToastHtml += '   			</div>';
cfmPortalMainToastHtml += '   			<div class="swiper-wrapper" id="popuplayercontentsnotice">';
cfmPortalMainToastHtml += '   			</div>';
cfmPortalMainToastHtml += '   		</div>';
cfmPortalMainToastHtml += '   	</div>';
cfmPortalMainToastHtml += '   	<div class="layer-close-btn layer-close layer-close-wht" style="display: ;"><!-- 기본 닫기 버튼은 검정색, 흰색 닫기 버튼이 필요할 때는 layer-close-wht 추가 -->';
cfmPortalMainToastHtml += '   		<button role="button" type="button" class="layer-stop">하루 동안 보지 않기</button>';
cfmPortalMainToastHtml += '   		<button role="button" type="button" class="layer-close-btn">닫기</button>';
cfmPortalMainToastHtml += '   	</div>';
cfmPortalMainToastHtml += '   </div>';
cfmPortalMainToastHtml += '</div>';

var cfmPortalSubToastHtml = '';
cfmPortalSubToastHtml += '<div class="main-popup-dim black-dim" style=" visibility: visible;">';
cfmPortalSubToastHtml += '	<div class="cfm-layer layer-notice toast-type" id="mainpop02" style="display:none">';
cfmPortalSubToastHtml += '   	<h2 tabindex="0">서브팝업</h2>'; /* 20240207 웹접근성 개선 : 팝업 타이틀이 있는 경우 타이틀이 포커스 받을 수 있도록 유지 */
cfmPortalSubToastHtml += '		<div class="layer-contents popup-layer-contents">';
cfmPortalSubToastHtml += '			<div class="toast-swiper swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-autoheight">';
cfmPortalSubToastHtml += '				<div class="controls-direction">';
cfmPortalSubToastHtml += '					<button role="button" class="swiper-button-prev"><span class="hidetxt">이전 배너 보기</span></button>';
cfmPortalSubToastHtml += '					<button role="button" class="swiper-button-next"><span class="hidetxt">다음 배너 보기</span></button>';
cfmPortalSubToastHtml += '				</div>';
cfmPortalSubToastHtml += '				<div class="swiper-controle-wrap">';
cfmPortalSubToastHtml += '					<div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>';
cfmPortalSubToastHtml += '					<div class="controls-autoplay">';
cfmPortalSubToastHtml += '						<button role="button" class="swiper-button-stop"><span class="hidetxt">자동 롤링 중지</span></button>';
cfmPortalSubToastHtml += '						<button role="button" class="swiper-button-play active"><span class="hidetxt">자동 롤링 실행</span></button>';
cfmPortalSubToastHtml += '					</div>';
cfmPortalSubToastHtml += '				</div>';
cfmPortalSubToastHtml += '				<div class="swiper-wrapper" id="popuplayercontentsnotice">';
cfmPortalSubToastHtml += '				</div>';
cfmPortalSubToastHtml += '			</div>';
cfmPortalSubToastHtml += '		</div>';
cfmPortalSubToastHtml += '		<div class="layer-close-btn layer-close layer-close-wht" style="display: ;"><!-- 기본 닫기 버튼은 검정색, 흰색 닫기 버튼이 필요할 때는 layer-close-wht 추가 -->';
cfmPortalSubToastHtml += '			<button role="button" type="button" class="layer-stop">하루 동안 보지 않기</button>';
cfmPortalSubToastHtml += '			<button role="button" type="button" class="layer-close-btn">닫기</button>';
cfmPortalSubToastHtml += '		</div>';
cfmPortalSubToastHtml += '	</div>';
cfmPortalSubToastHtml += '</div>';

var cfmPortalPopupCnt = 0;
var cfmPortalPopupHtml = '';
cfmPortalPopupHtml += '<div>'; /* 20240207 웹접근성 개선 : tabindex 제거 */
cfmPortalPopupHtml += '   <div class="cfm-layer layer-notice">';
cfmPortalPopupHtml += '       <div class="layer-contents"></div>';
cfmPortalPopupHtml += '       <div class="layer-close"><button type="button">레이어 닫기</button></div>';
cfmPortalPopupHtml += '       <div class="layer-footer">';
cfmPortalPopupHtml += '           <button type="button" class="layer-stop"></button>';
cfmPortalPopupHtml += '           <button type="button" class="layer-close-btn">닫기</button>';
cfmPortalPopupHtml += '       </div>';
cfmPortalPopupHtml += '   </div>';
cfmPortalPopupHtml += '</div>';

//영문팝업
var cfmEngPopupHtml = '';
cfmEngPopupHtml += '<div class="popup-move-eng">';
cfmEngPopupHtml += '    <div class="cfm-layer layer-notice">';
cfmEngPopupHtml += '        <div class="layer-contents">';
cfmEngPopupHtml += '            <div class="layer-header"><strong><em tabindex="0"><img src="'+ cfm_domain +'/images/v2/layout/logo-popup-title.png" alt="KT"></em></strong></div>';/* 20240207 웹접근성 개선 : 팝업 타이틀이 있는 경우 타이틀이 포커스 받을 수 있도록 이동 */
cfmEngPopupHtml += '            <div class="layer-contents-inner">';
cfmEngPopupHtml += '                <p class="info-txt">Would you like to be redirected to<br>KT corporate’s English site?</p>';
cfmEngPopupHtml += '                <div class="btn-wrap">';
cfmEngPopupHtml += '                    <button type="button" id="btnNo" class="btn-big-blk-line sround">NO</button>';
cfmEngPopupHtml += '                    <button type="button" id="btnYes" class="btn-big-blk sround">YES</button>';
cfmEngPopupHtml += '                </div>';
cfmEngPopupHtml += '            </div>';
cfmEngPopupHtml += '        </div>';
cfmEngPopupHtml += '        <div class="layer-close"><button type="button">레이어 닫기</button></div>';
cfmEngPopupHtml += '        <div class="layer-today-close">';
cfmEngPopupHtml += '            <span class="option-area dir-flow">';
cfmEngPopupHtml += '                <input type="checkbox" id="checkbox-lang" name="checkbox-lang" class="invisible">';
cfmEngPopupHtml += '                <label for="checkbox-lang">Do not show me this message again</label>';
cfmEngPopupHtml += '            </span>';
cfmEngPopupHtml += '        </div>';
cfmEngPopupHtml += '    </div>';
cfmEngPopupHtml += '</div>';

var cfmPortalPopupRoamingCntNew = 0;
//메인 (토스트,일반) 팝업 리스트
var toastList = '';
var toastConList = '';
var toastCookieNm = 'portal_toast_main' + ktMenuCd;
var toastOmsShowYn = 'N';
var normalList = '';
var normalConList = '';
var normalCookieNm = 'portal_popup_' + ktMenuCd;

var cfmNoticeNow = new Date();
var cfmNoticeVersion = '?' + cfmNoticeNow.getFullYear() +''+ (cfmNoticeNow.getMonth()+1) +''+ cfmNoticeNow.getDate() +''+ cfmNoticeNow.getHours();
var mainslideOff = "N";
var cfmNoticeNowDate;
var cfmNoticeViewType = ''; //viewdelay : delay
var cfmNoticeAreaHtml = {

    //초기화 & 세팅
    init: function(){
        if($j('#ktMainYn').length){
            mKt_api.ipCheck(); //해외, 국내 아이피 체크 후 팝업 실행
        }else{
            // 팝업 시작
            cfmNoticeAreaHtml.startPopup();
        }
    },

    // 팝업 시작(init)
    startPopup: function(){
        if(mKt_common.pageType() != 'shop'){ //Shop페이지 아닌경우만-2차        
            if($j('#ktMainYn').length){
            	if(mkt.isLoginStatus() == 'Y'){
            		campaignBigBannerNew("" ,"A00000", "" , "OFFERAREA181"); // 온마시 팝업 (슬라이드)
            	}else{
            		cfmNoticeAreaHtml.mainNotice(); //개별(영문) 공지팝업
            	}
            }else{
                cfmNoticeAreaHtml.subNotice();
            }
        }
    },

    //팝업 그만보기 설정
    setStopPopup: function(target, name, data){
        if(mKt_common.isNull(data.popupStopType) !== ''){
            target.find('.layer-close').hide();
            target.find('.layer-footer').show();

            //텍스트
            if(mKt_common.isNull(data.subTitle) !== ''){
                target.find('.layer-stop').html(data.subTitle);
            }

            //쿠키설정
            var period = parseInt(data.popupStopType);
            target.on('click', '.layer-stop', function(){
                mkt.setComCookie(name, new Date().toString(), period);
                $j("body").removeClass("hidden");
                target.hide();
                poporderclose(target);
            });

            //닫기
            target.on('click', '.layer-close-btn', function(){
            	target.hide();
            	$j("body").removeClass("hidden");
            	poporderclose(target);
            });
        }else{ //설정없음
            target.find('.layer-close').show();
            target.find('.layer-footer').hide();

            //닫기
            target.on('click', '.layer-close', function(){
            	target.hide();
            	poporderclose(target);
            });
        }
    },
    
    //토스트팝업 그만보기 설정
    setStopToast: function(target, name, data){
        
        //쿠키설정
        if(mKt_common.isNull(data.popupStopType) !== ''){
            var period = parseInt(data.popupStopType);
        }else{ //설정없음
            var period = 1;
        }

        //target.find('.layer-close').hide();
        //target.find('.layer-footer').show();

        //텍스트
        if(mKt_common.isNull(data.subTitle) !== ''){
            target.find('.layer-stop').html(data.subTitle);
        }

        target.on('click', '.layer-stop', function(){
            $j("body").removeClass("hidden");
            mkt.setComCookie(name, new Date().toString(), period);
            target.hide();
            poporderclose(target);
            $j("aside.floating-tabbar").removeClass("active");
        });

        //닫기
        target.on('click', '.layer-close-btn', function(){
            $j("body").removeClass("hidden");
            target.hide();
            poporderclose(target);
            $j("aside.floating-tabbar").removeClass("active");
        });
    },

    //로밍팝업 그만보기 설정
    setStopPopupRoaming: function(target, name){
        //쿠키설정
        var period = parseInt(1);
        target.on('click', '.layer-stop', function(){
            $j("body").removeClass("hidden");
            mkt.setComCookie(name, new Date().toString(), period);
            target.hide();
            poporderclose(target);
            $j("aside.floating-tabbar").removeClass("active");
        });

        //닫기
        target.on('click', '.layer-close-btn', function(){
            $j("body").removeClass("hidden");
            target.hide();
            poporderclose(target);
            $j("aside.floating-tabbar").removeClass("active");
        });
    },

    //메인-비상,통합(일반,온마시),슬라이드공지
    mainNotice: function(){
        //cfmNoticeAreaHtml.mainDirectPopup(); //개별(긴급) : 기능 사용안함으로 삭제
        mKt_common.callAjax({
            'url' : cfm_domain + '/js/json/notice.json' + cfmNoticeVersion,
            'type' : 'get',
            'timeout' : 5000,
            'callback' : function(type, result){
                try {
                    if(type == 'success'){
                        if (result.returnCode == "OK"){
                            mainNoticeResult = result;
                            var cookieValue = '';
                            if($j('#ktMainYn').length){
                                //비상팝업 데이터 존재여부 체크  
                                var emergencyList = $j.grep(result.data, function(element, index) { return element.areaId == 'A000000077'});
                                var emergencyConList = '';
                                var emergencyCookieNm = '';
                                if (emergencyList.length > 0) {                                
                                    emergencyConList = $j.grep(emergencyList[0].areaSetList[0].areaContsList, function(element, index) { 
                                        return ((element.showYn == "Y" && element.showPerdType=="01") || (element.showYn == "Y" && ( cfmNoticeNowDate >= element.showSdate && cfmNoticeNowDate <= element.showEdate)))
                                    });
                                    if (emergencyConList.length > 0) {
                                        emergencyCookieNm = 'import_popup_' + emergencyConList[0].areaContsId;
                                        cookieValue = mkt.getComCookie(emergencyCookieNm);
                                        if(mKt_common.isNull(cookieValue) != ''){
                                            emergencyConList = '';
                                        }
                                    }
                                }
                                //토스트팝업 데이터 존재여부 체크
                                toastList = $j.grep(result.data, function(element, index) { return ((element.areaId == 'A000000659' && properties == "tb") || element.areaId == 'A000000828')});
                                toastConList = '';
                                if (toastList.length > 0) {        
                                    toastOmsShowYn = toastList[0].omsShowYn;                        
                                    toastConList = $j.grep(toastList[0].areaSetList[0].areaContsList, function(element, index) { 
                                        return ((element.showYn == "Y" && element.showPerdType=="01") || (element.showYn == "Y" && ( cfmNoticeNowDate >= element.showSdate && cfmNoticeNowDate <= element.showEdate)))
                                    });
                                    if (toastConList.length > 0) {
                                        cookieValue = mkt.getComCookie(toastCookieNm);
                                        if(mKt_common.isNull(cookieValue) != ''){
                                            toastConList = '';
                                            toastOmsShowYn = 'N';
                                        }
                                    }                                 
                                }

                                //일반팝업 데이터 존재여부 체크
                                normalList = $j.grep(result.data, function(element, index) { return element.areaId == 'A000000078'});
                                normalConList = '';
                                if (normalList.length > 0) {                                
                                    normalConList = $j.grep(normalList[0].areaSetList[0].areaContsList, function(element, index) { 
                                        return ((element.showYn == "Y" && element.showPerdType=="01") || (element.showYn == "Y" && ( cfmNoticeNowDate >= element.showSdate && cfmNoticeNowDate <= element.showEdate)))
                                    });
                                    if (normalConList.length > 0) {
                                        cookieValue = mkt.getComCookie(normalCookieNm);
                                        if(mKt_common.isNull(cookieValue) != ''){
                                            normalConList = '';
                                        }
                                    }                                     
                                }

                                //슬라이드 공지
                                var slideList = $j.grep(result.data, function(element, index) { return element.areaScrnType == '13'});
                                if (slideList.length > 0 && mainslideOff == "N") {
                                    cfmNoticeAreaHtml.slideBanner(slideList[0]);
                                }

                                //비상 콘텐츠
                                if (emergencyConList.length > 0) { 
                                    cfmNoticeViewType = 'viewdelay';
                                    cfmNoticeAreaHtml.mainImportPopup(emergencyList[0]);
                                } else {
                                    //팝업 순차 오픈
                                    mainPopupListChk();
                                }
                            }

                        }
                    }
                } catch (e) {
                    common_log.log('mkt_notice.js mainNotice() [' + e.message + ']');
                }

            }
        });
    },

    //서브-통합(입점-통합,온마시)
    subNotice: function(){
        var html = $j(cfmPortalSubToastHtml);
        var pgSubList = '';
        mKt_common.callAjax({
            'url' : cfm_domain + '/js/json/popup_ALL.json' + cfmNoticeVersion,
            'type' : 'get',
            'timeout' : 5000,
            'callback' : function(type, result){
                try {
                    if(type == 'success'){
                        if (result.returnCode == "OK"){
                            pgSubList = $j.grep(result.data.popupList, function(element, index) { return element == ktMenuCd});
                        }
                    }
                } catch (e) {
                    common_log.log('mkt_notice.js subNotice() [' + e.message + ']');
                } finally {
                    cfmNoticeAreaHtml.subMenuNotice(html, pgSubList); //입점-개별
                }

            },
            'complete' : function(){
                campaignTop(); //온마시 팝업 (슬라이딩)
            }
        });
    },

    //서브-통합(입점-개별)
    subMenuNotice: function(html, pgSubList){
        var omsSubCodeToast = ''; //온마시 코드 추출
        var areaData = {};
        mKt_common.callAjax({
            'url' : cfm_domain + '/js/json/InventoryCodeList.json' + cfmNoticeVersion,
            'type' : 'get',
            'timeout' : 5000,
            'callback' : function(type, result){
                try {
                    if(type == 'success'){
                        if (result.returnCode == "OK"){
                            var omsSubList = $j.grep(result.data, function(element, index) { return element.menuCd == ktMenuCd});
                            if (omsSubList.length > 0) {
                                omsSubCodeToast = omsSubList[0].list[0].inventoryCodeToast;
                            }
                        }
                    }
                } catch (e) {
                    common_log.log('mkt_notice.js subMenuNotice() 온마시코드 추출 [' + e.message + ']');
                } finally {
                    //입점 토스트 팝업
                    if (pgSubList.length > 0){
                        mKt_common.callAjax({
                            'url' : cfm_domain + '/js/json/popup_'+ ktMenuCd +'.json' + cfmNoticeVersion,
                            'type' : 'get',
                            'timeout' : 5000,
                            'callback' : function(type, result){
                                try {
                                    if(type == 'success'){
                                        if (result.returnCode == "OK"){
                                            areaData = result.data;
                                        }
                                    }
                                } catch (e) {
                                    common_log.log('mkt_notice.js subMenuNotice() 입점 토스트 팝업 [' + e.message + ']');
                                } finally {
                                    cfmNoticeAreaHtml.portalToastSub(areaData, html, omsSubCodeToast);
                                }
                            }
                        });
                    } else {
                        cfmNoticeAreaHtml.portalToastSub(areaData, html, omsSubCodeToast);
                    }
                    
                }
            }
        });


    },

    //개별(메인-긴급) 공지팝업(수동) : 사용안함
    mainDirectPopup: function(){
        $j.ajax({
            url: cfm_domain + '/html/m_code.html',
            type: "get",
            timeout: 500,
            cache : false,
            error : function(xhr, option, error){
            }
        }).done(function(html){
            $j("body").prepend(html);
    
            // 닫기
            $j(".popups_emgc .layer-close button").click(function () {
                $j(".popups_emgc").stop().fadeOut(500);
            });
        });
    },

    //개별(메인-비상) 공지팝업 - 사이즈 변동
    mainImportPopup: function(areaData){
        //컨텐츠-CMS(html,이미지,이미지맵)
        $j.each(areaData.areaSetList[0].areaContsList, function(i, item){
            if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                if(item.popupType=='01'){ //일반
                    var cookieName = 'import_popup_' + item.areaContsId;
                    var cookieValue = mkt.getComCookie(cookieName);                

                    //그만보기
                    if(mKt_common.isNull(cookieValue) != ''){
                        return false;
                    }

                    var html = $j(cfmPortalPopupHtml);
                    html.addClass('ermgy-popup-dim');
                    html.css('visibility', 'hidden');

                    var conts = $j('<div></div>');
                    mKt_common.contsViewType('main', conts, areaData, item);
                    html.find('.layer-contents').append(conts);

                    //사이즈 조정
                    item.popupWdth = mKt_common.isNull(item.popupWdth) == '' ? 0 : item.popupWdth;
                    item.popupVrtc = mKt_common.isNull(item.popupVrtc) == '' ? 0 : item.popupVrtc;
                    if(item.popupWdth > 0 && item.popupVrtc > 0){
                        html.find('.layer-notice').attr('style', 'width:'+ item.popupWdth +'px !important;height:'+ item.popupVrtc +'px !important;');
                    }

                    //그만보기설정
                    cfmNoticeAreaHtml.setStopPopup(html, cookieName, item);

                    $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);
                    
                    //ui 노출
                    setTimeout(function(){ html.css('visibility', 'visible'); }, 200);

                }else if(item.popupType=='02'){ //장애공지(페이지 전체 덮기)
                    $j("body").prepend(item.htmlInfo);
                }
            }
        });
    },   

    /*통합(온마시) 토스트팝업 callback
    * type : 통신결과 값 (success) 
    * areaData : 내부 팝업 데이터 리스트
    * html : 콘텐츠 영역
    * result : 온마시 데이터 
    * order : 전달된 온마시 노출 순서 
    */
    callbackCampaignToast: function(type, areaData, html, result, order){
        var noticeLength = cfmPortalToastCnt;
        if($j('#ktMainYn').length){ // 메인
            var cookieName = toastCookieNm;
        } else { // 서브
            var cookieName = 'portal_toast_' + ktMenuCd;
        }
        //그만보기설정-무조건(1일)
        result.popupStopType = '1';
        result.subTitle = '하루 동안 보지 않기';
        try {
            if(type == 'success'){
                var conts = $j('<div class="swiper-slide layer-contents-banner">'+result.html+'</div>');
                conts.find('a').attr('onclick','campaignClickNew(\''+result.caVal1+'\' , \''+result.caVal2+'\', \''+result.caVal3+'\', \''+result.statCd+'\')');

                if(!$j('#ktMainYn').length){ // 서브 App 웹투앱 팝업 호출 제외(lnkType="deep")
                    if(appChk){
                        if (conts.find('a').attr("lnkType") == "deep") {
                            return false;
                        }
                    }
                }

                if(cfmPortalToastCnt == 0){
                    $j('.toast-swiper').addClass('nonswiper');//0227
                    $j(".toast-swiper .swiper-slide").attr("aria-hidden","false");// vos 1128316
                    var cookieValue = mkt.getComCookie(cookieName);

                    //그만보기
                    if(mKt_common.isNull(cookieValue) != ''){
                        return false;
                    }

                    html.find('#popuplayercontentsnotice').append(conts);
                    
                    cfmNoticeAreaHtml.setStopToast(html, cookieName, result); 
                    $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);
                    $j('.toast-swiper').addClass('nonswiper');//0227
                    $j(".toast-swiper .swiper-slide").attr("aria-hidden","false");// vos 1128316
                    cfmPortalToastCnt ++;
                    
                    //최종 토스트 UI 적용
                    cfmNoticeAreaHtml.portalToastUiSet('Y'); //온마시 토스트팝업은 무조건 dim 활성화
                } else {
                    var slideOrder = cfmPortalToastCnt;
                    if (order > 0) {
                        slideOrder = order-1;
                    }
                    mkt_toast_swiper.init();
                    mkt_toast_swiper.addSlide(slideOrder,conts);
                    mkt_toast_swiper.slideToLoop(0,0);
                    cfmPortalToastCnt ++;
                }
            } else {
                toastOmsShowYn = "N";
            }
        } catch (e) {
            toastOmsShowYn = "N";
            common_log.log('mkt_notice.js callbackCampaignToast() [' + e.message + ']');
        } finally {
            //메인>최종 토스트 팝업 데이터가 존재 하지 않을경우 > 일반팝업 실행
            if($j('#ktMainYn').length){
                if (cfmPortalToastCnt == 0) {
                    //일반 팝업
                    if (normalConList.length > 0 && toastOmsShowYn != "Y") {
                        html = $j(cfmPortalPopupHtml);
                        cfmNoticeAreaHtml.portalPopup(normalList[0], html);
                    }
                }
            }
        }
    },

    // 메인 토스트 팝업      
    portalToastMain: function(areaData, html ,type){
        var cookieName = toastCookieNm;
        var cookieValue = mkt.getComCookie(cookieName);
    	var date = new Date
        var today = date.getMonth()+1 +"월 "+date.getDate()+"일";

        //그만보기        
        if(mKt_common.isNull(cookieValue) != ''){
            return false;
        }

        if($j('#ktMainYn').length){ //메인
            var length = areaData.areaSetList[0].areaContsList.length;
            var omsShowYn = areaData.omsShowYn;
            var omsSortOrdg = (areaData.omsSortOrdg != undefined) ? areaData.omsSortOrdg : '1';
            var omsRealOrdg = 1;
            var birthdayContsShowYn = areaData.birthdayContsShowYn;
            var birthdayContsSortOrdg = areaData.birthdayContsSortOrdg;
            var operationContsShowYn = areaData.operationContsShowYn;
            var operationContsSortOrdg = areaData.operationContsSortOrdg;
            var webToAppContsShowYn = (areaData.webToAppYn != undefined) ? areaData.webToAppYn : 'N';
            var webToAppSortOrdg = (areaData.webToAppSortOrdg != undefined) ? areaData.webToAppSortOrdg : '3';
            if (length > 0) {

                //컨텐츠 정렬 번호 적용
                var areaDataOrder = areaData.areaSetList[0].areaContsList.map(element => {
                    if (element.contsDivType == "26") { //생일
                        element.contsDivType = birthdayContsSortOrdg;
                    } else if (element.contsDivType == "27") { //일반
                        element.contsDivType = operationContsSortOrdg;
                    } else if (element.contsDivType == "28") { //웹투앱
                        element.contsDivType = webToAppSortOrdg;
                    } 
                    return element;
                });
                //컨텐츠 재정렬하기
                var contOrder = areaDataOrder.sort(function compare(a, b){
                    if (a.contsDivType < b.contsDivType) return -1;
                    if (a.contsDivType > b.contsDivType) return 1;
                });

                //컨텐츠-CMS(html,이미지,이미지맵)
                $j.each(contOrder, function(i, item){
                    var contsYN = "N";

                    if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                        var conts = $j('<div class="swiper-slide layer-contents-banner"></div>');
                        var contsOrg = item.contsDivType;
                        
                        if(contsOrg == webToAppSortOrdg && webToAppContsShowYn =="Y"){ //웹투앱
                            mKt_common.contsViewType('main', conts, areaData, item);
                            contsYN = "Y";
                        } else if(contsOrg == birthdayContsSortOrdg && gnbInfoBirthYn == "Y" && birthdayContsShowYn=="Y"){ //생일
                            item.htmlInfo = item.htmlInfo.replace('{이름}', gnbInfoName).replace('{생일}',today);
                            mKt_common.contsViewType('main', conts, areaData, item);
                            contsYN = "Y";
                        } else if(contsOrg == operationContsSortOrdg && operationContsShowYn =="Y"){ //일반
                            mKt_common.contsViewType('main', conts, areaData, item);
                            contsYN = "Y";
                        }

                        if (contsYN == "Y") {
                            //온마시 연동 정렬 순서
                            if (contsOrg < omsSortOrdg) {
                                omsRealOrdg++;
                            }
                            html.find('#popuplayercontentsnotice').append(conts);

                            if(cfmPortalToastCnt == 0){
                                cfmNoticeAreaHtml.setStopToast(html, cookieName, item);
                                $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);
        
                                /* 20240220 웹접근성 개선 : 팝업 띄울 때 다른 요소에 포커스 받을 수 없도록 aria-hidden 속성 추가. 입점별 고유한 영역이 있는 경우에는 입점에서 자체 처리 */
                                $j("#mCfmClGnb, #mCfmClContainer, #mCfmClFooter, aside.floating-tabbar").attr("aria-hidden", "true");
        
                                //최종 토스트 UI 적용
                                cfmNoticeAreaHtml.portalToastUiSet('Y'); //메인토스트팝업은 무조건 dim 활성화
                            }
                            cfmPortalToastCnt++;
                        }
                    }

                });
            }

            //온마시 팝업 연동(메인)
            if (omsShowYn == "Y") {
                campaignToast(areaData, html, "pop", omsRealOrdg, "OFFERAREA182");
            }        
        }
    },

    // 서브 토스트 팝업
    portalToastSub: function(areaData, html, omsSubCodeToast){
        var cookieName = 'portal_toast_' + ktMenuCd;
        var cookieValue = mkt.getComCookie(cookieName);
        var omsRealOrdg = 1;
        var uiDimYn = 'Y';

        //그만보기        
        if(mKt_common.isNull(cookieValue) != ''){
            return false;
        }

        if(!$j('#ktMainYn').length){
            try {
                if (areaData.detailList !== undefined) {
                    if (areaData.detailList.length > 0) {
                        //컨텐츠 재정렬하기
                        var contOrder = areaData.detailList.sort(function compare(a, b){
                            if (a.popupOperate < b.popupOperate) return -1;
                            if (a.popupOperate > b.popupOperate) return 1;
                        });
            
                        //컨텐츠-CMS(html)
                        $j.each(contOrder, function(i, item){
                            if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                                var contsView = true;
                                var conts = $j('<div class="swiper-slide layer-contents-banner"></div>');
                                conts.append(item.htmlInfo);

                                // 서브 App 웹투앱 팝업 호출 제외(lnkType="deep")
                                if(appChk){
                                    if (conts.find('a').attr("lnkType") == "deep") {
                                        contsView = false;
                                    }
                                }

                                if (contsView) {
                                    html.find('#popuplayercontentsnotice').append(conts);

                                    //온마시 연동 정렬 순서 (공통)
                                    if (item.popupOperate == "001") {
                                        omsRealOrdg++;
                                    }
            
                                    if(cfmPortalToastCnt == 0){
                                        uiDimYn = item.dimYn; //딤처리 여부
                                        cfmNoticeAreaHtml.setStopToast(html, cookieName, item);
                                        $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);
                
                                        /* 20240220 웹접근성 개선 : 팝업 띄울 때 다른 요소에 포커스 받을 수 없도록 aria-hidden 속성 추가. 입점별 고유한 영역이 있는 경우에는 입점에서 자체 처리 */
                                        $j("#mCfmClGnb, #mCfmClContainer, #mCfmClFooter, aside.floating-tabbar").attr("aria-hidden", "true");
                
                                        //최종 토스트 UI 적용
                                        cfmNoticeAreaHtml.portalToastUiSet(uiDimYn);                       
                                    }
                                    cfmPortalToastCnt++;
                                }
        
                            }
                        });
                    }
                }
            } catch (e) {
                common_log.log('mkt_notice.js portalToastSub() [' + e.message + ']');
            } finally {
                //온마시 팝업 연동(입점.서브)
                if (omsSubCodeToast !== "") {
                    campaignToast(areaData, html, "pop", omsRealOrdg, omsSubCodeToast);
                } 
            }

        }
    },

    //토스트팝업 UI 적용
    portalToastUiSet: function(dimType) {
        toastOnload(dimType);
        floatOnload();
        
        setTimeout(function(){ 
            
            $j("#mainpop02").attr("style","display:block");
            
            if ( $j('.toast-swiper .swiper-slide').length > 1 ) 	{//0227
                mkt_toast_swiper.init();
                
                if(mkt_toast_swiper.loopedSlides == 1){
                    mkt_toast_swiper.destroy(false)
                    $j('.toast-swiper').addClass('nonswiper');//0227
                    $j(".toast-swiper .swiper-slide").attr("aria-hidden","false");// vos 1128316
                }
            } else {
                $j('.toast-swiper').addClass('nonswiper');//0227
                $j(".toast-swiper .swiper-slide").attr("aria-hidden","false");// vos 1128316
            }
            
        },450);
        
        
        
        $j(".toast-swiper .swiper-slide").attr("aria-hidden","true");
        setTimeout(function(){ 
            $j(".toast-swiper .swiper-slide.swiper-slide-visible").attr("aria-hidden","false"); 
        }, 600); 
    },

    portalPopupRoaming: function(){
        var cookieName = 'portal_popup_roaming' + ktMenuCd;
        var cookieValue = mkt.getComCookie(cookieName);

        // 오늘하루 보지 않음 처리
        if(mKt_common.isNull(cookieValue) != '')
        {
            return false;
        }
        else
        {
            var date = new Date
            var today = date.getMonth()+1 +"월 "+date.getDate()+"일";

            var cfmPortalPopupRoamingHtmlNew = '';
            cfmPortalPopupRoamingHtmlNew += '<div class="main-popup-dim black-dim" style=" visibility: visible;">';
            cfmPortalPopupRoamingHtmlNew += '    <div class="cfm-layer layer-notice roaming-type showlayer" id="roamingPopup">';
            cfmPortalPopupRoamingHtmlNew += '        <div class="layer-contents popup-layer-contents">';
            cfmPortalPopupRoamingHtmlNew += '            <div class="swiper-wrapper" id="popuplayercontentsnotice">';
            cfmPortalPopupRoamingHtmlNew += '                <div class="swiper-slide layer-contents-banner">';
            cfmPortalPopupRoamingHtmlNew += '                    <div class="apptpht">';
            cfmPortalPopupRoamingHtmlNew += '                        <a href="http://m.ktroaming.kt.com" onclick="KT_trackClicks(\'mKT-개인_메인\', \'^mKT-개인_메인^로밍토스트팝업^로밍페이지로이동^클릭\');" style="background:#ffeec4;"><img alt="해외 여행 중이세요? 가족/친구와 같이 간다면 함께 쓰기 더 편한 KT로밍" src="/images/v2/main/m_toastpopup_roaming.png" style="width:100%;height:auto;"></a>';
            cfmPortalPopupRoamingHtmlNew += '                    </div>';
            cfmPortalPopupRoamingHtmlNew += '                </div>';
            cfmPortalPopupRoamingHtmlNew += '           </div>';
            cfmPortalPopupRoamingHtmlNew += '        </div>';
            cfmPortalPopupRoamingHtmlNew += '        <div class="layer-close-btn layer-close layer-close-wht" style="display: ;">';
            cfmPortalPopupRoamingHtmlNew += '            <button role="button" type="button" class="layer-stop" onclick="KT_trackClicks(\'mKT-개인_메인\', \'^mKT-개인_메인^로밍토스트팝업^오늘하루보지않기^클릭\');">하루 동안 보지 않기</button>';
            cfmPortalPopupRoamingHtmlNew += '            <button role="button" type="button" class="layer-close-btn" onclick="KT_trackClicks(\'mKT-개인_메인\', \'^mKT-개인_메인^로밍토스트팝업^닫기^클릭\');">닫기</button>';
            cfmPortalPopupRoamingHtmlNew += '        </div>';
            cfmPortalPopupRoamingHtmlNew += '    </div>';
            cfmPortalPopupRoamingHtmlNew += '</div>';

            var html = $j(cfmPortalPopupRoamingHtmlNew);
            
            if($j('#ktMainYn').length){ //메인    
                
                $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);

                if(cfmPortalPopupRoamingCntNew == 0){
                        cfmNoticeAreaHtml.setStopPopupRoaming(html, cookieName); 
                        cfmPortalPopupRoamingCntNew += 1;
                }

                toastOnloadRoaming();
                floatOnload();
                
                setTimeout(function(){ 
                    $j("#roamingPopup").attr("style","display:block");
                    $j(".swiper-slide").attr("aria-hidden","false");// vos 1128316
                },450);
                
                $j(".swiper-slide").attr("aria-hidden","true");
                setTimeout(function(){ 
                    $j(".swiper-slide.swiper-slide-visible").attr("aria-hidden","false"); 
                }, 600); 
            }
        }
   },
    
    portalPopup: function(areaData, html){
        var cookieName = normalCookieNm;
        var cookieValue = mkt.getComCookie(cookieName);

        // css 설정
        html.addClass('main-popup-dim');
        html.css('visibility', 'hidden');
        html.find('.layer-contents').addClass('popup-layer-contents');

        //그만보기        
        if(mKt_common.isNull(cookieValue) != ''){
            return false;
        }
                
        if($j('#ktMainYn').length){ //메인       
            //컨텐츠-CMS(html,이미지,이미지맵)
            $j.each(areaData.areaSetList[0].areaContsList, function(i, item){
                if (("A000000078"==item.areaId && item.showYn == "Y" && item.showPerdType=="01") || ("A000000078"==item.areaId && item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                    var conts = $j('<div class="layer-contents-banner"></div>');
                    mKt_common.contsViewType('main', conts, areaData, item);
                    html.find('.popup-layer-contents').append(conts);

                    //그만보기설정-무조건(1일)
                    item.popupStopType = '1';
                    item.subTitle = '하루 동안 보지 않기';
                    cfmNoticeAreaHtml.setStopPopup(html, cookieName, item); 
                    cfmPortalPopupCnt += 1;
                    
                    setTimeout(function(){ 
                        $j(".cfm-layer.layer-notice").find(".layer-contents-banner").not(".bx-clone").eq(0).find("a").focus();
                    }, 600); 
                }
            });
        }else{ //서브
            //컨텐츠-CMS(html)
            $j.each(areaData.detailList, function(i, item){                        
                if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                    var conts = $j('<div class="layer-contents-banner"></div>');
                    conts.append(item.htmlInfo);
                    html.find('.popup-layer-contents').append(conts);

                    //딤처리
                    if(item.dimYn == 'Y'){
                        html.addClass('popup-dim');                                                
                    }

                    //그만보기설정-무조건(1일)
                    item.popupStopType = '1';
                    item.subTitle = '하루 동안 보지 않기';
                    cfmNoticeAreaHtml.setStopPopup(html, cookieName, item); 
                    cfmPortalPopupCnt += 1;
                }
            });
                    
			setTimeout(function(){ 
				$j(".cfm-layer.layer-notice").find(".layer-contents-banner").not(".bx-clone").eq(0).find("a").focus();
            }, 1200); /* 20240207 웹접근성 개선 : 서브에서도 팝업의 첫번째 배너로 포커스 이동 */
            
            /* 20240220 웹접근성 개선 : 팝업 띄울 때 다른 요소에 포커스 받을 수 없도록 aria-hidden 속성 추가. 입점별 고유한 영역이 있는 경우에는 입점에서 자체 처리 */
			$j("#mCfmClGnb, #mCfmClContainer, #mCfmClFooter, aside.floating-tabbar").attr("aria-hidden", "true"); 
        }
        if(cfmPortalPopupCnt > 0){
            $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);
            cfmUi.COMMON.pupup(cfmNoticeViewType); //ui 호출-mkt_ui.js
        }
    },
    
  

    //상단영역-슬라이드 공지(CMS)-그만설정없음
    slideBanner: function(areaData){
        if ((areaData.showYn == 'Y' && areaData.showPerdType == '01') || (areaData.showYn == 'Y' && (cfmNoticeNowDate >= areaData.showSdate && cfmNoticeNowDate <= areaData.showEdate))){ //영역노출여부
            //컨텐츠-CMS
            $j.each(areaData.areaSetList[0].areaContsList, function(i, item){                 
                if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                    var html = $j(item.htmlInfo);
                    $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);
                    cfmUi.COMMON.clickBanner(); //ui 처리 mkt_ui.js 호출  
                }
            });
        }
    },

    //상단영역-슬라이드(온마시) 공지 callback 
    callbackCampaignTop: function(type, result){
        if(type == 'success'){  
            if($j('.click-banner').length > 0){
                $j('.click-banner').remove();
            }
            
            var html = $j(result.html);
            html.find('.layer-nth1 > a ').attr('onclick','campaignClickNew(\''+result.caVal1+'\' , \''+result.caVal2+'\', \''+result.caVal3+'\', \''+result.statCd+'\')')
            html.find('.close-btn').attr('onclick', 'campaignCloseNew(\''+result.caVal1+'\' , \''+result.caVal2+'\', \''+result.caVal3+'\', \''+result.statCd+'\')');
            
            $j('#mCfm' + ktChannel + 'Wrapper').prepend(html);
            cfmUi.COMMON.clickBanner(); //ui 처리 mkt_ui.js 호출
            mainslideOff = "Y";
        }
        
        cfmNoticeAreaHtml.mainNotice(); //개별(영문) 공지팝업
        
    },
}

function popupOnload(){
	var popTarget = $j(".main-popup-dim");
	
	popTarget.on('click', '.layer-close-btn', function(){
		popTarget.hide();
		poporderclose(popTarget);
    	 
	});	
}

//메인 토스트 , 일반팝업, 로밍 순차 오픈
function mainPopupListChk() {
    if (ipIsKr == "Y") {
        var html = $j(cfmPortalMainToastHtml);
        //토스트 팝업
        if (toastConList.length > 0) {
            cfmNoticeAreaHtml.portalToastMain(toastList[0], html);
        } else {
            if (toastOmsShowYn == "Y") {
                cfmNoticeAreaHtml.portalToastMain(toastList[0], html);
            }
        }
        //일반 팝업
        if (normalConList.length > 0 && toastConList.length == 0 && toastOmsShowYn != "Y") {
            html = $j(cfmPortalPopupHtml);
            cfmNoticeAreaHtml.portalPopup(normalList[0], html);
        } 
    }

    // 한국이 아닐 경우에는 로밍 토스트팝업이 나오도록 한다.
    if (ipIsKr == "N")
    {
        cfmNoticeAreaHtml.portalPopupRoaming();
    }
}

//메인팝업 닫기 > 다음 팝업 연동
function poporderclose(target){
	if($j('#ktMainYn').length){  
         if("ermgy-popup-dim" == target.attr("class")){ //비상팝업 닫을때
            //팝업 순차 오픈
            mainPopupListChk();
         }else if("main-popup-dim black-dim" == target.attr("class")){ //토스트팝업 닫을때
            if (normalConList.length > 0) {
                if(loopcount == 0){
                    loopcount ++;
                    var nomalHtml = $j(cfmPortalPopupHtml);
                    cfmNoticeAreaHtml.portalPopup(normalList[0], nomalHtml);
                }
            }
	     }
	}
}


$j(document).ready(function(){
    function loadScreenChk(){
        if(cfmloadScreen){	//screen API 로드 true  
            cfmNoticeNowDate = mKt_common.dateFormat('YYYY.MM.DD HH:mm:ss');
            cfmNoticeAreaHtml.init();
        }else{
            setTimeout(function(){ loadScreenChk();}, 200);
        }
    }

    loadScreenChk();
});