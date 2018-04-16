<template>
    <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column
                v-for="(column, index) in columns"
                :prop="column.prop"
                :key="index"
                :label="column.label">
                <template slot-scope="scope">
                    <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
                    <span v-else>
                    {{scope.row[column.prop]}}
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-box">
            <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: Array,
            columns: Array,
             page: 1,
            total: 0,
            filterForm: {
            name: ''
            },
            tableData: []
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
          }
        }).then((response) => {
          this.tableData = response.data.data.data
          this.page = response.data.data.currentPage
          this.total = response.data.data.count
        })
      }
    }
}
</script>
<style scoped>

</style>
