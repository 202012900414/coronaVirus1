package com.example.coronaVirus.services.impl;

import com.example.coronaVirus.Mapper.mapper;
import com.example.coronaVirus.services.VirusServiceI3;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service("pp")
public class Prprovince implements VirusServiceI3 {
    @Resource
    public mapper prprovicemapper;
    @Override
    public String searchLast30DayData(String filed,String table) {
        List<String> dateIdList=prprovicemapper.getdateIdByTable30(table);

        List<String> filedList= prprovicemapper.getFiledByTable30(filed,table);
        String jsonStr="";
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i <30 ; i++) {
            String a=dateIdList.get(i);
            String b=filedList.get(i);
            if(i<29)
                sb.append("\""+a+"\":"+b+",");
            else  sb.append("\""+a+"\":"+b);
        }
        jsonStr = "{"+sb.toString()+"}";
        return jsonStr ;
    }
}

