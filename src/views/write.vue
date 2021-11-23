<template>
  <div class="write">
    <div class="write_head">
      <span style="margin-left: 20px" @click="backHome">
        <i class="el-icon-arrow-left"></i>
        返回
      </span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="title"
        maxlength="10"
        show-word-limit
        style="width:50%; margin-left: 20px"
      >
      </el-input>
      <el-button type="primary" style="margin-left: 20px" @click="submitBlog"
        >发布<i class="el-icon-upload el-icon--right"></i
      ></el-button>
    </div>
    <div class="write_bottom">
      <mavon-editor
        :toolbars="toolbars"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
        style="height: 100%"
        v-model="content"
        @change="change"
        ref="md"
      />
    </div>
    <!-- 发布最后一步确认 -->
    <el-dialog
      title="选择类型"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select
        v-model="type"
        style="width: 100%"
        @change="typeChange"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-if="typeshow"
        placeholder="请输入转载文章链接"
        v-model="reprint_url"
        clearable
        style="margin-top: 20px"
      >
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendBlog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "write",
  data() {
    return {
      // 标题
      title: "",
      // 内容
      content: "",
      //   右边编辑区内容
      see_content: "",
      // 发布最后一步确认
      dialogVisible: false,
      // 文章类型
      type: "",
      options: [
        {
          label: "原创",
          value: 1,
        },
        {
          label: "转载",
          value: 0,
        },
      ],
      // 转载链接
      reprint_url: "",
      typeshow: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      userData: "",
    };
  },
  created() {
    this.get();
  },
  watch: {
    //   content(old,newold){
    //       console.log(old,newold)
    //   }
  },
  methods: {
    // 初始获取信息
    get() {
      this.$get(`/dg_msg/user?id=${sessionStorage.getItem("id")}`).then(
        (res) => {
          if (res.code === 200) {
            this.userData = res.result[0];
          }
        }
      );
    },
    //   返回个人信息页面
    backHome() {
      if (this.title !== "" || this.content !== "") {
        this.$confirm("离开后，页面中的数据将不会被保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        }).then(() => {
          this.$router.push("/userMsg/userblog");
        });
      } else {
        this.$router.push("/userMsg/userblog");
      }
    },
    //监听markdown变化
    change(value, render) {
      this.see_content = value;
      this.content = render;
      console.log(this.see_content);
      console.log(this.content);
    },
    // 类型选择
    typeChange() {
      this.reprint_url = "";
      if (this.type === 0) {
        this.typeshow = true;
      } else {
        this.typeshow = false;
      }
    },
    // 发布文章
    submitBlog() {
      if (this.title === "" || this.content === "") {
        this.$message({
          type: "warning",
          message: "咦！快检查检查什么还没写...",
        });
      } else {
        this.dialogVisible = true;
      }
    },
    // 确认发布
    sendBlog() {
      if (this.type === "") {
        this.$message({
          type: "warning",
          message: "请选择类型",
        });
      } else if (this.type === 0) {
        if (this.reprint_url === "") {
          this.$message({
            type: "warning",
            message: "请输入原文链接",
          });
        } else {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          let data = {
            user: this.userData.user,
            title: this.title,
            content: this.$refs.md.d_render,
            user_pl: 0,
            user_see: 0,
            content_type: Number(this.type),
            data_time: this.timestampToTime(Date.now()),
            status: 0,
            see_content: this.see_content,
            user_id: this.userData.id,
            reprint_url: this.reprint_url,
          };
          this.$post("/insert_blog", data)
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "发布成功！",
                });
                this.title = "";
                this.content = "";
                this.$router.push("/userMsg/userblog");
                loading.close();
              }
            })
            .catch((e) => {
              this.$message({
                type: "error",
                message: "发布失败！" + e,
              });
              loading.close();
            });
        }
      } else if (this.type === 1) {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let data = {
          user: this.userData.user,
          title: this.title,
          content: this.$refs.md.d_render,
          user_pl: 0,
          user_see: 0,
          content_type: Number(this.type),
          data_time: this.timestampToTime(Date.now()),
          status: 0,
          see_content: this.see_content,
          user_id: this.userData.id,
          reprint_url: this.reprint_url,
        };
        this.$post("/insert_blog", data)
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "发布成功！",
              });
              this.title = "";
              this.content = "";
              loading.close();
              this.$router.push("/userMsg/userblog");
            }
          })
          .catch((e) => {
            this.$message({
              type: "error",
              message: "发布失败！" + e,
            });
            loading.close();
          });
      }
    },
    //上传图片接口pos 表示第几个图片
    handleEditorImgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      this.$post("/upload/", formdata).then((res) => {
        var url = res.url;
        this.$refs.md.$img2Url(pos, url); //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
      });
    },
    handleEditorImgDel() {
      console.log("handleEditorImgDel"); //我这里没做什么操作，后续我要写上接口，从七牛云CDN删除相应的图片
    },
    handleClose(done) {
      done();
    },
    // 时间转换以及补零操作
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1).toString().padStart(2, "0") + "-";
      var D = date.getDate().toString().padStart(2, "0") + " ";
      var h = date.getHours().toString().padStart(2, "0") + ":";
      var m = date.getMinutes().toString().padStart(2, "0") + ":";
      var s = date.getSeconds().toString().padStart(2, "0");
      return Y + M + D + h + m + s;
    },
  },
};
</script>

<style>
.write {
  width: 100%;
  height: 100%;
}
.write_head {
  width: 100%;
  height: 6%;
  background-color: #f0f0f5;
  line-height: 50px;
}
.write_head span:hover {
  cursor: pointer;
}
.write_bottom {
  width: 100%;
  height: 94%;
  background-color: steelblue;
}
@media screen and (max-width: 600px) {
   .write_head{
   height: 60px;
   line-height: 70px;
  }
  .write_head,
  .write_bottom {
    width: 450px;
  }
  .write_head span{
    font-size: 10px;
  }
 
}
</style>