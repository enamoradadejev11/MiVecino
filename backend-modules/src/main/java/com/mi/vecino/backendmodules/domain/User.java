package com.mi.vecino.backendmodules.domain;

import static com.mi.vecino.backendmodules.constant.FileConstant.DEFAULT_USER_IMAGE_PATH;
import static com.mi.vecino.backendmodules.domain.enumeration.Role.ROLE_ADMIN;
import static com.mi.vecino.backendmodules.domain.enumeration.Role.ROLE_USER;

import com.mi.vecino.backendmodules.domain.command.UpdateUserProfileCommand;
import com.mi.vecino.backendmodules.domain.command.UserCommand;
import java.io.Serializable;
import java.util.Collections;
import java.util.Date;
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
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.annotations.Type;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user", schema = "public")
public class User implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, updatable = false)
  private long id;
  private String userId;
  private String username;
  private String fullName;
  private String email;
  private String password;
  private String gender;
  private Date birthDate;
  private Date joinDate;
  private String role;
  @Column(columnDefinition = "jsonb")
  @ElementCollection
  private List<String> authorities;
  private String profileImageUrl;
  private Date lastLoginDate;
  private Date lastLoginDateDisplay;
  private boolean isActive;
  private boolean isNotLocked;

  @Column(columnDefinition = "jsonb")
  @Type(type = "jsonb")
  private List<Favorite> favoriteEmprendimientos = Collections.emptyList();

  @Column(columnDefinition = "jsonb")
  @Type(type = "jsonb")
  private List<Category> emprendimientosCategories = Collections.emptyList();

  public User(UserCommand userCommand, String password) {
    this.userId = generateUserId();
    this.fullName = userCommand.getFullName();
    this.username = userCommand.getUsername();
    this.email = userCommand.getEmail();
    this.gender = userCommand.getGender();
    this.birthDate = userCommand.getBirthDate();
    this.joinDate = new Date();
    this.password = password;
    this.role = ROLE_USER.name();
    this.authorities = ROLE_USER.getAuthorities();
    // this.role = ROLE_ADMIN.name();
    // this.authorities = ROLE_ADMIN.getAuthorities();
    this.profileImageUrl = getTemporaryProfileImageUrl(userCommand.getUsername());
    this.isNotLocked = true;
    this.isActive = true;
    this.favoriteEmprendimientos = Collections.emptyList();
    this.emprendimientosCategories = Collections.emptyList();
  }

  public void updateUserInfo(UpdateUserProfileCommand updateUserProfileCommand) {
    this.gender = updateUserProfileCommand.getGender();
  }

  private String getTemporaryProfileImageUrl(String username) {
    return ServletUriComponentsBuilder.fromCurrentContextPath()
        .path(DEFAULT_USER_IMAGE_PATH + username)
        .toUriString();
  }

  private String generateUserId() {
    return RandomStringUtils.randomNumeric(10);
  }

}
