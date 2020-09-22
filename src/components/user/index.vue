<template>
  <!-- 列表内容 -->
  <div>
    <!-- 页头 -->
    <el-page-header content="用户列表页"></el-page-header>
    <!-- 搜索 -->
    <div class="search-box">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="formInline.uname" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="handleClick(0)"><i class="el-icon-plus"></i>新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 用户列表 -->
    <el-table size="medium" v-loading="loading" :data="userList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
      <el-table-column prop="datetime" :formatter="dateFormat" label="日期" width="200"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="handleViewClick(scope.row.id)" type="text" size="small"><i class="el-icon-view">查看</i></el-button>
          <el-button style="margin-right: 10px;" @click="handleClick(scope.row.id)" type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="delUser(scope.row.id)">
            <el-button slot="reference" type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="userList.length" :page-size="pageSize" :page-count="pageCount" :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    <!-- 用户详情弹层 -->
    <el-dialog width="600px" title="用户信息" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="4"><div class="grid-content grid-label">姓名：</div></el-col>
        <el-col :span="20"><div class="grid-content">{{form.name}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-label">性别：</div></el-col>
        <el-col :span="20"><div class="grid-content">{{form.sex}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-label">年龄：</div></el-col>
        <el-col :span="20"><div class="grid-content">{{form.age}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-label">地址：</div></el-col>
        <el-col :span="20"><div class="grid-content">{{form.address}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-label">时间：</div></el-col>
        <el-col :span="20"><div class="grid-content">{{form.datetime}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content grid-return"><el-button size="small" plain @click="dialogFormVisible = false">关闭</el-button></div></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'User',
  data () {
    return {
      loading: true, //是否加载中
      pageSize: 10,//每页显示个数
      total: 0,  //总条数
      pageCount: 0, //总页数
      currentPage: 1, //当前页
      formInline: { //搜索条件
        uname: ''
      },
      userList: [], //用户列表
      dialogFormVisible: false, //弹层是否显示
      form: { //用户信息
        name: '',
        age: '',
        sex: '',
        address: '',
        datetime: ''
      }
    }
  },
  mounted(){
		this.getUserList();
	},
  methods: {
    // 页码改变时触发
    handleSizeChange(size){
      this.pageSize = size;

    },
    // 当前页码改变时触发
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
    },
    /*日期处理*/
    dateFormat(row,column){
      var date = row[column.property];
      if(date === undefined){
        return ''
      } ;
      return moment(date).format("YYYY-MM-DD")
    },
    // 查询用户
    onSearch(){
      console.log("开始查询");
      this.$axios.post('/api/user/searchUser',{user_name: this.formInline.uname}).then((res) => {
        console.log(res.data);
        if(res.status == 200){
          this.loading = false;
          this.userList = res.data;
        }else{
          this.$message.error('查询失败');
        }
      });
    },
    // 获取用户列表
    getUserList () {
      this.$axios.post('/api/user/queryUser').then((res) => {
        console.log(res.data);
        if(res.status == 200){
          this.loading = false;
          this.userList = res.data;
        }else{
          this.$message.error('列表获取失败');
        }
      });
    },
    // 查看用户信息
    handleViewClick(id){
      let userInfo = this.userList.filter(function(item){
        return (item.id == id);
      });
      console.log(userInfo);
      this.form = userInfo[0];
      this.dialogFormVisible = true;
    },
    // 跳转到新增用户信息页  
    handleClick (id) {
      console.log(id);
      if(id == 0){
        this.$router.push({path:'/user/edit'});
      }else{
        this.$router.push({path:'/user/edit',query:{ id: id }});
      }
    },
    // 删除当前用户
    delUser(id){
      this.$axios.post('/api/user/delUser',{id: id}).then((res) => {
        console.log(res.data);
        if(res.status == 200){
          this.$message('删除成功');
          this.getUserList();
        }else{
          this.$message.error('删除失败');
        }
      });
    }
  }
}
</script>
<style scoped>
.grid-content{line-height: 30px;}
.grid-label{text-indent: 10px;}
.grid-return{text-align: center; margin-top: 15px;}
</style>