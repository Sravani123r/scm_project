package com.scm.services.impl;


import com.scm.dto.JwtResponse;
import com.scm.dto.LoginRequest;
import com.scm.dto.SignupRequest;
import com.scm.dto.UserDto;
import com.scm.entities.Providers;
import com.scm.entities.User;
import com.scm.repositories.UserRepo;
import com.scm.security.JwtService;
import com.scm.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDto registerUser(SignupRequest request) {
        userRepo.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new RuntimeException("Email already registered!");
        });
            User user=User.builder()
                    .name(request.getUserName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .phoneNumber(request.getContactNumber())
                    .about(request.getAbout())
                    .enabled(true)
                    .emailVerified(false)
                    .phoneVerified(false)
                    .provider(Providers.SELF)
                    .build();

            User savedUser=userRepo.save(user);

        return UserDto.builder()
                .userId(savedUser.getUserId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .phoneNumber(savedUser.getPhoneNumber())
                .about(savedUser.getAbout())
                .profilePic(savedUser.getProfilePic())
                .build();
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

    String token=jwtService.generateToken(user.getEmail());

        return JwtResponse.builder()
                .token(token)
                .user(UserDto.builder()
                        .userId(user.getUserId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phoneNumber(user.getPhoneNumber())
                        .about(user.getAbout())
                        .build())
        .build();

    }
}