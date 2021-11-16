<template>
  <div class="login">
    <div class="content" v-if="login">
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
        <span class="sjyam" @click="creatYzm" style="display: inline-block; width: 20%;font-family:'华文隶书'">
            <i><s>{{random_yzm}}</s> </i>
            </span>
        <el-button style="margin-top: 20px; margin-bottom: 20px" type="primary" @click="SendLogin"
          >立即登录</el-button
        >
      </div>
    </div>
    <div class="content" v-if="register">
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
          style="margin-top: 20px"
        >
        </el-input>
        <el-input
          placeholder="请输入验证码"
          v-model="emailyzm"
          clearable
          style="margin-top: 20px; width: 60%"
        >
        </el-input>
        <el-button style="width: 40%" type="primary" plain>{{ msg }}</el-button>
        <el-button style="margin-top: 20px; margin-bottom: 20px" type="primary"
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
      random_yzm:'',
      //   注册邮箱
      email: "",
      // 邮箱验证码
      emailyzm: "",
      // 邮箱提示收发验证码
      msg: "获取验证码",
    };
  },
  created() {
      this.random_yzm=this.RandomYzm(5)
      console.log()
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
      this.username=''
      this.paswd=''
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
    SendLogin(){
        var that=this
        if(that.username===''||that.paswd===''||that.yzm===''){
            that.$message({
                type:'warning',
                message:'仔细核查，必填项不能为空！'
            })
        }else{
             if((that.yzm).toUpperCase()!=that.random_yzm){
            that.$message({
                type:'warning',
                message:'验证码输入有误！'
            })
            that.creatYzm()
        }
        }
       
    },
    // 点击变换验证码
    creatYzm(){
       this.random_yzm= this.RandomYzm(5)
    },
    // 随机生成登录验证码
    RandomYzm(n){
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: aquamarine;
  position: relative;
}
.content {
  width: 350px;
  background-color: #fff;
  position: absolute;
  top: 30%;
  left: 60%;
}
.content ul {
  width: 100%;
  display: flex;
  line-height: 50px;
}
.content ul li {
  float: left;
  flex: 1;
  background-color: bisque;
}
.content ul li:hover {
  cursor: pointer;
}
.content_bottom {
  width: 80%;
  margin: 0 auto;
  /* background-color: skyblue; */
}
.sjyam:hover{
    cursor:default;
}
</style>