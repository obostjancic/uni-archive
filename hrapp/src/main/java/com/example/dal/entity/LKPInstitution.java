package com.example.dal.entity;

import com.example.util.StrUtil;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "lkp_institution")
@Entity
public class LKPInstitution extends BaseEntity{

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String place;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    @Override
    public boolean isValid() {
        return (!StrUtil.nullOrEmpty(this.getName()) && !StrUtil.nullOrEmpty(this.getPlace()));
    }
}
