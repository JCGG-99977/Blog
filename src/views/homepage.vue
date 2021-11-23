<template>
  <div class="homepage">
    <!-- 轮播图 -->
    <div class="home_lbt">
      <el-carousel style="height: 100%" :interval="5000" arrow="always">
        <el-carousel-item
          style="height: 100%"
          v-for="(item, index) in pictureList"
          :key="index"
        >
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content_homepage">
      <div
        class="blog_one"
        v-for="(item, index) in blogData.slice(
          (currentPage - 1) * size,
          currentPage * size
        )"
        :key="index"
        @click="SeeBlog(item)"
      >
        <!-- 头部标题 -->
        <div class="blog_title">
          {{ item.title }}
          <span style="background-color: #67c23a" v-if="item.status === 0"
            >待审核</span
          >
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
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="blogData.length"
      :current-page="currentPage"
      :page-size="size"
      style="text-align: center"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <footer>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
        >陕ICP备2021001587号-1</a
      ><br />
      <span
        >©CopyRight 2021 www.jcsy.work Inc All Rights Reserved. 叫做长大
        版权所有</span
      >
    </footer>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data() {
    return {
      pictureList: [
        require("../../static/bg1.jpg"),
        require("../../static/bg2.jpg"),
        require("../../static/bg3.jpg"),
        require("../../static/bg4.jpg"),
      ],
      blogData: [],
      currentPage: 1,
      size: 5,
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.$get("/homepage_all/seeblog")
        .then((res) => {
          this.blogData = res.result;
        })
        .catch((e) => {
          this.$message({
            type: "error",
            message: "服务异常，请稍后重试！" + e,
          });
        });
    },
    // 查看详细
    SeeBlog(item) {
      window.open("http://www.jcsy.work:3334/#/seeblog?id=" + item.id);
    },
    // 分页选择
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style>
.homepage {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 轮播图 */
.home_lbt {
  width: 800px;
  height: 300px;
  margin: 0 auto;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  height: 100%;
}
/* 底部信息 */
footer {
  width: 100%;
  height: 80px;
  background-color: #f0f0f5;
  line-height: 40px;
  text-align: center;
}
.content_homepage {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
}
.content_homepage .blog_one {
  width: 100%;
  height: 200px;
  background-color: #f1f0f8;
  margin-bottom: 20px;
  border-radius: 10px;
}
.content_homepage .blog_one:hover {
  cursor: pointer;
}
.content_homepage .blog_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
}
.content_homepage .blog_one .blog_content {
  display: inline-block;
  width: 100%;
  height: 100px;
  max-width: 1150px;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
  margin-left: 5px;
}
.content_homepage .blog_bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.content_homepage .blog_bottom ul li {
  float: left;
  height: 100%;
  margin-left: 30px;
}
@media screen and (max-width: 600px) {
  .home_lbt {
    width: 350px;
    height: 250px;
  }
  footer {
    height: 80px;
    line-height: 30px;
  }
  .content_homepage .blog_one {
    width: 350px;
    height: 250px;
  }
  .content_homepage .blog_bottom {
    width: 100%;
    height: 100px;
  }
}
</style>