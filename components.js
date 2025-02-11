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
var $fileBox = null; 
$j(document).ready(function () { 
    tabScroll(); 
    CheckedAll();
    FileLoad();
    Tooltip();
	
	// LNB : 현재 메뉴에 active 클래스 추가 
	$j('.ui-menu-3depth.havcurrent, .ui-menu-4depth havcurrent').addClass('active');
});

// 더보기 resize  
$j(window).resize(function () { 
    tabScroll(); 
});

//checkbox all
function CheckedAll() {
    var $allChk = $j('.checkbox-wrap .all-chk input'),
        $Chk = $j('.checkbox-wrap .ui-checkbox input');

    //실행
    $allChk.on('click', $allChk, Allchk);
    $Chk.on('click', Count);

    // 전체 선택
    function Allchk() {
        if ($allChk.is(':checked')) {
            $Chk.prop('checked', true);
        } else {
            $Chk.prop('checked', false);
        }
    }
    // 갯수 체크
    function Count() {
        $isChk = $j('.checkbox-wrap .ui-checkbox').not('.all-chk').find('input').filter(':checked');
        count = $isChk.length,
        ChkLength = $Chk.length - 1;
        if (count === ChkLength) {
            $allChk.prop('checked', true);
        } else {
            $allChk.prop('checked', false);
        }
    }
}

//file upload
function FileLoad() { 
    var fileBox = $j('.js-file'); 
    $j.each(fileBox, function(idx){ 
        var $this = fileBox.eq(idx), 
        btnUpload = $this.find('[type="file"]'), 
        $label = $this.find('.js-file-label'); 
        btnUpload.on('change', function() { 
            var $target = $j(this), 
            fileName = $target.val(), 
            $fileText = $target.siblings('.js-file-name'); 
            $fileText.val(fileName); 
        }) 
        btnUpload.on('focusin focusout', function(e) { 
            e.type == 'focusin' ? $label.addClass('focus') : $label.removeClass('focus'); 
        }) 
    }) 
    $j(document)
        .on('click','.js-multi-file .js-file-add', function(){
            //div에 파일 추가
            if($j(this).siblings('.js-file').find('[type="text"]').val().trim() == ''){
                alert('파일을 등록 해주세요.');
                return false;
            } else {
                var $target = $j(this).siblings('.js-file').find('[type="file"]'), 
                    fileName = $target.val();
                var str = '<div class="js-file-item" tabindex="0">';
                    str += '<span>'+fileName+'</span>';
                    str += '<button type="button" class="js-file-delete" value="'+fileName+'"><span class="blind">삭제</span></button><br>';
        
                $j(str).appendTo('.js-file-list');
                $target.siblings('.js-file-name').val('');
                $j('.js-file-list').find('.js-file-delete').on('click',function(){
                    $j(this).parent().hide();
                })
            }
    });
}

// 접근성 관련 포커스 강제 이동
$j(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){
    var next = $j(e.target).attr('data-focus-next'),
        prev = $j(e.target).attr('data-focus-prev'),
        target = next || prev || false;

    if(!target || e.keyCode != 9) {
        return;
    }
    if( (!e.shiftKey && !!next) || (e.shiftKey && !!prev) ) {
        setTimeout(function(){
        $j('[data-focus="' + target + '"]').focus();
        }, 1);
    }
});

//tab menu
$j(document).on('click', '.js-tab-menu .js-tab-title > *', function(){
    // 선택된 탭 활성화 : 1124 aria-selected를 title 로 변경
    $j(this).attr({"title": "선택됨"}).focus().parent().addClass("active")
    // 기존 탭 비활성화 : 1124 aria-selected를 title 로 변경
    .siblings().removeClass("active").find('> *').attr({"title": ""});

    // 기존 탭 패널 비활성화
    $j(this).parents('.js-tab-menu').siblings(".js-tab-content").attr({"tabindex": "-1"}).removeClass("active");
    // 연관된 탭 패널 활성화
    $j("#" + $j(this).attr("aria-controls")).attr({"tabindex": "0"}).addClass("active");

    // 서브메뉴 
    tabScroll();
})

//dropdown menu
$j(document).on('click','.js-drop-down > .js-dd-toggle', function(){
    if($j(this).hasClass('current')){
        $j(this).attr({'aria-expanded':false}).removeClass('current');
        $j(this).next().stop().hide().attr('tabIndex',-1);
        $j(this).parents('.nav-snb').css('padding-bottom','0');
        if($j(this).parent('.js-drop-down').hasClass('ns-3depth')) {
            $j(this).parent('.js-drop-down').css('padding-bottom', '0').parents('.nav-snb').css('padding-bottom', $j(this).parent().outerHeight());
        }
    } else {
        $j(this).attr({'aria-expanded':true}).addClass('current').siblings('.js-dd-toggle.current').removeClass('current').children().attr('aria-expanded',false);
        $j(this).next().stop().show().attr('tabIndex',0).siblings('.js-dd-content').stop().hide().attr('tabIndex',-1);
        $j(this).parents('.js-drop-down').css('padding-bottom', $j(this).next().outerHeight());
        if($j(this).parents('.js-drop-down').hasClass('ns-3depth')) {
            $j(this).parents('.nav-snb').css('padding-bottom', $j('.nav-snb > .js-dd-toggle.current').next().outerHeight());
        }
    }
})

//tooltip   
function Tooltip() {    
    var ttOpenBtn = '[data-tooltip]',
        ttCloseBtn = '.tt-close';
    function getTarget(t) {
        return $j(t).attr('data-tooltip');
    }
    function ttOpen(t) {
		$j('[data-tooltip-con]').hide(); //0427
        var showTarget = $j('[data-tooltip-con="' + t + '"]');
        showTarget.show().focus();
        showTarget.find('.tt-close').data('activeTarget', t);
        $j(this).attr({'aria-selected':true});
    }
    function ttClose(t) {
        var activeTarget = $j('[data-tooltip-con="' + t + '"]');
        activeTarget.hide();
        $j('[data-tooltip="' + t + '"]').focus().attr({'aria-selected':false});
    }
    $j(document)
        .on('click', ttOpenBtn, function(e){
            e.preventDefault();
            ttOpen(getTarget(e.target));
    })
        .on('click', ttCloseBtn, function(e) {
            e.preventDefault();
            ttClose($j(this).data('activeTarget'));
    })
}

// LNB : sub menu
$j(document).on('click', '.ui-sub-menu .js-tab-menu li:not(.ui-menu-4depth) > *', function(e){
    if($j(this).attr('href') == '#'){
        //클릭통계
        var data = $j(this).data();
        var statInfo = data.statInfo;
        if(statInfo != undefined){
            statInfo = statInfo.replace('GNB^', 'GNB^LNB^') +'^펼치기';
			KT_trackClicks('mKT-개인_공통', statInfo);
        }

        e.preventDefault();
    }

    // 선택된 탭 활성화
    $j(this).attr({"aria-selected": ""}).focus().parent().addClass("active")//vos 1128312 : aria-selected 속성값 삭제
    // 기존 탭 비활성화
    .siblings().removeClass("active").find('> *').attr({"aria-selected": ""});//vos 1128312 : aria-selected 속성값 삭제
    // 서브메뉴 
    
    // 네비게이션인 경우 자신이 속한 탭 패널 활성화
    $j(this).parents('.js-tab-menu.js-tab-content').addClass("active");

    var thsCurrent = $j(this).parent().hasClass("current");
    if (thsCurrent)	{ //현재 메뉴 큭릭했을 때 아무 동작 안 함 
        $j('.ui-menu-3depth.havcurrent .current').addClass('active');//현재 메뉴는 표시함
        $j('.ui-menu-4depth.havcurrent .current').addClass('active');//현재 메뉴는 표시함
        return;
    } else {	
        scrollCenter($j(this).parent().parent('ul'),".active", 300);
        $j('.ui-sub-menu .js-tab-content.active li').each(function() {
            if($j(this).parent().hasClass('active')){
                scrollCenter($j(this).parent('ul'), ".active", 300);   
            }       
        });

        //ui-menu-3depth 펼쳐져 있을 때 
        if ($j('.ui-menu-3depth.havcurrent').length)	{
            $j('.ui-menu-3depth.havcurrent').addClass('siblingActive');
        }

        //ui-menu-4depth 펼쳐져 있을 때 
        if ($j('.ui-menu-4depth.havcurrent').length)	{
            $j('.ui-menu-4depth.havcurrent').not('active').addClass('siblingActive');
        }        
    }
    
    $j(window).scroll(function() { 
        if ($j(this).scrollTop()) {
            $j('.ui-sub-menu').find('.js-tab-content').removeClass('active');
        } 
    });
    tabScroll();	
});

$j(document).on('click', '.ui-sub-menu .ui-menu-2depth li > *', function(e){
    $j('.ui-menu-3depth li:not(.current), .ui-menu-4depth li:not(.current)').removeClass('active');
    $j('.ui-menu-3depth ul, .ui-menu-4depth ul').animate({scrollLeft: '0'}, 0);
});
$j(document).on('click', '.ui-sub-menu .ui-menu-3depth li > *', function(e){
    $j('.ui-menu-4depth li:not(.current)').removeClass('active');
    $j('.ui-menu-4depth ul').animate({scrollLeft: '0'}, 0);
});

// LNB : 서브메뉴 더보기 버튼
$j(document).on('click', '.js-menu-toggle', function(){
    //클릭통계
    var txt = '';
    var statInfo = '^mKT-개인_공통^GNB^LNB_';
    if($j(this).parent().hasClass('ui-menu-2depth')){
        statInfo += '2Depth^';
        txt = '2뎁스 메뉴 ';
    }else if($j(this).parent().hasClass('ui-menu-3depth')){
        statInfo += '3Depth^';
        txt = '3뎁스 메뉴 ';
    }else if($j(this).parent().hasClass('ui-menu-4depth')){
        statInfo += '4Depth^';
        txt = '4뎁스 메뉴 ';
    }

    if($j(this).hasClass('active')){
        statInfo += '접기';
        txt += '펼치기';
    }else{
        statInfo += '펼치기';
        txt += '접기';
    }

	KT_trackClicks('mKT-개인_공통', statInfo);

    $j(this).find('.hidetxt').text(txt); //텍스트정보

    if($j(this).hasClass('active')){        
        $j(this).attr({'aria-expanded':false}).removeClass('active');
        $j(this).parent().removeClass('open');
        scrollCenter($j(this).parent().children('ul'),".active", 300); //0613 중간 이상에 위치한 메뉴일 경우, 페이지 첫 진입후에는 포커싱이 정상적으로 적용이 되어 있으나, LNB 레이어를 열었다 닫으면 초기화됨 
    } else {
        $j(this).attr({'aria-expanded':true}).addClass('active');
        $j(this).parent().addClass('open').siblings().removeClass('open').children('button').attr({'aria-expanded':false}).removeClass('active');
    }
}); 

// LNB : 서브메뉴 active center - mkt_ui.js로 이동
/* 
$j(document).ready(function () { 
    $j('.ui-sub-menu li').each(function() {
        if($j(this).hasClass('active')){
            scrollCenter($j(this).parent('ul'),".active", 300);      
        } 
    });
    $j(".ui-menu-state .js-menu-title").text($j('.ui-sub-menu li.current:last').text());
	// 스크롤 후 더보기
    $j(document).on('click', '.ui-menu-state .js-menu-title', function(e){
        $j('.ui-sub-menu li.current:last').parents('.js-tab-menu').addClass('active');
        $j('.ui-menu-state .js-menu-close').show();

        $j(document).on('click', '.ui-menu-state .js-menu-close', function(e){
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
        })
    })
})
*/

$j(window).scroll(function() {
	if ($j(this).scrollTop() < 0) {
        // ios 상단 스크롤 바운스 영역
        $j('.ui-sub-menu').removeClass('sticky');
        $j('.ui-menu-state').hide();

    } else if ($j(this).scrollTop() > 65) {
        // 스크롤 하단 : 본문 부분 
        $j('.ui-sub-menu').addClass('sticky');
        $j('.ui-menu-state').show();
        // 재스크롤시 LNB 정리
        $j('.ui-sub-menu .js-tab-menu li').removeClass('active');//선택한 메뉴 해제하고 현재 메뉴를 선택
        $j('.ui-sub-menu .js-tab-menu li.current').addClass('active');
        $j('.ui-sub-menu .js-tab-menu').removeClass('active');//2뎁스 메뉴인 경우
        $j('.ui-sub-menu .js-tab-content').removeClass('active siblingActive');
        $j('.ui-menu-state .js-menu-close').hide();
        // 0613 열려있는 뎁스가 있는 경우 닫기 : 페이지 첫 진입 후 메뉴 레이어를 아래로 연 상태로, 페이지 하단으로 스크롤 했다가 맨 위로 올리면 레이어는 닫혀있어야함
        $j('nav.ui-sub-menu > .open').each(function() {
            $j(this).find('.js-menu-toggle').trigger('click');
        });
        $j('.ui-menu-state .js-menu-title').removeClass('uimenuopen').attr('title', '다른 메뉴 목록 열기');//0623 추가
    } else {
		// 페이치 최상단 : 선택된 메뉴 노출 
        $j('.ui-sub-menu').removeClass('sticky');
        $j('.ui-menu-state').hide();
		$j('.ui-sub-menu .ui-menu-2depth li').each(function() {
			if($j(this).hasClass('active')){
				scrollCenter($j(this).parent('ul'),".active", 300);      
			} 
		});
        $j('.ui-sub-menu .ui-menu-3depth li').each(function() { //0613 추가 페이지 첫 진입 후 메뉴 레이어를 아래로 연 상태로, 페이지 하단으로 스크롤 했다가 맨 위로 올리면 레이어는 닫혀있어야함
			if($j(this).hasClass('active')){
				scrollCenter($j(this).parent('ul'),".active", 300);      
			} 
		});
		$j('.ui-sub-menu .ui-menu-4depth li').each(function() { //0613 추가 페이지 첫 진입 후 메뉴 레이어를 아래로 연 상태로, 페이지 하단으로 스크롤 했다가 맨 위로 올리면 레이어는 닫혀있어야함
			if($j(this).hasClass('active')){
				scrollCenter($j(this).parent('ul'),".active", 300);      
			} 
		});
        $j('.ui-menu-state .js-menu-title').removeClass('uimenuopen').attr('title', '다른 메뉴 목록 열기');//0623 추가
    }
});
// menu scroll
function tabScroll() {
    // window.width 보다 리스트가 작을때(스크롤이 없을때)
    if ($j('.ui-sub-menu .js-tab-menu > ul').length != 0) {
        $j('.ui-sub-menu .js-tab-menu > ul').each(function() {
            var $this = $j(this);
            var $li = $this.find('li');
            var child_width = 0;
            var child_padding = $this.find('li').css('padding');
            var child_size = 0;
            $li.each(function(i) {
                child_width = child_width + $j(this).innerWidth();
                child_size++;
            });

            if(child_padding != undefined){ //개발수정
                var padding_split = child_padding.split('px')[1] * child_size;
                if ($j(this).width() >= child_width + padding_split) {
                    $j(this).siblings('.js-menu-toggle').hide(); 
                }else{
                    $j(this).siblings('.js-menu-toggle').show();
                }
            }           
        });
    }
}
 var scrollCenter = function(target, elem, speed) {
    var active = $j(target).find(elem); // find the active element
    var activeWidth = active.outerWidth() / 2; // get active width center
    var pos = active.position() == undefined ? 0 : active.position().left + activeWidth; //get left position of active li + center position 0613 개발수정
    var elpos = $j(target).scrollLeft(); // get current scroll position
    var elW = $j(target).width() + 40; //get div width
    pos = pos + elpos - elW / 2; // for center position if you want adjust then change this
    $j(target).animate({
      scrollLeft: pos
    }, speed == undefined ? 1000 : speed);
    return target;
};


