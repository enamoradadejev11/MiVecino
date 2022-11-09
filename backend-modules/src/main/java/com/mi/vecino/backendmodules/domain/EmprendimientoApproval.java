package com.mi.vecino.backendmodules.domain;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EmprendimientoApproval {
  private long id;
  private String name;
  private String description;
  private String type;
  private List<String> categories;

  public EmprendimientoApproval(Emprendimiento emprendimiento) {
    this.id = emprendimiento.getId();
    this.name = emprendimiento.getName();
    this.description = emprendimiento.getDescription();
    this.type = emprendimiento.getType();
    this.categories = categoriesAsString(emprendimiento.getCategories());
  }

  private List<String> categoriesAsString(List<Category> categories) {
    return categories.stream().map(Category::getName).collect(Collectors.toList());
  }

}
