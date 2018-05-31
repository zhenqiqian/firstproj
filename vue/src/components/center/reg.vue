<template>
	<div class="page">
		<van-nav-bar title="用户绑定" left-text="返回" fixed left-arrow @click-left="back" />
		<van-cell-group style="margin-top:46px">
			<van-notice-bar mode="closeable">验证码由管理员统一发放</van-notice-bar>
			<van-field v-model="info.Tel" label="手机号" placeholder="请输入手机号" />
			<van-field v-model="info.ValidateCode" label="验证码" placeholder="请输入验证码" />
		</van-cell-group>
		<van-goods-action>
		  <van-goods-action-big-btn text="提交"  primary @click="onsubmit"/>
		</van-goods-action>
	</div>
</template>
<script>
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				info:{
					ValidateCode:"",
					Tel:""
				}

			}
		},
		mounted:function(){	

		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			onsubmit() {
				if(this.info.Tel!= ""&&this.info.ValidateCode!= "") {
					const toast1 = Toast.loading({mask: true,message: '提交中...'});
					this.$http.post(this.httpUrl + "/user/Buiding",{ValidateCode:this.info.ValidateCode,Tel:this.info.Tel},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
						if(response.data.status!="timeout"){
						toast1.clear();
						if(response.data.status == "y") {
							this.back();
							Toast.success('成功提交');
						}else{
							Toast(response.data.info);
						}
						}else{window.location.href=this.httpUrl}
					}).catch(function(error) {
						console.log(error);
					})
				} else {
					Toast('手机号或验证码不能为空');
				}
			}
		}
	}
</script>

<style>
.userHeaderInfo{ padding:20px;overflow: hidden;background:#fff; text-align: center;}
.userHeaderInfo-img{ width: 80px; height: 80px; border-radius:40px;}
</style>