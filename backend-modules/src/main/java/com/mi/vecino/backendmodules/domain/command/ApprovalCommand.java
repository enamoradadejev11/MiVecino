package com.mi.vecino.backendmodules.domain.command;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ApprovalCommand {

  private String status;
  private String message;

}
