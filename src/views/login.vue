<template>
  <div class="login">
    <!-- 登录模块 -->
    <div class="content" v-if="login">
      <!-- 渲染登录注册菜单 -->
      <ul>
        <li
          v-for="(item, index) in options"
          :key="index"
          @click="ChangeLogin(index)"
        >
          {{ item.text }}
        </li>
      </ul>
      <div class="content_bottom">
        <el-input
          placeholder="请输入用户名"
          v-model="username"
          clearable
          style="margin-top: 20px"
        >
        </el-input>
        <el-input
          placeholder="请输入密码"
          v-model="paswd"
          show-password
          clearable
          style="margin-top: 20px"
        ></el-input>
        <el-input
          placeholder="请输入验证码"
          v-model="yzm"
          clearable
          style="margin-top: 20px; width: 80%"
        >
        </el-input>
        <span
          class="sjyam"
          @click="creatYzm"
          style="display: inline-block; width: 20%; font-family: '华文隶书'"
        >
          <i
            ><s>{{ random_yzm }}</s>
          </i>
        </span>
        <el-button
          style="margin-top: 20px; margin-bottom: 20px"
          type="primary"
          @click="SendLogin"
          >立即登录</el-button
        >
      </div>
    </div>
    <!-- 注册模块 -->
    <div class="content" v-if="register">
      <!-- 渲染登录注册菜单 -->
      <ul>
        <li
          v-for="(item, index) in options"
          :key="index"
          @click="ChangeLogin(index)"
        >
          {{ item.text }}
        </li>
      </ul>
      <div class="content_bottom">
        <el-input
          placeholder="请输入用户名"
          v-model="username"
          clearable
          style="margin-top: 20px"
        >
        </el-input>
        <el-input
          placeholder="请输入密码"
          v-model="paswd"
          show-password
          clearable
          style="margin-top: 20px"
        ></el-input>
        <el-input
          placeholder="请输入邮箱"
          v-model="email"
          clearable
          style="margin-top: 20px; border-right: none"
        >
        </el-input>
        <el-input
          placeholder="请输入验证码"
          v-model="emailyzm"
          clearable
          style="margin-top: 20px; width: 60%"
          @focus="Yzmfocus"
        >
        </el-input>
        <el-button
          style="width: 40%"
          type="primary"
          v-show="YxmShow"
          plain
          @click="RecoverYzm"
          >获取验证码</el-button
        >
        <el-button v-show="!YxmShow" style="width: 35%" disabled>{{
          msg
        }}</el-button>
        <el-button
          style="margin-top: 20px; margin-bottom: 20px"
          type="primary"
          @click="Sendregister"
          >立即注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 渲染登录和注册
      options: [
        {
          text: "登录",
          type: 0,
        },
        {
          text: "注册",
          type: 1,
        },
      ],
      //   登录显示
      login: true,
      // 注册
      register: false,
      // 用户名
      username: "",
      //   密码
      paswd: "",
      //   登录验证码
      yzm: "",
      //   随机验证码生成
      random_yzm: "",
      //   注册邮箱
      email: "",
      // 邮箱验证码
      emailyzm: "",
      // 邮箱提示收发验证码
      msg: "60秒",
      //   进行计时
      count: 60,
      //   计时器
      time: "",
      //   显示倒计时
      YxmShow: true,
      //   存储返回来的验证码
      endemailcode: "",
    };
  },
  created() {
    //   进行调用验证码
    this.creatYzm();
  },
  watch: {
    //   监听倒计时数值变化
    count(old) {
      if (old <= 0) {
        //   清除计时器
        clearInterval(this.time);
        //   显示获取验证码并且置计数于原数值
        this.YxmShow = true;
        this.count = 60;
        this.msg = "60秒";
      }
    },
  },
  mounted() {
    //   初始改变登录的显示样式
    let ul = document.querySelector(".content ul");
    ul.childNodes[0].style.backgroundColor = "#fff";
    ul.childNodes[1].style.backgroundColor = "#999";
    ul.childNodes[1].style.color = "#fff";
  },
  methods: {
    //   转换登录和注册
    ChangeLogin(index) {
      let ul = document.querySelector(".content ul");
      //   切换时候用户名和密码进行置空操作
      this.username = "";
      this.paswd = "";
      this.email = "";
      this.emailyzm = "";
      if (index === 0) {
        this.login = true;
        this.register = false;
        ul.childNodes[0].style.color = "#000";
        ul.childNodes[0].style.backgroundColor = "#fff";
        ul.childNodes[1].style.backgroundColor = "#999";
        ul.childNodes[1].style.color = "#fff";
      } else {
        this.login = false;
        this.register = true;
        ul.childNodes[1].style.color = "#000";
        ul.childNodes[1].style.backgroundColor = "#fff";
        ul.childNodes[0].style.backgroundColor = "#999";
        ul.childNodes[0].style.color = "#fff";
      }
    },
    // 进行登录
    SendLogin() {
      var that = this;
      // 判断输入用户名、密码、验证码是否为空
      if (that.username === "" || that.paswd === "" || that.yzm === "") {
        that.$message({
          type: "warning",
          message: "仔细核查，必填项不能为空！",
        });
      } else {
        // 因为验证码全部为大写所以在判断时候进行相应的转换
        if (that.yzm.toUpperCase() != that.random_yzm) {
          that.$message({
            type: "warning",
            message: "验证码输入有误！",
          });
          // 调用验证码进行刷新
          that.creatYzm();
        } else {
          // 进行登录接口调用校验
          that
            .$get(`/login?user=${that.username}&pwd=${that.paswd}`)
            .then((res) => {
              if (res.code === 200) {
                // 存在用户数据
                if (res.result.length !== 0) {
                  for (var i = 0; i < res.result.length; i++) {
                    if (
                      that.username === res.result[i].user &&
                      that.paswd === res.result[i].pwd
                    ) {
                      if (res.code === 200) {
                        that.$message({
                          type: "success",
                          message: "登录成功",
                        });
                        sessionStorage.setItem("id", res.result[0].id);
                        that.$store.state.id=res.result[0].id
                        that.$router.push("/");
                      }
                    } else if (
                      that.username !== res.result[i].user ||
                      that.paswd !== res.result[i].pwd
                    ) {
                      that.$message({
                        type: "error",
                        message: "用户名或者密码错误",
                      });
                    }
                  }
                } else {
                  //   用户数据不存在
                  that.$message({
                    type: "error",
                    message: "该用户不存在,请注册后进行登录",
                  });
                }
              }
            })
            .catch((e) => {
              that.$message({
                type: "error",
                message: "登录失败，请稍后重试！" + e,
              });
            });
        }
      }
    },
    // 进行注册
    Sendregister() {
      var that = this;
      if (
        that.username === "" ||
        that.paswd === "" ||
        that.email === "" ||
        that.emailyzm === ""
      ) {
        that.$message({
          type: "warning",
          message: "注意检查，必填项不能为空！",
        });
      } else {
        if (that.emailyzm != that.endemailcode) {
          that.$message({
            type: "error",
            message: "验证码输入错误，请检查！",
          });
        } else {
               const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          that.$get(`/login?user=${that.username}&pwd=${that.paswd}`).then((res) => {
            if (res.code === 200) {
              if (res.result.length !== 0) {
                that.$message({
                  type: "error",
                  message: "此用户已存在！",
                });
                loading.close()
              } else {
                let data = {
                  user: that.username,
                  pwd: that.paswd,
                  time: that.timestampToTime(Date.now()),
                  email: that.email,
                  emailcode: that.emailyzm,
                };
                that
                  .$post("/login", data)
                  .then((res) => {
                    if (res.code === 200) {
                      that.$message({
                        type: "success",
                        message: "注册成功，即将自动登录",
                      });
                      that
                        .$get(`/login?user=${that.username}&pwd=${that.paswd}`)
                        .then((res) => {
                          console.log(res);
                          if (res.code === 200) {
                              loading.close()
                            sessionStorage.setItem("id", res.result[0].id);
                            that.$store.state.id=res.result[0].id
                            that.$router.push("/");
                          }
                        })
                        .catch((e) => {
                          that.$message({
                            type: "error",
                            message: "自动登录失败，请稍后重试！" + e,
                          });
                          loading.close()
                        });
                    }
                  })
                  .catch((e) => {
                    that.$message({
                      type: "error",
                      message: "注册失败，请稍后重试！" + e,
                    });
                    loading.close()
                  });
              }
            }
          });
        }
      }
    },
    // 输入验证码验证邮箱
    Yzmfocus() {
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      ); //正则表达式
      if (!reg.test(this.email)) {
        this.$message("请输入正确的邮箱！");
      }
    },
    // 注册发送验证码
    RecoverYzm() {
      var that = this;
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      ); //正则表达式
      if (!reg.test(that.email)) {
        that.$message("请输入正确的邮箱！");
      } else {
        that
          .$get(`/email?email=${that.email}`)
          .then((res) => {
            if (res.code === 200) {
              that.$message({
                type: "success",
                message: "验证码已经发送至邮箱，请注意查收！",
              });
              that.endemailcode = that.uncompileStr(res.emailcode);
              // 开启倒计时显示
              that.YxmShow = false;
              // 计时器
              that.time = setInterval(() => {
                that.count -= 1;
                that.msg = that.count + "秒";
              }, 1000);
            }
          })
          .catch((e) => {
            that.$message({
              type: "error",
              message: "验证码发送失败，请稍后重试！" + e,
            });
          });
      }
    },
    // 点击变换验证码
    creatYzm() {
      this.random_yzm = this.RandomYzm(5);
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
    // 随机生成登录验证码
    RandomYzm(n) {
      var chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      return res;
    },
    // 字符串进行解密(因为返回数据时候进行了验证码的加密处理，在此处需要进行相关的解密)
    uncompileStr(code) {
      code = unescape(code);
      var c = String.fromCharCode(code.charCodeAt(0) - code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    },
  },
  //   销毁计时器
  destroyed() {
    clearInterval(this.time);
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background: url("../../public/bg.jpg") no-repeat;
  background-size: cover;
  position: relative;
}
.content {
  width: 350px;
  background-color: #fff;
  position: absolute;
  top: 30%;
  left: 15%;
  opacity: 0.8;
}
.login .content ul {
  width: 100%;
  display: flex;
  line-height: 50px;
  text-align: center;
}
.content ul li {
  float: left;
  flex: 1;
}
.content ul li:hover {
  cursor: pointer;
}
.content_bottom {
  width: 80%;
  margin: 0 auto;
}
.sjyam:hover {
  cursor: default;
}
</style>