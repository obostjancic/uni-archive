package com.example.service;

import com.example.dal.dao.IGenericDao;
import com.example.dal.entity.HrappUser;
import com.example.dal.exceptions.DBException;
import com.example.dal.exceptions.EmptyResultException;
import com.example.dal.exceptions.MultipleResultsException;
import com.example.service.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private PersonService personService;

    private IGenericDao<HrappUser> userDao;

    @Autowired
    public void setPersonDao(IGenericDao<HrappUser> daoToSet) {
        userDao = daoToSet;
        userDao.setClazz(HrappUser.class);
    }

    @Transactional
    public HrappUser register(HrappUser user) throws BadRequestException {
        if (user == null || user.getUsername() == null || user.getPassword() == null || user.getPerson() == null) {
            throw new IllegalArgumentException("Username and password must be specified!");
        }
        HrappUser foundUser = loadHrappUserByUsername(user.getUsername());
        try {
            if (foundUser == null) {
                user.setPassword(encoder().encode(user.getPassword()));
                user.setPerson(personService.create(user.getPerson(), null));
                return userDao.create(user);
            } else {
                throw new BadRequestException("Registration failed");
            }
        } catch (DBException e) {
            throw new BadRequestException("Registration failed");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        HrappUser appUser = loadHrappUserByUsername(username);
        return new User(appUser.getUsername(), appUser.getPassword(), AuthorityUtils.createAuthorityList("ROLE_USER"));
    }

    public HrappUser loadHrappUserByUsername(String username) {
        Map<String, Object> params = new HashMap<>();
        params.put("username", username);
        try {
            return userDao.queryOneResult("FROM HrappUser hu WHERE hu.username = :username", params);
        } catch (EmptyResultException | MultipleResultsException e) {
            return null;
        }
    }

    @Bean
    private PasswordEncoder encoder() {
        return new BCryptPasswordEncoder(11);
    }
}
