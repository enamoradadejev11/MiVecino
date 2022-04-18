package com.mi.vecino.backendmodules.resource;

import com.mi.vecino.backendmodules.domain.Review;
import com.mi.vecino.backendmodules.domain.command.ReviewCommand;
import com.mi.vecino.backendmodules.service.ReviewService;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/review")
public class ReviewResource {

  private final ReviewService reviewService;

  public ReviewResource(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @PostMapping("/add")
  public Review addReviewToEmprendimiento(@RequestBody ReviewCommand reviewCommand) {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return reviewService.addReviewToEmprendimiento(reviewCommand, username);
  }

  @GetMapping("/{emprendimientoId}/all")
  public List<Review> getReviewsByEmprendimiento(@PathVariable long emprendimientoId) {
    return reviewService.getReviewsByEmprendimientoId(emprendimientoId);
  }

  @DeleteMapping("/{id}")
  public Map<String, String> deleteReview(@PathVariable("id") long id) {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return reviewService.deleteReview(id, username);
  }

}
