function omsTfn(){var a={campaignViewLog:function(a,o,t){var n=new omdaTInit;n.m.muCd=ot.m.muCd,n.pg.pgType="C",n.co.coVal1="VI",n.ca.caVal1=a,n.ca.caVal2=o,n.ca.caVal3=t,e.logCollect(n,!1)},campaignClickLog:function(a,o,t,n,l){var r=new omdaTInit;r.m.muCd=ot.m.muCd,r.pg.pgType="C",r.co.coVal1=n,r.co.coVal2=l,r.ca.caVal1=a,r.ca.caVal2=o,r.ca.caVal3=t,e.logCollect(r,!1)}},e={logCollect:function(a,o){if(e.isSupportBrowser()&&!e.isNullChk(a)){JSON.stringify(a);if(!e.isNullChk(a.m.muCd)){var t="";e.isCSAppChk()?(t="https://offer.onmas.kt.com/log/v1.0/kt/appcollect",a.a.apVal1="A",a.a.apVal6=e.getAppver()):t="https://offer.onmas.kt.com/log/v1.0/kt/mcollect",void 0!==o&&!0===o?e.sendSyncPostAjax(t,a):e.sendPostAjax(t,a)}}},sendPostAjax:function(a,e){$j.ajax({url:a,type:"POST",xhrFields:{withCredentials:!0},crossDomain:!0,dataType:"json",data:e,contentType:"application/x-www-form-urlencoded; charset=utf-8",error:function(){},success:function(){}})},sendSyncPostAjax:function(a,e){$j.ajax({url:a,type:"POST",async:!1,timeout:100,xhrFields:{withCredentials:!0},crossDomain:!0,dataType:"json",data:e,contentType:"application/x-www-form-urlencoded; charset=utf-8",error:function(){},success:function(){}})},isNullChk:function(a){var e=!1;return void 0!==a&&""!==a&&null!==a||(e=!0),e},getIEVersion:function(){var a,e="N/A",o=navigator.userAgent.toLowerCase();return"Microsoft Internet Explorer"===navigator.appName?a="msie ":o.search("trident")>-1?a="trident/.*rv:":o.search("edge/")>-1&&(a="edge/"),null!==new RegExp(a+"([0-9]{1,})(\\.{0,}[0-9]{0,1})").exec(o)&&(e=RegExp.$1+RegExp.$2),e},isSupportBrowser:function(){var a=!1,o=e.getIEVersion();return"N/A"!==o&&document.documentMode&&document.documentMode<parseFloat(o)&&(o=document.documentMode+""),("N/A"===o||parseFloat(o)>=10)&&(a=!0),a},getComCookie:function(a){var e=a+"=";return document.cookie.length>0&&(offset=document.cookie.indexOf(e),-1!==offset)?(offset+=e.length,end=document.cookie.indexOf(";",offset),-1===end&&(end=document.cookie.length),unescape(document.cookie.substring(offset,end))):""},isAppCheck:function(){var a=e.getComCookie("os"),o=e.getComCookie("appver");return void 0!==a&&null!==a&&""!==a&&void 0!==o&&null!==o&&""!==o},isCSAppChk:function(){var a=!1;return/ollehcs/i.test(navigator.userAgent)&&(a=!0),a},getAppver:function(){var a=e.getComCookie("appver");return void 0!==a&&null!==a&&""!==a||(a="N/A"),a}};return a}function omsTLog(){for(var a=this,e={ktId:"",gaId:""},o={muCd:""},t={pgType:""},n={coVal1:"",coVal2:""},l={caVal1:"",caVal2:"",caVal3:"",exeType:"",sgnlType:"",rtdEvtId:"",evSorcId:""},r={baVal1:"",baVal2:""},c=[],p={apVal1:"M",apVal2:"",apVal3:"",apVal4:"",apVal5:"",apVal6:"",apVal7:"S",apVal8:""},s={seVal1:"",seVal2:"",seVal3:"",seVal4:"",seVal5:""},i={cmpId:"",adId:""},u=0;u<3;u++){var d={prVal1:"",prVal2:"",prVal3:"",prVal4:"",prVal5:"",prVal6:"",prVal7:"",prVal8:""};c.push(d)}return a.u=e,a.m=o,a.pg=t,a.co=n,a.ca=l,a.b=r,a.p=c,a.a=p,a.s=s,a.e=i,a}function omdaTInit(){for(var a=this,e={ktId:"",gaId:""},o={muCd:""},t={pgType:""},n={coVal1:"",coVal2:""},l={caVal1:"",caVal2:"",caVal3:"",exeType:"",sgnlType:"",rtdEvtId:"",evSorcId:""},r={baVal1:"",baVal2:""},c=[],p={apVal1:"M",apVal2:"",apVal3:"",apVal4:"",apVal5:"",apVal6:"",apVal7:"S",apVal8:""},s={seVal1:"",seVal2:"",seVal3:"",seVal4:"",seVal5:""},i={cmpId:"",adId:""},u=0;u<3;u++){var d={prVal1:"",prVal2:"",prVal3:"",prVal4:"",prVal5:"",prVal6:"",prVal7:"",prVal8:""};c.push(d)}return a.svcNm="kt",a.u=e,a.m=o,a.pg=t,a.co=n,a.ca=l,a.b=r,a.p=c,a.a=p,a.s=s,a.e=i,a}var $j=jQuery.noConflict(),$=$j,ot=new omsTLog,trgt=new omsTfn;