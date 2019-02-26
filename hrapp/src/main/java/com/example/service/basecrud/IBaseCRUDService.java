package com.example.service.basecrud;

import com.example.dal.entity.BaseEntity;
import com.example.dal.entity.HrappUser;
import com.example.dal.exceptions.DBException;
import com.example.service.exceptions.BadRequestException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IBaseCRUDService<T extends BaseEntity> {
    @Transactional(readOnly = true)
    T findOne(long entityId, HrappUser user) throws BadRequestException;

    @Transactional(readOnly = true)
    List<T> findAll(HrappUser user);

    @Transactional
    T create(T entity, HrappUser user) throws DBException;

    @Transactional
    T update(T entity, HrappUser user) throws DBException;

    @Transactional
    void delete(T entity, HrappUser user) throws DBException;

    @Transactional
    void deleteById(long entityId, HrappUser user) throws DBException;
}
