package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.Task;
import com.example.service.basecrud.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService extends BaseCRUDService<Task> {

    @Autowired
    public void setDao(IGenericDao<Task> daoToSet) {
        dao = daoToSet;
        dao.setClazz(Task.class);
    }

}
