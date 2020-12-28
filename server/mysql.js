var sqlMap = {
  // 登录 注册 找回密码
  common: {
    login: 'select user_id,user_name from admin_tbl where user_name = ? and user_password = ?',
    updatePwd: 'update admin_tbl set user_password = ? where user_id = ?'
  },
  // 用户
  user: {
    searchUser: 'select * from user_tbl where name like "%"?"%" order by id desc',
    query: 'select * from user_tbl order by id desc',
    queryInfo: 'select * from user_tbl where id = ?',
    updateInfo: 'update user_tbl set name = ?,age = ?,sex = ?,address = ?,datetime = ? where id = ?',
    add: 'insert into user_tbl(name,age,sex,address,datetime) values(?,?,?,?,?)',
    delete: 'delete from user_tbl where id = ?'
  }
}

module.exports = sqlMap;
