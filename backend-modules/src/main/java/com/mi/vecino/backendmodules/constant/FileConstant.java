package com.mi.vecino.backendmodules.constant;

public class FileConstant {

  public static final String USER_IMAGE_PATH = "/user/image/";
  public static final String JPG_EXTENSION = "jpeg";
  public static final String USER_FOLDER = System.getProperty("user.home") + "/supportportal/user/";
  public static final String DIRECTORY_CREATED = "Created directory for: ";
  public static final String DEFAULT_USER_IMAGE_PATH = "/user/image/profile/";
  public static final String FILE_SAVED_IN_FILE_SYSTEM = "Saved file in file system by name: ";
  public static final String DOT = ".";
  public static final String FORWARD_SLASH = "/";
  public static final String TEMP_PROFILE_IMAGE_BASE_URL = "https://robohash.org/";
  public static final String EMPRENDIMIENTO_API_PATH = "/api/v1/emprendimiento/image/";
  public static final String EMPRENDIMIENTO_FOLDER =
      System.getProperty("user.home") + "/supportportal/emprendimientos/";
  public static final String REVIEW_API_PATH = "/api/v1/review/{emprendimientoId}/reviews/{reviewId}/images/";
  public static final String REVIEW_FOLDER =
      EMPRENDIMIENTO_FOLDER + "{emprendimientoId}/reviews/{reviewId}";
  public static final String EMPRENDIMIENTO_ID = "{emprendimientoId}";
  public static final String REVIEW_ID = "{reviewId}";

}
