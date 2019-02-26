package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.Education;
import com.example.dal.entity.HrappUser;
import com.example.dal.entity.Person;
import com.example.dal.exceptions.DBException;
import com.example.dal.exceptions.EmptyResultException;
import com.example.dto.PreviousJobDTO;
import com.example.service.basecrud.BaseCRUDService;
import com.example.service.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PersonService extends BaseCRUDService<Person> {

    private IGenericDao<Education> educationDao;

    @Autowired
    public void setEducationDao(IGenericDao<Education> daoToSet){
        educationDao = daoToSet;
        educationDao = daoToSet;
    }

    @Autowired
    public void setDao(IGenericDao<Person> daoToSet) {
        dao = daoToSet;
        dao.setClazz(Person.class);
    }

    @Transactional(readOnly = true)
    public List<PreviousJobDTO> getPreviousJobs(long personId) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("personId", personId);
            return dao.queryDTO("SELECT new com.example.dto.PreviousJobDTO(c) FROM Contract c " +
                                "WHERE c.employee.id = :personId ORDER BY c.startDate DESC", params);
        } catch (EmptyResultException e) {
            return Collections.emptyList();
        }
    }

    @Transactional
    public Education updatePersonEducation(Education education, HrappUser user) throws BadRequestException {
        if (education == null || education.getTitle() == null) {
            throw new IllegalArgumentException("education parameter must be properly specified!");
        }
        if (education.getInstitution() == null || education.getTitle() == null) {
            throw new IllegalArgumentException("institution parameter must be properly specified!");
        }
        try {
            educationDao.create(education);
            user.getPerson().setEducation(education);
            dao.update(user.getPerson());
            return user.getPerson().getEducation();
        } catch (DBException e) {
            throw new BadRequestException(e);
        }
    }
}
