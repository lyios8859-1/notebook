package com.tom.dao;

import java.util.List;

import com.tom.bean.User;

public interface IUserDao {
  public List<User> selectAllUserInfo();
}