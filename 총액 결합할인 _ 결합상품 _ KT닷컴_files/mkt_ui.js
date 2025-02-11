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

	const mkt_toast_swiper = new Swiper('.toast-swiper', {
		  on : {
			init : function () {
			  //console.log('이벤트 swiper 초기화 될때 실행');
	
			  $j('.toast-swiper .swiper-pagination-bullet').each(function() {
				  var i; i = $j(this).index() + 1;
			  });
			},
			imagesReady : function () { // 모든 내부 이미지가 로드 된 직후 이벤트가 시작됩니다.
			  //console.log('이벤트 슬라이드 이미지 로드 후 실행');
				$j(".toast-swiper .swiper-slide").attr("aria-hidden","true");
				$j(".toast-swiper .swiper-slide.swiper-slide-visible").attr("aria-hidden","false");
				$j(".toast-swiper .swiper-pagination-bullet").eq(0).attr("title", "선택됨");//0328-3 
	
				$j(".toast-swiper .swiper-button-stop").click(function(){
					//console.log("stop");
					//KT_trackClicks('mKt-개인_메인', '^mKT-개인_메인^팝업^컨트롤버튼_Stop버튼');
					mkt_event_swiper.autoplay.stop();
					$j(".toast-swiper .swiper-button-play").removeClass("active").focus();
					$j(this).addClass("active");
				});
	
				$j(".toast-swiper .swiper-button-play").click(function(){
					//KT_trackClicks('mKt-개인_메인', '^mKT-개인_메인^팝업^컨트롤버튼_Play버튼');
					//console.log("play");
					mkt_event_swiper.autoplay.start();
					$j(".toast-swiper .swiper-button-stop").removeClass("active").focus();
					$j(this).addClass("active");
				});
			},
			paginationRender : function () { 
					$j(".toast-swiper .swiper-pagination-bullet").eq(0).attr("title", "선택됨");
			},
			activeIndexChange : function () {
				$j(".toast-swiper .swiper-slide").attr("aria-hidden","true");
				$j(".toast-swiper .swiper-slide.swiper-slide-visible").attr("aria-hidden","false");
				//console.log('이벤트 슬라이드 됨');
				$j(".toast-swiper .swiper-pagination-bullet").attr("title", "");
				$j(".toast-swiper .swiper-pagination-bullet").eq(this.realIndex).attr("title", "선택됨");//0327-2 
			},
		  },
	
			// Optional parameters
			slidesPerView : "auto",// 뷰당 슬라이드 갯슈
			speed: 400,
			spaceBetween : 0,//슬라이드 간 간격
			direction: 'horizontal',
			loopAdditionalSlides : 1, // 슬라이드 반복 시 빈 란 보이는 오류 수정
			loop: true,
			freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
			autoHeight : true, // 선택된 슬라이드의 높이로 길이 조정
			a11y : false, // 접근성
			resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
			slideToClickedSlide : true, // 슬라이드 클릭시 해당 슬라이드 위치로 이동
			centeredSlides : true, // 슬라이드 가운데 정렬
			allowTouchMove : true, // 터치 조작 여부
			watchOverflow : true, // 슬라이드가 1개 일 때 pager, button 숨김
			slidesOffsetBefore : 0, // 슬라이드 시작 부분 여백
			slidesOffsetAfter : 0, // 슬라이드 끝 부분 여백
	
			// autoplay
			autoplay : false,//0227
	
		  // If we need pagination
		  pagination: {
			el: '.toast-swiper .swiper-pagination',
			clickable : true,
			type : 'bullets', // or "bullets" | "fraction" | "progressbar" | "custom" //0227 bullets 타입으로 수정
			renderBullet : function (index, className) {
				return '<button class="' + className + '"><span>' + (index + 1) + '</span></button>'
			},
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span> / ' +  '<span class="' + totalClass + '"></span>';
			}
		  },
	
		  // Navigation arrows
		  navigation: {
			nextEl: '.toast-swiper .swiper-button-next',
			prevEl: '.toast-swiper .swiper-button-prev',
		  },
	
		  // And if we need scrollbar
		  scrollbar: {
			el: '.toast-swiper .swiper-scrollbar',
		  },
		  
		  observer:true,
		  observeParents:true
	
		  
	});

(function (context, $, undefined) {
	"use strict";

	var APP_NAME = context.APP_NAME = "dev",
		core = context[ APP_NAME ] || (context[ APP_NAME ] = {});

	core.$win = $j(context);
	core.$doc = $j(document);
	core.$html = $j(document.documentElement);
	core.$html.addClass("js");
    ("ontouchstart" in context) && core.$html.addClass("touch");
	("orientation" in context) && core.$html.addClass("mobile");
	
	/* browser */
	core.browser = (function(){
		var detect = {},
			win = context,
			na = win.navigator,
			ua = na.userAgent,
			lua = ua.toLowerCase(),
			match;
		
		detect.isMobile = typeof orientation !== "undefined";
		detect.isRetina = "devicePixelRatio" in window && window.devicePixelRatio > 1;
		detect.isAndroid = lua.indexOf("android") !== -1;
		detect.isOpera = win.opera && win.opera.buildNumber;
		detect.isWebKit = /WebKit/.test(ua);
		detect.isTouch = !!("ontouchstart" in window);

		match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ["",null,-1];
		detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null;		//(/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName);
		
		// 안드로이드, ios 구분하여 클래스 추가
		if (detect.isAndroid) {
			$j("html").addClass("ua-and");
		} else {
			$j("html").addClass("ua-ios");
		}

		return detect;
	})();
	
	/* observer */
	core.observer = {
		handlers: {},
		on: function(eventName, fn, context){
			var events = eventName.split(" ");
			for(var eIdx = 0; eIdx < events.length; eIdx++){
				var handlerArray = this.handlers[events[eIdx]];
				if(undefined === handlerArray){
					handlerArray = this.handlers[events[eIdx]] = [];
				}
				handlerArray.push({ fn: fn, context: context});
			}
        },
		off: function(eventName, fn, context){
			var handlerArray = this.handlers[eventName];
            if(undefined === handlerArray) return;
			
			for(var hIdx = 0; hIdx < handlerArray.length; hIdx++){
				var currentHandler = handlerArray[hIdx];
				if (fn === currentHandler["fn"] && context === currentHandler["context"]){
					handlerArray.splice(hIdx, 1);
				}
            }
		},
		notify: function(eventName, data){
			var handlerArray = this.handlers[eventName];
            if(undefined === handlerArray) return;

			for(var hIdx = 0; hIdx < handlerArray.length; hIdx++){
				var currentHandler = handlerArray[hIdx];
                currentHandler["fn"].call(currentHandler["context"], {type:eventName, data: data});
            }
		}
	};
	 
	 /* document event */
	core.event = (function(){
		var evt = {
			init: function(){
				var Event = {
					screen: "scroll resize orientationchange",
					wheel: "wheel"
				}
				core.$doc.ready(this.ready);
				core.$win.on('load', this.load);
				core.$win.on(Event.screen, this.screen);
				core.$win.on(Event.wheel, this.wheel);
			},
			ready: function(){
				core.$body = $j("body");
				core.observer.notify("READY");
				/* core.observer.notify("SCROLL", false);*/
				core.observer.notify("RESIZE", false); 
				core.$body.on('keydown', evt.keyup);
				evt.initUI();
			},
			load: function(){
				core.observer.notify("LOAD");
			},
			screen: function(e){
				var e = (e.type).toUpperCase();
				core.observer.notify(e);
			},
			wheel: function(e){
				var delta = (e.originalEvent.deltaY < 0) ? 100 : -100;
				if(delta > 0){
					core.observer.notify("WHEEL_UP", {dir:-1});
				}else{
					core.observer.notify("WHEEL_DOWN", {dir:1});
				}

				if(core.browser.isIE){
					e.preventDefault();
					var left = context.pageXOffset;
					var top = context.pageYOffset - delta;
					
					context.scrollTo(left, top);
				}
			},
			keyup: function(e){
				if(core.browser.isIE){
					e.preventDefault();
					var keyScroll = 100,
						pageScroll = 600,
						left = context.pageXOffset,
						top = context.pageYOffset;

					switch(e.which){
						case 33: 
							top -= pageScroll;
							break;
						case 34:
							top += pageScroll;
							break;
						case 38:
							top -= keyScroll;
							break;
						case 40:
							top += keyScroll;
							break;
					}

					context.scrollTo(left, top);
				}
			},
			initUI: function(){
				var ui = core.ui,
					ins = document.body._ui || {};
				
				for(var name in ui){
					if(ui[name].init && !ins[name]){
						ui[name].init();
						ins[name] = true;
					}
				}
			}
		}
		evt.init();
	})();

	/* screen : landscape */
	core.screen = (function(){
		var me = {
			data : {
				width : context.innerWidth,
				height : context.innerHeight,
				scrollTop : core.$win.scrollTop()
			},
			init: function(){
				if(context.orientation > 0){
					core.$html.addClass("landscape");
				}else{
					core.$html.removeClass("landscape");
				}
				core.observer.on("READY LOAD RESIZE", $j.proxy(this.detect.all, this.detect));
				core.observer.on("SCROLL", this.detect.scroll);
				core.observer.on("ORIENTATIONCHANGE", this.detect.orientation);
			},
			detect: {
				all: function(){
					this.size();
					this.scroll();
				},
				size: function(){
					me.data.width = context.innerWidth;
					me.data.height = context.innerHeight;
				},
				scroll: function(){
					me.data.scrollTop = core.$win.scrollTop();
				},
				orientation: function(){
					if(context.orientation > 0){
						core.$html.addClass("landscape");
					}else{
						core.$html.removeClass("landscape");
					}
				}
			},
		}
		me.init();
		return me.data;
	})();

	/* scroll */
	core.scroll = (function(){
		var me = {
			originTop : core.screen.scrollTop,
			init: function(){
				core.observer.on("SCROLL", this._scroll);
			},
			_scroll: function(){
				core.screen.scrollTop = core.$win.scrollTop();
				core.screen.scrollMax = me.calc.MaxScroll();
				core.screen.scrollPer = me.calc.Percent();
				
				if(core.screen.scrollTop < me.originTop) core.observer.notify("SCROLL_UP");
				if(core.screen.scrollTop > me.originTop) core.observer.notify("SCROLL_DOWN");
				
				if(core.screen.scrollTop < 1) core.observer.notify("SCROLL_FIRST");
				if(core.screen.scrollTop > core.screen.scrollMax-1) core.observer.notify("SCROLL_LAST");
				
				me.originTop = core.screen.scrollTop;
			},
			calc : {
				MaxScroll: function(){
					return document.documentElement.scrollHeight - core.screen.height;
				},
				Percent: function(){
					return parseInt(core.screen.scrollTop/core.screen.scrollMax * 100);
				},
				Direction: function(dir){
					switch(dir){
						case "first" : return 0;
						case "last" : return me.calc.MaxScroll();
						default : return dir;
					}
				},
				Duration: function(dur){
					return dur !== undefined ? dur : 700;
				}
			},
			public: {
				enable: function(){
					core.$body.css("overflow", "");
				},
				disable: function(){
					core.$body.css("overflow","hidden");
				},
				to: function(direction, duration, fn){
					if(me.isScroll) return;
					me.isScroll = true;
					
					var arg = arguments,
						argLast = arg[arg.length-1],
						dir = me.calc.Direction(direction),
						dur = me.calc.Duration(duration);
					
					if(core.screen.scrollTop == dir) return me.isScroll = false;
					
					$j("html, body").stop().animate({
						"scrollTop" : dir
					}, dur, function(){
						if(this.tagName == 'BODY'){
							me.isScroll = false;
							if(argLast.constructor === Function){
								argLast();
							}
						}
					});
				},
				toElem: function(el, dur){
					var $el = $j(el),
						pos = $el.offset().top;

					this.to(pos, dur);
				},
			}
		}
		me.init();
		return me.public;
    })();

	/* UI */
    core.ui = function(name, container, option){
		if(!core.ui[name]) throw new Error("not ui "+name);
		var $container = $j(container).filter(function(){
				return this.parentElement.nodeName !== "PRE";
			}),
			length = 0,
			supr = [];

		$container.each(function(){
			this._ui = this._ui || {};

			var	hasUI = this._ui[name];
			if(hasUI){
				supr.push(hasUI);
			}else{
				var UI = new core.ui[name](this, option);
				UI.events._init();
				this._ui[name] = UI.events.public || "undefined public";
				supr.push(this._ui[name]);
			}
			++length;
		});

		if(length == 1) supr = supr[0];
		return supr;
    }
    
	/* Selector */
    core.Selector = function(container, selector){
		function modeling(){
			for(var i in selector){
				selectors[i] = selectors.container.find(selector[i]);
			}
		}
		var selectors = { container : $j(container) };
		modeling();
		
		selectors._dataSet = selectors.container.data();
		selectors.reInit = function(){
			modeling();
		}
		return selectors;
	}

	/* parallax-item */
    core.ui.PARALLAX_SCROLL = function(){
        var $container = $j(arguments[0]),
            $item = $container.find('.parallax-item');

        var options = {
            enter: 0,	//bottom start Element Position 
            leave: 100,	//top end Element Position
        }

        var data = $j.extend(options, $item.data('parallax'));
		
		this.events = {
			_init: function(){
				core.observer.on("SCROLL", this._detectPosition);
            },
			_detectPosition: function(){
                var itemHeight = $container[0].clientHeight,
                    enterPos = itemHeight * Number(data.enter) / 100,
                    leavePos = itemHeight * Number(data.leave) / 100,
                    screenHeight = core.screen.height - enterPos + leavePos,
                    top = $container[0].getBoundingClientRect().top + enterPos,
                    gap = core.screen.height - top,
                    per = gap / screenHeight;
				
				var parallaxStyle = {};
				for(var value in data.to){
					var dist = data.from[value] - data.to[value],
						distCalc = dist * per;
					parallaxStyle[value] = (data.from[value] - distCalc)+'%';
				}

                if(per < 0){
                    gsap.set($item, {css: data.from});
                }else if(per > 1){
                    gsap.set($item, {css: data.to});
                }else{
                    gsap.set($item, {css: parallaxStyle});
                }
            },
		}
	}
    
})(this, jQuery);

var core = window[APP_NAME],
	ui = core.ui;

/* 
	tree : 열기/닫기 menu

    @sync
    <ul data-tree='{"sync": Boolean@ false}'>
     
    @preview
    <ul class="sub preview" data-tree='{"height": 50}'> 

	<div class="js-tree">
		<div class="js-tree-group">
			<div class="js-tree-top">
				
				<button type="button" class="js-tree-btn-toggle"></button>
			</div>
			<div class="js-tree-sub">

			</div>
		</div>
	</div>
*/
ui.TREE = {
	duration: 400,
	sync: false,
	init: function(){
		$j('.js-tree .js-tree-btn-toggle').attr('title', '열기');
		this.bindEvent();
		this.set();
	},
	bindEvent: function(){
		core.$body.on('click', '.js-tree .js-tree-btn-toggle', this.toggleSub);
	},
	set: function(){
		this.activeSub();
		this.setPreview();
	},
	activeSub: function(){
		$j('.js-tree').find('.js-tree-group.active').children('.js-tree-sub').show();
	},
	setPreview: function(){
		$j('.js-tree').find('.js-tree-sub.preview').each(function(){
			var $me = $j(this),
				height = $me.data($me.data('tree'));

			$me.css({'height': height});
		});
	},
	toggleSub: function(e, syncTrigger){
		var $btn = $j(this),
			$group = $btn.closest('.js-tree-top').parent(),
			$groupUl = $group.parent(),
			$sub = $group.children('.js-tree-sub'),
			isActive = $group.hasClass('active'),
			isPreview = $sub.data('height'),
			duration = $btn.data('duration') || ui.TREE.duration,
			sync = $groupUl.data('sync');

		var subInfo = {
			$group: $group,
			$target: $sub,
			duration: duration,
			preview: isPreview,
			sync: sync
		}

		if(isActive || syncTrigger){
			ui.TREE.closeSub(subInfo);
		}else{
			ui.TREE.openSub(subInfo);
		}
	},
	openSub: function(obj){
		//obj.$group.closest('.js-tree').find('.js-tree-group').removeClass('active').find('.js-tree-btn-toggle').attr('title', '열기');
		//obj.$group.closest('.js-tree').find('.js-tree-sub').slideUp();
		obj.$group.addClass('active');
		obj.$group.find('.js-tree-btn-toggle').first().attr('title', '닫기');//0102 웹접근성 수정

		if(obj.preview){
			var $clone = obj.$target.clone().css({'height':'auto','display':'none !important'});
			obj.$target.after($clone);
			var originHeight = $clone.outerHeight(true);
			$clone.remove();

			obj.$target.animate({
				height: originHeight
			}, obj.duration);
		}else{
			obj.$target.slideDown(obj.duration);
		}

		if(obj.sync){
			var $siblingsGroup = obj.$group.siblings();
			$siblingsGroup.children('.js-tree-top').find('.js-tree-btn-toggle').trigger('click', true);
		}
	},
	closeSub: function(obj){
		obj.$group.removeClass('active');
		obj.$group.find('.js-tree-btn-toggle').attr('title', '열기');

		if(obj.preview){
			obj.$target.animate({
				height: obj.preview
			}, obj.duration);
		}else{
			obj.$target.slideUp(obj.duration);
		}
	}
}

/*
	팝업 
	팝업 링크는 <button class="js-popup-call" data-target="#datatargetid"></button> 형식
	팝업 레이어는 <div class="js-popup" id="datatargetid" aria-hidden="true"><* tabindex="0" class="js-focuslink"><button type="button" class="js-btn-close"></button></div> 형식. 링크의 data-target값과 레이어의 id값이 링크됨.
*/
ui.POPUP = {
	type: 'layer',
	maxHeight: '90%',
	activeClass: 'active',
	disabledClass: 'disabled',
	disabled: false,
	scrollTop: null,
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var $body = $j('body');
		$body.on('click', '.js-popup-call, [data-popup-target]', this.detectTarget);
		$body.on('click', '.js-popup .js-btn-close, [data-popup-close]', this.closePopup);
		
		$body.on('POPUP_OPEN', '.js-popup', this.openTrigger);
		$body.on('POPUP_CLOSE', '.js-popup', this.closeTrigger);
	},
	detectTarget: function(){
		var $me = $j(this);
		if($me.hasClass(ui.POPUP.disabledClass)) return;
		
		var data = $me.data(),
			$target = (data.document) ? $j(data.target, parent.document) : $j(data.target),
			popupInfo = data.popup || {type: 'layer'};		
			
			//0729 : 열고 닫기 기능 추가 
            if ($target.hasClass(ui.POPUP.activeClass)) {
                $target.trigger('POPUP_CLOSE');
                return;
			}
			
		ui.POPUP.detectPopup($target, popupInfo);
	},
	openTrigger: function(e, fn){
		ui.POPUP.detectImage($j(this));
	},
	closeTrigger: function(){
		$j(this).find('.js-btn-close').trigger('click');
	},
	detectPopup: function($target, popup){
		switch(popup.type){
			case 'layer' :
				ui.POPUP.detectImage($target);
			break;
			case 'link' :
				$target.load(popup.url, $j.proxy(function(){
					ui.POPUP.detectImage($target);
				},this));
			break;
			case 'iframe' :
				ui.POPUP.detectImage($target);
			break;
			case 'window' :
				var left = (core.screen.width - popup.width) / 2 + window.screenX,
					top = (core.screen.height - popup.height) / 2 + window.screenY,
					option = "width=" + popup.width + ", height=" + popup.height + ", top=" + top + ", left=" + left + ", scrollbars=yes, toolbar=no, resizable=yes",
					newWin = window.open(popup.url, '', option);
				if(window.focus) newWin.focus();
			break;
		}
	},
	detectImage: function($target){
		var $img = $target.find('img');

		if($img.length > 0){
			var complete = 0;

			$img.each(function(){
				var img = new Image();
				img.onload = function(){
					complete++;
					if($img.length == complete){
						ui.POPUP.openPopup($target);
					}
				}
				img.onerror = function(){
					complete++;
					if($img.length == complete){
						ui.POPUP.openPopup($target);
					}
				}
				img.src = this.src;
			});
		}else{
			ui.POPUP.openPopup($target);
		}
	},
	openPopup: function( $popup ){
		$popup.addClass('active').attr('aria-hidden', 'false')
		.trigger('COMPLETE_POPUP_OPEN');
		
		setTimeout(function(){
			$popup.find(".js-focuslink").focus();
		}, 500);
		
		ui.POPUP.scrollDisable($popup);
	},
	closePopup: function(){
		var isIframe = false,
			$popup = isIframe ? $j('.js-popup', parent.document) : $j('.js-popup'),
			$parentPopup = isIframe ? $j(window.frameElement).closest($popup) : $j(this).closest($popup);

		$parentPopup.removeClass('active').attr('aria-hidden', 'true')
		.trigger('COMPLETE_POPUP_CLOSE');

		$parentPopup.children('.content').css('height', 'auto');

		if($popup.filter('.active').length < 1){
			ui.POPUP.scrollEnable(isIframe); 
		}
		
		setTimeout(function(){
			$j("[data-target='#" + $parentPopup.attr("id") + "']").focus();
		}, 500);
	},
	scrollDisable: function($popup){
		ui.POPUP.scrollTop = window.pageYOffset;
		core.$body.css({
			overflow: 'hidden',
			position: 'fixed',
			top: -ui.POPUP.scrollTop+'px',
			width: '100%'
		}).attr('data-scroll', ui.POPUP.scrollTop);
	},
	scrollEnable: function(iframe){
		var win = iframe ? parent : window,
			$body = iframe ? $j('body', parent.document) : $j('body'),
			scrollTop = iframe ? $body.attr('data-scroll') : ui.POPUP.scrollTop;

		$body.css({
			overflow: 'visible',
			position: 'static',
			top: 0,
			width: 'auto'
		});

		win.scrollTo(0, scrollTop);
	},
	detectHeight: function($target){
		if(!ui.POPUP.maxHeight) return;

		var $content = $target.children('.content'),
			$header = $content.children('.header'),
			$body = $content.children('.body'),
			isOverScreen = $content.outerHeight(true) > window.innerHeight;

		if(isOverScreen){
			$content.css('height', ui.POPUP.maxHeight);
		}else{
			$content.css('height', 'auto');
		}
	},
	open: function(obj){
		var type = obj.type,
			$target = $j(obj.target);
		
		ui.POPUP.detectPopup($target, obj);
	}
}

/*
	select : 다중선택시 ui-select 에 multi 추가, 최대 선택 개수 설정시 data-limit="" 추가

	<div class="js-select">
		<button type="button" data-placeholder="선택해주세요.">선택해주세요</button>
		<div role="listbox">
			<button type="button" role="option">선택1</button>
			<button type="button" role="option">선택2</button>
			<button type="button" role="option">선택3</button>
		</div>
	</div>
*/
ui.SELECT = {
	el: '.js-select',
	activeClass: 'active',
	disabledClass: 'disabled',
	init: function(){
		$j('.js-select > button').attr('title', '열기');
		this.bindEvent();
		this.set();
	},
	bindEvent: function(){
		core.$body.on("click", this.el+' >button', this.enterSelect);
		core.$body.on("click", this.el+' >input', this.enterSelect);
		core.$body.on("click", this.el+':not(".multi") >div >button', this.clickOption);
		core.$body.on("click", this.el+'.multi >div >button.all', this.clickMultiAllOption);
		core.$body.on("click", this.el+'.multi >div >button:not(".all")', this.clickMultiOption);
		core.$doc.on("click", this.leaveSelect);

		core.$body.on("SELECT", this.el, this.triggerSelect);
	},
	set: function(){
		$j(ui.SELECT.el).each(function(){
			var $el = $j(this),
				index = $el.data('select');
				
			if(index){
				$el.trigger('SELECT', index);
			}
		});
	},
	triggerSelect: function(){
		var selectIndex = [].slice.call(arguments, 1),
			$items = $j(this).find('>div >button');

		for(var i in selectIndex){
			var index = selectIndex[i]
			$items.eq(index).trigger('click');
		}
	},
	leaveSelect: function(e){
		var $select = $j(ui.SELECT.el);

		if(!$j(e.target).closest($select).length){
			$select.removeClass(ui.SELECT.activeClass);
		}
	},
	enterSelect: function(){
		var $select = $j(this).closest(ui.SELECT.el),
			$selectSiblings = $j(ui.SELECT.el).not($select);

		$selectSiblings.removeClass(ui.SELECT.activeClass).find('>button').attr('title', '열기');
		if($select.hasClass(ui.SELECT.disabledClass)) return;

		//$select.toggleClass(ui.SELECT.activeClass); 
		if($select.hasClass(ui.SELECT.activeClass)){ 
			$select.removeClass(ui.SELECT.activeClass).find('>button').attr('title', '열기');
		}else{
			$select.addClass(ui.SELECT.activeClass).find('>button').attr('title', '닫기');
		}
		ui.SELECT.setPosition($select);
	},
	clickOption: function(){
		var $item = $j(this),
			$select = $item.closest(ui.SELECT.el),
			$btn = $select.children('button'),
			value = this.innerHTML;

		if($item.hasClass(ui.SELECT.disabledClass)) return;

		ui.SELECT.setActiveItem($item);
		ui.SELECT.setValue($btn, value);
		ui.SELECT.hideSelect($select);
	},
	clickMultiAllOption: function(){
		var $item = $j(this),
			$items = $item.siblings(),
			$select = $item.closest(ui.SELECT.el),
			$btn = $select.children('button'),
			isActive = $item.hasClass(ui.SELECT.activeClass),
			limit = $select.data('limit') || $items.length;

		$item.toggleClass(ui.SELECT.activeClass);

		if(isActive) $items.removeClass(ui.SELECT.activeClass);
		else $items.addClass(ui.SELECT.activeClass);

		ui.SELECT.detectActiveItem($items, $btn)
	},
	clickMultiOption: function(){
		var $item = $j(this),
			$items = $item.add($item.siblings()),
			$select = $item.closest(ui.SELECT.el),
			$btn = $select.children('button'),
			limit = $select.data('limit') || $items.length,
			isLimit = $items.filter('.active').length >= limit,
			isSelected = $item.hasClass(ui.SELECT.activeClass);
		
		if($item.hasClass(ui.SELECT.disabledClass)) return;
		if(!isSelected && isLimit) return alert('최대'+ limit+ '개 선택 가능합니다.')

		ui.SELECT.setActiveMultiItem($item, $items);
		ui.SELECT.detectActiveItem($items, $btn);
	},
	setActiveItem: function($item){
		$item.addClass(ui.SELECT.activeClass);
		$item.siblings().removeClass(ui.SELECT.activeClass);
	},
	setActiveMultiItem: function($item, $items){
		var $itemFilterAll = $items.filter('.all'),
			$itemsNotAll = $items.not($itemFilterAll);

		$item.toggleClass(ui.SELECT.activeClass);

		var isActive = $item.hasClass(ui.SELECT.activeClass),
			isAllActive = $itemsNotAll.filter('.'+ui.SELECT.activeClass).length == $itemsNotAll.length;

		if(!isActive){ //선택해제될 경우
			$itemFilterAll.removeClass(ui.SELECT.activeClass)
		}
		if(isAllActive){ //모두선택됐을 경우
			$itemFilterAll.addClass(ui.SELECT.activeClass)
		}
	},
	setValue: function($btn, value){
		$btn.html(value);
	},
	detectActiveItem: function($items, $btn){
		var max = $items.length,
			value = [];

		$items.filter('.active').each(function(){
			value.push(this.innerHTML)
		});

		var allSelect = (max == value.length),
			noneSelect = value.length < 1;

		if(allSelect) value = ['모두선택'];
		if(noneSelect) value = [$btn.data('placeholder')];
		
		ui.SELECT.setValue($btn, value.join(', '));
	},
	setPosition: function($select){
		var $options = $select.children('div'),
			selectHeight = $select.outerHeight(true),
			offTop = $select.get(0).getBoundingClientRect().top,
			totalHeight = selectHeight + $options.outerHeight(true),
			viewport = offTop + totalHeight >= innerHeight ? false : true;

		if(!viewport){
			$options.addClass("above");
		}else{
			$options.removeClass("above");
		}
	},
	showSelect: function($select){
		$select.addClass(ui.SELECT.activeClass).find('>button').attr('title', '닫기');
	},
	hideSelect: function($select){
		$select.removeClass(ui.SELECT.activeClass).find('>button').attr('title', '열기');
	},
}

/* 하단 탭바 */
ui.ASIDE = function(el){
	// 플로팅기능 이용시 필요한 변수 지정
	var deviceWidth = $j("body").width();
	deviceWidth160 = (160/750)*deviceWidth;
	deviceWidth240 = (240/750)*deviceWidth;
	
	var $el = $j(el),
		$drag = $el.find('.floating-tabbar-drag'),
		$dragopen = $el.find('.btn-tabbar-open'),
		$dragclose = $el.find('.btn-tabbar-close'),//2차 추가
		min = deviceWidth160,
		max = deviceWidth240,
		$benefits = $j('.benefits.tabbar-layer'),
		$mypage = $j('.mypage.tabbar-layer'),
		$aside = $j('aside.floating-tabbar'),
		touch = {};

	this.events = {
		_init: function(){
			var $main = $j('main');

			$j('.mypage a').on('click',function(){
			});

			// 2차 기능 버튼
			$dragopen.on('click', function(e) {
				tabbarAct('open');
			});
			$dragclose.on('click', function(e) {
				tabbarAct('close');
			});
			tabbarAct = function(state) {
				var $tabbar = $j('.floating-tabbar');

				if(state === undefined) return false;

				if(state === 'open') {
					($j('.floating-tabbar-dim').length > 0) ? '': $j('<div class="floating-tabbar-dim"/>').insertAfter($tabbar);
					$tabbar.addClass('active');
					$j('.floating-tabbar-dim').fadeIn();
					$j('.floating-tabbar-open').attr('aria-hidden','false');//0903
					$j('.btn-tabbar-open').attr('aria-hidden','true');//2021 추가기능목록열기 버튼 접근섬초점감춤
					setTimeout(function() {//0903
						$dragclose.focus();
					},500);
				} else if(state == 'close') {
					$tabbar.removeClass('active');
					$j('.floating-tabbar-dim').fadeOut();
					$j('.floating-tabbar-open').attr('aria-hidden','true');//0903
					$j('.btn-tabbar-open').attr('aria-hidden','false');//2021 추가기능목록열기 버튼 접근섬초점노출
					setTimeout(function() {//0903
						$dragopen.focus();
					},500);
				}
			}

			//0608 탭바 홈 버튼 좌우 드래그
			/* 2차에서 삭제 
			$dragopen.on('touchstart', function(e){
				var $me = $j(this),
					touch = {
						startX: e.touches[0].screenX,
						asideRect: $aside[0].getBoundingClientRect()
					};
				core.$body.off('touchmove.tabbar touchend.tabbar')
				.on('touchmove.tabbar', function(e){
					var rect = $me[0].getBoundingClientRect();
					if(rect.left < touch.asideRect.left || rect.right > touch.asideRect.right){
						core.$body.trigger('touchend.tabbar');
						return false;
					}
					touch.diffX = e.touches[0].screenX - touch.startX;
					touch.order = touch.diffX > 0 ? 1 : touch.diffX < 0 ? 0 : false;
					gsap.set($me, {x: touch.diffX});
				})
				.on('touchend.tabbar', function(e){
					core.$body.off('touchmove.tabbar touchend.tabbar');
			
					switch(touch.order){
						case 0 : 
							touch.remainder = touch.asideRect.left - $me[0].getBoundingClientRect().left;
						break;
						case 1 :
							touch.remainder = touch.asideRect.right - $me[0].getBoundingClientRect().right;
						break;
					}
			
					$drag.eq(touch.order).trigger('click');
					gsap.to($me, 0.5, {x:'+='+touch.remainder})
					gsap.set($me, {delay:0.5, x: 0});
				})

				//아이프레임 길이 조정
				var vh = window.innerHeight;				
				$j('main.benefits iframe, main.mypage iframe').css("height", `${vh}px`);
			});
			*/

			// 좌우 버튼 드래그하는 경우
			/*
			$drag.on('touchstart', function(e){
				var $me = $j(this),
					$span = $me.find('span'),
					isRight = $me.hasClass('floating-tabbar-be');

				if(isRight && $benefits.hasClass('active')){
					core.$body.off('touchmove touchend');
					return false;
				}
				if(!isRight && $mypage.hasClass('active')){
					core.$body.off('touchmove touchend');
					return false;
				}

				//touch.startX = e.screenX;

			   touch.startX = event.touches[0].clientX;
			   touch.startY = event.touches[0].clientY;

				var $layer = isRight ? $benefits : $mypage;
				core.$body.off('touchmove touchend').addClass('active');

				core.$body.on('touchmove', function(e){
					e.screenX = event.changedTouches[0].clientX;

					touch.diffX = isRight ? touch.startX - e.screenX : e.screenX - touch.startX;
					touch.per = touch.diffX / (max - min);
					touch.per100 = touch.per * 100;
					touch.width = min + touch.diffX;
					touch.left = isRight ? 100 - touch.per100 : touch.per100 - 100;
					
					if(touch.per > 1) return;

					//$span.css('opacity', touch.per);
					//$me.css('width', touch.width);

					$layer.css('left', touch.left+'%');
				})

				core.$body.on('touchend', function(){
					core.$body.off('touchmove touchend');
					if(touch.per > 0.3){
						var dur = 0.5;
						gsap.to($layer, dur, {left: 0+'%', 
							onComplete: function(){

								var $active = $main.filter('.active');
								$active.removeClass('active').attr('aria-hidden', 'true');

								if($active.hasClass('cfmClmain')){
									$active.hide();
								}else{
									$active.addClass('tabbar-layer').removeAttr('style').attr('aria-hidden', 'true');
								}

								core.scroll.to(0, 0);
								$layer.removeClass('tabbar-layer').addClass('active').attr('aria-hidden', 'false');								
								$el.removeClass('active').attr('aria-hidden', 'true');
								$aside.attr('aria-hidden','false').addClass('tothesub');

								//히스토리 변경
								var pagename = $layer.attr("class").split(" ")[0];
								history.pushState({}, '', '#' + pagename);

							}
						})

						//gsap.to($me, dur, {width: max})
						gsap.to($span, dur, {opacity: 1});

						var $other = isRight ? $drag.first() : $drag.last();

						//gsap.to($other, dur, {width: min})
							//0514 gsap.to($other.find('span'), dur, {opacity: 0})

					}else{
						//gsap.to($me, .3, {width: min})
						//0514 gsap.to($span, .3, {opacity: 0});

						var pos_left = isRight ? 100 : -100;
						gsap.to($layer, .3, {left: pos_left+'%'})
					}
				})
			});
			*/

			// 클릭하는 경우
			$drag.on('click', function(e){
				// 2차 추가
				tabbarAct('close');

				var $me = $j(this),
					$span = $me.find('span'),
					isRight = $me.hasClass('floating-tabbar-be');

				if(isRight && $benefits.hasClass('active')){
					return false;
				}
				if(!isRight && $mypage.hasClass('active')){
					return false;
				}

				var $layer = isRight ? $benefits : $mypage;
				core.$body.addClass('active');

				//탭바 비노출인 경우
				if($aside.data('show') == 'N'){
					$aside.attr('aria-hidden','false').addClass('tothesub');
					$aside.show();
				}

				var dur = 0.5;
				gsap.to($layer, dur, {left: 0+'%', 
					onComplete: function(){

						var $active = $main.filter('.active');
						$active.removeClass('active').attr('aria-hidden', 'true');

						if($active.hasClass('cfmClmain')){
							//$active.hide(); //07.05 display:none 기능 삭제 bxSlider 로딩 이슈
						}else{
							$active.addClass('tabbar-layer').removeAttr('style').attr('aria-hidden', 'true');
						}

						core.scroll.to(0, 0);
						$layer.removeClass('tabbar-layer').addClass('active').attr('aria-hidden', 'false');								
						$el.removeClass('active').attr('aria-hidden', 'true');
						$aside.attr('aria-hidden','false').addClass('tothesub');

						//0715 웹접근성 포커스 이동 수정
						setTimeout(function(){
							$j('.floating-tabbar-open').attr('aria-hidden','false');//0928 vos 1093931
							$aside.find(".floating-tabbar-close").focus();
						}, 500);

						//히스토리 변경
						var renewURL = location.href;
						var regEx = new RegExp('(\\?|\\&)tab=(benefits|mypage)|\\#(benefits|mypage)', 'gi');
		    			renewURL = renewURL.replace(regEx, '');

						var pagename = $layer.attr("class").split(" ")[0];
						renewURL = renewURL + '#' + pagename
						history.pushState({}, '', renewURL);

						// 2차 추가
						$aside.addClass(pagename);

						//0928 닫기버튼 대체컨텐츠
						$j('.floating-tabbar-close > span.hidetxt').text($span.text() + '레이어 닫기');
					}
				})

				//gsap.to($me, dur, {width: max})
				gsap.to($span, dur, {opacity: 1});

				var $other = isRight ? $drag.first() : $drag.last();

				gsap.to($other, dur, {width: min})
				//0514 gsap.to($other.find('span'), dur, {opacity: 0})

				// 2차 추가
				$aside.removeClass('benefits');
				$aside.removeClass('mypage');

				//$layer.find(".focuslink").focus();//각 레이어의 첫번째 요소에 포커싱. 레이어 문서 구조가 변경되는 경우 첫번째 요소에 tabindex, 클래스 부여

				//아이프레임 길이 조정
				var vh = window.innerHeight;
				$j('main.benefits iframe, main.mypage iframe').css("height", `${vh}px`);
			});

			var timer;
			core.observer.on('SCROLL_DOWN', function(){
				$el.addClass('hide');
				timer = setTimeout(function(){
					$el.removeClass('hide');
				}, 3000) //0607 수치 수정 - 탭바 나타날 때 떨림 현상 
				
			})

			core.observer.on('SCROLL_UP', function(){
				$el.removeClass('hide');
			})
		}
	}
}

core.observer.on('READY', function(){
	ui('ASIDE', '.floating-tabbar');
})

core.observer.on('LOAD', function(){
	AOS.init({
		once: true
	})
})


var cfmUi = {};
cfmUi.COMMON = function(){}

// 슬라이딩 배너
cfmUi.COMMON.clickBanner = function(){
    $j('#mCfmClWrapper').addClass('topclickbannerNext');
    setTimeout (function(){
	$j('.click-banner.top').addClass('active');
    },200);

    //닫기
    var h1 = 0;
	$j(document).on('click', '.click-banner.top .close-btn', function (e) {
		$j('.click-banner.top').removeClass('active').attr("aria-hidden","true");//0328
		setTimeout(function(){
			$j("a.href_main").focus();
		}, 600);
	});
}

// 전체메뉴
cfmUi.COMMON.navAll = function(){
	// 전체메뉴 열고 닫을 때
	$j('.nav-call.js-popup-call').on('click', function (e){
		// 0609 전체메뉴 최소길이 
		var navLiLength2 = $j(".mCfmClNavTabCon .depth02").children("li:visible").length;
		var navLiLength3 = $j(".mCfmClNavTabCon .depth02 li.active ul.depth03").children("li").length;
		var navLiLength4 = $j(".mCfmClNavTabCon .depth03 li.active ul.depth04").children("li").length;
		var categoryHeight = (navLiLength2 + navLiLength3 + navLiLength4) * 43;
		$j(".mCfmClNavTabCon").height(categoryHeight);

		cfmLayers('allmenu', 'on');
        e.preventDefault();

		$j('.btn-total-close.js-btn-close').on('click', function (e) {
			cfmLayers('allmenu', 'off');	
			$j('.nav-call.js-popup-call').focus(); //0707 웹접근성 - 전체 메뉴 버튼으로 포커스 이동		
			$j("#mCfmClFooter").show();
		});

		$j(".list-channel").find("a:first").focus(); //0707 웹접근성 - 첫번째 링크로 포커스 이동
		$j("#mCfmClFooter").hide();
    });

	// 1뎁스 클릭 - 2뎁스 펼치기/접기
	$j('.category-btn').on('click', function(e){
		e.preventDefault();

		//클릭통계
		var data = $j(this).data();
		if(data.statInfo != undefined){			
			KT_trackClicks('mKT-개인_공통', data.statInfo);
		}else{ //추천메뉴/최근본메뉴
			KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^GNB^'+ $j(this).text());
		}

		$j('.category.mCfmClNavTabCon > li').removeClass('active').find('.category-btn').attr('title', '');
		$j('.category-depth').find('.depth02 > li').removeClass('active').find('.is-depth3').attr('title', '펼치기');
		$j('.category-depth').find('.depth03 > li').removeClass('active').find('.is-depth4').attr('title', '펼치기');
		$j(this).attr('title', '선택됨').parent().addClass('active');

		var thsHeight = $j(this).next('.category-depth').height();
		$j('.category.mCfmClNavTabCon').height(thsHeight);
	});

	// 2뎁스 클릭 - 3뎁스 펼치기/접기
	$j('.is-depth3').on('click', function(e){
		e.preventDefault();

		//클릭통계
		var data = $j(this).data();
		KT_trackClicks('mKT-개인_공통', data.statInfo +'^'+ $j(this).attr('title'));
		
		if($j(this).parent().hasClass('active')){
			$j('.category-depth').find('.depth02 > li').removeClass('active').find('.is-depth3').attr('title', '펼치기');
			$j('.category-depth').find('.depth03 > li').removeClass('active').find('.is-depth4').attr('title', '펼치기');			
			$j(this).attr('title', '펼치기').parent().removeClass('active');
		}else{
			$j('.category-depth').find('.depth02 > li').removeClass('active').find('.is-depth3').attr('title', '펼치기');
			$j('.category-depth').find('.depth03 > li').removeClass('active').find('.is-depth4').attr('title', '펼치기');
			$j(this).attr('title', '접기').parent().addClass('active');
		}     

		var thsHeight = $j(this).closest('.category-depth').height();		
		$j('.category.mCfmClNavTabCon').height(thsHeight);
	});

	// 3뎁스 클릭 - 4뎁스 펼치기/접기
	$j('.is-depth4').on('click', function(e){ 
		e.preventDefault();

		//클릭통계
		var data = $j(this).data();
		KT_trackClicks('mKT-개인_공통', data.statInfo +'^'+ $j(this).attr('title'));
		
		if($j(this).parent().hasClass('active')){
			$j('.category-depth').find('.depth03 > li').removeClass('active').find('.is-depth4').attr('title', '펼치기');						
			$j(this).attr('title', '펼치기').parent().removeClass('active');       	 	
		}else{
			$j('.category-depth').find('.depth03 > li').removeClass('active').find('.is-depth4').attr('title', '펼치기');
			$j(this).attr('title', '접기').parent().addClass('active');
		}

		var thsHeight = $j(this).closest('.category-depth').height();
		$j('.category.mCfmClNavTabCon').height(thsHeight);
	});
}

// 통합검색 
cfmUi.COMMON.search = function(){
	// 통합 검색 레이어 띄울 때 탭바, 푸터 플로팅 메뉴 설정	
	$j('.search-call.js-popup-call').on('click', function (e){
		cfmLayers('search', 'on');
        e.preventDefault();
        //$j("#mCfmClFooter aside.floating-tabbar, #mCfmClFooter .footer-float-icon-div").hide();
        $j("#mCfmClFooter").hide();

		// 통합 검색 레이어 닫을 때 초기화
		$j('.close-search.js-btn-close').click(function(){
			$j('#searchInput').val('');		
			$j('.search-wrap-before').show();
			$j('.search-wrap-after').hide();		
			cfmLayers('search', 'off');
			//$j("#mCfmClFooter aside.floating-tabbar, #mCfmClFooter .footer-float-icon-div").show();
			$j("#mCfmClFooter").show();
		});
	});

	// 통합 검색 레이어
	$j('#searchInput').on('keyup', function(event){
		var words = $j(this).val().trim();
		if(words !== ''){
			$j('.search-wrap-after').show();
			$j('.searchInput-btn-clear').show();
			$j('.search-wrap-before').hide();
			$j('.search-wrap-after').show();
		}
		$j('.close-search.js-btn-close').click(function(){
			$j('.search-wrap-before').show();
			$j('.search-wrap-after').hide();		
			//$j('#searchInput').focus();
		});
		
		// 검색어 지우기
		$j('.searchInput-btn-clear').click(function(){
			//$j('#searchInput').focus();//vos 1128424
			$j(this).hide();
			//$j('#searchInput').val('').focus();
			$j('#searchInput').val('');
			return false;
		});
	});
}

// TAB 바
cfmUi.COMMON.tabBar = function(){
	var $aside = $j('aside.floating-tabbar'),
	$main = $j('main.cfmClmain'),
	$benefits = $j('main.benefits'),
	$mypage = $j('main.mypage');
	$buttonopen = $aside.find('button.btn-tabbar-open');
	
	$j('aside.floating-tabbar').removeClass('tabbarnone'); //숨김처리 초기화

	$j('.floating-tabbar .floating-tabbar-close').on('click',function(){
		// 닫기 버튼 클릭시 마이, 혜택 레이어 비활성화
		$j('.floating-tabbar-my .sltdtxt').html('');
		$j('.floating-tabbar-be .sltdtxt').html('');

		if($benefits.hasClass('active')){
			KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^TabBar^혜택^닫기버튼'); //클릭통계

			$benefits.removeClass("active").addClass("tabbar-layer");
			gsap.to($benefits, 0.5, {left:'100%',
				onStart: function() {
					$aside.addClass('closed');
					$buttonopen.removeAttr('style').attr('style','transform: translate(-50%, 0%)');
				},
				onComplete:function(){
					$benefits.removeAttr("style").attr('aria-hidden', 'true').children("iframe").attr('aria-hidden', 'true');
					$aside.attr('aria-hidden','false').removeClass('tothesub closed');

					//0715 웹접근성 포커스 이동 수정
					setTimeout(function(){
						if($aside.data('show') == 'N'){ //탭바 비노출시
							$j('.sml-call').focus();
						}else{
							$aside.find('.floating-tabbar-be').focus();
						}
					}, 500); //0729 수치변경
				}
			})
		}
		if($mypage.hasClass('active')){
			KT_trackClicks('mKT-개인_공통', '^mKT-개인_공통^TabBar^마이^닫기버튼'); //클릭통계

			$mypage.removeClass("active").addClass("tabbar-layer");
			gsap.to($mypage, 0.5, {left:'-100%',
				onStart: function() {
					$aside.addClass('closed');
					$buttonopen.removeAttr('style').attr('style','transform: translate(-50%, 0%)');
				},
				onComplete:function(){
					$mypage.removeAttr("style").attr('aria-hidden', 'true').children("iframe").attr('aria-hidden', 'true');
					$aside.attr('aria-hidden','false').removeClass('tothesub closed');

					//0715 웹접근성 포커스 이동 수정
					setTimeout(function(){
						if($aside.data('show') == 'N'){
							$j('.sml-call').focus();
						}else{
							$aside.find('.floating-tabbar-my').focus();
						}
					}, 500); //0729 수치변경
				}
			})
		}
		
		$main.show().addClass("active").attr('aria-hidden', 'false');
		$j('.floating-tabbar-open').attr('aria-hidden','true');//0928 vos 1093931
		$aside.attr('aria-hidden','false').removeClass('tothesub');
		
		//탭바 비노출인 경우
		if($j(this).parents('aside').data('show') == 'N'){
			$j(this).parents('aside').attr('aria-hidden','true');
            $j(this).parents('aside').hide();
		}

		// history
		var renewURL = location.href;
		var renewURL = renewURL.split("#")[0];
		history.pushState({}, '', renewURL);

		//팝업 딤처리인 경우
		if($j('.popup-dim').is(':visible')){
			cfmLayers('subpopup', 'on');
		}
	});
}

// 팝업
var cfm_pop_slider, pop_count = 0;
cfmUi.COMMON.pupup = function(type){	
	var contsCnt = $j(".popup-layer-contents > div").not('.bx-clone').not('.toast-swiper').length;
	var options = {
		pager: (contsCnt > 1) ? true : false,	//현재 위치 페이징 표시 여부
		infiniteLoop: true, 	//true-맨마지막 'next' 클릭시 처음으로
		startSlide: 0, 			//시작 슬라이드 번호
		randomStart: false, 	//랜덤 슬라이드 사용 여부
		auto: false,			//자동 실행 여부(?)
		autoStart: false,		//로드될때 자동 실행 여부
		autoControls: false, 	//재생, 정지버튼
		controls: false,		//이전,다음 버튼 노출 여부
		stopAutoOnClick: false, //버튼 클릭시 정지 여부
		autoHover: false, 		//마우스 오버시 정지 여부(자동롤링시만 적용됨)
		touchEnabled : true, 	//크롬에서 마우스 클릭 시 링크 안 되는 오류가 있어서 PC인 경우 사용
		ariaLive : false, 		//스크린리더에서 슬라이딩 배너를 먼저 읽어서 이용자에게 불편을 주는 경우가 있어서 사용
		useCSS: false,			//false-jquery animate(), true-수평 및 수직 슬라이드 애니메이션 사용(?)
		oneToOneTouch: false,
		speed: 300,
		pause: 3800,
		swipeThreshold : 50,
		onSliderLoad: function(currentIndex){
			//컨트롤 영역을 배너 앞으로 옮김
			$j( ".popup-layer-contents .bx-controls" ).insertBefore( $j( ".popup-layer-contents .bx-viewport" ) );

			//인디케이터를 정지/재생 앞으로 옮김 
			$j( ".popup-layer-contents .bx-pager.bx-default-pager" ).insertBefore( $j( ".popup-layer-contents .bx-controls-auto" ) );

			//선택된 인디케이터에 선택됨 표시
			$j('.popup-layer-contents .bx-pager-item').eq(currentIndex).children('a').attr('title','선택됨');

			//노출
			if (type == 'viewdelay') {
				setTimeout(function(){ $j('.main-popup-dim').css('visibility', 'visible'); }, 300);
			} else {
				$j('.main-popup-dim').css('visibility', 'visible');
			}

			//0714 웹접근성 포커스 이동(튜토리얼 있는 경우만)
			if($j('.tutorial-wrap').is(':visible')){				
				setTimeout(function(){ 
					$j(".tutorial-wrap .tutorial-skip").focus();	
				}, 300);
			}
		},
		onSlideAfter: function($slideElement, oldIndex, newIndex){
			// 선택된 인디케이터에 선택됨 표시
			$j('.popup-layer-contents .bx-pager-item a').attr('title','');
			$j('.popup-layer-contents .bx-pager-item').eq(newIndex).children('a').attr('title','선택됨');
		}
	};

	if(cfm_pop_slider != undefined && type == 'reload'){
		cfm_pop_slider.destroySlider();
		cfm_pop_slider.reloadSlider($j.extend({}, options, {
			pager: (contsCnt > 1) ? true : false
		}));

		//정상 로드가 아닌경우
		if(pop_count < 10 && contsCnt > cfm_pop_slider.getSlideCount()){				
			pop_count += 1;
			setTimeout(function(){ cfmUi.COMMON.pupup('reload'); }, 300);			
		}
	}else{
		cfm_pop_slider = $j(".popup-layer-contents").bxSlider(options);
	}

	//팝업닫기
	$j('.main-popup-dim').find('button').on('click', function(){
		/* 20240207 웹접근성 개선 : 본문 내 다른 영역에 포커스 이동할 수 있도록 수정 */
		$j("#mCfmClGnb, #mCfmClContainer, #mCfmClFooter, aside.floating-tabbar").removeAttr("aria-hidden");

		setTimeout(function(){ 
			var ktMainPopYs = $j(".main-popup-dim .cfm-layer.layer-notice");
			var ktMainSPopYs = $j(".click-banner.top.active");

			// 일반 팝업은 없고 슬라이딩 팝업이 있는 경우 슬라이딩 팝업으로 포커스 이동 
			if (ktMainSPopYs)		{
				ktMainSPopYs.find("a").eq(0).focus();
			}

			// 일반 팝업, 슬라이딩 팝업 없는 경우 kt로고로 포커스 이동 
			else {
			$j(".href_main").focus();	
			}		
		}, 300);
		$j(this).closest('div[class*="popup-"]').fadeOut();
		$j(".popup-layer-contents").siblings().attr("aria-hidden","false");

		//딤처리인 경우
		if($j(this).parents('div.popup-dim')){ 
			cfmLayers('subpopup', 'off');
		}
	});

	//딤처리인 경우
	if($j('.popup-dim').is(':visible')){	
		cfmLayers('subpopup', 'on');
	}
}

// 로케이션
cfmUi.COMMON.location = function(){
	var childMenu = $j('.header-location .ui-menu-3depth.havcurrent, .header-location .ui-menu-4depth.havcurrent').length; //3,4뎁스 확인
	if(childMenu == 0){ //상단고정
		$j('#mCfmClGnb').addClass('fixed-mCfmClGnb');
		$j('#mCfmClGnb .fixedheader').addClass('fixed');
	}else{ //LNB고정
		$j('#mCfmClGnb').addClass('mCfmClGnb_havheaderLocation');
	}

	if ($j('.header-location .js-tab-menu > ul').length != 0){
        $j('.header-location .js-tab-menu > ul').each(function(){
            var $this = $j(this);
            var $li = $this.find('li');
            var child_width = 0;
            var child_padding = $this.find('li').css('padding');
            var child_size = 0;
            $li.each(function(i){
                child_width = child_width + $j(this).innerWidth();
                child_size++;
            });

			if(child_padding != undefined){ //개발수정
				var padding_split = child_padding.split('px')[1] * child_size;
				if ($j(this).width() >= child_width + padding_split){
					$j(this).siblings().hide(); 
				}else{
					$j(this).siblings().show();
				}
			}            
        });
    }

	//서브페이지에서 스크롤할 때 현재 메뉴명을 상단에 고정
	var locationCur = $j(".current-location").length;
	if (locationCur){		
		var locationHereTop = 169;
		$j(".current-location").each(function() {
			$j(this).append("<button type='button' class='btn-whldepth'>전체뎁스열기</button>");

			//전체메뉴 펼치기
			$j(".btn-whldepth").click(function() {
				$j(".fixedheader, .header-location").addClass("fixed");
				$j(".current-location").removeClass("fixed");

				$j(".location-3depth").slideDown();
				var lng3Width = 70; 
				$j(".location-3depth-list li").each(function() {
					lng3Width += $j(this).width();
				});
				$j(".location-3depth-list").width(lng3Width);

				//현재 메뉴로 스크롤
				var activePstn = $j(".location-3depth-list li.active").offset().left - 20 ;
				$j(".location-3depth .scroll-box").scrollLeft(activePstn);
			});
		});
		
		//page scroll
		$j(window).scroll(function () {
			if ($j(window).scrollTop() > locationHereTop) {
				$j(".header-location div:last-child()").slideDown();
				$j(".current-location").addClass("fixed");
				$j(".fixedheader, .header-location").removeClass("fixed");
			} else {
				$j(".header-location").children("div:last-child()").slideUp();
				$j(".current-location").removeClass("fixed");

				if ($j(window).scrollTop() == 0) {
					$j(".location-3depth").slideUp();
				}
			}
		});
	}

	// 서브메뉴 더보기 버튼
    $j('.js-btn-close').on('click', function(){
        if($j(this).hasClass('active')){
            $j(this).attr({'aria-expanded':false}).removeClass('active');
            $j(this).siblings('ul').removeClass('active');
        } else {
            $j(this).attr({'aria-expanded':true}).addClass('active');
            $j(this).siblings('ul').addClass('active');
        }
    });

	// sub menu
	$j(document).on('click', '.location-4depth li > *', function(){
		// 선택된 탭 활성화
		$j(this).attr({"aria-selected": "true"}).focus().parent().addClass("active")
		// 기존 탭 비활성화
		.siblings().removeClass("active").find('> *').attr({"aria-selected": "false"});

		// 서브메뉴 
		tabScroll();
	})

	// 1뎁스 메뉴 레이어
	$j('.sml-call').attr('title', '주메뉴 목록 레이어 열기'); //0708 웹접근성 title 변경
	$j("#subminlayer").find("li:first-child a").addClass("js-focuslink"); //0708 웹접근성 포커스 이동
//	$j('.sml-call').on('click', function (e){
//		$j(this).addClass('sttopen').attr('title', '주메뉴 목록 레이어 열림'); //0708 웹접근성 title 변경
//		//cfmLayers('submenu1', 'on');
//		$j('#subminlayer').show();
//	});
	$j('.ui-menu-1depth.js-popup .js-btn-close').on('click', function (e){
		$j('.sml-call').removeClass('sttopen').attr('title', '주메뉴 목록 레이어 열기'); //0708 웹접근성 title 변경
		//cfmLayers('submenu1', 'off');		
		$j('#subminlayer').hide();	
	});

	// 뒤로가기
	$j('.ui-menu-state .ui-bt').on('click', function (e) {
		history.back();
		return false;
	});

	$j('.ui-sub-menu li').each(function() {
        if($j(this).hasClass('active')){
            scrollCenter($j(this).parent('ul'),".active", 300);      
        } 
    });
	
    $j(".ui-menu-state .js-menu-title").text($j('.ui-sub-menu li.current:last').text());

	// 스크롤 후 더보기
	$j('.ui-menu-state .js-menu-title').attr('title','다른 메뉴 목록 열기'); //0623 title 추가
    $j(document).on('click', '.ui-menu-state .js-menu-title', function(e){
		$j(this).addClass('uimenuopen').attr('title', '다른 메뉴 목록 열림'); //0623 추가
        $j('.ui-sub-menu li.current:last').parents('.js-tab-menu').addClass('active');
        $j('.ui-menu-state .js-menu-close').show();

        $j(document).on('click', '.ui-menu-state .js-menu-close', function(e){
			$j(this).prev('.js-menu-title').removeClass('uimenuopen').attr('title', '다른 메뉴 목록 열기'); //0623 추가

            //클릭통계
            var statInfo = '^mKT-개인_공통^GNB^LNB_';
            if($j('.js-tab-content.active').hasClass('ui-menu-3depth')){
                statInfo += '3Depth^닫기';
            }else if($j('.js-tab-content.active').hasClass('ui-menu-4depth')){
                statInfo += '4Depth^닫기';
            }

            KT_trackClicks('mKT-개인_공통', statInfo);

            $j('nav .js-tab-menu').removeClass('active');//2뎁스 메뉴인 경우//0513
            $j('nav .js-tab-content').removeClass('active');//0513. 0517
			$j('nav .ui-menu-3depth.havcurrent').addClass('siblingActive');//0513
			$j('nav .ui-menu-4depth.havcurrent').addClass('siblingActive');//0513
            $j('.ui-menu-state .js-menu-close').hide();//0513. 0517
			$j(this).prev('.js-menu-title').focus(); //0714 웹접근성 포커스 이동
        })
    });

	//0708 웹접근성 선택됨 표시
	$j('.header-location').each(function() {
		$j(this).find("li.current").each(function() {
			$j(this).find("a").attr("title", "선택됨");
		});
	});
}

/* main history back check */
var cfmTabBarHistoryBack = function(){
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('#');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);

		if(qs[i]=='mypage'){
		}else if (qs[i]=='benefits'){
		}else {
			$j('.floating-tabbar .floating-tabbar-close').trigger('click');
		}
    }

    return result;
}

// 레이어 관리
var cfmLayersSubPopup = 0;
var cfmLayers = function(target, type){
	var $search = $j('header #cfmSearch'); //검색 레이어
	var $float = $j('footer .footer-float-icon-div'); //플로팅영역
	var $banner = $j('.click-banner'); //슬라이딩 배너
	var $tabbar = $j('aside'); //탭바
	var $submenu1 = $j('header #subminlayer'); //서브페이지 1뎁스 레이어
	var $submenu1Btn = $j('header .sml-call.js-popup-call'); //서브페이지 1뎁스 버튼
	var $popup = $j(".ermgy-popup-dim, .main-popup-dim, .popup-move-eng");
	var $tabbarshow = $tabbar.data('show'); //탭바비노출

	if(type == 'on'){
		if(target == 'allmenu'){ //전체메뉴 레이어 열기
			$tabbar.addClass("hide").hide();
			$banner.removeClass("topzindex");
			$search.removeClass("active");
			$float.hide();					
			$submenu1.hide();					
			$popup.addClass("zindex-zero");

			if(top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('#benefits') > -1){ //마이,혜택 탭인경우
				$j(top.document).find('.floating-tabbar').addClass("hide").hide();
			}			
		}else if(target == 'search'){ //검색 레이어 열기
			$tabbar.addClass("hide").hide();
			$float.hide();		
			$submenu1.hide();
			$submenu1Btn.removeClass('sttopen');
			$submenu1Btn.attr('title', '주메뉴 목록 레이어 열기');
			$popup.addClass("zindex-zero");

			var thsScrollTop = window.pageYOffset; 		
			var clickBanTop = $j(document).width() * 0.1733;
			if (thsScrollTop > clickBanTop)	{ //0608 스크롤 값 있을 때 
				$j("#mCfmClGnb").addClass("cfmisScroll");
			}	

			if(top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('#benefits') > -1){ //마이,혜택 탭인경우
				$j(top.document).find('.floating-tabbar').addClass("hide").hide();
			}
		}else if(target == 'submenu1'){ //1뎁스메뉴 레이어 열기(서브)
			$tabbar.addClass("hide").hide();
			$search.removeClass("active");
			$float.hide();
			$banner.show();
			$popup.addClass("zindex-zero");

			var thsScrollTop = window.pageYOffset; 		
			var clickBanTop = $j(document).width() * 0.1733;
			if (thsScrollTop > clickBanTop){ //0611 스크롤 값 있을 때 
				$j("#mCfmClGnb").addClass("cfmisScroll");
			}

			if(top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('#benefits') > -1){ //마이,혜택 탭인경우
				$j(top.document).find('.floating-tabbar').addClass("hide").hide();
			}
		}else if(target == 'tab'){ //TAB(마이,혜택) 레이어팝업 열기
			$j(top.document).find('.floating-tabbar').addClass("hide").hide();
		}else if(target == 'subpopup'){ //레이어팝업 열기(서브)
			var benefitsTab = (top.location.href.indexOf('#benefits') > -1 || top.location.href.indexOf('tab=benefits') > -1);
        	var mypageTab = (top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('tab=mypage') > -1);

			if(!mypageTab && !benefitsTab){
				$tabbar.addClass('tabbarnone');
				$float.hide();
			}else{
				$j('.floating-tabbar .floating-tabbar-close').on('click',function(){
					if(cfmLayersSubPopup == 0){ //처음만
						cfmLayersSubPopup += 1;
						$tabbar.addClass('tabbarnone');
						$float.hide();
					}					
				});
			}
		}
	}else if(type == 'off'){
		if(target == 'allmenu'){ //전체메뉴 레이어 닫기
			if($tabbarshow == 'N'){
				$tabbar.removeClass("hide").hide();
			}else{
				$tabbar.removeClass("hide").show();
			}

			//$banner.addClass("topzindex");
			$banner.show();
			$float.show();
			$popup.removeClass("zindex-zero");			

			if(top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('#benefits') > -1){ //마이,혜택 탭인경우
				$j(top.document).find('.floating-tabbar').removeClass("hide").show();
			}
		}else if(target == 'search'){ //검색 레이어 닫기
			if($tabbarshow == 'N'){
				$tabbar.removeClass("hide").hide();
			}else{
				$tabbar.removeClass("hide").show();
			}

			$float.show();
			$popup.removeClass("zindex-zero");

			$j("#mCfmClGnb").removeClass("cfmisScroll"); //0608 고정삭제 

			if(top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('#benefits') > -1){ //마이,혜택 탭인경우
				$j(top.document).find('.floating-tabbar').removeClass("hide").show();
			}
		}else if(target == 'submenu1'){ //1뎁스메뉴 레이어 닫기(서브)
			if($tabbarshow == 'N'){
				$tabbar.removeClass("hide").hide();
			}else{
				$tabbar.removeClass("hide").show();
			}

			$float.show();	
			$popup.removeClass("zindex-zero");
			
			$j("#mCfmClGnb").removeClass("cfmisScroll"); //0608 고정삭제 

			if(top.location.href.indexOf('#mypage') > -1 || top.location.href.indexOf('#benefits') > -1){ //마이,혜택 탭인경우
				$j(top.document).find('.floating-tabbar').removeClass("hide").show();
			}
		}else if(target == 'tab'){ //TAB(마이,혜택) 레이어팝업 닫기
			$j(top.document).find('.floating-tabbar').removeClass("hide").show();
		}else if(target == 'subpopup'){ //레이어팝업 닫기(서브)
			if($tabbarshow == 'N'){
				$tabbar.removeClass('tabbarnone').hide();
			}else{
				$tabbar.removeClass('tabbarnone');
			}

			$float.show();
		}
	}
}

$j(function (){
    $j("body").prepend('<div id="cfmClSkip"><a href="#mCfmClContainer">본문 바로 가기</a></div>');

	/* history back : 마이, 혜택 활성화시 URL 부여 */
	$j(window).on('popstate', function(){
		//cfmTabBarHistoryBack();
		
		if($j('.floating-tabbar').hasClass('tothesub')){
			$j('.floating-tabbar .floating-tabbar-close').trigger('click');
			history.back(-1);
		}
		
		return true;
	});

	//resize
	$j(window).resize(function(){
		//마이,혜택 사이즈
        var vh = window.innerHeight;
		$j('main.benefits iframe, main.mypage iframe').css("height", `${vh}px`);
    });

	//page scroll
	$j(window).scroll(function () {
		//푸터 버튼 위치 이동
		if ($j(window).scrollTop() < 50) {
			$j('#top-btn').stop().fadeOut();
			$j('.footer-float-icon-div').removeClass('ascrl');
		} else {
			$j('#top-btn').stop().fadeIn();
			$j('.footer-float-icon-div').addClass('ascrl');
		}			
				
		//슬라이딩 배너 있는 경우 위치 이동
		var clickBanTop = $j(document).width() * 0.1733;
		if ($j(window).scrollTop() < clickBanTop) {
			if ($j('.click-banner.top').length)			{
				$j('#mCfmClWrapper').addClass('topclickbannerNext');
			}
		} else {
			if ($j('.click-banner.top').length)			{
				$j('#mCfmClWrapper').removeClass('topclickbannerNext');
			}
		}
	}); //scroll

	//하단 플로팅 영역 : 맨위로 이동
    $j('#top-btn').on('click', function (e) {
        $j('html, body').animate({scrollTop: 0}, 100);
		setTimeout(function() {//1122 vos 1093845
			$j('.href_main').focus();
		},500);
        e.preventDefault();
    });

	//#none link
	$j('[href="#none"]').on('click', function(e) {
		e.preventDefault();
	});

	//Shop 푸터 패밀리사이트-2차
	/*
	$j('.linkFamily').click(function(){
		$j(this).parent('div').toggleClass("active");

		if($j(this).parent('div').hasClass("active")){
			$j(this).attr("title", "닫기");
			$j('.linkFamilyControlInfo').text('닫기');
		}else{
			$j(this).attr("title", "열기");
			$j('.linkFamilyControlInfo').text('열기');
		}

		return false;
	});
	*/

	//[서브페이지에서 사용중(cl-common.js)]-----------------------------------------------------------------------
	//accordions click
    $j('.accordions').find('.accordion-trigger').on('click', function (e) {
        e.preventDefault();
        if ($j(this).hasClass('active')) {
            $j(this).removeClass('active').next('.accordion-contents').hide();
			$j(this).attr('title','펼치기');
        } else {
            $j(this).closest('.accordions').find('.accordion-trigger').removeClass('active').attr('title','펼치기');
            $j(this).closest('.accordions').find('.accordion-contents').hide();
            $j(this).addClass('active').attr('title','접기').next('.accordion-contents').stop().slideDown(500);
        }
    });

	$j('.accodion-box>li>button').on('click', function (e) {
        var $this = $j(this);
        var current = $this.parent().index();
		
        if ($this.parent().hasClass('active')) {
            $this.find('span').text('펼치기');
            $this.parent().find('.acc-content').slideUp(function () {
                $j('.accodion-box>li').removeClass('active');
            });
        } else {
            $j('.accodion-box>li').find('.acc-content').slideUp(
                function () {
                    $j('.accodion-box>li').removeClass('active');
                    $j('.accodion-box>li button span').text('펼치기');
                }
            );
            $j('.accodion-box>li').eq(current).find('.acc-content').slideDown(
                function () {
                    $j('.accodion-box>li').eq(current).addClass('active');
                    $j('.accodion-box>li').eq(current).find('button span').text('접기');
                }
            );
        }
    });

	//tabs click
	$j('.tabs').find('a[href*="#trigger"]').on('click', function (e) {
        e.preventDefault();
        KtCommontabs(this);
    });

	//tabs
	function KtCommontabs(obj) {
		var self = $j(obj);
		var target = $j($j(obj).attr("href"));

		self.closest('.tabs').find('a[href*="#trigger"]').removeClass('active').removeAttr('title'); 
		self.addClass('active');
		self.attr('title','선택된 탭');
		target.closest('.tabs').find('[id*="trigger"]').removeClass('active');
		target.addClass('active');

		//tab-in-tab
		target.find('.tabs .tab').children('li').eq(0).find('a').addClass('active');
		target.find('.tabs .tab-contents').children('div').eq(0).addClass('active');       
	}
});


const mkt_helplink_swiper = new Swiper('.helplink-swiper', {
  on : {
	init : function () {
	  //console.log('helplink swiper 초기화 될때 실행');

	  $j('.helplink-swiper .swiper-pagination-bullet').each(function() {
		  var i; i = $j(this).index() + 1;
	  });
	},
	imagesReady : function () { // 모든 내부 이미지가 로드 된 직후 이벤트가 시작됩니다.
	  //console.log('helplink 슬라이드 이미지 로드 후 실행');
		
	  $j(".helplink-swiper .swiper-slide").attr("aria-hidden","true");
	  $j(".helplink-swiper .swiper-slide.swiper-slide-visible").attr("aria-hidden","false");
	  $j(".helplink-swiper .swiper-pagination-bullet-active").attr("title", "선택된 탭");
	  

		$j(".helplink-swiper .swiper-button-stop").click(function(){
				//console.log("stop");
				//KT_trackClicks('mKt-개인_메인', '^mKT-개인_공통^GNB^검색레이어^컨트롤버튼_Stop버튼');
				mkt_helplink_swiper.autoplay.stop();
				$j(".helplink-swiper .swiper-button-play").removeClass("active").focus();
				$j(this).addClass("active");
			});

			$j(".helplink-swiper .swiper-button-play").click(function(){
				//console.log("play");
				//KT_trackClicks('mKt-개인_메인', '^mKT-개인_공통^GNB^검색레이어^컨트롤버튼_Play버튼');
				mkt_helplink_swiper.autoplay.start();
				$j(".helplink-swiper .swiper-button-stop").removeClass("active").focus();
				$j(this).addClass("active");
			});
			
			// 0227 : 버튼 클릭할 때 자동 롤링이 멈추기 때문에 자동 롤링 컨트롤 버튼 변경
			$j(".helplink-swiper button:not(.swiper-button-play)").click(function(){
				$j(".helplink-swiper .swiper-button-play").removeClass("active");
				$j(".helplink-swiper .swiper-button-stop").addClass("active");
			});
			
			$j(".helplink-swiper .swiper-slide a").focus(function(){
				mkt_helplink_swiper.autoplay.stop();
			  $j(".helplink-swiper .swiper-button-play").removeClass("active");
			  $j(".helplink-swiper .swiper-button-stop").addClass("active");
		  });
	},
	autoplayStop : function() {// 0328 자동롤링이 멈춘 경우 버튼 변경 
		 $j(".helplink-swiper .swiper-button-play").removeClass("active");
		  $j(".helplink-swiper .swiper-button-stop").addClass("active");
	},
	autoplayStart : function() {// 0328 자동롤링이 시작한 경우 버튼 변경 
		 $j(".helplink-swiper .swiper-button-play").addClass("active");
		  $j(".helplink-swiper .swiper-button-stop").removeClass("active");
	},
	activeIndexChange : function () {
		$j(".helplink-swiper .swiper-slide").attr("aria-hidden","true");
		$j(".helplink-swiper .swiper-slide.swiper-slide-visible").attr("aria-hidden","false");
		//console.log('helplink 슬라이드 됨');
		$j(".helplink-swiper .swiper-pagination-bullet").attr("title", "");
		$j(".helplink-swiper .swiper-pagination-bullet-active").attr("title", "선택된 탭");
	},
  },

	// Optional parameters
	slidesPerView : "auto",// 뷰당 슬라이드 갯슈
	speed: 400,
	spaceBetween : 40,//슬라이드 간 간격
	direction: 'horizontal',
	loopAdditionalSlides : 1, // 슬라이드 반복 시 빈 란 보이는 오류 수정
	loop: true,
	freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
	autoHeight : true, // 선택된 슬라이드의 높이로 길이 조정
	a11y : false, // 접근성
	resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
	slideToClickedSlide : true, // 슬라이드 클릭시 해당 슬라이드 위치로 이동
	centeredSlides : true, // 슬라이드 가운데 정렬
	allowTouchMove : true, // 터치 조작 여부
	watchOverflow : true, // 슬라이드가 1개 일 때 pager, button 숨김
	slidesOffsetBefore : 0, // 슬라이드 시작 부분 여백
	slidesOffsetAfter : 0, // 슬라이드 끝 부분 여백
	focusableElements : '.helplink-swiper .swiper-slide a',//0329 유지 

	// autoplay
	autoplay : {
	  autoplay : true,
	  delay : 7000,   // delay
	  pauseOnMouseEnter : true,
	  disableOnInteraction : true,  // 인터랙션 후 자동재생 중지
	},

  // If we need pagination
  pagination: {
	el: '.helplink-swiper .swiper-pagination',
	clickable : true,
	type : 'fraction', // or "bullets" | "fraction" | "progressbar" | "custom"
	renderBullet : function (index, className) {
		return '<button class="' + className + '"><span>' + (index + 1) + '</span></button>'
	},
	renderFraction: function (currentClass, totalClass) {
		return '<span class="' + currentClass + '"></span> / ' +  '<span class="' + totalClass + '"></span>';
	}
  },

  // Navigation arrows
  navigation: {
	nextEl: '.helplink-swiper .swiper-button-next',
	prevEl: '.helplink-swiper .swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
	el: '.helplink-swiper .swiper-scrollbar',
  },

}); 


const cfmCltab_helplink_swiper = new Swiper('.helplink-swiper', {
	  on : {
		init : function () {
		  void 0;

		  $j('.helplink-swiper .swiper-pagination-bullet').each(function() {
			  var i; i = $j(this).index() + 1;
		  });
		},
		imagesReady : function () { // 모든 내부 이미지가 로드 된 직후 이벤트가 시작됩니다.
		  //console.log('이벤트 슬라이드 이미지 로드 후 실행');

		  $j(".helplink-swiper .swiper-pagination-bullet-active").attr("title", "선택된 탭");
		  

			$j(".helplink-swiper .swiper-button-stop").click(function(){
					//console.log("stop");
					//KT_trackClicks('mKt-개인_메인', '^mKT-개인_공통^GNB^검색레이어^컨트롤버튼_Stop버튼');
					mkt_helplink_swiper.autoplay.stop();
					$j(".helplink-swiper .swiper-button-play").removeClass("active").focus();
					$j(this).addClass("active");
				});

				$j(".helplink-swiper .swiper-button-play").click(function(){
					//console.log("play");
					//KT_trackClicks('mKt-개인_메인', '^mKT-개인_공통^GNB^검색레이어^컨트롤버튼_Play버튼');
					mkt_helplink_swiper.autoplay.start();
					$j(".helplink-swiper .swiper-button-stop").removeClass("active").focus();
					$j(this).addClass("active");
				});
		},
		activeIndexChange : function () {
			//console.log('이벤트 슬라이드 됨');
			$j(".helplink-swiper .swiper-pagination-bullet").attr("title", "");
			$j(".helplink-swiper .swiper-pagination-bullet-active").attr("title", "선택된 탭");
		},
	  },

		// Optional parameters
		slidesPerView : "auto",// 뷰당 슬라이드 갯슈
		speed: 400,
		spaceBetween : 20,//슬라이드 간 간격
		direction: 'horizontal',
		loopAdditionalSlides : 1, // 슬라이드 반복 시 빈 란 보이는 오류 수정
		loop: true,
		freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
		autoHeight : true, // 선택된 슬라이드의 높이로 길이 조정
		a11y : false, // 접근성
		resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
		slideToClickedSlide : true, // 슬라이드 클릭시 해당 슬라이드 위치로 이동
		centeredSlides : true, // 슬라이드 가운데 정렬
		allowTouchMove : true, // 터치 조작 여부
		watchOverflow : true, // 슬라이드가 1개 일 때 pager, button 숨김
		slidesOffsetBefore : 0, // 슬라이드 시작 부분 여백
		slidesOffsetAfter : 0, // 슬라이드 끝 부분 여백

		// autoplay
		autoplay : {
		  autoplay : true,
		  delay : 7000,   // delay
		  pauseOnMouseEnter : true,
		  disableOnInteraction : true,  // 인터랙션 후 자동재생 중지
		},

	  // If we need pagination
	  pagination: {
		el: '.helplink-swiper .swiper-pagination',
		clickable : true,
		type : 'fraction', // or "bullets" | "fraction" | "progressbar" | "custom"
		renderBullet : function (index, className) {
			return '<button class="' + className + '"><span>' + (index + 1) + '</span></button>'
		},
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span> / ' +  '<span class="' + totalClass + '"></span>';
		}
	  },

	  // Navigation arrows
	  navigation: {
		nextEl: '.helplink-swiper .swiper-button-next',
		prevEl: '.helplink-swiper .swiper-button-prev',
	  },

	  // And if we need scrollbar
	  scrollbar: {
		el: '.helplink-swiper .swiper-scrollbar',
	  },
});

function floatOnload(){
	// 0327 탭바 선택정보 제공 
	if (ktMenuCd == "A00000")	{
		$j("aside.floating-tabbar a").removeClass("cfmActive").attr("title","");
		$j("aside.floating-tabbar .btn-tabbar-home").addClass("cfmActive").attr("title","선택됨");
	} else if (ktMenuCd == "G00000")	{//마이메인
		$j("aside.floating-tabbar a").removeClass("cfmActive").attr("title","");
		$j("aside.floating-tabbar #footerMyBtn").addClass("cfmActive").attr("title","선택됨");
	} else if (ktMenuCd == "F00000")	{//샵메인
		$j("aside.floating-tabbar a").removeClass("cfmActive").attr("title","");
		$j("aside.floating-tabbar #footerBenefitBtn").addClass("cfmActive").attr("title","선택됨");
	} else {	
		$j("aside.floating-tabbar a").removeClass("cfmActive").attr("title","");
	}
	
	//플로팅 탭바 
	$j(".btn-tabbar-open").click(function() {
		$j(".footer-float-icon-div").addClass("whnftopen");
		$j("body").addClass("hidden");
		KT_trackClicks("mKT-개인-공통", "^mKT_개인_공통^플로팅메뉴^퀵메뉴^열기");
	});
	$j(".btn-tabbar-close").click(function() {
		$j(".footer-float-icon-div").removeClass("whnftopen");
		$j("body").removeClass("hidden");
		KT_trackClicks("mKT-개인-공통", "^mKT_개인_공통^플로팅메뉴^퀵메뉴^닫기");
	});	
	
	// 0328 팝업 닫기 
	$j(".cfm-layer.layer-notice .layer-close-btn button").click(function() {
		/* 20240207 웹접근성 개선 : 본문 내 다른 영역에 포커스 이동할 수 있도록 수정 */
		$j("#mCfmClGnb, #mCfmClContainer, #mCfmClFooter, aside.floating-tabbar").removeAttr("aria-hidden");

		var ktMainPopYs = $j(".main-popup-dim .cfm-layer.layer-notice");
		var ktMainSPopYs = $j(".click-banner.top.active");
		// 일반 팝업이 있는 경우 일반 팝업으로 포커스 이동 
		if (ktMainPopYs)		{//vos 1128314 
			$j(".cfm-layer.layer-notice").find(".layer-contents-banner").not(".bx-clone").eq(0).find("a").focus();
		} 
		// 일반 팝업은 없고 슬라이딩 팝업이 있는 경우 슬라이딩 팝업으로 포커스 이동 
		if (!ktMainPopYs && ktMainSPopYs)		{//vos 1128314 
			ktMainSPopYs.finc("a").focus();
		}

		// 일반 팝업, 슬라이딩 팝업 없는 경우 kt로고로 포커스 이동 
		else {
			setTimeout(function(){
				$j(".href_main").focus();
			},250);
		}
	});
}

var scstate = true;
function mainDepth1Onload(){
//0227 1뎁스 메뉴 열기/닫기
	$j(".sml-call").click(function() {
			// 1116 혜택 레이어 닫기
             $j(this).removeClass("scstate_0").attr("title","혜택 목록 레이어 열기");
             $j(".search-call.js-popup-call, .nav-call.js-popup-call, .href_cart").removeAttr("aria-hidden");
             KT_trackClicks("");
             $j("#bnfminlayer").removeClass("active").attr("aria-hidden","true");
             bystate = true;

		if (!scstate)		{
			$j(this).removeClass("scstate_0").attr("title","주메뉴 목록 레이어 열기");
			$j(this).parent(".leftfixedheader").removeClass("cfm-havsubl"); /* m.kt.com_혜택_IA_UI_개선_기획안_v0.9_231031 */
			$j(".search-call.js-popup-call, .nav-call.js-popup-call, .href_cart").removeAttr("aria-hidden");//0327-2
			KT_trackClicks("mKT-개인-공통", "^mKT_개인_공통^GNB^상단고정^홈바로가기레이어^닫힘");
			$j("#subminlayer").removeClass("active").attr("aria-hidden","true"); // vos 1128308
			scstate = true;		
		} else {
			$j(this).addClass("scstate_0").attr("title","주메뉴 목록 레이어 닫기");
			$j(this).parent(".leftfixedheader").addClass("cfm-havsubl"); /* m.kt.com_혜택_IA_UI_개선_기획안_v0.9_231031 */
			$j(".search-call.js-popup-call, .nav-call.js-popup-call, .href_cart").attr("aria-hidden", "true");//0327-2
			KT_trackClicks("mKT-개인-공통", "^mKT_개인_공통^GNB^상단고정^홈바로가기레이어^열림");
			$j("#subminlayer").addClass("active").attr("aria-hidden","false"); // vos 1128308
			scstate = false;
		}
	});
} /* 1115 */	
	
var bystate = true;
function bnfDepthOnload(){/* 1115 */	

     // 혜택 레이어 열고 닫기
     $j(".bnflayer-call").click(function() {			 
			// 1116 1뎁스 레이어 닫기
			$j(this).removeClass("scstate_0").attr("title","주메뉴 목록 레이어 열기");
			$j(".fixedheader").find(".leftfixedheader").removeClass("cfm-havsubl"); 
			$j(".search-call.js-popup-call, .nav-call.js-popup-call, .href_cart").removeAttr("aria-hidden");
			KT_trackClicks("mKT-개인-공통", "^mKT_개인_공통^GNB^상단고정^홈바로가기레이어^닫힘");
			$j("#subminlayer").removeClass("active").attr("aria-hidden","true");
			scstate = true;		

         if (!bystate)        {
             $j(this).removeClass("scstate_0").attr("title","혜택 목록 레이어 열기");
             $j(".search-call.js-popup-call, .nav-call.js-popup-call, .href_cart").removeAttr("aria-hidden");
             KT_trackClicks("");
             $j("#bnfminlayer").removeClass("active").attr("aria-hidden","true");
             bystate = true;
         } else {
             $j(this).addClass("scstate_0").attr("title","혜택 목록 레이어 닫기");
             $j(".search-call.js-popup-call, .nav-call.js-popup-call, .href_cart").attr("aria-hidden", "true");
             KT_trackClicks("");
             $j("#bnfminlayer").addClass("active").attr("aria-hidden","false");
             bystate = false;
         }
     });
} bnfDepthOnload();/* 1115 */	

     	// 초기값
     	$j('.bnflayer-call').attr('title', '혜택 목록 레이어 열기');
     	$j("#bnfminlayer").find("li:first-child a").addClass("js-focuslink");
     	$j('.bnfminlayer .js-btn-close').on('click', function (e){
			$j('.bnflayer-call').removeClass('scstate_0').attr('title', '혜택 목록 레이어 열기');
			$j("#bnfminlayer").removeClass("active").attr("aria-hidden","true");
		 });
     	
     	
     	







$j(document).click(function(e) {
	/* 1114 추가 수정 
	var headerLocationDiv = $j(".leftfixedheader");
	if (headerLocationDiv.has(e.target).length === 0) {
		//$j(".ui-menu-1depth").trigger('POPUP_CLOSE');
			$j(".ui-menu-1depth").removeClass("active");
            $j(".fixedheader").find(".leftfixedheader").removeClass("cfm-havsubl"); //1116 클래스 제거 추가
			$j(".sml-call").removeClass("scstate_0").attr("title","주메뉴 목록 레이어 열기");
			$j(".sml-call").removeClass("sttopen").attr("title","주메뉴 목록 레이어 열기");
			scstate = true;		
	}
	*/
	/* 1114 추가 수정*/
    var headerLocationCDiv = $j(".centerfixedheader");
    var headerLocationLDiv = $j(".leftfixedheader");
    if (headerLocationCDiv.has(e.target).length === 0 && headerLocationLDiv.has(e.target).length === 0) {
            $j("#bnfminlayer").removeClass("active");
            $j("#subminlayer.ui-menu-1depth").removeClass("active");
            $j(this).parent(".leftfixedheader").removeClass("cfm-havsubl"); 
            $j(".sml-call").removeClass("scstate_0").attr("title","주메뉴 목록 레이어 열기");
            $j(".bnflayer-call").removeClass("scstate_0").attr("title","혜택 목록 레이어 열기");
            $j(".fixedheader").find(".leftfixedheader").removeClass("cfm-havsubl"); //1116 클래스 제거 추가
            bystate = true;
            scstate = true;
    }
    
});

$j(window).scroll(function (e) {
	// 0315 1뎁스 메뉴 열려있을 때 닫기 
	/*var headerLocationDiv = $j(".leftfixedheader");
	if (headerLocationDiv.has(e.target).length === 0) {
		$j(".ui-menu-1depth").removeClass("active");
		$j(".sml-call").removeClass("scstate_0").attr("title","주메뉴 목록 레이어 열기");
		$j(".sml-call").removeClass("sttopen").attr("title","주메뉴 목록 레이어 열기");
		$j(".search-call.js-popup-call, .nav-call.js-popup-call, .href_cart").removeAttr("aria-hidden");//0327-2
		scstate = true;	
	}*/
	
    var headerLocationDiv = $j(".centerfixedheader");
    //    if (headerLocationDiv.has(e.target).length === 0) {
                $j("#bnfminlayer").removeClass("active");
                $j("#subminlayer.ui-menu-1depth").removeClass("active");
				$j(".fixedheader").find(".leftfixedheader").removeClass("cfm-havsubl"); //1116 클래스 제거 추가
                $j(".sml-call").removeClass("scstate_0").attr("title","주메뉴 목록 레이어 열기");
                $j(".bnflayer-call").removeClass("scstate_0").attr("title","혜택 목록 레이어 열기");
                bystate = true;
                scstate = true;
//        }
                
});//scroll

function popularlistOnliad(){
	var psstate = 1;
	$j(".morebtn_ps").click(function() {
		if (psstate)		{
			$j(this).addClass("psstate_0").html("닫기");
			$j(this).prev(".popular-searches").addClass("wholelist");
			psstate = 0;
			setTimeout(function(){//0327
				$j(".morebtn_ps").focus();
			}, 1000);
		} else {
			$j(this).removeClass("psstate_0").html("더보기");
			$j(this).prev(".popular-searches").removeClass("wholelist");
			psstate = 1;	
			setTimeout(function(){//0327
				$j(".morebtn_ps").focus();
			}, 1000);
		}
	});	
}

function toastOnload(dimType){
	$j(".toast-type").addClass("showlayer"); 
	if (dimType == "N") {
		$j(".main-popup-dim").removeClass("black-dim");    
		$j("body").removeClass("hidden");
	} else {
		$j("body").addClass("hidden");
	}
	$j("aside.floating-tabbar").addClass("active");
	setTimeout(function(){ 
		$j(".toast-type h2").focus();
	}, 700);
}