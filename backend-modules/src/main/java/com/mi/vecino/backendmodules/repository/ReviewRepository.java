package com.mi.vecino.backendmodules.repository;

import com.mi.vecino.backendmodules.domain.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Long> {

  List<Review> findAllByUsername(String username);

  List<Review> findAllByEmprendimientoId(long emprendimientoId);

  @Query("SELECT AVG(r.score) FROM Review r WHERE r.emprendimientoId = ?1")
  float getEmprendimientoRating(long emprendimientoId);

  @Query("SELECT r FROM Review r WHERE r.emprendimientoId = ?1 AND r.username = ?2")
  Review getUserReview(long emprendimientoId, String username);

}
