<template>
  <div class="userperson">
    <div class="user_head">
      <div class="head_left">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "userperson",
  data() {
    return {
      UserData: "",
    };
  },
  created() {
    this.get();
  },
  methods: {
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
  },
};
</script>

<style>
.userperson {
  width: 100%;
  height: 100%;
  /* background-color: blanchedalmond; */
}
/* 头部信息 */
.user_head {
  width: 100%;
  height: 250px;
  background-color: #fff;
  /* margin-top: 10px; */
  display: flex;
  flex-direction: row;
}
.head_left {
  flex: 1;
}
.head_left img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.head_right {
  flex: 2;
  line-height: 250px;
  margin-left: 10px;
}
.userperson_content {
  width: 100%;
  /* background-color: burlywood; */
  background-color: #fff;
  margin-top: 10px;
}
</style>