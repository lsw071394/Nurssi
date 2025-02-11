/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

//팝업
var PcampId		= '';
var PcampStatCd = '';
var PexeType	= '';
var PcampName	= '';

// 상단
var TcampId		= '';
var TcampStatCd = '';
var TexeType	= '';
var TcampName	= '';

// 챗봇
var CBcampId	= '';
var CBcampStatCd = '';
var CBexeType	= '';
var CBcampName	= ''; 

// 메인 개인화영역 문구
var CcampId		= '';
var CcampStatCd = '';
var CexeType	= '';
var CcampName	= ''; 

// 메인 빅배너
var MBcampId    = '';
var MBcampStatCd = '';
var MBexeType	= '';
var MBcampName	= '';

// 메인 빅배너 B
var MBcampId_B    = '';
var MBcampStatCd_B = '';
var MBexeType_B	= '';
var MBcampName_B	= '';

// 메인 상품
var McampId		= '';
var McampStatCd = '';
var MexeType	= '';
var McampName	= '';

// 공통 함수
var campId		= '';   //캠페인 ID
var campStatCd	= '';   //통계코드
var exeType		= '';	//캠페인구분
var campName	= '';

// 캠페인 노출 통계
var campaignStat = function(s){
	if(s == "p"){
		campId = PcampId;campStatCd= PcampStatCd;exeType = PexeType;campName = PcampName;
	}else if(s == "t"){
		campId = TcampId;campStatCd	= TcampStatCd;exeType = TexeType;campName = TcampName;
	}else if(s == "cb"){
		campId = CBcampId;campStatCd= CBcampStatCd;exeType = CBexeType;campName = CBcampName;
	}else if(s == "c"){
		campId = CcampId;campStatCd= CcampStatCd;exeType = CexeType;campName = CcampName;
	}else if(s == "mb"){
        campId = MBcampId;campStatCd= MBcampStatCd;exeType = MBexeType;campName = MBcampName;
    }else if(s == "mb_b"){
		campId = MBcampId_B;campStatCd= MBcampStatCd_B;exeType = MBexeType_B;campName = MBcampName_B;
	}else if(s == "m"){
		campId = McampId;campStatCd= McampStatCd;exeType = MexeType;campName = McampName;
	}
	
	if(mKt_common.isNull(s) !== ''){
		trgt.campaignViewLog(campId, campName, exeType);
		//KT_trackClicks(s.pageName, '^m^KT-개인_타겟오퍼' + campStatCd + '^노출');
		var Click_Name = '^m^KT-개인_타겟오퍼' + campStatCd + '^노출';
	    var gaClick = gaSplitClickName(Click_Name);
	    gaEventTracker(true,gaClick["Click_Set1"],gaClick["Click_Set2"],gaClick["Click_Set3"]);
	}
}

// 캠페인 노출 통계 (다중)
var campaignMultilStat = function(cId, cNm, cType, cStatCd) {
    if(mKt_common.isNull(cId) !== ''){
		trgt.campaignViewLog(cId, cNm, cType);
		//KT_trackClicks(s.pageName, '^m^KT-개인_타겟오퍼' + cStatCd + '^노출');
    }    
}

// 캠페인 클릭
var campaignClick = function(s , param){
	if(s == "p"){
		campId = PcampId;campStatCd= PcampStatCd;exeType = PexeType;campName = PcampName;
	}else if(s == "t"){
		campId = TcampId;campStatCd	= TcampStatCd;exeType = TexeType;campName = TcampName;
	}else if(s == "cb"){
		campId = CBcampId;campStatCd= CBcampStatCd;exeType = CBexeType;campName = CBcampName;
		window.open(param,"_blank");
	}else if(s == "c"){
		campId = CcampId;campStatCd= CcampStatCd;exeType = CexeType;campName = CcampName;
	}else if(s == "mb"){
        campId = MBcampId;campStatCd= MBcampStatCd;exeType = MBexeType;campName = MBcampName;
    }else if(s == "mb_b"){
		campId = MBcampId_B;campStatCd= MBcampStatCd_B;exeType = MBexeType_B;campName = MBcampName_B;
	}else if(s == "m"){
		campId = McampId;campStatCd= McampStatCd;exeType = MexeType;campName = McampName;
	}

    if(mKt_common.isNull(s) !== ''){
		trgt.campaignClickLog(campId, campName, exeType, 'CL', '^m^KT-개인_타겟오퍼' + campStatCd + '^클릭');
		KT_trackClicks(s.pageName, '^m^KT-개인_타겟오퍼' + campStatCd + '^클릭');
	}
}

// 캠페인 클릭 통계 (다중)
var campaignMultilClick = function(cId, cNm, cType, cStatCd) {
    if(mKt_common.isNull(cId) !== ''){
        trgt.campaignClickLog(cId, cNm, cType, 'CL', '^m^KT-개인_타겟오퍼' + cStatCd + '^클릭');
        KT_trackClicks(s.pageName, '^m^KT-개인_타겟오퍼' + cStatCd + '^클릭');
    }    
}

// 캠페인 닫기
var campaignClose = function(s){
    var clickCd = 'X'; // 닫기 코드값 기본 설정

	if(s == "p"){
		campId = PcampId;campStatCd= PcampStatCd;exeType = PexeType;campName = PcampName;
	}else if(s == "t"){
		campId = TcampId;campStatCd	= TcampStatCd;exeType = TexeType;campName = TcampName;
	}else if(s == "cb"){
		campId = CBcampId;campStatCd= CBcampStatCd;exeType = CBexeType;campName = CBcampName;
	}else if(s == "c"){
		campId = CcampId;campStatCd= CcampStatCd;exeType = CexeType;campName = CcampName;
	}else if(s == "mb"){
        campId = MBcampId;campStatCd= MBcampStatCd;exeType = MBexeType;campName = MBcampName;
    }else if(s == "mb_b"){
		campId = MBcampId_B;campStatCd= MBcampStatCd_B;exeType = MBexeType_B;campName = MBcampName_B;
	}else if(s == "m"){
		campId = McampId;campStatCd= McampStatCd;exeType = MexeType;campName = McampName;
	}

    if(s == "cb"){ //챗봇 리마인드
        $j(".cfmSmartTalkLinkChatDiv").fadeOut().attr("aria-hiden", "true");

        //CMS 챗봇메세지 다시보여줌
        cfmFooterAreaHtml.smartTalkView();
        
        $j(".cfmSmartTalkLink a").focus(); //0708 웹접근성 챗봇아이콘

        if($j('#checkbox_snc_cb').is(':checked')){
            mKt_common.setArrayCookie('snc_camp', campId, 1); //24시간(고정)
            clickCd = 'NL'; //코드값
        }
    }

	if(mKt_common.isNull(s) !== ''){
		trgt.campaignClickLog(campId, campName, exeType, clickCd, '^m^KT-개인_타겟오퍼' + campStatCd + '^닫기');
		KT_trackClicks(s.pageName, '^m^KT-개인_타겟오퍼' + campStatCd + '^닫기');
	}
}

// 팝업 캠페인 조회(공통)
var campaignPopup = function(target , areaData){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    data.muCd = menuCd; // 페이지코드

    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/m/kt/popup',
        'cookie' : true,
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){                
                    var resultData = result.data;
    
                    //노출 쿠키 
                    var snc_camp = mKt_common.getArrayCookie('snc_camp', resultData.caVal1);                
                    if(snc_camp === ''){
                        var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                        if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
                            cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData , areaData);
    
                            //노출통계
                            PcampId = resultData.caVal1;
                            PcampStatCd = resultData.statCd;
                            PcampName = resultData.caVal2;
                            PexeType = resultData.caVal3;
                            campaignStat('p');
                        }
                    }else{
                        cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData , areaData);
                    }
                }else{
                    cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData , areaData);
                }
            } catch (e) {
                common_log.log('mkt_offer.js campaignPopup() [' + e.message + ']');
            }
        }
    });
}

// 상단 캠페인 조회(공통)
var campaignTop = function(){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    data.muCd = menuCd; // 페이지코드

    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/m/kt/top',
        'cookie' : true,
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){                
                    var resultData = result.data;
    
                    //노출 쿠키 
                    var snc_camp = mKt_common.getArrayCookie('snc_camp', resultData.caVal1);                
                    if(snc_camp === ''){
                        var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                        if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
                            cfmNoticeAreaHtml.callbackCampaignTop(type, resultData);
    
                            //노출통계
                            TcampId = resultData.caVal1;
                            TcampStatCd = resultData.statCd;
                            TcampName = resultData.caVal2;
                            TexeType = resultData.caVal3;
                            campaignStat('t');
                        }
                    }
                }
            } catch (e) {
                common_log.log('mkt_offer.js campaignTop() [' + e.message + ']');
            }
        }
    });
}

// 챗봇 캠페인 조회(공통)
var campaignChatbot = function(){
    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/m/kt/chatbot',
        'cookie' : true,
        'type' : 'post',
        //'timeout' : 5000,
        'callback' : function(type, result){
            var isView = false;
            try {
                if(type == 'success'){                                
                    var resultData = result.data;
    
                    //노출 쿠키 
                    var cb_camp = mKt_common.getArrayCookie('snc_camp', resultData.caVal1);                
                    if(cb_camp === ''){
                        var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                        if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){                                    
                            cfmFooterAreaHtml.callbackCampaignChatbot(type, resultData);
    
                            //노출통계
                            CBcampId = resultData.caVal1;
                            CBcampStatCd = resultData.statCd;
                            CBcampName = resultData.caVal2;
                            CBexeType = resultData.caVal3;
                            campaignStat('cb');
                            isView = true;
                        }
                    }                
                }
            } catch (e) {
                common_log.log('mkt_offer.js campaignChatbot() [' + e.message + ']');
            }

            //CMS 스마트톡(케이톡) 말풍선 노출(리마인드 미노출시) - 2차
            if(!isView){                
                cfmFooterAreaHtml.smartTalkLinkTxt();
            }
        }
    });
}

// 메인 개인화영역 문구 캠페인 조회(메인)
var campaignCsMessage = function(target){
    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/m/kt/csmessage',
        'cookie' : true,
        'type' : 'post',
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                    if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){                                 
                        mainAreaHtml.callbackCampaignCsMessage(type, target, resultData);
    
                        //노출통계
                        CcampId = resultData.caVal1;
                        CcampStatCd = resultData.statCd;
                        CcampName = resultData.caVal2;
                        CexeType = resultData.caVal3;
                        campaignStat('c');
                    }
                }
            } catch (e) {
                common_log.log('mkt_offer.js campaignCsMessage() [' + e.message + ']');
            }
        }
    });
}

// 메인 빅배너 캠페인 조회(메인)
var campaignBigBanner = function(target, order){
    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/m/kt/bigbanner',
        'cookie' : true,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                    if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){                                 
                        mainAreaHtml.callbackCampaignBigBanner(type, target, resultData, order);
    
                        //노출통계
                        MBcampId = resultData.caVal1;
                        MBcampStatCd = resultData.statCd;
                        MBcampName = resultData.caVal2;
                        MBexeType = resultData.caVal3;
                        campaignStat('mb');
                    }
                }
            } catch (e) {
                common_log.log('mkt_offer.js campaignBigBanner() [' + e.message + ']');
            }
        }
    });
}


//메인 Kt Shop 캠페인 조회(메인)
var campaignMProd = function(target, order){
 mKt_common.callAjax({
     'url' : omsoffer_domain + '/offer/v1.0/m/kt/mprod',
     'cookie' : true,
     'timeout' : 5000,
     'callback' : function(type, result){
         try {
             if(type == 'success'){
                 var resultData = result.data;
                 var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                 if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){                                 
                     mainAreaHtml.callbackCampaignMProd(type, target, resultData, order);
    
                     //노출통계
                     McampId = resultData.caVal1;
                     McampStatCd = resultData.statCd;
                     McampName = resultData.caVal2;
                     MexeType = resultData.caVal3;
                     campaignStat('m');
                 }
             }            
         } catch (e) {
            common_log.log('mkt_offer.js campaignMProd() [' + e.message + ']');
         }
     }
 });
}


//2023 -------------------  리뉴얼 온마시 호출 변경 ------------------------

var campaignBigBannerNew = function(target, mtype, order, zcode){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    if (mtype == 'pop') {
        data.muCd = menuCd; // 페이지코드
    }
    data.zoneCode = zcode;

    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/common/getBanner',
        'cookie' : true,
        'type' : 'post',
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                    if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
                        resultData.zcode = zcode;           
                        
                        if(zcode == "OFFERAREA182"){ //토스트팝업
                            cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData , target);
                        }else if(zcode == "OFFERAREA181"){ //슬라이드 팝업
                            cfmNoticeAreaHtml.callbackCampaignTop(type, resultData);
                        }else if(zcode == "OFFERAREA005"){ //서브페이지 팝업
                            cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData , resultData);
                        }else if(zcode == "OFFERAREA185" || zcode == "OFFERAREA186" || zcode == "OFFERAREA187" ){ //나의 가입정보 
                            mainAreaHtml.callbackCampaignPsnban(type, resultData);
                        }else if(zcode == "OFFERAREA184"){ //맴버십 
                            mainAreaHtml.callbackCampaignPsnbanMms(type, resultData);
                        }
                        
                        trgt.campaignViewLog(resultData.caVal1, resultData.caVal2, resultData.caVal3);
                        //KT_trackClicks(s.pageName, '^m^KT-개인_타겟오퍼' + resultData.statCd + '^노출');
                        var Click_Name = '^m^KT-개인_타겟오퍼' + resultData.statCd + '^노출';
                        var gaClick = gaSplitClickName(Click_Name);
                        gaEventTracker(true,gaClick["Click_Set1"],gaClick["Click_Set2"],gaClick["Click_Set3"]);
                        
                    }
                }else{
                     if(zcode == "OFFERAREA182"){ //토스트팝업
                         cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData , target);
                     }else if(zcode == "OFFERAREA181"){ //슬라이드 팝업
                         cfmNoticeAreaHtml.callbackCampaignTop(type, result);
                     }else if(zcode == "OFFERAREA005"){ //서브페이지 팝업
                         cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData , resultData);
                     }else if(zcode == "OFFERAREA185" || zcode == "OFFERAREA186" || zcode == "OFFERAREA187" ){ //나의 가입정보 
                         mainAreaHtml.callbackCampaignPsnban(type, resultData);
                     }else if(zcode == "OFFERAREA184"){ //맴버십 
                         mainAreaHtml.callbackCampaignPsnbanMms(type, resultData);
                     }
                }                
                
            } catch (e) {
                common_log.log('mkt_offer.js campaignBigBannerNew() [' + e.message + ']');
            }


        }
    });
}

/* 온마시 메인, 서브 토스트 팝업
* areaData : 데이터
* target : ui html
* order : 추후 정렬 연동 필요시 사용으로 유지
* mtype : 메뉴코드 연동 필요 시 'pop'(입점)
* zcode : 온마시 오퍼 연동 코드 (메인:OFFERAREA182, 입점:cms 데이터 연동)
*/
var campaignToast = function(areaData, target, mtype, order, zcode){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    if (mtype == 'pop') {
        data.muCd = menuCd; // 페이지코드
    }
    data.zoneCode = zcode.toUpperCase(); //코드 대문자 변환
    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/common/getBanner',
        'cookie' : true,
        'type' : 'post',
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            var resultData = {};
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                    if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
                        resultData.zcode = zcode;
                        
                        trgt.campaignViewLog(resultData.caVal1, resultData.caVal2, resultData.caVal3);
                        var Click_Name = '^m^KT-개인_타겟오퍼' + resultData.statCd + '^노출';
                        var gaClick = gaSplitClickName(Click_Name);
                        gaEventTracker(true,gaClick["Click_Set1"],gaClick["Click_Set2"],gaClick["Click_Set3"]);
                        
                    }
                }
                
            } catch (e) {
                common_log.log('mkt_offer.js campaignToast() [' + e.message + ']');
            } finally {
                cfmNoticeAreaHtml.callbackCampaignToast(type, areaData, target, resultData, order);

            }
        }
    });
}

// 메인 다중 캠페인 조회(메인 22.08.04)
// mtype : pop (파라미터 muCd 추가 그외win 안함)
var campaignMultiBanner = function(target, mtype, order, zcode){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    if (mtype == 'pop') {
        data.muCd = menuCd; // 페이지코드
    }
    data.zoneCode = zcode;

    mKt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/common/getBannerLst',
        'cookie' : true,
        'type' : 'post',
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                	
                    var resultData = result.data;
                    var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');
                    var arradobeView = new Array();

                	
                	if(zcode.indexOf("OFFERAREA038") > -1 || zcode.indexOf("OFFERAREA091") > -1 ){
                		
                		mainAreaHtml.callbackCampaignBigBanner(type, target, resultData, order);
                		
                		//노출통계
                		$j.each(resultData, function(idx, data) {
                			if (data.bnStDt <= nTime && nTime <= data.bnFnsDt){
                				campaignMultilStat(data.caVal1, data.caVal2, data.caVal3, data.statCd);
                				arradobeView.push({ClickCatName :'^m^KT-개인_타겟오퍼', ClickName: data.statCd+'^노출'});
                			}
                		}); 
                	}
                	
                	
                	if(zcode.indexOf("OFFERAREA096") > -1 || zcode.indexOf("OFFERAREA097") > -1 || zcode.indexOf("OFFERAREA098") > -1 ){
                		
                		mainAreaHtml.callbackCampaignOfferset(type, target, resultData, order);
                		
                		//노출통계
                		$j.each(resultData, function(idx, data) {
                			if (data.bnStDt <= nTime && nTime <= data.bnFnsDt){
                				campaignMultilStat(data.caVal1, data.caVal2, data.caVal3, data.statCd);
                				arradobeView.push({ClickCatName :'^m^KT-개인_타겟오퍼', ClickName: data.statCd+'^노출'});
                			}
                		}); 
                	}

                    //다중 노출 통계
                    //KT_trackMutiView(arradobeView);
                }else{
                	if(zcode.indexOf("OFFERAREA038") > -1 || zcode.indexOf("OFFERAREA091") > -1 ){
                		
                		mainAreaHtml.callbackCampaignBigBanner(type, target, resultData, order);
                		
                	}
                	
                	
                	if(zcode.indexOf("OFFERAREA096") > -1 || zcode.indexOf("OFFERAREA097") > -1 || zcode.indexOf("OFFERAREA098") > -1 ){
                		
                		mainAreaHtml.callbackCampaignOfferset(type, target, resultData, order);
                		
                	}
                }           
            } catch (e) {
                common_log.log('mkt_offer.js campaignMultiBanner() [' + e.message + ']');
            }
        }
    });
}

//캠페인 클릭 리뉴얼
var campaignClickNew = function(caVal1 , caVal2 , caVal3 , statCd){
	trgt.campaignClickLog(caVal1, caVal2, caVal3, 'CL', '^m^KT-개인_타겟오퍼' + statCd + '^클릭');
	KT_trackClicks('mKT-개인_메인', '^m^KT-개인_타겟오퍼' + statCd + '^클릭');
}

//캠페인 클릭 리뉴얼 공통페이지
var campaignClickSubNew = function(caVal1 , caVal2 , caVal3 , statCd){
	trgt.campaignClickLog(caVal1, caVal2, caVal3, 'CL', '^m^KT-개인_타겟오퍼' + statCd + '^클릭');
	KT_trackClicks('mKT-개인_공통', '^m^KT-개인_타겟오퍼' + statCd + '^클릭');
}

//캠페인 닫기
var campaignCloseNew = function(caVal1 , caVal2 , caVal3 , statCd){
	trgt.campaignClickLog(caVal1, caVal2, caVal3, 'X', '^m^KT-개인_타겟오퍼' + statCd + '^닫기');
	KT_trackClicks('mKT-개인_메인', '^m^KT-개인_타겟오퍼' + statCd + '^닫기');
}

//캠페인 닫기
var campaignCloseSubNew = function(caVal1 , caVal2 , caVal3 , statCd){
	trgt.campaignClickLog(caVal1, caVal2, caVal3, 'X', '^m^KT-개인_타겟오퍼' + statCd + '^닫기');
	KT_trackClicks('mKT-개인_공통', '^m^KT-개인_타겟오퍼' + statCd + '^닫기');
}


// -----------------------  리뉴얼 호출 변경 끝 -------------------------------------