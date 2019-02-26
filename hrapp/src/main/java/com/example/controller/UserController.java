package com.example.controller;


import com.example.dal.entity.HrappUser;
import com.example.service.UserService;
import com.example.service.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public HrappUser register(@RequestBody HrappUser hrappUser) throws BadRequestException {
        return userService.register(hrappUser);
    }

    private HrappUser getCurrentUser() {
        HrappUser user = (HrappUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.loadHrappUserByUsername(user.getUsername());
    }
}
