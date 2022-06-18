
var resStr=[];
let t1=5000;
let t3='地区：{b}<br/>累积确诊人数：{c}';;
let t4=0;

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]); return null;
}


var t2=GetQueryString("fed");


let judgefield=[
    "confirmedCount",//0
    "confirmedIncr",//1
    "curedCount",//2
    "curedIncr",//3
    "currentConfirmedCount",//4
    "currentConfirmedIncr",//5
    "deadCount",//6
    "deadIncr",//7
    "highDangerCount",//8
    "midDangerCount",//9
    "suspectedCount",//10
    "suspectedCountIncr"]//11
for (let i = 0; i <12; i++) {
    if(t2==judgefield[0]) {t1 = 9000;t3='地区：{b}<br/>累积确诊人数：{c}';}
    if(t2==judgefield[1]) {t1 = 200;t3="地区：{b}<br/>较昨日新增累积确诊人数：{c}";}
    if(t2==judgefield[2]) {t1 = 15000;t3="地区：{b}<br/>累积治愈人数：{c}";}
    if(t2==judgefield[3]) {t1 = 100;t3="地区：{b}<br/>较昨日治愈人数：{c}";}
    if(t2==judgefield[4]) {t1 = 1000;t3="地区：{b}<br/>当前确诊人数：{c}";}
    if(t2==judgefield[5]) {t1 = 1000;t3="地区：{b}<br/>较昨日新增当前确诊人数：{c}";t4=-50;}
    if(t2==judgefield[6]) {t1 = 1000;t3="地区：{b}<br/>累积死亡人数：{c}";}
    if(t2==judgefield[7]) {t1 = 1000;t3="地区：{b}<br/>较昨日新增死亡人数：{c}";}
    if(t2==judgefield[8]) {t1 = 30;t3="地区：{b}<br/>高风险地区数：{c}";}
    if(t2==judgefield[9]) {t1 = 30;t3="地区：{b}<br/>中风险地区数：{c}";}
    if(t2==judgefield[10]) {t1 = 100;t3="地区：{b}<br/>疑似感染人数：{c}";}
    if(t2==judgefield[11]) {t1 = 100;t3="地区：{b}<br/>较昨日新增疑似感染人数：{c}";t4=-10;}
}

let matchesKey = [];//存放省份
let matchesKey2 = [];//存放数据
$.ajax({
    // 请求地址
    url:"/cc?filed="+t2,
    // 数据传输方式
    type:"get",

    async:false,
    // 从后台传到前台的数据类型
    dataType:"json",
    // 请求成功,function形参data用来接收从后台传过来的数据
    success:function(data){
        data=JSON.stringify(data);
        let reg1 = /\"(?<name>[^""]+)\"/g;
        // 匹配出所字段
        let matches = [...data.matchAll(reg1)];

        matches.forEach(item => {
            let groups = item.groups;
            matchesKey.push(groups.name);
        });

        let reg2 = /\:(?<name>[^:,]+)\,/g;
        let reg3 =/\:(?<name>[^:}]+)\}/g;
        // 匹配出所字段
        let matches2 = [...data.matchAll(reg2)];
        let matches3 = [...data.matchAll(reg3)];
        let groups3 = matches3.groups;


        matches2.forEach(item => {
            let groups = item.groups;
            matchesKey2.push(groups.name);
        });

        let matchesKey3 = [];
        matches3.forEach(item => {
            let groups = item.groups;
            matchesKey3.push(groups.name);
        });

        matchesKey2.push(matchesKey3[0]);

        let jsonstr=[];
        for (let i = 0; i <34 ; i++) {
            jsonstr.push( '{ name: \''+matchesKey[i]+"', value: "+matchesKey2[i]+'}');

        }

        resStr = "["+jsonstr.join(",")+"]";
        resStr= resStr.replace(/\"/g, "");

    },
    //请求失败
    error:function(){
        alert("选择栏未选中！")
    }

});


resStr=eval("(" + resStr + ")");

// 初始化echarts实例
var myEcharts = echarts.init(document.getElementById("box"));
var option = {
    title: {  //标题样式
        text: '疫情中国地图',
        x: "center",
        textStyle: {
            fontSize: 25,
            color: "red"
        },
    },
    tooltip: {  //这里设置提示框
        trigger: 'item',  //数据项图形触发
        backgroundColor: "red",  //提示框浮层的背景颜色。
        //字符串模板(地图): {a}（系列名称），{b}（区域名称），{c}（合并数值）,{d}（无）
        formatter: t3
    },
    visualMap: {//视觉映射组件
        top: 'center',
        left: 'left',
        min: t4,
        max: t1,
        text: ['High', 'Low'],
        realtime: false,  //拖拽时，是否实时更新
        calculable: true,  //是否显示拖拽用的手柄
        inRange: {
            color: ['lightskyblue','skyblue','orchid','coral', 'greenyellow','yellow', 'orangered','red']
        }
    },
    series: [
        {
            name: '累积确诊人数',
            type: 'map',
            mapType: 'china',
            roam: false,//是否开启鼠标缩放和平移漫游
            itemStyle: {//地图区域的多边形 图形样式
                normal: {//是图形在默认状态下的样式
                    label: {
                        show: true,//是否显示标签
                        textStyle: {
                            color: "black"
                        }
                    }
                },
                zoom: 1.5,  //地图缩放比例,默认为1
                emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                    label: { show: true }
                }
            },
            top: "3%",//组件距离容器的距离
            data: resStr,
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myEcharts.setOption(option);
console.log(resStr);
console.log(matchesKey2)