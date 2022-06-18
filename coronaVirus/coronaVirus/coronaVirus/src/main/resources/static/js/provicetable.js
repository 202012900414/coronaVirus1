function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]); return null;
}

var t1=GetQueryString("provice");

var t2=GetQueryString("filed");

let matchesKey = [];//存放日期
let matchesKey2 = [];//存放数据
$.ajax({
    // 请求地址
    url:"/pp?provice="+t1+"&filed="+t2,
    // 数据传输方式
    type:"get",

    async:false,
    // 从后台传到前台的数据类型
    dataType:"json",
    // 请求成功,function形参data用来接收从后台传过来的数据
    success:function(data){
        console.log(t1),
        console.log(t2),
        data=JSON.stringify(data);
        let reg1 = /\"(?<name>[^""]+)\"/g;
        // 匹配出日期字段
        let matches = [...data.matchAll(reg1)];

        matches.forEach(item => {
            let groups = item.groups;
            matchesKey.push(groups.name);
        });

        let reg2 = /\:(?<name>[^:,]+)\,/g;//匹配值
        let reg3 =/\:(?<name>[^:}]+)\}/g;//匹配值

        let matches2 = [...data.matchAll(reg2)];
        let matches3 = [...data.matchAll(reg3)];



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
        // console.log(matchesKey);
        // console.log(matchesKey2);

    },
    //请求失败
    error:function(){
        alert("选择栏未选中！")
    }

});

var str = ["anhui", "aomen", "beijing", "chongqing", "fujian", "gansu", "guangdong", "guangxi", "guizhou"
    , "hainan", "henan", "hebei", "hunan", "hubei", "heilongjiang", "jiangsu", "jiangxi", "jilin", "qinghai", "liaoning", "neimenggu"
    , "ningxia", "sanjin", "shanxi", "sichuan", "shandong", "shanghai", "tianjin", "taiwan", "xianggang", "xinjiang", "xizang", "zhejiang"
    , "yunnan"];
var provinceName=["安徽","澳门","北京","重庆","福建","甘肃","广东","广西","贵州","海南","河南","河北","湖南","湖北"
    ,"黑龙江","江苏","江西","吉林","青海","辽宁","内蒙古","宁夏","山西","陕西","四川","山东","上海","天津","台湾","香港",
    "新疆","西藏","浙江","云南"];
let t3="";
for (let i = 0; i <34 ; i++) {
    if(t1==str[i]) {
        t3 = provinceName[i];
        break;
    }
}
let judgefiel=[
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
let t4="";
for (let i = 0; i <12; i++) {
    if(t2==judgefiel[0]) t4 = "累积确诊人数"             ;
    if(t2==judgefiel[1]) t4 = "较昨日新增累积确诊人数";
    if(t2==judgefiel[2]) t4 = "累积治愈人数";
    if(t2==judgefiel[3]) t4 = "较昨日治愈人数";
    if(t2==judgefiel[4]) t4 = "当前确诊人数";
    if(t2==judgefiel[5]) t4 = "较昨日新增当前确诊人数";
    if(t2==judgefiel[6]) t4 = "累积死亡人数";
    if(t2==judgefiel[7]) t4 = "较昨日新增死亡人数";
    if(t2==judgefiel[8]) t4 = "高风险地区数";
    if(t2==judgefiel[9]) t4 = "中风险地区数";
    if(t2==judgefiel[10])t4 ="疑似感染人数";
    if(t2==judgefiel[11])t4 ="较昨日新增疑似感染人数";
}

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
let data=[];

for (let i = 0; i <30 ; i++) {


    data.push({ value: parseInt(matchesKey2[i]) , name: matchesKey[i] },);

}



const defaultPalette = [
    // '#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
];
const radius = ['20%', '100%'];
const pieOption = {
    series: [
        {
            type: 'pie',
            id: 'distribution',
            radius: radius,
            label: {
                show: true
            },
            universalTransition: true,
            animationDurationUpdate: 1000,
            data: data
        }
    ]
};
const parliamentOption = (function () {
    let sum = data.reduce(function (sum, cur) {
        return sum + cur.value;
    }, 0);
    let angles = [];
    let startAngle = -Math.PI / 2;
    let curAngle = startAngle;
    data.forEach(function (item) {
        angles.push(curAngle);
        curAngle += (item.value / sum) * Math.PI * 2;
    });
    angles.push(startAngle + Math.PI * 2);
    function parliamentLayout(startAngle, endAngle, totalAngle, r0, r1, size) {
        let rowsCount = Math.ceil((r1 - r0) / size);
        let points = [];
        let r = r0;
        for (let i = 0; i < rowsCount; i++) {
            // Recalculate size
            let totalRingSeatsNumber = Math.round((totalAngle * r) / size);
            let newSize = (totalAngle * r) / totalRingSeatsNumber;
            for (
                let k = Math.floor((startAngle * r) / newSize) * newSize;
                k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
                k += newSize
            ) {
                let angle = k / r;
                let x = Math.cos(angle) * r;
                let y = Math.sin(angle) * r;
                points.push([x, y]);
            }
            r += size;
        }
        return points;
    }

    return {
        title: {  //标题样式
            text: t3+'省(市)'+t4+'饼状过滤图',
            x: "left",
            textStyle: {
                fontSize: 35,
                color: "indianred",
                 fontFamily  :"微软雅黑"
            },

        },
        tooltip: {  //这里设置提示框
            trigger: 'item',  //数据项图形触发
            backgroundColor: "red",  //提示框浮层的背景颜色。
            show:true,
            //字符串模板(地图): {a}（系列名称），{b}（区域名称），{c}（合并数值）,{d}（无）{}表示{}中的键对应的值
            formatter: t3+"：{b}<br/>"+t4+"：{c}"
        },
        series: {
            type: 'custom',
            id: 'distribution',
            data: data,
            coordinateSystem: undefined,
            universalTransition: true,
            animationDurationUpdate: 1000,
            renderItem: function (params, api) {
                var idx = params.dataIndex;
                var viewSize = Math.min(api.getWidth(), api.getHeight());
                var r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
                var r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
                var cx = api.getWidth() * 0.5;
                var cy = api.getHeight() * 0.5;
                var size = viewSize / 50;
                var points = parliamentLayout(
                    angles[idx],
                    angles[idx + 1],
                    Math.PI * 2,
                    r0,
                    r1,
                    size + 3
                );
                return {
                    type: 'group',
                    children: points.map(function (pt) {
                        return {
                            type: 'circle',
                            autoBatch: true,
                            shape: {
                                cx: cx + pt[0],
                                cy: cy + pt[1],
                                r: size / 2
                            },
                            style: {
                                fill: defaultPalette[idx % defaultPalette.length]
                            }
                        };
                    })
                };
            }
        }
    };
})();

let currentOption = (option = pieOption);
setInterval(function () {
    currentOption = currentOption === pieOption ? parliamentOption : pieOption;
    myChart.setOption(currentOption);
}, 2000);





option && myChart.setOption(option);
// 指定图表的配置项和数据

var chartDom2 = document.getElementById('main2');
var myChart2 = echarts.init(chartDom2);
var option2;

option2 = {
    title: {  //标题样式
        text: t3+'省(市)'+t4+'折线图',
        x: "left",
        textStyle: {
            fontSize: 20,
            color: "indianred",
            fontFamily  :"微软雅黑"
        },

    },
    xAxis: {
        type: 'category',
        data: matchesKey,
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: matchesKey2,
            type: 'line'
        }
    ]
};

option && myChart2.setOption(option2);

var chartDom3 = document.getElementById('main3');
var myChart3 = echarts.init(chartDom3);

var option3 = {

    color: "red",
    title: {  //标题样式
        text: t3+'省(市)'+t4+'柱状图',
        x: "left",
        textStyle: {
            fontSize: 22,
            color: "indianred",
            fontFamily  :"微软雅黑"
        },

    },

    tooltip: {
        backgroundColor: 'azure',
        textStyle: {
            color:"skyblue",
        },

    },
    legend: {
        data: ['']
    },
    xAxis: {
        data: matchesKey,
        axisLine: {  //这是x轴文字颜色
            lineStyle: {
                color: "write",
                fontSize: 25
            }
        }

    },
    yAxis: {
        axisLine: {//这是y轴文字颜色
            lineStyle: {
                color: "black",
                fontSize: 25
            }
        }


    },
    series: [
        {
            name: '数量',
            type: 'bar',

            data: matchesKey2.map((item)=>{
                return {
                    value:item,
                    position:item>0?'right':'left',

                }
            }),


            itemStyle: {
                normal: {
                    label: {
                        show: true,		//开启显示
                        position: 'top',	//在上方显示
                        textStyle: {	    //数值样式
                            color: 'black',
                            fontSize: 10
                        }
                    }
                }
            }





        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart3.setOption(option3);

var chartDom4 = document.getElementById('main4');
var myChart4 = echarts.init(chartDom4);
var option4;

option4 = {
    title: {  //标题样式
        text: t3+'省(市)'+t4+'面积图',
        x: "left",
        textStyle: {
            fontSize: 22,
            color: "indianred",
            fontFamily  :"微软雅黑"
        },

    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
        }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        // prettier-ignore
        data: matchesKey
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} '
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [
            {
                lte: 6,
                color: 'red'
            },
            {
                gt: 6,
                lte: 8,
                color: 'red'
            },
            {
                gt: 8,
                lte: 14,
                color: 'green'
            },
            {
                gt: 14,
                lte: 17,
                color: 'red'
            },
            {
                gt: 17,
                color: 'green'
            },
            {
                gt: 17,
                lte: 22,
                color: 'red'
            },
        ]
    },
    series: [
        {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            areaStyle: {},
            symbol: 'none',
            // lineStyle: {
            //     color: '#5470C6',
            //     width: 5
            // },
            // prettier-ignore
            data: matchesKey2,
            markArea: {
                itemStyle: {
                    color: 'rgba(255, 173, 177, 0.4)'
                },
                data: [
                    [
                        {

                            xAxis: "2524"
                        },
                        {
                            xAxis: "2027"
                        }
                    ],
                    [
                        {

                            xAxis: "200"
                        },
                        {
                            xAxis: "213"
                        }
                    ]
                ]
            }
        }
    ]
};

option && myChart4.setOption(option4);