<template>
  <div class="userMsg">
    <div class="user_content">
      <div class="content_left">
        <ul>
          <li
            v-for="(item, index) in options"
            :key="index"
            @click="ChangeClick(index)"
          >
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <div class="content_right">
        <!-- 个人的信息 -->
        <!-- <userperson v-if="userShow"></userperson> -->
        <!-- 反馈 -->
        <!-- <feedback v-if="feedbackShow"></feedback> -->
        <!-- 我的博客 -->
        <!-- <userblog v-if="userblogShow"></userblog> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// // 引入个人信息模块
// import userperson from '@/user/userperson'
// // 反馈模块
// import feedback from '@/user/feedback'
// // 我的博客
// import userblog from '@/user/userblog'
export default {
  name: "userMsg",
  components: {
    //   userperson,
    //   feedback,
    //   userblog
  },
  watch: {},
  data() {
    return {
      options: [],
      //   用户的信息显示
      userShow: true,
      // 反馈
      feedbackShow: false,
      // 博客
      userblogShow: false,
      UserData: "",
    };
  },
  created(){
      this.get()
  },
  mounted() {
    let li = this.$(".content_left ul li");
    this.$(li[0]).css("background-color", "#f0f0f5");
    this.$(li[0]).siblings().css("background-color", "#fff");
  },
  methods: {
    get() {
      if (this.$store.state.id === "") {
        this.$store.state.id = sessionStorage.getItem("id");
      }
      this.$get(`/dg_msg/user?id=${this.$store.state.id}`).then((res) => {
        if (res.code === 200) {
          if (res.result[0].power === 1) {
            this.options = [
              {
                text: "个人信息",
                id: "",
              },
              {
                text: "我的博客",
                id: "",
              },
            
              {
                text: "反馈",
                id: "",
              },
              {
                text: "博客管理",
                id: "",
              },
              {
                text: "用户管理",
                id: "",
              },
            ];
          }else{
               this.options = [
              {
                text: "个人信息",
                id: "",
              },
              {
                text: "我的博客",
                id: "",
              },
           
              {
                text: "反馈",
                id: "",
              },
            ];
          }
        }
      });
    },
    // 进行相关的页面切换
    ChangeClick(index) {
      let li = this.$(".content_left ul li");
      this.$(li[index]).css("background-color", "#f0f0f5");
      this.$(li[index]).siblings().css("background-color", "#fff");
      if (index === 0) {
        this.$router.push("/userMsg");
      } else if (index === 1) {
        this.$router.push("/userMsg/userblog");
      } else if (index === 2) {
        this.$router.push("/userMsg/feedback");
      } else if (index === 3) {
        this.$router.push("/userMsg/blogmanager");
      } else if (index === 4) {
        this.$router.push("/userMsg/usermanager");
      }
    },
  },
};
</script>

<style>
.userMsg {
  width: 100%;
  /* height: 100%; */
  background-color: #f5f6f7;
  /* background: url('../../static/bg.gif'); */
  display: inline-block;
}
.user_content {
  width: 1400px;
  /* height: 100%; */
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.content_left {
  flex: 1;
  text-align: center;
  margin-top: 10px;
  display: fixed;
}
.content_left ul {
  background-color: #fff;
}
.content_left ul li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 5px;
}
.content_left ul li:hover {
  background-color: #f0f0f5 !important;
  cursor: pointer;
}
.content_right {
  flex: 5;
  /* background-color: aquamarine; */
  margin-left: 10px;
  margin-top: 10px;
  /* overflow: auto; */
}
</style>