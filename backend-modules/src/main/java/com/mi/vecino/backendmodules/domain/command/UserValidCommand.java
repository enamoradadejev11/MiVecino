package com.mi.vecino.backendmodules.domain.command;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserValidCommand {

  private String username;
  private String token;

}
