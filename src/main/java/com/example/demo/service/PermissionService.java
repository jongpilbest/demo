package com.example.demo.service;

import com.example.demo.dto.MemberPermissionResponse;
import com.example.demo.entity.Member;
import com.example.demo.entity.Role;
import com.example.demo.entity.RolePermission;
import com.example.demo.enums.PermissionType;
import com.example.demo.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PermissionService {

   private final MemberService memberService;
   private final PermissionRepository rolePermissionRepository;

      public MemberPermissionResponse FindMemberPermission(String username){

          Member member = memberService.findMember((username));
          if (member == null) {
              return MemberPermissionResponse.builder()
                      .role("UNKNOWN")
                      .permissions(Map.of())
                      .build();
          }
          Role role = member.getRole();

          // DB에 담긴 List 형태로 나온다.
          List<RolePermission> permissions = rolePermissionRepository.findByRole(role);
          // 리스트를 Map 으로 변환해서 프론트에 잘 전달하기


          // stream api 를 사용해서 복잡한 리스트 데이터를 MAp 형태로 바꾸는 과정

          Map<String, List<PermissionType>> permissionMap =  permissions.stream()
                  .collect(Collectors.groupingBy(
                          rp -> rp.getFeature().getCode(), // Key: Feature의 ID
                          Collectors.mapping(
                                  RolePermission::getPermissionType, // Value: PermissionType들
                                  Collectors.toList()
                          )
                  ));

          return MemberPermissionResponse.builder()
                  .role(role.getRoleName())
                  .permissions(permissionMap)
                  .build();

      }


}
