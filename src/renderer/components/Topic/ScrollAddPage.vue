<template>
    <div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>店铺运营</el-breadcrumb-item>
				<el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="operation-nav">
				<router-link to="/dashboard/operate/scroll">
					<el-button type="primary" icon="">返回页面</el-button>
				</router-link>
			</div>
		</div>
		<div class="content-main">
			<div class="form-table-box">
                <el-form v-model="form" label-width="120px">
                    <el-form-item label="序号">
                        <el-input class="form-input" v-model="form.number"></el-input>   
                    </el-form-item> 
                    <el-form-item label="标题">
                        <el-input class="form-input" v-model="form.name"></el-input>   
                    </el-form-item>
                    <el-form-item label="图片">
                        <el-upload class="image-uploader new-image-uploader" name="brand_new_pic"
                                   action="https://dh.sty.sztcmdiet.com/admin/upload/upimg" :show-file-list="false"
                                   :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
                            <img v-if="form.image_url" :src="form.image_url" class="image-show">
                            <i v-else class="el-icon-plus image-uploader-icon"></i>
                        </el-upload>
                        <div class="form-tip">图片尺寸：375*252</div>   
                    </el-form-item>
                    <el-form-item label="跳转">
                        <template>    
                            <el-radio-group class="group-radio" v-model="form.media_type">
                                <el-radio :label="2">Url&nbsp;&nbsp;</el-radio><el-input class="radio-input" v-model="link" v-show="form.media_type == '2' ? true : false"></el-input><br>
                                <el-radio :label="1">商品&nbsp;&nbsp;</el-radio><el-button v-show="form.media_type == '1' ? true : false" type='info' @click="dialogTableVisible = true">选择商品</el-button>   
                            </el-radio-group>
                        </template>
                    </el-form-item> 
                </el-form>
                <el-table :data="choseData" v-show="form.media_type == '1' ? true : false">
                    <el-table-column property="primary_pic_url" label="" width="200">
                        <template scope="scope">
                            <img :src="scope.row.primary_pic_url" class="table-pic" alt="图片">
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="商品"></el-table-column>
                    <el-table-column property="" label="删除">
                         <template scope="scope">
                            <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="foot"><el-button class="btn" type="info" size="large" @click="save">保存</el-button></div> 
			</div>
		</div>

        <el-dialog title="选择商品" :visible.sync="dialogTableVisible">
            <el-input v-model="name" class="form-input"></el-input><el-button @click="init">搜索</el-button>
            <el-table :data="tableData">
                <el-table-column property="id" label="选择" width="150">
                    <template scope="scope">
                        <el-radio v-model="choseId" :label="scope.row.id"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column property="primary_pic_url" label="" width="200">
                     <template scope="scope">
                        <img :src="scope.row.primary_pic_url" class="table-pic" alt="图片">
                    </template>
                </el-table-column>
                <el-table-column property="name" label="商品"></el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <div class="foot"><el-button class="btn" size="large" @click="handelChose">选取</el-button></div>
        </el-dialog>
	</div>
</template>
<script>
export default {
    data () {
        return {
            link:'',
            name:'',
            choseId:'',
            page: 1,
            total: 0,
            choseData:[],
            uploaderHeader: {
                'red13-token': localStorage.getItem('token') || '',
            },
            id : 0,
            form:{
                number:0,
                name: '',
                image_url:'',
                media_type : '1' , //1跳转商品 2跳转url 
                link:''
                },
                dialogTableVisible: false
            }
    },
    methods:{
        init(){
            this.axios.get('goods', {
                params: {
                    page: this.page,
                    name: this.name
                }
                }).then((response) => {
                    this.tableData = response.data.data.data
                    this.page = response.data.data.currentPage
                    this.total = response.data.data.count
            })
            if(this.id > 0){
                this.axios.get('banner/BannerList?id='+this.id).then(res => {
                    if(res.data.errno === 0 ){
                        let data = res.data.data.list;
                        this.form.number = data[0].number;
                        this.form.name = data[0].name;
                        this.form.image_url = data[0].image_url;
                        this.form.media_type = data[0].media_type; 
                    }
                })
            }
        },
        handleUploadImageSuccess(res, file) {
            if (res.errno === 0) {
                this.form.image_url = res.data.path;
            }
        },
        handelChose(){
            let self = this;
            this.choseData = this.tableData.filter(function(e){
                return e.id == self.choseId;
            })
            this.dialogTableVisible = false;
        },
        save(){
            let data={
                id: this.id<=0 ? '' : this.id,
                number: this.form.number,
                name: this.form.name,
                image_url: this.form.image_url,
                media_type: this.form.media_type,
                link: this.choseId,
            }
            if(this.form.media_type == '2'){
                data.link = this.link; 
            }
            this.axios.post('banner/addBanner',data).then(res => {
                if(res.data.errno ===0 ){
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    });
                    this.$router.go(-1)
                }
            })
        },
        handleRowDelete(index,row){
           this.choseData = [];
        }
    },
    mounted(){
        this.id = this.$route.query.id || 0;
        this.init();
    }
}
</script>
<style scoped>
.table-pic{
    width: 100%;
    margin: 10px 0;
}
.foot{
    width: 100%;
}
.btn{
    margin-left: 50%;
}
.group-radio{
    width: 100%;
}
.radio-input{
    width: 70%;
}
.form-input{
    display: inline-block;
    width: 60%;
}
.image-uploader{
    height: 105px;
    margin-top: 30px;
    border: 1px solid #8d8d8d;
}
.image-uploader .el-upload {
    border: 1px solid #8d8d8d;
    cursor: pointer;
    position: relative;
    /* margin-left: 20px; */
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
</style>
