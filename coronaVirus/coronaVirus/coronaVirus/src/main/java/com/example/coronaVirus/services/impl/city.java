package com.example.coronaVirus.services.impl;

import com.example.coronaVirus.Mapper.mapper;
import com.example.coronaVirus.services.VirusServiceI4;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("citydata")
public class city implements VirusServiceI4 {
    @Resource
    mapper c;
    @Override
    public String getdataBycityTable(String cityname) {

        List<String> citynamelist=c.getdataBycityTable1(cityname);

        List<String> confirmedCountlist=c.getdataBycityTable2(cityname);
        String jsonStr="";
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i <citynamelist.size() ; i++) {
            String a=citynamelist.get(i);
            String b=confirmedCountlist.get(i);
            if(i<citynamelist.size()-1)
                sb.append("\""+a+"\":"+b+",");
            else  sb.append("\""+a+"\":"+b);
        }
        jsonStr = "{"+sb.toString()+"}";
        System.out.println(jsonStr);
        return jsonStr ;

    }
}
