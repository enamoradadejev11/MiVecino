package com.mi.vecino.backendmodules.repository;

import com.mi.vecino.backendmodules.domain.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

  List<Review> findAllByUsername(String username);

  List<Review> findAllByEmprendimientoId(long emprendimientoId);

}
