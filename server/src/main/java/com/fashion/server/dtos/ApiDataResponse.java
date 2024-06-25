package com.fashion.server.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApiDataResponse {
    private int status;
    private Object data;
    private String message;
}
