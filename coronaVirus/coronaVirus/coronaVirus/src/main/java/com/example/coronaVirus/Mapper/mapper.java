package com.example.coronaVirus.Mapper;

import com.example.coronaVirus.common.Cities;
import com.example.coronaVirus.common.VirusInfo;
import com.example.coronaVirus.Mapper.UserDAOProvider;
import org.apache.ibatis.annotations.*;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.BaseStream;

@Mapper
public interface mapper  {
    @InsertProvider(type = UserDAOProvider.class, method = "insertAll")
    void insertAll(@Param("bean")VirusInfo virusInfo);

//    @InsertProvider(type = CitiesinsertAll.class, method = "citiesinsertAll")
//    void citiesinsertAll(@Param("bean")Cities cities);

    @Select("SELECT ${filed} FROM ${table} ORDER BY dateId desc LIMIT 1;")
    String getFiledByTable1(String filed,String table);

    @Select("SELECT ${filed} FROM ${table} ORDER BY dateId desc LIMIT 30;")
    List<String> getFiledByTable30(String filed,String table);

    @Select("SELECT dateId FROM ${table} ORDER BY dateId desc LIMIT 30;")
    List<String> getdateIdByTable30(String table);
    @Select("SELECT count(*) FROM ${table} where dateId=${dateId};")
    int getdateIdByTable(String table,String dateId);

    @Select("SELECT cityName FROM ${table} ")
    List<String> getdataBycityTable1(String table);

    @Select("SELECT confirmedCount FROM ${table} ")
    List<String> getdataBycityTable2(String table);

}
