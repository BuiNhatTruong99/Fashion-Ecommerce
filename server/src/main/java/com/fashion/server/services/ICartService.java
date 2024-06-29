package com.fashion.server.services;

import com.fashion.server.dtos.CartItemRequestDTO;
import com.fashion.server.models.Cart;
import com.fashion.server.models.CartItem;

public interface ICartService {

    Cart getCartByUserId(Integer userId);

    void removeCartItem(Integer cartItemId);

    void clearCart(Integer userId);

    CartItem addCartItem(CartItemRequestDTO cartItemRequestDTO);

    CartItem updateCartItem(Integer cartItemId, Integer quantity);

    void deleteCartItem(Integer cartItemId);
}
