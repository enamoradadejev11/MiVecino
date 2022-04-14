package com.mi.vecino.backendmodules.domain.command;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ScheduleCommand {

  private int dayId;
  private String openingHour;
  private String closingHour;

}
