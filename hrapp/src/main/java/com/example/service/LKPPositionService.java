package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.LKPPosition;
import com.example.service.basecrud.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LKPPositionService extends BaseCRUDService<LKPPosition> {

    @Autowired
    public void setDao(IGenericDao<LKPPosition> daoToSet) {
        dao = daoToSet;
        dao.setClazz(LKPPosition.class);
    }

}
