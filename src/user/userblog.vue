<template>
  <div class="userblog">
    <div class="blog_one" v-for="(item, index) in blogData" :key="index" @click="SeeBlog(item)">
      <!-- 头部标题 -->
      <div class="blog_title">
        {{ item.title }}
        <span style="background-color:#67C23A" v-if="item.status===0">待审核</span>
      </div>
      <!-- 中心内容显示 -->
      <div class="blog_content">
        {{ item.see_content }}
      </div>
      <!-- 底部数据 -->
      <div class="blog_bottom">
          <ul>
              <li>
                  <span style="background-color:#F56C6C" v-if="item.content_type===1">原创</span>
                  <span style="background-color:#67C23A" v-if="item.content_type===0">转载</span>
              </li>
              <li>
                  <i class="el-icon-view"></i>
                  {{item.user_see}}
              </li>
              <li>
                   <i class="el-icon-thumb"></i>
                  {{item.user_dz}}
              </li>
              <li>
                   <i class="el-icon-position"></i>
                  {{item.user_zf}}
              </li>
              <li>
                  发布于：{{item.data_time}}
              </li>
              <li>
                  <i class="el-icon-user"></i>
                  {{item.user}}
              </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userblog",
  data() {
    return {
      blogData: [],
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.$get("/see_user_blog?user_id=" + sessionStorage.getItem("id")).then(
        (res) => {
          console.log(res);
          this.blogData = res.result;
        }
      );
    },
    // 查看详细
    SeeBlog(item){
        console.log(item)
        console.log(item.id)
        this.$router.replace({
            path: 'seeblog',
        query: {
            id:item.id
        }
        })
    }
  },
};
</script>

<style>
.userblog {
  width: 100%;
  /* height: 100%; */
  /* background-color: tan; */
  display: inline-block;
}
.blog_one {
  width: 100%;
  height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
  /* margin-top: 10px; */
}
.blog_one:hover{
    cursor: pointer;
}
.blog_title {
  width: 100%;
  height: 50px;
  /* background-color: teal; */
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
}
.blog_one .blog_content {
  display: inline-block;
  width: 100%;
  height: 100px;
  /* background-color: thistle; */
  max-width: 880px;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  word-break: break-all;
  overflow: hidden;
    margin-left: 5px;
}
.blog_bottom {
  width: 100%;
  height: 50px;
  /* background-color: tomato; */
  line-height: 50px;
}
.blog_bottom ul li{
    float: left;
    height: 100%;
    margin-left: 30px;
}
</style>