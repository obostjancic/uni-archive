package com.example.controller;

import com.example.controller.basecrud.BaseCRUDController;
import com.example.dal.entity.LKPPosition;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/positions")
public class LKPPositionController extends BaseCRUDController<LKPPosition> {
}
