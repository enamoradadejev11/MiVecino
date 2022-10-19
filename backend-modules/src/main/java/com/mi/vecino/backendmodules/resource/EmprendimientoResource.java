package com.mi.vecino.backendmodules.resource;

import static com.mi.vecino.backendmodules.constant.FileConstant.EMPRENDIMIENTO_FOLDER;
import static com.mi.vecino.backendmodules.constant.FileConstant.FORWARD_SLASH;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

import com.mi.vecino.backendmodules.domain.Emprendimiento;
import com.mi.vecino.backendmodules.domain.EmprendimientoData;
import com.mi.vecino.backendmodules.domain.Schedule;
import com.mi.vecino.backendmodules.domain.command.EmprendimientoCommand;
import com.mi.vecino.backendmodules.domain.command.ScheduleCommand;
import com.mi.vecino.backendmodules.service.EmprendimientoService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping(value = "/api/v1/emprendimiento")
public class EmprendimientoResource {

  private final EmprendimientoService emprendimientoService;

  @Autowired
  public EmprendimientoResource(EmprendimientoService emprendimientoService) {
    this.emprendimientoService = emprendimientoService;
  }

  @PostMapping("/add")
  public Emprendimiento addEmprendimiento(@RequestBody EmprendimientoCommand emprendimientoCommand) {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    emprendimientoCommand.setUsername(username);
    return emprendimientoService.addEmprendimientoToUser(emprendimientoCommand);
  }

  @GetMapping("/all")
  public List<Emprendimiento> getEmprendimientosByUser() {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return emprendimientoService.getEmprendimientosByUsername(username);
  }

  @GetMapping("/{id}")
  public EmprendimientoData getEmprendimientoById(@PathVariable long id) {
    return emprendimientoService.findEmprendimientoDataById(id);
  }

  @PutMapping("/{id}/update")
  public Emprendimiento updateEmprendimiento(@PathVariable long id, @RequestBody EmprendimientoCommand emprendimientoCommand) {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    emprendimientoCommand.setUsername(username);
    return emprendimientoService.updateEmprendimiento(id, emprendimientoCommand);
  }

  @PutMapping("/{id}/deactivate")
  public Emprendimiento deactivateEmprendimiento(@PathVariable long id) {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return emprendimientoService.deactivateEmprendimiento(id, username);
  }

  @PutMapping("/{id}/activate")
  public Emprendimiento activateEmprendimiento(@PathVariable long id) {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return emprendimientoService.activateEmprendimiento(id, username);
  }

  @PutMapping("/update/image")
  public ResponseEntity<Emprendimiento> updateProfileImage(@RequestParam("id") long id,
      @RequestParam(value = "emprendimientoImage") MultipartFile emprendimientoImage) throws IOException {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Emprendimiento emprendimiento = emprendimientoService.updateImageUrl(id, username, emprendimientoImage);
    return new ResponseEntity<>(emprendimiento, HttpStatus.OK);
  }

  @GetMapping(path = "/image/{id}/{filename}", produces = IMAGE_JPEG_VALUE)
  public byte[] getProfileImage(@PathVariable("id") String id,
      @PathVariable("filename") String filename) throws IOException {
    String path = EMPRENDIMIENTO_FOLDER + id + FORWARD_SLASH + filename;
    return Files.readAllBytes(Paths.get(path));
  }

  @PostMapping("{id}/schedule")
  public List<Schedule> addSchedule(@PathVariable long id, @RequestBody List<ScheduleCommand> scheduleCommand) {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return emprendimientoService.addSchedule(id, username, scheduleCommand);
  }

  @GetMapping("{id}/schedule")
  public List<Schedule> retrieveSchedule(@PathVariable long id) {
    return emprendimientoService.retrieveSchedule(id);
  }

}
