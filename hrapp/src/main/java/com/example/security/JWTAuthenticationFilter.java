package com.example.security;

import com.example.dal.entity.HrappUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import static com.example.security.SecurityConstants.EXPIRATION_TIME;
import static com.example.security.SecurityConstants.SECRET;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            HrappUser hrappUser = new ObjectMapper().readValue(request.getInputStream(), HrappUser.class);
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(hrappUser.getUsername(), hrappUser.getPassword()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException {
        ZonedDateTime expirationTimeUTC = ZonedDateTime.now(ZoneOffset.UTC).plus(EXPIRATION_TIME, ChronoUnit.MILLIS);
        User currentUser = (User) authResult.getPrincipal();
        String token = Jwts.builder().setSubject(currentUser.getUsername())
                .setExpiration(Date.from(expirationTimeUTC.toInstant()))
                .signWith(SignatureAlgorithm.HS256, SECRET).compact();
        response.getWriter().write(token);
    }
}
