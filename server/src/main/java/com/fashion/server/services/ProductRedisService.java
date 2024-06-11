package com.fashion.server.services;

import com.fashion.server.models.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductRedisService implements IProductRedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper redisObjectMapper;

    private String getRedisKey(String keyword,
                               Integer categoryId,
                               PageRequest pageRequest) {
        int pageNumber = pageRequest.getPageNumber();
        int pageSize = pageRequest.getPageSize();
        Sort sort = pageRequest.getSort();

        String sortDirection = Objects.requireNonNull(sort.getOrderFor("createdAt"))
                .getDirection() == Sort.Direction.ASC ? "asc" : "desc";
        return String.format("products:%s:%s:%s:%s:%s", keyword, categoryId, pageNumber, pageSize, sortDirection);
    }

    @Override
    public List<Product> getProducts(String keyword,
                                     Integer categoryId,
                                     PageRequest pageRequest) throws JsonProcessingException {
        String key = this.getRedisKey(keyword, categoryId, pageRequest);
        String json = (String) redisTemplate.opsForValue().get(key);
        List<Product> productsResult =
                json != null && !json.isEmpty() ? redisObjectMapper
                        .readValue(json, new TypeReference<List<Product>>() {
                        })
                        : Collections.emptyList();
        return productsResult;
    }

    @Override
    public void saveProducts(List<Product> products,
                             String keyword, Integer categoryId,
                             PageRequest pageRequest) throws JsonProcessingException {
        String key = this.getRedisKey(keyword, categoryId, pageRequest);
        String json = redisObjectMapper.writeValueAsString(products);
        redisTemplate.opsForValue().set(key, json);
    }

    @Override
    public void clearProducts() {
        Set<String> keys = redisTemplate.keys("products:*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}
