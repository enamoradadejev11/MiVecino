package com.mi.vecino.backendmodules.service;

import com.mi.vecino.backendmodules.domain.Review;
import com.mi.vecino.backendmodules.domain.command.ReviewCommand;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewService {

  Review addReviewToEmprendimiento(ReviewCommand reviewCommand, String username);

  Map<String,List<Review>> getReviewsByEmprendimientoId(long id);

  Review getUserReview(long emprendimientoId, String username);

  Map<String, String> deleteReview(long id, String username);

  Review addReviewWithImages(String username, ReviewCommand reviewCommand, MultipartFile[] multipartFiles)
      throws IOException;

  float getEmprendimientoRating(long id);

}
