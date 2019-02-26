package com.example.dal.entity;

import com.example.util.StrUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Table(name = "hrapp_user")
@Entity
public class HrappUser extends BaseEntity {

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @JsonIgnore
    @Column(name = "non_locked", nullable = false, columnDefinition = "boolean default true")
    private boolean nonLocked;

    @JsonIgnore
    @Column(name = "non_expired", nullable = false, columnDefinition = "boolean default true")
    private boolean nonExpired;

    @JsonIgnore
    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean enabled;

    @JsonIgnore
    @Column(name = "credentials_non_expired", nullable = false, columnDefinition = "boolean default true")
    private boolean credentialsNonExpired;

    @ManyToOne
    @JoinColumn(name = "person", nullable = false)
    private Person person;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public boolean isNonLocked() {
        return nonLocked;
    }

    public void setNonLocked(boolean nonLocked) {
        this.nonLocked = nonLocked;
    }

    public boolean isNonExpired() {
        return nonExpired;
    }

    public void setNonExpired(boolean nonExpired) {
        this.nonExpired = nonExpired;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public boolean isValid() {
        return (!StrUtil.nullOrEmpty(this.getUsername()) && !StrUtil.nullOrEmpty(this.getPassword()));
    }
}
