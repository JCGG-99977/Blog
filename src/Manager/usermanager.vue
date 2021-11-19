<template>
  <div class="usermanager">
        <el-table
    :data="UserData.slice((currentPage - 1) * size, currentPage * size)"
    style="width: 100%"
    :default-sort = "{prop: 'time', order: 'descending'}"
     :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{
          textAlign: 'center',
          background: '#eef1f6',
          color: '#606266',
        }"
        height="800px"
    >
    <el-table-column label="序号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              (currentPage - 1) * size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
    <el-table-column
      prop="time"
      label="注册日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="user"
      label="用户名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="pwd"
      label="密码"
      >
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleSee(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">注销</el-button>
      </template>
    </el-table-column>
  </el-table>
   <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="UserData.length"
        :current-page="currentPage"
        :page-size="size"
        style="text-align:center"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
  <el-drawer
  title="用户详情"
  :visible.sync="drawer">
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{dg_Data.user}}</span>
  </div>
  <div  class="text item">
    <img :src="dg_Data.user_img" alt="">
       <table
        cellpadding="50px"
        cellspacing="30px"
        style="width: 100%; text-align: center"
      >
        <tr>
          <td>用户名：</td>
          <td>{{ dg_Data.user }}</td>
        </tr>
        <tr>
          <td>用户ID：</td>
          <td>{{ dg_Data.id }}</td>
        </tr>
        <tr>
          <td>昵称：</td>
          <td>{{ dg_Data.nickname }}</td>
        </tr>
        <tr>
          <td>邮箱：</td>
          <td>{{ dg_Data.email }}</td>
        </tr>
        <tr>
          <td>简介：</td>
          <td>{{ dg_Data.introduction }}</td>
        </tr>
        <tr>
          <td>注册时间：</td>
          <td>{{ dg_Data.time }}</td>
        </tr>
        <tr>
          <td>身份：</td>
          <td>
            <span v-if="dg_Data.power === 0">普通用户</span>
            <span v-if="dg_Data.power === 1">管理员</span>
          </td>
        </tr>
      </table>
  </div>
</el-card>
</el-drawer>
  </div>
</template>

<script>
export default {
name:'usermanager',
data(){
    return{
        UserData:[],
        // 详细信息
        drawer:false,
        dg_Data:'',
        currentPage:1,
        size:10
    }
},
created(){
    this.get()
},
methods:{
    get(){
        this.$get('/all/user').then(res=>{
            if(res.code===200){
                this.UserData=res.result
            }
        })
    },
    // 查看
    handleSee(index,row){
        this.drawer=true
        this.dg_Data=row
    },
    // 注销
    handleDelete(){},
      // 分页选择
    handleCurrentChange(val) {
      this.currentPage = val;
    },
}
}
</script>

<style>
.checkblog{
    width: 100%;
    height: 100%;
    background-color: lightgreen;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>