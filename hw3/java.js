var TF=false;
var str='';
var input;

var text=document.getElementById("text");
var start=document.getElementById("start");
var queseng=document.getElementById("queseng");

text.addEventListener('keydown', main);
start.addEventListener('click', TF_true);

function main() {
	if(TF==true)
    {
		input=document.getElementById("text").value; 
		document.getElementById("enter").innerText=input;

		if(str[str.length-1]==input[input.length-1])
		{
			str=str.substring(0, str.length-1);
		}
	}
	setTimeout(main, 100); //刷新
}

//遊戲開始
function TF_true() {
	TF=true;
	setInterval(randomeng, 1000);
}

//產生隨機英文
function randomeng()
{
	if(TF==true)
	{
		str=String.fromCharCode(Math.floor(Math.random()*26+97))+str;
		document.getElementById("queseng").innerText=str;
	}
}