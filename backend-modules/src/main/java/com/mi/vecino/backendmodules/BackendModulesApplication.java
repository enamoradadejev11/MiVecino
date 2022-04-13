package com.mi.vecino.backendmodules;

import static com.mi.vecino.backendmodules.constant.FileConstant.EMPRENDIMIENTO_FOLDER;
import static com.mi.vecino.backendmodules.constant.FileConstant.USER_FOLDER;

import java.io.File;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendModulesApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendModulesApplication.class, args);
    new File(USER_FOLDER).mkdirs();
    new File(EMPRENDIMIENTO_FOLDER).mkdirs();
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
