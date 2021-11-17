<template>
  <div class="userperson">
      <div class="user_head">

      </div>
  </div>
</template>

<script>
export default {
name:'userperson',
data(){
    return{
        UserData:''
    }
},
created(){
    this.get()
},
methods:{
     get() {
      if (this.$store.state.id === "") {
        this.$store.state.id = sessionStorage.getItem("id");
      }
      this.$get(`/dg_msg/user?id=${this.$store.state.id}`).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.UserData = res.result[0];
        }
      });
    },
}
}
</script>

<style>
.userperson{
    width: 100%;
    height: 100%;
    background-color: blanchedalmond;
}
/* 头部信息 */
.user_head{
    width: 100%;
    height: 250px;
    background-color: #fff;
    margin-top: 10px;
}
</style>