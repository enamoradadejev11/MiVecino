package com.mi.vecino.backendmodules.service;

import com.mi.vecino.backendmodules.domain.Favorite;
import com.mi.vecino.backendmodules.domain.User;
import com.mi.vecino.backendmodules.domain.UserInformation;
import com.mi.vecino.backendmodules.domain.UserProfile;
import com.mi.vecino.backendmodules.domain.command.UpdateUserProfileCommand;
import com.mi.vecino.backendmodules.domain.command.UserCommand;
import com.mi.vecino.backendmodules.domain.exception.EmailExistException;
import com.mi.vecino.backendmodules.domain.exception.EmailNotFoundException;
import com.mi.vecino.backendmodules.domain.exception.UserNotFoundException;
import com.mi.vecino.backendmodules.domain.exception.UsernameExistException;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

  User register(UserCommand userCommand)
      throws EmailExistException, UsernameExistException, UserNotFoundException, IOException;

  List<UserInformation> getUsers();

  User findUserByUsername(String username);

  User getUserByUsername(String username)
      throws UserNotFoundException, EmailExistException, UsernameExistException;

  User findUserByEmail(String email);

  UserProfile updateUser(String currentUsername, UpdateUserProfileCommand newUser);

  void deleteUser(long id);

  void resetPassword(String email) throws EmailNotFoundException;

  User updateProfileImage(String username, MultipartFile profileImage)
      throws UserNotFoundException, EmailExistException, UsernameExistException, IOException;

  boolean isEmprendimientoFavorite(String username, long emprendimientoId)
      throws UserNotFoundException, EmailExistException, UsernameExistException;

  List<Favorite> addFavorite(long emprendimientoId, String username)
      throws UserNotFoundException, EmailExistException, UsernameExistException;
  List<Favorite> removeFavorite(long emprendimientoId, String usernam)
      throws UserNotFoundException, EmailExistException, UsernameExistException;

}
