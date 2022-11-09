package com.mi.vecino.backendmodules.domain.command;

import com.mi.vecino.backendmodules.domain.Category;
import com.mi.vecino.backendmodules.domain.Telephone;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EmprendimientoCommand {

  private String username;
  private String name;
  private String description;
  private String type;
  private List<Telephone> telephones;
  private List<Category> categories;
  private String longitude;
  private String latitude;
  private int addressId;
  private String giro;

}
