<template>
  <div class="userMsg">
    <div class="user_content">
      <div class="content_left">
        <ul>
          <li v-for="(item, index) in options" :key="index" @click="ChangeClick(index)">
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <div class="content_right">
          <!-- 个人的信息 -->
         <userperson v-if="userShow"></userperson>
      </div>
    </div>
  </div>
</template>

<script>
// 引入个人信息模块
import userperson from '@/user/userperson'
export default {
  name: "userMsg",
  components:{
      userperson
  },
  data() {
    return {
      options: [
        {
          text: "个人信息",
          id: "",
        },
        {
          text: "我的博客",
          id: "",
        },
        {
          text: "待审核",
          id: "",
        },
        {
          text: "反馈",
          id: "",
        },
      ],
    //   用户的信息显示
    userShow:true
    };
  },
  methods:{
    // 进行相关的页面切换
    ChangeClick(index){
        let li = this.$('.content_left ul li')
        this.$(li[index]).css('background-color', '#f0f0f5')
        this.$(li[index]).siblings().css('background-color', '#fff')
        if(index===0){
            this.userShow=true
        }else if(index===1){
            this.userShow=false
        }else if(index===2){
            this.userShow=false
        }else if(index===3){
            this.userShow=false
        }
    }
  }
};
</script>

<style>
.userMsg {
  width: 100%;
  height: 100%;
  background-color: #f5f6f7;
}
.user_content {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.content_left {
  flex: 1;
  text-align: center;
  margin-top: 10px;
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
  flex: 3;
  background-color: aquamarine;
  margin-left: 10px;
}
</style>