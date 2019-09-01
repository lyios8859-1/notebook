package com.tom.controller;

import java.util.List;

import com.tom.bean.User;
import com.tom.service.IUserService;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMapping;

@Controller
// @RequestMapping("/user") // url:/模块/资源/{id}/细分 /seckill/list
public class UserController {

  // private Logger logger = LoggerFactory.getLogger(this.getClass());
  
  @Autowired
  private IUserService userService;

  // @RequestMapping("/all/list")
  public List<User> getAllUserList() {
    List<User> allUserInfoList = userService.getAllUserInfo();
    return allUserInfoList;
  }
}