package com.example.dal.entity;

import com.example.util.StrUtil;

import javax.persistence.*;
import java.util.List;

@Table(name = "company")
@Entity
public class Company extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column
    private String address;

    @Column
    private String description;

    @Column
    private String telephone;

    @ManyToMany
    @JoinTable(name = "company_project",
            joinColumns = { @JoinColumn(name = "company") },
            inverseJoinColumns = { @JoinColumn(name = "project") })
    private List<Project> projects;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    @Override
    public boolean isValid() {
        return false;
    }
}
