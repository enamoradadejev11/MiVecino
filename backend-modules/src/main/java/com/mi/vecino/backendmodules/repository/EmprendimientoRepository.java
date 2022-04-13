package com.mi.vecino.backendmodules.repository;

import com.mi.vecino.backendmodules.domain.Emprendimiento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprendimientoRepository extends JpaRepository<Emprendimiento, Long> {

  List<Emprendimiento> findAllByUsername(String username);

  Emprendimiento findByName(String name);

}
