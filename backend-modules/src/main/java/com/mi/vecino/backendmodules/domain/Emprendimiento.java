package com.mi.vecino.backendmodules.domain;

import com.mi.vecino.backendmodules.domain.command.EmprendimientoCommand;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "emprendimiento", schema = "mi_vecino")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class Emprendimiento implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, updatable = false)
  private long id;
  private String username; // actualizar si cambia el username
  private String name;
  private String description;
  private String type; // oficiio o negocio
  private Date joinDate;
  private String imageUrl;
  @Column(columnDefinition = "jsonb")
  @Type(type = "jsonb")
  private List<Telephone> telephones;
  @Column(columnDefinition = "jsonb")
  @Type(type = "jsonb")
  private List<Category> categories; // carpinteria, muebles, decoracion
  private boolean active;


  public Emprendimiento(EmprendimientoCommand emprendimientoCommand) {
    copyAll(emprendimientoCommand);
  }

  public Emprendimiento(long id, EmprendimientoCommand emprendimientoCommand) {
    this.id = id;
    copyAll(emprendimientoCommand);
  }

  private void copyAll(EmprendimientoCommand emprendimientoCommand) {
    this.username = emprendimientoCommand.getUsername();
    this.name = emprendimientoCommand.getName();
    this.telephones = emprendimientoCommand.getTelephones();
    this.description = emprendimientoCommand.getDescription();
    this.type = emprendimientoCommand.getType();
    this.joinDate = new Date();
    this.imageUrl = "";
    this.categories = emprendimientoCommand.getCategories();
    this.active = true;
  }

}
