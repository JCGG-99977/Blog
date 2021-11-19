<template>
  <div class="feedback">
    <div class="feedback_head">
      <p
        style="
          font-size: 20px;
          font-weight: 600;
          border-bottom: 1px solid black;
          margin-bottom: 10px;
        "
      >
        反馈历史
      </p>
      <el-table
        :data="tableData.slice((currentPage - 1) * size, currentPage * size)"
        style="width: 100%"
        height="85%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{
          textAlign: 'center',
          background: '#eef1f6',
          color: '#606266',
        }"
        :default-sort = "{prop: 'time', order: 'descending'}"
      >
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              (currentPage - 1) * size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="time" label="日期" sortable>
        </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleSee(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length"
        :current-page="currentPage"
        :page-size="size"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div class="feedback_bottom">
      <p
        style="
          font-size: 20px;
          font-weight: 600;
          border-bottom: 1px solid black;
          margin-bottom: 10px;
        "
      >
        数据提交
      </p>
      <table
        cellpadding="50px"
        cellspacing="30px"
        style="width: 100%; text-align: center"
      >
        <tr>
          <td>类型：</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="value"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>意见：</td>
          <td>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button type="primary" @click="SendFeedback">提交</el-button>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog
  :title="feedbackData.type"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  内容为：{{feedbackData.content}}
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "feedback",
  data() {
    return {
        // 反馈历史数据
      tableData: [],
    //   反馈的类型
      value: "",
    //   反馈的内容
      textarea: "",
    //   反馈的选择类型
      options: [
        {
          label: "界面设计",
          value: "界面设计",
        },
        {
          label: "博文审核",
          value: "博文审核",
        },
        {
          label: "个人信息",
          value: "个人信息",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
      //   分页默认
      currentPage: 1,
      size: 6,
    //   弹框
    dialogVisible:false,
    // 弹框显示的内容
    feedbackData:''
    };
  },
  created() {
    if (this.$store.state.id === "") {
      this.$store.state.id = sessionStorage.getItem("id");
    }
    this.get();
  },
  methods: {
    //   获取初始数据，反馈历史数据
    get() {
      this.$get(`/search_userfeeb?user_id=${this.$store.state.id}`).then(
        (res) => {
          if (res.code === 200) {
            this.tableData = res.result;
          }
        }
      );
    },
    //   提交数据
    SendFeedback() {
      var that = this;
      if (that.value === "") {
        that.$message({
          type: "warning",
          message: "请选择类型！",
        });
      } else if (that.textarea === "") {
        that.$message({
          type: "warning",
          message: "请输入内容！",
        });
      } else {
        this.$get(`/dg_msg/user?id=${this.$store.state.id}`).then((res) => {
          if (res.code === 200) {
            let data = {
              user: res.result[0].user,
              type: that.value,
              time: that.timestampToTime(Date.now()),
              content: that.textarea,
              email: res.result[0].email,
              user_id: res.result[0].id,
            };
            this.$post("/insert_userfeeb", data).then((resp) => {
              if (resp.code === 200) {
                setTimeout(() => {
                  this.get();
                  this.$message({
                      type:'success',
                      message:'反馈成功，感谢您一路的支持！'
                  })
                  this.value=''
                  this.textarea=''
                }, 500);
                console.log(resp);
                this.$get(
                  `/feeb_back/email?user=${res.result[0].user}&email=${res.result[0].email}`
                ).then((res) => {
                  console.log(res.msg);
                });
                let data = {
                  user: res.result[0].user,
                  type: this.value,
                  content: this.textarea,
                };
                this.$post("/cover_user/feeb_back/email", data).then((res) => {
                  console.log(res.msg);
                });
              }
            });
            console.log(data);
          }
        });
      }
    },
    handleClose(done){
        done()
    },
    // 分页选择
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 查看反馈数据
    handleSee(index, row) {
        this.dialogVisible=true
        this.feedbackData=row
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
.feedback {
  width: 100%;
  height: 100%;
}
.feedback_head {
  width: 100%;
  height: 450px;
  background-color: #fff;
  text-align: center;
}
.feedback_bottom {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
}
</style>