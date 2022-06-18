package com.example.coronaVirus;

import com.example.coronaVirus.services.VirusServiceI;
import com.example.coronaVirus.services.impl.VirusServiceImpl;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

//1
@EnableScheduling
@SpringBootApplication
@MapperScan("com.example.coronaVirus.Mapper")
public class CoronaVirusApplication {

	public static void main(String[] args) {

		SpringApplication.run(CoronaVirusApplication.class, args);
	}
}
