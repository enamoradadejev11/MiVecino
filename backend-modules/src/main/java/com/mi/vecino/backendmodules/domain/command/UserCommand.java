package com.mi.vecino.backendmodules.domain.command;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCommand {


  private String username;
  private String fullName;
  private String email;
  private String gender;
  private Date birthDate;
  private String password;

}
