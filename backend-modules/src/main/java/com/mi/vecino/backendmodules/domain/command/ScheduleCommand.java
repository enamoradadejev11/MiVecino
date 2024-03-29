package com.mi.vecino.backendmodules.domain.command;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ScheduleCommand {

  private final int dayId;
  private final String openingHour;
  private final String closingHour;

}
