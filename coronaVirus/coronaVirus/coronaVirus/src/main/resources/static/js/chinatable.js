
const  pre= ["anhui", "aomen", "beijing", "chongqing", "fujian", "gansu", "guangdong", "guangxi", "guizhou"
    , "hainan", "henan", "hebei", "hunan", "hubei", "heilongjiang", "jiangsu", "jiangxi", "jilin", "qinghai", "liaoning", "neimenggu"
    , "ningxia", "sanjin", "shanxi", "sichuan", "shandong", "shanghai", "tianjin", "taiwan", "xianggang", "xinjiang", "xizang", "zhejiang"
    , "yunnan"];
const  pr=["安徽","澳门","北京","重庆","福建","甘肃","广东","广西","贵州","海南","河南","河北","湖南","湖北"
    ,"黑龙江","江苏","江西","吉林","青海","辽宁","内蒙古","宁夏","山西","陕西","四川","山东","上海","天津","台湾","香港",
    "新疆","西藏","浙江","云南"];
var table=document.createElement( "table" );
table.setAttribute( "border", "5");
table.setAttribute( "width", "800px");
table.style.height="auto";
table.style.backgroundColor="aqua";
table.style.marginLeft="375px";
table.style.textAlign="center";
table.style.borderRadius="20px";
for(var i=0;i<35;i++){
    var tr=document.createElement( "tr" );
    tr.style.color="skyblue";
    tr.style.borderRadius="3px";
    for(var j=1;j<=2;j++){
        var td=document.createElement( "td" );
        td.style.borderRadius="3px";
        td.style.color="blue";
        td.style.height="40px";
        td.style.fontSize="50px";
        td.style.fontFamily="song体";
        td.style.fontWeight="Bold";
        if(i==0 && j==1)td.innerText="地区";
        if(i==0 && j==2)td.innerText=t3.replace(/地区：{b}<br|：{c}|\/>/g, "");
        if(i!=0 &&j==1)td.innerText=pr[i-1];
        if(i!=0 &&j==2)td.innerText=matchesKey2[i-1];
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body .appendChild(table);


