package com.mi.vecino.backendmodules.repository;

import com.mi.vecino.backendmodules.domain.Schedule;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, String> {

  List<Schedule> findScheduleByEmprendimientoId(long emprendimientoId);

}
