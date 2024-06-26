package com.fashion.server.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "verification_user")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
public class VerificationUser extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "otp", nullable = false)
    private String otp;
}
