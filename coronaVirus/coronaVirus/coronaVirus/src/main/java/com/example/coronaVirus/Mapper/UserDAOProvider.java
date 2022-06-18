package com.example.coronaVirus.Mapper;

import com.example.coronaVirus.common.VirusInfo;
import org.apache.ibatis.jdbc.SQL;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sourceforge.pinyin4j.PinyinHelper;

import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;

import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;

import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;

import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;

import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;


public class UserDAOProvider {




   @Resource
    public String insertAll(Map<String,Object> map) {

        VirusInfo virusInfo = (VirusInfo) map.get("bean");
        SQL sql = new SQL();
        String table=virusInfo.getProvinceName();

        sql.INSERT_INTO(table);

        sql.VALUES("dateId", "\""+virusInfo.getDateId()+"\"");
        sql.VALUES("provinceName", "\""+virusInfo.getProvinceName()+"\"");
        sql.VALUES("confirmedCount", "\""+virusInfo.getConfirmedCount()+"\"");
        sql.VALUES("confirmedIncr", "\""+virusInfo.getConfirmedIncr()+"\"");
        sql.VALUES("curedCount", "\""+virusInfo.getCuredCount()+"\"");
        sql.VALUES("curedIncr", "\""+virusInfo.getCuredIncr()+"\"");
        sql.VALUES("currentConfirmedCount", "\""+virusInfo.getCurrentConfirmedCount()+"\"");
        sql.VALUES("currentConfirmedIncr", "\""+virusInfo.getCurrentConfirmedIncr()+"\"");
        sql.VALUES("deadCount", "\""+virusInfo.getDeadCount()+"\"");
        sql.VALUES("deadIncr", "\""+virusInfo.getDeadIncr()+"\"");
        sql.VALUES("highDangerCount", "\""+virusInfo.getHighDangerCount()+"\"");
        sql.VALUES("midDangerCount", "\""+virusInfo.getMidDangerCount()+"\"");
        sql.VALUES("suspectedCount", "\""+virusInfo.getSuspectedCount()+"\"");
        sql.VALUES("suspectedCountIncr", "\""+virusInfo.getSuspectedCountIncr()+"\"");




        return sql.toString();
    }


//    public static String getPingYin(String str) {
//
//
//            char t1[]=null;
//
//            t1=str.toCharArray();
//
//            String[] t2=new String[t1.length];
//
//            HanyuPinyinOutputFormat t3=new HanyuPinyinOutputFormat();
//
//            t3.setCaseType(HanyuPinyinCaseType.LOWERCASE);
//
//            t3.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
//
//            t3.setVCharType(HanyuPinyinVCharType.WITH_V);
//
//            String t4="";
//
//            int t0=t1.length;
//
//            try {
//
//                for ( int i = 0; i < t0; i++ ) {
//
////是用来判断是不是中文的一个条件，采用的是unicode编码
//
//                    if(Character.toString(t1[i]).matches("[\\u4E00-\\u9FA5]+")){
//
//                        t2= PinyinHelper.toHanyuPinyinStringArray(t1[i],t3);
//
//                        t4+=t2[0];
//
//                    }else {
//
//                        t4+=Character.toString(t1[i]);
//
//                    }
//
//                }
//
//                return t4;
//
//            } catch ( BadHanyuPinyinOutputFormatCombination badHanyuPinyinOutputFormatCombination ) {
//
//                badHanyuPinyinOutputFormatCombination.printStackTrace();
//
//            }
//
//            return t4;
//
//        }

}
