package com.mi.vecino.backendmodules.service;

import com.mi.vecino.backendmodules.domain.User;
import com.mi.vecino.backendmodules.domain.UserInformation;
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

  User findUserByEmail(String email);

  User updateUser(String currentUsername, UserCommand newUser, MultipartFile profileImage)
      throws UserNotFoundException, EmailExistException, UsernameExistException, IOException;

  void deleteUser(long id);

  void resetPassword(String email) throws EmailNotFoundException;

  User updateProfileImage(String username, MultipartFile profileImage)
      throws UserNotFoundException, EmailExistException, UsernameExistException, IOException;

}
