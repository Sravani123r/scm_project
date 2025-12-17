package com.scm.services;

import com.scm.dto.JwtResponse;
import com.scm.dto.LoginRequest;
import com.scm.dto.SignupRequest;
import com.scm.dto.UserDto;
import com.scm.entities.User;

import java.util.List;
import java.util.Optional;

public interface  UserService {
    UserDto registerUser(SignupRequest request);
    JwtResponse login(LoginRequest request);   // 👈 add this

}
