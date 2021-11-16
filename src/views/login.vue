<template>
  <div class="login">
    <div class="content">
      <ul>
        <li v-for="(item,index) in options" :key="index">{{item.text}}</li>
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
          style="margin-top: 20px;"
        ></el-input>
         <el-input
          placeholder="请输入验证码"
          v-model="yzm"
          clearable
          style="margin-top: 20px;width:80%"
        >
        </el-input>
        <span style="display: inline-block;width:20%;">fdsf</span>
        <el-button style="margin-top:20px;margin-bottom:20px" type="primary">立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
        options:[{
            text:'登录',
            type:0
        },
        {
            text:'注册',
            type:1
        }],
      username: "",
      paswd: "",
      yzm:''
    };
  },
  created() {
    
  },
  mounted(){
  let ul=document.querySelector('.content ul')
      ul.childNodes[0].style.backgroundColor="#fff"
      ul.childNodes[1].style.backgroundColor="#999"
      ul.childNodes[1].style.color="#fff"
  },
  methods: {},
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
.content ul li:hover{
    cursor: pointer;
}
.content_bottom {
  width: 80%;
  margin: 0 auto;
  /* background-color: skyblue; */
}
</style>