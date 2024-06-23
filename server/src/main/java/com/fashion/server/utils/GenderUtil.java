package com.fashion.server.utils;

import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.util.Random;

@Component
public class GenderUtil {
    private static final Random RANDOM = new Random();
    private static final DecimalFormat DECIMAL_FORMAT = new DecimalFormat("000000");

    public String generateOtp() {
        return DECIMAL_FORMAT.format(RANDOM.nextInt(1000000));
    }
}
