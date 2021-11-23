<template>
  <div class="searchblog">
    <div class="search_head_blog">
      <div class="blog_content_search">
        <el-input
          placeholder="请输入搜索内容"
          v-model="content"
          style="width: 80%; margin-right: 20px"
          clearable
        >
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchBlog"
          >搜索</el-button
        >
      </div>
    </div>
    <!-- 兄弟元素占位 -->
    <div class="brother_zw"></div>
    <div class="search_content">
      <!-- 搜索到多少篇 -->
      <p id="search_count"  style="
          margin-top: 10px;
          margin-bottom: 10px;
        "></p>
      <div
        class="blog_one"
        v-for="(item, index) in searcgData"
        :key="index"
        @click="SeeBlog(item)"
      >
        <!-- 头部标题 -->
        <div class="blog_title">
          {{ item.title }}
        </div>
        <!-- 中心内容显示 -->
        <div class="blog_content">
          {{ item.see_content }}
        </div>
        <!-- 底部数据 -->
        <div class="blog_bottom">
          <ul>
            <li>
              <span
                style="background-color: #f56c6c"
                v-if="item.content_type === 1"
                >原创</span
              >
              <span
                style="background-color: #67c23a"
                v-if="item.content_type === 0"
                >转载</span
              >
            </li>
            <li>
              <i class="el-icon-view"></i>
              {{ item.user_see }}
            </li>
         
            <li>
              <i class="el-icon-chat-square"></i>
              {{ item.user_pl }}
            </li>
            <li>发布于：{{ item.data_time }}</li>
            <li>
              <i class="el-icon-user"></i>
              {{ item.user }}
            </li>
          </ul>
        </div>
      </div>
      <p
        style="
          margin-top: 10px;
          margin-bottom: 10px;
          background-color: #f56c6c;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
        "
      >
        热门推荐
      </p>
      <!-- 热门推荐 -->
      <div
        class="blog_one"
        v-for="item in BlogData"
        :key="item.id"
        @click="SeeBlog(item)"
      >
        <!-- 头部标题 -->
        <div class="blog_title">
          {{ item.title }}
        </div>
        <!-- 中心内容显示 -->
        <div class="blog_content">
          {{ item.see_content }}
        </div>
        <!-- 底部数据 -->
        <div class="blog_bottom">
          <ul>
            <li>
              <span
                style="background-color: #f56c6c"
                v-if="item.content_type === 1"
                >原创</span
              >
              <span
                style="background-color: #67c23a"
                v-if="item.content_type === 0"
                >转载</span
              >
            </li>
            <li>
              <i class="el-icon-view"></i>
              {{ item.user_see }}
            </li>
         
            <li>
              <i class="el-icon-chat-square"></i>
              {{ item.user_pl }}
            </li>
            <li>发布于：{{ item.data_time }}</li>
            <li>
              <i class="el-icon-user"></i>
              {{ item.user }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchblog",
  data() {
    return {
      content: "",
      // 首页搜索进来存储数据
      searcgData: [],
      // 热门推荐数据
      BlogData: [],
      // 本页面搜索数据
      DataContent: [],
    };
  },
  watch: {},
  created() {
    this.content = this.$route.query.content;
    this.get();
    this.HostGet();
  },
  methods: {
    get() {
      this.$get(
        `/search/see_user_blog?title=${this.$route.query.content}`
      ).then((res) => {
        this.searcgData = res.result;
        let p = document.getElementById("search_count");
        p.innerHTML = `搜索到关键词为： <b>${this.content}</b>  的数据有<b>  ${res.result.length}  </b>条`;
      });
    },
    // 热门推荐数据
    HostGet() {
      this.$get("/host_blog/seeblog").then((res) => {
        if (res.code === 200) {
          this.BlogData = res.result;
        }
      });
    },
    // 搜索方法
    searchBlog() {
      if (this.content === "") {
        this.$message({
          type: "warning",
          message: "请输入内容",
        });
      } else {
        this.searcgData = [];
        this.$get(`/search/see_user_blog?title=${this.content}`).then((res) => {
          this.searcgData = res.result;
          let p = document.getElementById("search_count");
          p.innerHTML = `搜索到关键词为： <b>${this.content}</b>  的数据有  <b>${res.result.length}</b>  条`;
          this.HostGet();
        });
      }
    },
    // 查看详细
    SeeBlog(item) {
      console.log(item);
      console.log(item.id);
      window.open("http://192.168.1.80:8080/seeblog?id=" + item.id);
    },
  },
};
</script>

<style>
.searchblog {
  width: 100%;
}
.search_head_blog {
  width: 100%;
  height: 50px;
  background-color: #f0f0f2;
  position: fixed;
}
.brother_zw {
  width: 100%;
  height: 50px;
}
.blog_content_search {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  line-height: 50px;
}
.search_content {
  width: 1100px;
  margin: 0 auto;
  margin-top: 10px;
  padding-left: 5px;
}
.blog_one {
  width: 100%;
  height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
}
.blog_one:hover {
  cursor: pointer;
}
.blog_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
}
.blog_title:hover {
  color: #f56c6c;
}
.blog_one .blog_content {
  display: inline-block;
  width: 100%;
  height: 100px;
  max-width: 1080px;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
  margin-left: 5px;
}
.blog_bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.blog_bottom ul li {
  float: left;
  height: 100%;
  margin-left: 30px;
}
</style>