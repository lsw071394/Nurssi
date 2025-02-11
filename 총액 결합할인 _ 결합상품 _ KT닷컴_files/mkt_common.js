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

var mKt_common = {
    // PC Link URL
    goPcLink : function (){
		KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^푸터^PC 버전');

		var rtValue = '';
		try {
			if (mKt_common.isNull(ktSmartUrl) != ''){
				rtValue = ktSmartUrl;
			}
		} catch (e){
			rtValue = '';
		}
		
		if (mKt_common.isNull(rtValue) == ''){
			var code = ktMenuCd;				
			if(mKt_common.isNull(code) === ''){			
				top.location.href = cl_pc_domain;
			}else{				
				mKt_api.pcLink(code);			
			}
		}else{
			top.location.href = rtValue;
		}

		//모바일체크 리다이렉션 쿠키설정
		mkt.setComCookie('kt_rd', new Date().toString(), (1 / 24 / 60) * 5);
    },

	// PC Link URL callback
	callbackPcLinks : function(type, result){
		try {
			if(type === 'success'){
				var resultData = result.data.pcLinkInfo;
				top.location.href=resultData.pcSvcUrl;
			} else {
				top.location.href = cl_pc_domain;
			}
		} catch(exception){
			top.location.href = cl_pc_domain;
		}		
	},

	/*
		MenuLink
			linkUrl : 링크 정보
			adobeStat : 통계명
			linktarget : 
				_blank : 새창
				빈값 or _self : 현재창
			code : 메뉴코드
			... 메뉴(페이지) 통합 로그 호출됨.			
	*/ 
	ktMenuLinkStat : function(linkUrl, adobeStat, linktarget, code){
		var titleName = 'mKT-개인_공통';

		// 고객센터 앱일 경우 통계변경
		if(appChk){
			// 마이케이티앱 버전에 따라 통계코드가 다르게 보이도록 처리
			var myKtAppVersionOne = '';
			var myKtAppVersionTwo = '';
			var myKtAppCode = '';

			var userAgentArray = navigator.userAgent.split(';');

			for (var i = 0; i < userAgentArray.length ; i++)
			{
				var agentSplit = userAgentArray[i].split('=');

				if ( agentSplit[0].trim() == 'appver' )
				{
					var versionSplit = agentSplit[1].split('.');
					
					// Android 06.04.00 ~ 06.05.00 / iOS 6.4.7 ~ 6.4.8 일 경우 1번째, 2번째 값을 기준으로 버전표시 ex) 6.4 / 6.5 등등
					myKtAppVersionOne = parseInt(versionSplit[0], 10);

					if ( myKtAppVersionOne > 6 )
					{
						// 7버전 이상부터는 7.0 / 8.0 으로 되도록 뒤의 버전정보는 사용하지 않음
						myKtAppVersionTwo = 0;
					}
					else
					{
						myKtAppVersionTwo = parseInt(versionSplit[1], 10);
					}
				}
			}

			// 통계코드 만들어 줌
			myKtAppCode = '^APP^마이케이티' + myKtAppVersionOne + '.' + myKtAppVersionTwo + '^';

			adobeStat = adobeStat.replace('^mKT-개인^', myKtAppCode);
		}
		
		klog.menu(titleName, adobeStat, code); //kLogcode.js		
		KT_trackClicks(titleName, adobeStat); //s_code.js

		var oLinkUrl = linkUrl;
		if (oLinkUrl !== ''){
			setTimeout(function(){
				if(linktarget === '' || linktarget === '_self'){
					top.location.href=linkUrl;
				} else if (linktarget.substring(0, 4) === '_pop'){
					try {
						var pw = linktarget.split('|')[1];
						var ph = linktarget.split('|')[2];
						mKt_common.popLink(linkUrl, code, pw,  ph);
					} catch(e){
						common_log.log('mkt_common.js ktMenuLinkStat() [팝업사이즈 오류]');
					}
				} else {
					window.open(oLinkUrl,linktarget);
				}
			}, 100);
		}
	},

	/*
		메인 AOT 화면에서 배너 영역의 클릭 시 사용되는 함수. ( ktMenuLinkStat 함수와 동일.. 통합로그 호출 부분만 차이남. )

		Link
			linkUrl : 링크 정보
			adobeStat : 통계명
			linktarget : 
				_blank : 새창
				빈값 or _self : 현재창
			code : 메뉴코드
			areaCode : 영역코드
			type : bann...(Banner 통합log) 
			       그 외에는 메뉴 통합로그 호출됨.			
	*/ 
	ktLinkStat : function(linkUrl, adobeStat, linktarget, code, areaCode, type, omsBannerName){
		var titleName = 'mKT-개인_메인';

		//빅배너
		if(type === 'omsbann'){
			//온라인마케팅시스템 oms
			try {
				if(mKt_common.isNull(omsBannerName) == ''){
					omsBannerName = adobeStat;
				}
				omsf.bannerClickLog(areaCode, omsBannerName, 'CL', adobeStat);
			} catch(e){
				common_log.log('mkt_common.js omsf.bannerClickLog() [' + e.message + ']');
			}

			klog.banner(titleName, adobeStat, areaCode);
		}
		
		KT_trackClicks(titleName, adobeStat);

		var oLinkUrl = linkUrl;
		if (oLinkUrl !== ''){
			setTimeout(function(){
				if(linktarget === '' || linktarget === '_self'){
					top.location.href=linkUrl;
				} else if (linktarget.substring(0, 4) === '_pop'){
					try {
						var pw = linktarget.split('|')[1];
						var ph = linktarget.split('|')[2];
						mKt_common.popLink(linkUrl, code, pw,  ph);
					} catch(e){
						common_log.log('mkt_common.js ktLinkStat() [팝업사이즈 오류]');
					}
				} else {
					window.open(oLinkUrl,linktarget);
				}
			}, 100);
		}
	},

	ktLinkStatWithOMS : function(titleName, adobeStat){
		//omsf.clickLog('CL', adobeStat);
		KT_trackClicks(titleName, adobeStat);
	},

	/**
	 * 링크
	 * 	url : url주소
	 * 	linkTarget : 링크타겟
	 * 		_blank : 새창
	 * 		빈값 or _self : 현재창
	 */
	link : function(url, linkTarget, titleName, adobeStat){
		if(mKt_common.isNull(url) !== ''){
			if(mKt_common.isNull(linkTarget) == '_blank'){
				window.open(url, linkTarget); 
			} else {
				top.location.href = url;
			}
		}

		if(mKt_common.isNull(titleName) !== '' && mKt_common.isNull(adobeStat) !== ''){
			KT_trackClicks(titleName, adobeStat);
		}
	},

	menuChk : function (code){
		var rtCode = '';
		try
		{
			if (mKt_common.isNull(code) === ''){
				rtCode = 'XXXXXX';
			} 
			else {
				if (code.length > 6){
					rtCode = code.substring(0, 6);
				} else {
					rtCode = code;
				}
			}
		}catch(e)
		{
			rtCode = 'XXXXXX';
		}
		
		return rtCode.substring(0, 1);
	},
	
	// 숫자 콤마 삽입
	setComma : function(input){
		input = String(input);
		return input.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	},

	// 숫자 콤마 제거
	removeComma : function(input){
		input = String(input);
		input.value.replace(/,/gi,'');
	},

	// 창닫기
	close : function(){
		window.open('', '_self');
		window.close();
	},

	// api호출
	api : function(args){
		
		if(args.url.indexOf('http') === -1 && args.url.indexOf(api_domain) === -1){
			if(args.url.indexOf('/') > 0){
				args.url = '/' + args.url;
			}

//			if(	       args.url == '/kt/members/v1.0/infos/basic'
//					|| args.url.indexOf('/kt/members/v1.0/resources/usages?cd=') > -1 
//					|| args.url == '/kt/members/v1.0/resources/bills' 
//					|| args.url == '/kt/members/v1.0/resources/membership' 
//					|| args.url == '/kt/cart/v1.0/cartCnt' 
//					|| args.url == '/kt/shop/v1.0/main' 
//			){
//				args.url = 'https://m.rdi.'+ default_domain + args.url;
//			}else{
//				
//				args.url = api_domain + args.url;
//			}
				args.url = api_domain + args.url;

		}

		this.callAjax(args);
	},
	
	/**
	 * ajax 호출
	 * 	args
	 * 		- url : URL
	 * 		- type : 전송방식(default : post)
	 * 		- data : 전송값
	 * 		- callback : 콜백함수
	 * 		- cookie : true 일경우 cookie정보 보냄(생략가능)
	 * 		- beforeSend : 전송전 실행함수(생략가능)
	 * 		- complete : 전송완료후 실행함수(생략가능)
	 * 		- enctype : 전송인코딩타입(생략가능)
	 */
	callAjax : function(args){
		var ajaxArgs = {
			url : args.url,
			type : args.type !== undefined ? args.type : 'post',
			data : args.data !== undefined ? args.data : '',
			dataType : 'json',
			cache : false,
			crossDomain : true,
			success : function(data){
				common_log.log('mkt_common.js callAjax('+ args.url +') [success]');
				process();

				function process(){
					if(document.readyState === 'interactive' || document.readyState === 'complete'){
						var returnCode = data.returnCode || data.responseCode;
						if(returnCode !== undefined){
							// returnCode : OK(성공), NG(실패)
							if(returnCode.toLowerCase() === 'ok'){
								if(args.callback){
									args.callback('success', data);
								}
							} else {
								common_log.log('mkt_common.js callAjax('+ args.url +') [returnCode : '+ returnCode +']');

								if(args.callback){
									args.callback('fail', data);
								}
							}
						} else {
							if(args.callback){
								args.callback('success', data);
							}
						}
					} else {
						setTimeout(function(){
							process();
						}, 100);
					}
				}

				return data;
			},
			error : function(request, status, error){
				common_log.log('mkt_common.js callAjax('+ args.url +') ['+ error +']');

				if(args.callback){
					args.callback('error', error);
				}
			}
		};

		// 컨텍트타입
		if(args.type === 'get'){
			ajaxArgs.contentType = 'text/plain; charset=utf-8';
		}

		// 동기/비동기
		if(args.async !== undefined){
			ajaxArgs.async = args.async;
		}
		
		// 타임아웃
		if(args.timeout !== undefined){
			ajaxArgs.timeout = args.timeout;
		}

		// 쿠키
		if(args.cookie === true){
			ajaxArgs.xhrFields = { withCredentials:true };
		}

		// ajax 시작전 콜함수
		if(args.beforeSend !== undefined){
			ajaxArgs.beforeSend = args.beforeSend;
		}

		// ajax 성공후 콜함수
		if(args.complete !== undefined){
			ajaxArgs.complete = args.complete;
		}

		// 파일업로드
		if(args.enctype === 'multipart/form-data'){
			ajaxArgs.processData = false;
			ajaxArgs.contentType = false;
		}

		$j.ajax(ajaxArgs);
	},

	/**
	 * 쿼리스트링을 오브젝트로 변환
	 * 	key1=value1&key2=value2 -> {key1 : value1, key2 : value2}
	 */
	queryToObject : function(){
		var obj = {};
		window.location.search.substring(1).replace(/([^=&]+)=?([^&]*)/g, function(m, key, value){
			obj[key] = decodeURIComponent(value);
		});
		return obj;
	},

	/**
	 * 오브젝트를 쿼리스트링으로 변환
	 * 	{key1 : value1, key2 : value2} -> key1=value1&key2=value2
	 */
	objectToQuery : function(obj){
		return $j.param(obj).replace(/\+/g, '%20');
	},

	/*
	** 입력값이 특정 문자만으로 되어 있는지 체크하며
	** 특정 문자만을 허용하려 할때 사용한다.
	*/
	containsCharsOnly : function(input, chars){
		var val = input;
		if(typeof input === 'object'){
			val = input.value;
		}

		for (var i=0; i<val.length; i++)
		{
			if (chars.indexOf(val.charAt(i)) === -1)
			{
				return false;
			}
		}
		return true;
	},

	// 입력값이 알파벳인지 체크
	isAlphabet : function(input){
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 알파벳 대문자인지 체크한다
	isUpperCase : function(input){
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 알파벳 소문자인지 체크한다
	isLowerCase : function(input){
		var chars = 'abcdefghijklmnopqrstuvwxyz';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 숫자만 있는지 체크한다
	isNumber : function(input){
		var chars = '0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 알파벳, 숫자로 되어 있는지 체크한다.
	isAlphaNum : function(input){
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 숫자, 대시'-' 로 되어 있는지 체크한다.
	// 전화번호나 우편번호, 계좌번호에 - 체크할때 유용하다.
	isNumDash : function(input){
		var chars = '-0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 숫자, 콤마',' 로 되어있는지 체크한다.
	isNumComma : function(input){
		var chars = ',0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 사용자가 정의한 포맷 형식인지 체크
	isValidFormat : function(input, format){
		var val = input;
		if(typeof input === 'object'){
			val = input.value;
		}

		if (val.search(format) !== -1)
		{
			return true;//올바른 포멧형식
		}

		return false;
	},

	// 입력값이 이메일 형식인지 체크한다.
	isValidEmail : function(input){
		var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;

		return this.isValidFormat(input, format);
	},

	// 입력값이 전화번호 형식(숫자-숫자-숫자) 인지 체크한다.
	isValidPhone : function(input){
		var format = /^(\d+)-(\d+)-(\d+)$/;

		return this.isValidFormat(input, format);
	},

	//입력값의 바이트 길이를 리턴한다.
	//getByteLength : function(input)
	getByteLength : function(source){
		var byteLength = 0;

		for (var i=0; i<source.length; i++)
		{
			var input = source.substr(i, i+1);
			var oneChar = escape(input.charAt(0));

			if (oneChar.length === 1)
			{
				byteLength++;
			}else if (oneChar.indexOf('%u') !== -1)
			{
				byteLength += 2;
			}else if (oneChar.indexOf('%') !== -1)
			{
				byteLength += oneChar.length / 3;
			}
		}

		return byteLength;
	},

	/**
	 * 팝업 링크
	 * 	linkUrl : 팝업URL
	 * 	popName : 팝업명
	 * 	pw : 너비
	 * 	ph : 높이
	 * 	pt : top(생략시 가운데)
	 * 	pl : left(생략시 가운데)
	 */
	 popLink : function(linkUrl, popName, pw, ph, pt, pl){
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		if(mKt_common.isNull(pt) === ''){
			pt = ((height / 2) - (ph / 2)) + dualScreenTop;
		}

		if(mKt_common.isNull(pl) === ''){
			pl = ((width / 2) - (pw / 2)) + dualScreenLeft;
		}

		var newWindow = window.open(linkUrl, popName, 'width=' + pw + ', height=' + ph + ', top=' + pt + ', left=' + pl + ', status=no');
		if (window.focus){
			newWindow.focus();
		}
	},

	// Object check
	isNull : function(obj){
		var rtValue = '';

		try 
		{
			if (obj === undefined || obj === null || obj === ''){
				rtValue = '';
			} else {
				rtValue = obj;
			}
		}catch(e){
			rtValue = '';
		}

		return rtValue;
	},

	//null 시 요청 str값으로 return 처리
	isNullNvl : function(obj, str) {
		var rtValue = '';
		try{
			if (obj === undefined || obj === null || obj === '') {
				rtValue = str;
			} else {
				rtValue = obj;
			}
		}catch(e) {
			rtValue = '';
		}
		return rtValue;
	},

	/**
	 * 페이징
	 * 	$pagination : 페이징 Jquery Obejct
	 * 	callback : 콜백함수
	 * 	total : 전체글수
	 * 	currentPage : 현재페이지번호
	 * 	recordByPage : 페이지당 글수
	 * 	pageByBlock : 블럭당 페이지수
	 */
	setPagination : function($pagination, callback, total, currentPage, recordByPage, pageByBlock){
		var textFirstPage = '첫 페이지로 이동';
		var textPrevPage = '이전 페이지로 이동';
		var textCurrPage = '현재위치';
		var textNextPage = '다음 페이지로 이동';
		var textLastPage = '마지막 페이지로 이동';
		var language = $j('html').attr('lang');
		if(language.indexOf('en') >= 0){
			textFirstPage = 'Go to the first Page';
			textPrevPage = 'Go to the previous Page';
			textCurrPage = 'Current page';
			textNextPage = 'Go to the next Page';
			textLastPage = 'Go to the last Page';
		}

		if(total !== 0){
			var pageHtml = '<div class="scope">';

			// 기본값세팅
			if(currentPage === undefined){
				currentPage = 1;
			}

			if(recordByPage === undefined){
				recordByPage = 10;
			}

			if(pageByBlock === undefined){
				pageByBlock = 10;
			}

			// 전체페이지수
			var numOfPage = Math.ceil(total / recordByPage);

			if(numOfPage > 1){
				var disabled = '';
				if(currentPage === 1){	// 첫페이지
					disabled = 'disabled';
				}
				pageHtml += '<a href="#" class="dir first ' + disabled + '">' + textFirstPage + '</a><a href="#" class="dir prev ' + disabled + '">' + textPrevPage + '</a>';
			}

			var firstPage = Math.floor((currentPage - 1) / pageByBlock) * pageByBlock + 1;	// 현재블럭의 첫페이지
			var lastPage = numOfPage > firstPage + pageByBlock - 1 ? firstPage + pageByBlock - 1 : numOfPage;	// 현재블럭의 마지막페이지
			for(var page = firstPage; page <= lastPage; page++){
				if(page === currentPage){
					pageHtml += '<span title="' + textCurrPage + '">' + page + '</span>';
				} else {
					pageHtml += '<a href="#" data-page="' + page + '">' + page + '</a>';
				}
			}

			if(numOfPage > 1){
				var disabled = '';
				if(currentPage === numOfPage){	// 마지막페이지
					disabled = 'disabled';
				}
				pageHtml += '<a href="#" class="dir next ' + disabled + '">' + textNextPage + '</a><a href="#" class="dir last ' + disabled + '">' + textLastPage + '</a>';
			}

			pageHtml += '</div>';

			$pagination.html(pageHtml);

			$pagination.find('a').on('click', function (){
				if($j(this).hasClass('disabled') === false){
					if(callback){
						if($j(this).hasClass('first')){	// 첫페이지
							callback(1);
						} else if($j(this).hasClass('prev')){	// 이전페이지
							callback(currentPage - 1);
						} else if($j(this).hasClass('next')){	// 다음페이지
							callback(currentPage + 1);
						} else if($j(this).hasClass('last')){	// 마지막페이지
							callback(numOfPage);
						} else {
							callback(parseInt($j(this).data('page')));	// 페이지
						}
					}
				}
			});
		}
	},

	/**
	 * 페이징
	 * 	$pagination : 페이징 Jquery Obejct
	 * 	callback : 콜백함수
	 * 	total : 전체글수
	 * 	currentPage : 현재페이지번호
	 * 	recordByPage : 페이지당 글수
	 */
	setPagination2 : function($pagination, callback, total, currentPage, recordByPage){
		var textPrevPage = '이전 목록';
		var textNextPage = '다음 목록';
		var language = $j('html').attr('lang');
		if(language.indexOf('en') >= 0){
			textPrevPage = 'Previous list';
			textNextPage = 'Next list';
		}

		if(total !== 0){
			var pageHtml = '';

			// 기본값세팅
			if(currentPage === undefined){
				currentPage = 1;
			}

			if(recordByPage === undefined){
				recordByPage = 10;
			}

			// 전체페이지수
			var numOfPage = Math.ceil(total / recordByPage);

			pageHtml += '<a href="#" class="btn-prev ' + (currentPage === 1 ? 'disabled' : '') + '"><span class="invisible">' + textPrevPage + '</span><i class="icon-prev"></i></a>';
			pageHtml += '<span><em>' + params.page + '</em>/' + numOfPage + '</span>';
			pageHtml += '<a href="#" class="btn-next ' + (currentPage === numOfPage ? 'disabled' : '') + '"><span class="invisible">' + textNextPage + '</span><i class="icon-next"></i></a>';

			$pagination.html(pageHtml);

			$pagination.find('a').on('click', function (event){
				event.preventDefault();
				
				if($j(this).hasClass('disabled') === false){
					if(callback){
						if($j(this).hasClass('btn-prev')){	// 이전 목록
							callback(currentPage - 1);
						} else if($j(this).hasClass('btn-next')){	// 다음 목록
							callback(currentPage + 1);
						}
					}
				}
			});
		}
	},

	// 로컬스토리지에 데이터 저장
	setLocalStorage : function(key, data){
		var value = {};

		value.timestamp = new Date().getTime();	// 데이터생성날짜
		value.data = data;

		localStorage.setItem(key, JSON.stringify(value));
	},
	
	// 로컬스토리지에서 데이터 조회
	getLocalStorage : function(key){
		this.removeLocalStorage(key);	// 데이터 삭제

		var value = JSON.parse(localStorage.getItem(key));
		if(value !== null){
			return value.data;
		}

		return null;
	},

	// 로컬스토리지에서 데이터 조회 (데이터 삭제 안함)
	getLocalStorageNotDel : function(key){
		var value = JSON.parse(localStorage.getItem(key));
		if(value !== null){
			return value.data;
		}

		return null;
	},

	// 로컬스토리지에서 데이터 삭제
	removeLocalStorage : function(key){
		var value = JSON.parse(localStorage.getItem(key));
		if(value !== null){
			var saveTime = value.timestamp;
			var nowTime = new Date().getTime().toString();

			// 5초가 지났으면 데이터삭제
			var timePeriod = this.compareTime(saveTime, nowTime, 'S');
			if(timePeriod > 5){
				localStorage.removeItem(key);
			}
		}
	},

	// 현재시간 yyyy-mm-dd hh:mi:ss
	dateToStr : function(t){
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if(month < 10){
			month = '0' + month;
		}
		if(day < 10){
			day = '0' + day;
		}
		if(hour < 10){
			hour = '0' + hour;
		}
		if(minute < 10){
			minute = '0' + minute;
		}
		if(second < 10){
			second = '0' + second;
		}
		if (t=='N'){
			return year + '' + month + '' + day + '' + hour + '' + minute + '' + second;
		}else{
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		}
	},

	// 시간비교
	compareTime : function(source, target, type){
		var t = 1;
		switch(type.toLowerCase()){
			case 's' :
				t = 1000;
				break;
			case 'm' :
				t = 1000 * 60;
				break;
			case 'h' :
				t = 1000 * 60 * 60;
				break;
			case 'd' :
				t = 1000 * 60 * 60 * 24;
				break;
			default :
				break;
		}
		return Math.floor((target - source) / t);
	},

	// 시간계산
	addDays : function(date, days){
		if(mKt_common.isNull(date) !== ''){
			if(mKt_common.isNull(days) === ''){
				days = 1;
			}
			var today = new Date();
			if(typeof date === 'string'){
				date = date.replace(/[^(0-9)]/gi, '');

				today.setFullYear(date.substring(0, 4));
				today.setMonth(parseInt(date.substring(4, 6)) - 1);
				today.setDate(date.substring(6, 8));
			} else if(typeof date === 'object'){
				today = date;
			}
			today.setDate(today.getDate() + days);
			return today;
		}
	},

	// 접근페이지확인
	checkedReferrer : function(url){
		var isPossibled  = false;


		var referrerUrl = document.referrer;
		var indexQueryStr = referrerUrl.indexOf('?');
		if(indexQueryStr !== -1){
			referrerUrl = referrerUrl.substring(0, indexQueryStr);
		}

		if(referrerUrl === url){
			isPossibled = true;
		}
		
		return isPossibled;
	},

	/* 
		통합kt.com에서 개발되는 page. 에서는 배너 클릭시 호출되는 함수
		adobe 통계 + GA 통계 + 통합Log
	*/ 
	KT_trackClicksNkLog : function (ClickCatName, ClickName, code){
  		KT_trackClicks(ClickCatName, ClickName);

  		klog.banner(ClickCatName, ClickName, code);
	},

	/*
		검색어 
			... 검색어 통합 로그 호출됨.
	*/	
	KT_trackClicksSearchkLog : function (existSch, notExistSch){
  		klog.search(existSch, notExistSch);
	},

	/*
		See&Click Banner Click
			... 캠페인(See&Click) 통합 로그 호출됨.
	*/	
	KT_trackClicksSNCkLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.snc(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.snc(ClickCatName, ClickName, code);
                break;
        }
    },

	/*
		See&Click Banner View
			... 노출 통합 로그 호출됨.
	*/	
	KT_trackClicksViewkLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.sncview(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.sncview(ClickCatName, ClickName, code);
                break;
        }  
    },

	/*
		See&Click Banner Close
			... 노출 통합 로그 호출됨.
	*/	
	KT_trackClicksClosekLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.sncclose(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.sncclose(ClickCatName, ClickName, code);
                break;
        }
    },

	/*
		See&Click Banner Close
			... 노출 통합 로그 호출됨.
	*/	
	KT_trackClicksNeverClosekLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.sncneverclose(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.sncneverclose(ClickCatName, ClickName, code);
                break;
        }
    },

	callRtdTodayClose : function(cookieType, cookieName, period){
		$j("#checkbox-"+cookieName).prop('checked', true);
		mKt_common.rtdTodayClose(cookieType, cookieName, period);
	},

	/*
		오늘 닫기 기능 ( 일정기간 보지않기 체크시에는 쿠키 관리 필요 )
		cookieName : 쿠키명
	*/
	rtdTodayClose : function(cookieType, cookieName, period){
		// 0기간동안 열지않기 check box 확인
		if(cookieType === 'snc'){
			if($j('#checkbox_snc').is(':checked') === true || $j('#checkbox_snc_fold').is(':checked') === true){
				mKt_common.setArrayCookie('snc_menu', ktMenuCd, period);
				mKt_common.setArrayCookie('snc_camp', cookieName, period);
			}
		} else {
			var isCookie = false;
			if($j('#checkbox-' + cookieName).length){
				if($j('#checkbox-' + cookieName).is(':checked') === true){
					isCookie = true;
				}
			} else {
				isCookie = true;
			}

			if(isCookie){
				mkt.setComCookie(cookieName, new Date().toString(), period);
			}
		}
	},

	/*
		쿠키세팅 - 배열
	*/
	setArrayCookie : function(cookieName, code, period){
		var val = mkt.getComCookie(cookieName);
		var obj = [];
		if(val !== ''){
			obj = JSON.parse(val);
		}

		var key = 'code';
		if(cookieName === 'snc_menu'){
			key = 'menuCd';
		} else if(cookieName === 'snc_camp'){
			key = 'campId';
		}

		if(obj.length > 0){
			for(var i = 0; i < obj.length; i++){
				if(obj[i][key] === code){
					obj.splice(i, 1);
					break;
				}
			}
		}

		var expire = new Date();
		expire.setSeconds(0);
		expire.setMinutes(0)
		expire.setHours(0);

		var value = {};
		value[key] = code;
		value['expire'] = mKt_common.addDays(expire, period).getTime();
		obj.push(value);

		mkt.setComCookie(cookieName, JSON.stringify(obj), 365);	// 365일 저장
	},

	/*
		쿠키조회 - 배열
	*/
	getArrayCookie : function(cookieName, code){
		var returnValue = '';
		var val = mkt.getComCookie(cookieName);
		var obj = [];
		if(val !== ''){
			obj = JSON.parse(val);
		}

		var key = 'code';
		if(cookieName === 'snc_menu'){
			key = 'menuCd';
		} else if(cookieName === 'snc_camp'){
			key = 'campId';
		}

		if(obj.length > 0){
			var nowTime = new Date().getTime().toString();

			for(var i = 0; i < obj.length; i++){
				if(obj[i][key] === code){
					if(mKt_common.compareTime(nowTime, obj[i]['expire'], 'S') > 0){
						returnValue = obj[i];
					} else {
						mKt_common.removeArrayCookie(cookieName, code);
					}

					break;
				}
			}
		}

		return returnValue;
	},

	/*
		쿠키삭제 - 배열
	*/
	removeArrayCookie : function(cookieName, code){
		var val = mkt.getComCookie(cookieName);
		var obj = [];
		if(val !== ''){
			obj = JSON.parse(val);
		}

		var key = 'code';
		if(cookieName === 'snc_menu'){
			key = 'menuCd';
		} else if(cookieName === 'snc_camp'){
			key = 'campId';
		}

		if(obj.length > 0){
			for(var i = 0; i < obj.length; i++){
				if(obj[i][key] === code){
					obj.splice(i, 1);
					break;
				}
			}
		}

		mkt.setComCookie(cookieName, JSON.stringify(obj), 365);	// 365일 저장
	},

	// 태그제거
	removeTag : function(str){
		return mKt_common.isNull(str).replace(/(<([^>]+)>)/gi, '');
	},

	tagReplaceAll : function(str){
		return mKt_common.isNull(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, '\'').replace(/&#34;/g, '"').replace(/inside\/01\//g, 'inside/');
	},

	txtReplaceAll : function(str){
		return mKt_common.isNull(str).replace(/\r\n/g, '<br />').replace(/\n/g,'<br />').replace(/inside\/01\//g, 'inside/');
	},

	// Path 끝 '/' 붙히기
	addLastSlash : function(path){
		var path = mKt_common.isNull(path);
		if(path.lastIndexOf('/')  !== path.length - 1){
			path = path + '/';
		}
		return path;
	},

	// 말줄임
	ellipsis : function(str, limit, letter){
		if(mKt_common.isNull(letter) === ''){
			letter = '...';
		}

		var cutStr = mKt_common.cutStr(str, limit);
		if(str !== cutStr){
			cutStr += letter;
		}
		
		return cutStr;
	},

	// Byte수 만큼 글자 자르기
	cutStr : function(str, limit){
		var str = mKt_common.isNull(str);
		if(str === ''){
			return 0;
		}

		var len = str.length;
		var size = 0;
		var cutIndex = len;
		for(var i = 0; i < len; i++){
			size += mKt_common.charByteSize(str.charAt(i));
			if(size === limit){
				cutIndex = i + 1;
				break;
			} else if(size > limit){
				cutIndex = i;
				break;
			}
		}

		return str.substring(0, cutIndex);
	},

	// Byte 크기 구하기
	charByteSize : function(ch){
		if(mKt_common.isNull(ch) === ''){
			return 0;
		}

		var charCode = ch.charCodeAt(0);
		if(charCode <= 0x00007F){
			return 1;
		} else if(charCode <= 0x0007FF){
			return 2;
		} else if(charCode <= 0x00FFFF){
			return 3;
		} else {
			return 4;
		}
	},

	ranDateNum : function(s){
		var d1 = new Date().getTime().toString();
		var d2 = parseInt(d1) % s;

		return d2;
	},

	//통계 처리
	sendStatis: function(data, pageName){
		var result = data;
		var apiPageName = '';
		//pageName = mKt_common.callPageName(pageName);
	
		if(pageName !== undefined && pageName !== '' && pageName !== null){
			if(ktChannel === 'Cl'){
				apiPageName = mKt_common.callPageName(pageName);
			}else{
				if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
					apiPageName = mKt_common.callPageName(result.data.scrnStatInfo);
				}else{
					apiPageName = '통계용 페이지명 없음';
				}
			}
		}else{
			if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
				apiPageName = mKt_common.callPageName(result.data.scrnStatInfo);
			}else{
				apiPageName = '통계용 페이지명 없음';
			}
		}
		// GA용 통계 스크립트 호출
		ga('set', 'title', apiPageName); //GA용, adobe 통계 pageName을 그대로 호출
		ga('rollup.set', 'title', apiPageName); //Adobe s.pageName
		s.pageName = apiPageName;
		
		if(mkt.isLoginStatus() === 'Y'){
			s.eVar11='Y';
			ga('set','dimension1','Y');
			ga('rollup.set','dimension1','Y');
		}else{
			s.eVar11='N';
			ga('set','dimension1','N');
			ga('rollup.set','dimension1','N');
		}
		ga('send', 'pageview'); // GA용, 통계 전송
		ga('rollup.send', 'pageview');
		loadAdobeChk();
	},

	//통계 처리
	sendStatisLaunch: function(data, pageName){
		var result = data;
		var apiPageName = '';
		var logPageName  = '';
		var rtUrl = document.location;

		//pageName = mKt_common.callPageName(pageName);
	
		if(pageName !== undefined && pageName !== '' && pageName !== null){
			if(ktChannel === 'Cl'){
				apiPageName = mKt_common.callPageName(pageName);
				logPageName = mKt_common.callPageName(pageName);
			}else{
				if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
					apiPageName = mKt_common.callPageName(result.data.scrnStatInfo);
					logPageName = mKt_common.callPageName(result.data.scrnStatInfo);
				}else{
					apiPageName = rtUrl;
				}
			}
		}else{
			if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
				apiPageName = mKt_common.callPageName(result.data.scrnStatInfo);
				logPageName = mKt_common.callPageName(result.data.scrnStatInfo);
			}else{
				apiPageName = rtUrl;
			}
		}
		
		//Adobe launch
		_commonDL = {
			pageInfo :{
				page_name : apiPageName, //각 페이지명, 페이지명은 별도의 엑셀파일 참조, 페이지 depth 구분은 "^"로 구분
				page_url : rtUrl,
				channel : "Mobile", //예시) pc web : PC, mobile web : Mobile, App : App
				login_status : "N", // 예시) "Y"(로그인),  "N"(비로그인)
				login_type : "", // 예시) ID 로그인 : normal, 소셜로그인 : facelook, kakaotalk, 자동로그인 : auto
			}
		};

		// GA용 통계 스크립트 호출
		ga('set', 'title', apiPageName); //GA용, adobe 통계 pageName을 그대로 호출
		ga('rollup.set', 'title', apiPageName); //Adobe s.pageName
		if(mkt.isLoginStatus() === 'Y'){
			_commonDL.pageInfo.login_status = 'Y';
			ga('set','dimension1','Y');
			ga('rollup.set','dimension1','Y');
		}else{
			_commonDL.pageInfo.login_status = 'N';
			ga('set','dimension1','N');
			ga('rollup.set','dimension1','N');
		}
		ga('send', 'pageview'); // GA용, 통계 전송
		ga('rollup.send', 'pageview');

		cfmFooterAreaHtml.statPageLaunch(logPageName); //페이지통계 
	},

	//TODO 통계코드
	callPageName: function(pageName){
		s.pageName = pageName;
		if(appChk){
			// 마이케이티앱 버전에 따라 통계코드가 다르게 보이도록 처리
			var myKtAppVersionOne = '';
			var myKtAppVersionTwo = '';
			var myKtAppCode = '';

			var userAgentArray = navigator.userAgent.split(';');

			for (var i = 0; i < userAgentArray.length ; i++)
			{
				var agentSplit = userAgentArray[i].split('=');
				
				if ( agentSplit[0].trim() == 'appver' )
				{
					var versionSplit = agentSplit[1].split('.');
					
					// Android 06.04.00 ~ 06.05.00 / iOS 6.4.7 ~ 6.4.8 일 경우 1번째, 2번째 값을 기준으로 버전표시 ex) 6.4 / 6.5 등등
					myKtAppVersionOne = parseInt(versionSplit[0], 10);

					if ( myKtAppVersionOne > 6 )
					{
						// 7버전 이상부터는 7.0 / 8.0 으로 되도록 뒤의 버전정보는 사용하지 않음
						myKtAppVersionTwo = 0;
					}
					else
					{
						myKtAppVersionTwo = parseInt(versionSplit[1], 10);
					}
				}
			}

			// 통계코드 만들어 줌
			myKtAppCode = '^APP^마이케이티' + myKtAppVersionOne + '.' + myKtAppVersionTwo;

			s.pageName = s.pageName.replace("^m^KT-개인", myKtAppCode); 
			s.pageName = s.pageName.replace("^m^molleh", myKtAppCode); 
		}
		return s.pageName;
	},

	//날짜포멧
	dateFormat: function(type, date){
		var format = '';
		if(mKt_common.isNull(date) != ''){
			date = new Date(date);
		}else{
			date = new Date();
		}

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		month = month > 9 ? month : '0'+ month;
		day = day > 9 ? day : '0'+ day;
		hour = hour > 9 ? hour : '0'+ hour;
		minute = minute > 9 ? minute : '0'+ minute;
		second = second > 9 ? second : '0'+ second;

		format = type;
		format = format.replace('YYYY', year);
		format = format.replace('MM', month);
		format = format.replace('DD', day);
		format = format.replace('HH', hour);
		format = format.replace('mm', minute);
		format = format.replace('ss', second);

		common_log.log('mkt_common.js dateFormat() [loadServerTime:'+ loadServerTime +', date:'+ format +']');

		return format;
	},
	
	//컨텐츠 타입
    contsViewType: function(mode, target, areaData, conts){
        var html;
        if(conts.areaContsType == "01"){ //html
            html = $j(conts.htmlInfo);
            target.append(html);
        }else if(conts.areaContsType == "02"){ //이미지
            html = $j('<a href="#"><img src="#"/></a>');
			html.find('img').attr('alt', mKt_common.removeTag(conts.altText));
			html.find('img').attr('src', conts.saveImgPath + conts.saveImgNm);

			conts.statInfo = areaData.statInfo + conts.statInfo;			
			conts.omsBannerName = conts.statInfo;
			
            mKt_common.linkInfo(mode, 'img', html, conts, conts.floatTrgtType);

            target.append(html);
        }else if(conts.areaContsType == "03"){ //이미지맵-사용안함(모바일)
        }

        return html;
    },

	//링크정보
	linkInfo: function(mode, type, traget, item, linkType, linkPopW, linkPopH){
		var linkTarget = '', titleName = '';

        linkType = parseInt(linkType);
        if(linkType == '3'){ //팝업-사용안함(모바일)
			linkTarget = '_pop|'+ linkPopW +'|'+ linkPopH;
			// 240220 앱에서는 title=새창열림 제거 / 웹 취약점 조치 관련
			if(!appChk){
				traget.attr('title', '새창열림');
			}
        }else if(linkType == '2'){
			linkTarget = '_blank';
			// 240220 앱에서는 title=새창열림 제거 / 웹 취약점 조치 관련
			if(!appChk){
				traget.attr('title', '새창열림');
			}
        }else{			
            linkTarget = '_self';
        }
		
		if(mKt_common.isNull(item.menuCd) == '') item.menuCd = '';
        if(mKt_common.isNull(item.areaId) == '') item.areaId = '';
        if(mKt_common.isNull(item.omsBannerType) == '') item.omsBannerType = '';
        if(mKt_common.isNull(item.omsBannerName) == '') item.omsBannerName = '';

		if(mode == 'common'){ //공통
			titleName = 'mKT-개인_공통';

			if(type == 'click'){				
				traget.on('click', function(e){
					if(item.svcUrl == 'login'){ //로그인
						KT_trackClicks(titleName, item.statInfo);
						mkt.goLogin();
						return false;
					}else if(item.svcUrl == 'logout'){ //로그아웃
						KT_trackClicks(titleName, item.statInfo);
						mkt.goLogout();
						return false;
					}else if(item.svcUrl == 'stsfcSurvey'){ //만족도 조사
						KT_trackClicks(titleName, item.statInfo);
						mKt_common.standAlone();
                		return false;
					}else if(item.svcUrl == 'click'){
						KT_trackClicks(titleName, item.statInfo);
					}else{
						//탭바-2차
						if($j(this).hasClass('floating-tabbar-be') || $j(this).hasClass('floating-tabbar-my')){
							if(mKt_common.isNull($j(this).attr('stat')) == ''){ //탭바 이외에서 클릭시 탭바 클릭통계 제외함
								mKt_common.ktMenuLinkStat(item.svcUrl, item.statInfo, linkTarget, item.menuCd);								
							}

							//초기화
							$j(this).attr('stat', ''); 													
							return false;
						}

						//케이톡
						if($j(this).attr('id') == 'cfmSmartTalkLink'){ 
							var svcUrl = $j(this).find('.cfmSmartTalkLinkTxtP').attr('data-urlInfo');
							var statInfo = $j(this).find('.cfmSmartTalkLinkTxtP').attr('data-statInfo');
							item.svcUrl = 'https://ibot.kt.com/client/mobile-web/chat.html?messageSearch='+ encodeURIComponent(mKt_common.isNull(svcUrl));
							item.statInfo = '^mKT-개인_공통^챗봇^' + mKt_common.isNull(statInfo);
						}

						mKt_common.ktMenuLinkStat(item.svcUrl, item.statInfo, linkTarget, item.menuCd);
						if(item.svcUrl != '') return false;
					}
				});
			}else{
				if(((type == 'all' && item.rleval != '1') || type == 'gnb') && item.svcUrl == '#benefits'){
					//혜택탭바호출
                    traget.on('click', function(e){
                        if(!$j(top.document).find('main.benefits').hasClass('active')){ //혜택탭바 열린상태가 아닌경우만
                            //클릭통계
                            if(type == 'gnb' && item.rleval == '1'){
                                if(item.statInfo != undefined && item.statInfo.indexOf('GNB^상단고정^메뉴레이어^') < 0) {
                                    item.statInfo = item.statInfo.replace('GNB^', 'GNB^상단고정^메뉴레이어^'); //통계정보 변경
                                }
                            }
                            KT_trackClicks(titleName, item.statInfo);
							$j(top.document).find('.floating-tabbar-be').attr('stat',type);

                            //GNB(전체메뉴) 닫기
                            if($j('.nav-popup').hasClass('active')){
                                $j('.btn-total-close.js-btn-close').trigger('click');
                            }

                            //LNB(1뎁스메뉴) 닫기
                            if($j('.ui-menu-1depth').hasClass('active')){
                                $j('.ui-menu-1depth .js-btn-close').trigger('click');
                            }

                            //탭바 닫기
                            if($j(top.document).find('.floating-tabbar').hasClass('tothesub')){
                                $j(top.document).find('.floating-tabbar-close').trigger('click'); 
                            }

                            //혜택탭바 열기       
                            $j(top.document).find('.floating-tabbar-be').trigger('click'); 
                        }
                    }); 					 
				}else if(((type == 'all' && item.rleval != '1') || type == 'gnb') &&  item.svcUrl == '#mypage'){
					//마이탭바호출            
                    traget.on('click', function(e){
                        if(!$j(top.document).find('main.mypage').hasClass('active')){ //마이탭바 열린상태가 아닌경우만
                            //클릭통계
                            if(type == 'gnb' && item.rleval == '1'){
                                if(item.statInfo != undefined && item.statInfo.indexOf('GNB^상단고정^메뉴레이어^') < 0) {
                                    item.statInfo = item.statInfo.replace('GNB^', 'GNB^상단고정^메뉴레이어^'); //통계정보 변경
                                }
                            }
                            KT_trackClicks(titleName, item.statInfo);
							$j(top.document).find('.floating-tabbar-my').attr('stat',type);

                            //GNB(전체메뉴) 닫기
                            if($j('.nav-popup').hasClass('active')){
                                $j('.btn-total-close.js-btn-close').trigger('click');
                            }

                            //LNB(1뎁스메뉴) 닫기
                            if($j('.ui-menu-1depth').hasClass('active')){
                                $j('.ui-menu-1depth .js-btn-close').trigger('click');
                            }

                            //탭바 닫기
                            if($j(top.document).find('.floating-tabbar').hasClass('tothesub')){
                                $j(top.document).find('.floating-tabbar-close').trigger('click'); 
                            }

                            //마이탭바 열기
                            $j(top.document).find('.floating-tabbar-my').trigger('click'); 
                        }
                    });
				}else{
					if(type == 'gnb' && item.rleval == '1'){
						if(item.statInfo != undefined) item.statInfo = item.statInfo.replace('GNB^', 'GNB^상단고정^메뉴레이어^'); //통계정보 변경
					}else if(type == 'lnb' && item.rleval != '1'){
						if(item.statInfo != undefined) item.statInfo = item.statInfo.replace('GNB^', 'GNB^LNB^'); //통계정보 변경
					}else if(type == 'channel'){
						item.svcUrl = item.urlInfo;
					}
		
					traget.attr('href', 'javascript:mKt_common.ktMenuLinkStat(\''+ item.svcUrl +'\',\''+ item.statInfo +'\',\''+ linkTarget +'\',\''+ item.menuCd +'\');');
				}
			}
		}else if(mode == 'main'){ //메인
			titleName = 'mKT-개인_메인';

			if(type == 'click'){
				KT_trackClicks(titleName, '^mKT-개인_메인^'+ item.statInfo);				
			}else{
				traget.attr('href', 'javascript:mKt_common.ktLinkStat(\''+ item.urlInfo +'\',\''+ item.statInfo +'\',\''+ linkTarget +'\',\''+ item.menuCd +'\',\''+ item.areaId +'\',\''+ item.omsBannerType +'\',\''+ item.omsBannerName +'\');');
			}
		}
	},

	//만족도조사 정보
	standAloneInfo: function(){
		if(properties == 'prd'){ //상용
			sdeg_domain	= 'http://dt.kt.co.kr';
			sdegWidgetId = 'KT_MOBILE_MAIN_NEW'; //메인
			sdegKey = 'eb173add-28f4-464b-a9e2-7bb5431c77aa';

			if($j('#ktMainYn').length == 0 && mKt_common.isNull(ktMenuCd) != ''){
				if(ktMenuCd.substring(0,1) == 'G'){ //마이
					sdegWidgetId = 'KT_MY_PAGE_NEW';
					sdegKey = '9c27088c-16b7-4644-937a-10af620d4950';
				}else if(ktMenuCd.substring(0,1) == 'B'){ //상품
					sdegWidgetId = 'KT_PRODUCT_NEW';
					sdegKey = '20a41da2-ec18-44ea-bae0-1d08c8ac4cf3';
				}else if(ktMenuCd.substring(0,1) == 'C'){ //혜택
					sdegWidgetId = 'KT_MSHIP_BNFIT_NEW';
					sdegKey = '5a64ddae-a80c-4e77-ae0d-1c306e37c8c9';
				}else if(ktMenuCd.substring(0,1) == 'E'){ //고객지원
					sdegWidgetId = 'KT_CUST_SUPRT_NEW';
					sdegKey = '423af5ce-075a-4610-add7-5825c1637821';
				}
			}
		}else{ //기타
			sdeg_domain	= 'http://dev.dt.kt.co.kr';
			sdegWidgetId = 'KT_MOBILE_MAIN_NEW'; //메인
			sdegKey = 'd99e492e-42e9-4e92-a6cd-45b7c6e5d13e';

			if($j('#ktMainYn').length == 0 && mKt_common.isNull(ktMenuCd) != ''){
				if(ktMenuCd.substring(0,1) == 'G'){ //마이
					sdegWidgetId = 'KT_MY_PAGE_NEW';
					sdegKey = 'ef390078-1528-4e01-93cf-b0ba2663dad2';
				}else if(ktMenuCd.substring(0,1) == 'B'){ //상품
					sdegWidgetId = 'KT_PRODUCT_NEW';
					sdegKey = '5ccab8b1-e6ff-4c76-992b-3681f3c718aa';
				}else if(ktMenuCd.substring(0,1) == 'C'){ //혜택
					sdegWidgetId = 'KT_MSHIP_BNFIT_NEW';
					sdegKey = '693d2100-3360-49c6-ab77-cd76d9aaecd3';
				}else if(ktMenuCd.substring(0,1) == 'E'){ //고객지원
					sdegWidgetId = 'KT_CUST_SUPRT_NEW';
					sdegKey = '32da9696-53b7-4682-bce6-4439c0e130e3';
				}
			}
		}
	},

	//만족도조사 링크
	standAlone: function(){
		mKt_common.setArrayCookie('stsfcSurvey', sdegWidgetId, 30); //30일(고정)
		var url = sdeg_domain + '/web/widget/sdeg.html?k='+ sdegKey +'&w='+ sdegWidgetId;
		window.open(url,'_blank');
    },

	//페이지구분-2차(배포 DATA url 및 예외처리)
	pageType: function() {
		var str = 'cl';
		try {
			switch (chkMenu.substring(0, 1)) {
				case 'F' :
					str = 'shop';
					break;				
				default :
					str = 'cl';
					break;
			}
		} catch (error) {
			str = 'cl';
		}

		return str;
	},

	// ktAppDownStat / start
	/*
		ch : 각 입점사 채널명
		trackNm : 통계명
		pUrl : 이동할 url
		target : 타겟 명 (현재 _blank 만 처리, 앱에서만 동작 분기 변수), 사용은 안함
	*/ 
	ktAppDownStat : function(ch, trackNm, pUrl = null, target = null){
		
		var userAgent = navigator.userAgent.toUpperCase();
		var regIos = /IPHONE|IPOD|IPAD/;
		var regAnd = /ANDROID/;

		var isAndroid = regAnd.test(userAgent);
		var isIos = regIos.test(userAgent);
		var pUrlOri = pUrl;
		var chTrack = ch; // 통계용 ch 변수

		var iosUniversalLink = "https://m.my.kt.com/appLink/start/a_AppLink.do?";

		/*************************************************/
		// 공통변수
		/*************************************************/
		// 최초 접근 일시 기록
		var openAt = new Date();
		
		/*************************************************/
		// UA 분기 기준 설정
		/*************************************************/
		var marketIos = "http://itunes.apple.com/kr/app/id355838434?mt=8";
		var marketAndroid = "http://play.google.com/store/apps/details?id=com.ktshow.cs";

		// 온마시 채널 전용 치환 로직
		if ( ch.toLowerCase() == "onmas" )
		{
			trackNm = "^m^KT-개인_타겟오퍼" + trackNm + "앱에서보기^클릭";
			chTrack = "m^KT-개인_타겟오퍼";
		}
		
		// url이 없을 경우에는 url을 넘기지 않는다.
		if ( pUrl == "" || pUrl == null )
		{
			var iosApp = "showcsAppLink://start?ch=" + ch + "&trackNm=" + trackNm;
			var andApp = "ollehcs://start?ch=" + ch + "&trackNm=" + trackNm + "#Intent;scheme=ollehcs;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.ktshow.cs;end;";
			var iosUniversal =iosUniversalLink+"ch=" + ch + "&trackNm=" + trackNm;
		}
		else
		{
			pUrl = encodeURIComponent(pUrl, "UTF-8");

			var iosApp = "showcsAppLink://start?ch=" + ch + "&trackNm=" + trackNm + "&pUrl=" + pUrl;
			var andApp = "ollehcs://start?ch=" + ch + "&trackNm=" + trackNm + "&pUrl="+pUrl+"#Intent;scheme=ollehcs;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.ktshow.cs;end;";
			var iosUniversal =iosUniversalLink+"ch=" + ch + "&trackNm=" + trackNm + "&pUrl=" + pUrl;
		}

		/*************************************************/
		// 통계 설정
		/*************************************************/

		// 고객센터 앱일 경우 통계변경
		if(appChk){
			// 마이케이티앱 버전에 따라 통계코드가 다르게 보이도록 처리
			var myKtAppVersionOne = '';
			var myKtAppVersionTwo = '';
			var myKtAppCode = '';

			var userAgentArray = navigator.userAgent.split(';');

			for (var i = 0; i < userAgentArray.length ; i++)
			{
				var agentSplit = userAgentArray[i].split('=');

				if ( agentSplit[0].trim() == 'appver' )
				{
					var versionSplit = agentSplit[1].split('.');
					
					// Android 06.04.00 ~ 06.05.00 / iOS 6.4.7 ~ 6.4.8 일 경우 1번째, 2번째 값을 기준으로 버전표시 ex) 6.4 / 6.5 등등
					myKtAppVersionOne = parseInt(versionSplit[0], 10);

					if ( myKtAppVersionOne > 6 )
					{
						// 7버전 이상부터는 7.0 / 8.0 으로 되도록 뒤의 버전정보는 사용하지 않음
						myKtAppVersionTwo = 0;
					}
					else
					{
						myKtAppVersionTwo = parseInt(versionSplit[1], 10);
					}
				}
			}

			// 통계코드 만들어 줌
			myKtAppCode = '^APP^마이케이티' + myKtAppVersionOne + '.' + myKtAppVersionTwo + '^';

			trackNm = trackNm.replace('^mKT-개인^', myKtAppCode);
		}
		
		// code값은 고정 처리
		KT_trackClicks(chTrack, trackNm); //s_code.js

		/*************************************************/
		// 앱 실행 시도
		/*************************************************/
		if(appChk)
		{
			// 어플일 경우에는 그냥 location.href로 넘긴다.
			location.href = pUrlOri;
		}
		else
		{
			if(isAndroid) { // 안드로이드
				location.href = andApp;
			} else if(isIos) {  // iOS
				var match = navigator.userAgent.match(/OS (\d+)_/);
				var version = match ? parseInt(match[1],10):9;
				if(version >= 9){
					location.href = iosUniversal;
					return;
				}else{
						location.href=iosApp;
				}
			} else {    // 안드로이드나 iOS가 아닌 경우
				alert("안드로이드와 iOS를 지원하고 있습니다.");
			}  
		}
			
		/*************************************************/
		// 앱 설치 여부 확인 타임아웃 설정
		// 일정시간(1.5초) 동안 앱 실행되지 않으면 마켓으로 이동
		// 경과시간 2초 미만인 경우 앱 미실행으로 간주 => 마켓으로 이동
		// 경과시간 2초 이상인 경우 앱 실행후 종료된 것으로 간주
		/*************************************************/
		
		setTimeout( function() {
			if ((new Date() - openAt) < 2000) {
				if (isAndroid) {
					if(confirm("마이 케이티 앱 설치 후 이용하실 수 있습니다.\nApp 다운로드 마켓으로 이동하시겠습니까?")){
						location.href = marketAndroid;
					}
				} else if (isIos) {
					location.href = marketIos;
				}
			} 
		}, 1500);
	}
	// ktAppDownStat / end
}

var banner = {
	//간편조회배너
	simple: function(){
		if($j('.simple-banner').length){
			mKt_api.simpleBanner();
		}
	},

	//간편조회배너 callback
    callbackSimple: function(type, result){
		try {
			if(type === 'success') {
				if(mKt_common.isNull(result.data) !== '' && result.data.length > 0) {
					var resultList = result.data[0].areaSetList[0].areaContsList;
					if(mKt_common.isNull(resultList) !== '' && resultList.length > 0) {
						var resultData = resultList[0];
						var targetType = '_self';	// 기본값 : 본창
						var targetTitle = '';	// 기본값 : 
						if(resultData.trgtType === '02') {	// 새창
							targetType = '_blank';
							// 240220 앱에서는 title=새창열림 제거 / 웹 취약점 조치 관련
							if(!appChk){
								targetTitle = ' title="새창열림"';
							}
						}
	
						html = '<a href="' + resultData.urlInfo + '" target="' + targetType + '" '+ targetTitle +' ><img src="' + cl_domain + mKt_common.addLastSlash(resultData.saveImgPath) + mKt_common.isNull(resultData.saveImgNm) + '" alt="' + resultData.altText + '"></a>';
						$j('.simple-banner').html(html);
					}
				}
			}			
		} catch (e) {
			common_log.log('mkt_commons.js callbackSimple() [' + e.message + ']');
		}
	}
}