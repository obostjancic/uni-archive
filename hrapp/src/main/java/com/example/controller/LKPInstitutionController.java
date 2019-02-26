package com.example.controller;

import com.example.controller.basecrud.BaseCRUDController;
import com.example.dal.entity.LKPInstitution;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/institutions")
public class LKPInstitutionController extends BaseCRUDController<LKPInstitution> {
}
