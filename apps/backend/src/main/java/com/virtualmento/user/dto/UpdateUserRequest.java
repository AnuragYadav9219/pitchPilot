package com.virtualmento.user.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(

        @Size(max = 100, message = "Full name cannot exceed 100 characters") 
        String fullName,

        @Size(max = 20)
        @Pattern(regexp = "^\\+?[1-9]\\d{7,14}$", message = "Invalid phone number") 
        String phoneNumber

) {

}
