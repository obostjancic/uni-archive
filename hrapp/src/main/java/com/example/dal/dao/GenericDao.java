package com.example.dal.dao;

import com.example.dal.entity.BaseEntity;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

@Repository
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class GenericDao<T extends BaseEntity> extends AbstractDao<T> implements IGenericDao<T> {

}
