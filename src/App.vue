<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      
    }
  },
}
</script>
<style>
*{margin:0; padding:0;}
.el-page-header{margin-bottom: 15px;}
.search-box{background: #fafafa; border: solid 1px #eee; padding: 20px 10px 0; border-radius: 2px;}
.el-pagination {padding: 15px 0;}
</style>