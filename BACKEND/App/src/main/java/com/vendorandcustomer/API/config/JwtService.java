package com.vendorandcustomer.API.config;

import com.vendorandcustomer.API.model.User;
import com.vendorandcustomer.API.model.UserCode;
import com.vendorandcustomer.API.repository.UserCodeRepository;
import com.vendorandcustomer.API.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${application.secret}")
    private String SECRET_KEY;

    private final UserCodeRepository userTokenRepository;
    private final UserRepository userRepository;

    public String extractUserEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(String userEmail) {
        String token = Jwts.builder()
                .subject(userEmail)
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(secretKey())
                .compact();

        // Store the token
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserCode userCode = new UserCode();
        userCode.setToken(token);
        userCode.setUserData(user);
        userTokenRepository.save(userCode);

        return token;
    }

    private SecretKey secretKey() {
        byte[] decode = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(decode);
    }

    public boolean isValidToken(String token) {
        boolean tokenPresent = userTokenRepository.findByToken(token).isPresent();
        Date expirationDate = extractClaim(token, Claims::getExpiration);
        return tokenPresent && expirationDate.after(new Date());
    }
}