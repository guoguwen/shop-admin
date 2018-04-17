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
                      订单数<h5 v-text="order_num">0</h5>
                  </el-card>
              </el-col>
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">新增用户<h5 v-text="new_user">0</h5></el-card>
              </el-col>  
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">客单数<h5 v-text="kedanshu">0</h5></el-card>
              </el-col>
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">平均客单价<h5 v-text="avgshu">0</h5></el-card>
              </el-col>
              <el-col :span="4" :offset="1" class="card">
                  <el-card shadow="never">交易额<h5 v-text="price">0</h5></el-card>
              </el-col>  
          </el-row>  
      </div>
      <h3 class="to-dobusiness">待办事项</h3>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card shadow="never" class="card">
            待发货<h5 v-text="raw_send">0</h5>  
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
        dialogVisible: false,
        order_num:'',
        new_user:'',
        price:'',
        raw_send:'',
        kedanshu:'',
        avgshu:''
      }
    },
    methods:{
      init(){
        this.axios.get('index/home').then(res => {
          if(res.data.errno === 0){
              let data = res.data.data;
              this.order_num = data.order_num;
              this.new_user= data.new_user,
              this.price= data.price,
              this.raw_send= data.raw_send,
              this.kedanshu= data.kedanshu,
              this.avgshu= data.avgshu.toFixed(2);
          }
        })
      }
    },
    components: {
      
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
    .to-dobusiness{
      margin: 50px 0;
    }
</style>
