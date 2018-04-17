<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>运营概况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
        <el-row :gutter="24">
            <el-col :span="6">
                <el-card shadow="never" class="card">
                    用户总数<h5 v-text="user_count">0</h5>
                </el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">店铺总数<h5 v-text="store_count">0</h5></el-card>
            </el-col>  
            <el-col :span="6" class="card">
                <el-card shadow="never">累计订单数<h5 v-text="order_count">0</h5></el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">累计交易额<h5 v-text="cash_count">0</h5></el-card>
            </el-col>  
        </el-row>
    </div>
    <div class="content-main order">
        <el-row :gutter="24">
            <el-col :span="6">
                <el-card shadow="never" class="card">
                    订单数（本月）<h5 v-text="order_num_cur">0</h5>
                </el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">订单数（上月）<h5 v-text="order_num_last">0</h5></el-card>
            </el-col>  
            <el-col :span="6" class="card">
                <el-card shadow="never">新增用户数（本月）<h5 v-text="adduser_cur">0</h5></el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">新增用户数（本月）<h5 v-text="adduser_last">0</h5></el-card>
            </el-col> 
        </el-row>
        <el-row :gutter="24" class="line-feed">
            <el-col :span="6">
                <el-card shadow="never" class="card">
                    客单数（本月）<h5 v-text="kedanshu_cur">0</h5>
                </el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">客单数（上月）<h5 v-text="kedanshu_last">0</h5></el-card>
            </el-col>  
            <el-col :span="6" class="card">
                <el-card shadow="never">新增客单数（本月）<h5 v-text="add_kedanshu_cur">0</h5></el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">新增客单数（上月）<h5 v-text="add_kedanshu_last">0</h5></el-card>
            </el-col>  
        </el-row>      
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            user_count:0,
            store_count:0,
            order_count:0,
            cash_count:0,
            order_num_cur:0,
            order_num_last:0,
            adduser_cur:0,
            adduser_last:0,
            kedanshu_cur:0,
            kedanshu_last:0,
            add_kedanshu_cur:0,
            add_kedanshu_last:0
        }
    },
    methods:{
        init() {
            this.axios.get('index/count').then(res => {
                if(res.data.errno  === 0){
                    let data = res.data.data;
                    this.user_count = data.user_count;
                    this.order_count = data.order_num;
                    this.order_num_cur = data.month_order_num;
                    this.order_num_last = data.last_month_order_num;
                    this.cash_count = data.total_money;
                    this.adduser_cur = data.new_user;
                    this.adduser_last = data.last_new_user;
                    this.kedanshu_cur = data.month_kedan;
                    this.kedanshu_last = data.last_month_kedan;
                    this.add_kedanshu_cur = data.new_month_kedan;
                    this.add_kedanshu_last = data.last_new_month_kedan;
                }
            })
        }
    },
    mounted(){
        this.init();
    }
}
</script>
<style scoped>
    .content-main .card{
        text-align: center;
    }
    .content-main h5{
        line-height: 45px;
        font-size: 22px;
        color:mediumslateblue;
    }
    .order{
        margin-top: 8px;
    }
    .line-feed{
        margin-top: 18px;
    }
    h3{
        color: #8d8d8d;
    }
</style>
