package com.example.dal.dao;

import com.example.dal.entity.BaseEntity;
import com.example.dal.exceptions.DBException;
import com.example.dal.exceptions.EmptyResultException;
import com.example.dal.exceptions.MultipleResultsException;

import java.util.List;
import java.util.Map;

public interface IGenericDao<T extends BaseEntity> {

    void setClazz(Class<T> clazzToSet);

    T findOne(long id) throws DBException;

    List<T> findAll() throws EmptyResultException;

    T create(T entity) throws DBException;

    T update(T entity) throws DBException;

    void delete(T entity) throws DBException;

    void deleteById(long entityId) throws DBException;

    List<T> query(String query, Map<String, Object> params) throws EmptyResultException;

    List queryDTO(String query, Map<String, Object> params) throws EmptyResultException;

    T queryOneResult(String query, Map<String, Object> params) throws EmptyResultException, MultipleResultsException;

}
