import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

// import static org.junit.Assert.*;

import org.springframework.beans.factory.annotation.Autowired;
// import javax.annotation.Resource;
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.PreparedStatement;  
import java.sql.ResultSet;  
// import java.sql.SQLException;

import java.util.List;

import com.tom.bean.User;
import com.tom.controller.UserController;
import com.tom.dao.IUserDao;
import com.tom.service.IUserService;


import com.alibaba.fastjson.JSON;
// import com.alibaba.fastjson.serializer.SerializerFeature;

@RunWith(SpringJUnit4ClassRunner.class) //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = { "classpath:spring/spring-mybatis.xml",  })

public class HelloTest {

  @Autowired
  private IUserDao userDao;

  @Autowired
  private IUserService userService;

  @Autowired
  private UserController userView;

  @Before
  public void setUp() throws Exception {
    // System.out.println("单元测试开始前相关操作...");
    System.out.println(" ");
  }

  @After
  public void tearDown() throws Exception {
    // System.out.println("单元测试结束后相关操作...");
    System.out.println(" ");
  }

  @Test
  public void testConnData(){
    System.out.println("=================================jdbc连接数据库测试==================================================");
    Connection conn = null;
		PreparedStatement pstmt = null;

    try {
      Class.forName("org.postgresql.Driver");
      conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/lyblog?characterEncoding=utf-8", "postgres", "123456");

      System.out.println("Opened database successfully");
      // UPDATE ly_user SET create_time = ? WHERE name = ?
      pstmt = conn.prepareStatement("select * from ly_user where name=?;");
      pstmt.setString(1, "Tom");
      ResultSet rs = pstmt.executeQuery();
      while(rs.next()){
        String name=rs.getString("name");
        java.util.Date createTime = rs.getDate("create_time");
        System.out.println("姓名： " + name);
        System.out.println("创建时间： " + createTime);
      }
      rs.close();
      pstmt.close();
      conn.close();
  
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println(e.getClass().getName()+": "+e.getMessage());
      System.exit(0);
    }
  }

  @Test
  public void testDao(){
    System.out.println("=====================================Dao 测试==============================================");
    List<User> allUserInfoListDao = userDao.selectAllUserInfo();
    String jsonString = JSON.toJSONString(allUserInfoListDao);
    System.out.println(jsonString);
  }


  @Test
  public void testService(){
    System.out.println("=====================================Service 测试==============================================");
    List<User> allUserInfoListService = userService.getAllUserInfo();
    // 美化 json 字符串输出在控制台
    // String jsonString = JSON.toJSONString(allUserInfoList, SerializerFeature.PrettyFormat, SerializerFeature.WriteNullStringAsEmpty, SerializerFeature.UseSingleQuotes);
    String jsonString = JSON.toJSONString(allUserInfoListService);
    System.out.println(jsonString);
  }

  @Test
  public void testController(){
    System.out.println("=====================================Controller 测试==============================================");
    List<User> allUserInfoListController = userView.getAllUserListAjax();
    // 美化 json 字符串输出在控制台
    // String jsonString = JSON.toJSONString(allUserInfoList, SerializerFeature.PrettyFormat, SerializerFeature.WriteNullStringAsEmpty, SerializerFeature.UseSingleQuotes);
    String jsonString = JSON.toJSONString(allUserInfoListController);
    System.out.println(jsonString);
  }
}