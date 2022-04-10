var eng=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//window.alert(eng.length);

var input;

var eng1=[];
var eng1position=-1;

var eng2=[];
var eng2position=-1;

var eng3=[];
var eng3position=-1;

var eng4=[];
var eng4position=-1;

var eng5=[];
var eng5position=-1;

var eng6=[];
var eng6position=-1;

$('#start').click(TF_true);

$('#inputeng').keydown(showinput);

//$('#inputeng').keydown(showeng);

function TF_true() {
    setInterval(showeng, 1000);
    setInterval(deleng, 1000);
    setInterval(endgame, 1000);
}

function showeng() {
    //產生亂數
    var rand1=Math.floor(Math.random()*eng.length);

    //將英文丟到陣列最前面
    eng1.unshift(eng[rand1]);

    //陣列位置數量++
    eng1position++;

    //顯示
    $('#eng1').text(eng1);

    var rand2=Math.floor(Math.random()*eng.length);
    eng2.unshift(eng[rand2]);
    eng2position++;
    $('#eng2').text(eng2);

    var rand3=Math.floor(Math.random()*eng.length);
    eng3.unshift(eng[rand3]);
    eng3position++;
    $('#eng3').text(eng3);

    var rand4=Math.floor(Math.random()*eng.length);
    eng4.unshift(eng[rand4]);
    eng4position++;
    $('#eng4').text(eng4);

    var rand5=Math.floor(Math.random()*eng.length);
    eng5.unshift(eng[rand5]);
    eng5position++;
    $('#eng5').text(eng5);

    var rand6=Math.floor(Math.random()*eng.length);
    eng6.unshift(eng[rand6]);
    eng6position++;
    $('#eng6').text(eng6);
}

function showinput() {
    $('#beeninput').text($('#inputeng').val());

    //刷新
    setTimeout(showinput, 100);
}

function deleng() {
    input=$('#inputeng').val();

    if((input.substr(-1))==eng1[eng1position]) {
        eng1.pop();
        $('#eng1').text(eng1);

        eng1position--;
    }

    if((input.substr(-1))==eng2[eng2position]) {
        eng2.pop();
        $('#eng2').text(eng2);

        eng2position--;
    }

    if((input.substr(-1))==eng3[eng3position]) {
        eng3.pop();
        $('#eng3').text(eng3);

        eng3position--;
    }

    if((input.substr(-1))==eng4[eng4position]) {
        eng4.pop();
        $('#eng4').text(eng4);

        eng4position--;
    }

    if((input.substr(-1))==eng5[eng5position]) {
        eng5.pop();
        $('#eng5').text(eng5);

        eng5position--;
    }

    if((input.substr(-1))==eng6[eng6position]) {
        eng6.pop();
        $('#eng6').text(eng6);

        eng6position--;
    }

    setTimeout(deleng, 100);
}

function endgame() {
    if((eng1position>=95)||(eng2position>=95)||(eng3position>=95)||(eng4position>=95)||(eng5position>=95)||(eng6position>=95)) {
        window.alert('Game Over !');
    }
}