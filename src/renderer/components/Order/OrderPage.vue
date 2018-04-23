<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单中心</el-breadcrumb-item>
                <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!--<div class="operation-nav">
                <router-link to="/dashboard/order/add">
                    <el-button type="primary" disabled="disabled" icon="plus">添加订单</el-button>
                </router-link>
            </div>-->
        </div>
        <div class="content-main">
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item label="订单号">
                        <el-input v-model="filterForm.order_sn" placeholder="请输入订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <el-input v-model="filterForm.consignee" placeholder="请输入收货人"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态">
                      <el-select v-model="filterForm.status" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitFilter">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="订单号" width="100">
                    </el-table-column>
                    <el-table-column prop="order_sn" label="订单标识">
                    </el-table-column>
                    <el-table-column prop="add_time" :formatter="timeFormat" label="下单时间">
                    </el-table-column>
                    <el-table-column prop="consignee" label="收货人">
                    </el-table-column>
                    <el-table-column prop="actual_price" label="订单金额">
                    </el-table-column>
                    <el-table-column prop="order_status_text" label="订单状态">
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                        <template scope="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">查看</el-button>
                            <!-- <el-button style="disaply:none" size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first">
                <Table :data="tableData" :columns="columns"></Table>
              </el-tab-pane>
              <el-tab-pane label="待付款" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="拼团中" name="third">角色管理</el-tab-pane>
              <el-tab-pane label="待发货" name="fourth">定时任务补偿</el-tab-pane>
              <el-tab-pane label="待收货" name="fifth">配置管理</el-tab-pane>
              <el-tab-pane label="待评价" name="sixth">角色管理</el-tab-pane>
              <el-tab-pane label="完成" name="seventh">定时任务补偿</el-tab-pane>
            </el-tabs> -->
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Table from '../Common/Table'
  export default {
    data() {
      return {
        page: 1,
        total: 0,
        options:[
          {
            value: '1',
            label: '全部'
          },
          {
            value: '0',
            label: '待付款'
          },
          {
            value: '200',
            label: '拼团中'
          },
          {
            value: '201',
            label: '待发货'
          },
          {
            value: '300',
            label: '待收货'
          },
          {
            value: '301',
            label: '待评价'
          },
          {
            value: '302',
            label: '完成'
          },
        ],
        filterForm: {
          name  : '',
          status: '1',
        },
        tableData: [],
        columns: [
        { prop: "title", label: "标题" },
        { prop: "create_name", label: "发布人" },
        { prop: "item_name", label: "栏目" },
        { prop: "create_time", label: "创建时间" },
        { prop: "weight", label: "权重" },
        {
          prop: "isoriginal",
          label: "原创",
          render: function(h, param) {
            let html = "";
            if (param.row.isoriginal == "201") {
              html = "原创";
            } else {
              html = "非原创";
            }
            return html;
          }
        },
        {
          prop: "",
          label: "操作",
          render: (h, param) => {
            const dropDownData = {
              label: "操作",
              items: [
                { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                { label: "删除", func: { func: "del", uuid: param.row.uuid } }
              ]
      }
          }}
        ]
      }
    },
    methods: {
      handlePageChange(val) {
        this.page = val;
        //保存到localStorage
        localStorage.setItem('orderPage', this.page)
        localStorage.setItem('orderFilterForm', JSON.stringify(this.filterForm));
        this.getList()
      },
      handleRowEdit(index, row) {
        this.$router.push({ name: 'order_detail', query: { id: row.id } })
      },
      handleRowDelete(index, row) {

        this.$confirm('确定要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('order/destory', { id: row.id }).then((response) => {
            console.log(response.data)
            if (response.data.errno === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList();
            }
          })
        });
      },
      onSubmitFilter() {
        this.page = 1
        this.getList()
      },
      timeFormat(row, column){
        var date = row[column.property]; 
        if (date == undefined) {  
          return "";  
        }  
        return moment.unix(date*1000).format("YYYY-MM-DD HH:mm:ss");   
		  },
      getList() {
        this.axios.get('order', {
          params: {
            page: this.page,
            orderSn: this.filterForm.order_sn,
            consignee: this.filterForm.consignee,
            order_status: this.filterForm.status,
          }
        }).then((response) => {
          this.tableData = response.data.data.data
          this.page = response.data.data.currentPage
          this.total = response.data.data.count
        })
      }
    },
    components: {
      Table
    },
    mounted() {
      this.getList();
    }
  }

</script>

<style scoped>
   
</style>
