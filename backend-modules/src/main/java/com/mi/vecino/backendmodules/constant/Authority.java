package com.mi.vecino.backendmodules.constant;

import java.util.Arrays;
import java.util.List;

public class Authority {

  public static final List<String> USER_AUTHORITIES = Arrays.asList("user:read", "user:update", "create:user");
  public static final List<String> ADMIN_AUTHORITIES = Arrays.asList("user:read", "user:update", "user:delete");

}
