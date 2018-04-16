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
                    用户总数<h5>0</h5>
                </el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">店铺总数<h5>0</h5></el-card>
            </el-col>  
            <el-col :span="6" class="card">
                <el-card shadow="never">累计订单数<h5>0</h5></el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">累计交易额<h5>0</h5></el-card>
            </el-col>  
        </el-row>
    </div>
    <div class="content-main order">
        <el-row :gutter="24">
            <el-col :span="6">
                <el-card shadow="never" class="card">
                    订单数（本月）<h5>0</h5>
                </el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">订单数（上月）<h5>0</h5></el-card>
            </el-col>  
            <el-col :span="6" class="card">
                <el-card shadow="never">新增用户数（本月）<h5>0</h5></el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">新增用户数（本月）<h5>0</h5></el-card>
            </el-col> 
        </el-row>
        <el-row :gutter="24" class="line-feed">
            <el-col :span="6">
                <el-card shadow="never" class="card">
                    客单数（本月）<h5>0</h5>
                </el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">客单数（上月）<h5>0</h5></el-card>
            </el-col>  
            <el-col :span="6" class="card">
                <el-card shadow="never">新增客单数（本月）<h5>0</h5></el-card>
            </el-col>
            <el-col :span="6" class="card">
                <el-card shadow="never">新增客单数（上月）<h5>0</h5></el-card>
            </el-col>  
        </el-row>      
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {

        }
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
