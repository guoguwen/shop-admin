<template>
    <div class="content-page">
        <div class="content-nav">
            <div class="breadcrumb">
                订单详情
            </div>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" size="small" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box" v-loading="pageLoading" element-loading-text="拼命加载中">
                <!--订单详情-->
                <el-steps :space="250" :active="step_active" finish-status="success">
                    <el-step :title="step_init[0]" :status="step_status[0]"></el-step>
                    <el-step :title="step_init[1]"></el-step>
                    <el-step :title="step_init[2]" :status="step_status[1]"></el-step>
                </el-steps>
                <el-row :gutter="18" class="order-attr">
                    <el-col :span="9">
                        <strong>订单编号：</strong><div class="bg-muted" v-text='order_info.order_sn'></div>
                    </el-col>
                    <el-col :span="9">
                        <strong>客户姓名：</strong><div class="bg-muted" v-text='order_info.consignee'></div>
                    </el-col>
                    <el-col :span="18" class="address">
                        <strong>客户地址：</strong><div class="bg-muted" v-text='order_info.province+order_info.city+order_info.district+order_info.address'></div>
                    </el-col>
                </el-row>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="goods_name" label="产品名称"></el-table-column>
                    <el-table-column prop="number" label="产品数量"></el-table-column>
                    <el-table-column prop="goods_specifition_name_value" label="所选规格"></el-table-column>
                    <el-table-column prop="retail_price" label="产品价格"></el-table-column>
                </el-table>
                <!--订单发货-->
                <div class="consignment" v-show="show[0]"> 
                    <el-select v-model="scode" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> 
                    <el-autocomplete class="inline-input" v-model="logistic_no" :fetch-suggestions="querySearch"
                    placeholder="请输入物流单号" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                    <el-button type="primary" @click='consignment()'>确认发货</el-button>
                </div>
                <!--查看物流-->
                <div class="loginc" v-show="show[1]">
                    <el-button type="primary" @click='look'>查看物流</el-button>
                    <el-steps :space="60" direction="vertical" center>
                        <el-step v-for='item in logistic' :key='item' :title="item.datetime" :description="item.content"></el-step>
                        <!--<el-step :title="步骤 2"></el-step>
                        <el-step title="步骤 3"></el-step>-->
                    </el-steps>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 订单流程：下单成功－》支付订单－》发货－》收货－》评论
    // 订单相关状态字段设计，采用单个字段表示全部的订单状态
    // 1xx表示订单取消和删除等状态 0订单创建成功等待付款，101订单已取消，102订单已删除
    // 2xx表示订单支付状态,201订单已付款，等待发货
    // 3xx表示订单物流相关状态,300订单已发货，301用户确认收货
    // 4xx表示订单退换货相关的状态,401没有发货，退款402,已收货，退款退货
    // 如果订单已经取消或是已完成，则可删除和再次购买
    export default {
        data() {
            return {
                pageLoading: false,
                infoForm: {
                    id: 0,
                },
                options: [],    //物流信息
                svalue:'',       //物流名称
                scode:'',       //物流代码
                tableData:[],   //订单产品
                logistic_no:'',  //物流编号
                restaurants: [], //添加带自动匹配的输入框
                order_info: {},
                step_init:['已下单','待付款','待发货'],
                step_active: 1,
                step_status: ['success','wait'],
                show:[true,false],
                logistic:[],
            }
        },
        methods: {
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
             loadAll() {
                return [
                    {'value': '888822425248519897'},
                    {'value': '484878828659'},
                    {'value': '485049489574'},
                    {'value': '888774083801935415'},
                    {'value': '457746852663'},
                    {'value': '3916159714539'}
                ];
            },
             handleSelect(item) {
                console.log(item);
            },
            goBackPage() {
                this.$router.go(-1);
            },
            getInfo() {
                // if (this.infoForm.id <= 0) {
                //     return false
                // }
                //加载订单详情
                this.axios.get('/order/info?id='+this.infoForm.id).then(res => {
                    this.order_info=res.data.data;
                    let order_status = this.order_info.order_status;
                    console.log(typeof(order_status));
                    let self=this;
                    switch(order_status){
                        case 0  : self.step_active=1;self.show[0]=false;break;  
                        case 101: self.step_active=0;self.step_status[0]='error';self.show[0]=false;self.step_init[0]='订单取消';break;
                        case 201: self.step_active=2;self.step_init[1]='已付款';break;
                        case 300: self.step_active=3;self.step_init[2]='待收货';self.show[0]=false;self.step_status[1]='process';break;
                        case 301: self.step_active=3;self.step_init[2]='交易完成';self.show[0]=false;self.step_status[1]='success';break;
                    }
                    this.tableData.push(res.data.data.goods);
                })
                //加载物流信息
                this.axios.get('https://dh.sty.sztcmdiet.com/admin/order/getshipper').then((response) => {
                    let shipper = response.data.data;
                    for(let item in shipper){
                        let option = {value: shipper[item].code,label: shipper[item].name};
                        this.options.push(option);
                    }
                })
            },
            consignment() {
                for(let item of this.options){
                    if(item.value == this.scode){
                        this.svalue = item.label;
                    }
                }
                let data={
                    order_id: this.infoForm.id,
                    shipper_name: this.svalue,
                    shipper_code: this.scode,
                    logistic_no: this.logistic_no,
                };
                this.axios.post('/order/consig',data).then(res => {
                    if(res.data.errno === 0){
                        this.$message({
                            type: 'success',
                            message: '发货成功'
                        })
                        this.getInfo();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.errmsg
                        })
                    }
                })
            }
        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
            this.restaurants=this.loadAll();
        }
    }

</script>

<style>
   .bg-muted{
       display:inline-block;
   }
   .order-attr{
       margin:25px 0;
   }
   .address{
       margin:25px 0;
   }
   .consignment{
       margin-top:20px;
   }
</style>
