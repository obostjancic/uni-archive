package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.Company;
import com.example.dal.entity.Contract;
import com.example.dal.entity.Person;
import com.example.dal.exceptions.EmptyResultException;
import com.example.service.basecrud.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ContractService extends BaseCRUDService<Contract> {

    private IGenericDao<Person> personDao;
    private IGenericDao<Company> companyDao;

    @Autowired
    public void setDao(IGenericDao<Contract> daoToSet) {
        dao = daoToSet;
        dao.setClazz(Contract.class);
    }

    @Autowired
    public void setPersonDao(IGenericDao<Person> daoToSet) {
        personDao = daoToSet;
        personDao.setClazz(Person.class);
    }

    @Autowired
    public void setCompanyDao(IGenericDao<Company> daoToSet) {
        companyDao = daoToSet;
        companyDao.setClazz(Company.class);
    }

    @Transactional(readOnly = true)
    public List<Person> getEmployeesByCompanyId(Long companyId) {
        if (companyId == null)
            throw new IllegalArgumentException("comapnyId parameter must be specified!");

        try {
            Map<String, Object> params = new HashMap<>();
            params.put("companyId", companyId);

            String queryString = "SELECT c.employee FROM Contract c WHERE " +
                    "(current_date() BETWEEN c.startDate AND c.endDate OR c.endDate IS NULL) " +
                    "AND c.employer.id = :companyId";

            return personDao.query(queryString, params);
        } catch (EmptyResultException e) {
            return Collections.emptyList();
        }
    }

    @Transactional(readOnly = true)
    public List<Company> getCompaniesByEmployeeId(Long personId) {
        if (personId == null)
            throw new IllegalArgumentException("personId parameter must be specified!");

        try {
            Map<String, Object> params = new HashMap<>();
            params.put("personId", personId);

            String queryString = "SELECT c.employer FROM Contract c WHERE c.employee.id = :personId";

            return companyDao.query(queryString, params);
        } catch (EmptyResultException e) {
            return Collections.emptyList();
        }
    }

}
