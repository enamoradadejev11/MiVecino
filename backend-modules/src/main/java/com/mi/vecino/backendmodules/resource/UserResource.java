package com.mi.vecino.backendmodules.resource;

import static com.mi.vecino.backendmodules.constant.FileConstant.FORWARD_SLASH;
import static com.mi.vecino.backendmodules.constant.FileConstant.TEMP_PROFILE_IMAGE_BASE_URL;
import static com.mi.vecino.backendmodules.constant.FileConstant.USER_FOLDER;
import static com.mi.vecino.backendmodules.constant.SecurityConstant.JWT_TOKEN_HEADER;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

import com.mi.vecino.backendmodules.domain.HttpResponse;
import com.mi.vecino.backendmodules.domain.User;
import com.mi.vecino.backendmodules.domain.UserInformation;
import com.mi.vecino.backendmodules.domain.UserPrincipal;
import com.mi.vecino.backendmodules.domain.command.UserCommand;
import com.mi.vecino.backendmodules.domain.command.UserValidCommand;
import com.mi.vecino.backendmodules.domain.exception.EmailExistException;
import com.mi.vecino.backendmodules.domain.exception.EmailNotFoundException;
import com.mi.vecino.backendmodules.domain.exception.ExceptionHandling;
import com.mi.vecino.backendmodules.domain.exception.UserNotFoundException;
import com.mi.vecino.backendmodules.domain.exception.UsernameExistException;
import com.mi.vecino.backendmodules.service.UserService;
import com.mi.vecino.backendmodules.utility.JWTTokenProvider;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/user")
public class UserResource extends ExceptionHandling {

  public static final String NEW_PASSWORD_WAS_SENT_TO = "An email with a new password was sent to: ";
  public static final String USER_DELETED_SUCCESSFULLY = "User deleted successfully";
  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final JWTTokenProvider jwtTokenProvider;

  @Autowired
  public UserResource(UserService userService,
      AuthenticationManager authenticationManager,
      JWTTokenProvider jwtTokenProvider) {
    this.userService = userService;
    this.authenticationManager = authenticationManager;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody UserCommand userCommand)
      throws UsernameNotFoundException, UserNotFoundException, EmailExistException, UsernameExistException, IOException {
    User newUser = userService.register(userCommand);
    return new ResponseEntity<>(newUser, HttpStatus.OK);
  }

  @PostMapping("/login2")
  public ResponseEntity<UserInformation> login2(@RequestBody UserCommand userCommand)
      throws UsernameNotFoundException {
    authenticate(userCommand.getUsername(), userCommand.getPassword());
    User loginUser = userService.findUserByUsername(userCommand.getUsername());
    UserPrincipal userPrincipal = new UserPrincipal(loginUser);
    HttpHeaders jwtHeader = getJwtHeader(userPrincipal);
    return new ResponseEntity<>(new UserInformation(loginUser), jwtHeader, HttpStatus.OK);
  }

  @PostMapping("/login")
  public ResponseEntity<UserValidCommand> login(@RequestBody UserCommand userCommand)
      throws UsernameNotFoundException {
    authenticate(userCommand.getUsername(), userCommand.getPassword());
    User loginUser = userService.findUserByUsername(userCommand.getUsername());
    UserPrincipal userPrincipal = new UserPrincipal(loginUser);
    UserValidCommand userValidCommand = new UserValidCommand(userPrincipal.getUsername(), getJwtToken(userPrincipal));
    return new ResponseEntity<>(userValidCommand, HttpStatus.OK);
  }

  @PutMapping("/update/{username}")
  public ResponseEntity<User> updateUser(@PathVariable("username") String username,
      @RequestBody UserCommand userCommand,
      @RequestParam(value = "profileImage", required = false) MultipartFile profileImage)
      throws UsernameNotFoundException, UserNotFoundException, EmailExistException, IOException, UsernameExistException {
    User updatedUser = userService.updateUser(username, userCommand, profileImage);
    return new ResponseEntity<>(updatedUser, HttpStatus.OK);
  }

  @GetMapping("/find/{username}")
  public ResponseEntity<User> getUser(@PathVariable("username") String username)
      throws UsernameNotFoundException {
    User user = userService.findUserByUsername(username);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/list")
  public ResponseEntity<List<UserInformation>> getAllUsers() throws UsernameNotFoundException {
    List<UserInformation> users = userService.getUsers();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @GetMapping("/resetPassword/{email}")
  public ResponseEntity<HttpResponse> resetPassword(@PathVariable("email") String email)
      throws UsernameNotFoundException, EmailNotFoundException {
    userService.resetPassword(email);
    return response(HttpStatus.OK, NEW_PASSWORD_WAS_SENT_TO + email);
  }

  @DeleteMapping("/delete/{id}")
  @PreAuthorize("hasAnyAuthority('user:delete')")
  public ResponseEntity<HttpResponse> deleteUser(@PathVariable("id") long id) {
    userService.deleteUser(id);
    return response(HttpStatus.NO_CONTENT, USER_DELETED_SUCCESSFULLY);
  }

  @PutMapping("/update/profileImage")
  public ResponseEntity<User> updateProfileImage(@RequestParam("username") String username,
      @RequestParam(value = "profileImage") MultipartFile profileImage)
      throws UserNotFoundException, EmailExistException, IOException, UsernameExistException {
    User user = userService.updateProfileImage(username, profileImage);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping(path = "/image/{username}/{filename}", produces = IMAGE_JPEG_VALUE)
  public byte[] getProfileImage(@PathVariable("username") String username,
      @PathVariable("filename") String filename) throws IOException {
    String path = USER_FOLDER + username + FORWARD_SLASH + filename;
    return Files.readAllBytes(Paths.get(path));
  }

  @GetMapping(path = "/image/profile/{username}", produces = IMAGE_JPEG_VALUE)
  public byte[] getTempProfileImage(@PathVariable("username") String username) throws IOException {
    URL url = new URL(TEMP_PROFILE_IMAGE_BASE_URL + username);
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try (InputStream inputStream = url.openStream()) {
      int bytesRead;
      byte[] chunk = new byte[1024];
      while ((bytesRead = inputStream.read(chunk)) > 0) {
        byteArrayOutputStream.write(chunk, 0, bytesRead);
      }
    }
    return byteArrayOutputStream.toByteArray();
  }

  private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
    HttpResponse body = new HttpResponse(httpStatus.value(), httpStatus,
        httpStatus.getReasonPhrase().toUpperCase(), message.toUpperCase());
    return new ResponseEntity<>(body, httpStatus);
  }

  private HttpHeaders getJwtHeader(UserPrincipal userPrincipal) {
    HttpHeaders headers = new HttpHeaders();
    headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(userPrincipal));
    return headers;
  }

  private String getJwtToken(UserPrincipal userPrincipal) {
    return jwtTokenProvider.generateJwtToken(userPrincipal);
  }

  private void authenticate(String username, String password) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
  }

}
