package com.mi.vecino.backendmodules.service;

import com.mi.vecino.backendmodules.domain.Review;
import com.mi.vecino.backendmodules.domain.command.ReviewCommand;
import java.util.List;
import java.util.Map;

public interface ReviewService {

  Review addReviewToEmprendimiento(ReviewCommand reviewCommand, String username);

  List<Review> getReviewsByEmprendimientoId(long id);

  Map<String, String> deleteReview(long id, String username);

}
