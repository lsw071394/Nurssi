/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

// 기본도메인
var default_domain 	= 'kt.com';

var cfm_domain 		= '';   // 공통
var cl_domain 		= '';   // 개인
var bz_domain 		= '';   // 기업
var corp_domain 	= '';   // 회사소개(국문)
var corp_eng_domain = '';   // 회사소개(영문)
var api_domain 		= '';   // api
var snc_domain 		= '';   // See&Click
var logapi_domain	= '';   // logapi
var omslog_domain	= '';   // 온라인마케팅 로그
var omsoffer_domain	= '';   // 온라인마케팅 타겟오퍼
var iAmUI_URL 		= '';   // IAMUI 호출 URL
var search_URL 		= '';   // 통합검색 URL
var sdeg_domain		= '';   // 만족도조사 URL

var cfm_pc_domain 	= '';		// 공통
var cl_pc_domain 	= '';		// 개인
var bz_pc_domain 	= '';		// 기업
var corp_pc_domain	= '';		// 회사소개

/*
PC      개인		: 'A00000'
Mobile	개인		: 'A00000'
PC		기업		: '3A0000'
Mobile	기업		: '4A0000'
PC		IR(국문)	: '5A0000'
Mobile	IR(국문)	: '6A0000'
PC		IR(영문)	: '7A0000'
Mobile	IR(영문)	: '8A0000'
*/
var ktMenuCode 		= '';   // 메뉴코드(menuCode -> ktMenuCode 변경 Shop이랑 겹침-2차)
var ktChannel 		= 'Cl'; // 채널코드
var ktChannelName 	= '개인'; // 채널명

// 숨김메뉴관리
var hideMenuArr_login = ['MFA000']; // 로그인상태
var hideMenuArr_logout = ['MBA000']; // 로그아웃상태

//로그인후 이름
var gnbInfoName = '';
//로그인후 생일여부
var gnbInfoBirthYn = ''; 

// screen API
var cfmloadScreen = false;
var loadTabBarChk;      //탭바
var loadKTalkChk;       //케이톡
var loadFintShopChk;    //매장찾기
var loadStsfcSurveyChk; //만족도조사
var loadServerTime;		//서버시간

// 만족도조사
var sdegWidgetId;	//Widget ID
var sdegKey;		//key

//css 및 js cashing 해결을 위한 버전 추가
var version = '?version=24110701';

// 개발 환경에 따른 URL 설정 /start
var properties 		= 'prd';

cfm_domain 		= 'https://m.' 		    + default_domain;
cl_domain 		= 'https://m.' 			+ default_domain;
bz_domain 		= 'https://m.biz.' 		+ default_domain;
corp_domain 	= 'https://m.corp.'		+ default_domain;
corp_eng_domain	= 'https://m.corp.'		+ default_domain + '/eng';
api_domain   	= 'https://m.rdi.'     	+ default_domain;
snc_domain 		= 'https://snc.' 		+ default_domain;
logapi_domain 	= 'https://logapi.' 	+ default_domain;
omslog_domain	= 'https://log.onmas.'	+ default_domain;
omsoffer_domain	= 'https://offer.onmas.'+ default_domain;

cfm_pc_domain 	= 'https://cfm.' 		+ default_domain;
cl_pc_domain 	= 'https://www.' 		+ default_domain;
bz_pc_domain 	= 'https://biz.' 		+ default_domain;
corp_pc_domain	= 'https://corp.' 	    + default_domain;

iAmUI_URL		= 'https://accounts.kt.com';		
search_URL		= 'https://m.search.kt.com';

// 개발 환경에 따른 URL 설정 /end

// 입점 서비스 페이지 내 KT 슬로건 (title tag) 일괄 변경
var mCfmTit = mCfmTitleTag();

//iAmUI 앱에서 경로체크
iAmUI_URL = iAmUIPageChk();

// 도메인설정
document.domain = default_domain;

// UI 관련
document.write('<link rel="stylesheet" type="text/css" href="' + cfm_domain + '/css/v2/kt-style.css' + version + '">');
document.write('<script src="' + cfm_domain + '/js/v2/plugin/jquery-3.6.0.min.js"></script>');
document.write('<script src="' + cfm_domain + '/js/v2/plugin/jquery-ui.min.js"></script>');
document.write('<script src="' + cfm_domain + '/js/v2/plugin/aos.js"></script>');
document.write('<script src="' + cfm_domain + '/js/v2/plugin/swiper.min.js"></script>');
document.write('<script src="' + cfm_domain + '/js/v2/plugin/jquery.bxslider.js' + version + '"></script>');
document.write('<script src="' + cfm_domain + '/js/v2/plugin/gsap.min.js"></script>');
document.write('<script src="' + cfm_domain + '/js/v2/common/components.js"></script>');
// 공통 js
document.write('<script src="' + cfm_domain + '/js/json/gtm_logUse_html.js' + version + '"></script>');

document.write('<script src="' + cfm_domain + '/js/v2/common/common_log.js' + version + '"></script>');
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_api.js' + version + '"></script>');    //API연동
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_offer.js' + version + '"></script>');	//온마시연동
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_common.js' + version + '"></script>'); //공통함수
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_ui.js' + version + '"></script>');     //공통 ui
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_gnb.js' + version + '"></script>');    //GNB
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_footer.js' + version + '"></script>'); //FOOTER
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_notice.js' + version + '"></script>'); //공지
document.write('<script src="' + cfm_domain + '/js/v2/common/mkt_search.js' + version + '"></script>'); //통합검색
document.write('<script src="' + cfm_domain + '/js/integrate/mkLogcode.js' + version + '"></script>');  //로그
document.write('<script src="' + cfm_domain + '/js/ADOBE/mstaticsLogcodeLaunch.js' + version + '"></script>');//Adobe통계
document.write('<script src="' + cfm_domain + '/js/v2/sdp/check_utf.js' + version + '"></script>');//자동로그아웃

document.write('<script src="' + cfm_domain + '/js/json/oms_logUse_html.js' + version + '"></script>');
document.write('<script src="' + cfm_domain + '/js/common/global/oms.js' + version + '"></script>');

//document.write('<script src="' + omslog_domain + '/js/mlogCollect.js' + version + '"></script>');
//document.write('<script src="' + omslog_domain + '/js/mtargetOffer.js' + version + '"></script>');


// 메뉴 체크
var chkMenu = menuChk();
//adobe page name 체크
var adobePageName = adobePageNameChk();

// mKtHIDE
var mKtHIDEGNB = true;
var mKtHIDEFOOTER = true;
var mKtHIDETITLE = true;

var HdEGnb = document.location.href.indexOf("%23HIDEGNB");
var HdDGnb = document.location.href.indexOf("#HIDEGNB");
var HdEFooter = document.location.href.indexOf("%23HIDEFOOTER");
var HdDFooter = document.location.href.indexOf("#HIDEFOOTER");
var HdETitle = document.location.href.indexOf("%23HIDETITLE");
var HdDTitle = document.location.href.indexOf("#HIDETITLE");

if ((HdEGnb == -1 && HdDGnb == -1) && navigator.userAgent.match(/#HIDEGNB/) == null){    
    mKtHIDEGNB = false;
}
if ((HdEFooter == -1 && HdDFooter == -1) && navigator.userAgent.match(/#HIDEFOOTER/) == null){
    mKtHIDEFOOTER = false;
}
if ((HdETitle == -1 && HdDTitle == -1) && navigator.userAgent.match(/#HIDETITLE/) == null){
    mKtHIDETITLE = false;
}

// 공통 호출 함수
window.mkt = {

    // GNB 영역 생성
    gnb : function(options){        
        browserCheck(); //브라우져 체크

		try {
			cfmGnbAreaHtml.init(options);
		} catch(e){
			common_log.log('mKTGlobal.js gnb() [' + e.message + ']');
		}
    },

    // 푸터 영역 생성
    footer : function(options){
		try {
			cfmFooterAreaHtml.init(options);
		} catch(e){
			common_log.log('mKTGlobal.js footer() [' + e.message + ']');
		}
    },

	// locationBar 영역 생성
	locationBar : function(){		
		try {
			cfmGnbAreaHtml.locationBar();
		} catch(e){
			common_log.log('mKTGlobal.js locationBar() [' + e.message + ']');
		}
	},

    // 간편조회 배너 영역 생성
	simpleBanner : function(){
		banner.simple();
	},

    // 마이페이지 배너 영역 생성-미사용
	//mypageBanner : function(){
	//	banner.mypage();
	//},

    // 쿠키 정보 설정
	setComCookie : function (name, value, expireDate){
		setComCookie(name, value, expireDate);
	},
	
	// 쿠키 정보 조회
	getComCookie : function (name){
		var search = name + '=';
		if (document.cookie.length > 0){
			offset = document.cookie.indexOf(search);
			if (offset !== -1){
				offset += search.length;
				end = document.cookie.indexOf(';', offset);
				if (end === -1)
					end = document.cookie.length;
				return unescape(document.cookie.substring(offset, end));
			}
		}
		return '';
	},

    // 로그인 여부 확인
    isLoginStatus : function(){
        var kt_sso_userid = this.getComCookie('kt_sso_userid');
        if(kt_sso_userid !== ''){
			return 'Y';
		} else {
			return 'N';
		}
    },

	//고도화 버전 탭바 관련 추가 - 21.06
    goLogin : function(){
        var rtUrl = top.document.location.href;      
        
        //탭바노출여부        
        if(rtUrl.indexOf("#") > -1){
            var thisTab = rtUrl.split("#")[1];
            var regEx = new RegExp('\\#(benefits|mypage)', 'gi');
            rtUrl = rtUrl.indexOf('?') > -1 ? rtUrl.replace(regEx, '&tab='+ thisTab) : rtUrl.replace(regEx, '?tab='+ thisTab);
        }

        mkt.wamuiLink('login', rtUrl);
    },

	//고도화 버전 탭바 관련 추가 - 21.06
    goLogout : function(){
        var rtUrl = top.document.location.href;

        //탭바노출여부        
        if(rtUrl.indexOf("#") > -1){
            var thisTab = rtUrl.split("#")[1];
            var regEx = new RegExp('\\#(benefits|mypage)', 'gi');
            rtUrl = rtUrl.indexOf('?') > -1 ? rtUrl.replace(regEx, '&tab='+ thisTab) : rtUrl.replace(regEx, '?tab='+ thisTab);
        } 

        mkt.wamuiLink('logout', rtUrl);
    },

    // 세션 로그아웃
    sdpCommonSessionlogOut : function(){
        var rtUrl = top.document.location.href;

        //탭바노출여부        
        if(rtUrl.indexOf("#") > -1){
            var thisTab = rtUrl.split("#")[1];
            var regEx = new RegExp('\\#(benefits|mypage)', 'gi');
            rtUrl = rtUrl.indexOf('?') > -1 ? rtUrl.replace(regEx, '&tab='+ thisTab) : rtUrl.replace(regEx, '?tab='+ thisTab);
        } 

        mkt.wamuiLink('logout', rtUrl);
     },

    //로그인, 로그아웃
    wamuiLink : function(type, rtUrl){
        if(type == 'login'){
            top.location.href = iAmUI_URL + "/wamui/AthMobile.do?mRt="+encodeURI(rtUrl);
        }else if(type == 'logout'){
            top.location.href = iAmUI_URL + "/wamui/ComSSOLogout.do?mRt="+encodeURI(rtUrl);
        }
    },

    //통계
    menuLinkStat : function(murl, adobeStat){
        
        top.location.href = murl;

        if(document.getElementById('ktMainYn')){            
            //KT_trackClicks('모바일KT닷컴_메인1.0',adobeStat);
        }else{            
            //KT_trackClicks('모바일KT닷컴_서브1.0', adobeStat);
        }
        s.events = "";s.eVar8 = "";s.eVar9 = "";s.hier2 = "";        
    },

    // add. 2017.07.25
    appChkLogin : function(rtUrl){
        top.location.href = iAmUI_URL + "/wamui/AthMobile.do?mRt="+encodeURI(rtUrl);
    },

    appChk : function(){
        var isApp = false;
        if(/ollehcs/i.test(navigator.userAgent)){
            return true;
        }
        return isApp;
    }, 

    iamuiUrlRtn : function(rtUrl){
        top.location.href = iAmUI_URL + rtUrl;
    }
}

window.mktWebView = {
    onJsAlert : function (MsgType, Msg, confirmTrue, confirmFalse)
    {
        if(MsgType === 'confirm'){
            if(confirm(Msg)){
                eval(confirmTrue);
				//(new Function(confirmTrue+"();"))();
            } else { 
                eval(confirmFalse);
				//(new Function(confirmFalse+"();"))();
            };
        }
        else if (MsgType === 'alert'){
            alert(Msg);
        }
    },
    /** 
     * 핸드폰번호 마스크처리(010-1243-*111)
     * 정규식 이용. 작업을 최소화 (치환 방식)
     */
    hpFormatHiddenByRegx2 : function(hp){
        var pattern = /^(\d{3})-?(\d{1,4})-?\d(\d{3})$/;
        var result = "";
        if(!hp) return result;

        if(pattern.test(hp)){
            result = hp.replace(pattern, '$1-$2-*$3');
        } else {
            result = "***";
        }
        document.write(result);
    },
    /** 
     * 핸드폰번호 마스크처리(010-12**-*111)
     * 정규식 이용. 작업을 최소화 (치환 방식)
     */
    hpFormatHiddenByRegx : function(hp){
        var pattern = /^(\d{3})-?(\d{1,2})\d{2}-?\d(\d{3})$/;
        var result = "";
        if(!hp) return result;

        if(pattern.test(hp)){
            result = hp.replace(pattern, '$1-$2**-*$3');
        } else {
            result = "***";
        }
        document.write(result);
    }
}

// 고객센터 앱 확인.
var appChk = isAppCheck();
var appVersionNum = '';
var logoutURL = iAmUI_URL + "/wamui/ComSSOLogout.do";

function fnChkDevice(){
    if (/Android/i.test(navigator.userAgent))
    {
        onClickAppARD("");
    }else if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
        onClickAppiOS();
    }else{
        alert("이 브라우저에서는 지원하지 않습니다. \n 핸드폰에서 이용해주세요.");
    }
}

function onClickAppiOS(){ 
    setTimeout(function(){ 
        if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) 
        { 
            window.open("http://itunes.apple.com/kr/app/id355838434?mt=8","",""); 
        }
   }, 250); 
   window.location = "showcsAppLink://";    // app 실행
}

function onClickAppARD(url){ 
    var storeUrl = "ollehcs://start";
    var clicked_At = new Date();
    
    if (url==""){url = "https://play.google.com/store/apps/details?id=com.ktshow.cs";}

    Check_Timer = setTimeout(function(){
        var iframe = 0;
        if (new Date() - clicked_At < 1200){ 
            clearTimeout(Check_Timer);
            //window.location = "./AppLink/App.asp"
            //window.location = url;
            window.open(url,"","");
        }
    }, 1000);
    $("#div_app").html("<iframe id='frm' src='" + storeUrl + "' width='0' height='0' frameborder=0></iframe>");     // app 실행
}

// 고객센터App 5.3.0 버전 이상 타이틀영역 비노출적용
function appTitleSkip(){
	//if(appChk){
		var agent = navigator.userAgent.toLowerCase();
		var isIOS = (agent.indexOf("iphone")>-1||agent.indexOf("ipad")>-1||agent.indexOf("ipod")>-1);
		var isAndroid = (agent.match('android') != null);

		var appverArr = agent.split("appver=");
		var appver = "";
		var int_value;

		//replaceAll prototype 선언
		String.prototype.replaceAll = function(org, dest){              return this.split(org).join(dest);      }
		//trim 선언
		String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g,""); }

		//agent 값에서 appver값을 가져옴
		if(appverArr != ""){
			appver = appverArr[1].trim();
			appver = appver.replaceAll(".", "");
		}
		//appver값을 숫자형으로 변환
		if(typeof(appver) == "string"){
			int_appver = parseInt(appver);
		}

		// OS별 기준값 설정
		var stdApVer = "";
		if(isAndroid){
			stdApVer = "05.03.00";
		}else {
			stdApVer = "5.3.0";
		}

		// '.'제외하고 숫자형으로 변환
		stdApVer = stdApVer.replaceAll(".", "");
		var int_stdApVer = parseInt(stdApVer);

		//기준값보다 작을 경우, 기존 버전으로 타이틀 노출시킴
		if(int_stdApVer > int_appver){
			//alert("기존 버전임");
			//타이틀 노출 처리
		//기준값보다 같거나 클 경우, 신규버전으로 타이틀 미노출 시킴
		}else{
			//alert("신규 버전임");
			//타이틀 미노출 처리
			$j("#mCfmClContainer h3.title").html('');
            //추천앱 타이틀 미노출 처리
            $j("#recmdApp .recommend-app-list .title").html('');
		}
	//}
}

// title tag
function mCfmTitleTag(){
    var mCfmTit;
    try {
        mCfmTit = document.title;
        if (mCfmTit !== undefined && mCfmTit !== null && mCfmTit !== ''){
            document.title = document.title.replace(/글로벌 No.1 KT/g, 'KT'); //.replace(/Global No.1 KT/g, '');
        }
    } catch (error) {
        mCfmTit = '';
    }   
    
    return mCfmTit;
}

// main 페이지 확인
function mainCheck(channel){
    var mainYn = false
	if(document.getElementById('ktMainYn')){
        mainYn = true;			
	}
    return mainYn;
}

// menucode 체크 함수 
function menuChk(){
	try
	{
		if (ktMenuCd === undefined || ktMenuCd === null || ktMenuCd === ''){
			ktMenuCode = 'XXXXXX';
            ktMenuCd = ktMenuCode;
		} 
		else {
			if (ktMenuCd.length > 6){
				ktMenuCode = ktMenuCd.substring(0, 6);
			} else {
				ktMenuCode = ktMenuCd;
			}
		}
	}catch(e)
	{
		ktMenuCode = 'XXXXXX';
        ktMenuCd = ktMenuCode;
	}
	
	return ktMenuCode.substring(0, 1);
}

//adobe page name 체크
function adobePageNameChk() {
	var rtVal = '';
	try
	{
		if (ktadPageName === undefined || ktadPageName === null || ktadPageName === '') {
			rtVal = '';
		} 
		else {
			rtVal= ktadPageName;
		}
	}catch(e)
	{
		rtVal = '';
	}
	
	return rtVal;
}

// 쿠키 정보 설정
function setComCookie(name, value, expireDate){
    var cookie = name + '=' + escape (value) +  '; path=/; domain=.kt.com;';
    if(expireDate !== undefined && expireDate !== null && expireDate !== ''){
        var today = new Date();
        expireDate = expireDate * 24 * 60 * 60; // 초로 변환
        today.setSeconds(today.getSeconds() + expireDate);
        cookie += 'expires=' + today.toGMTString() + ';';
    }
    document.cookie = cookie;
}

// 쿠키 정보 조회
function getComCookie(name){
	var cval = mkt.getComCookie(name);
	return cval;
}

// AppView Check
function isAppCheck(){    
    var isApp = false;
    if(/ollehcs/i.test(navigator.userAgent)){
        return true;
    }
	return isApp;
}

// 고객센터 AppVer 확인
function getAppVer(){

    var appVer = getComCookie('appver');
    var appVer_re = '';
    var appVer_reValue = '';

    if(appVer !== ''){

        appVer_re = appVer.replace('%2E', '');
        var vals = appVer_re.split("\\.");

        for(var i=0; i < vals.length; i++){
            if(vals[i] !== ''){
                appVer_reValue += vals[i];
            }
        }

        return appVer_reValue;
    }

    return appVer_reValue;
}

// Browser Check
function browserCheck(){
    var url = '';
	if(navigator.geolocation || window.navigator.geolocation){
	} else {
        if(chkMenu === '4'){
            url = bz_domain;
        } else if(chkMenu === '6'){
            url = corp_domain;
        } else if(chkMenu === '8'){
            url = corp_eng_domain;
        } else {
            url = cl_domain;
        }
		document.location.href = url + '/html/error/error4.html';
	}
}

// element show/hide
function showElementById(id, flag){
    var el = document.getElementById(id);
    if(el !== undefined && el !== null && el !== ''){
        if (flag === undefined || flag === null || flag === ''){
            flag = 'block';
        }

        el.style.display = flag;
    }
}

// 통계코드 관련 하단 이동 1116
var adobeLoadCnt = 0;
function loadAdobeChk(){
	if(adobeLoadCnt < 10){
		if(typeof s.account == "undefined"){
			setTimeout(function(){
				loadAdobeChk();
			}, 500);
			adobeLoadCnt++;
		}else{
			try{ 
                s.t();
            }catch(e){
                common_log.log('mKTGlobal.js s.t() [' + e.message + ']');
            };
		}
	}
}

//iAmUI 경로 체크
function iAmUIPageChk() {

    var rtURL = iAmUI_URL;

    var appChkVal = false;

    if(/ollehcs/i.test(navigator.userAgent)){
        appChkVal = true;
    }

    if (appChkVal)
    {
        rtURL = 'https://login.kt.com';
    }
	
	return rtURL;
}

function iamuiUrlRtnFnc(rtURL)
{
    return iAmUI_URL + rtURL;
}
