package com.mi.vecino.backendmodules.domain;

import com.mi.vecino.backendmodules.domain.command.ScheduleCommand;
import java.io.Serializable;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "schedule", schema = "mi_vecino")
public class Schedule implements Serializable {

  @Id
  @Column(nullable = false, updatable = false)
  private String id;
  private long emprendimientoId;
  private int dayId;
  private Time openingHour;
  private Time closingHour;

  public Schedule(long emprendimiento_id, ScheduleCommand scheduleCommand) throws ParseException {
    this.id = generateId(emprendimiento_id, scheduleCommand.getDayId());
    this.emprendimientoId = emprendimiento_id;
    this.dayId = scheduleCommand.getDayId();
    this.openingHour = convertTo24HoursFormat(scheduleCommand.getOpeningHour());
    this.closingHour = convertTo24HoursFormat(scheduleCommand.getClosingHour());
  }

  private String generateId(long emprendimiento_id, int dayId) {
    return emprendimiento_id + "_" + dayId;
  }

  private Time convertTo24HoursFormat(String time) throws ParseException {
    DateFormat format = new SimpleDateFormat("HH:mm");
    var date = format.parse(time);
    return new Time(date.getTime());
  }

}
