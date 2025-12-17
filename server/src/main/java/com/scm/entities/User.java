package com.scm.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity(name="user")
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    @Column(name="user_name", nullable=false)
    private String name;
    @Column(unique=true , nullable=false)
    private String email;
    private String password;
    @Column(length=1000)
    private String about;
    @Column(length = 1000)
    private String profilePic;
    private String phoneNumber;
    private boolean enabled=false;
    private boolean emailVerified=false;
    private boolean phoneVerified=false;

    @Enumerated(value = EnumType.STRING)
    //SELF ,GOOGLE, GITHUB, LINKEDLN ,FACEBOOK ,TWITTER
    private Providers provider=Providers.SELF;
    private String providerUserId;

    @OneToMany(mappedBy = "user", cascade=CascadeType.ALL,fetch=FetchType.LAZY,orphanRemoval = true)
    private List<Contact> contacts=new ArrayList<>();
}
