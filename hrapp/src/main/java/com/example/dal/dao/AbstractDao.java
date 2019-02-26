package com.example.dal.dao;

import com.example.dal.entity.BaseEntity;
import com.example.dal.exceptions.DBException;
import com.example.dal.exceptions.EmptyResultException;
import com.example.dal.exceptions.MultipleResultsException;
import com.example.util.CopyUtil;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Map;

public abstract class AbstractDao<T extends BaseEntity> {

    @PersistenceContext
    private EntityManager entityManager;
    private Class<T> clazz;

    public void setClazz(Class<T> clazzToSet) {
        this.clazz = clazzToSet;
    }

    public T findOne(long id) throws DBException {
        T result = entityManager.find(clazz, id);
        if (result == null) {
            throw new DBException("Could not get " + clazz.getSimpleName() + " with id: " + id);
        }
        return result;
    }

    public List<T> findAll() throws EmptyResultException {
        List<T> result = entityManager.createQuery("from " + clazz.getSimpleName()).getResultList();

        if (CollectionUtils.isEmpty(result)) {
            throw new EmptyResultException("No records found of type " + clazz.getSimpleName());
        }

        return result;
    }

    public T create(T entity) throws DBException {
        try {
            entityManager.persist(entity);
            return entity;
        } catch (Exception e) {
            throw new DBException("Could not save " + clazz.getSimpleName(), e);
        }
    }

    public T update(T entity) throws DBException {
        try {
            T existing = findOne(entity.getId());
            CopyUtil.copyNonNullProps(entity, existing);
            entityManager.persist(existing);
            return existing;
        } catch (Exception e) {
            throw new DBException("Could not update " + clazz.getSimpleName(), e);
        }
    }

    public void delete(T entity) throws DBException {
        try {
            entity = entityManager.merge(entity);
            entityManager.remove(entity);
        } catch (Exception e) {
            throw new DBException("Could not delete " + clazz.getSimpleName(), e);
        }
    }

    public void deleteById(long id) throws DBException {
        try {
            T entity = findOne(id);
            delete(entity);
        } catch (Exception e) {
            throw new DBException("Could not delete " + clazz.getSimpleName() + " with id: " + id, e);
        }
    }

    public List<T> query(String query, Map<String, Object> params) throws EmptyResultException {
        TypedQuery<T> createQuery = entityManager.createQuery(query, this.clazz);
        params.forEach(createQuery::setParameter);

        List<T> result = createQuery.getResultList();

        if (CollectionUtils.isEmpty(result)) {
            throw new EmptyResultException("No records found of type " + clazz.getSimpleName());
        }

        return result;
    }

    public List queryDTO(String query, Map<String, Object> params) throws EmptyResultException {
        Query createQuery = entityManager.createQuery(query);
        params.forEach(createQuery::setParameter);

        List result = createQuery.getResultList();

        if (CollectionUtils.isEmpty(result)) {
            throw new EmptyResultException("No records found of type " + clazz.getSimpleName());
        }

        return result;
    }

    public T queryOneResult(String query, Map<String, Object> params) throws EmptyResultException, MultipleResultsException {
        TypedQuery<T> createQuery = entityManager.createQuery(query, this.clazz);
        params.forEach(createQuery::setParameter);

        List<T> result = createQuery.getResultList();

        if (CollectionUtils.isEmpty(result)) {
            throw new EmptyResultException("No records found of type " + clazz.getSimpleName());
        }

        if (result.size() > 1) {
            throw new MultipleResultsException("Multiple records found of type " + clazz.getSimpleName());
        }

        return result.get(0);
    }

}

