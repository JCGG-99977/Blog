<template>
  <div class="userperson">
    <!-- 头部个人相关信息 -->
    <div class="user_head">
      <!-- 头像 -->
      <div class="head_left" @click="ChangeImg">
        <img :src="UserData.user_img" alt="" />
      </div>
      <div class="head_right">
        <span>
          {{ UserData.nickname }}
          <sup>
            <span v-if="UserData.power === 0">普通用户</span>
            <span v-if="UserData.power === 1">管理员</span>
          </sup>
        </span>
      </div>
    </div>
    <!-- 上传头像的操作 -->
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      style="text-align: center"
    >
      <el-upload
        v-if="imgUrl === ''"
        class="upload-demo"
        drag
        action="http://192.168.1.80:3333/upload"
        :on-success="SuccessUpload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <img v-if="imgUrl !== ''" :src="imgUrl" alt="" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="QXupload">取 消</el-button>
        <el-button v-if="imgUrl !== ''" type="primary" @click="submitUpload"
          >上传</el-button
        >
      </span>
    </el-dialog>
    <!-- 个人的基本信息 -->
    <div class="userperson_content">
      <p
        style="
          font-size: 30px;
          font-weight: 600;
          border-bottom: 1px solid black;
          margin-bottom: 10px;
        "
      >
        基本信息
      </p>
      <table
        cellpadding="50px"
        cellspacing="30px"
        style="width: 100%; text-align: center"
        @click="ChangeMsg"
        v-if="!ChangeShow"
      >
        <tr>
          <td>用户名：</td>
          <td>{{ UserData.user }}</td>
        </tr>
        <tr>
          <td>用户ID：</td>
          <td>{{ UserData.id }}</td>
        </tr>
        <tr>
          <td>昵称：</td>
          <td>{{ UserData.nickname }}</td>
        </tr>
        <tr>
          <td>邮箱：</td>
          <td>{{ UserData.email }}</td>
        </tr>
        <tr>
          <td>简介：</td>
          <td>{{ UserData.introduction }}</td>
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
      </table>
      <!-- 操作修改 -->
      <table
        cellpadding="50px"
        cellspacing="30px"
        style="width: 100%; text-align: center"
        v-if="ChangeShow"
      >
        <tr>
          <td>用户名：</td>
          <el-input v-model="UserData.user" :disabled="true"> </el-input>
        </tr>
        <tr>
          <td>用户ID：</td>
          <el-input v-model="UserData.id" :disabled="true"> </el-input>
        </tr>
        <tr>
          <td>昵称：</td>
          <el-input v-model="nickname"> </el-input>
        </tr>
        <tr>
          <td>邮箱：</td>
          <el-input v-model="UserData.email" :disabled="true"> </el-input>
        </tr>
        <tr>
          <td>简介：</td>
          <el-input maxlength="15" show-word-limit v-model="introduction">
          </el-input>
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
            <el-button type="info" @click="ChangeShow = false">取消</el-button>
            <el-button type="primary" @click="SubmitChange">修改</el-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "userperson",
  data() {
    return {
      // 存储用户的个人信息
      UserData: "",
      // 上传图片弹窗
      dialogVisible: false,
      // 图片返回链接
      imgUrl: "",
      // 修改信息的显示
      ChangeShow: false,
      // 昵称
      nickname: "",
      // 简介
      introduction: "",
    };
  },
  created() {
    // 初始化调用获取信息
    this.get();
  },
  methods: {
    // 初始化获取个人数据信息
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
    // 换头像
    ChangeImg() {
      this.dialogVisible = true;
    },
    // 图片上传反馈链接
    SuccessUpload(res) {
      if (res.code === 200) {
        this.imgUrl = res.url;
      }
    },
    // 上传图片
    submitUpload() {
      let data = {
        user_img: this.imgUrl,
        id: sessionStorage.getItem("id"),
      };
      this.$post("/change/user_img", data).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "头像更新成功！",
          });
          setTimeout(() => {
            this.get();
            this.dialogVisible = false;
          }, 500);
        }
      });
    },
    // 取消上传
    QXupload() {
      this.imgUrl = "";
      this.dialogVisible = false;
    },
    // 修改基本信息
    ChangeMsg() {
      this.ChangeShow = true;
      this.nickname = this.UserData.nickname;
      this.introduction = this.UserData.introduction;
    },
    // 上传修改信息
    SubmitChange() {
      if (this.nickname === "") {
        this.nickname = this.UserData.nickname;
      }
      if (this.introduction === "") {
        this.introduction = this.UserData.introduction;
      }
      let data = {
        nickname: this.nickname,
        introduction: this.introduction,
        id: sessionStorage.getItem("id"),
      };
      this.$post("/change/user", data).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "头像更新成功！",
          });
          setTimeout(() => {
            this.get();
            this.ChangeShow = false;
          }, 500);
        }
      });
    },
    // 关闭dialog的操作
    handleClose(done) {
      done();
      this.imgUrl = "";
    },
  },
};
</script>

<style>
.userperson {
  width: 100%;
  height: 100%;
}
/* 头部信息 */
.user_head {
  width: 100%;
  height: 250px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.head_left {
  flex: 1;
  text-align: center;
}
.head_left img {
  width: 60%;
  height: 80%;
  border-radius: 80%;
  margin-top: 20px;
}
.head_left:hover {
  cursor: pointer;
  background-color: #f2f6fc !important;
}
.head_right {
  flex: 2;
  line-height: 250px;
  margin-left: 10px;
}
.userperson_content {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.userperson_content:hover {
  cursor: pointer;
  background-color: transparent;
}
</style>