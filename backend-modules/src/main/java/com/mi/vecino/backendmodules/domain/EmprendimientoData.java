package com.mi.vecino.backendmodules.domain;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EmprendimientoData {

  private long id;
  private String name;
  private String description;
  private String type;
  private String imageUrl;
  private List<Telephone> telephones;
  private boolean active;
  private float rating;

  public EmprendimientoData(Emprendimiento emprendimiento, float rating) {
    this.id = emprendimiento.getId();
    this.name = emprendimiento.getName();
    this.description = emprendimiento.getDescription();
    this.type = emprendimiento.getType();
    this.imageUrl = emprendimiento.getImageUrl();
    this.telephones = emprendimiento.getTelephones();
    this.active = emprendimiento.isActive();
    this.rating = rating;
  }

}
