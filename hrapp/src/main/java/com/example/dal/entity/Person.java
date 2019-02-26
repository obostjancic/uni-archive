package com.example.dal.entity;

import com.example.util.StrUtil;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Table(name = "person")
@Entity
public class Person extends BaseEntity {

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private Date birthday;

    @Column(name = "place_of_birth", nullable = false)
    private String placeOfBirth;

    @Column
    private String telephone;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn
    private Education education;

    @ManyToMany(mappedBy = "persons")
    private List<Task> tasks;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    //FIXME create 2 methods: isvalidcreate and isvaliedupdate
    public boolean isValid() {
        return true;
        /*
        return (!StrUtil.nullOrEmpty(this.getFirstName()) &&
                !StrUtil.nullOrEmpty(this.getLastName()) && this.getBirthday() != null &&
                !StrUtil.nullOrEmpty(this.getPlaceOfBirth()));*/
    }

}
