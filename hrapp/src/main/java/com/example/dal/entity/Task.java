package com.example.dal.entity;

import com.example.util.StrUtil;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Table(name = "task")
@Entity
public class Task extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column
    private Date deadline;

    @ManyToMany
    @JoinTable(name = "person_task", joinColumns = @JoinColumn(name = "task"), inverseJoinColumns = @JoinColumn(name = "person"))
    private List<Person> persons;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
    }

    public boolean isValid() {
        return (!StrUtil.nullOrEmpty(this.getTitle()));
    }
}
