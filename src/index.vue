<template>
  <div class="index">
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
    <div class="home_head_brother"></div>
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
    // 查询天气
    searchBtn() {
      //判断输入框是否为空
      if (this.search_weather == "") {
        this.$message({
          message: "请输入城市名",
          type: "error",
        });
      } else {
        //axios进行请求的擦擦送
        this.$get(
          "http://wthrcdn.etouch.cn/weather_mini?city=" + this.search_weather
        ).then((res) => {
          //返回状态正常
          if (res.desc === "OK") {
            this.$message({
              message: `共查找到 ${res.data.forecast.length + 1} 条数据`,
              type: "success",
            });
            this.weather_show = true;
            this.weather = res.data;
            // console.log(this.weather)
          } else if (res.desc == "invilad-citykey") {
            //如果查询城市状态异常
            this.$message({
              message: "请输入正确的城市名",
              type: "warning",
            });
            //输入框置空
            this.search_weather = "";
          }
          //请求发送异常
        });
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
</style>