package com.mi.vecino.backendmodules.domain.enumeration;

import com.mi.vecino.backendmodules.constant.Authority;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {

  ROLE_USER(Authority.USER_AUTHORITIES),
  ROLE_ADMIN(Authority.ADMIN_AUTHORITIES);

  private final List<String> authorities;

}
