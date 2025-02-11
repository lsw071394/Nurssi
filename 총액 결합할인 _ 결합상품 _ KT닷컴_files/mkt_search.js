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

var cfmSearchRecommendResult = {}; //추천검색어
var cfmSearchAreaHtml = {

    //링크정보 
    linkInfo: function(mode, type, traget, item){        
        var linkType = '_self';
        var titleName = 'mKT-개인_공통';
        var urlInfo = search_URL +'/?c=MOL000000&r=10&ch=USR000';
        var statInfo = '';

        if(mode == 'menu'){//메뉴검색(전체메뉴)
            statInfo = '^mKT-개인_공통^GNB^메뉴검색레이어^';

            if(traget != null){
                traget.data('item', item);
                traget.on('click', function(){
                    if(type == 'words'){
                    	statInfo = '^mKT-개인_공통^GNB^메뉴검색레이어^';
                        urlInfo = item.URL;
                        statInfo = statInfo + item.MENUNAME;
                    }

                    mKt_common.link(urlInfo, linkType, titleName, statInfo);
                    if(urlInfo != '') return false;
                });
            }else{
                if(type == 'search'){
                    urlInfo = urlInfo +'&k='+ encodeURIComponent(item.keyword);
                    statInfo = '^mKT-개인_공통^GNB^메뉴검색레이어^';
                    statInfo = statInfo  +'통합검색바로가기';
                }else if(type == 'click'){
                    urlInfo = '';
                    statInfo = '^mKT-개인_공통^GNB^메뉴검색레이어^';
                    statInfo = statInfo + '검색필드';
                }else if(type == 'clear'){
                    urlInfo = '';
                    statInfo = '^mKT-개인_공통^GNB^메뉴검색레이어^';
                    statInfo = statInfo + '검색어리셋버튼';
                }else if(type == 'close'){
                    urlInfo = '';
                    statInfo = '^mKT-개인_공통^GNB^메뉴검색레이어^';
                    statInfo = statInfo + '닫기버튼';
                }
    
                mKt_common.link(urlInfo, linkType, titleName, statInfo);
            }
        }else{ //통합검색(상단영역)
            statInfo = '^mKT-개인_공통^GNB^검색레이어^';

            if(mKt_common.pageType() == 'shop'){ //Shop
                statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                urlInfo = search_URL +'/?c=MSH000000';
            }

            if(traget != null){
                traget.data('item', item);
                traget.on('click', function(){
                    var item = traget.data('item');
                    if(type == 'popular'){
                        var statInfoType = '인기검색어^';
                        if(mKt_common.pageType() == 'shop' && $j('.kt_popkeyword').hasClass('active')){ //Shop&KT인기검색어
                            statInfoType += 'KT^';
                        }else if(mKt_common.pageType() != 'shop' && $j('.shop_popkeyword').hasClass('active')){ //닷컴&Shop인기검색어
                            statInfoType += 'Shop^';
                        }
                        statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                        if(mKt_common.pageType() == 'shop'){ //Shop
                            statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                            urlInfo = search_URL +'/?c=MSH000000';
                        }
                        urlInfo = urlInfo +'&k='+ encodeURIComponent(item.keyword);
                        statInfo = statInfo + statInfoType + item.ranking +'위^'+ item.keyword;
                    }else if(type == 'autowords'){
                    	statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                        if(mKt_common.pageType() == 'shop'){ //Shop
                            statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                            urlInfo = search_URL +'/?c=MSH000000';
                        }
                        urlInfo = urlInfo +'&k='+ encodeURIComponent(item.KEYWORD);
                        statInfo = statInfo + '자동완성^'+ item.KEYWORD;
                    }else if(type == 'words'){
                    	statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                        if(mKt_common.pageType() == 'shop'){ //Shop
                            statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                            urlInfo = search_URL +'/?c=MSH000000';
                        }
                        urlInfo = item.URL;
                        statInfo = statInfo + '메뉴 바로가기^'+ item.MENUNAME;
                    }else if(type == 'special'){
                    	statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                        if(mKt_common.pageType() == 'shop'){ //Shop
                            statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                            urlInfo = search_URL +'/?c=MSH000000';
                        }
                        urlInfo = item.URL;
                        statInfo = statInfo + '추천기획전^'+ item.TITLE;
                    }

                    mKt_common.link(urlInfo, linkType, titleName, statInfo);
                    if(urlInfo != '') return false;
                });
            }else{
                if(type == 'search'){
                	statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                    if(mKt_common.pageType() == 'shop'){ //Shop
                        statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                        urlInfo = search_URL +'/?c=MSH000000';
                    }
                    urlInfo = urlInfo +'&k='+ encodeURIComponent(item.keyword);
                    statInfo = statInfo + item.keyword +'^검색버튼';           
                }else if(type == 'click'){
                	statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                    if(mKt_common.pageType() == 'shop'){ //Shop
                        statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                        urlInfo = search_URL +'/?c=MSH000000';
                    }
                    urlInfo = '';
                    statInfo = statInfo + '검색필드';
                }else if(type == 'clear'){
                	statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                    if(mKt_common.pageType() == 'shop'){ //Shop
                        statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                        urlInfo = search_URL +'/?c=MSH000000';
                    }
                    urlInfo = '';
                    statInfo = statInfo + '검색어리셋버튼';
                }else if(type == 'close'){
                	statInfo = '^mKT-개인_공통^GNB^검색레이어^';

                    if(mKt_common.pageType() == 'shop'){ //Shop
                        statInfo = '^mKT-개인_공통^GNB^Shop^검색레이어^';
                        urlInfo = search_URL +'/?c=MSH000000';
                    }
                    urlInfo = '';
                    statInfo = statInfo + '닫기버튼';
                }
    
                mKt_common.link(urlInfo, linkType, titleName, statInfo);
            }
        }
    },

    //검색어 하이라이팅
    replaceKeyword: function(keyword, resultValue){
        var replaceWord = '';
        cfmKeyword = keyword.replace(/\s/g,''); // 공백 제거

        for (var i = 0 ; i < cfmKeyword.length ; i ++ ) {
            var charStr = cfmKeyword.substr(i,1);
            // 정규식 시작 (
            if (i === 0) replaceWord = '(';
            if (cfmSearchAreaHtml.isSpecialChar(charStr)) {
                // 정규식의 기본 특수문자일경우 일반문자로 치환하기 위해 \ 붙여줌
                replaceWord += '\\' + charStr + '\\s*';
            } else {
                replaceWord += charStr + '\\s*';
            }
            // 정규식 끝 )
            if ( i === cfmKeyword.length-1 ) replaceWord += ')';
        }

        var regex = new RegExp(replaceWord,'gi');
        var repText = resultValue.replace(regex, '<strong>$1</strong>');

        return repText;
    },

    //특수문자 체크
    isSpecialChar: function(str){
        var spChr = ['.','*','+','?','\\','^','$','[',']','(',')','{','}','|'];
        var rtnVal = false;

        $j(spChr).each(function(k,v){
            if (str === v) rtnVal = true;
        });

        return rtnVal;
    },

    //통합검색-검색어 체크
    searchWordCheck: function(str){
        var result = str;
        /* 검색api(rdi.kt.com) url 검색어 -> 파라미터 검색어로 변경으로 해결-2차
        if(str != ''){
            var regEx = new RegExp('[\#\%\;\.\/\?]', 'g'); //오류나는 특수문자 제거
            result = result.replace(regEx, ''); 
        }
        */
        return result;
    },

    //통합검색-추천검색어 callback
    callbackSearchRecommend: function(type, result){
        try {
            if(type === 'success'){
                if(mKt_common.isNull(result.data) !== '' && result.data.length > 0){
                    var resultList = result.data[0].areaSetList[0].areaContsList;
                    if(mKt_common.isNull(resultList) !== '' && resultList.length > 0){
                        if(resultList.length > 0){
                            cfmSearchRecommendResult = resultList[0]; // 포커싱될때 재설정을 위해
    
                            $j('.m-olleh-search-wrap input[type=text]').attr('placeholder', cfmSearchRecommendResult.subTitle);
                            $j('.m-olleh-search-wrap input[type=text]').data('recommend', cfmSearchRecommendResult.title);
                        }
                    }
                }
            }            
        } catch (e) {
            common_log.log('mkt_search.js searchRecommend > callbackSearchRecommend() [' + e.message + ']');
        }
    },

    //통합검색-인기검색어 callback
    callbackSearchPopkeywords: function(type, result, mode){
        if(mode == undefined) mode = mKt_common.pageType();

        $j('.cfmCltabs').find('a').removeClass('active').removeAttr('title');

        if(mode == 'shop'){ //Shop
            $j('.shop_popkeyword').addClass('active');
		    $j('.shop_popkeyword').attr('title','선택된 탭');
        }else{
            $j('.kt_popkeyword').addClass('active');
		    $j('.kt_popkeyword').attr('title','선택된 탭');
        }

        try {
            if(type === 'success'){
            	$j(".popular-searches").removeClass("wholelist");
            	$j("morebtn_ps").text("닫기");
                $j('.popular-searches').empty(); //초기화
                $j('.morebtn_ps').remove(); //초기화
                if(mKt_common.isNull(result.data) !== ''){
                    if(mKt_common.isNull(result.data.response) !== ''){
                        if(mKt_common.isNull(result.data.response.docs) !== '' && result.data.response.docs.length > 0){
                            var resultList = result.data.response.docs;
                            $j.each(resultList, function(idx, data){
                                var quick = $j('<li>'+
                                '	<a href="#">'+
                                '		<span class="ranking">' + data.ranking + '</span>'+
                                '		<span class="title">' + data.keyword + '</span>'+
                                '	</a>'+
                                '</li>');
    
                                if(data.rankarrow === 'U'){
                                    quick.find('a').append('<span class="up-down up"><i>순위상승</i><span>' + data.changevlu + '</span></span>');
                                } else if(data.rankarrow === 'D'){
                                    quick.find('a').append('<span class="up-down down"><i>순위하락</i><span>' + data.changevlu + '</span></span>');
                                } else if(data.rankarrow === 'E'){
                                    quick.find('a').append('<span class="up-down equal"><i>순위변동없음</i></span>');
                                } else {
                                    quick.find('a').append('<span class="up-down new">NEW</span>');
                                }
    
                                cfmSearchAreaHtml.linkInfo('search', 'popular', quick.find('a'), data);
    
                                $j('.popular-searches').append(quick);
                            });
                            
                            
                        }
                        
                        var popularmorebtn = '<button type="button" class="morebtn_ps" role="button">더보기</button>';
                        
                        $j('.popular-searches').after(popularmorebtn);
                        popularlistOnliad();
                    }
                }
            }
        } catch (e) {
            common_log.log('mkt_search.js searchPopkeywords > callbackSearchPopkeywords() [' + e.message + ']');
        }

    },

    //통합검색-자동완성 callback
    callbackSearchAutowords: function(type, result, words){
        var target = $j('.auto-list').find('ul');

        try {
            if(type === 'success'){
                target.empty(); //초기화
    
                var resultList = result.data.response.docs;
                if(resultList.length > 0){
                    $j.each(resultList, function(idx, data){
                        var resultValue = data.KEYWORD;
                        var highlight = '';
                        
                        data.KEYWORD = data.KEYWORD.replaceAll("&lt;", "<").replaceAll( "&lt;","<").replaceAll("&gt;",">").replaceAll( "&#40;","(").replaceAll("&#41;",")").replaceAll( "&#39;","'");
                        
                        if(words.length == 1){
                            if(resultValue.indexOf(words.toUpperCase()) !== -1){
                                highlight = resultValue.replace(words.toUpperCase(), '<strong>' + words.toUpperCase() + '</strong>');
                            } else {
                                highlight = resultValue.replace(words, '<strong>' + words + '</strong>');
                            }
                        }else{
                            highlight = cfmSearchAreaHtml.replaceKeyword(words, resultValue);
                        }
    
                        var auto = $j('<li><a href="#">' + highlight + '</a></li>');
    
                        cfmSearchAreaHtml.linkInfo('search', 'autowords', auto.find('a'), data);
                        target.append(auto);
                    });
                } else {
                    target.append('<li class="cfmnosearchResult">해당 검색어에 대한 검색결과가 없습니다.</li>');
                }
            }            
        } catch (e) {
            common_log.log('mkt_search.js searchAutowords > callbackSearchAutowords() [' + e.message + ']');
        }
    },

    //통합검색-바로가기 callback
    callbackSearchwords: function(type, result, words){
        var target = $j('.quick-menu').find('ul');

        try {
            if(type === 'success'){
                target.empty(); //초기화
    
                var linkHtml = '';
                var resultList = result.data.response.docs;
                var searchKeyword = result.data.highlighting;
    
                if(resultList.length > 0){
                    $j.each(resultList, function(idx, data){
                        var category = '';
                        var menuPathArr = data.MENUPATH.split('^$^');
                        var menuDepth = menuPathArr.length / 2;
                        var menuName = '';
                        var highlightTxt = searchKeyword[data.DOCID].MENUNAME;
    
                        for(var depth = 1; depth <= menuDepth; depth++){
                            if(category !== ''){
                                category += ' > ';
                            }
                        
                            menuName = menuPathArr[(depth - 1) * 2];
                            if(depth === menuDepth){
                                category += highlightTxt;
                            } else {
                                category += menuName;
                            }
                        }
    
                        var link;
                        if(mKt_common.isNull(data.URL) == '#mypage' || mKt_common.isNull(data.URL) == '#benefits'){ //마이,혜택 제거
                        } else if(mKt_common.isNull(data.URL) !== ''){
                            link = $j('<li><a href="#">' + category + '</a></li>');
    
                            cfmSearchAreaHtml.linkInfo('search', 'words', link.find('a'), data);
                        } else {
                            link = $j('<li>' + category + '</li>');
                        }
    
                        target.append(link);
                    });
                } else {
                    target.append('<li>해당 검색어에 대한 검색결과가 없습니다.</li>');
                }
            }
        } catch (e) {
            common_log.log('mkt_search.js searchwords > callbackSearchwords() [' + e.message + ']');
        }
    },

    //통합검색-기획전(Shop) callback-2차
    callbackSearchSpecial:  function(type, result, words){
        var target = $j('.quick-menu').find('ul');

        try {
            if(type === 'success'){
                target.empty(); //초기화
    
                var resultList = result.data.response.docs;
                var searchKeyword = result.data.highlighting;
    
                if(resultList.length > 0){
                    $j.each(resultList, function(idx, data){
                        var highlightTxt = searchKeyword[data.DOCID].TITLE;
                        var link;
    
                        data.URL = data.LINKURL_M;
                        if(mKt_common.isNull(data.URL) !== ''){
                            link = $j('<li><a href="#">' + highlightTxt + '</a></li>');
    
                            cfmSearchAreaHtml.linkInfo('search', 'special', link.find('a'), data);
                        } else {
                            link = $j('<li>' + highlightTxt + '</li>');
                        }
    
                        target.append(link);
                    });
                } else {
                    target.empty();
                }
            }
        } catch (e) {
            common_log.log('mkt_search.js searchwords > callbackSearchSpecial() [' + e.message + ']'); 
        }
    },

    //전체메뉴-메뉴검색 callback
    callbackSearchwordsMenu: function(type, result, words){
        var target = $j('.mCfmClNavSearch-auto-list');

        try {
            if(type === 'success') {
                target.empty(); //초기화
    
                var linkHtml = '';
                var resultList = result.data.response.docs;
                var searchKeyword = result.data.highlighting;
    
                if(resultList.length > 0) {
                    $j.each(resultList, function(idx, data) {
                        var category = '';
                        var menuPathArr = data.MENUPATH.split('^$^');
                        var menuDepth = menuPathArr.length / 2;
                        var menuName = '';
                        var highlightTxt = searchKeyword[data.DOCID].MENUNAME;
    
                        for(var depth = 1; depth <= menuDepth; depth++) {
                            if(category !== '') {
                                category += ' > ';
                            }
                        
                            menuName = menuPathArr[(depth - 1) * 2];
                            if(depth === menuDepth) {
                                category += highlightTxt;
                            } else {
                                category += menuName;
                            }
                        }
    
                        var link;
                        if(mKt_common.isNull(data.URL) == '#mypage' || mKt_common.isNull(data.URL) == '#benefits'){ //마이,혜택 제거
                        } else if(mKt_common.isNull(data.URL) !== ''){
                            link = $j('<li><a href="#">' + category + '</a></li>');
    
                            cfmSearchAreaHtml.linkInfo('menu' ,'words', link.find('a'), data);
                        } else {
                            link = $j('<li>' + category + '</li>');
                        }
    
                        target.append(link);
                    });
                } else {
                    target.empty();
                }
            }
        } catch (e) {
            common_log.log('mkt_search.js searchwords > callbackSearchwordsMenu() [' + e.message + ']'); 
        }
    }
}

$j(document).ready(function(){
    if($j('.m-olleh-search-wrap').length > 0){

        //통합검색(상단영역)-검색버튼
        $j('.search-call').on('click', function(){
            $j('.m-olleh-search-wrap .btn-clear').hide(); //검색지우기버튼
            mKt_api.searchRecommend(); //추천검색어
            mKt_api.searchPopkeywords(); //인기검색어
            
            setTimeout(function() {
            	if ( $j('.helplink-swiper .swiper-slide').length > 1 ) 	{//0227
            		mkt_helplink_swiper.init();
            	} else {
            		$j('.helplink-swiper').addClass('nonswiper');//0227
            	}	
				$j('#searchInput').focus(); //2023 웹접근성 : 포커스 이동 추가
            }, 200);
            $j("#mCfmClFooter").hide();
            $j("aside.floating-tabbar").addClass("active");
        });
        
        //통합검색(검색레이어)-인기검색어탭선택-2차
        $j('.kt_popkeyword').on('click', function(){
            
        	if(!$j(this).attr('title') == "선택된 탭" || $j(this).attr('title') == undefined){
        	
	        	$j(this).closest('.cfmCltabs').find('a').removeClass('active').removeAttr('title'); 
			    $j(this).addClass('active');
			    $j(this).attr('title','선택된 탭');
			    
			    
	            //인기검색어
	            mKt_api.searchPopkeywords('cl'); 
	
	            //클릭통계
	            if(mKt_common.pageType() == 'shop'){ //Shop
	                KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^GNB^Shop^검색레이어^TAB_KT');
	            }else{
	                KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^GNB^검색레이어^TAB_KT');
	            }
	            
	            return false;
        	}
        });
        $j('.shop_popkeyword').on('click', function(){
        	
        	if(!$j(this).attr('title') == "선택된 탭" || $j(this).attr('title') == undefined){
	            $j(this).closest('.cfmCltabs').find('a').removeClass('active').removeAttr('title'); 
			    $j(this).addClass('active');
			    $j(this).attr('title','선택된 탭');
	
	            //인기검색어
	            mKt_api.searchPopkeywords('shop'); 
	
	            //클릭통계
	            if(mKt_common.pageType() == 'shop'){ //Shop
	                KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^GNB^Shop^검색레이어^TAB_Shop');
	            }else{
	                KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^GNB^검색레이어^TAB_Shop');
	            }
	
	            return false;
        	}
        });

        //추천검색어 재설정
        $j('.m-olleh-search-wrap input[type=text]').on('focus', function(){
            if (cfmSearchRecommendResult.subTitle !== undefined) {
                setTimeout(function(){
                    $j('.m-olleh-search-wrap input[type=text]').attr('placeholder', cfmSearchRecommendResult.subTitle);
                    $j('.m-olleh-search-wrap input[type=text]').data('recommend', cfmSearchRecommendResult.title);
                }, 200);
            }
        });

        //통합검색(검색레이어)-검색입력창        
        $j('.m-olleh-search-wrap input[type=text]').attr('placeholder', '무엇이 궁금하신가요?');
		$j('.m-olleh-search-wrap input[type=text]').attr('maxlength', 30);
        $j('.m-olleh-search-wrap input[type=text]').on('click', function(e){
            cfmSearchAreaHtml.linkInfo('search', 'click', null);
        });

        //통합검색(검색레이어)-자동완성 & 바로가기 검색
        $j('.m-olleh-search-wrap input[type=text]').val(''); // 초기화(뒤로가기)
        $j('.m-olleh-search-wrap input[type=text]').on('keyup', function(event){
            if(event.keyCode === 13){
                $j('.m-olleh-search-wrap form .btn-search').click();
                return false;
            }

            var words = cfmSearchAreaHtml.searchWordCheck($j(this).val().trim());
            if(words !== ''){
                $j('#searchWrapBefore').hide();
                $j('#searchWrapAfter').show();
                $j('.m-olleh-search-wrap .btn-clear').show();
               
                mKt_api.searchAutowords(words); //자동완성
                
                //통합검색(검색레이어)-문구변경-2차
                if(mKt_common.pageType() == 'shop'){ //Shop
                    $j('#searchWrapAfter .quick-menu>strong').text('추천 기획전');
                    mKt_api.searchwords('shop', words);
                }else{
                    $j('#searchWrapAfter .quick-menu>strong').text('메뉴 바로가기');
                    mKt_api.searchwords('search', words);
                }
            } else {
                $j('#searchWrapBefore').show();
                $j('#searchWrapAfter').hide();
                $j('.m-olleh-search-wrap .btn-clear').hide();

                $j('.auto-list').find('ul').empty();
                $j('.quick-menu').find('ul').empty();
            }
        });

        //통합검색(검색레이어)-검색어 지우기
        $j('.m-olleh-search-wrap .btn-clear').on('click', function(){
            $j('#searchWrapBefore').show();
            $j('#searchWrapAfter').hide();

            $j('.auto-list').find('ul').empty();
            $j('.quick-menu').find('ul').empty();
            $j("#searchInput").val('').focus();
            $j("#searchInput").val('');
            $j(this).hide();
            cfmSearchAreaHtml.linkInfo('search', 'clear', null);
        });

        //통합검색(검색레이어)-검색페이지이동
        $j('.m-olleh-search-wrap form .btn-search').on('click', function(){
            var searchWords = $j('.m-olleh-search-wrap input[type=text]').val();
            var recommendWords = $j('.m-olleh-search-wrap input[type=text]').data('recommend');

            var words = '';
            if(mKt_common.isNull(searchWords) !== ''){ //일반검색어
                words = searchWords;
            } else { //추천검색어
                words = mKt_common.isNull(recommendWords);
            }

//            if(words !== ''){
//            	cfmSearchAreaHtml.linkInfo('search', 'search', null, {keyword:words});
//            } else {
//            	alert('검색어를 입력해 주세요.');
//            	setTimeout(function(){
//            		$j('.m-olleh-search-wrap input').focus(); //검색어 미입력 알림 후 검색창으로 포커스 보내기
//            	}, 200);
//            	return false;
//            }
            cfmSearchAreaHtml.linkInfo('search', 'search', null, {keyword:words});
        });
        
        //통합검색(검색레이어)-닫기
        $j('.m-olleh-search-wrap .close-search').on('click', function(){
            if($j('.m-olleh-search-wrap').parent('.js-popup').hasClass('active')){ //열기상태만
            	
            	 $j('#searchWrapBefore').show();
                 $j('#searchWrapAfter').hide();

                 $j('.auto-list').find('ul').empty();
                 $j('.quick-menu').find('ul').empty();
                 $j("#searchInput").val('');
                 
                cfmSearchAreaHtml.linkInfo('search', 'close', null);
                $j("#mCfmClFooter").show();
                $j("aside.floating-tabbar").removeClass("active");
            }            
        });
    }

    //메뉴검색(전체메뉴)-검색입력창
    $j('.mCfmClNavSearchDiv input[type=text]').on('click', function(e){
        cfmSearchAreaHtml.linkInfo('menu', 'click', null);
    });

    //메뉴검색(전체메뉴)-메뉴검색
    $j('.mCfmClNavSearchDiv input[type=text]').val('');	// 초기화(뒤로가기)
    $j('.mCfmClNavSearchDiv input[type=text]').on('keyup', function(event){
        var words = cfmSearchAreaHtml.searchWordCheck($j(this).val().trim());
        if(words !== ''){
            $j('.mCfmClNavSearchLayer').show();
            $j('.mCfmClNavSearch-btnclear').show();
            $j('.mCfmClNavTabDiv').hide();//0618 메뉴 영역음 감춤

            mKt_api.searchwords('menu', words); //바로가기
        }else{
            $j('.mCfmClNavSearch-btnclear').hide();            
        }
    });

     //메뉴검색(전체메뉴)-검색어 지우기
    $j('.mCfmClNavSearchDiv .mCfmClNavSearch-btnclear').click(function(){
        $j(this).hide();    
        $j('#mCfmClNavMenuSearchInput').val('').focus();

        cfmSearchAreaHtml.linkInfo('menu', 'clear', null);
    });

    //메뉴검색(전체메뉴)-닫기
    $j('.mCfmClNavSearchDiv .mCfmClNavSearch-close-search').on('click', function(){
        $j('.mCfmClNavSearchLayer').hide();
        $j('.mCfmClNavSearch-btnclear').hide();
        $j('.mCfmClNavSearch-auto-list').empty();

        $j('.mCfmClNavSearchDiv input[type=text]').val('');        
        setTimeout(function(){ $j(".mCfmClNavSearchInput").focus(); }, 300);

        cfmSearchAreaHtml.linkInfo('menu', 'close', null);

        $j('.mCfmClNavTabDiv').show();//0618 메뉴 영역음 보임
    });

    //메뉴검색(전체메뉴)-통합검색바로가기
    $j('.mCfmClNavSearchDiv  .mCfmClNavSearch-auto-title').on('click', function(){
        var searchWords = $j('.mCfmClNavSearchDiv input[type=text]').val();
        var words = '';
        if(mKt_common.isNull(searchWords) !== ''){
            words = searchWords;
        }

        if(words !== ''){
            cfmSearchAreaHtml.linkInfo('menu', 'search', null, {keyword:words});
        } else {
            alert('검색어를 입력해 주세요.');
            setTimeout(function(){
                $j('.mCfmClNavSearchDiv input').focus();//검색어 미입력 알림 후 검색창으로 포커스 보내기
            }, 200);
            return false;
        }
    });
    
//     $j('#searchInput').on('blur', function(){
//     	if($j('#searchInput').val()==''){
//     		mKt_api.searchRecommend();
//     	}
//    });
});