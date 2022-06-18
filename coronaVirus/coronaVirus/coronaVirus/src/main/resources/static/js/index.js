
document.getElementById("time").style.fontFamily="微软雅黑";
document.getElementById("time").style.fontStyle="30px";
$.ajax({
    // 请求地址
    url:"/chinesedata",
    // 数据传输方式
    type:"get",
    async:true,
    // 从后台传到前台的数据类型
    dataType:"json",
    // 请求成功,function形参data用来接收从后台传过来的数据
    success:function(data){
        data=JSON.stringify(data);
        document.getElementById("confirmedCount").innerText=data.match(/"confirmedCount":(\d+)/g).toString().replace("\"confirmedCount\":","");
        document.getElementById("confirmedCountIncr").innerText=data.match(/"confirmedCountIncr":(\d+)/g).toString().replace("\"confirmedCountIncr\":","");
        document.getElementById("deadIncr").innerText=data.match(/"deadIncr":(\d+)/g).toString().replace("\"deadIncr\":","");
        document.getElementById("deadCount").innerText=data.match(/"deadCount":(\d+)/g).toString().replace("\"deadCount\":","");
        document.getElementById("outsideInputCount").innerText=data.match(/"outsideInputCount":(\d+)/g).toString().replace("\"outsideInputCount\":","");
        document.getElementById("outsideInputIncr").innerText=data.match(/"outsideInputIncr":(\d+)/g).toString().replace("\"outsideInputIncr\":","");
        document.getElementById("curedCount").innerText=data.match(/"curedCount":(\d+)/g).toString().replace("\"curedCount\":","");
        document.getElementById("curedIncr").innerText=data.match(/"curedIncr":(\d+)/g).toString().replace("\"curedIncr\":","");
        document.getElementById("asymptomaticInfectionCount").innerText=data.match(/"asymptomaticInfectionCount":(\d+)/g).toString().replace("\"asymptomaticInfectionCount\":","");
        document.getElementById("ai").innerText=data.match(/"asymptomaticInfectionIncr":(-\d+)/g).toString().replace("\"asymptomaticInfectionIncr\":","");
        document.getElementById("ai").style.fontFamily="微软雅黑";
    },
    //请求失败
    error:function(){
        alert("失败！")
    }
});
