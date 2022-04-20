package com.mi.vecino.backendmodules.domain;

import com.mi.vecino.backendmodules.domain.command.ReviewCommand;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "review", schema = "mi_vecino")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, updatable = false)
  private long id;
  private long emprendimientoId;
  private String username;
  private int score;
  private String comment;
  @Column(columnDefinition = "jsonb")
  @Type(type = "jsonb")
  private List<String> imagesUrl;

  public Review(ReviewCommand reviewCommand, String username) {
    this.emprendimientoId = reviewCommand.getEmprendimientoId();
    this.username = username;
    this.score = reviewCommand.getScore();
    this.comment = reviewCommand.getComment();
  }

}
