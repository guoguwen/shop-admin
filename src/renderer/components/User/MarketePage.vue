<template>
  <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>经销商管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <router-link to="">
                    <el-button type="primary" icon="plus" @click="openDialog">添加经销商</el-button>
                </router-link>
            </div>
        </div>
        <div class="content-main">
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item label="经销商">
                        <el-input v-model="mkName" placeholder="请输入经销商"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" style="width: 100%" border stripe>
                <el-table-column prop="id" label="经销商编号">
                </el-table-column>
                <el-table-column prop="name" label="经销商名称">
                </el-table-column>
                <el-table-column prop="create_time" :formatter="timeFormat" label="加入时间">
                </el-table-column>
                <el-table-column label="查看">
                    <template scope="scope">
                        <el-button type="text" @click="handleRowDelete(scope.$index, scope.row)">查看</el-button>   
                    </template>    
                </el-table-column>
            </el-table>
            <div class="page-box">
				<el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
        </div>
        <el-dialog title="添加经销商" :visible.sync="centerDialogVisible" width="25%" center>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-input v-model="markete" placeholder="请输入经销商名称"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMarkete">添 加</el-button>
            </span>
        </el-dialog>
  </div>        
</template>
<script>
import moment from 'moment'
export default {
    data(){
        return{
            page: 1,
            total: 0,
            mkName:'',
            tableData: [],
            centerDialogVisible:false,
            filterForm:{},
            markete:''
        }
    },
    methods:{
        onSearch(){
            this.axios.get('dealer/search?name='+this.mkName).then(res => {
                if(res.data.errno === 0){
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.count;
                }
            })
        },
        list() {
            this.axios.get('dealer/search').then(res => {
                if(res.data.errno === 0){
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.count;
                }
            })
        },
        timeFormat(row, column){
			var date = row[column.property]; 
			if (date == undefined) {  
				return "";  
			}  
			return moment.unix(date).format("YYYY-MM-DD HH:mm:ss");   
        },
        addMarkete(){
            this.axios.get('dealer/add?name='+this.markete).then(res => {
                if(res.data.errno === 0){
                    this.$message({
                        type : 'success',
                        message : '添加成功'  
                    })
                }
                this.centerDialogVisible = false;
                this.list();
            })
            
        },
        openDialog(){
            this.centerDialogVisible = true;
        },
        handlePageChange(){

        }
    },
    mounted() {
        this.list();
    }
}
</script>
<style scoped>

</style>
