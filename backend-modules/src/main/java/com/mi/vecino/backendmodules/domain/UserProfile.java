package com.mi.vecino.backendmodules.domain;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserProfile {

  private String username;
  private String email;
  private String gender;
  private Date birthDay;
  private String profileImageUrl;
  private List<Favorite> favorites;

  public UserProfile(User user) {
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.gender = user.getGender();
    this.birthDay = user.getBirthDate();
    this.profileImageUrl = user.getProfileImageUrl();
    this.favorites = user.getFavoriteEmprendimientos();
  }

}
