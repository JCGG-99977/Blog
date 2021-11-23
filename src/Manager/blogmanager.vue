<template>
  <div class="blogmanager">
    <el-table
      :data="BlogData.slice((currentPage - 1) * size, currentPage * size)"
      style="width: 100%"
      :default-sort="{ prop: 'data_time', order: 'descending' }"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{
        textAlign: 'center',
        background: '#eef1f6',
        color: '#606266',
      }"
      height="840px"
    >
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ (currentPage - 1) * size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="data_time"
        label="发布日期"
        show-overflow-tooltip
        sortable
      >
      </el-table-column>
      <el-table-column prop="user" label="用户" sortable> </el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.content_type === 1">原创</span>
          <span v-if="scope.row.content_type === 0">转载</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">已发布</span>
          <span v-if="scope.row.status === 0">待审核</span>
          <span v-if="scope.row.status === 3">已删除</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_see" label="阅读量"> </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleSee(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="handleCkeck(scope.$index, scope.row)">
            <span v-if="scope.row.status === 1">下架</span>
            <span v-if="scope.row.status === 0">通过</span>
            <span v-if="scope.row.status === 3">恢复</span>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-if="scope.row.status !== 3"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="danger"
            disabled
            v-if="scope.row.status === 3"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="'标题为：' + dg_msg.title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      操作员：{{ id }}
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
        style="margin-top: 20px"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeleteOK">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="BlogData.length"
      :current-page="currentPage"
      :page-size="size"
      style="text-align: center"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "blogmanager",
  data() {
    return {
      BlogData: [],
      currentPage: 1,
      size: 15,
      dialogVisible: false,
      dg_msg: "",
      textarea: "",
      id: "",
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.$get("/all/seeblog").then((res) => {
        if (res.code === 200) {
          this.BlogData = res.result;
        }
      });
    },
    // 查看
    handleSee(index, row) {
      // this.$router.replace({
      //   path: "seeblog",
      //   query: {
      //     id: row.id,
      //   },
      // });
      window.open('http://192.168.1.80:8080/seeblog?id='+row.id)
    },
    //更新
    handleCkeck(index, row) {
      let data = {};
      var that = this;
      if (row.status === 0) {
        data = {
          id: row.id,
          status: 1,
        };
      } else if (row.status === 1) {
        data = {
          id: row.id,
          status: 0,
        };
      } else if (row.status === 3) {
        data = {
          id: row.id,
          status: 0,
        };
      }
      that.$post("/user_admin/change_user_blog", data).then((res) => {
        if (res.code === 200) {
          setTimeout(function () {
            that.$message({
              type: "success",
              message: "操作成功！",
            });
            that.get();
          }, 500);
        }
      });
      console.log(data);
    },
    handleClose(done) {
      done();
    },
    DeleteOK() {
      if (this.textarea === "") {
        this.$message({
          type: "warning",
          message: "请输入删除此博文的原因！",
        });
      } else {
        this.$get(`/dg_msg/user?id=${this.dg_msg.user_id}`).then((res) => {
          if (res.code === 200) {
            // /del_blog/email
            let data = {
              id: this.dg_msg.id,
            };
            this.$post("/del_user_blog", data).then((resp) => {
              if (resp.code === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功！",
                });
                setTimeout(() => {
                  this.get();
                  this.dialogVisible=false
                  this.textarea=''
                }, 500);
                let data1={
                    email:res.result[0].email,
                    user:res.result[0].user,
                    text:this.textarea
                }
                this.$post('/del_blog/email',data1).then(res=>{
                    if(res.code===200){
                        console.log('Success')
                    }
                })
                let data2={
                    id:sessionStorage.getItem('id'),
                    user:res.result[0].user,
                    title:this.dg_msg.title,
                    text:this.textarea
                }
                this.$post('/admin_all/del_blog/email',data2).then(res=>{
                     if(res.code===200){
                        console.log('Success')
                    }
                })
              }
            });
          }
        });
      }
    },
    // 删除
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dg_msg = row;
      this.id = sessionStorage.getItem("id");
      // /del_user_blog
      //   let data = {
      //     id: row.id,
      //   };
      //   this.$post("/del_user_blog", data).then((res) => {
      //     if (res.code === 200) {
      //       this.$message({
      //         type: "success",
      //         message: "删除成功！",
      //       });
      //       setTimeout(()=>{
      //           this.get()
      //       },500)
      //     }
      //   });
    },
    // 分页选择
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style>
.blogmanager {
  width: 100%;
  height: 100%;
  /* background-color: lightgoldenrodyellow; */
}
</style>