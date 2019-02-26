package com.example.dal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonIgnore
    @Column(name = "created_on")
    private Date createdOn;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "created_by")
    private HrappUser createdBy;

    @JsonIgnore
    @Column(name = "last_modified_on")
    private Date lastModifiedOn;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "last_modified_by")
    private HrappUser lastModifiedBy;

    @JsonIgnore
    public abstract boolean isValid();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public HrappUser getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(HrappUser createdBy) {
        this.createdBy = createdBy;
    }

    public Date getLastModifiedOn() {
        return lastModifiedOn;
    }

    public void setLastModifiedOn(Date lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public HrappUser getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(HrappUser lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }
}
