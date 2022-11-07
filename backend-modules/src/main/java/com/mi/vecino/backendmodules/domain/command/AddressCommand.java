package com.mi.vecino.backendmodules.domain.command;

import com.mi.vecino.backendmodules.domain.Address;
import java.util.Arrays;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AddressCommand {

  private long id;

  private String name;

  @NotEmpty(message = "El alias es un campo requerido")
  private String alias;
  @NotEmpty(message = "La calle es un campo requerido.")
  private String street;
  @NotEmpty(message = "El numero exterior es un campo requerido.")
  private String extNumber;
  private String colony;
  @NotEmpty(message = "El estado es un campo requerido")
  private String state;
  @NotEmpty(message = "El pais es un campo requerido")
  private String country;
  @NotEmpty(message = "El codigo postal es un campo requerido")
  private String zipCode;
  private String reference;
  @NotEmpty(message = "La ciudad es un campo requerido")
  private String city;
  private String telephone;

  @NotNull(message = "El location es un campo requerido")
  @NotEmpty(message = "El location es un campo requerido")
  private List<String> location;

  public AddressCommand(Address address) {
    this.id = address.getId();
    this.alias = address.getAlias();
    this.name = address.getAlias();
    this.street = address.getStreet();
    this.extNumber = address.getExtNumber();
    this.colony = address.getColony();
    this.state = address.getState();
    this.country = address.getCountry();
    this.zipCode = address.getZipCode();
    this.reference = address.getReference();
    this.city = address.getCity();
    this.telephone = address.getTelephone();
    this.location = Arrays.asList(address.getLongitude(), address.getLatitude());
  }

}
