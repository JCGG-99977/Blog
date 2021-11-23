<template>
  <div class="index">
    <div class="home_head" v-if="$route.name !== 'searchblog'">
      <div class="head_content">
        <ul>
          <li>
            <el-input
              placeholder="请输入内容"
              v-model="search_blog"
              class="input-with-select"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="Search_content"
              >
              </el-button>
            </el-input>
          </li>
          <li>
            <router-link
              style="width: 100%; height: 100%; display: inline-block"
              to="/"
              >首页</router-link
            >
          </li>
          <li v-if="id !== null">
            <el-popover placement="top-start" trigger="hover">
              <table
                cellpadding="50px"
                cellspacing="30px"
                style="width: 100%; text-align: center"
              >
                <tr>
                  <td colspan="2">
                    <img
                      style="width: 100px; height: 100px"
                      :src="UserData.user_img"
                      alt=""
                    />
                  </td>
                </tr>
                <tr>
                  <td>用户名：</td>
                  <td>{{ UserData.user }}</td>
                </tr>
                <tr>
                  <td>昵称：</td>
                  <td>{{ UserData.nickname }}</td>
                </tr>
                <tr>
                  <td>注册时间：</td>
                  <td>{{ UserData.time }}</td>
                </tr>
                <tr>
                  <td>身份：</td>
                  <td>
                    <span v-if="UserData.power === 0">普通用户</span>
                    <span v-if="UserData.power === 1">管理员</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <el-button type="danger" plain @click="exitBlog"
                      >退出</el-button
                    >
                  </td>
                </tr>
              </table>
              <router-link
                style="width: 100%; height: 100%; display: inline-block"
                to="userMsg"
                slot="reference"
              >
                {{ UserData.nickname }}
              </router-link>
            </el-popover>
          </li>
          <li v-if="id === null">
            <span
              style="width: 100%; height: 100%; display: inline-block"
              slot="reference"
              @click="sendNew('login')"
            >
              登录
            </span>
          </li>
          <li v-if="id !== null">
            <router-link
              style="width: 100%; height: 100%; display: inline-block"
              to="write"
              >创作</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- 占位的兄弟元素 -->
    <div class="home_head_brother" v-if="$route.name !== 'searchblog'"></div>
    <div class="home_other">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      UserData: "",
      //   输入的城市
      search_weather: "",
      weather: [],
      weather_show: false,
      search_blog: "",
      id: "",
    };
  },
  watch: {},
  created() {
    this.get();
    this.id = sessionStorage.getItem("id");
    this.ip = sessionStorage.getItem("ip");
    this.adress = sessionStorage.getItem("adress");
  },
  methods: {
    //   初始化获取数据
    get() {
      if (this.$store.state.id === "") {
        this.$store.state.id = sessionStorage.getItem("id");
      }
      this.$get(`/dg_msg/user?id=${this.$store.state.id}`).then((res) => {
        if (res.code === 200) {
          this.UserData = res.result[0];
        }
      });
    },
    Search_content() {
      if (this.search_blog === "") {
        this.$message({
          message: "请输入搜索内容",
          type: "warning",
        });
      } else {
        //  this.$router.replace({
        //     path: 'searchblog',
        // query: {
        //     content:this.search_blog
        // }
        // })
        window.open(
          "http://www.jcsy.work:3334/#/searchblog?content=" + this.search_blog
        );
        this.search_blog = "";
        //   this.$get(`/search/see_user_blog?title=${this.search_blog}`).then(res=>{
        // console.log(res)
        // this.$router.replace('searchblog')
        // })
      }
    },
    // 退出
    exitBlog() {
      sessionStorage.removeItem("id");
      this.$router.push("/login");
    },
    sendNew(data) {
      this.$router.push(data);
    },
  },
};
</script>

<style>
.index {
  width: 100%;
  height: 100%;
  /* background-color: lavenderblush; */
}
/* 头部信息 */
.home_head {
  width: 100%;
  height: 5%;
  background-color: #fff;
  position: fixed;
  overflow: hidden;
  z-index: 99;
}
/* 中心内容 */
.head_content {
  width: 1200px;
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
.head_content ul li:first-child:hover {
  background-color: transparent;
}
.head_content ul li {
  width: 100px;
  height: 100%;
  float: left;
  margin-left: 50px;
}
.head_content ul li:hover {
  background-color: #f0f0f5;
  cursor: pointer;
}
/* 占位元素 */
.home_head_brother {
  width: 100%;
  height: 5%;
}
.home_other {
  width: 100%;
  height: 95%;
  background-color: #f5f6f7;
  /* background: url('../static/bg.gif'); */
}
@media screen and (max-width: 600px) {
  .home_head {
    width: 400px;
    font-size: 14px;
    height: 50px;
  }
  .head_content {
    width: 350px;
  }
  .home_head_brother {
    width: 350px;
  }
  .head_content ul li:first-child {
    width: 200px;
  }
  .head_content ul li {
    width: 40px;
    margin-left: 3px;
  }
  .content_homepage {
    width: 350px;
  }
}
</style>