package com.example.controller;

import com.example.controller.basecrud.BaseCRUDController;
import com.example.dal.entity.Company;
import com.example.dal.entity.Contract;
import com.example.dal.entity.Person;
import com.example.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/contracts")
public class ContractController extends BaseCRUDController<Contract> {

    @Autowired
    private ContractService contractService;

    @RequestMapping(value = "/employees/{companyId}", method = RequestMethod.GET)
    public List<Person> getEmployeesByCompanyId(@PathVariable Long companyId) {
        return contractService.getEmployeesByCompanyId(companyId);
    }

    @RequestMapping(value = "/companies/{personId}", method = RequestMethod.GET)
    public List<Company> getCompaniesByEmployeeId(@PathVariable Long personId) {
        return contractService.getCompaniesByEmployeeId(personId);
    }

}
