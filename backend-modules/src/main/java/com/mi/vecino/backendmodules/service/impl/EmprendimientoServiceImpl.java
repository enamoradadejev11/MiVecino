package com.mi.vecino.backendmodules.service.impl;

import static com.mi.vecino.backendmodules.constant.FileConstant.DIRECTORY_CREATED;
import static com.mi.vecino.backendmodules.constant.FileConstant.DOT;
import static com.mi.vecino.backendmodules.constant.FileConstant.EMPRENDIMIENTO_API_PATH;
import static com.mi.vecino.backendmodules.constant.FileConstant.EMPRENDIMIENTO_FOLDER;
import static com.mi.vecino.backendmodules.constant.FileConstant.FILE_SAVED_IN_FILE_SYSTEM;
import static com.mi.vecino.backendmodules.constant.FileConstant.FORWARD_SLASH;
import static com.mi.vecino.backendmodules.constant.FileConstant.JPG_EXTENSION;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import com.mi.vecino.backendmodules.domain.Emprendimiento;
import com.mi.vecino.backendmodules.domain.EmprendimientoData;
import com.mi.vecino.backendmodules.domain.Schedule;
import com.mi.vecino.backendmodules.domain.command.EmprendimientoCommand;
import com.mi.vecino.backendmodules.domain.command.ScheduleCommand;
import com.mi.vecino.backendmodules.repository.EmprendimientoRepository;
import com.mi.vecino.backendmodules.repository.ScheduleRepository;
import com.mi.vecino.backendmodules.service.EmprendimientoService;
import com.mi.vecino.backendmodules.service.ReviewService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
@Transactional
public class EmprendimientoServiceImpl implements EmprendimientoService {

  private final Logger logger = LoggerFactory.getLogger(getClass());
  private final EmprendimientoRepository emprendimientoRepository;
  private final ScheduleRepository scheduleRepository;
  private final ReviewService reviewService;

  @Autowired
  EmprendimientoServiceImpl(EmprendimientoRepository emprendimientoRepository,
      ScheduleRepository scheduleRepository, ReviewService reviewService) {
    this.emprendimientoRepository = emprendimientoRepository;
    this.scheduleRepository = scheduleRepository;
    this.reviewService = reviewService;
  }

  @Override
  public Emprendimiento addEmprendimientoToUser(EmprendimientoCommand command) {
    Emprendimiento emprendimiento = new Emprendimiento(command);
    emprendimientoRepository.save(emprendimiento);
    return emprendimiento;
  }

  @Override
  public List<Emprendimiento> getEmprendimientosByUsername(String username) {
    return emprendimientoRepository.findAllByUsername(username);
  }

  @Override
  public Emprendimiento findEmprendimientoById(long id) {
    return emprendimientoRepository.findById(id).get();
  }

  @Override
  public EmprendimientoData findEmprendimientoDataById(long id) {
    Emprendimiento emprendimiento = emprendimientoRepository.findById(id).get();
    return new EmprendimientoData(emprendimiento, reviewService.getEmprendimientoRating(id));
  }

  @Override
  public Emprendimiento updateEmprendimiento(long id, EmprendimientoCommand command) {
    Emprendimiento updatedEmprendimiento = new Emprendimiento(id, command);
    Emprendimiento currentEmprendimiento = emprendimientoRepository.findById(id).orElse(null);
    if (Objects.nonNull(currentEmprendimiento)) {
      if (isValidUser(updatedEmprendimiento.getUsername(), updatedEmprendimiento)) {
        updatedEmprendimiento.setImageUrl(currentEmprendimiento.getImageUrl());
        return emprendimientoRepository.save(updatedEmprendimiento);
      }
    }
    return currentEmprendimiento;
  }

  @Override
  public Emprendimiento deactivateEmprendimiento(long id, String username) {
    var emprendimiento = emprendimientoRepository.findById(id).orElse(null);
    if (Objects.nonNull(emprendimiento)) {
      if (emprendimiento.isActive() && isValidUser(username, emprendimiento)) {
        emprendimiento.setActive(false);
        emprendimientoRepository.save(emprendimiento);
      }
    }
    return emprendimiento;
  }

  @Override
  public Emprendimiento activateEmprendimiento(long id, String username) {
    var emprendimiento = emprendimientoRepository.findById(id).orElse(null);
    if (Objects.nonNull(emprendimiento)) {
      if (!emprendimiento.isActive() && isValidUser(username, emprendimiento)) {
        emprendimiento.setActive(true);
        emprendimientoRepository.save(emprendimiento);
      }
    }
    return emprendimiento;
  }

  @Override
  public Emprendimiento updateImageUrl(long id, String username, MultipartFile multipartFile)
      throws IOException {
    var emprendimiento = findEmprendimientoById(id);
    if (isValidUser(username, emprendimiento)) {
      saveEmprendimientoImage(emprendimiento, multipartFile);
    }
    return emprendimiento;
  }

  @Override
  public List<Schedule> addSchedule(long emprendimientoId, String username, List<ScheduleCommand> command) {
    if (isValidUser(emprendimientoId, username)) {
      return command.stream().map(scheduleCommand -> {
        try {
          Schedule schedule = new Schedule(emprendimientoId, scheduleCommand);
          scheduleRepository.save(schedule);
          return schedule;
        } catch (ParseException parseException) {
          parseException.printStackTrace();
        }
        return null;
      }).collect(Collectors.toList());
    }
    return Collections.emptyList();
  }

  @Override
  public List<Schedule> retrieveSchedule(long emprendimientoId) {
    return scheduleRepository.findScheduleByEmprendimientoId(emprendimientoId);
  }

  private boolean isValidUser(long emprendimientoId, String username) {
    var emprendimiento = findEmprendimientoById(emprendimientoId);
    return username.equals(emprendimiento.getUsername());
  }

  private boolean isValidUser(String username, Emprendimiento dbEmprendimiento) {
    return username.equals(dbEmprendimiento.getUsername());
  }

  private void saveEmprendimientoImage(Emprendimiento emprendimiento, MultipartFile emprendimientoImage) throws IOException {

    var id = Long.toString(emprendimiento.getId());
    var folder = EMPRENDIMIENTO_FOLDER + id;

    if (Objects.nonNull(emprendimientoImage)) {
      Path emprendimientoFolder = Paths.get(folder).toAbsolutePath().normalize();
      if (!Files.exists(emprendimientoFolder)) {
        Files.createDirectories(emprendimientoFolder);
        logger.info(DIRECTORY_CREATED + emprendimientoFolder);
      }
      Files.deleteIfExists(Paths.get(folder + DOT + JPG_EXTENSION));
      Files.copy(emprendimientoImage.getInputStream(), emprendimientoFolder.resolve(id + DOT + JPG_EXTENSION), REPLACE_EXISTING);
      emprendimiento.setImageUrl(setProfileImageUrl(id));
      emprendimientoRepository.save(emprendimiento);
      logger.info(FILE_SAVED_IN_FILE_SYSTEM + emprendimientoImage.getOriginalFilename());
    }
  }

  private String setProfileImageUrl(String id) {
    return ServletUriComponentsBuilder.fromCurrentContextPath()
        .path(EMPRENDIMIENTO_API_PATH + id + FORWARD_SLASH + id + DOT + JPG_EXTENSION)
        .toUriString();
  }

}
