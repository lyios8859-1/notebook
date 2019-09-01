package com.tom.controller;

import java.util.List;
import com.alibaba.fastjson.JSON;

import com.tom.bean.User;
import com.tom.service.IUserService;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user") // url:/模块/资源/{id}/细分 /seckill/list
public class UserController {

  // private Logger logger = LoggerFactory.getLogger(this.getClass());
  
  private static final String SUCCESS = "success";

  @Autowired
  private IUserService userService;

  @RequestMapping("/all/list/ajax")
  @ResponseBody   // ajax 请求需要
  public List<User> getAllUserListAjax() {
    List<User> allUserInfoList = userService.getAllUserInfo();
    return allUserInfoList;
  }

  @RequestMapping(value = "/all/list", method = RequestMethod.POST)
  public String getAllUserList() {
    List<User> allUserInfoList = userService.getAllUserInfo();
    System.out.println(">>>>>>>>>>>>>>>>>>>>>>" + allUserInfoList);
    String jsonString = JSON.toJSONString(allUserInfoList);
    System.out.println("==================================s" + jsonString);
    return SUCCESS;
  }

  @RequestMapping(value = "/test", method = RequestMethod.GET)
  public String testUser() {
    System.out.println("==================================s");
    return SUCCESS;
  }
}