package com.mi.vecino.backendmodules.service.impl;

import com.mi.vecino.backendmodules.domain.Address;
import com.mi.vecino.backendmodules.domain.User;
import com.mi.vecino.backendmodules.domain.command.AddressCommand;
import com.mi.vecino.backendmodules.repository.AddressRepository;
import com.mi.vecino.backendmodules.service.AddressService;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

  private final Logger logger = LoggerFactory.getLogger(getClass());
  private final AddressRepository addressRepository;

  @Autowired
  AddressServiceImpl(AddressRepository addressRepository) {
    this.addressRepository = addressRepository;
  }

  @Override
  public List<AddressCommand> getAddressesByUser(String username) {
    var addresses = addressRepository.findAllByUsername(username);
    return addresses.stream().map(AddressCommand::new).collect(Collectors.toList());
  }

  @Override
  public AddressCommand saveAddress(String username, AddressCommand addressCommand) {
    var newAddress = new Address(username, addressCommand);
    logger.info("username {}", username);
    return new AddressCommand(addressRepository.save(newAddress));
  }


}
