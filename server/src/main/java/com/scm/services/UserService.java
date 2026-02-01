package com.scm.services;

import com.scm.dto.*;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserDto registerUser(SignupRequest request);
    UserDto updateProfile(
            String email,
            ProfileDto profileDto,
            MultipartFile profilePic
    );
}
