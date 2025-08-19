package com.vendorandcustomer.API.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vendorandcustomer.API.model.UserCode;
import com.vendorandcustomer.API.repository.UserCodeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LogoutHandler implements LogoutSuccessHandler {

    private final UserCodeRepository userTokenRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LogoutHandler(UserCodeRepository userTokenRepository) {
        this.userTokenRepository = userTokenRepository;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication) throws IOException {

        var header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header == null || !header.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Authorization header missing or invalid");
            objectMapper.writeValue(response.getOutputStream(), errorResponse);
            return;
        }

        var token = header.substring(7);
        deleteAllUserTokens(token);

        response.setStatus(HttpServletResponse.SC_OK);
        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("message", "Logout successful");
        objectMapper.writeValue(response.getOutputStream(), successResponse);
    }

    private void deleteAllUserTokens(String token) {
        UserCode userToken = userTokenRepository.findByToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Token not found"));

        List<UserCode> allUserTokens = userTokenRepository.getAllUserTokens(
                userToken.getUserData().getId());
        userTokenRepository.deleteAll(allUserTokens);
    }
}