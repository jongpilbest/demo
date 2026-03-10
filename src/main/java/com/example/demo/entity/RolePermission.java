package com.example.demo.entity;

import com.example.demo.enums.PermissionType;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class RolePermission {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Role role;

    @ManyToOne
    private Feature feature;

     // enum 의 값을 DB에 어떤 형태로 저장할지 지정하는 JPA 설정 값입니다.
    // 문자열 그대로 저장됩니다.
    // permissionType enum 에 저장했던 String 값을 넣겠다는 의미로 사용합니다.
    @Enumerated(EnumType.STRING)
    PermissionType permissionType;


}


