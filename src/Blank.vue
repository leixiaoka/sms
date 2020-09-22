<template>
  <div id="Blank">
    <el-container style="height: 850px; border: 1px solid #eee">
      <!-- 顶部登录用户信息 -->
      <el-header>
        <h1><i class="el-icon-s-grid"></i>&nbsp;Vue.js+ElementUI+Node.js+MySQL</h1>
        <span><i class="el-icon-user"></i>{{userName}}&nbsp;&nbsp;<el-button size="mini" plain @click="logout">退出</el-button></span>
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu
            router
            :default-active = "path"
            style="background: #ecf5ff;"
            class="el-menu-vertical-demo">
            <template v-for="(item, index) in nav_menu_data">
              <el-menu-item :index = "item.path" :key = "index">
                <i :class="item.ico"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <!-- 右侧内容展示区域 -->
        <el-main>
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Blank',
  data () {
    return {
      userName: '', //登录用户名
      path: '',
      nav_menu_data: [{
        title: '用户管理',
        path: '/user',
        ico: 'el-icon-user'
      }, {
        title: '系统设置',
        path: '/',
        ico: 'el-icon-setting'
      }, {
        title: '修改密码',
        path: '/updatepwd',
        ico: 'el-icon-unlock'
      }]
    }
  },
  created () {
    this.userName = localStorage.getItem("user_name");
    // console.log(this.userName)
    if(this.userName == null){
      this.$message.error("未登录");
      this.$router.push({path: '/login'});
    }
    this.onRouteChanged();
  },
  methods: {
    // 左侧切换路由
    onRouteChanged () {
      let that = this
      that.path = that.$route.path
    },
    // 退出
    logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_id");
      this.$router.push({path: '/login'});
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'onRouteChanged'
  }
}
</script>
<style scoped>
h1{position: absolute; top: 0; left: 20px; font-weight: normal;}
.el-header{background-color: #53a8ff; color: #fff; line-height: 60px; text-align: right; font-size: 12px;}
.el-header span{color: #fff; font-size: 14px;}
.el-icon-user{margin-right: 5px;}
.el-aside{color: #333; background-color: #ecf5ff;}
</style>
