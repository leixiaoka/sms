var models = require('./db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('./mysql');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 查询登录用户
router.post('/login',(req, res) => {
  console.log("11111");
  let sql = $sql.common.login;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.user_name,params.user_password], function(err, result) {
    if (err) {
      console.log("查询失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 修改密码
router.post('/updatePwd',(req, res) => {
  console.log("11111");
  let sql = $sql.common.updatePwd;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.user_password,params.user_id], function(err, result) {
    if (err) {
      console.log("查询失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 根据关键字查询用户列表接口
router.post('/searchUser',(req, res) => {
  let sql = $sql.user.searchUser;
  let params = req.body;
  console.log(sql);
  conn.query(sql, [params.user_name], function(err, result) {
    if (err) {
      console.log("查询失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 查询用户列表接口
router.post('/queryUser', (req, res) => {
  let sql = $sql.user.query;
  conn.query(sql, function(err, result){
    if (err) {
      console.log("查询失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 查询某个用户信息接口
router.post('/queryUserInfo',(req, res) => {
  let sql = $sql.user.queryInfo;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.id], function(err, result) {
    if (err) {
      console.log("查询失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 删除某个用户信息接口
router.post('/delUser',(req, res) => {
  let sql = $sql.user.delete;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.id], function(err, result) {
    if (err) {
      console.log("删除失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 修改用户信息接口
router.post('/updateInfo',(req, res) => {
  let sql = $sql.user.updateInfo;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.name,params.age,params.sex,params.address,params.datetime,params.id], function(err, result) {
    if (err) {
      console.log("修改失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 增加用户接口
router.post('/addUser', (req, res) => {
  let sql = $sql.user.add;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.name, params.age, params.sex, params.address, params.datetime], function(err, result) {
    if (err) {
      console.log("添加失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});



module.exports = router;