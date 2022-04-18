package com.mi.vecino.backendmodules.service;

import com.mi.vecino.backendmodules.domain.Emprendimiento;
import com.mi.vecino.backendmodules.domain.Schedule;
import com.mi.vecino.backendmodules.domain.command.EmprendimientoCommand;
import com.mi.vecino.backendmodules.domain.command.ScheduleCommand;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface EmprendimientoService {

  Emprendimiento addEmprendimientoToUser(EmprendimientoCommand command);

  List<Emprendimiento> getEmprendimientosByUsername(String username);

  Emprendimiento findEmprendimientoById(long id);

  Emprendimiento updateEmprendimiento(long id, EmprendimientoCommand command);

  Emprendimiento deactivateEmprendimiento(long id, String username);

  Emprendimiento activateEmprendimiento(long id, String username);

  Emprendimiento updateImageUrl(long id, String username, MultipartFile multipartFile)
      throws IOException;

  List<Schedule> addSchedule(long emprendimientoId, String username, List<ScheduleCommand> command);

  List<Schedule> retrieveSchedule(long id);

}
