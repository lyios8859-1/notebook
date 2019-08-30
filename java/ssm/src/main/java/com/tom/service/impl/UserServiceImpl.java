package com.tom.service.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

import com.tom.service.IUserService;
import com.tom.bean.User;
import com.tom.dao.IUserDao;

@Service
public class UserServiceImpl implements IUserService{

  @Resource
  private IUserDao userDao;

  public List<User> getAllUserInfo() {
    List<User> allUserInfoList = userDao.selectAllUserInfo();
    return allUserInfoList;
  }
  
}