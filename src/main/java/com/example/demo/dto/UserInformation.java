package com.example.demo.dto;


import lombok.*;

@Builder
@AllArgsConstructor
@Setter
@Getter
@ToString
public class UserInformation
{   private Long id;
    private String username;
    private String name;
    private String role;
    private String company;
    private String email;
    private String phone;
    private String refreshToken;

}
