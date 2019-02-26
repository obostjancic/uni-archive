package com.example.dal.entity;

import com.example.util.StrUtil;

import javax.persistence.*;

@Table
@Entity
public class Education extends BaseEntity{

    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(nullable = false)
    private LKPInstitution institution;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LKPInstitution getInstitution() {
        return institution;
    }

    public void setInstitution(LKPInstitution institution) {
        this.institution = institution;
    }

    @Override
    public boolean isValid() {
        return (!StrUtil.nullOrEmpty(this.getTitle()) && this.getInstitution() != null);
    }
}
