package com.example.service.basecrud;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.BaseEntity;
import com.example.dal.entity.HrappUser;
import com.example.dal.exceptions.DBException;
import com.example.dal.exceptions.EmptyResultException;
import com.example.service.exceptions.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public abstract class BaseCRUDService<TE extends BaseEntity> implements IBaseCRUDService<TE> {

    protected IGenericDao<TE> dao;

    private Class<TE> clazz;

    public void setClazz(Class<TE> clazzToSet) {
        this.clazz = clazzToSet;
    }

    @Override
    @Transactional(readOnly = true)
    public TE findOne(long entityId, HrappUser user) throws BadRequestException {
        if (!validId(entityId)) {
            throw new IllegalArgumentException("Invalid id parameter");
        }
        try {
            return dao.findOne(entityId);
        } catch (DBException e) {
            throw new BadRequestException(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<TE> findAll(HrappUser user) {
        try {
            return dao.findAll();
        } catch (EmptyResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    @Transactional
    public TE create(TE entity, HrappUser user) throws DBException {
        return dao.create(entity);
    }

    @Override
    @Transactional
    public TE update(TE entity, HrappUser user) throws DBException {
        if (!entity.isValid()) {
            throw new IllegalArgumentException("Invalid entity parameter");
        }
        return dao.update(entity);
    }

    @Override
    @Transactional
    public void delete(TE entity, HrappUser user) throws DBException {
        if (!entity.isValid()) {
            throw new IllegalArgumentException("Invalid entity parameter");
        }
        dao.delete(entity);
    }

    @Override
    @Transactional
    public void deleteById(long entityId, HrappUser user) throws DBException {
        if (!validId(entityId)) {
            throw new IllegalArgumentException("Invalid id parameter");
        }
        dao.deleteById(entityId);
    }

    private boolean validId(long entityId) {
        return entityId != 0;
    }
}
