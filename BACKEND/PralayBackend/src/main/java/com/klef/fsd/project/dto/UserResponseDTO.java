package com.klef.fsd.project.dto;

import lombok.Data;

@Data
public class UserResponseDTO {

    private Long id;
    private String email;
    private String role;
    private String token;

    public UserResponseDTO(Long id, String email, String role, String token) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.token = token;
    }
}