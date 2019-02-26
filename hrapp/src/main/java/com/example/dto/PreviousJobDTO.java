package com.example.dto;

import com.example.dal.entity.Company;
import com.example.dal.entity.Contract;
import com.example.dal.entity.LKPPosition;

import java.util.Date;

public class PreviousJobDTO {

    private Company employer;
    private Date startDate;
    private Date endDate;
    private LKPPosition position;

    public PreviousJobDTO() {
    }

    public PreviousJobDTO(Contract contract) {
        this.employer = contract.getEmployer();
        this.startDate = contract.getStartDate();
        this.endDate = contract.getEndDate();
        this.position = contract.getPosition();
    }

    public PreviousJobDTO(Company employer, Date startDate, Date endDate, LKPPosition position) {
        this.employer = employer;
        this.startDate = startDate;
        this.endDate = endDate;
        this.position = position;
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

    public LKPPosition getPosition() {
        return position;
    }

    public void setPosition(LKPPosition position) {
        this.position = position;
    }
}
