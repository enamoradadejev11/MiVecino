package com.mi.vecino.backendmodules.domain;

import com.mi.vecino.backendmodules.domain.command.AddressCommand;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import java.util.Arrays;
import java.util.Objects;
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
import org.hibernate.annotations.TypeDef;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "address", schema = "public")
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, updatable = false)
  private long id;
  private String username;
  private String alias;
  private String street;
  private String extNumber;
  private String colony;
  private String state;
  private String country;
  private String zipCode;
  private String reference;
  private String city;
  private String telephone;
  private String longitude;
  private String latitude;

  public Address(String username, AddressCommand addressCommand) {
    this.username = username;
    this.alias = addressCommand.getAlias();
    this.street = addressCommand.getStreet();
    this.extNumber = addressCommand.getExtNumber();
    this.colony = addressCommand.getColony();
    this.state = addressCommand.getState();
    this.country = addressCommand.getCountry();
    this.zipCode = addressCommand.getZipCode();
    this.reference = addressCommand.getReference();
    this.city = addressCommand.getCity();
    this.telephone = addressCommand.getTelephone();
    this.longitude = addressCommand.getLocation().get(0);
    this.latitude = addressCommand.getLocation().get(1);
  }

  public void updateAddressInfo(AddressCommand addressCommand) {
    this.alias = addressCommand.getAlias();
    this.street = addressCommand.getStreet();
    this.extNumber = addressCommand.getExtNumber();
    this.colony = addressCommand.getColony();
    this.state = addressCommand.getState();
    this.country = addressCommand.getCountry();
    this.zipCode = addressCommand.getZipCode();
    this.reference = addressCommand.getReference();
    this.city = addressCommand.getCity();
    this.telephone = addressCommand.getTelephone();
    this.longitude = addressCommand.getLocation().get(0);
    this.latitude = addressCommand.getLocation().get(1);
  }

}
