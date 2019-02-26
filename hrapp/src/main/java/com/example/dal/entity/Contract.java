package com.example.dal.entity;

import javax.persistence.*;
import java.sql.Date;

@Table
@Entity
public class Contract extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "employee", nullable = false)
    private Person employee;

    @ManyToOne
    @JoinColumn(name = "employer", nullable = false)
    private Company employer;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column
    private double salary;

    @Column(name = "free_days")
    private int freeDays;

    @ManyToOne
    @JoinColumn
    private LKPPosition position;

    public Person getEmployee() {
        return employee;
    }

    public void setEmployee(Person employee) {
        this.employee = employee;
    }

    public Company getEmployer() {
        return employer;
    }

    public void setEmployer(Company employer) {
        this.employer = employer;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public int getFreeDays() {
        return freeDays;
    }

    public void setFreeDays(int freeDays) {
        this.freeDays = freeDays;
    }

    public LKPPosition getPosition() {
        return position;
    }

    public void setPosition(LKPPosition position) {
        this.position = position;
    }

    public boolean isValid() {
        return (this.getEmployee() != null && this.getEmployer() != null &&
                this.getStartDate() != null && this.getPosition() != null);
    }
}
