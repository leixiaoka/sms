<template>
  <div>
  <!-- 用户信息页 -->
  <el-page-header @back="goBack" content="用户信息页面"></el-page-header>
  <el-form style="width:500px" size="medium" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age" placeholder="请输入年龄"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="ruleForm.sex" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
    </el-form-item>
    <el-form-item label="日期" prop="datetime">
      <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" @change="getDate" v-model="ruleForm.datetime" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <template v-if="userId == ''">
        <el-button type="primary" @click="submitAddForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <router-link :to="{path: '/user'}"><el-button>返回</el-button></router-link>
      </template>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
export default {
  name: 'User',
  data () {
    return {
      userId: '',
      ruleForm: {
        name: '',
        age: '',
        sex: '',
        address: '',
        datetime: ''
      },
      rules: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        age: [
          {required: true, message: '年龄不能为空', trigger: 'blur'},
          {type: 'number', message: '年龄必须为数字值'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        address: [
          {required: true, message: '地址不能为空', trigger: 'blur'}
        ],
        datetime: [
          {required: true, message: '请选择时间', trigger: 'change'}
        ]
      }
    }
  },
  mounted(){
		this.getUserID()
	},
  methods: {
    // 返回上一页
    goBack(){
      this.$router.go(-1);
    },
    // 获取id
		getUserID(){
			this.userId = this.$route.query.id;
			if(this.userId != "" && this.userId != "undefined" &&  typeof(this.userId) != "undefined"){
				this.getUserInfo();
			}else{
				this.userId = "";
			}
    },
    // 获取用户信息
    getUserInfo(){
      this.$axios.post('/api/user/queryUserInfo',{id: this.userId}).then((res) => {
        console.log(res.data);
        if(res.status == 200){
          this.ruleForm = res.data[0];
        }else{
          this.$message.error('用户信息加载失败');
          setTimeout(() => {
            this.$router.push({path:'/user'});
          }, 3000);
        }
      });
    },
    // 新增用户
    submitAddForm(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          this.$axios.post('/api/user/addUser',{name: this.ruleForm.name, age: this.ruleForm.age, sex: this.ruleForm.sex, address: this.ruleForm.address, datetime: this.ruleForm.datetime}).then((res) => {
            console.log(res);
            console.log(res.status);
            if(res.status == 200){
              this.$message({message:'用户添加成功！', type: 'success'});
              this.$router.push({path:'/user'});
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改用户信息
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          this.$axios.post('/api/user/updateInfo',{name: this.ruleForm.name, age: this.ruleForm.age, sex: this.ruleForm.sex, address: this.ruleForm.address, datetime: this.ruleForm.datetime, id: this.userId}).then((res) => {
            console.log(res);
            console.log(res.status);
            if(res.status == 200){
              this.$message({message:'信息修改成功！', type: 'success'});
              setTimeout(() => {
                this.$router.push({path:'/user'});
              }, 3000);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getDate(){
      console.log(this.ruleForm);
    }
  }
}
</script>
<style scoped>
.el-form{margin: 30px 0 0;}
</style>