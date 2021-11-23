<template>
  <div class="comment">
       <el-table
    :data="MsgData.slice((currentPage - 1) * size, currentPage * size)"
    style="width: 100%" :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{
        textAlign: 'center',
        background: '#eef1f6',
        color: '#606266',
      }"
      height="840px">
     <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ (currentPage - 1) * size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
     <el-table-column
      label="标题"
      prop="blog_title">
    </el-table-column>
    <el-table-column
      label="用户"
      prop="user">
    </el-table-column>
    <el-table-column
      label="内容"
      prop="send_msg">
    </el-table-column>
    <el-table-column
      label="时间"
      prop="send_time">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleSee(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
       </el-table>
        <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="MsgData.length"
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
name:'comment',
data(){
    return{
        MsgData:[],
         currentPage: 1,
      size: 15,
    }
},
created(){
    this.get()
},
methods:{
    get(){
        this.$get('/all/blog_msg').then(res=>{
            if(res.code===200){
                this.MsgData=res.result
            }
        }).catch(e=>{
        this.$message({
          type:'error',
          message:'服务异常，请稍后重试！'+e
        })
      });
    },
    // 查看
    handleSee(index,row){
         window.open('http://www.jcsy.work:3334/#/seeblog?id='+row.blog_id)
    },
    // 删除
    handleDelete(index,row){
        this.$get(`/del_blog/msg?id=${row.id}&blog_id=${row.blog_id}`).then(res=>{
            if(res.code===200){
                this.$message({
                    type:'success',
                    message:'删除成功！'
                })
                setTimeout(()=>{
                    this.get()
                },500)
            }
        }).catch(e=>{
        this.$message({
          type:'error',
          message:'服务异常，请稍后重试！'+e
        })
      });
    },
     // 分页选择
    handleCurrentChange(val) {
      this.currentPage = val;
    },
}
}
</script>

<style>
.comment{
    width: 100%;
}
</style>