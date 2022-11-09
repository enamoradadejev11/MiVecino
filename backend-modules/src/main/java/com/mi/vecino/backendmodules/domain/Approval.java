package com.mi.vecino.backendmodules.domain;

import com.mi.vecino.backendmodules.domain.command.ApprovalCommand;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Approval {

  private String status;
  private String message;
  private boolean notificationSent;

  public Approval(ApprovalCommand approvalCommand) {
    this.status = approvalCommand.getStatus();
    this.message = approvalCommand.getMessage();
    this.notificationSent = false;
  }

}
