<template>
  <!-- 登录 -->
  <div id="Login">
    <h1>用户管理系统</h1>
    <el-form size="small" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
    };
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
    };
    return {
      ruleForm: {
        username:'',
        pwd:''
      },
      rules: {
        checkName: [
          { validator: checkName, trigger: 'blur' }
        ],
        checkPwd: [
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 用户登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/user/login',{user_name:this.ruleForm.username,user_password:this.ruleForm.pwd}).then((res) => {
            if(res.status == 200){
              console.log(res.data);
              if(res.data.length > 0){
                this.$message({message: '登录成功', type: 'success'});
                localStorage.setItem("user_id",res.data[0].user_id);
                localStorage.setItem("user_name",res.data[0].user_name);
                console.log(res.data[0]);
                console.log(localStorage.getItem("user_id"));
                console.log(localStorage.getItem("user_name"));
                setTimeout(() => {
                  this.$router.push({path:'/user'})
                }, 1000);
              }else{
                this.$message.error('登录失败');
              }
            }else{
              this.$message.error('登录失败');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
/* body,html{background: #e9eef3;} */
#Login{width: 300px; position: absolute; top: 25%; left: 50%; transform: translate(-50%, 0);}
h1{font-size: 20px; font-weight: normal; text-align: center; line-height: 80px; color: #555;}
</style>