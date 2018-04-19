<template>
	<div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>店铺运营</el-breadcrumb-item>
				<el-breadcrumb-item>优惠券信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content-main">
			<el-form :model="formAlignRight" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="formAlignRight.name" class="name"></el-input>
                </el-form-item>
                <el-form-item label="面额">
                    <el-input-number v-model="formAlignRight.cash" :min="1" :max="10000"></el-input-number>
                </el-form-item>
                <el-form-item label="领取">
                    <el-radio class="radio" v-model="formAlignRight.type" label="1">无门槛</el-radio>
                    <el-radio class="radio" v-model="formAlignRight.type" label="2">满<el-input size="small" class="form-input"></el-input>可用</el-radio>
                </el-form-item>
                <el-form-item label="限领">
                    <el-select v-model="formAlignRight.type">
                        <option value="不限张" label="不限张"></option>
                        <option value="1张" label="1张"></option>
                        <option value="2张" label="2张"></option>
                        <option value="3张" label="3张"></option>
                        <option value="4张" label="4张"></option>
                        <option value="5张" label="5张"></option>
                    </el-select>
                </el-form-item>
                <el-form-item label="领取">
                    <el-select v-model="formAlignRight.type">
                        <option value="所有用户"></option>
                        <option value="新用户" label="新用户"></option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有效期">
                    领券当日起<el-input v-model="formAlignRight.type" class="form-input"></el-input>天有效
                </el-form-item>
                <el-form-item label="领取">
                    <el-radio class="radio" v-model="formAlignRight.type" label="1">到期前5天提醒一次</el-radio>
                    <el-radio class="radio" v-model="formAlignRight.type" label="2">到期前5天每天提醒一次</el-radio>
                </el-form-item>
                <el-form-item label="商品">
                    <el-radio class="radio" v-model="formAlignRight.type" label="1">全部商品</el-radio>
                    <el-radio class="radio" v-model="formAlignRight.type" label="2">指定商品</el-radio>
                </el-form-item>
            </el-form>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			formAlignRight:{
                name:'',
                cash:'',
                type:''
            }
		}
	},
	methods: {
		
	},
	components: {

	},
	mounted() {
		
	}
}

</script>

<style scoped>
.name{
    width: 15%;
}
.form-input{
    width: 50px;
}
</style>
