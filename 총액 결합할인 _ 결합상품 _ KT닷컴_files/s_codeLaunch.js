/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

function scode_log(message) {
    //console.log(message);
}

var s = {
    t: function(){
        scode_log('s.t();');
    },

    tl: function(){
        scode_log('s.tl();');
    }
};

function trackClicks(ClickCatName,ClickName) {
    //Adobe launch
    KT_launchClicks(ClickCatName,ClickName);
}

// AppView Check
function isCSAppChk() {
    var isApp = false;
    if(/ollehcs/i.test(navigator.userAgent)){
        isApp = true;
    }
	return isApp;
}

var isAppChk = isCSAppChk();

function KT_trackClicks(Click_Category,Click_Name) {
    var gaClick = gaSplitClickName(Click_Name);
    if(isAppChk){
        gaEventTracker(true,"/+/"+gaClick["Click_Set1"],gaClick["Click_Set2"],gaClick["Click_Set3"]);
    }else{
        gaEventTracker(true,gaClick["Click_Set1"],gaClick["Click_Set2"],gaClick["Click_Set3"]);
    }

    //Adobe launch
    KT_launchClicks(Click_Category,Click_Name);
}

//Adobe Layer popup
function KT_tracklayerPg(pgTagName) {
	
    try {
        _satellite.track('layered_page', {page_name : pgTagName});
    } catch (e) {
        scode_log('adobe 연동 오류 (KT_tracklayerPg 연동 오류 : ' + e.message + ')');
    }    
}

/*Adobe Multi View
arrTagName : [{ClickCatName :'테스트1', ClickName: '클릭명칭1'}, {ClickCatName :'테스트2', ClickName: '클릭명칭2'}]
*/
function KT_trackMutiView(arrTagName) {
	
	
    try {
        _satellite.track("banner_exposed", {banner :arrTagName});        
    } catch (e) {
        scode_log('adobe 연동 오류 (KT_trackMutiView 연동 오류 : ' + e.message + ')');        
    }
}

//Adobe Launch Click
function KT_launchClicks(Click_Category,Click_Name) {
	
    try {
        _satellite.track("click links", {ClickCatName : Click_Category, ClickName : Click_Name});
    } catch (e) {
        scode_log('adobe 연동 오류 (KT_launchClicks 연동 오류 : ' + e.message + ')');
    }
}

try {
    if(gtmLogUseYn != 'N') gtmLogUseYn = 'Y';
} catch (error) {
	gtmLogUseYn = 'Y';
}


// Google Tag Manager
if(!isAppChk){ //모바일웹(앱이아닌경우)

    if ( gtmLogUseYn == "Y" )
    {
    	var _0x7382=['&dl=','&dt=','protocol','POST','ajax','setDate',';\x20path=/\x20','undefined','toGMTString','floor','random','datalicious_cid','getTime','/collect','language','charset','title','pixelDepth','height','location','href','replace','\x5c$&','[?&]','(=([^&#]*)|&|#|$)','exec','cookie','split','charAt','substring','indexOf','length','create','&cid=','&ul=','&de=','&sd=','&sr=','&cn=','&cs=','&cc=','&ck=','send','pageview','innerWidth','innerHeight','event','rollup.event','&ec=','&ea=','string','&el=','object','keys','toString','&cd','number','&ev=','dimension','set','metric','&cm','toLowerCase','userid','&uid=','&uip=','category','contentGroup','&cg','ec:addProduct','ec:setAction','&pa=','purchase','&ti=','&ta=','revenue','&tr=','tax','&tt=','shipping','&ts=','coupon','&tcc=','step','&cos=','option','list','$pal=','name','brand','variant','price','quantity','position','&pr','&t=','&vp='];(function(_0x304a40,_0x3de549){var _0x197980=function(_0x3cf7fe){while(--_0x3cf7fe){_0x304a40['push'](_0x304a40['shift']());}};_0x197980(++_0x3de549);}(_0x7382,0x1f2));var _0x2738=function(_0x721df5,_0x9dcc9a){_0x721df5=_0x721df5-0x0;var _0x2b82cc=_0x7382[_0x721df5];return _0x2b82cc;};var serverIP='gagateway.kt.com';var serverUrl=_0x2738('0x0');var v=0x1;var tid;var t;var cid=datalicious_cid();var dl=encodeURIComponent(document['location']);var ul=navigator[_0x2738('0x1')];var de=document[_0x2738('0x2')];var dt=encodeURIComponent(document[_0x2738('0x3')]);var sd=screen[_0x2738('0x4')];var sr=screen['width']+'x'+screen[_0x2738('0x5')];var setCategory='';var vp;var ecommerce_product_flag=![];var ecommerce_trasaction_flag=![];var customMessage_flag=![];var userid_flag=![];var ecommerceAction_flag=![];var product_number=0x1;var ecommerce_product=new Array();var ecommerce_transaction={'ti':'','ta':'','tr':'','tt':'','ts':'','tcc':''};var baseMessage='';var customMessage='';var productMessage='';var transactionMessage='';var ecommerceActionMessage='';var useridMessage='';var rollUpEvent=!![];function GAgetParameterByName(_0x25ad1b,_0x4e9589){if(!_0x4e9589){_0x4e9589=window[_0x2738('0x6')][_0x2738('0x7')];}_0x25ad1b=_0x25ad1b[_0x2738('0x8')](/[\[\]]/g,_0x2738('0x9'));var _0x4f0d91=new RegExp(_0x2738('0xa')+_0x25ad1b+_0x2738('0xb')),_0x99e22e=_0x4f0d91[_0x2738('0xc')](_0x4e9589);if(!_0x99e22e)return null;if(!_0x99e22e[0x2])return'';return decodeURIComponent(_0x99e22e[0x2][_0x2738('0x8')](/\+/g,'\x20'));}function GAgetCookie(_0x4d8c36){var _0x2eb46d=_0x4d8c36+'=';var _0xcd5079=decodeURIComponent(document[_0x2738('0xd')]);var _0x23db73=_0xcd5079[_0x2738('0xe')](';');for(var _0x58c181=0x0;_0x58c181<_0x23db73['length'];_0x58c181++){var _0x4e1692=_0x23db73[_0x58c181];while(_0x4e1692[_0x2738('0xf')](0x0)=='\x20'){_0x4e1692=_0x4e1692[_0x2738('0x10')](0x1);}if(_0x4e1692[_0x2738('0x11')](_0x2eb46d)==0x0){return _0x4e1692[_0x2738('0x10')](_0x2eb46d[_0x2738('0x12')],_0x4e1692[_0x2738('0x12')]);}}return'';}function ga(){if(arguments[0x0]==_0x2738('0x13')){if(tid==null){tid=arguments[0x1];baseMessage=baseMessage+'v='+v;baseMessage=baseMessage+_0x2738('0x14')+cid;baseMessage=baseMessage+_0x2738('0x15')+ul;baseMessage=baseMessage+_0x2738('0x16')+de;baseMessage=baseMessage+_0x2738('0x17')+sd;baseMessage=baseMessage+_0x2738('0x18')+sr;try{baseMessage=baseMessage+'&cd20='+cid;}catch(_0x35c32a){}try{var _0x2db43f=GAgetParameterByName('cmpid')['split']('-');if(_0x2db43f[_0x2738('0x12')]>0x3){if(_0x2db43f[0x0]){baseMessage=baseMessage+_0x2738('0x19')+_0x2db43f[0x0];}if(_0x2db43f[0x3]){baseMessage=baseMessage+_0x2738('0x1a')+_0x2db43f[0x3];}if(_0x2db43f[0x1]){baseMessage=baseMessage+'&cm='+_0x2db43f[0x1];}if(_0x2db43f[0x2]){baseMessage=baseMessage+_0x2738('0x1b')+_0x2db43f[0x2];}if(_0x2db43f[0x4]){baseMessage=baseMessage+_0x2738('0x1c')+_0x2db43f[0x4];}}}catch(_0x38e8d8){}}}else if(arguments[0x0]==_0x2738('0x1d')){if(arguments[0x1]==_0x2738('0x1e')){t=arguments[0x1];dl=encodeURIComponent(document[_0x2738('0x6')]);rollUpEvent=!![];vp=window[_0x2738('0x1f')]+'x'+window[_0x2738('0x20')];if(arguments[0x2])dl=arguments[0x2];mf_SendRequest(baseMessage);}else if(arguments[0x1]==_0x2738('0x21')||arguments[0x1]==_0x2738('0x22')){if(arguments[0x2]!=null&&arguments[0x3]!=null){t=_0x2738('0x21');rollUpEvent=arguments[0x1]==_0x2738('0x21')?![]:!![];vp=window[_0x2738('0x1f')]+'x'+window[_0x2738('0x20')];var _0x2dcc5e='';var _0x514e45=encodeURIComponent(arguments[0x2]);_0x2dcc5e=_0x2dcc5e+_0x2738('0x23')+_0x514e45;var _0x52c7df=encodeURIComponent(arguments[0x3]);_0x2dcc5e=_0x2dcc5e+_0x2738('0x24')+_0x52c7df;if(typeof arguments[0x4]==_0x2738('0x25'))_0x2dcc5e=_0x2dcc5e+_0x2738('0x26')+encodeURIComponent(arguments[0x4]);else if(typeof arguments[0x4]==_0x2738('0x27')){for(var _0x591577=0x0;_0x591577<Object['keys'](arguments[0x4])[_0x2738('0x12')];_0x591577++){if(Object[_0x2738('0x28')](arguments[0x4])[_0x591577][_0x2738('0x29')]()[_0x2738('0x11')]('dimension')>-0x1){var _0x39a7de=Object[_0x2738('0x28')](arguments[0x4])[_0x591577][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');_0x2dcc5e=_0x2dcc5e+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x4][Object[_0x2738('0x28')](arguments[0x4])[_0x591577]];}}}if(typeof arguments[0x5]=='object'){for(var _0x591577=0x0;_0x591577<Object[_0x2738('0x28')](arguments[0x5])['length'];_0x591577++){if(Object[_0x2738('0x28')](arguments[0x5])[_0x591577][_0x2738('0x29')]()[_0x2738('0x11')]('dimension')>-0x1){var _0x39a7de=Object[_0x2738('0x28')](arguments[0x5])[_0x591577][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');_0x2dcc5e=_0x2dcc5e+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x5][Object[_0x2738('0x28')](arguments[0x5])[_0x591577]];}}}else if(typeof arguments[0x5]==_0x2738('0x25')||typeof arguments[0x5]==_0x2738('0x2b')){_0x2dcc5e=_0x2dcc5e+_0x2738('0x2c')+arguments[0x5];if(typeof arguments[0x6]=='object'){for(var _0x591577=0x0;_0x591577<Object[_0x2738('0x28')](arguments[0x6])[_0x2738('0x12')];_0x591577++){if(Object['keys'](arguments[0x6])[_0x591577]['toString']()[_0x2738('0x11')](_0x2738('0x2d'))>-0x1){var _0x39a7de=Object[_0x2738('0x28')](arguments[0x6])[_0x591577][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');_0x2dcc5e=_0x2dcc5e+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x6][Object[_0x2738('0x28')](arguments[0x6])[_0x591577]];}}}}mf_SendRequest(baseMessage+_0x2dcc5e);}}else{}}else if(arguments[0x0]==_0x2738('0x2e')){if(arguments[0x1]['toString']()['indexOf'](_0x2738('0x2d'))>-0x1){customMessage_flag=!![];var _0x39a7de=arguments[0x1][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');customMessage=customMessage+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x2];}else if(arguments[0x1]['toString']()[_0x2738('0x11')](_0x2738('0x2f'))>-0x1){customMessage_flag=!![];var _0x39a7de=arguments[0x1][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');customMessage=customMessage+_0x2738('0x30')+_0x39a7de+'='+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()[_0x2738('0x11')](_0x2738('0x32'))>-0x1){baseMessage=baseMessage+_0x2738('0x33')+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()[_0x2738('0x11')]('ip')>-0x1){baseMessage=baseMessage+_0x2738('0x34')+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()[_0x2738('0x11')](_0x2738('0x35'))>-0x1){setCategory=arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x11')](_0x2738('0x36'))>-0x1){customMessage_flag=!![];var _0x39a7de=arguments[0x1][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');customMessage=customMessage+_0x2738('0x37')+_0x39a7de+'='+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x11')](_0x2738('0x3'))>-0x1){dt=encodeURIComponent(arguments[0x2]);}}else if(arguments[0x0]==_0x2738('0x38')){if(typeof arguments[0x1]==_0x2738('0x27')){input_ecommerce_product(arguments[0x1]);}}else if(arguments[0x0]==_0x2738('0x39')){if(typeof arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()==_0x2738('0x25')){ecommerceAction_flag=!![];ecommerceActionMessage='';ecommerceActionMessage=_0x2738('0x3a')+arguments[0x1];if(arguments[0x2])input_ecommerce_setAction(arguments[0x2]);if(arguments[0x1]['toString']()==_0x2738('0x3b'))input_ecommerce_setPurchase(arguments[0x2]);}else if(typeof(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()==_0x2738('0x27'))){ecommerceAction_flag=!![];ecommerceActionMessage='';input_ecommerce_setAction(arguments[0x1]);}}}function input_ecommerce_setPurchase(_0x183760){if(_0x183760['id'])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x3c')+_0x183760['id'];if(_0x183760['affiliation'])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x3d')+_0x183760['affiliation'];if(_0x183760[_0x2738('0x3e')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x3f')+_0x183760[_0x2738('0x3e')];if(_0x183760[_0x2738('0x40')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x41')+_0x183760['tax'];if(_0x183760[_0x2738('0x42')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x43')+_0x183760['shipping'];if(_0x183760[_0x2738('0x44')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x45')+_0x183760[_0x2738('0x44')];}function input_ecommerce_setAction(_0x2696da){if(_0x2696da[_0x2738('0x46')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x47')+_0x2696da[_0x2738('0x46')];if(_0x2696da[_0x2738('0x48')])ecommerceActionMessage=ecommerceActionMessage+'&col='+_0x2696da[_0x2738('0x46')];if(_0x2696da[_0x2738('0x49')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x4a')+_0x2696da[_0x2738('0x49')];}function input_ecommerce_product(_0x1440d6){if(_0x1440d6['id']&&_0x1440d6[_0x2738('0x4b')]){ecommerce_product[product_number-0x1]={'id':'','nm':'','br':'','ca':'','va':'','pr':'','qt':'','cc':'','ps':''};ecommerce_product_flag=!![];ecommerce_product[product_number-0x1]['id']=_0x1440d6['id'];ecommerce_product[product_number-0x1]['nm']=_0x1440d6['name'];ecommerce_product[product_number-0x1]['br']=_0x1440d6[_0x2738('0x4c')]?_0x1440d6[_0x2738('0x4c')]:null;ecommerce_product[product_number-0x1]['ca']=_0x1440d6[_0x2738('0x35')]?_0x1440d6[_0x2738('0x35')]:null;ecommerce_product[product_number-0x1]['va']=_0x1440d6[_0x2738('0x4d')]?_0x1440d6[_0x2738('0x4d')]:null;ecommerce_product[product_number-0x1]['pr']=_0x1440d6[_0x2738('0x4e')]?_0x1440d6[_0x2738('0x4e')]:null;ecommerce_product[product_number-0x1]['qt']=_0x1440d6[_0x2738('0x4f')]?_0x1440d6[_0x2738('0x4f')]:null;ecommerce_product[product_number-0x1]['cc']=_0x1440d6[_0x2738('0x44')]?_0x1440d6[_0x2738('0x44')]:null;ecommerce_product[product_number-0x1]['ps']=_0x1440d6[_0x2738('0x50')]?_0x1440d6[_0x2738('0x50')]:null;add_custom_dimension_metric(ecommerce_product[product_number-0x1],_0x1440d6);for(var _0x2e725c in Object[_0x2738('0x28')](ecommerce_product[product_number-0x1])){if(ecommerce_product[product_number-0x1][Object[_0x2738('0x28')](ecommerce_product[product_number-0x1])[_0x2e725c]])productMessage=productMessage+_0x2738('0x51')+product_number+Object['keys'](ecommerce_product[product_number-0x1])[_0x2e725c]+'='+ecommerce_product[product_number-0x1][Object[_0x2738('0x28')](ecommerce_product[product_number-0x1])[_0x2e725c]];}product_number++;}}function add_custom_dimension_metric(_0x57eb00,_0x22c1b2){for(var _0x2ef5f2 in Object[_0x2738('0x28')](_0x22c1b2)){if(Object['keys'](_0x22c1b2)[_0x2ef5f2]['toString']()[_0x2738('0x11')]('dimension')>-0x1){var _0x4a8027='cd'+Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2][_0x2738('0x29')]()['replace'](/[^0-9]/g,'');var _0x9b1a54=_0x22c1b2[Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2]];_0x57eb00[_0x4a8027]=_0x9b1a54;}if(Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2][_0x2738('0x29')]()[_0x2738('0x11')](_0x2738('0x2f'))>-0x1){var _0x4a8027='cm'+Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');var _0x9b1a54=_0x22c1b2[Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2]];_0x57eb00[_0x4a8027]=_0x9b1a54;}}}function mf_SendRequest(_0x23ee02){_0x23ee02=_0x23ee02+_0x2738('0x52')+t+_0x2738('0x53')+vp+_0x2738('0x54')+dl+_0x2738('0x55')+dt;if(ecommerce_product_flag){ecommerce_product_flag=![];_0x23ee02=_0x23ee02+productMessage;productMessage='';product_number=0x1;}if(customMessage_flag){customMessage_flag=![];_0x23ee02=_0x23ee02+customMessage;customMessage='';}if(ecommerceAction_flag){ecommerceAction_flag=![];_0x23ee02=_0x23ee02+ecommerceActionMessage;}mf_SendRequestAPI(_0x23ee02+'&tid='+tid);if(rollUpEvent)mf_SendRequestAPI_rollup(_0x23ee02+'&tid=UA-100874847-1');}function mf_SendRequestAPI(_0x56a014){var _0x5080cd=document[_0x2738('0x6')][_0x2738('0x56')];var _0x36437b=_0x5080cd+'//'+serverIP+serverUrl;var _0x5c6ae5={'type':_0x2738('0x57'),'url':_0x36437b,'data':_0x56a014,'crossDomain':!![],'beforeSend':function(){},'success':function(_0x58e3b){},'error':function(_0x123462,_0x53dd04,_0x5af65f){}};$[_0x2738('0x58')](_0x5c6ae5);}function mf_SendRequestAPI_rollup(_0x71063a){var _0x3d20ec=document[_0x2738('0x6')][_0x2738('0x56')];var _0x2d812b=_0x3d20ec+'//'+serverIP+serverUrl;var _0xec2aa0={'type':_0x2738('0x57'),'url':_0x2d812b,'data':_0x71063a,'crossDomain':!![],'beforeSend':function(){},'success':function(_0x3f16b0){},'error':function(_0x2698b3,_0x5c89af,_0x2fc155){}};$[_0x2738('0x58')](_0xec2aa0);}function setCookie(_0x5edd04,_0x71c83b,_0x447244){var _0x28a95b=new Date();_0x28a95b[_0x2738('0x59')](_0x28a95b['getDate']()+_0x447244);cookies=_0x5edd04+'='+encodeURIComponent(_0x71c83b)+_0x2738('0x5a');if(typeof _0x447244!=_0x2738('0x5b'))cookies+=';domain=kt.com;expires='+_0x28a95b[_0x2738('0x5c')]()+';';document[_0x2738('0xd')]=cookies;}function getCookie(_0x5c068f){_0x5c068f=_0x5c068f+'=';var _0x1058f1=document[_0x2738('0xd')];var _0x3e97e2=_0x1058f1[_0x2738('0x11')](_0x5c068f);var _0x22c100='';if(_0x3e97e2!=-0x1){_0x3e97e2+=_0x5c068f[_0x2738('0x12')];var _0x32ae05=_0x1058f1['indexOf'](';',_0x3e97e2);if(_0x32ae05==-0x1)_0x32ae05=_0x1058f1[_0x2738('0x12')];_0x22c100=_0x1058f1[_0x2738('0x10')](_0x3e97e2,_0x32ae05);}return encodeURIComponent(_0x22c100);}function guid(){function _0x2084c4(){return Math[_0x2738('0x5d')]((0x1+Math[_0x2738('0x5e')]())*0x10000)[_0x2738('0x29')](0x10)[_0x2738('0x10')](0x1);}return _0x2084c4()+'-'+_0x2084c4()+'-'+_0x2084c4()+'-'+_0x2084c4()+_0x2084c4()+_0x2084c4();}function datalicious_cid(){var _0x145e36=getCookie(_0x2738('0x5f'));var _0x45903e;if(_0x145e36!=''){_0x45903e=_0x145e36;}else{var _0x7234a8=new Date();var _0x134140=_0x7234a8[_0x2738('0x60')]();_0x45903e=_0x134140+'-'+guid();setCookie(_0x2738('0x5f'),_0x45903e,0x16d);}return _0x45903e;}
    	ga('create', 'UA-100874847-2');
    	
        // TB인 경우(GTM-NDJMG7C) / 상용인경우 (GTM-N5ZFLBW)
        if ( adobeProperties == 'tb' )
        {
            // TB인 경우
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NDJMG7C');
            var googleTagBody = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDJMG7C" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
        }
        else
        {
            // 상용일 경우에는 prd로 하지 않고 그냥 else로 처리하여 처리
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N5ZFLBW');
            var googleTagBody = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N5ZFLBW" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
        }
    }
    else
    {
        var googleTagBody = '';
        function ga(e){
        	
        }
    }
}else{
	 if ( gtmLogUseYn == "Y" ){
		 var _0x7382=['&dl=','&dt=','protocol','POST','ajax','setDate',';\x20path=/\x20','undefined','toGMTString','floor','random','datalicious_cid','getTime','/collect','language','charset','title','pixelDepth','height','location','href','replace','\x5c$&','[?&]','(=([^&#]*)|&|#|$)','exec','cookie','split','charAt','substring','indexOf','length','create','&cid=','&ul=','&de=','&sd=','&sr=','&cn=','&cs=','&cc=','&ck=','send','pageview','innerWidth','innerHeight','event','rollup.event','&ec=','&ea=','string','&el=','object','keys','toString','&cd','number','&ev=','dimension','set','metric','&cm','toLowerCase','userid','&uid=','&uip=','category','contentGroup','&cg','ec:addProduct','ec:setAction','&pa=','purchase','&ti=','&ta=','revenue','&tr=','tax','&tt=','shipping','&ts=','coupon','&tcc=','step','&cos=','option','list','$pal=','name','brand','variant','price','quantity','position','&pr','&t=','&vp='];(function(_0x304a40,_0x3de549){var _0x197980=function(_0x3cf7fe){while(--_0x3cf7fe){_0x304a40['push'](_0x304a40['shift']());}};_0x197980(++_0x3de549);}(_0x7382,0x1f2));var _0x2738=function(_0x721df5,_0x9dcc9a){_0x721df5=_0x721df5-0x0;var _0x2b82cc=_0x7382[_0x721df5];return _0x2b82cc;};var serverIP='gagateway.kt.com';var serverUrl=_0x2738('0x0');var v=0x1;var tid;var t;var cid=datalicious_cid();var dl=encodeURIComponent(document['location']);var ul=navigator[_0x2738('0x1')];var de=document[_0x2738('0x2')];var dt=encodeURIComponent(document[_0x2738('0x3')]);var sd=screen[_0x2738('0x4')];var sr=screen['width']+'x'+screen[_0x2738('0x5')];var setCategory='';var vp;var ecommerce_product_flag=![];var ecommerce_trasaction_flag=![];var customMessage_flag=![];var userid_flag=![];var ecommerceAction_flag=![];var product_number=0x1;var ecommerce_product=new Array();var ecommerce_transaction={'ti':'','ta':'','tr':'','tt':'','ts':'','tcc':''};var baseMessage='';var customMessage='';var productMessage='';var transactionMessage='';var ecommerceActionMessage='';var useridMessage='';var rollUpEvent=!![];function GAgetParameterByName(_0x25ad1b,_0x4e9589){if(!_0x4e9589){_0x4e9589=window[_0x2738('0x6')][_0x2738('0x7')];}_0x25ad1b=_0x25ad1b[_0x2738('0x8')](/[\[\]]/g,_0x2738('0x9'));var _0x4f0d91=new RegExp(_0x2738('0xa')+_0x25ad1b+_0x2738('0xb')),_0x99e22e=_0x4f0d91[_0x2738('0xc')](_0x4e9589);if(!_0x99e22e)return null;if(!_0x99e22e[0x2])return'';return decodeURIComponent(_0x99e22e[0x2][_0x2738('0x8')](/\+/g,'\x20'));}function GAgetCookie(_0x4d8c36){var _0x2eb46d=_0x4d8c36+'=';var _0xcd5079=decodeURIComponent(document[_0x2738('0xd')]);var _0x23db73=_0xcd5079[_0x2738('0xe')](';');for(var _0x58c181=0x0;_0x58c181<_0x23db73['length'];_0x58c181++){var _0x4e1692=_0x23db73[_0x58c181];while(_0x4e1692[_0x2738('0xf')](0x0)=='\x20'){_0x4e1692=_0x4e1692[_0x2738('0x10')](0x1);}if(_0x4e1692[_0x2738('0x11')](_0x2eb46d)==0x0){return _0x4e1692[_0x2738('0x10')](_0x2eb46d[_0x2738('0x12')],_0x4e1692[_0x2738('0x12')]);}}return'';}function ga(){if(arguments[0x0]==_0x2738('0x13')){if(tid==null){tid=arguments[0x1];baseMessage=baseMessage+'v='+v;baseMessage=baseMessage+_0x2738('0x14')+cid;baseMessage=baseMessage+_0x2738('0x15')+ul;baseMessage=baseMessage+_0x2738('0x16')+de;baseMessage=baseMessage+_0x2738('0x17')+sd;baseMessage=baseMessage+_0x2738('0x18')+sr;try{baseMessage=baseMessage+'&cd20='+cid;}catch(_0x35c32a){}try{var _0x2db43f=GAgetParameterByName('cmpid')['split']('-');if(_0x2db43f[_0x2738('0x12')]>0x3){if(_0x2db43f[0x0]){baseMessage=baseMessage+_0x2738('0x19')+_0x2db43f[0x0];}if(_0x2db43f[0x3]){baseMessage=baseMessage+_0x2738('0x1a')+_0x2db43f[0x3];}if(_0x2db43f[0x1]){baseMessage=baseMessage+'&cm='+_0x2db43f[0x1];}if(_0x2db43f[0x2]){baseMessage=baseMessage+_0x2738('0x1b')+_0x2db43f[0x2];}if(_0x2db43f[0x4]){baseMessage=baseMessage+_0x2738('0x1c')+_0x2db43f[0x4];}}}catch(_0x38e8d8){}}}else if(arguments[0x0]==_0x2738('0x1d')){if(arguments[0x1]==_0x2738('0x1e')){t=arguments[0x1];dl=encodeURIComponent(document[_0x2738('0x6')]);rollUpEvent=!![];vp=window[_0x2738('0x1f')]+'x'+window[_0x2738('0x20')];if(arguments[0x2])dl=arguments[0x2];mf_SendRequest(baseMessage);}else if(arguments[0x1]==_0x2738('0x21')||arguments[0x1]==_0x2738('0x22')){if(arguments[0x2]!=null&&arguments[0x3]!=null){t=_0x2738('0x21');rollUpEvent=arguments[0x1]==_0x2738('0x21')?![]:!![];vp=window[_0x2738('0x1f')]+'x'+window[_0x2738('0x20')];var _0x2dcc5e='';var _0x514e45=encodeURIComponent(arguments[0x2]);_0x2dcc5e=_0x2dcc5e+_0x2738('0x23')+_0x514e45;var _0x52c7df=encodeURIComponent(arguments[0x3]);_0x2dcc5e=_0x2dcc5e+_0x2738('0x24')+_0x52c7df;if(typeof arguments[0x4]==_0x2738('0x25'))_0x2dcc5e=_0x2dcc5e+_0x2738('0x26')+encodeURIComponent(arguments[0x4]);else if(typeof arguments[0x4]==_0x2738('0x27')){for(var _0x591577=0x0;_0x591577<Object['keys'](arguments[0x4])[_0x2738('0x12')];_0x591577++){if(Object[_0x2738('0x28')](arguments[0x4])[_0x591577][_0x2738('0x29')]()[_0x2738('0x11')]('dimension')>-0x1){var _0x39a7de=Object[_0x2738('0x28')](arguments[0x4])[_0x591577][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');_0x2dcc5e=_0x2dcc5e+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x4][Object[_0x2738('0x28')](arguments[0x4])[_0x591577]];}}}if(typeof arguments[0x5]=='object'){for(var _0x591577=0x0;_0x591577<Object[_0x2738('0x28')](arguments[0x5])['length'];_0x591577++){if(Object[_0x2738('0x28')](arguments[0x5])[_0x591577][_0x2738('0x29')]()[_0x2738('0x11')]('dimension')>-0x1){var _0x39a7de=Object[_0x2738('0x28')](arguments[0x5])[_0x591577][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');_0x2dcc5e=_0x2dcc5e+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x5][Object[_0x2738('0x28')](arguments[0x5])[_0x591577]];}}}else if(typeof arguments[0x5]==_0x2738('0x25')||typeof arguments[0x5]==_0x2738('0x2b')){_0x2dcc5e=_0x2dcc5e+_0x2738('0x2c')+arguments[0x5];if(typeof arguments[0x6]=='object'){for(var _0x591577=0x0;_0x591577<Object[_0x2738('0x28')](arguments[0x6])[_0x2738('0x12')];_0x591577++){if(Object['keys'](arguments[0x6])[_0x591577]['toString']()[_0x2738('0x11')](_0x2738('0x2d'))>-0x1){var _0x39a7de=Object[_0x2738('0x28')](arguments[0x6])[_0x591577][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');_0x2dcc5e=_0x2dcc5e+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x6][Object[_0x2738('0x28')](arguments[0x6])[_0x591577]];}}}}mf_SendRequest(baseMessage+_0x2dcc5e);}}else{}}else if(arguments[0x0]==_0x2738('0x2e')){if(arguments[0x1]['toString']()['indexOf'](_0x2738('0x2d'))>-0x1){customMessage_flag=!![];var _0x39a7de=arguments[0x1][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');customMessage=customMessage+_0x2738('0x2a')+_0x39a7de+'='+arguments[0x2];}else if(arguments[0x1]['toString']()[_0x2738('0x11')](_0x2738('0x2f'))>-0x1){customMessage_flag=!![];var _0x39a7de=arguments[0x1][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');customMessage=customMessage+_0x2738('0x30')+_0x39a7de+'='+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()[_0x2738('0x11')](_0x2738('0x32'))>-0x1){baseMessage=baseMessage+_0x2738('0x33')+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()[_0x2738('0x11')]('ip')>-0x1){baseMessage=baseMessage+_0x2738('0x34')+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()[_0x2738('0x11')](_0x2738('0x35'))>-0x1){setCategory=arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x11')](_0x2738('0x36'))>-0x1){customMessage_flag=!![];var _0x39a7de=arguments[0x1][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');customMessage=customMessage+_0x2738('0x37')+_0x39a7de+'='+arguments[0x2];}else if(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x11')](_0x2738('0x3'))>-0x1){dt=encodeURIComponent(arguments[0x2]);}}else if(arguments[0x0]==_0x2738('0x38')){if(typeof arguments[0x1]==_0x2738('0x27')){input_ecommerce_product(arguments[0x1]);}}else if(arguments[0x0]==_0x2738('0x39')){if(typeof arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()==_0x2738('0x25')){ecommerceAction_flag=!![];ecommerceActionMessage='';ecommerceActionMessage=_0x2738('0x3a')+arguments[0x1];if(arguments[0x2])input_ecommerce_setAction(arguments[0x2]);if(arguments[0x1]['toString']()==_0x2738('0x3b'))input_ecommerce_setPurchase(arguments[0x2]);}else if(typeof(arguments[0x1][_0x2738('0x29')]()[_0x2738('0x31')]()==_0x2738('0x27'))){ecommerceAction_flag=!![];ecommerceActionMessage='';input_ecommerce_setAction(arguments[0x1]);}}}function input_ecommerce_setPurchase(_0x183760){if(_0x183760['id'])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x3c')+_0x183760['id'];if(_0x183760['affiliation'])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x3d')+_0x183760['affiliation'];if(_0x183760[_0x2738('0x3e')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x3f')+_0x183760[_0x2738('0x3e')];if(_0x183760[_0x2738('0x40')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x41')+_0x183760['tax'];if(_0x183760[_0x2738('0x42')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x43')+_0x183760['shipping'];if(_0x183760[_0x2738('0x44')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x45')+_0x183760[_0x2738('0x44')];}function input_ecommerce_setAction(_0x2696da){if(_0x2696da[_0x2738('0x46')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x47')+_0x2696da[_0x2738('0x46')];if(_0x2696da[_0x2738('0x48')])ecommerceActionMessage=ecommerceActionMessage+'&col='+_0x2696da[_0x2738('0x46')];if(_0x2696da[_0x2738('0x49')])ecommerceActionMessage=ecommerceActionMessage+_0x2738('0x4a')+_0x2696da[_0x2738('0x49')];}function input_ecommerce_product(_0x1440d6){if(_0x1440d6['id']&&_0x1440d6[_0x2738('0x4b')]){ecommerce_product[product_number-0x1]={'id':'','nm':'','br':'','ca':'','va':'','pr':'','qt':'','cc':'','ps':''};ecommerce_product_flag=!![];ecommerce_product[product_number-0x1]['id']=_0x1440d6['id'];ecommerce_product[product_number-0x1]['nm']=_0x1440d6['name'];ecommerce_product[product_number-0x1]['br']=_0x1440d6[_0x2738('0x4c')]?_0x1440d6[_0x2738('0x4c')]:null;ecommerce_product[product_number-0x1]['ca']=_0x1440d6[_0x2738('0x35')]?_0x1440d6[_0x2738('0x35')]:null;ecommerce_product[product_number-0x1]['va']=_0x1440d6[_0x2738('0x4d')]?_0x1440d6[_0x2738('0x4d')]:null;ecommerce_product[product_number-0x1]['pr']=_0x1440d6[_0x2738('0x4e')]?_0x1440d6[_0x2738('0x4e')]:null;ecommerce_product[product_number-0x1]['qt']=_0x1440d6[_0x2738('0x4f')]?_0x1440d6[_0x2738('0x4f')]:null;ecommerce_product[product_number-0x1]['cc']=_0x1440d6[_0x2738('0x44')]?_0x1440d6[_0x2738('0x44')]:null;ecommerce_product[product_number-0x1]['ps']=_0x1440d6[_0x2738('0x50')]?_0x1440d6[_0x2738('0x50')]:null;add_custom_dimension_metric(ecommerce_product[product_number-0x1],_0x1440d6);for(var _0x2e725c in Object[_0x2738('0x28')](ecommerce_product[product_number-0x1])){if(ecommerce_product[product_number-0x1][Object[_0x2738('0x28')](ecommerce_product[product_number-0x1])[_0x2e725c]])productMessage=productMessage+_0x2738('0x51')+product_number+Object['keys'](ecommerce_product[product_number-0x1])[_0x2e725c]+'='+ecommerce_product[product_number-0x1][Object[_0x2738('0x28')](ecommerce_product[product_number-0x1])[_0x2e725c]];}product_number++;}}function add_custom_dimension_metric(_0x57eb00,_0x22c1b2){for(var _0x2ef5f2 in Object[_0x2738('0x28')](_0x22c1b2)){if(Object['keys'](_0x22c1b2)[_0x2ef5f2]['toString']()[_0x2738('0x11')]('dimension')>-0x1){var _0x4a8027='cd'+Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2][_0x2738('0x29')]()['replace'](/[^0-9]/g,'');var _0x9b1a54=_0x22c1b2[Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2]];_0x57eb00[_0x4a8027]=_0x9b1a54;}if(Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2][_0x2738('0x29')]()[_0x2738('0x11')](_0x2738('0x2f'))>-0x1){var _0x4a8027='cm'+Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2][_0x2738('0x29')]()[_0x2738('0x8')](/[^0-9]/g,'');var _0x9b1a54=_0x22c1b2[Object[_0x2738('0x28')](_0x22c1b2)[_0x2ef5f2]];_0x57eb00[_0x4a8027]=_0x9b1a54;}}}function mf_SendRequest(_0x23ee02){_0x23ee02=_0x23ee02+_0x2738('0x52')+t+_0x2738('0x53')+vp+_0x2738('0x54')+dl+_0x2738('0x55')+dt;if(ecommerce_product_flag){ecommerce_product_flag=![];_0x23ee02=_0x23ee02+productMessage;productMessage='';product_number=0x1;}if(customMessage_flag){customMessage_flag=![];_0x23ee02=_0x23ee02+customMessage;customMessage='';}if(ecommerceAction_flag){ecommerceAction_flag=![];_0x23ee02=_0x23ee02+ecommerceActionMessage;}mf_SendRequestAPI(_0x23ee02+'&tid='+tid);if(rollUpEvent)mf_SendRequestAPI_rollup(_0x23ee02+'&tid=UA-100874847-1');}function mf_SendRequestAPI(_0x56a014){var _0x5080cd=document[_0x2738('0x6')][_0x2738('0x56')];var _0x36437b=_0x5080cd+'//'+serverIP+serverUrl;var _0x5c6ae5={'type':_0x2738('0x57'),'url':_0x36437b,'data':_0x56a014,'crossDomain':!![],'beforeSend':function(){},'success':function(_0x58e3b){},'error':function(_0x123462,_0x53dd04,_0x5af65f){}};$[_0x2738('0x58')](_0x5c6ae5);}function mf_SendRequestAPI_rollup(_0x71063a){var _0x3d20ec=document[_0x2738('0x6')][_0x2738('0x56')];var _0x2d812b=_0x3d20ec+'//'+serverIP+serverUrl;var _0xec2aa0={'type':_0x2738('0x57'),'url':_0x2d812b,'data':_0x71063a,'crossDomain':!![],'beforeSend':function(){},'success':function(_0x3f16b0){},'error':function(_0x2698b3,_0x5c89af,_0x2fc155){}};$[_0x2738('0x58')](_0xec2aa0);}function setCookie(_0x5edd04,_0x71c83b,_0x447244){var _0x28a95b=new Date();_0x28a95b[_0x2738('0x59')](_0x28a95b['getDate']()+_0x447244);cookies=_0x5edd04+'='+encodeURIComponent(_0x71c83b)+_0x2738('0x5a');if(typeof _0x447244!=_0x2738('0x5b'))cookies+=';domain=kt.com;expires='+_0x28a95b[_0x2738('0x5c')]()+';';document[_0x2738('0xd')]=cookies;}function getCookie(_0x5c068f){_0x5c068f=_0x5c068f+'=';var _0x1058f1=document[_0x2738('0xd')];var _0x3e97e2=_0x1058f1[_0x2738('0x11')](_0x5c068f);var _0x22c100='';if(_0x3e97e2!=-0x1){_0x3e97e2+=_0x5c068f[_0x2738('0x12')];var _0x32ae05=_0x1058f1['indexOf'](';',_0x3e97e2);if(_0x32ae05==-0x1)_0x32ae05=_0x1058f1[_0x2738('0x12')];_0x22c100=_0x1058f1[_0x2738('0x10')](_0x3e97e2,_0x32ae05);}return encodeURIComponent(_0x22c100);}function guid(){function _0x2084c4(){return Math[_0x2738('0x5d')]((0x1+Math[_0x2738('0x5e')]())*0x10000)[_0x2738('0x29')](0x10)[_0x2738('0x10')](0x1);}return _0x2084c4()+'-'+_0x2084c4()+'-'+_0x2084c4()+'-'+_0x2084c4()+_0x2084c4()+_0x2084c4();}function datalicious_cid(){var _0x145e36=getCookie(_0x2738('0x5f'));var _0x45903e;if(_0x145e36!=''){_0x45903e=_0x145e36;}else{var _0x7234a8=new Date();var _0x134140=_0x7234a8[_0x2738('0x60')]();_0x45903e=_0x134140+'-'+guid();setCookie(_0x2738('0x5f'),_0x45903e,0x16d);}return _0x45903e;}
		 ga('create', 'UA-100874847-2');
	 }else{
       function ga(e){
     	
       }
	 }
}
// End Google Tag Manager 

function MyPage_DMC(Cate,SOName,Lable) {
    //adobe Tag
    var SOCate = Cate;

    if(isAppChk){
        SOCate = "/+/"+Cate;
    }

    try {
        _satellite.track("service_order", {
            so_category : SOCate, // 발생 카테고리, 예시) 마이_상품, 마이_기타 등
            so_name : SOName,  // 발생 서비스명,  예시) 부가서비스, 즉시납부  등
            so_type : Lable // 예시) 신청, 변경, 해지, 정지
          });        
    } catch (e) {
        scode_log('adobe 연동 오류 (MyPage_DMC 연동 오류 : ' + e.message + ')');
    }

    // GA Tag
    ga('send', 'event', SOCate, SOName, Lable);
}

function ProductService_DMC(Productcode) {
  // GA Tagg
  ga('set', 'dimension17', Productcode);
}

function gaEventTracker(flag,category,action,label,cd){
  //flag True: 롤업속성에도 데이터 전송
  //flag False: 롤업속성에는 데이터 전송하지 않음
  ga('send', 'event', category, action, label, {'dimension19':cd});
  if(flag == true){ga('rollup.send', 'event', category, action, label, {'dimension19':cd});}
}

function gaSplitClickName(Click_Name){
  var Click_Set1 = "";
  var Click_Set2 = "";
  var Click_Set3 = "";
  try {
      var splitText = Click_Name.split('^');
      if(splitText.length <= 4){
          Click_Set1 = splitText[1] ? splitText[1] : '';
          Click_Set2 = splitText[2] ? splitText[2] : '';
          Click_Set3 = splitText[3] ? splitText[3] : Click_Set2;
      } else if(splitText.length > 4){
          Click_Set1 = splitText[1];
          Click_Set3 = splitText[splitText.length-1];
          for(i = 2; i<splitText.length-1; i++){
              Click_Set2 += "^"+splitText[i];
          }
          Click_Set2 = Click_Set2.substring(1, Click_Set2.length);
      }
  } catch(e) {

  }
  return {"Click_Set1":Click_Set1, "Click_Set2":Click_Set2, "Click_Set3":Click_Set3};
}


// End