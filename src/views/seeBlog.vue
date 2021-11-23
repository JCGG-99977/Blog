<template>
  <div class="seeblog">
    <div class="seeblog_content">
      <!-- 标题 -->
      <div class="head_seeblog">
        {{ BlogData.title }}
      </div>
      <!-- 文章情况 -->
      <div class="blog_text_msg">
        <img
          style="
            width: 50px;
            height: 100%;
            border-radius: 50%;
            padding-left: 10px;
          "
          :src="UserData.user_img"
          alt=""
        />
        <span style="display: inline-block; margin-left: 10px">{{
          UserData.nickname
        }}</span>
        <ul>
          <li>
            <span
              style="background-color: #f56c6c"
              v-if="BlogData.content_type === 1"
              >原创</span
            >
            <span
              style="background-color: #67c23a"
              v-if="BlogData.content_type === 0"
              >转载</span
            >
          </li>
          <li>发布于：{{ BlogData.data_time }}</li>
          <li>
            <i class="el-icon-view"></i>
            {{ BlogData.user_see }}
          </li>
          <li>
            <i class="el-icon-chat-square"></i>
            {{ BlogData.user_pl }}
          </li>
        </ul>
        <span v-if="BlogData.status !== 1" style="margin-left: 50px">
          <span v-if="BlogData.status === 0" style="background-color: #67c23a"
            >待审核</span
          >
          <span v-if="BlogData.status === 3" style="background-color: #f56c6c"
            >未通过</span
          >
        </span>
      </div>
      <!-- 内容 -->
      <div class="blog_text_content" v-html="BlogData.content"></div>
      <!-- 评论 -->
      <div class="blog_text_pl" v-if="BlogData.status === 1 &&id!==null">
        <img
          :src="OtherData.user_img"
          style="
            width: 50px;
            heifht: 50px;
            border-radius: 50%;
            margin-left: 10px;
          "
          alt=""
        />
        <el-input
          placeholder="发表一条友善的评论"
          v-model="input"
          style="width: 60%; margin-left: 20px"
          clearable
          maxlength="40"
          show-word-limit
        >
        </el-input>
        <el-button
          type="primary"
          @click="SendPl"
          style="width: 100px; height: 40px; margin-left: 20px; margin-top: 5px"
          >评论</el-button
        >
      </div>
      <!-- 查看评论 -->
      <div class="see_blog_text">
        <!-- 单个评论 -->
        <div class="blog_text_see" v-for="(item, index) in seePL" :key="index">
          <img
            :src="item.user_img"
            style="
              width: 50px;
              heifht: 50px;
              border-radius: 50%;
              margin-left: 10px;
            "
            alt=""
          />
          <span>{{ item.user }}</span
          >（{{ item.send_time }}）
          <p style="margin-top: 20px; margin-left: 10px">{{ item.send_msg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "seeblog",
  data() {
    return {
      BlogData: "",
      UserData: "",
      OtherData: "",
      input: "",
      //   查看评论
      seePL: [],
      id:sessionStorage.getItem('id')
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.$get(`/share/see_user_blog?id=${this.$route.query.id}`)
        .then((res) => {
          if (res.code === 200) {
            this.BlogData = res.result[0];
            this.SeeMsg();
            this.$get(`/dg_msg/user?id=${res.result[0].user_id}`)
              .then((resp) => {
                if (resp.code === 200) {
                  this.UserData = resp.result[0];
                }
              })
              .catch((e) => {
                this.$message({
                  type: "error",
                  message: "服务异常，请稍后重试！" + e,
                });
              });
            if (this.$store.state.id === "") {
              this.$store.state.id = sessionStorage.getItem("id");
            }
            this.$get(`/dg_msg/user?id=${this.$store.state.id}`)
              .then((res) => {
                if (res.code === 200) {
                  this.OtherData = res.result[0];
                }
              })
              .catch((e) => {
                this.$message({
                  type: "error",
                  message: "服务异常，请稍后重试！" + e,
                });
              });
          }
        })
        .catch((e) => {
          this.$message({
            type: "error",
            message: "服务异常，请稍后重试！" + e,
          });
        });
    },
    // 发表评论
    SendPl() {
      if (this.input === "") {
        this.$message({
          type: "warning",
          message: "请输入内容",
        });
      } else {
        let data = {
          user: this.OtherData.nickname,
          send_time: this.timestampToTime(Date.now()),
          send_msg: this.input,
          user_id: this.OtherData.id,
          blog_title: this.BlogData.title,
          blog_id: this.BlogData.id,
          user_img: this.OtherData.user_img,
        };
        this.$post("/msg/insert_blog", data)
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "发表成功！",
              });
              setTimeout(() => {
                this.SeeMsg();
                this.input = "";
              }, 500);
            }
          })
          .catch((e) => {
            this.$message({
              type: "error",
              message: "服务异常，请稍后重试！" + e,
            });
          });
      }
    },
    // 查看评论
    SeeMsg() {
      this.$get(`/blog_msg?blog_id=${this.BlogData.id}`)
        .then((res) => {
          if (res.code === 200) {
            this.seePL = res.result;
          }
        })
        .catch((e) => {
          this.$message({
            type: "error",
            message: "服务异常，请稍后重试！" + e,
          });
        });
    },
    // 时间转换以及补零操作
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1).toString().padStart(2, "0") + "-";
      var D = date.getDate().toString().padStart(2, "0") + " ";
      var h = date.getHours().toString().padStart(2, "0") + ":";
      var m = date.getMinutes().toString().padStart(2, "0") + ":";
      var s = date.getSeconds().toString().padStart(2, "0");
      return Y + M + D + h + m + s;
    },
  },
};
</script>

<style>
.seeblog {
  width: 100%;
  display: inline-block;
}
.seeblog_content {
  width: 1200px;
  height: 100%;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 10px;
}
.head_seeblog {
  height: 80px;
  font-size: 45px;
  font-weight: 600;
  line-height: 80px;
  padding-left: 10px;
}
img {
  width: 100%;
}
.blog_text_msg {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #f0f0f5;
  display: flex;
}
.blog_text_msg ul li {
  float: left;
  margin-left: 20px;
}
.blog_text_content {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  line-height: 50px;
}
.blog_text_pl {
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  line-height: 50px;
}
/* 查看评论 */
.see_blog_text {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-top: 10px;
  margin-bottom: 10px;
}
.blog_text_see {
  width: 100%;
  background-color: #e4e7ed;
  display: flex;
  margin-bottom: 20px;
}
a{
  color:#409EFF
}
a:hover{
  color: #F56C6C;
}
@media screen and (max-width: 600px) {
  .seeblog_content {
    width: 400px;
  }
  .blog_text_msg ul li {
    margin-left: 5px;
    font-size: 10px;
  }
  .blog_text_msg span {
    font-size: 10px;
  }
}
</style>