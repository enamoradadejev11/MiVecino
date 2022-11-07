package com.mi.vecino.backendmodules.service;

import com.mi.vecino.backendmodules.domain.command.AddressCommand;
import java.util.List;

public interface AddressService {

  List<AddressCommand> getAddressesByUser(String username);

  AddressCommand saveAddress(String username, AddressCommand addressCommand);

}
