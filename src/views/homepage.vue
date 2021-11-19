<template>
  <div class="homepage">
        <!-- 轮播图 -->
    <div class="home_lbt">
      <el-carousel style="height: 100%" :interval="5000" arrow="always">
        <el-carousel-item style="height: 100%" v-for="(item,index) in pictureList" :key="index">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <footer>
     <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">陕ICP备2021001587号-1</a><br>
     <span>©CopyRight 2021 www.jcsy.work Inc All Rights Reserved. 叫做长大 版权所有</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data(){
      return{
           pictureList:[require('../../static/bg1.jpg'),require('../../static/bg2.jpg'),require('../../static/bg3.jpg'),require('../../static/bg4.jpg')],
      }
  }
};
</script>

<style>
.homepage {
  width: 100%;
  height: 100%;
  /* background-color: #dfdfdf; */
  position: relative;
  /* z-index: -1; */
}

/* 轮播图 */
.home_lbt {
  width: 60%;
  height: 300px;
  /* background-color: palegreen; */
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
footer{
    width: 100%;
    height: 80px;
    background-color: #f0f0f5;
    line-height: 40px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
}
</style>