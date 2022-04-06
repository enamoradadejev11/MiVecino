package com.mi.vecino.backendmodules.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Getter
@Setter
public class HttpResponse {

  @JsonFormat(shape = Shape.STRING, pattern = "MM-dd-yyyy hh:mm:ss", timezone = "America/Mexico_City")
  private Date timeStamp;
  private int httpStatusCode;
  private HttpStatus httpResponse;
  private String reason;
  private String message;

  public HttpResponse(int httpStatusCode, HttpStatus httpResponse, String reason,
      String message) {
    this.timeStamp = new Date();
    this.httpStatusCode = httpStatusCode;
    this.httpResponse = httpResponse;
    this.reason = reason;
    this.message = message;
  }

}
