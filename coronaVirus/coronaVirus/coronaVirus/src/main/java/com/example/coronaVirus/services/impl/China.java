package com.example.coronaVirus.services.impl;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.coronaVirus.Mapper.mapper;
import com.example.coronaVirus.services.VirusServiceI2;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("cc")
public class China implements VirusServiceI2 {

    @Resource
    public mapper chinamapper;

    String str[] = {"anhui", "aomen", "beijing", "chongqing", "fujian", "gansu", "guangdong", "guangxi", "guizhou"
            , "hainan", "henan", "hebei", "hunan", "hubei", "heilongjiang", "jiangsu", "jiangxi", "jilin", "qinghai", "liaoning", "neimenggu"
            , "ningxia", "sanjin", "shanxi", "sichuan", "shandong", "shanghai", "tianjin", "taiwan", "xianggang", "xinjiang", "xizang", "zhejiang"
            , "yunnan"};
    String provinceName[]={"安徽","澳门","北京","重庆","福建","甘肃","广东","广西","贵州","海南","河南","河北","湖南","湖北"
            ,"黑龙江","江苏","江西","吉林","青海","辽宁","内蒙古","宁夏","山西","陕西","四川","山东","上海","天津","台湾","香港",
            "新疆","西藏","浙江","云南"};


    @Override
    public String searchLastDayData(String filed) {
        String jsonStr="";
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < str.length; i++) {
            String php = chinamapper.getFiledByTable1(filed, str[i]);
           if(i!=str.length-1)
            sb.append("\""+provinceName[i]+"\":"+php+",");
           else  sb.append("\""+provinceName[i]+"\":"+php);
        }
        jsonStr = "{"+sb.toString()+"}";
        return jsonStr ;
    }
}