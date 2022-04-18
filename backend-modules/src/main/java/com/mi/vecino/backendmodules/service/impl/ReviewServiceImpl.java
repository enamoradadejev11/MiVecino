package com.mi.vecino.backendmodules.service.impl;

import com.mi.vecino.backendmodules.domain.Review;
import com.mi.vecino.backendmodules.domain.command.ReviewCommand;
import com.mi.vecino.backendmodules.repository.ReviewRepository;
import com.mi.vecino.backendmodules.service.ReviewService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

  public static final String DELETED = "Deleted";
  public static final String NOT_DELETED = "Not-deleted";
  private final Logger logger = LoggerFactory.getLogger(getClass());
  private final ReviewRepository reviewRepository;

  public ReviewServiceImpl(
      ReviewRepository reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  @Override
  public Review addReviewToEmprendimiento(ReviewCommand reviewCommand, String username) {
    Review review = new Review(reviewCommand, username);
    reviewRepository.save(review);
    return review;
  }

  @Override
  public List<Review> getReviewsByEmprendimientoId(long emprendimientoId) {
    return reviewRepository.findAllByEmprendimientoId(emprendimientoId);
  }

  @Override
  public Map<String, String> deleteReview(long id, String username) {
    Review reviewToDelete = reviewRepository.findById(id).orElse(null);
    Map<String, String> deleted = new HashMap<>();
    deleted.put(DELETED, "");
    deleted.put(NOT_DELETED, "");

    if (Objects.nonNull(reviewToDelete)) {
      if (reviewToDelete.getUsername().equals(username)) {
        reviewRepository.deleteById(id);
        deleted.put(DELETED, Long.toString(id));
      }
    } else {
      deleted.put(NOT_DELETED, Long.toString(id));
    }

    return deleted;
  }
}
