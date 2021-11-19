<template>
  <div class="seeblog">
      <div class="seeblog_content">
          <!-- 标题 -->
          <div class="head_seeblog">
              {{BlogData.title}}
          </div>
          <!-- 文章情况 -->
          <div class="blog_text_msg">
              <img style="width:50px;height:100%;border-radius:50%;padding-left:10px" :src="UserData.user_img" alt="">
              <span style="display: inline-block;margin-left:10px">{{UserData.nickname}}</span>
              <ul>
                <li>
                  <span style="background-color:#F56C6C" v-if="BlogData.content_type===1">原创</span>
                  <span style="background-color:#67C23A" v-if="BlogData.content_type===0">转载</span>
              </li>
                  <li>
                      发布于：{{BlogData.data_time}}
                  </li>
                  <li>
                       <i class="el-icon-view"></i>
                       {{BlogData.user_see}}
                  </li>
                  <li>
                       <i class="el-icon-thumb"></i>
                       {{BlogData.user_dz}}
                  </li>
              </ul>
              <span style="margin-left:50px">
                  <span v-if="BlogData.status===0" style="background-color:#67C23A">待审核</span>
                  <span v-if="BlogData.status===3" style="background-color:#F56C6C">未通过</span>
              </span>
          </div>
          <!-- 内容 -->
          <div class="blog_text_content" v-html="BlogData.content">

          </div>
          <!-- 评论 -->
          <div class="blog_text_pl">

          </div>
      </div>
  </div>
</template>

<script>
export default {
name:'seeblog',
data(){
    return{
        BlogData:'',
        UserData:''
    }
},
created(){
    this.get()
},
methods:{
    get(){
        this.$get(`/share/see_user_blog?id=${this.$route.query.id}`).then(res=>{
            console.log(res)
            if(res.code===200){
                this.BlogData=res.result[0]
                this.$get(`/dg_msg/user?id=${res.result[0].user_id}`).then(resp=>{
                    console.log(resp)
                    if(resp.code===200){
                        this.UserData=resp.result[0]
                    }
                })
            }
        })
    }
}
}
</script>

<style>
.seeblog{
    width: 100%;
    /* height: 100%; */
    /* background-color: lawngreen; */
    display: inline-block;
    /* background: url('../../static/bg.gif'); */
}
.seeblog_content{
    width: 1200px;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
            margin-top: 10px;
            /* display: inline-block; */
}
.head_seeblog{
    height: 80px;
    /* background-color: lightblue; */
    font-size: 45px;
    font-weight: 600;
    line-height: 80px;
    padding-left: 10px;
}
img{
    width: 100%;
}
.blog_text_msg{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #f0f0f5;
    display: flex;
}
.blog_text_msg ul li{
    float: left;
    margin-left: 20px;
}
.blog_text_content{
    /* width: 100%; */
    padding-left: 10px;
        padding-right: 10px;
    margin-top: 10px;
    line-height: 50px;
}
.blog_text_pl{
    width: 100%;
    height: 50px;
    background-color: lightcoral;
}
</style>