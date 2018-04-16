<template>
  <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>店铺运营</el-breadcrumb-item>
                <el-breadcrumb-item>二维码</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <router-link to="">
                    <el-button type="primary" icon="plus" @click="openDialog">添加二维码</el-button>
                </router-link>
            </div>
        </div>
        <div class="content-main">
            <el-table :data="tableData" style="width: 100%" border stripe>
                <el-table-column prop="qrcode_url" label="二维码">
                    <template scope="scope">
                        <img class="tab-img" :src="host+scope.row.qrcode_url" alt="二维码图片">
                    </template>
                </el-table-column>
                <el-table-column prop="dealer_name" label="经销商">
                </el-table-column>
                <el-table-column prop="goods_img">
                    <template scope="scope">
                        <img class="tab-img" :src="scope.row.goods_img" alt="商品图片">
                    </template>    
                </el-table-column>
                <el-table-column prop="goods_name" label="商品">
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
        <el-dialog title="添加二维码" :visible.sync="centerDialogVisible" width="25%" center>
            <el-row :gutter="24">
                <el-col :span="12">
                    商&nbsp;&nbsp;&nbsp;&nbsp;品：
                    <el-select v-model="goodid" placeholder="请选择">
                        <el-option v-for="item in goods" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    经销商：
                    <el-select v-model="marketeid" placeholder="请选择">
                        <el-option v-for="item in marketes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addQrcode">添 加</el-button>
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
            host: 'http://pan.baidu.com/share/qrcode?w=150&h=150&url=https://dh.sty.sztcmdiet.com/',
            tableData: [],
            centerDialogVisible:false,
            marketes: [],
            goods: [],
            goodid:'',
            marketeid:''
        }
    },
    methods:{
        getGoods(){
            this.axios.get('goods').then(res => {
                if(res.data.errno === 0){
                    let data = res.data.data;
                    this.goods = this.creatArr(data);
                }
            })
        },
        markete() {
            this.axios.get('dealer/search').then(res => {
                if(res.data.errno === 0){
                    let data = res.data.data.data;
                    this.marketes = this.creatArr(data);
                }
            })
        },
        list() {
            this.axios.get('dealer/QRlist').then(res => {
                if(res.data.errno === 0){
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                }
            })
        },
        creatArr(obj) {
            let arr =[];
            for(let i in obj){
                let temp ={
                    label : obj[i].name,
                    value : obj[i].id 
                }
                arr.push(temp);
            }
            return arr;
        },
        timeFormat(row, column){
			var date = row[column.property]; 
			if (date == undefined) {  
				return "";  
			}  
			return moment.unix(date).format("YYYY-MM-DD HH:mm:ss");   
        },
        addQrcode(){
            this.axios.get('dealer/QRadd?goods_id='+this.goodid+'&dealer_id='+this.marketeid).then(res => {
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

        },
        handleRowDelete(index, row){
             this.$message({
              type: 'info',
              message: '这个功能很鸡肋'
            });
        }
    },
    mounted() {
        this.list();
        this.getGoods();
        this.markete();
    }
}
</script>
<style scoped>
    .tab-img{
        width: 180px;
        height: 180px;
    }
</style>
