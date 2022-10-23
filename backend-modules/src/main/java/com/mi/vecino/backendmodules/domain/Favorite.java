package com.mi.vecino.backendmodules.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Favorite {

  private long id;
  private String name;
  private String description;

  public Favorite(Emprendimiento emprendimiento) {
    this.id = emprendimiento.getId();
    this.name = emprendimiento.getName();
    this.description = emprendimiento.getDescription();
  }

}
