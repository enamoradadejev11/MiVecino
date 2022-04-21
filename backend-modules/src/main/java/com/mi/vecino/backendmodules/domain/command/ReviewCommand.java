package com.mi.vecino.backendmodules.domain.command;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReviewCommand {

  private final long emprendimientoId;
  private final int score;
  private final String comment;

}
