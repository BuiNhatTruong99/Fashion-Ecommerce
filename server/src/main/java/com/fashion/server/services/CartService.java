package com.fashion.server.services;

import com.fashion.server.dtos.CartItemRequestDTO;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.Cart;
import com.fashion.server.models.CartItem;
import com.fashion.server.models.Product;
import com.fashion.server.repositories.CartItemRepository;
import com.fashion.server.repositories.CartRepository;
import com.fashion.server.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    @Override
    public Cart getCartByUserId(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public void removeCartItem(Integer cartItemId) {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem.isEmpty()) {
            throw new ResourceNotFoundException("Cart item [%s] not found".formatted(cartItemId));
        }
        cartItemRepository.delete(cartItem.get());
    }

    @Override
    public void clearCart(Integer userId) {
        Cart cart = cartRepository.findByUserId(userId);
        cart.getCartItems().clear();
        cartRepository.save(cart);
    }

    @Override
    public CartItem addCartItem(CartItemRequestDTO cartItemRequestDTO) {
        Cart cart = cartRepository.findById(cartItemRequestDTO.getCartId()).orElseThrow(
                () -> new ResourceNotFoundException("Cart not found")
        );

        Product product = productRepository.findById(cartItemRequestDTO.getProductId()).orElseThrow(
                () -> new ResourceNotFoundException("Product not found"));

        for (CartItem cartItem : cart.getCartItems()) {
            if (cartItem.getProduct().getId().equals(product.getId())) {
                int newQuantity = cartItemRequestDTO.getQuantity() + cartItem.getQuantity();
                return updateCartItem(cartItem.getId(), newQuantity);
            }
        }

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(cartItemRequestDTO.getQuantity())
                .build();
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Integer cartItemId, Integer quantity) {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem.isEmpty()) {
            throw new ResourceNotFoundException("Cart item [%s] not found".formatted(cartItemId));
        }
        cartItem.get().setQuantity(quantity);
        return cartItemRepository.save(cartItem.get());
    }

    @Override
    public void deleteCartItem(Integer cartItemId) {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem.isEmpty()) {
            throw new ResourceNotFoundException("Cart item [%s] not found".formatted(cartItemId));
        }
        cartItemRepository.delete(cartItem.get());
    }
}
