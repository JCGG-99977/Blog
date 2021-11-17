<template>
  <div class="homepage">
    <div class="home_head">
      <div class="head_content">
        <ul>
          <li>
            <el-input
              placeholder="请输入内容"
              v-model="search_blog"
              class="input-with-select"
              clearable
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </li>
          <li>
             <router-link style="width:100%;height:100%;display: inline-block;" to="/">首页</router-link>
              
              </li>
          <li v-if="id !== null">
            <el-popover
              placement="top-start"
              trigger="hover"
            >
             <table cellpadding="50px" cellspacing="30px" style="width:100%;text-align: center;">
                 <tr>
                     <td colspan="2">
                         <img style="width:100px;height:100px" :src="UserData.user_img" alt="">
                     </td>
                 </tr>
                 <tr>
                     <td>用户名：</td>
                     <td>{{UserData.user}}</td>
                 </tr>
                 <tr>
                     <td>昵称：</td>
                     <td>{{UserData.nickname}}</td>
                 </tr>
                 <tr>
                     <td>注册时间：</td>
                     <td>{{UserData.time}}</td>
                 </tr>
                 <tr>
                     <td>身份：</td>
                     <td>
                         <span v-if="UserData.power===0">普通用户</span>
                         <span v-if="UserData.power===1">管理员</span>
                     </td>
                 </tr>
             </table>
            <span  style="width:100%;height:100%;display: inline-block;" slot="reference" @click="sendNew('userMsg')">
                 {{UserData.nickname}}
                </span>
            </el-popover>
          </li>
          <li v-if="id === null">
              <span  style="width:100%;height:100%;display: inline-block;" slot="reference" @click="sendNew('login')">
                 登录
                </span>
          </li>
          <li v-if="id !== null">
               <router-link style="width:100%;height:100%;display: inline-block;" target="_blank" to="write">创作</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 占位的兄弟元素 -->
    <div class="home_head_brother"></div>
    <div class="home_lbt">
      <el-carousel style="height: 100%" :interval="5000" arrow="always">
        <el-carousel-item style="height: 100%" v-for="item in 4" :key="item">
          <img src="../../static/bg.jpg" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data() {
    return {
      UserData: "",
      url: "../../static/bg.jpg",
      search_blog: "",
      id: "",
    };
  },
  created() {
    // /dg_msg/user
    this.get();
    this.id = sessionStorage.getItem("id");
    console.log(this.id)
  },
  methods: {
    get() {
      if (this.$store.state.id === "") {
        this.$store.state.id = sessionStorage.getItem("id");
      }
      this.$get(`/dg_msg/user?id=${this.$store.state.id}`).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.UserData = res.result[0];
        }
      });
    },
    sendNew(data){
        this.$router.push(data)
    }
  },
};
</script>

<style>
.homepage {
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
  position: relative;
}
/* 头部信息 */
.home_head {
  width: 100%;
  height: 5%;
  background-color: #fff;
  position: fixed;
  overflow: hidden;
}
/* 占位元素 */
.home_head_brother {
  width: 100%;
  height: 5%;
}
/* 中心内容 */
.head_content {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  line-height: 50px;
}
.head_content ul {
  width: 100%;
  height: 100%;
  display: inline-block;
  text-align: center;
}
.head_content ul li:first-child {
  width: 600px;
}
.head_content ul li {
  width: 100px;
  height: 100%;
  float: left;
  margin-left: 50px;
}
.head_content ul li:hover{
    background-color: #f0f0f5;
    cursor: pointer;
}
/* 轮播图 */
.home_lbt {
  width: 80%;
  height: 40%;
  background-color: palegreen;
  margin: 20px auto;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  height: 100%;
}
</style>