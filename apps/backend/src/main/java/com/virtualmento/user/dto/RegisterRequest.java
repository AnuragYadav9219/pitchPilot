package com.virtualmento.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Full name is required") 
        @Size(
            min = 2, 
            max = 100,
            message = "Full name must be between 2 to 100 characters"
        )
        String fullName,
        
        @NotBlank(message = "Email is required")
        @Email(message = "Please provide a valid email address")
        @Size(max = 255, message = "Email must not exceed 255 characters")
        String email,

        @NotBlank(message = "Password is required")
        @Size(
                min = 8,
                max = 128,
                message = "Password must be between 8 and 128 characters"
        )
        String password
        ) {

}
