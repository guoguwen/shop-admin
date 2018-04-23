<template>
  <div class="detail">
      <el-row :gutter="24">
          <el-col :span="8">
            <el-card shadow="never" class="card">
                <div slot="header" class="clearfix">
                    <span v-text="name">卡片名称</span>
                </div>
                <img :src="head" alt="用户头像" class="head">
                <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  名：<span v-text="name"></span></p>
                <p>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   机：<span v-text="phone"></span></p>
                <p>健  康  币：<span v-text="coin"></span></p>
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
                    <el-card shadow="never" class="count-card"> 累计消费金额(元)<h3 v-text="amount">0</h3></el-card>
                </el-col>
                <el-col :span="12" class="user-cons">
                    <el-card shadow="never" class="count-card"> 累计消费笔数(笔)<h3 v-text="count">0</h3></el-card>
                </el-col>  
            </el-card>
          </el-col>    
      </el-row>
      <el-row :gutter="24" class="data-detail">
        <el-tabs type="border-card">
            <el-tab-pane label="消费订单">
                <egrid class="egrid" stripe border :data="tableData" :columns="columns" :columns-handler="columnsHandler" 
                >
                </egrid>
                <div class="page-box">
                    <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="优惠券">优惠券</el-tab-pane>
            <el-tab-pane label="收货地址">
                <transition name="el-zoom-in-top">
                    <egrid class="egrid" stripe border :data="address" :columns="column">
                    </egrid>
                </transition>    
            </el-tab-pane>
        </el-tabs>
      </el-row>    
  </div>
</template>
<script>
import moment,{ calendarFormat } from 'moment'
var Btn = {
  template: `<el-button @click="todo" plain size="small" type="info">查看</el-button>`,
  props: ['row'],
  methods: {
    todo () {
      this.$emit('row-editor', this.row)
      this.$set(this.row, '_edit', !this.row._edit)
      this.$router.push({ name: 'order_detail', query: { id: this.row.id } })
    }
  }
}
export default {
    data(){
        return{
            page: 1,
            total: 0,
            id:'',
            name:'',
            phone:'',
            coin:'0',
            reg_time:'',
            take_time:'',
            head:'',
            count:0,
            amount:0,
            tableData:[],
            columns:[
                {label:'订单号',prop:'order_sn'},
                {label:'订单金额',prop:'actual_price'},
                {label:'下单时间',prop:'add_time'},
                {label:'支付方式',prop:'pay_type'},
                {label:'姓名',prop:'consignee'},
                {label:'订单状态',prop:'order_status'},
            ],
            address:[],
            column: [
                {label:'姓名',prop:'name'},
                {label:'手机号码',prop:'phone'},
                {label:'默认',prop:'is_default'},
                {label:'省份',prop:'province'},
                {label:'城市',prop:'city'},
                {label:'区/县',prop:'district'},
                {label:'地址',prop:'address'},
            ]
        }
    },
    methods:{
        handlePageChange(val) {
            this.page = val;
            //保存到localStorage
            // localStorage.setItem('orderPage', this.page)
            // localStorage.setItem('orderFilterForm', JSON.stringify(this.filterForm));
            this.init();
        },
        columnsHandler (cols) {
            return cols.concat({
                label: '操作',
                align: 'left',
                component: Btn,
                // listeners 可用于监听自定义组件内部 $emit 出的事件
                listeners: {
                    'row-edit' (row) {
                        console.log('row-edit', row)
                    }
                }
            })
        },
        getdetail(){
            this.axios.get('user/info?id='+this.id).then(res => {
                if(res.data.errno === 0){
                    let data = res.data.data;
                    this.head = data.avatar;
                    this.name = data.nickname;
                    this.phone = data.mobile;
                    this.reg_time = moment.unix(data.register_time).format("YYYY-MM-DD HH:mm:ss");
                    this.coin = data.health_coin;
                    this.count = data.count;
                    this.amount = data.amount;
                    this.address = data.address;
                }
            })
        },
        init() {
            this.axios.get('user/order',{
                params: {
                    user_id: this.id,
					page: this.page,
                    }
			}).then(res => {
                if(res.data.errno === 0){
                    this.tableData = res.data.data.data;
                    for(let i in this.tableData){
                        this.tableData[i].pay_type = '微信支付';
                        this.tableData[i].add_time = moment.unix(this.tableData[i].add_time).format("YYYY-MM-DD HH:mm:ss");
                        switch(this.tableData[i].order_status){
                            case 0  :this.tableData[i].order_status = '待付款';break;
                            case 101:this.tableData[i].order_status = '取消订单';break;
                            case 102:this.tableData[i].order_status = '删除订单';break;
                            case 200:this.tableData[i].order_status = '拼团中';break;
                            case 201:this.tableData[i].order_status = '待发货';break;
                            case 300:this.tableData[i].order_status = '待收货';break;
                            case 301:this.tableData[i].order_status = '待评价';break;
                            case 302:this.tableData[i].order_status = '交易完成';break;
                            case 401:this.tableData[i].order_status = '退款完成';break;
                            case 402:this.tableData[i].order_status = '退款退货';break;
                        }
                    }
                    this.page = res.data.data.currentPage;
                    this.total = res.data.data.count;
                }
            })
        }
    },
    mounted() {
        this.id = this.$route.query.id || 0;
        this.getdetail();
        this.init();
    }
}
</script>
<style scoped>
.clearfix{
    text-align: center;
}
.user-cons{
    margin-bottom: 100px;
}
.card p{
    margin-left: 10%;
    color: #4d4d4d;
}
.count-card{
    text-align: center;
}
.count-card h3{
    margin-top: 15px;
}
.head{
    width: 55px;
    height: 55px;
    border-radius: 100%;
    margin-left: 35%;
    margin-bottom: 12px;
}
.data-detail{
    margin-top: 50px;
}
</style>
