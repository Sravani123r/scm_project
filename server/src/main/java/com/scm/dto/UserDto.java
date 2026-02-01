package com.scm.dto;

import com.scm.entities.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private String userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String about;
    private String profilePic;
    private boolean emailVerified;
    private boolean phoneVerified;

    public static UserDto from(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .about(user.getAbout())
                .profilePic(user.getProfilePic())
                .build();
    }


}
