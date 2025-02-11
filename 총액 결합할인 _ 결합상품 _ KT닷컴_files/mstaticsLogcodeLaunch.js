//adobe cashing 해결을 위한 버전 추가
var adobeVersion = '?version=22122201';

// 개발 환경에 따른 URL 설정
var adobeProperties = 'prd';
var adobeCfmdomain = '';
var adobePluginUrl = '';

switch (adobeProperties){
    case 'tb' :  // tb        
        adobeCfmdomain = 'https://m' + adobeProperties + '.kt.com';
        adobePluginUrl = '3212917f397b/0691ab9875d4/launch-75083fa72008-development.min.js' + adobeVersion;
        break;

    default :   // 기본
        adobeCfmdomain = 'https://m.kt.com';
        adobePluginUrl = '3212917f397b/0691ab9875d4/launch-8ceb30464d3a.min.js' + adobeVersion;
        break;
}

// 구버전 adobe _satellite.pageBottom 호출 여부 (Y: 미호출)
var kt_adobeLaunch = 'Y';

//CMS adobe 연동여부 체크-2차
try {
    if(cfmAdobeUseYn != 'N') cfmAdobeUseYn = 'Y';
} catch (error) {
    cfmAdobeUseYn = 'Y';
}

document.write('<script type="text/javascript" src="'+ adobeCfmdomain +'/js/ADOBE/s_codeLaunch.js' + adobeVersion + '"></script>');

if(cfmAdobeUseYn != 'N'){
    document.write('<script type="text/javascript" src="'+ adobeCfmdomain +'/js/ADOBE/'+ adobePluginUrl + '" async></script>');
}