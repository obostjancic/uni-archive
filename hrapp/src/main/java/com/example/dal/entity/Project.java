package com.example.dal.entity;

import javax.persistence.*;
import java.util.List;

@Table(name = "project")
@Entity
public class Project extends BaseEntity {

    @Column
    private String name;

    @Column
    private String description;

    @ManyToMany
    @JoinTable(name = "company_project",
               joinColumns = { @JoinColumn(name = "project") },
               inverseJoinColumns = { @JoinColumn(name = "company") })
    private List<Company> companies;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Company> getCompanies() {
        return companies;
    }

    public void setCompanies(List<Company> companies) {
        this.companies = companies;
    }

    @Override
    public boolean isValid() {
        return false;
    }
}
