<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'skumanage' }">规格管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加规格</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>    
        <div class="content-main">
            <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
               ></el-input><!-- @blur="handleInputConfirm"-->
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加规格</el-button>
            <el-row>
                <el-col :span='24'>
                    <el-table :data="tableData" class="table" border>
                        <el-table-column prop="name" label="规格名称"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  size="small" type="warning" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                                <!-- <el-button v-show="Save" size="small" type="info" @click="handleRowSave(scope.$index,scope.row)">保存</el-button> -->
                                <el-button size="small" disabled type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
                            </template>        
                        </el-table-column>  
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="规格修改" :visible.sync="Save" width="30%" center>
        <label for="sname">规格名称：</label><el-input width="25%" name="sname" type="text" v-model="edObj.name"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="Save = false">取 消</el-button>
            <el-button type="primary" @click="handleRowSave">保存</el-button>
        </span>
        </el-dialog>
    </div>    
</template>
<script>
export default {
  data() {
    return{
        dynamicTags:[],
        inputVisible: false,
        inputValue: '',
        infoForm:{
          id:'',
        },
        tableData:[],
        Save:false,
        edObj:{
            id: 0,
            name :''
        }
    }
  },
  methods: {
    goBackPage() {
        this.$router.go(-1);
    },
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
            this.dynamicTags.push(inputValue);
        }
        this.axios.post('goods/addspec',{name:inputValue}).then(res => {
            if(res.data.errno === 0){
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                this.getspecification();
                //window.location.reload(); 
            }
        })
        this.inputVisible = false;
        this.inputValue = '';
    },
    handleRowEdit(index, row) {
        console.log(index, row);
        this.Save = true;
        this.edObj = {
            id : row.id,
            name : row.name
        }
    },
    handleRowSave() {
        this.axios.post('goods/addspec',{id:this.edObj.id,name:this.edObj.name}).then(res => {
            if(res.data.errno === 0){
                this.Save =false;
                this.getspecification();
            }
        })
    },
    handleRowDelete(index, row) {
        console.log(index, row);
    },
    getspecification(){
        this.axios.get('goods/getspecList').then(res => {
            if(res.data.errno === 0){
                this.tableData = res.data.data.spec_list;
                // for(let i in this.tableData){
                //     this.dynamicTags.push(this.tableData[i].name);
                // }
            }
        })
    },
    editSpecfication(){

    },
    deleteSpecfication(){

    }
  },
  mounted() {
    this.infoForm.id = this.$route.query.id || 0;
    this.getspecification();
  }
}
</script>
<style scoped>
  .el-table .cell{
      text-align: center;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-input, .el-input__inner{
      width: 60%;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .table{
      width: 100%;
      text-align: center;
  }
</style>

