package com.mi.vecino.backendmodules.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserInformation {

  private String username;
  private String email;
  private String profileImageUrl;
  private String token;

  public UserInformation(User user) {
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.profileImageUrl = user.getProfileImageUrl();
  }

}
