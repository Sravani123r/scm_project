package com.scm.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scm.dto.ProfileDto;
import com.scm.dto.UserDto;
import com.scm.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping(
            value = "/profile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public UserDto updateProfile(
            @RequestPart("data") String data,
            @RequestPart(value = "profilePic", required = false) MultipartFile profilePic,
            Authentication authentication
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        ProfileDto profileDto = mapper.readValue(data, ProfileDto.class);

        String email = authentication.getName();
        return userService.updateProfile(email, profileDto, profilePic);
    }

}
