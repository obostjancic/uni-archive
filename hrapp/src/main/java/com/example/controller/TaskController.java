package com.example.controller;

import com.example.controller.basecrud.BaseCRUDController;
import com.example.dal.entity.Task;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/tasks")
public class TaskController extends BaseCRUDController<Task> {
}
