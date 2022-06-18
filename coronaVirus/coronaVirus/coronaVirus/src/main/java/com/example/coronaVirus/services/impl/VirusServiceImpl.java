package com.example.coronaVirus.services.impl;

import javax.annotation.Resource;
import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;


import com.example.coronaVirus.Mapper.mapper;
import com.example.coronaVirus.common.VirusInfo;
import com.example.coronaVirus.services.VirusServiceI;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import static org.springframework.util.FileCopyUtils.copy;

@Service("chinesedata")
public class VirusServiceImpl implements VirusServiceI {
    @Resource
    public mapper m ;

    public static String getStr(File jsonFile) {
        String jsonStr = "";
        try {
            FileReader fileReader = new FileReader(jsonFile);//FileReader是针对字符型文件(后缀.txt)的流，也可以称其为字符流
            Reader reader = new InputStreamReader(new FileInputStream(jsonFile), "GBK");//Read是字符流的类
            int ch = 0;//ch为返回添加到缓冲区的字符数
            StringBuffer sb = new StringBuffer();
            while ((ch = reader.read()) != -1) {             //尝试将字符读入指定的字符缓冲区，如果此字符源在其末尾，则返回-1。
                sb.append((char) ch);
            }
            fileReader.close();
            reader.close();
            jsonStr = sb.toString();
            return jsonStr;            //返回json文件对应的字符串
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }

   @Scheduled(cron = "0 0 17 * * ? ")
    public String shuiLing () {
        String json = "C:/Users/a3051/Desktop/covid-19-datacrawl/chinesedata.json";
        File jsonFile = new File(json);
        String jsonData = getStr(jsonFile);

        return jsonData;

    }
    @Scheduled(cron = "0 0 17 * * ? ")
    public   String in() {


        String json = "C:/Users/a3051/Desktop/covid-19-datacrawl/corona_virus.json";
        File jsonFile = new File(json);
        String jsonData = getStr(jsonFile);
        //System.out.println(jsonData);
        JSONArray jsonArray = JSON.parseArray(jsonData);
        Iterator<Object> it = jsonArray.iterator();
        while (it.hasNext()) {
            JSONObject ob = (JSONObject) it.next();
            int l = m.getdateIdByTable(ob.getString("provinceShortName"), ob.getString("dateId"));
            if (l >= 1) continue;
            ;
            VirusInfo virusInfo = new VirusInfo();
            virusInfo.setDateId(ob.getString("dateId"));
            String provincetName = ob.getString("provinceShortName");
            virusInfo.setProvinceName(ob.getString("provinceShortName"));
            virusInfo.setConfirmedCount(ob.getString("confirmedCount"));
            virusInfo.setConfirmedIncr(ob.getString("confirmedIncr"));
            virusInfo.setCuredCount(ob.getString("curedCount"));
            virusInfo.setCuredIncr(ob.getString("curedIncr"));
            ;
            virusInfo.setCurrentConfirmedCount(ob.getString("currentConfirmedCount"));
            virusInfo.setCurrentConfirmedIncr(ob.getString("currentConfirmedIncr"));
            virusInfo.setDeadCount(ob.getString("deadCount"));
            virusInfo.setDeadIncr(ob.getString("deadIncr"));
            virusInfo.setHighDangerCount(ob.getString("highDangerCount"));
            virusInfo.setMidDangerCount(ob.getString("midDangerCount"));
            virusInfo.setSuspectedCount(ob.getString("suspectedCount"));
            virusInfo.setSuspectedCountIncr(ob.getString("suspectedCountIncr"));


//				System.out.println(ob.getString("deadCount"));

            m.insertAll(virusInfo);

        }
        return "{\"alert\":\"Database has been readed\"}";
    }

}
