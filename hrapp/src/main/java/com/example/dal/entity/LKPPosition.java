package com.example.dal.entity;

import com.example.util.StrUtil;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "lkp_position")
@Entity
public class LKPPosition extends BaseEntity {

    @Column(nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isValid() {
        return (!StrUtil.nullOrEmpty(this.getName()));
    }
}
