package com.example.coronaVirus.common;

import lombok.Data;

@Data
public class VirusInfo {
    String  dateId;//日期
    String provinceName;//省份
    String confirmedCount;//累积确诊人数
    String confirmedIncr;//较昨日新增确诊人数
    String curedCount;//累积治愈人数
    String curedIncr;//较昨日新增治愈人数
    String currentConfirmedCount;//当前确诊人数
    String currentConfirmedIncr;//当前新增确诊人数
    String deadCount;//累积死亡人数
    String deadIncr;//较昨日新增死亡人数
    String highDangerCount;//高风险地区数量
    String midDangerCount;//中风险地区数量
    String suspectedCount;//疑似感染者人数
    String suspectedCountIncr;//新增疑似感染者人数
    String num;

}
