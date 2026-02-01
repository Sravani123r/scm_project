package com.scm.services.impl;

import com.scm.dto.*;
import com.scm.entities.Providers;
import com.scm.entities.User;
import com.scm.repositories.UserRepo;
import com.scm.security.JwtService;
import com.scm.services.ImageService;
import com.scm.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    // ---------- REGISTER ----------
    @Override
    public UserDto registerUser(SignupRequest request) {

        userRepo.findByEmail(request.getEmail())
                .ifPresent(u -> {
                    throw new RuntimeException("Email already registered!");
                });

        User user = User.builder()
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

        return UserDto.from(userRepo.save(user));
    }

    // ---------- UPDATE PROFILE ----------
    @Override
    public UserDto updateProfile(
            String email,
            ProfileDto dto,
            MultipartFile profilePic
    ) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getName() != null)
            user.setName(dto.getName());

        if (dto.getPhoneNumber() != null)
            user.setPhoneNumber(dto.getPhoneNumber());

        if (dto.getAbout() != null)
            user.setAbout(dto.getAbout());

        if (profilePic != null && !profilePic.isEmpty()) {

            if (user.getProfilePicPublicId() != null) {
                imageService.delete(user.getProfilePicPublicId());
            }

            var result = imageService.upload(profilePic, "scm_profiles");
            user.setProfilePic(result.getUrl());
            user.setProfilePicPublicId(result.getPublicId());
        }

        return UserDto.from(userRepo.save(user));
    }
}
