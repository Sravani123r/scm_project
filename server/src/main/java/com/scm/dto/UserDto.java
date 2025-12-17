package com.scm.dto;

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
}
