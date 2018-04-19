<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <router-link to="/dashboard/goods/add">
                    <el-button type="primary" icon="plus">添加商品</el-button>
                </router-link>
            </div>
        </div>
        <div class="content-main">
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item label="商品名称">
                        <el-input v-model="filterForm.name" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitFilter">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="ID" width="100">
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="retail_price" label="售价" width="120">
                    </el-table-column>
                    <el-table-column prop="goods_number" label="库存" width="120">
                    </el-table-column>
                    <el-table-column prop="is_new" label="新品" width="80">
                        <template scope="scope">
                            {{ scope.row.is_new == 1 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_new" label="人气" width="80">
                        <template scope="scope">
                            {{ scope.row.is_hot == 1 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_show" label="上架" width="80">
                        <template scope="scope">
                            {{ scope.row.is_on_sale == 1 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort_order" label="排序" width="80">
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                        <template scope="scope">
                            <el-button size="small" :disabled="scope.row.is_on_sale == 1 " @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" v-show="scope.row.is_on_sale == 1 ? true : false"  type="warning" @click="handleRowDelete(scope.$index, scope.row,0)">下架</el-button>
                            <el-button size="small" v-show="scope.row.is_on_sale == 0 ? true : false"  type="success" @click="handleRowDelete(scope.$index, scope.row,1)">上架</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="content-main">
            <h4>商品评价</h4><el-button type="primary" icon="plus" class="btn" @click="addJudge">添加评价</el-button>
            <egrid class="egrid" stripe border :data="judge" :columns="column"></egrid>
            <el-dialog title="添加评价" v-model="dialogFormVisible">
                <el-form :model="form" label-position="left" label-width="120px">
                    <el-form-item label="商品名称">
                        <el-select v-model="form.g_name" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评价人名称">
                        <el-input v-model="form.u_name" auto-complete="off" class="content"></el-input><el-radio v-model="form.random" label="true">随机头像</el-radio>
                    </el-form-item>
                    <el-form-item label="商品评分">
                        <el-rate v-model="form.rate" show-text style="display:inline-block"></el-rate>
                    </el-form-item>
                    <el-form-item label="评价内容">
                        <el-input type="textarea" v-model="form.content" clearable="content" :rows="3"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
                <el-upload class="upload" action="https://dh.sty.sztcmdiet.com/admin/upload/upimg" name="img" :headers="uploaderHeader" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-success="handleUploadImageSuccess1"  :before-upload="beforeAvatarUpload"><i class="el-icon-plus"></i></el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
            </el-dialog>
        </div>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        page: 1,
        total: 0,
        filterForm: {
          name: ''
        },
        column:[
            {label:'评价内容',prop:'content'},
            {label:'商品名称',prop:'goodName'}
        ],
        form:{
            g_name:'',
            u_name:'',
            rate:'',
            content:''
        },
        dialogFormVisible:false,
        judge:[],
        cando:true,
        tableData: []
      }
    },
    methods: {
      addJudge(){
          this.dialogFormVisible =true;
      },
      handlePageChange(val) {
        this.page = val;
        //保存到localStorage
        localStorage.setItem('goodsPage', this.page)
        localStorage.setItem('goodsFilterForm', JSON.stringify(this.filterForm));
        this.getList()
      },
      handleRowEdit(index, row) {
        this.$router.push({ name: 'goods_edit', query: { id: row.id } })
      },
      handleRowDelete(index, row, status) {
        let con_message =status == 1 ? '确定要上架？' : '确定要下架？';
        let suc_message =status == 1 ? '上架成功' : '下架成功'; 
        this.$confirm(con_message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.axios.post('goods/downGoods', { id: row.id ,is_on_sale: status}).then((response) => {
            if (response.data.errno === 0) {
                this.$message({
                    type: 'success',
                    message: suc_message
                });
                this.getList();
            }
          })
        });
      },
      onSubmitFilter() {
        this.page = 1
        this.getList()
      },
      getList() {
        this.axios.get('goods', {
          params: {
            page: this.page,
            name: this.filterForm.name
          }
        }).then((response) => {
          this.tableData = response.data.data.data
          this.page = response.data.data.currentPage
          this.total = response.data.data.count
        })
      }
    },
    components: {

    },
    mounted() {
      this.getList();
    }
  }

</script>

<style scoped>
    .btn{
        float: right;
    }
    .content{
        width: 25%;
    }
    .upload{
        margin-left: 15%;
    }
</style>
