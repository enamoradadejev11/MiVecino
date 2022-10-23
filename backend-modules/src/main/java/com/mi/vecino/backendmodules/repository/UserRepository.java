package com.mi.vecino.backendmodules.repository;

import com.mi.vecino.backendmodules.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  User findUserByUsername(String username);

  User findUserByEmail(String email);

}
