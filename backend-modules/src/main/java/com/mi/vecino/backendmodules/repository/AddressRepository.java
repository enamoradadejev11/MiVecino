package com.mi.vecino.backendmodules.repository;

import com.mi.vecino.backendmodules.domain.Address;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

  List<Address> findAllByUsername(String username);

}
