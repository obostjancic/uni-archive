package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.Education;
import com.example.service.basecrud.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EducationService extends BaseCRUDService<Education> {

    @Autowired
    public void setDao(IGenericDao<Education> daoToSet) {
        dao = daoToSet;
        dao.setClazz(Education.class);
    }

}