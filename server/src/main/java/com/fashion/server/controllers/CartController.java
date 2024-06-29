package com.fashion.server.controllers;

import com.fashion.server.dtos.CartItemRequestDTO;
import com.fashion.server.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart(
            @RequestParam Integer userId
    ) {
        return new ResponseEntity<>(cartService.getCartByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/add-item")
    public ResponseEntity<?> addCartItem(
            @Valid
            @RequestBody CartItemRequestDTO cartItemRequestDTO,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        cartService.addCartItem(cartItemRequestDTO);
        return new ResponseEntity<>("Add cart item successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-item")
    public ResponseEntity<?> deleteCartItem(
            @RequestParam Integer cartItemId
    ) {
        cartService.deleteCartItem(cartItemId);
        return new ResponseEntity<>("Delete cart item successfully", HttpStatus.OK);
    }

}
