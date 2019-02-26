package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.LKPInstitution;
import com.example.service.basecrud.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LKPInstitutionService extends BaseCRUDService<LKPInstitution> {

    @Autowired
    public void setDao(IGenericDao<LKPInstitution> daoToSet) {
        dao = daoToSet;
        dao.setClazz(LKPInstitution.class);
    }

}