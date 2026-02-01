package com.scm.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scm.dto.JwtResponse;
import com.scm.dto.UserDto;
import com.scm.entities.Providers;
import com.scm.entities.User;
import com.scm.repositories.UserRepo;
import com.scm.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepo userRepo;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2User principal = (OAuth2User) authentication.getPrincipal();

        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");
        String picture = principal.getAttribute("picture");

        User user = userRepo.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .profilePic(picture)
                    .provider(Providers.GOOGLE)
                    .enabled(true)
                    .emailVerified(true)
                    .password("GOOGLE_AUTH_USER")
                    .build();

            return userRepo.save(newUser);
        });

        JwtResponse jwtResponse = JwtResponse.builder()
                .accessToken(jwtService.generateAccessToken(email))
                .refreshToken(jwtService.generateRefreshToken(email))
                .user(UserDto.from(user))
                .build();

        String redirectUrl =
                "http://localhost:5173/oauth-success" +
                        "?accessToken=" + URLEncoder.encode(jwtResponse.getAccessToken(), StandardCharsets.UTF_8) +
                        "&refreshToken=" + URLEncoder.encode(jwtResponse.getRefreshToken(), StandardCharsets.UTF_8) +
                        "&user=" + URLEncoder.encode(
                        new ObjectMapper().writeValueAsString(jwtResponse.getUser()),
                        StandardCharsets.UTF_8
                );

        response.sendRedirect(redirectUrl);

    }
}
