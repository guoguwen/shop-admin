<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'skumanage' }">规格管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑商品' : '编辑商品'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品简介" prop="simple_desc">
            <el-input type="textarea" v-model="infoForm.simple_desc" :rows="3"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="展示价格">
            <el-input-number v-model="infoForm.price"  :min="0" :max="100000" label="商品价格"></el-input-number>元
          </el-form-item>
          <el-form-item label="是否团购">
            <el-switch v-model="is_pintuan" on-color="#13ce66" on-text="拼团" off-text="关闭">
            </el-switch>
          </el-form-item>
          <el-form-item v-show="is_pintuan" label="团购数量">
            <el-input-number  v-model="infoForm.group_buy_num"  :min="0" :max="100000" label="团购数量"></el-input-number>
          </el-form-item>
          <el-form-item v-show="is_pintuan && !having" label="拼团价">
            <el-input-number  v-model="infoForm.tuan_price"  :min="0" :max="100000" label="拼团价"></el-input-number>
          </el-form-item>
          <!-- 添加规格值 1-->
          <!-- <el-form-item label="规格名">
            <el-select v-model="specification[0]" placeholder="请选择规格">
              <el-option v-for="item in specifications" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
            <el-row>   
              <el-col :span=6>
                <div class="grid-content">
                  <el-input  v-show="spec.fi[1]" v-model="sku[0]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input  v-show="spec.fi[1]" v-model="sku[1]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input v-show="spec.fi[1]" v-model="sku[2]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">  
                  <el-button type="text" v-show="spec.fi[4]" @click="addSku">添加规格值</el-button>
                </div>    
              </el-col>
             </el-row>    
          </el-form-item> -->
          <!-- 2 -->
          <el-form-item label="">
            <el-select v-show="spec.se[0]" v-model="specification[1]" placeholder="请选择规格">
              <el-option v-for="item in specifications" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
            <el-row>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input v-show="spec.se[1]" v-model="sku1[0]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input v-show="spec.se[2]" v-model="sku1[1]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input v-show="spec.se[3]" v-model="sku1[2]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-button type="text" v-show="spec.se[4]" @click="addSku1">添加规格值</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 3-->
          <el-form-item label="规格名" v-show="spec.th[0]">
            <el-select v-model="specification[2]" placeholder="请选择规格">
              <el-option v-for="item in specifications" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
            <el-row>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input v-model="sku2[0]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input v-model="sku2[1]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-input v-model="sku2[2]" placeholder="请填写规格值"></el-input>
                </div>
              </el-col>
              <el-col :span=6>
                <div class="grid-content">
                  <el-button type="text" @click="addSku">添加规格值</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 添加规格 -->
          <!-- <el-button plain class="add-item" :disabled="disabled[3]" @click="additem()">添加规格项目</el-button>
          <el-button plain class="add-item" v-show="disabled[2]" @click="addTable()">完成添加</el-button> -->
          <!-- 规格明细 -->
          <el-form-item label="规格明细" v-show="having">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="sku1" :label="tabcol[0]"></el-table-column>
              <el-table-column prop="sku2" :label="tabcol[1]"></el-table-column>
              <el-table-column prop="retail_price" label="价格">
                <template  scope="scope"> <el-input v-model="scope.row.retail_price" placeholder="请输入价格"></el-input> </template>
              </el-table-column>
              <el-table-column prop="goods_number" label="库存">
                <template  scope="scope"> <el-input v-model="scope.row.goods_number" placeholder="请输入库存"></el-input> </template>
              </el-table-column>
              <el-table-column  prop="t_price" label="团购价">
                <template  scope="scope"> <el-input v-show="is_pintuan" v-model="scope.row.t_price" placeholder="请输入团购价"></el-input> </template>
              </el-table-column>
              <el-table-column prop="pic" label="图片">
                <template  scope="scope"> 
                  <el-input v-show="false" v-model="scope.row.pic" placeholder="请输入图片地址"></el-input> 
                  <el-upload class="upload-demo" action="https://dh.sty.sztcmdiet.com/admin/upload/upimg" name="img" :headers="uploaderHeader"
                    :on-success="handleUpload" :show-file-list="false"	>
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column prop="do" label="操作">
                <template scope="scope">
                  <el-button type="warning" size="small" @click="handelDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row :gutter="24" style="margin-top: 20px">
              <label for="">批量设置</label>
              <el-button type="text" v-show="!eprice" @click="setnum('price')">价格</el-button>
              <el-input class="btn-nomal" v-model="e_price" v-show="eprice"></el-input>
              <el-button type="primary" v-show="eprice" @click="savePrice">保存价格</el-button>
              <el-button type="text" v-show="!enumb" @click="setnum('enumb')">库存</el-button>
              <el-input class="btn-nomal" v-model="e_num" v-show="enumb"></el-input>
              <el-button type="primary" v-show="enumb" @click="saveNum">保存库存</el-button>
              <el-button type="text" v-show="!disabled[0]" @click="Save()">保存设置</el-button>  
            </el-row>
          </el-form-item>
          <el-form-item label="轮播图片" prop="pic_url">
            <el-upload action="https://dh.sty.sztcmdiet.com/admin/upload/upimg" name="img" :headers="uploaderHeader" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-success="handleUploadImageSuccess1"><i class="el-icon-plus"></i></el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%"  :src="dialogImageUrl" alt="">
                  </el-dialog>
          </el-form-item>
          <el-form-item label='列表展示图' prop="list_pic_url">
            <!-- <el-upload action="https://dh.sty.sztcmdiet.com/admin/upload/upimg" name="img" :headers="uploaderHeader" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-success="handleUploadImageSuccess"><i class="el-icon-plus"></i></el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%"  :src="dialogImageUrl" alt="">
                  </el-dialog> -->
                  <el-upload class="image-uploader" name="brand_pic"
                                   action="https://dh.sty.sztcmdiet.com/admin/upload/upimg" :show-file-list="false"
                                   :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
                            <img v-if="infoForm.list_pic_url" :src="infoForm.list_pic_url" class="image-show">
                            <i v-else class="el-icon-plus image-uploader-icon"></i>
                        </el-upload>
          </el-form-item>
          <el-form-item label="商品详情">
            <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"></quill-editor>
              <el-upload style="display:none" name="img" :headers="uploaderHeader"  :action="apiurl" :show-file-list="false" :before-upload='newEditorbeforeupload'  :on-success='newEditorSuccess'
                           ref="uniqueId" id="uniqueId"></el-upload >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">发布商品</el-button>
            <el-button @click="goBackPage">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/config/api';
 
  export default {
    data() {
      return {
        uploaderHeader: {
          'red13-token': localStorage.getItem('token') || '',
        },
        selectedOptions:[],
        specification:[],
        specifications:[],
        options:[],
        bands:[],
        having:true,
        tabcol:[],
        dynamicTags: ['新品', '膳食', '大健康'],
        inputVisible: false,
        inputValue: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled:[false,false,true,false],
        tableData:[],
        eprice:false,
        enumb:false,
        sku:[],
        sku1:[],
        sku2:[],
        sku_list:[],
        skuList:[],
        pro_list:[],
        picture:[],
        e_num:'',
        e_price:'',
        spec:{
          fi:[true,true,false,false,true],se:[false,false,false,false,false],th:[false,true,false,false]
          },
        is_pintuan:false,  
        infoForm: {
          id: 0,
          name: "",
          num : 1,
          list_pic_url: [],
          simple_desc: '',
          pic_url: [],
          group_buy_num:0,
          tuan_price:0,
          sort_order: 100,
          is_show: true,
          floor_price: 0,
          app_list_pic_url: '',
          is_new: false,
          new_pic_url: "",
          new_sort_order: 10
        },
        infoRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          simple_desc: [
            { required: true, message: '请输入简介', trigger: 'blur' },
          ],
          list_pic_url: [
            { required: true, message: '请选择商品图片', trigger: 'blur' },
          ],
        },
        content: '',
        editorOption: {
          // something config
        },
        apiurl:'https://dh.sty.sztcmdiet.com/admin/upload/upimg',
        addImgRange: {}
      }
    },
    methods: {
      goBackPage() {
        this.$router.go(-1);
      },
      handleChange() {
        console.log(this.selectedOptions);
      },
      handelDelete(index,row) {
        //数组删除操作
        this.$confirm('确定要删除该规格吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          let arrLength = this.tableData.length;
          for(let i in this.tableData){
            if(i>index){
              this.tableData[i-1] = this.tableData[i];
            }
          }
          this.tableData.pop(this.tableData[arrLength]);
        })
      },
      handleUpload(res,file){
         if (res.errno === 0) {
            this.picture.push(res.data.path);
            this.$message({
                  type: 'success',
                  message: '上传成功'
            });
        }
      },
      add(eve){
        console.log(eve);
      },
      Save(){
        this.disabled[0]= true;
        //pro_list
        this.pro_list=this.tableData;
      },
      addTable(){
        //sku_list
        if(this.specification[0] != ''){
          for(let j in this.specifications){
            if(this.specifications[j].label == this.specification[0]){
              let key = this.specifications[j].value;
              let temp = {}
              temp[key] = this.sku;
              this.sku_list.push(temp);
            }
          }
          this.tabcol.push(this.specification[0]);
        }
        if(this.specification[1] != ''){
          for(let i in this.specifications){
            if(this.specifications[i].label == this.specification[1]){
              let key = this.specifications[i].value;
              let temp = {}
              temp[key]=this.sku1;
              this.sku_list.push(temp);
            }
          }
          this.tabcol.push(this.specification[1]);
        }
        this.disabled[2]=false;
        let temp ={};
        //单规格or多规格
        if(this.sku1.length === 0){
          for(let i in this.sku){
            temp = {
              sku1 : this.sku[i]
            }
            this.tableData.push(temp);
          }
        }else{
          for(let i in this.sku){
            for(let j in this.sku1){
              temp={
                sku1 : this.sku[i],
                sku2 : this.sku1[j]
              }
              this.tableData.push(temp);
            }
          }
        }
        //tablecol 添加
      },
      setnum(e){
        if( e =='price'){
          this.eprice=true;
        }else{
          this.enumb=true;
        }
      },
      //批量设置库存
      saveNum(){
        this.enumb=false;
        for(let i in this.tableData){
            this.tableData[i].goods_number = this.e_num;
        }
      },
      //批量设置价格
      savePrice(){
        this.eprice=false;
        for(let i in this.tableData){
            this.tableData[i].retail_price = this.e_price;
        }
      },
      addSku() {
        if(this.spec.fi[2]){
          this.spec.fi[3]=true;
          this.spec.fi[4]=false;
        }else{
          this.spec.fi[2]=true;
        }
      },
      addSku1() {
        if(this.spec.se[2]){
          this.spec.se[3]=true;
          this.spec.se[4]=false;
        }else{
          this.tabcol.push(this.specification[1]);
          this.spec.se[2]=true;
        }
      },
      additem() {
        if(this.spec.se[0]){
          this.tabcol.push(this.specification[1]);
        }else{
          this.spec.se[0]=true;
          this.spec.se[1]=true;
          this.spec.se[4]=true;
          this.tabcol.push(this.specification[0]);
        }
        this.disabled[3]=true;
      },
      //商品分类
      getSorts() {
        this.axios.get('category').then(res => {
            let list = res.data.data;
            //必须先加载父元素再添加子元素，算法待优化
            for(let item in list){
              let parent = {};
              if(list[item].parent_id == 0){  
                parent = {
                      value : list[item].id,
                      label : list[item].name,
                      children : []
                  }
                this.options.push(parent);  
              }
            }
            //父元素内添加子元素
            for(let item in list){
              let child = {};
              if(list[item].parent_id != 0){  
                child = {
                      value : list[item].id,
                      label : list[item].name,
                  }
                for(let par in this.options){
                  if(this.options[par].value == list[item].parent_id){
                      this.options[par].children.push(child); 
                  }
                }     
              }
            }
            //创建下拉框成功
        })
      },
      //商品品牌
      getbands() {
        this.axios.get('brand').then(res => {
          if(res.data.errno === 0){
            let data = res.data.data;
            for(let item in data){
              let temp = {
                value : data[item].id,
                label : data[item].name
              }
              this.bands.push(temp);
            }
          }
        })
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
        this.inputVisible = false;
        this.inputValue = '';
      },
      //修改上架产品
      onSubmitInfo() {
        this.Save();
        for(let i in this.pro_list){
          this.pro_list[i]['pic']=this.picture[i];
        }
        let data = {
            id:this.infoForm.id,
            sku_list:this.skuList,
            pro_list:this.pro_list,
            name:this.infoForm.name,
            is_pintuan:this.is_pintuan ? 1 : 0,
            goods_number:10000,
            goods_brief:this.infoForm.simple_desc,
            goods_desc:this.content,
            retail_price:this.infoForm.price,
            pintuan_num:this.infoForm.group_buy_num,
            tuan_price:this.infoForm.tuan_price,
            list_pic_url:this.infoForm.list_pic_url,
            pic_list:this.infoForm.pic_url,
        }
        if(data.pic_list.length === 0){
          this.$message({
            type: 'error',
            message: '轮播图片不能为空，请上传图片后保存'
          })
          return 
        }
        console.log(data);
        this.axios.post('goods/addGoods',data).then(res => {
          if(res.data.errno === 0 ){
            this.$message({
                  type: 'success',
                  message: '修改商品成功'
            })
            this.$router.go(-1);
          }else{
            this.$message({
                  type: 'error',
                  message: '修改商品失败'
            })
          }
        })
      },
      handleUploadImageSuccess1(res, file) {
        if (res.errno === 0) {
            this.infoForm.pic_url.push(res.data.path);
        }
      },
      handleUploadImageSuccess(res, file) {
        if (res.errno === 0) {
            this.infoForm.list_pic_url = res.data.path;
            this.infoForm.list_pic_url.push(res.data.path);
        }
      },
      initSKU(){
        let tempArr=[];
        let tempSku=[];
        for(let i in this.sku_list){
          tempArr.push(this.sku_list[i].specification_id);
        }
        let colArr=tempArr.filter(function(e,i,s){
           return s.indexOf(e) == i; 
        });
        //动态表格title && sku_list
        for(let j in colArr){
          //表格
          for(let i in this.specifications){
            if(this.specifications[i].value == colArr[j]){
              this.tabcol.push(this.specifications[i].label);
            }
          }
          //sku_list
          let objArr=[];
          for(let s in this.sku_list){
            if(colArr[j] === this.sku_list[s].specification_id){
              objArr.push(this.sku_list[s].value);
            }
          }
          let obj={
            [colArr[j]]:objArr
          };
          this.skuList.push(obj);  
        }
      },
      getInfo() {
        if (this.infoForm.id <= 0) {
          return false
        }
        //规格遍历
        this.getSorts();
        //加载商品详情
        let that = this
        this.axios.get('goods/info', {
          params: {
            id: that.infoForm.id
          }
        }).then((response) => {
          let resInfo = response.data.data;
          this.sku_list = resInfo.sku_list;
          this.initSKU();
          this.pro_list = resInfo.pro_list;
          this.tableData = resInfo.pro_list;
          if(resInfo.pro_list.length <=1){
            this.having = false;
          }
          this.infoForm.name = resInfo.name;
          this.is_pintuan= resInfo.is_pintuan ==1 ? true : false;
          this.goods_number=10000;
          this.infoForm.simple_desc=resInfo.goods_brief;
          this.content=resInfo.goods_desc;
          this.infoForm.price=resInfo.retail_price;
          this.infoForm.tuan_price=resInfo.pro_list[0].tuan_price;
          this.infoForm.group_buy_num=resInfo.pintuan_num;
          let list_pic_url=[];
          for(let i in resInfo.pic_list){
            list_pic_url.push(resInfo.pic_list[i].img_url);
          }
          this.infoForm.list_pic_url=resInfo.primary_pic_url;
          this.infoForm.pic_url=list_pic_url;
        })
      },
      getspecification(){
        this.axios.get('goods/getspecList').then(res => {
            if(res.data.errno === 0){
                let data = res.data.data.spec_list;
                for(let i in data){
                  let obj = {
                    value : data[i].id,
                    label : data[i].name,
                  }
                  this.specifications.push(obj);
                }
            }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //富文本编辑器
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
      },
      newEditorbeforeupload(file){                       
              const isJPG = file.type === 'image/jpeg' ||file.type ===  'image/png';
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isJPG) {
                  this.$message.error('上传图片只能是 JPG或PNG 格式!');
              }
              if (!isLt2M) {
                  this.$message.error('上传图片大小不能超过 2MB!');
              }
          if(isJPG && isLt2M)this.imageLoading =true
                return isJPG && isLt2M;                                            
      },
      //上传图片回调 
      newEditorSuccess(response, file, fileList){
          if(response.errno===0){                        
              this.addImgRange = this.$refs.myTextEditor.quill.getSelection()
              this.$refs.myTextEditor.quill.insertEmbed(this.addImgRange != null?this.addImgRange.index:0, 'image',response.data.path)             
          }
      },
    },
    computed:{
      editor() {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    mounted() {
      this.infoForm.id = this.$route.query.id || 0;
      this.getInfo();   //若为修改状态加载商品详情
      this.getspecification(); //加载规格数组
      var imgHandler = async function(state) {
        if (state) {
          var fileInput =document.querySelector('#uniqueId input') //隐藏的file元素
          fileInput.click() //触发事件
        }
      }
      this.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler) 
    }
  }

</script>

<style>
  .image-uploader{
    height: 105px;
  }
  .image-uploader .el-upload {
    border: 1px solid #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .image-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 187px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader .image-show {
    width: 187px;
    height: 105px;
    display: block;
  }

  .image-uploader.new-image-uploader {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader.new-image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader.new-image-uploader .image-show {
    width: 165px;
    height: 105px;
    display: block;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
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
  .ql-container{
    height: 300px;
  }
  .add-item{
    margin-left: 120px;
  }
  .btn-nomal{
    width: 20%;
  }
</style>
