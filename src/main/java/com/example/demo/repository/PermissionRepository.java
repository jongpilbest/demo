package com.example.demo.repository;

import com.example.demo.entity.RolePermission;
import com.example.demo.enums.PermissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Role;
import java.util.List;

public interface PermissionRepository extends JpaRepository<RolePermission,Long> {
    List<RolePermission> findByRole(Role role);

}
