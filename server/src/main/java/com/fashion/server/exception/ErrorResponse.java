package com.fashion.server.exception;


import java.time.LocalDateTime;

public record ErrorResponse(
        int status,
        String path,
        String message,
        LocalDateTime localDateTime) {
}
