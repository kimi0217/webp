$(function (){
    $.ajax({
        type: 'GET',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24top=30&%24format=JSON' , //欲呼叫之API網址(乘車時間)
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: function (Data) {
            var json=JSON.stringify(Data);
            console.log(json);

            //將車站名稱匯入
            $('#a1').text(Data[0].TravelTimes[0].FromStationName.Zh_tw);
            for(var i=0;i<=20;i++) {
                $('#a'+(i+2)).text(Data[0].TravelTimes[i].ToStationName.Zh_tw);
            }

            //將搭乘時間匯入
            var tmp=0;
            for(var i=0;i<=19;i++) {
                $('#time'+(i+1)).append(((Data[0].TravelTimes[i].RunTime-tmp)/60)+' 分鐘');
                tmp=Data[0].TravelTimes[i].RunTime;
            }
        }
    });
});

function GetAuthorizationHeader() {
    var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}