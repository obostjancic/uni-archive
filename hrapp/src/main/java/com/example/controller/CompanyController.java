package com.example.controller;

import com.example.controller.basecrud.BaseCRUDController;
import com.example.dal.entity.Company;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/companies")
public class CompanyController extends BaseCRUDController<Company> {
}
