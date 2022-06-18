package com.example.coronaVirus.Controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.coronaVirus.common.Params;
import com.example.coronaVirus.services.VirusServiceI;
import com.example.coronaVirus.services.VirusServiceI2;
import com.example.coronaVirus.services.VirusServiceI3;
import com.example.coronaVirus.services.VirusServiceI4;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
public class VirusController {

    @Resource(name = "pp")
    private VirusServiceI3 virusServiceI3;

    @Resource(name = "cc")
    private VirusServiceI2 virusServiceI2;

    @Resource(name = "chinesedata")
    private VirusServiceI chinesedata;
    @Resource(name = "citydata")
    private VirusServiceI4 virusServiceI4;

    @GetMapping( "/chinesedata")
    public String chinesedata( ){
        System.out.println("ok");

        return  chinesedata.shuiLing();
    }
    @GetMapping( "/in")
    public String in( ){
        return  chinesedata.in();
    }

    @GetMapping( "/citydata")
    public String citydata(String cityname ){
        System.out.println(cityname);
      virusServiceI4.getdataBycityTable(cityname);
            return virusServiceI4.getdataBycityTable(cityname);
    }


    @GetMapping( "/pp")
    public String Provice( Params params){
        String  p=params.getProvice();
        String  f=params.getFiled();


        return  virusServiceI3.searchLast30DayData(f,p);
    }




    @GetMapping("/cc")
    public String China(String filed){

        return  virusServiceI2.searchLastDayData(filed);
    }
}
