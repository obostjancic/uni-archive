package com.example.controller;

import com.example.controller.basecrud.BaseCRUDController;
import com.example.dal.entity.Education;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/educations")
public class EducationController extends BaseCRUDController<Education> {
}
