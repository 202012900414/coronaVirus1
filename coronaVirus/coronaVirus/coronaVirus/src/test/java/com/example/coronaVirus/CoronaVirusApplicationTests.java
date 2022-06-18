package com.example.coronaVirus;

import com.alibaba.fastjson.JSON;

import com.alibaba.fastjson.JSONArray;

import com.alibaba.fastjson.JSONObject;

import com.example.coronaVirus.Mapper.mapper;
import com.example.coronaVirus.common.Cities;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


import javax.annotation.Resource;
import java.io.*;
import java.util.Iterator;


@SpringBootTest
class CoronaVirusApplicationTests {


	public static String getStr(File jsonFile) {
		String jsonStr = "";
		try {
			FileReader fileReader = new FileReader(jsonFile);//FileReader是针对字符型文件(后缀.txt)的流，也可以称其为字符流
			Reader reader = new InputStreamReader(new FileInputStream(jsonFile), "gbk");//Read是字符流的类
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

	@Resource
	public mapper m;



  @Test
	public   void contextLoads() {


		String json = "C:/Users/a3051/Desktop/covid-19-datacrawl/cities_virus.json";
		File jsonFile = new File(json);
		String jsonData = CoronaVirusApplicationTests.getStr(jsonFile);
	  System.out.println(jsonData);
		JSONArray jsonArray = JSON.parseArray(jsonData);
		Iterator<Object> it = jsonArray.iterator();
		while(it.hasNext()){
			JSONObject ob = (JSONObject) it.next();
//           int l=m.getdateIdByTable(ob.getString("provinceShortName"),ob.getString("cityName"));
//			if(l>=1)continue;;
			Cities cities=new Cities();
			cities.setCurrentConfirmedCount(ob.getString("currentConfirmedCount"));
			cities.setProvinceShortName(ob.getString("provinceShortName"));
			cities.setCityName(ob.getString("cityName"));


			System.out.println(cities);


//	   m.citiesinsertAll(cities);

		}

	}






}






















































//			if(ob.getString("provinceShortName")!=null)
//					{
//					System.out.print(ob.getString("dateId"));//1
//					System.out.print("  ");
//					System.out.print(ob.getString("provinceShortName"));//2
//					System.out.print("  ");
//					System.out.print(ob.getString("confirmedCount"));//3
//					System.out.print("  ");
//					System.out.print(ob.getString("confirmedIncr"));//4
//					System.out.print("  ");
//					System.out.print(ob.getString("curedCount"));//5
//					System.out.print("  ");
//					System.out.print(ob.getString("curedIncr"));//6
//					System.out.print("  ");
//					System.out.print(ob.getString("currentConfirmedCount"));//7
//					System.out.print("  ");
//					System.out.print(ob.getString("currentConfirmedIncr"));//8
//					System.out.print("  ");
//					System.out.print(ob.getString("deadCount"));//9
//					System.out.print("  ");
//					System.out.print(ob.getString("deadIncr"));//10
//					System.out.print("  ");
//					System.out.print(ob.getString("highDangerCount"));//11
//					System.out.print("  ");
//					System.out.print(ob.getString("midDangerCount"));//12
//					System.out.print("  ");
//					System.out.print(ob.getString("suspectedCount"));//13
//					System.out.print("  ");
//					System.out.print(ob.getString("suspectedCountIncr"));//14
//					System.out.print("  ");
//					System.out.print("\n");
//					}