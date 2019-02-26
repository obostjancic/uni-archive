package com.example.controller.basecrud;

import com.example.dal.entity.BaseEntity;
import com.example.dal.entity.HrappUser;
import com.example.dal.exceptions.DBException;
import com.example.service.UserService;
import com.example.service.basecrud.BaseCRUDService;
import com.example.service.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
public abstract class BaseCRUDController<T extends BaseEntity> implements IBaseCRUDController<T> {

    @Autowired
    protected BaseCRUDService<T> CRUDservice;

    @Autowired
    private UserService userService;

    protected HrappUser getCurrentUser() {
        HrappUser user = (HrappUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.loadHrappUserByUsername(user.getUsername());
    }

    @Override
    @RequestMapping(value = "/{entityId}")
    public T findOne(@PathVariable Long entityId) throws BadRequestException {
        return CRUDservice.findOne(entityId, getCurrentUser());
    }

    @Override
    @RequestMapping
    public List<T> findAll() {
        return CRUDservice.findAll(getCurrentUser());
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public T create(@RequestBody T entity) throws DBException {
        return CRUDservice.create(entity, getCurrentUser());
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public T update(@RequestBody T entity) throws DBException {
        return CRUDservice.update(entity, getCurrentUser());
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestBody T entity) throws DBException {
        CRUDservice.delete(entity, getCurrentUser());
    }

    @Override
    @RequestMapping(value = "/{entityId}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable Long entityId) throws DBException {
        CRUDservice.deleteById(entityId, getCurrentUser());
    }
}
