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

// GNB 영역
var cfmGnbHtml = '';
cfmGnbHtml += '<header>';
cfmGnbHtml += '    <div class="fixedheader">';
cfmGnbHtml += '        <div class="js-popup nav-popup" id="nav" aria-hidden="true">';
cfmGnbHtml += '            <nav id="navopen" class="open">';
cfmGnbHtml += '                <div id="mCfmClMenu" class="mCfmClMenu">';
cfmGnbHtml += '                    <ul class="list-channel clearboth"></ul>'; //채널메뉴
cfmGnbHtml += '                    <ul class="list-utils clearboth"></ul>'; //개인화영역
cfmGnbHtml += '                    <div class="mCfmClNavTabConHotlink"></div>'; //핫링크 영역
cfmGnbHtml += '                    <div class="mCfmClNavSearchDiv">'; //메뉴검색
cfmGnbHtml += '                        <form onsubmit="return false;">';
cfmGnbHtml += '                    	    <fieldset>';
cfmGnbHtml += '                    		    <span class="mCfmClNavSearchSpan">';
cfmGnbHtml += '                    			    <input type="text" class="mCfmClNavSearchInput" name="mCfmClNavMenuSearchInput" id="mCfmClNavMenuSearchInput" value="" title="검색어입력" placeholder="메뉴를 검색해주세요." maxlength="30" autocomplete="off">';
cfmGnbHtml += '                    				<button type="button" class="mCfmClNavSearch-btnclear">검색어 지우기</button>';
cfmGnbHtml += '                    				<button type="submit" class="mCfmClNavSearch-btnsearch"><span class="hidetxt">검색</span></button>';
cfmGnbHtml += '                    			</span>';
cfmGnbHtml += '                    		</fieldset>';
cfmGnbHtml += '                    	</form>';
cfmGnbHtml += '                    	<div class="mCfmClNavSearchLayer">';
cfmGnbHtml += '                    	    <div id="mCfmClNavSearch-akcDivId" class="mCfmClNavSearch-akc-div">';
cfmGnbHtml += '                    	        <div class="mCfmClNavSearch-auto-div">';
cfmGnbHtml += '                    	            <a href="#none" class="mCfmClNavSearch-auto-title">통합검색 바로가기</a>';
cfmGnbHtml += '                    	            <ul class="mCfmClNavSearch-auto-list"></ul>'; //메뉴검색결과
cfmGnbHtml += '                    	        </div>';
cfmGnbHtml += '                    	        <button type="button" class="mCfmClNavSearch-close-search"><span>닫기</span></button>';
cfmGnbHtml += '                    	    </div>';
cfmGnbHtml += '                    	</div>';
cfmGnbHtml += '                    </div>'; 
cfmGnbHtml += '                    <div class="mCfmClNavTabDiv">'; 
cfmGnbHtml += '                        <strong class="tit_mCfmClNavTabCon">전체 메뉴</strong>';
cfmGnbHtml += '                        <ul class="category mCfmClNavTabCon" tabcontents="trigger_mCfmClNavTabAllmenu"></ul>'; //전체메뉴
cfmGnbHtml += '                    </div>'; 
cfmGnbHtml += '                    <button type="button" class="btn-total-close js-btn-close" role="button"><span class="hidetxt">전체메뉴 닫기</span></button>';
cfmGnbHtml += '                </div>';
cfmGnbHtml += '            </nav>';
cfmGnbHtml += '        </div>'; 


cfmGnbHtml += '        <div class="popup-dim-dark js-popup" id="cfmSearch" aria-hidden="true">'; //통합검색
cfmGnbHtml += '            <div class="m-olleh-search-wrap" style="">';
cfmGnbHtml += '                <div class="m-olleh-search-input">';
cfmGnbHtml += '                    <form onsubmit="return false;">';
cfmGnbHtml += '                        <fieldset>';
cfmGnbHtml += '                            <span class="searchg-div">';
//cfmGnbHtml += '                                <input type="text" class="search-input js-focuslink" name="searchInput" id="searchInput" value="" title="검색어입력" placeholder="갤럭시S21" maxlength="30" autocomplete="off">';
cfmGnbHtml += '                                <input type="text" class="search-input" name="searchInput" id="searchInput" value="" title="검색어입력" placeholder="갤럭시S21" maxlength="30" autocomplete="off">';
cfmGnbHtml += '                            </span>';
cfmGnbHtml += '                            <input type="button" role="button" class="searchInput-btn-clear btn-clear" style="display: none;" title="검색어 지우기"></input>';//vos 1128424
cfmGnbHtml += '                            <a href="#none" role="button" class="btn-search">검색</a>';//vos 1128424
cfmGnbHtml += '                        </fieldset>';
cfmGnbHtml += '                    </form>';
cfmGnbHtml += '                </div>';
cfmGnbHtml += '                <div id="akcDivId" class="akc-div">';
cfmGnbHtml += '                    <div id="searchWrapBefore" class="search-wrap-before" style="display: block;">';
cfmGnbHtml += '                        <div class="cfmCltabs">';
cfmGnbHtml += '                            <ul class="cfmCltab">';
cfmGnbHtml += '                                <li class="cfmCl-ui-tab-title"><a role="button" href="#" class="menu1st kt_popkeyword"><span>KT 인기검색어</span></a></li>';
cfmGnbHtml += '                                <li class="cfmCl-ui-tab-title"><a role="button" href="#" class="menu2nd shop_popkeyword"><span>Shop 인기검색어</span></a></li>';
cfmGnbHtml += '                            </ul>';
cfmGnbHtml += '                            <div class="cfmCltab-contents">';
cfmGnbHtml += '                                <div class="cfmCl-tabcontents active">';
cfmGnbHtml += '                                    <ol class="popular-searches"></ol>';
cfmGnbHtml += '                                </div>';
cfmGnbHtml += '                            </div>';

cfmGnbHtml += '                            <section class="cfmCltab-hotlink" id="cfmCltab-hotlink-section">';
cfmGnbHtml += '                                 <strong class="title">금주 급상승 메뉴</strong>';
cfmGnbHtml += '                                 <ul id="cfmCltab-hotlink-ul">';
//cfmGnbHtml += '                                 	<li class="disable"><a role="button"href="">#하드코딩</a></li>';
//cfmGnbHtml += '                                 	<li><a role="button"href="">#하드코딩2</a></li>';
//cfmGnbHtml += '                                 	<li class="disable"><a role="button"href="">#납부확인서</a></li>';
//cfmGnbHtml += '                                 	<li><a role="button"href="">#하드코딩3</a></li>';
//cfmGnbHtml += '                                 	<li class="disable"><a role="button"href="">#하드코딩4</a></li>';
//cfmGnbHtml += '                                 	<li><a role="button"href="">#하드코딩5</a></li>';
//cfmGnbHtml += '                                 	<li><a role="button"href="">#하드코딩6</a></li>';
//cfmGnbHtml += '                                 	<li class="disable"><a role="button"href="">#하드코딩7</a></li>';
cfmGnbHtml += '                                 </ul>';
cfmGnbHtml += '                            </section>';


cfmGnbHtml += '                            <section class="cfmCltab-helplink" id="cfmCltab-helplink-section">';
cfmGnbHtml += '                                 <strong class="title">이런 서비스를 찾으시나요?</strong>';
cfmGnbHtml += '                                 <div class="helplink-swiper">';

cfmGnbHtml += '                                 	<div class="controls-direction">';
cfmGnbHtml += '                                 		<button role="button" class="swiper-button-prev"><span class="hidetxt">이전 배너 보기</span></button>';
cfmGnbHtml += '                                 		<button role="button" class="swiper-button-next"><span class="hidetxt">다음 배너 보기</span></button>';
cfmGnbHtml += '                                 	</div>';

cfmGnbHtml += '                                 	<div class="swiper-controle-wrap">';
cfmGnbHtml += '                                 		<!-- If we need pagination -->';
cfmGnbHtml += '                                 		<div class="swiper-pagination"></div>';

cfmGnbHtml += '                                 		<!-- If we need stop, play buttons -->';
cfmGnbHtml += '                                 		<div class="controls-autoplay">';
cfmGnbHtml += '                                 			<button role="button" class="swiper-button-stop"><span class="hidetxt">자동 롤링 중지</span></button>';
cfmGnbHtml += '                                 			<button role="button" class="swiper-button-play active"><span class="hidetxt">자동 롤링 실행</span></button>';
cfmGnbHtml += '                                 		</div>';
cfmGnbHtml += '                                 	</div>';

cfmGnbHtml += '                                 	<div class="swiper-wrapper" id="helplink-swiper-wrapper">';
cfmGnbHtml += '                                 	</div>';
cfmGnbHtml += '                                 </div>';
cfmGnbHtml += '                            </section>';

cfmGnbHtml += '                            <a role="button"href="#none" class="close-search js-btn-close">';
cfmGnbHtml += '                                <span><span class="hidetxt">검색 레이어 </span>닫기</span>';
cfmGnbHtml += '                            </a>';


cfmGnbHtml += '                        </div>';
cfmGnbHtml += '                    </div>';
cfmGnbHtml += '                    <div id="searchWrapAfter" class="search-wrap-after" style="display: none;">';
cfmGnbHtml += '                        <div class="auto-list">';
cfmGnbHtml += '                            <strong class="title">자동완성</strong>';
cfmGnbHtml += '                            <ul></ul>';
cfmGnbHtml += '                        </div>';
cfmGnbHtml += '                        <div class="quick-menu">';
cfmGnbHtml += '                            <strong class="title">메뉴 바로가기</strong>';
cfmGnbHtml += '                            <ul></ul>';
cfmGnbHtml += '                        </div>';
cfmGnbHtml += '                        <a href="#none" class="close-search js-btn-close"><span>닫기</span></a>';
cfmGnbHtml += '                    </div>';
cfmGnbHtml += '                </div>'; 
cfmGnbHtml += '            </div>';
cfmGnbHtml += '         </div>';
cfmGnbHtml += '    </div>';


cfmGnbHtml += '    <div class="header-location">'
cfmGnbHtml += '        <nav role="menubar" aria-label="서브 메뉴" class="ui-sub-menu">';
cfmGnbHtml += '				<div class="ui-menu-1depth" id="subminlayer" aria-hidden="true">';
cfmGnbHtml += '					<div class="scroll-box">';
cfmGnbHtml += '						<ul role="menu" class="location-1depth-list">';
//cfmGnbHtml += '							<li class="active">';
//cfmGnbHtml += '								<a role="button"href="javascript:mKt_common.ktMenuLinkStat("https://m.kt.com","^mKT-개인_공통^GNB^상단고정^메뉴레이어^홈","_self","A00000");" class="js-focuslink">홈</a>';
//cfmGnbHtml += '							</li>';
//cfmGnbHtml += '							<li>';
//cfmGnbHtml += '								<a role="button"href="#none" data-menucd="G00000" title="선택됨">마이</a>';
//cfmGnbHtml += '							</li>';
//cfmGnbHtml += '							<li>';
//cfmGnbHtml += '								<a role="button"href="javascript:mKt_common.ktMenuLinkStat("https://m.product.kt.com","^mKT-개인_공통^GNB^상단고정^메뉴레이어^상품","_self","B00000");" data-menucd="B00000">상품</a>';
//cfmGnbHtml += '							</li>';
//cfmGnbHtml += '							<li>';
//cfmGnbHtml += '								<a role="button"href="#none" data-menucd="C00000">혜택</a>';
//cfmGnbHtml += '							</li>';
//cfmGnbHtml += '							<li>';
//cfmGnbHtml += '								<a role="button"href="javascript:mKt_common.ktMenuLinkStat("https://m.help.kt.com/s_main.jsp","^mKT-개인_공통^GNB^상단고정^메뉴레이어^고객지원","_self","E00000");" data-menucd="E00000">고객지원</a>';
//cfmGnbHtml += '							</li>';
//cfmGnbHtml += '							<li>';
//cfmGnbHtml += '								<a role="button"href="javascript:mKt_common.ktMenuLinkStat("https://m.shop.kt.com:444/m/main.do","^mKT-개인_공통^GNB^상단고정^메뉴레이어^Shop","_self","F00000");" data-menucd="F00000">Shop</a>';
//cfmGnbHtml += '							</li>';
//cfmGnbHtml += '							<li>';
//cfmGnbHtml += '								<a role="button"href="javascript:mKt_common.ktMenuLinkStat("","","_self","");" data-menucd="">회사소개</a>';
//cfmGnbHtml += '							</li>';
cfmGnbHtml += '						</ul>';
cfmGnbHtml += '					</div>';
cfmGnbHtml += '					<button role="button" type="button" class="js-btn-close">';
cfmGnbHtml += '						<span class="hidetxt">1뎁스 메뉴 접기</span>';
cfmGnbHtml += '					</button>';
cfmGnbHtml += '				</div>';
cfmGnbHtml += '        </nav>';
cfmGnbHtml += '    </div>';

cfmGnbHtml += '</header>';

// DATA - 배포파일(cashing)
var cfmGnbNow = new Date();
var cfmGnbVersion = '?version=' + cfmGnbNow.getFullYear() +''+ (cfmGnbNow.getMonth()+1) +''+ cfmGnbNow.getDate() +''+ cfmGnbNow.getHours();
document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_menu.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //GNB/전체메뉴
document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_channel.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //채널메뉴
document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_recommend.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //추천메뉴
document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_welcometxt.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //인사말
document.write('<script src="' + cfm_domain + '/js/json/'+ mKt_common.pageType() +'_gnb_top.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //GNB상단영역
document.write('<script src="' + cfm_domain + '/js/json/cl_support_banner.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //검색 고객지원 배너
document.write('<script src="' + cfm_domain + '/js/json/cl_home_menu.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //홈 메뉴 바로가기
document.write('<script src="' + cfm_domain + '/js/json/cl_weekly_menu.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //금주 급상승 메뉴

// 바로가기메뉴
if(mkt.isLoginStatus() == 'Y'){
    document.write('<script src="' + cfm_domain + '/js/json/'+ mKt_common.pageType() +'_gnb_direct_after.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //로그인후
}else{
    document.write('<script src="' + cfm_domain + '/js/json/'+ mKt_common.pageType() +'_gnb_direct_before.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //로그인전
}

// 장바구니
var cfmCartUseYn;

var cfmGnbOptions = '';
var cfmGnbNowDate;
var cfmGnbAreaTarget = '#mCfm'+ ktChannel +'Gnb ';
var cfmGnbAreaHtml = {

    //초기화 & 세팅
    init: function(options){  
        if(!mKtHIDEGNB){
            if(!appChk){ //모바일웹(앱이아닌경우)
                if(mKt_common.isNull(options) == ''){
                    cfmGnbOptions = '';
                }else{
                    cfmGnbOptions = options;
                }

                //입점 서비스 페이지 내 KT 슬로건 (title tag) 일괄 변경
		        cfmGnbAreaHtml.titleReplace();

                //Html import
                document.writeln(cfmGnbHtml);

                //상단영역
                cfmGnbAreaHtml.topArea();

                //로그인영역
                cfmGnbAreaHtml.loginArea();

                //채널영역
                cfmGnbAreaHtml.channelArea();        

                //바로가기영역
                cfmGnbAreaHtml.directArea();

                //전체메뉴영역
                cfmGnbAreaHtml.allMenuArea();                

                //페이지별 예외처리
                cfmGnbAreaHtml.pageException();

                //메뉴숨기기
                cfmGnbAreaHtml.menuHide();
                
                //검색영역
                cfmGnbAreaHtml.searchArea();
            }
        }
    },

    //title tag 변경
	titleReplace: function(){
		var mCfmTit = document.title;
        if (mCfmTit !== undefined && mCfmTit !== null && mCfmTit !== ''){
            document.title = document.title.replace(/글로벌 No.1 KT/g, 'KT');
        }
	},

    //페이지별 예외처리
	pageException: function(){
        //통합검색 예외처리(통합검색 영역 비노출)
		if(cfmGnbOptions.indexOf("MiddleSearch:hide") !== -1){
            $j('button.search-call').hide(); //버튼
            $j('#cfmSearch').hide(); //레이어
            $j('.sml-call, .centerfixedheader').remove(); //LNB영역 삭제
        }

        //로케이션바 노출여부
        if(!mainCheck(ktChannel)){
            mkt.locationBar();
        }
	},

    //메뉴숨기기
	menuHide: function(){
		var ktLoginYn = mkt.isLoginStatus();
        var hideMenuArr = [];
        if(ktLoginYn === 'Y'){
            hideMenuArr = hideMenuArr_login;
        } else {
            hideMenuArr = hideMenuArr_logout;
        }

        var hideLen = hideMenuArr.length;
        if(hideLen > 0){
            for(var i = 0; i < hideLen; i++){
                $j('a[data-menucd=' + hideMenuArr[i] + ']').closest('li').hide();
            }
        }
	},

	//메뉴아이콘
	menuIconType: function(traget, item){
		var returnClass = '', returnAlt = '';

        if(item.iconShowYn == 'Y'){
            if(item.iconType == '01'){
                returnClass = 'cfmClGnb_new';
				returnAlt = '<em class="cfmClGnb_str">신규메뉴</em>';
            }else if(item.iconType == '02'){
                returnClass = 'cfmClGnb_hot';
				returnAlt = '<em class="cfmClGnb_str">인기메뉴</em>';
            }else if(item.iconType == '03'){
                returnClass = 'cfmClGnb_newhot';
				returnAlt = '<em class="cfmClGnb_str">신규메뉴 인기메뉴</em>';
            }else if(item.iconType == '04'){
                returnClass = 'cfmClGnb_hotnew';
				returnAlt = '<em class="cfmClGnb_str">인기메뉴 신규메뉴</em>';
            }

            if(mKt_common.isNull(returnClass) != ''){
                traget.find('a').addClass(returnClass);
			    traget.find('em').html(returnAlt + traget.find('em').text());
            }			
        }
	},

    //상단영역
    topArea: function(){
        var html = $j('<div>'+
                '   <div class="leftfixedheader">'+ 
                '       <strong>'+
                '       <a href="#" class="href_main">'+
				'           <img src="' + cfm_domain + '/images/v2/layout/header_kt.svg" alt="kt">'+
				'       </a>'+
				'       </strong>'+
				'       <button role="button" type="button" class="sml-call" data-target="#subminlayer" id="subminlayerBtn" title="주메뉴 목록 레이어 열기">'+
				'              <span></span>'+
				'       </button>'+
                '   </div>'+
                '   <div class="centerfixedheader"></div>'+
                '   <div class="rightfixedheader">'+

                '   </div>'+
                '</div>');
        
        if($j('#ktMainYn').length){
            //2024 웹접근성 관련 
            html.find('strong').replaceWith('<h1><a href="#" class="href_main"><img src="' + cfm_domain + '/images/v2/layout/header_kt.svg" alt="kt"></a></h1>');

	        $j.each(cfmHomeMenuJson, function(i, item){
	        	var depth1;
	        	if(item.contsDivType=="24"){
    				if(item.mblNewWndwType == "01"){ //본창 _self
    					depth1 = $j('<li><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+ item.svcUrl +'\',\''+ item.statInfo +'\','+"'_self'"+',\''+ item.gnbMenuId +'\')">'+item.subTitle+'</a></li>');
    				}else if(item.mblNewWndwType == "02"){//새창 _blank
    					depth1 = $j('<li><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+ item.svcUrl +'\',\''+ item.statInfo +'\','+"'_blank'"+',\''+ item.gnbMenuId +'\')" title="새창열림">'+item.subTitle+'</a></li>');
    				}else if(item.mblNewWndwType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
    					depth1 = $j('<li><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+ item.svcUrl +'\',\''+ item.statInfo +'\',\'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\',\''+ item.gnbMenuId +'\')">'+item.subTitle+'</a></li>');
    				}
    			}else if(item.contsDivType=="25"){
    				if(item.floatTrgtType == "01"){ //본창 _self
    					depth1 = $j('<li><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+ item.urlInfo +'\',\''+ item.statInfo +'\','+"'_self'"+',\''+ item.gnbMenuId +'\')">'+item.title+'</a></li>');
    				}else if(item.floatTrgtType == "02"){//새창 _blank
    					depth1 = $j('<li><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+ item.urlInfo +'\',\''+ item.statInfo +'\','+"'_blank'"+',\''+ item.gnbMenuId +'\')" title="새창열림">'+item.title+'</a></li>');
    				}else if(item.floatTrgtType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
    					depth1 = $j('<li><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+ item.urlInfo +'\',\''+ item.statInfo +'\',\'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\',\''+ item.gnbMenuId +'\')">'+item.title+'</a></li>');
    				}
    			}
	        	
	        	if(i==0){
	        		depth1.addClass('active');
	        		depth1.find('a').attr('title', '선택됨');                                                
	        		depth1.find('a').attr('class', 'js-focuslink');                                                
	        	}
	        	
	        	$j('.location-1depth-list').append(depth1);
	        });
	        setTimeout(() => {
	        	mainDepth1Onload();
			}, 100);
        }
        //버튼영역-2차
        try {
            $j.each(cfmGnbTopJson, function(i, areaData){
                cfmCartUseYn = areaData.shopYn;
                $j.each(areaData.areaSetList[0].areaContsList, function(j, item){
                    if(item.title == '로그인전' && mkt.isLoginStatus() != 'Y'){
                        html.find('.rightfixedheader').prepend(item.htmlInfo);
                    }else if(item.title == '로그인후' && mkt.isLoginStatus() == 'Y'){
                        html.find('.rightfixedheader').prepend(item.htmlInfo);
                    }
                });
            });
        } catch(e) {
            common_log.log('mkt_gnb.js topArea() [' + e.message + ']');
        }

        //링크정보
        mKt_common.linkInfo('common', 'click', html.find('a.href_main'), {svcUrl:cfm_domain, statInfo:'^mKT-개인_공통^GNB^상단고정^KT BI'}, '1');
        mKt_common.linkInfo('common', 'click', html.find('button.nav-call'), {svcUrl:'', statInfo:'^mKT-개인_공통^GNB^상단고정^전체메뉴'}, '1');
        mKt_common.linkInfo('common', 'click', html.find('button.search-call'), {svcUrl:'', statInfo:'^mKT-개인_공통^GNB^상단고정^검색아이콘'}, '1');
        mKt_common.linkInfo('common', 'click', $j('.btn-total-close'), {svcUrl:'', statInfo:'^mKT-개인_공통^GNB^닫기버튼'}, '1');

        //로그인페이지 로그인버튼 삭제
        /*if(ktMenuCd == "MBA000"){
            html.find('.href_login').remove();
        }*/

        //로그인여부 state 설정
        if(mkt.isLoginStatus() == 'Y'){
            $j(cfmGnbAreaTarget +".nav-popup").attr('state', 'login');
        }else{
            $j(cfmGnbAreaTarget +".nav-popup").attr('state', 'logout');
        }

        $j(cfmGnbAreaTarget +".nav-popup").before(html);
        
        
        //ui 처리 mkt_ui.js 호출
        /*cfmUi.COMMON.navAll(); 
        cfmUi.COMMON.search();*/
        //탭바를 위해서 모든 페이지 처리
        $j('#mCfmClWrapper').wrap('<main class="cfmClmain active"></main>');
        if($j('#ktMainYn').length){
        if($j('.location-1depth-list').children('li').length == 0){
        	$j("#subminlayerBtn").remove();	       
        }
        }
    },

    //전체메뉴영역-로그인
    loginArea: function(){
        var html = $j(cfmGnbAreaTarget + '.list-utils');

        //로그인여부
        if(mkt.isLoginStatus() == 'Y'){
            html.append('<li class="mCfmClNavUtils-welcome sglctn cfmCtndl sltitem"></li>');
            html.append('<li class="mCfmClNavUtils-setup"><a href="#">정보수정</a></li>');

            //문구조회-CMS 
            var infoTxt = '<span class="mintpointtxt"></span>님 환영합니다.';
            try{
                $j.each(cfmGnbWelcomeTxtJson, function(i, item){
                    if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmGnbNowDate >= item.showSdate && cfmGnbNowDate <= item.showEdate))){
                        infoTxt = item.htmlInfo.replace('{이름}', '<span class="mintpointtxt"></span>');
                    }
                });
            }catch (e){
                common_log.log('mkt_gnb.js loginArea\n[' + e.message + ']');
            }

            html.find('.mCfmClNavUtils-welcome').html(infoTxt);
            mKt_api.infosBasic(); //사용자 기본정보조회(CTN)

            //로그아웃
            var logOut = $j('<div class="mCfmClNavLogout"><a href="#" class="none"><span>로그아웃</span></a></div>');
            $j('.mCfmClNavTabDiv').append(logOut);

            //링크
            mKt_common.linkInfo('common', 'click', html.find('.mCfmClNavUtils-setup>a'), {svcUrl:iAmUI_URL+'/wamui/CusMenuMainMobile.do', statInfo:'^mKT-개인_공통^GNB^Top^정보수정'}, '1');
            mKt_common.linkInfo('common', 'click', logOut.find('a'), {svcUrl:'logout', statInfo:'^mKT-개인_공통^GNB^Top^로그아웃'}, '1');
        }else{
            html.append('<li class="mCfmClNavUtils-login"><a href="#" style="display: block;">로그인</a></li>');
            html.append('<li class="mCfmClNavUtils-join"><a href="#" style="display: block;">회원가입</a></li>');

            //링크
            mKt_common.linkInfo('common', 'click', html.find('.mCfmClNavUtils-login>a'), {svcUrl:'login', statInfo:'^mKT-개인_공통^GNB^Top^로그인'}, '1');
            mKt_common.linkInfo('common', 'click', html.find('.mCfmClNavUtils-join>a'), {svcUrl:iAmUI_URL+'/wamui/MemSelectMemberTypeMobile.do', statInfo:'^mKT-개인_공통^GNB^Top^회원가입'}, '1');
        }

        $j(cfmGnbAreaTarget +'.list-utils').append(html);
    },

    //전체메뉴영역-채널메뉴
    channelArea: function(){
        try {
            var html = $j(cfmGnbAreaTarget + '.list-channel');

            $j.each(cfmGnbChannelJson, function(i, item){
                var li;
                if(item.title == 'ENG'){ //영문사이트
                    li = $j('<li class="libtn-lang"><a href="#" class="btn-lang">' + item.title +'</a></li>');
                } else {
                    li = $j('<li><a href="#">' + item.title +'</a></li>');
                }

                li.data(item);
                mKt_common.linkInfo('common', 'channel', li.find('a'), item, item.floatTrgtType); //메뉴링크			
                html.append(li);

                if(item.title == 'ENG'){ //영문사이트
                    li.find('a').attr('title', '영문사이트 새창열림');
                }
            });

            $j(cfmGnbAreaTarget + '.list-channel').append(html);

            //current 채널
            $j(cfmGnbAreaTarget + '.list-channel li' ).each(function (i, item){
                if($j(item).data('title') == ktChannelName){
                    $j(item).addClass('current');
                    $j(item).find('a').attr('title', '선택됨');
                }
            });
        } catch(e) {
            common_log.log('mkt_gnb.js channelArea() [' + e.message + ']');
        }        
    },

    //전체메뉴영역-바로가기메뉴
    directArea: function(){
        try {
            var html = $j('<ul class="mCfmClNavTabHotlinkList"></ul>');

            $j.each(cfmGnbDirectJson, function(i, item){
                //shop인경우는 메뉴찾기(24)/직접입력(25) 구분-2차
                if(mKt_common.pageType() == 'shop' && item.contsDivType == '25'){
                    item.subTitle = item.title; //메뉴명
                    item.mblNewWndwType = item.floatTrgtType; //링크타입
                    item.svcUrl = item.urlInfo; //링크정보
                }

                var li = $j('<li><a href="#">' + item.subTitle +'</a></li>');
                li.find('a').attr('style', 'background-image:url('+ cfm_domain + item.imgPath +')');
                mKt_common.linkInfo('common', 'direct', li.find('a'), item, item.mblNewWndwType); //메뉴링크

                html.append(li);
            });

            $j(cfmGnbAreaTarget + '.mCfmClNavTabConHotlink').append(html);
        } catch(e) {
            common_log.log('mkt_gnb.js directArea() [' + e.message + ']');
        }
    },

    //전체메뉴영역-전체메뉴
	allMenuArea: function(){
		var gnbMenuDivType01Flag = true;
		var gnbMenuDivType02Flag = true;
        try {
            var html = $j(cfmGnbAreaTarget + 'ul.mCfmClNavTabCon');

            //추천메뉴영역
            html.append('<li class="active"></li>');
            cfmGnbAreaHtml.recommendMenu();

            $j.each(cfmGnbMenuJson, function(i, item){
                if(item.menuDispYn == 'Y'){ //GNB 노출여부
                    var depth1 = '', depth2 = '', depth3 = '', depth4 = '';
                    if(item.rleval == "1"){
                        depth1 = $j('<li><a href="#" class="category-btn"><em>'+ item.gnbMenuNm +'</em></a></li>');
                        depth1.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth1.find('a').attr('data-menuCd', item.menuCd);
                        depth1.find('a').data(item);

                        //아이콘(1Depth)
                        if(item.imgUrl != null){
                            depth1.find('a').attr('style', 'background-image:url(\''+ item.imgUrl +'\');');
                        }

                        //메뉴링크
                        mKt_common.linkInfo('common', 'all', depth1.find('a'), item, item.mblNewWndwType);

                        //메뉴아이콘적용(new,hot 등)
                        cfmGnbAreaHtml.menuIconType(depth1, item);

                        //하위메뉴여부-단구성
                        if(item.menuDispCnt > 0){
                            depth1.append('<div class="category-depth"><ul class="depth02"></ul></div>');
                        }

                        html.append(depth1);
                    }else if(item.rleval == "2"){
                    	
                    	if(item.gnbMenuDivType == '01'){
							if(gnbMenuDivType01Flag){
								var depth2Membership = '';
								//depth2Membership=$j('<li class="active"><a href="javascript:mKt_common.ktMenuLinkStat(\'http://m.membership.kt.com/main/s_MainInfo.do\',\'^mKT-개인_공통^GNB_혜택^멤버십 혜택\',\'_self\',\'CA0000\');" data-gnbmenuid="G000001956" data-menucd="CA0000" title="선택됨" class="benifit-tit-mem"><em>멤버십 혜택</em></a></li>');
								depth2Membership=$j('<li class="active"><a class="benifit-tit-mem"><em>멤버십 혜택</em></a></li>');
								html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth02').append(depth2Membership);
	                    		gnbMenuDivType01Flag=false;
							}
                    	}
                    	if(item.gnbMenuDivType == '02'){
                    		if(gnbMenuDivType02Flag){
                    			var depth2Membership = '';
                    			//depth2Membership=$j('<li><a href="javascript:mKt_common.ktMenuLinkStat(\'https://m.product.kt.com/benefit/membership/mobile/atonego_view.html\',\'^m^KT-개인^혜택^스페셜 혜택\',\'_self\',\'CGA000\');" data-gnbmenuid="G000001381" data-menucd="CGA000" title="선택됨" class="benifit-tit-spt"><em>스페셜 혜택</em></a></li>');
                    			depth2Membership=$j('<li><a class="benifit-tit-spt"><em>스페셜 혜택</em></a></li>');
                    			html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth02').append(depth2Membership);	
	                    		gnbMenuDivType02Flag=false;
                    		}
                    	}
                        depth2 = $j('<li><a href="#"><em>'+ item.gnbMenuNm +'</em></a></li>');
                        depth2.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth2.find('a').attr('data-menuCd', item.menuCd);
                        depth2.find('a').data(item);

                        //메뉴링크
                        mKt_common.linkInfo('common', 'all', depth2.find('a'), item, item.mblNewWndwType);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth2, item);

                        //하위메뉴여부
                        if(item.menuDispCnt > 0){
                            depth2.find('a').addClass('is-depth3');
                            depth2.append('<ul class="depth03"></ul>');
                        }

                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth02').append(depth2);
                    }else if(item.rleval == "3"){
                        depth3 = $j('<li><a href="#"><em>'+ item.gnbMenuNm +'</em></a></li>');
                        depth3.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth3.find('a').attr('data-menuCd', item.menuCd);
                        depth3.find('a').data(item);

                        //메뉴링크
                        mKt_common.linkInfo('common', 'all', depth3.find('a'), item, item.mblNewWndwType);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth3, item);

                        //하위메뉴여부
                        if(item.menuDispCnt > 0){
                            depth3.find('a').addClass('is-depth4');
                            depth3.append('<ul class="depth04"></ul>');
                        }

                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth03').append(depth3);
                    }else if(item.rleval == "4"){
                        depth4 = $j('<li><a href="#"><em>'+ item.gnbMenuNm +'</em></a></li>');
                        depth4.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth4.find('a').attr('data-menuCd', item.menuCd);

                        //메뉴링크
                        mKt_common.linkInfo('common', 'all', depth4.find('a'), item, item.mblNewWndwType);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth4, item);

                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth04').append(depth4);
                    }
                }			
            });

            $j(cfmGnbAreaTarget + 'ul.mCfmClNavTabCon').append(html);

            cfmUi.COMMON.navAll();
            cfmGnbAreaHtml.allMenuAreaCurrent(null);
            
        } catch(e) {
            common_log.log('mkt_gnb.js allMenuArea() [' + e.message + ']');
        }   
    },

    //전체메뉴영역-전체메뉴(현재메뉴표시)
	allMenuAreaCurrent: function(menuPath){
        var path = [];

        //현재메뉴 - 표시
        if(menuPath != null){
            path = menuPath;
        }else{
            var current = cfmGnbMenuJson.filter(function(element){
                return element.menuCd == ktMenuCd;
            });
            if(current.length > 0){
                path = current[0].path.split(' > ');
            }
        }

        //전체메뉴 초기화
        $j('.category.mCfmClNavTabCon > li').removeClass('active').find('.category-btn').attr('title', '');
        $j('.category-depth').find('.depth02 > li').removeClass('active').find('.is-depth3').attr('title', '펼치기');
        $j('.category-depth').find('.depth03 > li').removeClass('active').find('.is-depth4').attr('title', '펼치기');

        if(path.length > 0){ 
            $j.each(path, function(i, data){ 
                var curMenuCd =  $j(cfmGnbAreaTarget + '.mCfmClNavTabDiv').find('[data-menuCd='+ data +']');
                if(curMenuCd.hasClass('is-depth3') || curMenuCd.hasClass('is-depth4')){
                    curMenuCd.attr('title', '접기');
                }

                curMenuCd.parent('li').addClass('active');
                curMenuCd.attr('title', '선택됨');
            });
        }

        //현재메뉴 없을시 첫번째
        if($j(cfmGnbAreaTarget + 'ul.mCfmClNavTabCon li.active').length == 0){
            $j(cfmGnbAreaTarget + 'ul.mCfmClNavTabCon li:eq(0)').addClass('active');
            $j(cfmGnbAreaTarget + 'ul.mCfmClNavTabCon li:eq(0) a:first').attr('title', '선택됨');
        }
    },

    //전체메뉴영역-추천메뉴
    recommendMenu: function(){
        try {
            var html = $j('<a href="#" class="category-btn" style="background-image:url('+ cfm_domain + '/images/v2/layout/allmenu_2depth_01.png);">추천메뉴</a>'+
                    '   <div class="category-depth">'+
                    '       <ul class="depth02 custom-menu active"></ul>'+
                    '   </div>'+
                    '</a>');

            $j.each(cfmGnbRecommendJson, function(i, item){
                var li = $j('<li><a href="#">'+ item.subTitle +'<span class="subprg">'+ item.menuPath +'</span></a></li>');			
                mKt_common.linkInfo('common', 'recommend', li.find('a'), item, item.mblTrgtType); //메뉴링크			
                html.find('ul').append(li);
            });

            $j(cfmGnbAreaTarget + 'ul.mCfmClNavTabCon li:eq(0)').append(html);

            // 로그인여부
            if(mkt.isLoginStatus() == 'Y'){
                mKt_api.targetMenu();
            }
        } catch(e) {
            $j(cfmGnbAreaTarget + 'ul.mCfmClNavTabCon li:eq(0)').remove();
            common_log.log('mkt_gnb.js recommendMenu() [' + e.message + ']');
        }        
    },

    //전체메뉴영역-최근본메뉴(로그인후) callback
	callBackTargetMenu: function(type, result){
        try {
            if(type === 'success'){
                if(mKt_common.isNull(result.data) != ''){					
                    $j(cfmGnbAreaTarget + '.mCfmClNavTabCon li:eq(0)').find('a').html('최근본메뉴');
                    $j(cfmGnbAreaTarget + '.mCfmClNavTabCon li:eq(0)').find('ul>li').remove();
    
                    var resultList = result.data.targetGnbMenus;
                    $j.each(resultList, function(i, item){
                        if(i < 6){ //최대6건
                            item.statInfo = '^mKT-개인_공통^GNB^최근본메뉴^' + item.gnbMenuNm;
    
                            var li = $j('<li><a href="#">'+ item.gnbMenuNm +'<span class="subprg">'+ item.gnbMenu1StNm +' &gt; '+ item.gnbMenu2NdNm +'</span></a></li>');                    
                            mKt_common.linkInfo('common', 'recommend', li.find('a'), item, item.newWndwType); //메뉴링크
                            $j(cfmGnbAreaTarget + '.mCfmClNavTabCon li:eq(0)').find('ul').append(li);
                        }
                    });
                }else{					
                    common_log.log(result.message);
                }
            }            
        } catch (e) {
            common_log.log('mkt_gnb.js targetMenu> callBackTargetMenu() [' + e.message + ']');
        }
    },

    //서브-로케이션바
    locationBar: function(){
        //현재메뉴(4뎁스까지만 조회가능)
        var current = cfmGnbMenuJson.filter(function(element){
            return element.menuCd == ktMenuCd;
        });

        //현재메뉴가 없는 경우(api 호출)
        if(current.length == 0){
            mKt_api.locationMenu();
        }else{
            var data = current[0];
            var path = data.path.split(' > ');
            cfmGnbAreaHtml.locationBarHtml(0, path, data);
        }   
        //mKt_api.breadcrumb();
        var breadcrumbTargetUrl = new URL(location.href);
        if(breadcrumbTargetUrl .hostname == "m.product.kt.com" || breadcrumbTargetUrl .hostname == "product.kt.com"){
        	mKt_api.breadcrumb();
        } 
    },

    //서브-로케이션바 callback
	callBackLocationMenu: function(type, result){
        var isShow = false;
        try {
            if(type === 'success'){
                if(mKt_common.isNull(result.data) != ''){
                    if(mKt_common.isNull(result.data.targetMenuPath) != ''){
                        var data = result.data.targetMenuPath;
                        var path = data.split('_');                
                        cfmGnbAreaHtml.locationBarHtml(1, path, null);
    
                        isShow = true;
                    }
                }        
            }            
        } catch (e) {
            common_log.log('mkt_gnb.js locationMenu> callBackLocationMenu() [' + e.message + ']');
        }

        if(!isShow){
            $j('.sml-call, .centerfixedheader').remove(); //LNB영역 삭제
        }
    },

    //서브-로케이션바 UI
    locationBarHtml: function(type, path, data){
        if(type == 0 && mKt_common.isNull(data.lctnBarYn) != 'Y'){ 
            $j('.sml-call, .centerfixedheader').remove();
        }else{ //LNB 노출
            var html = $j('<div class="ui-menu-state">'+
                        '   <a href="#" class="ui-bt arrow-b left"><span class="hidetxt">이전페이지</span></a>'+
                        '   <button type="button" class="js-menu-title">​</button>'+
                        '   <button type="button" class="js-menu-close"><span class="hidetxt">메뉴 닫기</span></button>'+
                        '</div>'+
                        '<div class="header-location">'+
                        '   <nav role="menubar" aria-label="서브 메뉴" class="ui-sub-menu">'+
                        '       <div class="js-tab-menu ui-menu-2depth">'+
                        '	        <ul role="menu" class="location-2depth-list"></ul>'+
                        '	        <button type="button" class="js-menu-toggle"><span class="hidetxt">2뎁스 메뉴 펼치기</span></button>'+
                        '       </div>'+
                        '   </nav>'+
                        '</div>');
            var homeHtml = $j('<li><a href="javascript:mKt_common.ktMenuLinkStat(\''+cl_domain+'\',\'^mKT-개인_공통^GNB^상단고정^메뉴레이어^홈\',\'_self\',\'A00000\');">홈</a></li>');
            $j('.location-1depth-list').append(homeHtml);
            $j.each(cfmGnbMenuJson, function(i, item){
                if(item.menuDispYn == 'Y'){ //GNB메뉴 노출 여부
                    if(item.rleval == "1"){
                        var depth1 = $j('<li><a href="#none">'+ item.gnbMenuNm +'</a></li>');
                        depth1.find('a').attr('data-menuCd', item.menuCd);

                        //메뉴링크
                        mKt_common.linkInfo('common', 'gnb', depth1.find('a'), item, item.mblNewWndwType);

                        //현재메뉴
                        if(item.menuCd == path[0]){
                            depth1.addClass('active');
                            depth1.find('a').attr('title', '선택됨');                                                
                            $j(cfmGnbAreaTarget + '.sml-call span').text(item.gnbMenuNm); //상단부분
                        }

                        $j('.location-1depth-list').append(depth1);
                        
//                        setTimeout(() => {
//            	        	mainDepth1Onload();
//            			}, 100);
                        
                        
                    }else if(item.rleval == "2" && item.path.indexOf(path[0]) > -1){
                    	
                    	var depth2="";
                    	if(item.gnbMenuDivType == "01" || item.gnbMenuDivType == "02"){
                    		var depth2 = $j('<li style="display:none" class="js-tab-title" data-gnbMenuDivType="'+item.gnbMenuDivType+'" ><a href="#">'+ item.gnbMenuNm +'</a></li>');//2023 웹접근성  role="menuitem" 삭제
                    	}else{
                    		var depth2 = $j('<li class="js-tab-title" data-gnbMenuDivType="'+item.gnbMenuDivType+'" ><a href="#">'+ item.gnbMenuNm +'</a></li>');//2023 웹접근성  role="menuitem" 삭제
                    	}
                        depth2.find('a').attr('data-menuCd', item.menuCd); 
                        depth2.find('a').data(item);                        

                        //현재메뉴
                        if(item.menuCd == path[1]){
                            depth2.addClass('active').addClass('current');      
                            //depth2.find('a').attr('aria-selected', true);               
                            html.find('ul.location-2depth-list').attr('aria-label', '2뎁스 메뉴');
                        }

                        html.find('ul.location-2depth-list').append(depth2);

                        //하위메뉴
                        if(item.menuDispCnt > 0){
                            depth2.find('a').attr('aria-controls', 'lnb-' + item.gnbMenuId);

                            var child = $j('<div class="js-tab-content js-tab-menu ui-menu-3depth">'+
                                    '	<ul role="menu" class="location-3depth-list"></ul>'+
                                    '	<button type="button" class="js-menu-toggle"><span class="hidetxt">3뎁스 메뉴 펼치기</span></button>'+
                                    '</div>');
                            child.attr('id', 'lnb-' + item.gnbMenuId);
                            html.find('div.ui-menu-2depth').after(child);
                        }else{
                            //메뉴링크
                            mKt_common.linkInfo('common', 'lnb', depth2.find('a'), item, item.mblNewWndwType);
                        }
                    }else if(item.rleval == "3"){
                        var depth = html.find('#'+ 'lnb-' + item.upGnbMenuId);
                        var depth3 = $j('<li class="js-tab-title"><a href="#">'+ item.gnbMenuNm +'</a></li>'); //2023 웹접근성  role="menuitem" 삭제
                        depth3.find('a').attr('data-menuCd', item.menuCd);
                        depth3.find('a').data(item);

                        //현재메뉴
                        if(item.menuCd == path[2]){
                            depth3.addClass('active').addClass('current'); 
                            depth.find('ul.location-3depth-list').attr('aria-label', '3뎁스 메뉴');
                            depth.addClass('havcurrent');
                        }
                        
                        depth.find('ul.location-3depth-list').append(depth3);

                        //하위메뉴
                        if(item.menuDispCnt > 0){
                            depth3.find('a').attr('aria-controls', 'lnb-' + item.gnbMenuId);

                            var child = $j('<div class="js-tab-content js-tab-menu ui-menu-4depth">'+
                                    '	<ul role="menu" class="location-4depth-list"></ul>'+
                                    '	<button type="button" class="js-menu-toggle"><span class="hidetxt">4뎁스 메뉴 펼치기</span></button>'+
                                    '</div>');
                            child.attr('id', 'lnb-' + item.gnbMenuId);
                            depth.after(child);
                        }else{
                            //메뉴링크
                            mKt_common.linkInfo('common', 'lnb', depth3.find('a'), item, item.mblNewWndwType);
                        }
                    }else if(item.rleval == "4"){
                        var depth = html.find('#'+ 'lnb-' + item.upGnbMenuId);
                        var depth4 = $j('<li><a href="#">'+ item.gnbMenuNm +'</a></li>');//2023 웹접근성  role="menuitem" 삭제
                        depth4.find('a').attr('data-menuCd', item.menuCd);

                        //메뉴링크
                        mKt_common.linkInfo('common', 'lnb', depth4.find('a'), item, item.mblNewWndwType);

                        //현재메뉴
                        if((type == 0 && item.menuCd == ktMenuCd) || (type == 1 && item.menuCd == path[3])){
                            depth4.addClass('active').addClass('current');
                            depth.find('ul.location-4depth-list').attr('aria-label', '4뎁스 메뉴');
                            depth.addClass('havcurrent');
                        }                                        

                        depth.find('ul.location-4depth-list').append(depth4);
                    }               
                }
            });

            $j(cfmGnbAreaTarget + 'header').append(html);

            //링크
            mKt_common.linkInfo('common', 'gnb', html.find('.ui-menu-1depth ul li:eq(0) a'), {svcUrl:cfm_domain, statInfo:'^mKT-개인_공통^GNB^상단고정^메뉴레이어^홈',menuCd:'A00000'}, '1');
            mKt_common.linkInfo('common', 'click', html.find('.ui-menu-1depth .js-btn-close'), {svcUrl:'click', statInfo:'^mKT-개인_공통^GNB^상단고정^메뉴레이어^닫기버튼'}, '1');

            cfmUi.COMMON.location(); //ui 처리 mkt_ui.js 호출
            mainDepth1Onload();
            
            cfmGnbAreaHtml.allMenuAreaCurrent(path);
        }
    },

    //Shop(장바구니개수) 노출-2차
    cartDispaly: function(){
        if(mkt.isLoginStatus() == 'Y' && cfmCartUseYn == "Y"){ //로그인후-연동여부('Y')
            mKt_api.cartCount();
        }
    },

    //Shop(장바구니개수) UI-2차
    cartHtml: function(cfmCartCount){
        if(mKt_common.isNull(cfmCartCount) != ''&& !isNaN(cfmCartCount)){
            //99+표시
            if(cfmCartCount > 99) cfmCartCount = '99+';
            
            var html = '<span class="noticeno">'+ cfmCartCount +'</span>';

            //상단영역
            var target = $j('#mCfmClGnb').find('.href_cart');
            target.append(html);

            //전체메뉴-바로가기
            $j('#mCfmClGnb').find('.mCfmClNavTabHotlinkList>li').each(function(){
                if($j(this).text() == '장바구니'){
                    var target = $j(this).find('a');
                    target.append(html);
                }
            });
        }
    },
    
	searchArea: function(){
		var gnbNowDate001 = mKt_common.dateFormat('YYYY.MM.DD HH:mm:ss');
		var helplinkcnt = 0;
		var hotlinkcnt = 0;
		try {
            $j.each(cfmSupportBannerJson, function(i, areaData){
            	if(areaData.showYn=='Y'){
            		$j.each(areaData.areaSetList[0].areaContsList, function(j, item){
            			 if ((item.showYn == 'Y' && item.showPerdType == '01') || (item.showYn == 'Y' && (gnbNowDate001 >= item.showSdate && gnbNowDate001 <= item.showEdate))){ //영역노출여부
            				 //var event = $j('<div class="swiper-slide"><a role="button" href="#" style="background:#eceef2"><img src="#" class="img-1"/></a></div>');
            				 //event.find('img').attr('src', item.areaContsImgList[0].saveImgPath + item.areaContsImgList[0].saveImgNm);
            				 //event.find('img').attr('alt', mKt_common.removeTag(item.areaContsImgList[0].upldImgNm));
            				 
            				 $j("#helplink-swiper-wrapper").append(item.htmlInfo);
            				 helplinkcnt++;
            			 }
            			
            		});
            		$j("#cfmCltab-helplink-section").attr("style","display:block");
            	}else{
            		$j("#cfmCltab-helplink-section").attr("style","display:none");
            	};
            });
            
            if(helplinkcnt == 0){
            	$j("#cfmCltab-helplink-section").attr("style","display:none");
            }
            
            var  mainNowDate = mKt_common.dateFormat('YYYY/MM/DD/HH/mm/ss');
            $j.each(cfmWeeklyMenuJson, function(i, areaData){
            	if(areaData.showYn == "Y" && ( mainNowDate >= areaData.showSdate && mainNowDate <= areaData.showEdate)){
            		var cont = '';
            		if(areaData.styleType =="01" ){ // 일반형
            			if(areaData.contsDivType=="24"){
            				if(areaData.mblNewWndwType == "01"){ //본창 _self
            					cont = '<li class="disable"><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+areaData.svcUrl+'\' , \''+areaData.statInfo+'\' , \'_self\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.mblNewWndwType == "02"){//새창 _blank
            					cont = '<li class="disable"><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+areaData.svcUrl+'\' , \''+areaData.statInfo+'\' , \'_blank\', \''+areaData.menuCd+'\')" title="새창열림">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.mblNewWndwType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
            					cont = '<li class="disable"><a role="button"href="javascript:mKt_common.ktMenuLinkStat(\''+areaData.svcUrl+'\' , \''+areaData.statInfo+'\' , \'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}
            			}else if(areaData.contsDivType=="25"){
            				if(areaData.floatTrgtType == "01"){ //본창 _self
            					cont = '<li class="disable"><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.urlInfo+'\' , \''+areaData.statInfo+'\' , \'_self\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.floatTrgtType == "02"){//새창 _blank
            					cont = '<li class="disable"><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.urlInfo+'\' , \''+areaData.statInfo+'\' , \'_blank\', \''+areaData.menuCd+'\')" title="새창열림">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.floatTrgtType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
            					cont = '<li class="disable"><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.urlInfo+'\' , \''+areaData.statInfo+'\' , \'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}
            			}
            			
            		}else if(areaData.styleType =="02" ){ // 강조형
            			if(areaData.contsDivType=="24"){
            				if(areaData.mblNewWndwType == "01"){ //본창 _self
            					cont = '<li><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.svcUrl+'\' , \''+areaData.statInfo+'\' , \'_self\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.mblNewWndwType == "02"){//새창 _blank
            					cont = '<li><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.svcUrl+'\' , \''+areaData.statInfo+'\' , \'_blank\', \''+areaData.menuCd+'\')" title="새창열림">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.mblNewWndwType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
            					cont = '<li><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.svcUrl+'\' , \''+areaData.statInfo+'\' , \'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}
            			}else if(areaData.contsDivType=="25"){
            				if(areaData.floatTrgtType == "01"){ //본창 _self
            					cont = '<li><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.urlInfo+'\' , \''+areaData.statInfo+'\' , \'_self\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.floatTrgtType == "02"){//새창 _blank
            					cont = '<li><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.urlInfo+'\' , \''+areaData.statInfo+'\' , \'_blank\', \''+areaData.menuCd+'\')" title="새창열림">'+areaData.subTitle+'</a></li>';
            				}else if(areaData.floatTrgtType == "03"){//팝업 _pop|'+ linkPopW +'|'+ linkPopH;
            					cont = '<li><a role="button"href="javascript:mKt_common.ktLinkStat(\''+areaData.urlInfo+'\' , \''+areaData.statInfo+'\' , \'_pop|'+areaData.floatPopupWdth+'|'+areaData.floatPopupVrtc+'\', \''+areaData.menuCd+'\')">'+areaData.subTitle+'</a></li>';
            				}
            			}
            		}
            		$j("#cfmCltab-hotlink-ul").append(cont);
            		hotlinkcnt++;
            		$j("#cfmCltab-hotlink-section").attr("style","display:block");
            	}else{
            		$j("#cfmCltab-hotlink-section").attr("style","display:none");
            	}
            });
            if(hotlinkcnt == 0){
            	$j("#cfmCltab-hotlink-section").attr("style","display:none");
            }else{
            	$j("#cfmCltab-hotlink-section").attr("style","display:block");
            }
            
        } catch(e) {
            common_log.log('mkt_gnb.js searchArea() [' + e.message + ']');
        }
	},
	setMembershipGnb: function(){
		
    	var membershipHtml = "";
    	membershipHtml += '<button role="button" type="button" class="bnflayer-call" data-target="#bnfminlayer" id="membershipTopBtn" title="혜택 목록 레이어 열기">';
    	membershipHtml += '</button>';
    	membershipHtml += '<div class="bnfminlayer" id="bnfminlayer" aria-hidden="true">';
    	membershipHtml += '	<div class="">';
    	membershipHtml += '<ul role="menu" class="">';
    	membershipHtml += '<li id="membershipTopHref">';
    	membershipHtml += '</li>';
    	membershipHtml += '</ul>';
    	membershipHtml += '</div>';
    	membershipHtml += '<button role="button" type="button" class="js-btn-close">';
    	membershipHtml += '<span class="hidetxt">혜택 메뉴 접기</span>';
    	membershipHtml += '</button>';
    	membershipHtml += '</div>';
    	$(".centerfixedheader").append(membershipHtml);
    	$(".fixedheader").addClass("benefits");
    	
        if(gnbMenuDivType == '01'){
        	var membershipTopHref = "";
        	var membershipTopBtn = "";
        	membershipTopBtn += '<span>멤버십 혜택</span><!-- 멤버십 메뉴일 때는 멤버십 혜택, 스페셜 메뉴일 때는 스페셜 혜택으로 표시되어야 함 -->';
        	$("#membershipTopBtn").html(membershipTopBtn);
        	membershipTopHref += '<a href="javascript:mKt_common.ktMenuLinkStat(\'https://m.product.kt.com/benefit/membership/mobile/long_customer.html\',\'^mKT-개인_공통^GNB^상단고정^메뉴레이어^혜택^스페셜혜택\',\'_self\',\'CGAD00\');" class="js-focuslink">스페셜 혜택</a><!-- 멤버십 메뉴일 때는 스페셜 혜택, 스페셜 혜택일 때는 멤버십 혜택 -->';
        	$("#membershipTopHref").html(membershipTopHref);
        	
        	$j("#mCfmClGnb .header-location").removeClass("spt_bnf_location");
        	
            setTimeout(function () {
                $('.location-2depth-list').children('li').each(function(){
                    if($(this).data('gnbmenudivtype')=="01"){
                  $(this).show()
                  }
              });
            }, 300);
        	
        }else if(gnbMenuDivType == '02'){
        	var membershipTopHref = "";
        	var membershipTopBtn = "";
        	
        	membershipTopBtn += '<span>스페셜 혜택</span><!-- 멤버십 메뉴일 때는 멤버십 혜택, 스페셜 메뉴일 때는 스페셜 혜택으로 표시되어야 함 -->';
        	$("#membershipTopBtn").html(membershipTopBtn);
        	membershipTopHref += '<a href="javascript:mKt_common.ktMenuLinkStat(\'http://m.membership.kt.com/main/s_MainInfo.do\',\'^mKT-개인_공통^GNB^상단고정^메뉴레이어^혜택^멤버십혜택\',\'_self\',\'CA0000\');" class="js-focuslink">멤버십 혜택</a><!-- 멤버십 메뉴일 때는 스페셜 혜택, 스페셜 혜택일 때는 멤버십 혜택 -->';
        	$("#membershipTopHref").html(membershipTopHref);
        	
        	$j("#mCfmClGnb .header-location").addClass("spt_bnf_location");
            
            setTimeout(function () {
                $('.location-2depth-list').children('li').each(function(){
                    if($(this).data('gnbmenudivtype')=="02"){
                  $(this).show()
                  }
              });
            }, 300);
        	
        }
		
        //mainDepth1Onload();
        bnfDepthOnload();
	}
}



$j(document).ready(function(){
    if(!mKtHIDEGNB){
        if(!appChk){ //모바일웹(앱이아닌경우)
            function loadScreenChk(){
                if(cfmloadScreen){	//screen API 로드 true   
                    cfmGnbNowDate = mKt_common.dateFormat('YYYY.MM.DD HH:mm:ss');
                }else{
                    setTimeout(function(){ loadScreenChk(); }, 200);
                }
            }

            loadScreenChk();
            cfmGnbAreaHtml.cartDispaly(); //Shop(장바구니개수) 
        }else{
            $j('#mCfmClWrapper').addClass('ismyktApp');
        }
    }else{
        $j('#mCfmClWrapper').addClass('ismyktApp');
    }
}); 