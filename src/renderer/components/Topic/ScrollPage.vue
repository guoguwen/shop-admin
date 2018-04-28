<template>
    <div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>店铺运营</el-breadcrumb-item>
				<el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="operation-nav">
				<router-link to="/dashboard/operate/scroll/add">
					<el-button type="primary" icon="plus">添加轮播图</el-button>
				</router-link>
			</div>
		</div>
		<div class="content-main">
			<div class="form-table-box">
				<el-table :data="data" style="width: 100%">
                    <el-table-column prop="number" label="排序"></el-table-column>
                    <el-table-column prop="name" label="标题"></el-table-column>
                    <el-table-column prop="image_url" label="图片">
                        <template scope="scope">
                            <img :src="scope.row.image_url"  class="table-pic" alt="图片">
                        </template>
                    </el-table-column>
                    <el-table-column prop="link !='' ? link : '未设置'" label="跳转"></el-table-column>
                    <el-table-column prop="btn" label="编辑">
                        <template scope="scope">
                            <el-button type="text" @click="done('edit',scope.row.id)">编辑</el-button>   
                        </template>    
                    </el-table-column>
                    <el-table-column prop="btn" label="删除">
                        <template scope="scope">
                            <el-button type="text" @click="done('delete',scope.row.id)">删除</el-button>   
                        </template>   
                    </el-table-column>
                </el-table>  
			</div>
			<!-- <div class="page-box">
				<el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div> -->
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      total: 0,
      data: [
        {
          order: 1,
          title: "s",
          pic: "ddd",
          turn: "url",
          edit: "ds",
          delete: "sha"
        }
      ],
    };
  },
  methods: {
    columnsHandler(cols) {
      return cols.concat({});
    },
    handlePageChange() {},
    done(type,id){
        if(type === 'edit'){
            this.$router.push({name: 'scroll_add',query:{id : id}});
        }else{
            this.$confirm('确定要删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
                let self = this;
                this.axios.post('banner/delBanner',{id : id}).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.init();
                })
            })
        }
    },
    init(){
        this.axios.get('banner/BannerList').then(res => {
            if(res.data.errno === 0 ){
                this.data = res.data.data.list;
            }
        })
    },
    myfetch(option) {
        let url = option.url;
        let method = option.method;
        let headers = option.headers || {};
        return new Promise(resolve => {
            fetch(url, {
                method: method,
                headers: headers
            })
            .then(r => {
                resolve(r.json());
            });
        });
    }
  },
  mounted() {
    // let _this = this;
    // (async () => {
    //   let option = {
    //     url: "https://dh.sty.sztcmdiet.com/admin/banner/BannerList",
    //     method: "get",
    //     headers: { "red13-token": localStorage.getItem("token") }
    //   };
    //   let res = await _this.myfetch(option);
    //   this.data = res.data.list;
    // })();
    this.init();
  }
};
</script>
<style scoped>
    .table-pic{
        margin-top : 10px; 
        width: 100%;
    }
</style>
