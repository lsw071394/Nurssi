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
var basicResult;
var usagesResult;
var membershipResult;
var gnbMenuDivType;
var ipIsKr;

var mKt_api = {
    // screen API
    statsScreen: function(){
        var channelCd = '02';
        mKt_common.api({
            'url' : '/kt/menuinfo/v1.0/channels/'+ channelCd +'/menus/'+ ktMenuCode +'/stats/screen',
            'type' : 'get',
            'timeout' : 5000, //5초
            'callback' : function(type, result){
                cfmloadScreen = true; //screen API 로드 true
                try {
                    if(type === 'success'){
                        if (kt_adobeLaunch !== 'Y') {
                            mKt_common.sendStatis(result, s.pageName); //통계
                        } else {
                            mKt_common.sendStatisLaunch(result, adobePageName); //통계
                        }
                        loadTabBarChk = result.data.tabBarYn; //탭바
                        loadKTalkChk = result.data.ktalkYn; //케이톡
                        loadFintShopChk = result.data.storeFindYn; //매장찾기
                        loadStsfcSurveyChk = result.data.stsfcSurveyYn;//만족도조사
                        loadServerTime = result.serverTime; //서버시간
                        gnbMenuDivType = result.data.gnbMenuDivType;//gnb 혜택 구분
                        
                        if(gnbMenuDivType == '01' || gnbMenuDivType == '02'){
                        	cfmGnbAreaHtml.setMembershipGnb();
                        }
                        
                    }
                } catch (e) {
                    common_log.log('mkt_api.js statsScreen() [' + e.message + ']');
                }
                
            }
        });
    },

    // location - 해당메뉴 검색
    locationMenu: function(){
        var channelCd = '02';
        mKt_common.api({
            'url' : '/kt/menuinfo/v1.0/channels/'+ channelCd +'/menus/'+ ktMenuCode,
            'type' : 'get',
            'timeout' : 5000, //5초
            'callback' : function(type, result){
                cfmGnbAreaHtml.callBackLocationMenu(type, result);
            }
        });
    },
    
    breadcrumb: function(){
    	var channelCd = '02';
    	mKt_common.api({
    		'url' : '/kt/menuinfo/v1.0/channels/'+ channelCd +'/menus/'+ ktMenuCode,
    		'type' : 'get',
    		'timeout' : 5000, //5초
    		'callback' : function(type, result){
    			try {
    				if(type === 'success'){
    					
    			
    					
    					var scriptText = "";
    					scriptText+= '{\n';
    					scriptText+= '"@context" : "https://schema.org",\n';
    					scriptText+= '"@type" : "BreadcrumbList",\n';
    					scriptText+= '	"itemListElement" : [\n';
    					scriptText+= '		{\n';
    					scriptText+= '			"@type" : "ListItem",\n';
    					scriptText+= '			"position" : 1,\n';
    					scriptText+= '			"name" : "홈",\n';
    					scriptText+= '			"item" : "https://m.kt.com"\n';
    					scriptText+= '		},';
    				
    					var targetMenuPath = result.data.targetMenuPath;
    					var targetMenuPathSplit = targetMenuPath.split('_');
    					var targetMenuPathSplitlength = targetMenuPathSplit.length;
    					var positionNum = 1;
    					$j.each(result.data.mobileMenuDepthList, function(i, item){
    						var mobileMenuList = item.mobileMenuList;
    						for(var i = 0 ;  i < targetMenuPathSplitlength ; i ++){
    							
    							 for(var j = 0 ; j < mobileMenuList.length ; j++){
    								 if(targetMenuPathSplit[i] == mobileMenuList[j].menuCd){
    									    positionNum ++;
    		    							scriptText+= '		{\n';
    		    	    					scriptText+= '			"@type" : "ListItem",\n';
    		    	    					scriptText+= '			"position" : '+positionNum+',\n';
    		    	    					scriptText+= '			"name" : "'+mobileMenuList[j].gnbMenuNm+'",\n';
    		    	    					scriptText+= '			"item" : "'+mobileMenuList[j].svcUrl+'"\n';
    		    	    					scriptText+= '		},';
    								 }
    								 
    							 }
    						}
    					 });
    					
    					scriptText = scriptText.substring(0,scriptText.length -1);
    					scriptText+= '\n';
    					scriptText+= '	]\n';
        				scriptText+= '}';
        				
        				var breadcrumbScript = document.createElement('script');
        				breadcrumbScript.type = 'application/ld+json'
        				breadcrumbScript.text = scriptText;
        				
        				
    					document.getElementsByTagName('head')[0].prepend(breadcrumbScript);
    					
    				}                    
    			} catch (e) {
    				common_log.log('kt_api.js locationMenu [' + e.message + ']');
    			}
    		}
    	});
    },
    // IP관리(해외접속관리)
    ipCheck: function(){
        mKt_common.api({
            'url' : '/kt/systems/v1.0/ip',
            'type' : 'get',
            'timeout' : 5000, //5초
            'callback' : function(type, result){
                try {
                    if(type === 'success'){
                        if(result.data.indexOf('.') > -1){
                            var myIp = result.data.split(".");
                            var myIpStr = '';
                            $j.each(myIp, function(i, item){
                                if(item.length == 1){
                                    myIpStr += '00' + item;
                                }else if(item.length == 2){
                                    myIpStr += '0' + item;
                                }else{
                                    myIpStr += item;
                                }
                            });
                            
                            $j.getJSON('/js/common/krIpArr.json', function(data){
                                ipIsKr = "N";
                                $j.each(data.ips, function(i, item){
                                    for(var key in item){ 
                                        if(myIpStr >= key && myIpStr <= item[key]){
                                            ipIsKr = "Y";
                                            common_log.log('mkt_api.js ipCheck() ['+ myIpStr +','+ key +','+ item[key] +']');
                                        }
                                    }
                                });

                                // 팝업 시작
                                cfmNoticeAreaHtml.startPopup();

                                /*
                                if(ipIsKr == "N"){
                                    window.location = "http://m.ktroaming.kt.com";
                                }
                                */
                            });
                        }
                    }                    
                } catch (e) {
                    common_log.log('mkt_api.js ipCheck() [' + e.message + ']');
                    
                    // 기본 값 선언
                    ipIsKr = "Y";

                    // 팝업 시작
                    cfmNoticeAreaHtml.startPopup();
                }
            }
        });
    },

    // 사용자 기본정보조회(CTN)
    infosBasic: function(){
        if(gnbInfoName == ''){
            mKt_common.api({
                'url' : '/kt/members/v1.0/infos/basic',	
                'cookie' : true,
                'type' : 'get',
                'callback' : function(type, result){
                	gnbInfoName = '고객';
                    try {
                        if(type === 'success'){
                            $j('.mintpointtxt').text(result.data.info.name);
                            $j('.kusbenefitNm').text(result.data.info.name);   //맞춤혜택
                            gnbInfoName = result.data.info.name; //mKTGlobal.js 선언
                            gnbInfoBirthYn = result.data.info.birthYn; //mKTGlobal.js 선언
                        } else {
                            $j('.mintpointtxt').text(gnbInfoName);
                            $j('.kusbenefitNm').text(gnbInfoName);   //맞춤혜택
                        }
                    } catch (e) {
                        common_log.log('mkt_api.js infosBasic() [' + e.message + ']');                        
                    }
                }
            });
        }else{
            $j('.mintpointtxt').text(gnbInfoName);
            $j('.kusbenefitNm').text(gnbInfoName);  //맞춤혜택
        }
    },
    
    // 사용자 기본정보조회(CTN)
    infosBasic2: function(html , areaData){
            mKt_common.api({
                'url' : '/kt/members/v1.0/infos/basic',	
                'cookie' : true,
                'type' : 'get',
                'callback' : function(type, result){
                	gnbInfoName = '고객';
                    try {
                        if(type === 'success'){
                        	if($('#mkt-pdcard-welcome-p').text().indexOf(result.data.info.name) < 0){
                        		$('#mkt-pdcard-welcome-p').prepend(result.data.info.name);
                        	}
                        	
                            $j('.kusbenefitNm').text(result.data.info.name);   //맞춤혜택
                            gnbInfoName = result.data.info.name; //mKTGlobal.js 선언
                            gnbInfoBirthYn = result.data.info.birthYn; //mKTGlobal.js 선언
                            basicResult = result;
                            //basicResult = "error"
                            mainAreaHtml.callbackInfosBasic2(basicResult,html , areaData);
                        } else {
                        	basicResult = "error"
                    		mainAreaHtml.callbackInfosBasic2(basicResult,html , areaData);
                        }
                    } catch (e) {
                    	basicResult = "error"
                        common_log.log('mkt_api.js infosBasic() [' + e.message + ']');                        
                    }
                }
            });
    },

    // 최근본메뉴
    targetMenu: function(){
        mKt_common.api({
            'url' : '/kt/targetmenu/v1.0/m',
            'cookie' : true,
            'type' : 'get',
            'callback' : function(type, result){
                cfmGnbAreaHtml.callBackTargetMenu(type, result);
            }
        });
    },

    // PC link
    pcLink: function(code){
        mKt_common.api({
            'url' : '/kt/links/v1.0/devices/PC/links/'+ code,	
            'type' : 'get',
            'callback' : function(type, result){
                mKt_common.callbackPcLinks(type, result);
            }
        });
    },

    // 통합검색-추천검색어-2차
    searchRecommend: function(){
        var areaId = 'A000000068';

        if(mKt_common.pageType() == 'shop'){ //Shop
            areaId = 'A000000777';
        }

        mKt_common.api({
            'url' : '/kt/screens/v1.0/areas/'+ areaId,
            'type' : 'get',
            'callback' : function(type, result){
                cfmSearchAreaHtml.callbackSearchRecommend(type, result);
            }
        });
    },

    // 통합검색-인기검색어-2차
    searchPopkeywords: function(mode){
        var brand = 'MOL';
        var statscode = 'MKT';

        if(mode == undefined) mode = mKt_common.pageType();

        if(mode == 'shop'){ //Shop
            brand = 'MSH';
            statscode = 'MSH';
        }

        mKt_common.api({
            'url' : '/kt/integratedSearch/v1.0/'+ brand +'/'+ statscode +'/popkeywords',
            'data' : { rows : 10 },
            'callback' : function(type, result){
                cfmSearchAreaHtml.callbackSearchPopkeywords(type, result, mode);
            }
        });
    },

    // 통합검색-자동완성-2차
    searchAutowords: function(word){
        var domain = 'MOL';
        var collection = 'MOL_UTIL';

        if(mKt_common.pageType() == 'shop'){ //Shop
            domain = 'MSH';
            collection = 'MSH_UTIL';
        }

        // word 검색용 치환
        word = word.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("(", "&#40;").replaceAll(")", "&#41;").replaceAll("'", "&#39;"); 

        mKt_common.api({
            'url' : '/kt/integratedSearch/v1.0/'+ domain +'/'+ collection +'/autowords',
            'data' : { 
                word : word,
                rows : 5
            },
            'callback' : function(type, result){
                cfmSearchAreaHtml.callbackSearchAutowords(type, result, word);
            }
        });
    },

    // 통합검색-메뉴바로가기/메뉴검색(닷컴),기획전(Shop)-2차
    searchwords: function(mode, word){
        var rows = 3;
        var domain = 'MOL';
        var collection = 'MOL_I01';
       
        if(mode == 'shop'){ //Shop(기획전)
            domain = 'MSH';
            collection = 'MSH_E01';
            rows = 1;
        }else if(mode == 'menu'){ //전체메뉴(메뉴검색)
            rows = 10;
        }

        // word 검색용 치환
        word = word.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("(", "&#40;").replaceAll(")", "&#41;").replaceAll("'", "&#39;");  

        mKt_common.api({
            'url' : '/kt/integratedSearch/v1.0/search/types/'+ domain +'/'+ collection +'/searchwords',
            'data' : { 
                word : word,
                rows : rows 
            },
            'callback' : function(type, result){
                if(mode == 'shop'){
                	if($("#searchInput").val() == result.data.responseHeader.params.k){
                		cfmSearchAreaHtml.callbackSearchSpecial(type, result, word);
                	}
                }else if(mode == 'menu'){
                	if($("#mCfmClNavMenuSearchInput").val() == result.data.responseHeader.params.k){
                		cfmSearchAreaHtml.callbackSearchwordsMenu(type, result, word);
                	}
                }else{
                	if($("#searchInput").val() == result.data.responseHeader.params.k){
                		cfmSearchAreaHtml.callbackSearchwords(type, result, word);
                	}
                }
            }
        });
    },

    // 이벤트(메인)
    mainEvent: function(target, areaData){
        var data = {
            limit:6, //글수
            offset:1, //시작글 인덱스
            order:'evtPstngDate:DESC'
        };

        mKt_common.api({
            'url' : '/kt/events/v1.0/types/P/sections/ALL',
            'type' : 'get',
            'data' : data,
            'callback' : function(type, result){
                mainAreaHtml.callbackMainEvent(type, target, result, areaData);
            }
        });
    },

    // shop(메인)
    mainShop: function(target, areaData){
    	mKt_common.api({
    		'url' : '/kt/shop/v1.0/main',
    		'type' : 'get',
    		'callback' : function(type, result){
    			mainAreaHtml.callbackMainShop(type, target, result, areaData);
    		}
    	});
    },

    // 간편조회 Banner
    simpleBanner: function(){
        mKt_common.api({
            'url' : '/kt/screens/v1.0/areas/A000000023',
            'type' : 'get',
            'callback' : function(type, result){
                banner.callbackSimple(type, result);
            }
        });
    },

    // Shop(장바구니개수)-2차
    cartCount: function(){
         mKt_common.api({
            'url' : '/kt/cart/v1.0/cartCnt',
            'cookie' : true,
            'type' : 'get',
            'callback' : function(type, result){
                try {
                    if(type === 'success'){
                        if(mKt_common.isNull(result.data.resultData) != ''){
                            var cfmCartCount = result.data.resultData.cartCnt;
                            if(cfmCartCount > 0){
                            	cfmGnbAreaHtml.cartHtml(cfmCartCount);
                            }
                        }
                    }                    
                } catch (e) {
                    common_log.log('mkt_api.js cartCount() [' + e.message + ']');
                }
            }
        });        
    },    

    // 이용량 조회
    usages: function(a){
    	
    	mKt_common.api({
    		'url' : '/kt/members/v1.0/resources/usages?cd='+a,
    		'cookie' : true,
    		'type' : 'get',
    		'timeout' : 5000,
    		'callback' : function(type, result){
    			try {
    				if(type === 'success'){
    					mainAreaHtml.callbackMainUsages(type, result);
    					usagesResult = result;
    				}                    
    			} catch (e) {
    				common_log.log('mkt_api.js usages() [' + e.message + ']');
    			}
    		}
    	});        
    },     
    // 요금제 조회(실시간 요금)
    bills: function(){
    	
    	mKt_common.api({
    		'url' : '/kt/members/v1.0/resources/bills',
    		'cookie' : true,
    		'type' : 'get',
    		'timeout' : 5000,
    		'callback' : function(type, result){
    			try {
    				if(type === 'success'){
    					
    				}                    
    			} catch (e) {
    				common_log.log('mkt_api.js usages() [' + e.message + ']');
    			}
    		}
    	});        
    },
    
     // 맴버십 조회(맴버십 조회)
    membership: function(){
    	
    	mKt_common.api({
    		'url' : '/kt/members/v1.0/resources/membership',
    		'cookie' : true,
    		'type' : 'get',
    		'timeout' : 5000,
    		'callback' : function(type, result){
    			try {
    				if(type === 'success'){
    					mainAreaHtml.callbackMainMembership(type, result);
    					membershipResult = result;
    				}                    
    			} catch (e) {
    				common_log.log('mkt_api.js usages() [' + e.message + ']');
    			}
    		}
    	});        
    }
}