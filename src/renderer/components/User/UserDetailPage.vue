<template>
  <div class="detail">
      <el-row :gutter="24">
          <el-col :span="8">
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span v-text="name">卡片名称</span>
                </div>
                <img :src="head" alt="用户头像" class="head">
                <p>姓   名：<span v-text="name"></span></p>
                <p>手   机：<span v-text="phone"></span></p>
                <p>健 康 币：<span v-text="coin"></span></p>
                <p>注册时间：<span v-text="reg_time"></span></p>
                <p>消费时间：<span v-text="take_time"></span></p>
            </el-card>
          </el-col>
          <el-col :span="16" >
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span >用户情况</span>
                </div>
                <el-col :span="12" class="user-cons">
                    <el-card shadow="never"> 累计消费金额(元)<h3>0</h3></el-card>
                </el-col>
                <el-col :span="12" class="user-cons">
                    <el-card shadow="never"> 累计消费笔数(笔)<h3>0</h3></el-card>
                </el-col>  
            </el-card>
          </el-col>    
      </el-row>
      <el-row :gutter="24" class="data-detail">
        <el-tabs type="border-card">
            <el-tab-pane label="消费订单">消费订单</el-tab-pane>
            <el-tab-pane label="优惠券">优惠券</el-tab-pane>
            <el-tab-pane label="收货地址">收货地址</el-tab-pane>
        </el-tabs>
      </el-row>    
  </div>
</template>
<script>
import moment from 'moment'
export default {
    data(){
        return{
            id:'',
            name:'',
            phone:'',
            coin:'0',
            reg_time:'',
            take_time:'',
            head:'',
        }
    },
    methods:{
        getdetail(){
            this.axios.get('user/info?id='+this.id).then(res => {
                if(res.data.errno === 0){
                    let data = res.data.data;
                    this.head = data.avatar;
                    this.name = data.nickname;
                    this.phone = data.mobile;
                    this.reg_time = moment.unix(data.register_time).format("YYYY-MM-DD HH:mm:ss");
                }
            })
        }
    },
    mounted() {
        this.id = this.$route.query.id || 0;
        this.getdetail();
    }
}
</script>
<style scoped>
.user-cons{
    margin-bottom: 100px;
}
.head{
    width: 55px;
    height: 55px;
    border-radius: 100%;
}
.data-detail{
    margin-top: 50px;
}
</style>
