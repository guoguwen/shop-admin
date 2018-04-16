<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">后台主页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <h3>今日概况</h3>
      <div class="content-main current">
          <el-row :gutter="24" class="line-feed">
              <el-col :span="4">
                  <el-card shadow="never" class="card">
                      订单数<h5>0</h5>
                  </el-card>
              </el-col>
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">新增用户<h5>0</h5></el-card>
              </el-col>  
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">客单数<h5>0</h5></el-card>
              </el-col>
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">平均客单价<h5>0</h5></el-card>
              </el-col>
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">交易额<h5>0</h5></el-card>
              </el-col>  
          </el-row>  
      </div>
      <h3 class="to-dobusiness">待办事项</h3>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card shadow="never" class="card">
            待发货<h5>0</h5>  
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never" class="card">
            待审核（提现）<h5>0</h5>  
          </el-card>
        </el-col>    
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    components: {
      
    },
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
    .to-dobusiness{
      margin: 50px 0;
    }
</style>
