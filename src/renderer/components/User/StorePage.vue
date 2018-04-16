<template>
  <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content-main">
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-input v-model="name" placeholder="请输入姓名"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="phone" placeholder="请输入手机号"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button @click="onSearch" type="primary">搜索</el-button>
                </el-col>  
            </el-row>
            <el-table :data="tableData" style="width: 100%" border stripe class="table">
                <el-table-column prop="id" label="姓名">
                </el-table-column>
                <el-table-column prop="order_sn" label="手机号码">
                </el-table-column>
                <el-table-column prop="add_time" :formatter="timeFormat" label="开通时间">
                </el-table-column>
                <el-table-column prop="add_time" :formatter="timeFormat" label="累计订单(笔)">
                </el-table-column>
                <el-table-column prop="add_time" :formatter="timeFormat" label="累计奖励(元)">
                </el-table-column>
                <el-table-column prop="add_time" :formatter="timeFormat" label="查看">
                </el-table-column>
            </el-table>
            <div class="page-box">
				<el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
        </div>
  </div>        
</template>
<script>
export default {
    data(){
        return{
            mkName:'',
            tableData:[],
        }
    },
    methods:{
        onSearch(){

        },
        handlePageChange(){

        }
    },
    mounted() {

    }
}
</script>
<style scoped>
.table{
    margin-top:25px;
}
</style>
