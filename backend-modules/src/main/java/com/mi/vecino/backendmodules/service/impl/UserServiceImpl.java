package com.mi.vecino.backendmodules.service.impl;

import static com.mi.vecino.backendmodules.constant.FileConstant.DIRECTORY_CREATED;
import static com.mi.vecino.backendmodules.constant.FileConstant.DOT;
import static com.mi.vecino.backendmodules.constant.FileConstant.FILE_SAVED_IN_FILE_SYSTEM;
import static com.mi.vecino.backendmodules.constant.FileConstant.FORWARD_SLASH;
import static com.mi.vecino.backendmodules.constant.FileConstant.JPG_EXTENSION;
import static com.mi.vecino.backendmodules.constant.FileConstant.USER_FOLDER;
import static com.mi.vecino.backendmodules.constant.FileConstant.USER_IMAGE_PATH;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import com.mi.vecino.backendmodules.domain.Address;
import com.mi.vecino.backendmodules.domain.Category;
import com.mi.vecino.backendmodules.domain.Emprendimiento;
import com.mi.vecino.backendmodules.domain.Favorite;
import com.mi.vecino.backendmodules.domain.User;
import com.mi.vecino.backendmodules.domain.UserInformation;
import com.mi.vecino.backendmodules.domain.UserPrincipal;
import com.mi.vecino.backendmodules.domain.UserProfile;
import com.mi.vecino.backendmodules.domain.command.AddressCommand;
import com.mi.vecino.backendmodules.domain.command.UpdateUserProfileCommand;
import com.mi.vecino.backendmodules.domain.command.UserCommand;
import com.mi.vecino.backendmodules.domain.enumeration.Role;
import com.mi.vecino.backendmodules.domain.exception.AddressNotFoundException;
import com.mi.vecino.backendmodules.domain.exception.EmailExistException;
import com.mi.vecino.backendmodules.domain.exception.EmailNotFoundException;
import com.mi.vecino.backendmodules.domain.exception.UserNotFoundException;
import com.mi.vecino.backendmodules.domain.exception.UsernameExistException;
import com.mi.vecino.backendmodules.repository.AddressRepository;
import com.mi.vecino.backendmodules.repository.EmprendimientoRepository;
import com.mi.vecino.backendmodules.repository.UserRepository;
import com.mi.vecino.backendmodules.service.UserService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javassist.NotFoundException;
import javax.transaction.Transactional;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {

  public static final String USERNAME_ALREADY_EXIST = "Username already exist";
  public static final String EMAIL_ALREADY_EXIST = "Email already exist";
  public static final String USER_NOT_FOUND_BY_USERNAME = "User not found by username: ";
  public static final String USER_NOT_FOUND_BY_EMAIL = "User not found by email: ";
  private final Logger logger = LoggerFactory.getLogger(getClass());
  private final UserRepository userRepository;
  private final AddressRepository addressRepository;
  private final EmprendimientoRepository emprendimientoRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, AddressRepository addressRepository,
      EmprendimientoRepository emprendimientoRepository, BCryptPasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.addressRepository = addressRepository;
    this.emprendimientoRepository = emprendimientoRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findUserByUsername(username);
    if (user == null) {
      logger.error(USER_NOT_FOUND_BY_USERNAME + username);
      throw new UsernameNotFoundException(USER_NOT_FOUND_BY_USERNAME + username);
    } else {
      user.setLastLoginDateDisplay(user.getLastLoginDate());
      user.setLastLoginDate(new Date());
      userRepository.save(user);
      UserPrincipal userPrincipal = new UserPrincipal(user);
      logger.info("Returning found user by username: " + username);
      return userPrincipal;
    }
  }

  @Override
  public User register(UserCommand userCommand)
      throws EmailExistException, UsernameExistException, UserNotFoundException {
    validateNewUsernameAndEmail(StringUtils.EMPTY, userCommand.getUsername(),
        userCommand.getEmail());
    String password = generatePassword();
    logger.info("New user password: " + password);
    User user = new User(userCommand, encodePassword(password));
    userRepository.save(user);
    return user;
  }

  @Override
  public List<UserInformation> getUsers() {
    List<User> dbUsers = userRepository.findAll();
    return dbUsers.stream().map(UserInformation::new).collect(Collectors.toList());
  }

  @Override
  public User findUserByUsername(String username) {
    return userRepository.findUserByUsername(username);
  }

  @Override
  public User getUserByUsername(String username)
      throws UserNotFoundException, EmailExistException, UsernameExistException {
    User user = validateNewUsernameAndEmail(username, null, null);
    return Objects.nonNull(user) ? userRepository.findUserByUsername(user.getUsername())
        : new User();
  }

  @Override
  public User findUserByEmail(String email) {
    return userRepository.findUserByEmail(email);
  }

  @Override
  public UserProfile updateUser(String currentUsername, UpdateUserProfileCommand newUser) {
    User currentUser = findUserByUsername(currentUsername);
    if (Objects.nonNull(currentUser)) {
      currentUser.updateUserInfo(newUser);
      return new UserProfile(userRepository.save(currentUser));
    }
    return new UserProfile();
  }

  @Override
  public void deleteUser(long id) {
    userRepository.deleteById(id);
  }

  @Override
  public void resetPassword(String email) throws EmailNotFoundException {
    User user = userRepository.findUserByEmail(email);
    if (Objects.isNull(user)) {
      throw new EmailNotFoundException(USER_NOT_FOUND_BY_EMAIL + email);
    }

    String password = generatePassword();
    logger.info("New user password: " + password);
    user.setPassword(encodePassword(password));
    userRepository.save(user);
  }

  @Override
  public User updateProfileImage(String username, MultipartFile profileImage)
      throws UserNotFoundException, EmailExistException, UsernameExistException, IOException {
    User user = validateNewUsernameAndEmail(username, null, null);
    saveProfileImage(user, profileImage);
    return user;
  }

  @Override
  public boolean isEmprendimientoFavorite(String username, long emprendimientoId)
      throws UserNotFoundException, EmailExistException, UsernameExistException {
    User user = validateNewUsernameAndEmail(username, null, null);
    if (Objects.nonNull(user)) {
      var favorite = user.getFavoriteEmprendimientos().stream()
          .filter(fav -> emprendimientoId == fav.getId()).findAny().orElse(null);
      return Objects.nonNull(favorite);
    }
    return false;
  }

  @Override
  public List<Favorite> addFavorite(long emprendimientoId, String username)
      throws UserNotFoundException, EmailExistException, UsernameExistException {
    User user = validateNewUsernameAndEmail(username, null, null);
    if (Objects.nonNull(user)) {
      List<Favorite> currentFavorites = user.getFavoriteEmprendimientos();
      List<Favorite> newFavorites =
          Objects.nonNull(currentFavorites) ? currentFavorites : new ArrayList<>();
      Emprendimiento emprendimiento = emprendimientoRepository.findById(emprendimientoId).get();
      var favorite = currentFavorites.stream()
          .filter(fav -> fav.getId() == emprendimientoId).findAny().orElse(null);
      if (Objects.isNull(favorite)) {
        Favorite newFavorite = new Favorite(emprendimiento);
        newFavorites.add(newFavorite);
        user.setFavoriteEmprendimientos(newFavorites);
        user.setEmprendimientosCategories(
            calculateCategoriesFromFavorites(emprendimiento, user.getEmprendimientosCategories()));
        return userRepository.save(user).getFavoriteEmprendimientos();
      }
      return user.getFavoriteEmprendimientos();
    }
    return Collections.emptyList();
  }

  @Override
  public List<Favorite> removeFavorite(long emprendimientoId, String username)
      throws UserNotFoundException, EmailExistException, UsernameExistException {
    User user = validateNewUsernameAndEmail(username, null, null);
    if (Objects.nonNull(user)) {
      List<Favorite> currentFavorites = user.getFavoriteEmprendimientos();
      if (Objects.isNull(currentFavorites) || currentFavorites.isEmpty()) {
        return Collections.emptyList();
      }
      Emprendimiento emprendimiento = emprendimientoRepository.findById(emprendimientoId).get();
      currentFavorites.removeIf(favorite -> favorite.getId() == emprendimiento.getId());
      user.setFavoriteEmprendimientos(currentFavorites);
      user.setEmprendimientosCategories(
          removeCategoriesFromFavorites(user.getFavoriteEmprendimientos()));
      return userRepository.save(user).getFavoriteEmprendimientos();
    }
    return Collections.emptyList();
  }

  @Override
  public List<AddressCommand> getAddressesByUser(String username) {
    var addresses = addressRepository.findAllByUsername(username);
    return addresses.stream().map(AddressCommand::new).collect(Collectors.toList());
  }

  @Override
  public List<AddressCommand> saveAddress(String username, AddressCommand addressCommand) {
    var newAddress = new Address(username, addressCommand);
    addressRepository.save(newAddress);
    return getAddressesByUser(username);
  }

  @Override
  public AddressCommand updateAddress(String username, AddressCommand newAddress)
      throws AddressNotFoundException {
    var address = addressRepository.findById(newAddress.getId());
    if (address.isPresent() && address.get().getUsername().equals(username)) {
      logger.info("SAVE");
      return new AddressCommand(addressRepository.save(address.get()));
    }
    if(address.isPresent()) {
      return new AddressCommand(address.get());
    }
    throw new AddressNotFoundException("No se encontro la direccion");
  }

  @Override
  public List<AddressCommand> deleteAddress(String username, long id) {
    var address = addressRepository.findById(id);

    if (address.isPresent() && address.get().getUsername().equals(username)) {
      addressRepository.deleteById(id);
    }
    return getAddressesByUser(username);
  }

  private List<Category> calculateCategoriesFromFavorites(Emprendimiento emprendimiento,
      List<Category> currentCategories) {
    List<Category> newCategories =
        Objects.nonNull(currentCategories) ? currentCategories : new ArrayList<>();
    newCategories.addAll(emprendimiento.getCategories());
    return newCategories;
  }

  private List<Category> removeCategoriesFromFavorites(List<Favorite> favorites) {
    var emprendimientosIds = favorites.stream().map(Favorite::getId).collect(Collectors.toList());
    var emprendimientos = emprendimientoRepository.findAllById(emprendimientosIds);
    return emprendimientos.stream().map(Emprendimiento::getCategories).flatMap(List::stream)
        .collect(Collectors.toList());
  }

  private void saveProfileImage(User user, MultipartFile profileImage) throws IOException {
    if (Objects.nonNull(profileImage)) {
      Path userFolder = Paths.get(USER_FOLDER + user.getUsername()).toAbsolutePath().normalize();
      if (!Files.exists(userFolder)) {
        Files.createDirectories(userFolder);
        logger.info(DIRECTORY_CREATED + userFolder);
      }
      Files.deleteIfExists(Paths.get(userFolder + user.getUsername() + DOT + JPG_EXTENSION));
      Files.copy(profileImage.getInputStream(),
          userFolder.resolve(user.getUsername() + DOT + JPG_EXTENSION), REPLACE_EXISTING);
      user.setProfileImageUrl(setProfileImageUrl(user.getUsername()));
      userRepository.save(user);
      logger.info(FILE_SAVED_IN_FILE_SYSTEM + profileImage.getOriginalFilename());
    }
  }

  private String setProfileImageUrl(String username) {
    return ServletUriComponentsBuilder.fromCurrentContextPath()
        .path(USER_IMAGE_PATH + username + FORWARD_SLASH + username + DOT + JPG_EXTENSION)
        .toUriString();
  }

  private Role getRoleEnum(String role) {
    return Role.valueOf(role.toUpperCase());
  }

  private String encodePassword(String password) {
    return passwordEncoder.encode(password);
  }

  private String generatePassword() {
    return RandomStringUtils.randomAlphanumeric(10);
  }

  private User validateNewUsernameAndEmail(String currentUsername, String newUsername,
      String newEmail)
      throws UsernameExistException, EmailExistException, UserNotFoundException {

    User userByNewUsername = findUserByUsername(newUsername);
    User userByNewEmail = findUserByEmail(newEmail);

    if (StringUtils.isNotBlank(currentUsername)) {

      User currentUser = findUserByUsername(currentUsername);
      if (Objects.isNull(currentUser)) {
        throw new UserNotFoundException("No user found by username " + currentUsername);
      }

      if (Objects.nonNull(userByNewUsername) && (currentUser.getId() != userByNewUsername
          .getId())) {
        throw new UsernameExistException(USERNAME_ALREADY_EXIST);
      }

      if (Objects.nonNull(userByNewEmail) && currentUser.getId() != userByNewEmail.getId()) {
        throw new EmailExistException(EMAIL_ALREADY_EXIST);
      }

      return currentUser;
    }

    if (Objects.nonNull(userByNewUsername)) {
      throw new UsernameExistException(USERNAME_ALREADY_EXIST);
    }

    if (Objects.nonNull(userByNewEmail)) {
      throw new EmailExistException(EMAIL_ALREADY_EXIST);
    }

    return null;
  }


}
