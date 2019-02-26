package com.example.controller;

import com.example.controller.basecrud.BaseCRUDController;
import com.example.dal.entity.Education;
import com.example.dal.entity.Person;
import com.example.dto.PreviousJobDTO;
import com.example.service.PersonService;
import com.example.service.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/persons")
public class PersonController extends BaseCRUDController<Person> {

    @Autowired
    private PersonService personService;

    @RequestMapping(value = "/me/", method = RequestMethod.GET)
    public Person getCurrentUserPerson() throws BadRequestException {
        return personService.findOne(getCurrentUser().getPerson().getId(), getCurrentUser());
    }

    @RequestMapping(value = "/education/", method = RequestMethod.PUT)
    public Education updatePersonEducation(@RequestBody Education education) throws BadRequestException {
        return personService.updatePersonEducation(education, getCurrentUser());
    }

    @RequestMapping(value = "/previous-jobs/", method = RequestMethod.GET)
    public List<PreviousJobDTO> getPreviousJobs() {
        return personService.getPreviousJobs(getCurrentUser().getPerson().getId());
    }
}
