package com.virtualmento.user.entity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.virtualmento.common.entity.BaseEntity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 2000)
    private String bio;

    @Column(length = 500)
    private String education;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ExperienceLevel experienceLevel;

    @ElementCollection
    @CollectionTable(name = "user_profile_skills", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "skill", nullable = false)
    @Builder.Default
    private Set<String> skills = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "user_profile_interests", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "interest", nullable = false)
    @Builder.Default
    private Set<String> interests = new HashSet<>();

    @Column(length = 1000)
    private String careerGoal;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private LearningStyle learningStyle;
}