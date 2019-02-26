package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.Company;
import com.example.service.basecrud.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService extends BaseCRUDService<Company> {

    @Autowired
    public void setDao(IGenericDao<Company> daoToSet) {
        dao = daoToSet;
        dao.setClazz(Company.class);
    }

}
