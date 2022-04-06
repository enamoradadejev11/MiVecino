package com.mi.vecino.backendmodules.domain.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.METHOD_NOT_ALLOWED;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.mi.vecino.backendmodules.domain.HttpResponse;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.Objects;
import javax.persistence.NoResultException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandling {

  private final Logger logger = LoggerFactory.getLogger(getClass());

  private static final String ACCOUNT_LOCKED = "Tu cuenta a sido bloqueada, Porfavor contacta a soporte tecnico";
  private static final String METHOD_IS_NOT_ALLOWED = "This request method is not allowed on this enpoint. Please send a '%s' request";
  private static final String INTERNAL_SERVER_ERROR_MSG = "Ocurrio un error al procesar el request";
  private static final String INCORRECT_CREDENTIALS = "Tu usuario o contraseña son incorrectas. Porfavor intenta de nuevo";
  private static final String ACCOUNT_DISABLED = "Tu cuenta a sido deshabilitada, Si es un error, porfavor contacta a soporte tecnico";
  private static final String ERROR_PROCESSING_FILE = "Ocurrio un error al procesar el archivo";
  private static final String NOT_ENOUGH_PERMISSION= "No tienes suficientes permisos";

  @ExceptionHandler(DisabledException.class)
  public ResponseEntity<HttpResponse> accountDisabledException() {
    return createHttpResponse(BAD_REQUEST, ACCOUNT_DISABLED);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<HttpResponse> badCredentialsException() {
    return createHttpResponse(BAD_REQUEST, INCORRECT_CREDENTIALS);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<HttpResponse> accessDeniedException() {
    return createHttpResponse(FORBIDDEN, NOT_ENOUGH_PERMISSION);
  }

  @ExceptionHandler(LockedException.class)
  public ResponseEntity<HttpResponse> lockedException() {
    return createHttpResponse(UNAUTHORIZED, ACCOUNT_LOCKED);
  }

  @ExceptionHandler(TokenExpiredException.class)
  public ResponseEntity<HttpResponse> tokenExpiredException(TokenExpiredException exception) {
    return createHttpResponse(UNAUTHORIZED, exception.getMessage().toUpperCase());
  }

  @ExceptionHandler(EmailExistException.class)
  public ResponseEntity<HttpResponse> emailExistException(EmailExistException exception) {
    return createHttpResponse(BAD_REQUEST, exception.getMessage());
  }

  @ExceptionHandler(UsernameExistException.class)
  public ResponseEntity<HttpResponse> usernameExistException(UsernameExistException exception) {
    return createHttpResponse(BAD_REQUEST, exception.getMessage());
  }

  @ExceptionHandler(EmailNotFoundException.class)
  public ResponseEntity<HttpResponse> emailNotFoundException(EmailNotFoundException exception) {
    return createHttpResponse(BAD_REQUEST, exception.getMessage());
  }

  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<HttpResponse> userNotFoundException(UserNotFoundException exception) {
    return createHttpResponse(BAD_REQUEST, exception.getMessage());
  }

  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  public ResponseEntity<HttpResponse> methodNotSupportedException(HttpRequestMethodNotSupportedException exception) {
    HttpMethod supportedMethod = Objects.requireNonNull(exception.getSupportedHttpMethods()).iterator().next();
    return createHttpResponse(METHOD_NOT_ALLOWED, String.format(METHOD_IS_NOT_ALLOWED, supportedMethod));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<HttpResponse> internalServerErrorException(Exception exception) {
    logger.error(exception.getMessage());
    return createHttpResponse(INTERNAL_SERVER_ERROR, exception.getMessage());
  }

  @ExceptionHandler(NoResultException.class)
  public ResponseEntity<HttpResponse> notFoundException(NoResultException exception) {
    return createHttpResponse(NOT_FOUND, exception.getMessage());
  }

  @ExceptionHandler(IOException.class)
  public ResponseEntity<HttpResponse> iOException(IOException exception) {
    logger.error(exception.getMessage());
    return createHttpResponse(INTERNAL_SERVER_ERROR, ERROR_PROCESSING_FILE);
  }

  private ResponseEntity<HttpResponse> createHttpResponse(HttpStatus httpStatus, String message) {
    HttpResponse httpResponse = new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message.toUpperCase());
    return new ResponseEntity<>(httpResponse, httpStatus);
  }

}
