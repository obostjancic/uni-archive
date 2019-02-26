package com.example.controller.basecrud;

import com.example.dal.exceptions.DBException;
import com.example.service.exceptions.BadRequestException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface IBaseCRUDController<TE> {

    TE findOne(@PathVariable Long entityId) throws BadRequestException;

    List<TE> findAll();

    TE create(@RequestBody TE entity) throws DBException;

    TE update(@RequestBody TE entity) throws DBException;

    void delete(TE person) throws DBException;

    void deleteById(Long entityId) throws DBException;
}
