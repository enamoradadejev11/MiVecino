package com.mi.vecino.backendmodules.resource;

import static com.mi.vecino.backendmodules.constant.FileConstant.EMPRENDIMIENTO_ID;
import static com.mi.vecino.backendmodules.constant.FileConstant.FORWARD_SLASH;
import static com.mi.vecino.backendmodules.constant.FileConstant.REVIEW_FOLDER;
import static com.mi.vecino.backendmodules.constant.FileConstant.REVIEW_ID;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

import com.mi.vecino.backendmodules.domain.Review;
import com.mi.vecino.backendmodules.domain.command.ReviewCommand;
import com.mi.vecino.backendmodules.service.ReviewService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "api/v1/review")
public class ReviewResource {

  private final ReviewService reviewService;

  public ReviewResource(ReviewService reviewService) {
    this.reviewService = reviewService;
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

  @PostMapping("/add")
  public Review reviewWithImages(
      @RequestParam(value = "emprendimientoId") long emprendimientoId,
      @RequestParam(value = "score") String score,
      @RequestParam(value = "comment", required = false) String comment,
      @RequestParam(value = "images", required = false) MultipartFile[] images) throws IOException {
    var username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    var reviewCommand = new ReviewCommand(emprendimientoId, Float.parseFloat(score), comment);
    return reviewService.addReviewWithImages(username, reviewCommand, images);
  }

  @GetMapping(path = "/{emprendimientoId}/reviews/{reviewId}/images/{filename}", produces = IMAGE_JPEG_VALUE)
  public byte[] getReviewImage(
      @PathVariable("emprendimientoId") String emprendimientoId,
      @PathVariable("reviewId") String reviewId,
      @PathVariable("filename") String filename) throws IOException {

    String path = REVIEW_FOLDER.replace(EMPRENDIMIENTO_ID, emprendimientoId)
        .replace(REVIEW_ID, reviewId) + FORWARD_SLASH + filename;
    return Files.readAllBytes(Paths.get(path));
  }

}
