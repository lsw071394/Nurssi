console.log("Script Load");
(function($) {
    $(document).ready(function() {
        console.log('jQuery Ready');
        
    

        /*변수및 요소 선언*/
        var scrollBody = $('.parallax-area'); //부모 스크롤 엘리먼트
        

        var textEl = $('.text'); 
        var sc = 0;
        /*스크롤할때 변해야 할 값들*/
        var scrollHeight; // 스크롤 높이
        var scrollRealHeight; //실제로 스크롤해야될 높이를 담을 변수를 선업합니다
        var winScrollTop; // 스크롤바의 높이를 담을 변수를 선업합니다
        var percent; // 스크롤 백분율값을 담을 변수를 선업합니다
        var scrollPerecnt;
 
        
        

        // var textTest = $('.project .slogan');
        var textTest = document.querySelector('.slogan');
        var projectText = document.querySelector('.project .slogan-box')
        var chat1text = document.querySelector('.chat1 .chatbox')
        var chat2text = document.querySelector('.chat2 .chatbox')
        var chat3text = document.querySelector('.chat3 .chatbox')
        var $mockup = document.querySelector('.mockup-container')
        // var contanier = document.querySelector('.wireframe');
        // var wire = document.querySelector('.wire');
        var design = document.querySelector('.design');

        var keywordBox = document.querySelector('.keyword-box');
        var circle = document.querySelectorAll('.circle');
        var circlespan = document.querySelectorAll('.circle span');
        // Array.prototype.slice.call('circle')
        

        var reload = document.querySelector('#reload');
        var upbox = document.querySelector('.up-box');
        var downbox = document.querySelector('.down-box');

        var logotext = document.querySelector('.logo-design .text-box');
        var typotext = document.querySelector('.typo-design .text-box');
        var colortext = document.querySelector('.color-design .text-box');
        var icontext = document.querySelector('.icon-design .text-box');


        var watchtext = document.querySelector('.watch-textArea h1');
 
        function setProperty(){ // 스크롤할때 변할 값들을 셋팅해주는 함수
            sc = window.scrollY || window.pageYOffset
            scrollHeight = scrollBody.height(); // 스크롤 높이
            scrollRealHeight = (scrollHeight - $(window).height()); //실제로 스크롤해야될 높이값을 구합니다
            winScrollTop = $(window).scrollTop(); //스크롤바의 현재 위치를 구합니다
            scrollPerecnt = winScrollTop / scrollRealHeight *100; //거리와 현재 위치를 기준으로 비율을 구합니다
            // percent = scrollPerecnt * 1000; //백분율 구하기
            // console.log(scrollPerecnt);
        };
        
        function parallax(){ // 스크롤할때 계속 호출될 모션 함수 선언
            setProperty(); // 스크롤할때 변해야할 값들의 변수를 선언
            change();
        };
        
        

        function change(){//해당 높이가 됐을때 백그라운드를 바꿔주는 함수
           

            if(window.innerWidth <= 1920){
                if(sc >= 1800 && sc < 2100){
                    projectText.style.transition = "1.2s ease";
                    projectText.style.opacity = "100%";
                    projectText.style.transform = "translateY(0px)";
                }else if(sc < 1800){
                    projectText.style.transition = "0.4s ease";
                    projectText.style.opacity = "0";
                    projectText.style.transform = "translateY(75px)";
                }else if(sc >= 2100){
                    projectText.style.transition = "0.4s ease";
                    projectText.style.opacity = "100%";
                    projectText.style.transform = "translateY(0)";
                }
    
                if(sc >= 2800 && sc < 3100){
                    chat1text.style.transition = "1.2s ease";
                    chat1text.style.opacity = "100%";
                    chat1text.style.transform = "translateY(0px)";
                }else if(sc < 2800){
                    chat1text.style.transition = "0.4s ease";
                    chat1text.style.opacity = "0";
                    chat1text.style.transform = "translateY(75px)";
                }else if(sc >= 3100){
                    chat1text.style.transition = "1.2s ease";
                    chat1text.style.opacity = "100%";
                    chat1text.style.transform = "translateY(0px)";
                }
                if(sc >= 3100 && sc < 3400){
                    chat2text.style.transition = "1.2s ease";
                    chat2text.style.opacity = "100%";
                    chat2text.style.transform = "translateY(0px)";
                }else if(sc < 3100){
                    chat2text.style.transition = "0.4s ease";
                    chat2text.style.opacity = "0";
                    chat2text.style.transform = "translateY(75px)";
                }else if(sc >= 3400){
                    chat2text.style.transition = "1.2s ease";
                    chat2text.style.opacity = "100%";
                    chat2text.style.transform = "translateY(0px)";
                }
                if(sc >= 3400 && sc < 3700){
                    chat3text.style.transition = "1.2s ease";
                    chat3text.style.opacity = "100%";
                    chat3text.style.transform = "translateY(0px)";
                }else if(sc < 3400){
                    chat3text.style.transition = "0.4s ease";
                    chat3text.style.opacity = "0";
                    chat3text.style.transform = "translateY(75px)";
                }else if(sc >= 3700){
                    chat3text.style.transition = "1.2s ease";
                    chat3text.style.opacity = "100%";
                    chat3text.style.transform = "translateY(0px)";
                }
    
    
                if(sc >= 4300 && sc < 5000){
                    keywordBox.style.transition = "1.2s ease";
                    keywordBox.style.width = "48.33em";
                    setTimeout(function(){
                        circle[0].style.transition = '1s ease';
                        circle[0].style.opacity = '100%';
                        circle[1].style.transition = '1s ease';
                        circle[1].style.opacity = '100%';
                        circle[2].style.transition = '1s ease';
                        circle[2].style.opacity = '100%';
                    },1000);
                    
                }else if(sc < 4300){
                    keywordBox.style.transition = "0.4s ease";
                    keywordBox.style.width = "2.33em";            
    
                    circle[0].style.transition = '1s ease';
                    circle[0].style.opacity = '0';
                    circle[1].style.transition = '1s ease';
                    circle[1].style.opacity = '0';
                    circle[2].style.transition = '1s ease';
                    circle[2].style.opacity = '0';
                    
                    
                }else if(sc >= 5000){
                    keywordBox.style.transition = "1.2s ease";
                    keywordBox.style.width = "48.33em";
                    circle[0].style.transition = '1s ease';
                    circle[0].style.opacity = '100%';
                    circle[1].style.transition = '1s ease';
                    circle[1].style.opacity = '100%';
                    circle[2].style.transition = '1s ease';
                    circle[2].style.opacity = '100%';
    
                }
    
    
    
    
                if(sc >= 5500 && sc < 5600){
                    reload.style.transition = "1.2s ease";
                    reload.style.transform = 'scale(1)';
                }else if(sc < 5500){
                    reload.style.transition = "0.4s ease";
                    reload.style.transform = 'scale(5)';
                }else if(sc >= 5600){
                    reload.style.transition = "1.2s ease";
                    reload.style.transform = 'scale(1)';
                }
    
    
                if(sc >= 5600 && sc < 6100){
                   
                    upbox.style.transition = "1.4s ease";
                    upbox.style.bottom = '-2.111rem';
                    upbox.style.transform = 'scale(1)';
                    upbox.style.opacity = '1';
    
                    downbox.style.transition = "1.4s ease";
                    downbox.style.top = '-2.111rem';;
                    downbox.style.transform = 'scale(1)';
                    downbox.style.opacity = '1';
                }else if(sc < 5600){
    
                    upbox.style.transition = "1.2s ease";
                    upbox.style.bottom = '-13.11rem';
                    upbox.style.transform = 'scale(0)';
                    upbox.style.opacity = '0';
    
                    downbox.style.transition = "1.2s ease";
                    downbox.style.top = '-13.11rem';
                    downbox.style.transform = 'scale(0)';
                    downbox.style.opacity = '0';
                }else if(sc >= 6100){
                    upbox.style.transition = "1.2s ease";
                    upbox.style.bottom = '-2.111rem';
                    upbox.style.transform = 'scale(1)';
                    upbox.style.opacity = '1';
    
                    downbox.style.transition = "1.2s ease";
                    downbox.style.top = '-2.111rem';
                    downbox.style.transform = 'scale(1)';
                    downbox.style.opacity = '1';
                }
    
               
                if(sc >= 7400 && sc < 7600 ){
                    design.style.animation = 'opa 1.5s linear forwards';
                }else if(sc < 7400 ){
                    design.style.animation = 'unopa 1s linear forwards';
                }else if(sc >= 7600 ){
                    design.style.animation = 'opa 1s linear forwards';
                }
    
                if(sc >= 7900 && sc < 8300){
                    logotext.style.transition = "1s ease";
                    logotext.style.opacity = "100%";
                    logotext.style.transform = "translateY(0px)";
                }
                else if(sc < 7900){
                    logotext.style.transition = "0.4s ease";
                    logotext.style.opacity = "0";
                    logotext.style.transform = "translateY(75px)";
                }
                else if(sc >= 8300){
                    logotext.style.transition = "0.4s ease";
                    logotext.style.opacity = "100%";
                    logotext.style.transform = "translateY(0)";
                }
    
                if(sc >= 8900 && sc < 9300){
                    typotext.style.transition = "1s ease";
                    typotext.style.opacity = "100%";
                    typotext.style.transform = "translateY(0px)";
                }
                else if(sc < 8900){
                    typotext.style.transition = "0.4s ease";
                    typotext.style.opacity = "0";
                    typotext.style.transform = "translateY(75px)";
                }
                else if(sc >= 9300){
                    typotext.style.transition = "0.4s ease";
                    typotext.style.opacity = "100%";
                    typotext.style.transform = "translateY(0)";
                }
    
                if(sc >= 9800 && sc < 10500){
                    colortext.style.transition = "1s ease";
                    colortext.style.opacity = "100%";
                    colortext.style.transform = "translateY(0px)";
                }
                else if(sc < 9900){
                    colortext.style.transition = "0.4s ease";
                    colortext.style.opacity = "0";
                    colortext.style.transform = "translateY(75px)";
                }
                else if(sc >= 10500){
                    colortext.style.transition = "0.4s ease";
                    colortext.style.opacity = "100%";
                    colortext.style.transform = "translateY(0)";
                }
    
                // var colordbar = document.querySelector('.color-design .image-box')
                // var leftbar = document.querySelector('.color-design .left-box')
                // var rightbar = document.querySelector('.color-design .right-box')
                // if(sc >= 8853){
                //     setTimeout(function(){
                //         leftbar.style.animation = 'left 1s linear forwards'
                //     },800);
                //     setTimeout(function(){
                //         rightbar.style.animation = 'left 1s linear forwards'
                //     },2000);
                //     setTimeout(function(){
                //         colordbar.style.animation = 'opa 1s linear forwards'
                //     },4000);
                // }else if (sc < 8418){
                //     leftbar.style.animation = 'unleft 0.1s linear forwards';
                //     rightbar.style.animation = 'unleft 0.1s linear forwards';
                //     colordbar.style.animation = 'unopa 0.1s linear forwards';
                // }
                
                if(sc >= 10500 && sc < 11600){
                    icontext.style.transition = "1s ease";
                    icontext.style.opacity = "100%";
                    icontext.style.transform = "translateY(0px)";
                }
                else if(sc < 10500){
                    icontext.style.transition = "0.4s ease";
                    icontext.style.opacity = "0";
                    icontext.style.transform = "translateY(75px)";
                }
                else if(sc >= 11600){
                    icontext.style.transition = "0.4s ease";
                    icontext.style.opacity = "100%";
                    icontext.style.transform = "translateY(0)";
                }
                
                
                var watchslogan = document.querySelector('.watch .slogan h1');
    
                if(sc >= 17800 && sc < 20500){
                    watchslogan.style.transition = "1s ease";
                    watchslogan.style.opacity = "100%";
                    watchslogan.style.transform = "translateY(0px)";
                }
                else if(sc < 17800){
                    watchslogan.style.transition = "0.4s ease";
                    watchslogan.style.opacity = "0";
                    watchslogan.style.transform = "translateY(75px)";
                }
                else if(sc >= 20500){
                    watchslogan.style.transition = "0.4s ease";
                    watchslogan.style.opacity = "100%";
                    watchslogan.style.transform = "translateY(0)";
                }
    
                if(sc >= 20800 && sc < 23750){
                    watchtext.style.transition = "1s ease";
                    watchtext.style.opacity = "100%";
                    watchtext.style.transform = "translateY(0px)";
                }
                else if(sc < 20800){
                    watchtext.style.transition = "0.4s ease";
                    watchtext.style.opacity = "0";
                    watchtext.style.transform = "translateY(75px)";
                }
                else if(sc >= 23750){
                    watchtext.style.transition = "0.4s ease";
                    watchtext.style.opacity = "100%";
                    watchtext.style.transform = "translateY(0)";
                }
                
                
                // if(sc >= 1000 && sc < 2000){
                //     $('#v').addClass('selected');
                // }else if(sc < 1000){
                //     $('#v').removeClass('selected');
                // }else if(sc >= 2000){
                //     $('#v').removeClass('selected');
                // }
    
                // if(sc >= 2000 && sc < 13500){ 
                //     $('#p').addClass('selected');
                // }else if(sc < 2000){
                //     $('#p').removeClass('selected');
                // }else if(sc >= 13500){
                //     $('#p').removeClass('selected');
                // }
    
    
                // if(sc >= 13500 && sc < 26650){ 
                //     $('#s').addClass('selected');
                // }else if(sc < 13500){
                //     $('#s').removeClass('selected');
                // }else if(sc >= 26650){
                //     $('#s').removeClass('selected');
                // }
    
                // if(sc >= 26650 && sc < 28000){
                //     $('#t').addClass('selected');
                // }else if(sc < 26650){
                //     $('#t').removeClass('selected');
                // }
            }else if(window.innerWidth > 1920 && window.innerWidth <= 4000){
                if(sc >= 3200 && sc < 3300){
                    projectText.style.transition = "1.2s ease";
                    projectText.style.opacity = "100%";
                    projectText.style.transform = "translateY(0px)";
                }else if(sc < 3200){
                    projectText.style.transition = "0.4s ease";
                    projectText.style.opacity = "0";
                    projectText.style.transform = "translateY(75px)";
                }else if(sc >= 3300){
                    projectText.style.transition = "0.4s ease";
                    projectText.style.opacity = "100%";
                    projectText.style.transform = "translateY(0)";
                }
    
                if(sc >= 5000 && sc < 5100){
                    chat1text.style.transition = "1.2s ease";
                    chat1text.style.opacity = "100%";
                    chat1text.style.transform = "translateY(0px)";
                }else if(sc < 5000){
                    chat1text.style.transition = "0.4s ease";
                    chat1text.style.opacity = "0";
                    chat1text.style.transform = "translateY(75px)";
                }else if(sc >= 5100){
                    chat1text.style.transition = "1.2s ease";
                    chat1text.style.opacity = "100%";
                    chat1text.style.transform = "translateY(0px)";
                }
                if(sc >= 5500 && sc < 5600){
                    chat2text.style.transition = "1.2s ease";
                    chat2text.style.opacity = "100%";
                    chat2text.style.transform = "translateY(0px)";
                }else if(sc < 5500){
                    chat2text.style.transition = "0.4s ease";
                    chat2text.style.opacity = "0";
                    chat2text.style.transform = "translateY(75px)";
                }else if(sc >= 5600){
                    chat2text.style.transition = "1.2s ease";
                    chat2text.style.opacity = "100%";
                    chat2text.style.transform = "translateY(0px)";
                }
                if(sc >= 5900 && sc < 6000){
                    chat3text.style.transition = "1.2s ease";
                    chat3text.style.opacity = "100%";
                    chat3text.style.transform = "translateY(0px)";
                }else if(sc < 5900){
                    chat3text.style.transition = "0.4s ease";
                    chat3text.style.opacity = "0";
                    chat3text.style.transform = "translateY(75px)";
                }else if(sc >= 6000){
                    chat3text.style.transition = "1.2s ease";
                    chat3text.style.opacity = "100%";
                    chat3text.style.transform = "translateY(0px)";
                }
    
    
                if(sc >= 7400 && sc < 7600){
                    keywordBox.style.transition = "1.2s ease";
                    keywordBox.style.width = "48.33em";
                    setTimeout(function(){
                        circle[0].style.transition = '1s ease';
                        circle[0].style.opacity = '100%';
                        circle[1].style.transition = '1s ease';
                        circle[1].style.opacity = '100%';
                        circle[2].style.transition = '1s ease';
                        circle[2].style.opacity = '100%';
                    },1000);
                    
                }else if(sc < 7400){
                    keywordBox.style.transition = "0.4s ease";
                    keywordBox.style.width = "2.33em";            
    
                    circle[0].style.transition = '1s ease';
                    circle[0].style.opacity = '0';
                    circle[1].style.transition = '1s ease';
                    circle[1].style.opacity = '0';
                    circle[2].style.transition = '1s ease';
                    circle[2].style.opacity = '0';
                    
                    
                }else if(sc >= 7600){
                    keywordBox.style.transition = "1.2s ease";
                    keywordBox.style.width = "48.33em";
                    circle[0].style.transition = '1s ease';
                    circle[0].style.opacity = '100%';
                    circle[1].style.transition = '1s ease';
                    circle[1].style.opacity = '100%';
                    circle[2].style.transition = '1s ease';
                    circle[2].style.opacity = '100%';
    
                }
    
    
    
    
                if(sc >= 8750 && sc < 8900){
                    reload.style.transition = "1.2s ease";
                    reload.style.transform = 'scale(1)';
                }else if(sc < 8750){
                    reload.style.transition = "0.4s ease";
                    reload.style.transform = 'scale(5)';
                }else if(sc >= 8900){
                    reload.style.transition = "1.2s ease";
                    reload.style.transform = 'scale(1)';
                }
    
    
                if(sc >= 9500 && sc < 9650){
                   
                    upbox.style.transition = "1.4s ease";
                    upbox.style.bottom = '-2.111rem';
                    upbox.style.transform = 'scale(1)';
                    upbox.style.opacity = '1';
    
                    downbox.style.transition = "1.4s ease";
                    downbox.style.top = '-2.111rem';;
                    downbox.style.transform = 'scale(1)';
                    downbox.style.opacity = '1';
                }else if(sc < 9500){
    
                    upbox.style.transition = "1.2s ease";
                    upbox.style.bottom = '-13.11rem';
                    upbox.style.transform = 'scale(0)';
                    upbox.style.opacity = '0';
    
                    downbox.style.transition = "1.2s ease";
                    downbox.style.top = '-13.11rem';
                    downbox.style.transform = 'scale(0)';
                    downbox.style.opacity = '0';
                }else if(sc >= 9650){
                    upbox.style.transition = "1.2s ease";
                    upbox.style.bottom = '-2.111rem';
                    upbox.style.transform = 'scale(1)';
                    upbox.style.opacity = '1';
    
                    downbox.style.transition = "1.2s ease";
                    downbox.style.top = '-2.111rem';
                    downbox.style.transform = 'scale(1)';
                    downbox.style.opacity = '1';
                }
    
               
                if(sc >= 12000){
                    // setTimeout(function(){
                    //     design.style.animation = 'opa 2s linear forwards';
                    // },1000);
                    design.style.animation = 'opa 1.5s linear forwards';
                }else if(sc < 12000){
                    design.style.animation = 'unopa 1s linear forwards';
                }
    
                if(sc >= 13100 && sc < 13200){
                    logotext.style.transition = "1s ease";
                    logotext.style.opacity = "100%";
                    logotext.style.transform = "translateY(0px)";
                }else if(sc < 13100){
                    logotext.style.transition = "0.4s ease";
                    logotext.style.opacity = "0";
                    logotext.style.transform = "translateY(75px)";
                }else if(sc >= 13200){
                    logotext.style.transition = "0.4s ease";
                    logotext.style.opacity = "100%";
                    logotext.style.transform = "translateY(0)";
                }
    
                if(sc >= 15000 && sc < 15100){
                    typotext.style.transition = "1s ease";
                    typotext.style.opacity = "100%";
                    typotext.style.transform = "translateY(0px)";
                }else if(sc < 15000){
                    typotext.style.transition = "0.4s ease";
                    typotext.style.opacity = "0";
                    typotext.style.transform = "translateY(75px)";
                }else if(sc >= 15100){
                    typotext.style.transition = "0.4s ease";
                    typotext.style.opacity = "100%";
                    typotext.style.transform = "translateY(0)";
                }
    
                if(sc >= 16700 && sc < 16800){
                    colortext.style.transition = "1s ease";
                    colortext.style.opacity = "100%";
                    colortext.style.transform = "translateY(0px)";
                }else if(sc < 16700){
                    colortext.style.transition = "0.4s ease";
                    colortext.style.opacity = "0";
                    colortext.style.transform = "translateY(75px)";
                }else if(sc >= 16800){
                    colortext.style.transition = "0.4s ease";
                    colortext.style.opacity = "100%";
                    colortext.style.transform = "translateY(0)";
                }
    
                // var colordbar = document.querySelector('.color-design .image-box')
                // var leftbar = document.querySelector('.color-design .left-box')
                // var rightbar = document.querySelector('.color-design .right-box')
                // if(sc >= 8853){
                //     setTimeout(function(){
                //         leftbar.style.animation = 'left 1s linear forwards'
                //     },800);
                //     setTimeout(function(){
                //         rightbar.style.animation = 'left 1s linear forwards'
                //     },2000);
                //     setTimeout(function(){
                //         colordbar.style.animation = 'opa 1s linear forwards'
                //     },4000);
                // }else if (sc < 8418){
                //     leftbar.style.animation = 'unleft 0.1s linear forwards';
                //     rightbar.style.animation = 'unleft 0.1s linear forwards';
                //     colordbar.style.animation = 'unopa 0.1s linear forwards';
                // }
                
                if(sc >= 18400 && sc < 18500){
                    icontext.style.transition = "1s ease";
                    icontext.style.opacity = "100%";
                    icontext.style.transform = "translateY(0px)";
                }else if(sc < 18400){
                    icontext.style.transition = "0.4s ease";
                    icontext.style.opacity = "0";
                    icontext.style.transform = "translateY(75px)";
                }else if(sc >= 18500){
                    icontext.style.transition = "0.4s ease";
                    icontext.style.opacity = "100%";
                    icontext.style.transform = "translateY(0)";
                }
                
                
                var watchslogan = document.querySelector('.watch .slogan h1');
    
                if(sc >= 32400 && sc < 32500){
                    watchslogan.style.transition = "1s ease";
                    watchslogan.style.opacity = "100%";
                    watchslogan.style.transform = "translateY(0px)";
                }
                else if(sc < 32400){
                    watchslogan.style.transition = "0.4s ease";
                    watchslogan.style.opacity = "0";
                    watchslogan.style.transform = "translateY(75px)";
                }
                else if(sc >= 32500){
                    watchslogan.style.transition = "0.4s ease";
                    watchslogan.style.opacity = "100%";
                    watchslogan.style.transform = "translateY(0)";
                }
    
                if(sc >= 39000 && sc < 39100){
                    watchtext.style.transition = "1s ease";
                    watchtext.style.opacity = "100%";
                    watchtext.style.transform = "translateY(0px)";
                }
                else if(sc < 39000){
                    watchtext.style.transition = "0.4s ease";
                    watchtext.style.opacity = "0";
                    watchtext.style.transform = "translateY(75px)";
                }
                else if(sc >= 39100){
                    watchtext.style.transition = "0.4s ease";
                    watchtext.style.opacity = "100%";
                    watchtext.style.transform = "translateY(0)";
                }
            }
        }
           
            
            


        // $('.c1').on('click',function(){
        //     console.log('click');
        //     $(this).children('span').html('연결');
        // });

        // $('.c2').on('click',function(){
        //     console.log('click');
        //     $(this).children('span').html('효율');
        // });

        // $('.c3').on('click',function(){
        //     console.log('click');
        //     $(this).children('span').html('케어');
        // });

            // Add smooth scrolling to all links
        $("a").on('click', function(event) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                transition : '1s ease-in-out',
                scrollTop: $(hash).offset().top
            }, 1200, function(){
        
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
            } // End if
        });

        setInterval(slide,2000);

		function slide() {
				$('#slider').animate({
                marginLeft: -39.67+'rem',
				},1000,slideNext);
		}

		function slideNext(){
                $('#slider>li').eq(0).appendTo('#slider');
				$('#slider').animate({
					marginLeft: 0
				},0);
		}

     
        $('.planning > .inner').on('mouseover', function(){
            $(this).css(
                {'background-color': 'transparent',});   
            $('.planning > .inner > a' ).css('color' , 'white')
       }).on('mouseout',function(){
           $(this).css('background-color', 'white');
           $('.planning > .inner > a' ).css('color' , 'black')
       })
        




       var $win = $(window);
       var _isAni = void 0;
       function addEvent() {
        $win.on('scroll', onScrollWin).trigger('scroll');
    }



       function onScrollWin(e) {
        // console.log('window scroll');
        _scrollTop = $win.scrollTop(); // 스크롤 Y 좌표.
        // console.log(_scrollTop);
        
        if(!_isAni){
            scrollMenuActive();
        }

        // 스크롤 이벤트 핸들러의 가장 마지막 부분에 저장.
        // 이전 스크롤 Y 좌표.
        _exScrollTop = _scrollTop;
    }



       var _scrollTop = 0;
       var _exScrollTop = null;
       var $section = $('section');
       var $footer = $('footer');
       var $gnEl = $('header a');
       function scrollMenuActive(){
           // $.each();
           // _this.$section.each();
           $.each($section, function(index, el) {
               // console.log(index, el);
               var $el = $(el), // 각 요소 셀렉터.
                   start, // 요소가 시작하는 스크롤 시점.
                   end; // 요소가 끝나는 스크롤 시점.

               
               start = $el.offset().top - 60;
               end = start + $el.innerHeight();
               if(index === 0) {
                   start = 0;
               }
               // console.log(index, start, end); 
               // 스크롤 값과 해당 섹션의 위치를 비교해서 활성화 여부를 판단(조건문).
               if(_scrollTop >= start && _scrollTop < end){
                   if(!$gnEl.eq(index).hasClass('selected')){
                       $gnEl.removeClass('selected');
                       $gnEl.eq(index).addClass('selected');
                   }
               }
           });
           // _this.$section.each(function(index, element) {
           //     console.log(index, element);
           // });
       }
       




        function init(){ //최초 한번실행
            parallax();
            addEvent();
        };

        $(window).scroll(function(e){ //스크롤 이벤트 바인딩
            parallax();
            console.log(sc);
            // console.log(winScrollTop);
            // console.log(scrollPerecnt);
            // console.log(Math.floor(percent));
        });
        
    
       
        init(); //start
       
    });
})(jQuery);

