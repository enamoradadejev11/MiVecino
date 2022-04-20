package com.mi.vecino.backendmodules.service.impl;

import static com.mi.vecino.backendmodules.constant.FileConstant.DIRECTORY_CREATED;
import static com.mi.vecino.backendmodules.constant.FileConstant.DOT;
import static com.mi.vecino.backendmodules.constant.FileConstant.EMPRENDIMIENTO_ID;
import static com.mi.vecino.backendmodules.constant.FileConstant.JPG_EXTENSION;
import static com.mi.vecino.backendmodules.constant.FileConstant.REVIEW_API_PATH;
import static com.mi.vecino.backendmodules.constant.FileConstant.REVIEW_FOLDER;
import static com.mi.vecino.backendmodules.constant.FileConstant.REVIEW_ID;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import com.mi.vecino.backendmodules.domain.Review;
import com.mi.vecino.backendmodules.domain.command.ReviewCommand;
import com.mi.vecino.backendmodules.repository.ReviewRepository;
import com.mi.vecino.backendmodules.service.ReviewService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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

  @Override
  public Review addReviewWithImages(String username, ReviewCommand reviewCommand,
      MultipartFile[] multipartFiles) throws IOException {
    Review review = new Review(reviewCommand, username);
    Review dbReview = reviewRepository.save(review);
    saveImages(dbReview, multipartFiles);
    return review;
  }

  private void saveImages(Review review, MultipartFile[] multipartFiles)
      throws IOException {

    if (Objects.nonNull(multipartFiles)) {

      var folder = getReviewFolderName(review);
      Path reviewFolder = Paths.get(folder).toAbsolutePath().normalize();

      if (!Files.exists(reviewFolder)) {
        Files.createDirectories(reviewFolder);
        logger.info(DIRECTORY_CREATED + reviewFolder);
      }

      Files.deleteIfExists(Paths.get(folder + DOT + JPG_EXTENSION));
      AtomicInteger val = new AtomicInteger();
      List<String> imagesUrl = new ArrayList<>();

      Arrays.stream(multipartFiles).sequential().forEach(multipartFile -> {
        var fileId = review.getId() + "_" + val;
        try {
          Files.copy(multipartFile.getInputStream(),
              reviewFolder.resolve(fileId + DOT + JPG_EXTENSION), REPLACE_EXISTING);
        } catch (IOException e) {
          e.printStackTrace();
        }
        imagesUrl.add(getImageUrl(review, fileId));
        val.getAndIncrement();
      });
      review.setImagesUrl(imagesUrl);
    }
  }

  private String getImageUrl(Review review, String fileId) {
    String reviewId = String.valueOf(review.getId());
    String emprendimientoId = String.valueOf(review.getEmprendimientoId());
    String path = REVIEW_API_PATH
        .replace(EMPRENDIMIENTO_ID, emprendimientoId)
        .replace(REVIEW_ID, reviewId) + fileId + DOT + JPG_EXTENSION;

    return ServletUriComponentsBuilder.fromCurrentContextPath()
        .path(path)
        .toUriString();
  }

  private String getReviewFolderName(Review review) {
    String emprendimientoId = String.valueOf(review.getEmprendimientoId());
    String reviewId = String.valueOf(review.getId());
    return REVIEW_FOLDER.replace(EMPRENDIMIENTO_ID, emprendimientoId).replace(REVIEW_ID, reviewId);
  }

}
