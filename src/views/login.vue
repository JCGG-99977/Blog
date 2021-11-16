<template>
  <div class="login">
      <div class="content">
          <ul>
              <li>登录</li>
              <li>注册</li>
          </ul>
          <div class="content_bottom">
              
          </div>
      </div>
  </div>
</template>

<script>
export default {
name:'login',
data(){
    return{

    }
},
created(){},
methods:{

}
}
</script>

<style>
.login{
    width: 100%;
    height: 100%;
    background-color: aquamarine;
    position: relative;
}
.content{
    width: 400px;
    height: 50%;
    background-color: azure;
    position: absolute;
    top: 30%;
    left: 60%;
}
.content ul{
    height: 10%;
    width: 100%;
    display: flex;
    line-height: 50px;
}
.content ul li{
    float: left;
    flex: 1;
    background-color: bisque;
}
.content_bottom{
    width: 100%;
    height: 90%;
    background-color:skyblue;
}
</style>