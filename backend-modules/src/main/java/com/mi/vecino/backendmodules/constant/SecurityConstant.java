package com.mi.vecino.backendmodules.constant;

public class SecurityConstant {

  public static final long EXPIRATION_DATE = 432_000_000; // 5 days expressed in milliseconds
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String JWT_TOKEN_HEADER = "Jwt-Token";
  public static final String TOKEN_CANNOT_BE_VERIFIED = "Token Cannot be verified";
  public static final String GET_ARRAYS_LLC = "Get Arrays, Mi Vecino";
  public static final String GET_ARRAYS_ADMINISTRATION = "User Management Portal";
  public static final String AUTHORITIES = "authorities";
  public static final String FORBIDDEN_MESSAGE = "You need yo log in to access this page";
  public static final String ACCESS_DENIED_MESSAGE = "You do not have permission to access this page";
  public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
  public static final String[] PUBLIC_URLS = { "/user/login", "/user/login2", "/user/register", "/user/resetpassword/**", "/user/image/**", "/user/home", "/api/v1/emprendimiento/image/**", "/user/greeting" };

}
