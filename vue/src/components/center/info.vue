<template>
	<div class="page" v-cloak>
		<van-nav-bar title="我的资料" left-text="返回" fixed left-arrow @click-left="back" />
		<div class="userHeaderInfo" style="margin-top:46px">
			<img class="userHeaderInfo-img" :src="info.HeadImgUrl"/>
		</div>
		<van-cell-group style="margin-bottom:46px">
			<van-field v-model="info.NickName" label="昵称" placeholder="请输入昵称" />
			<van-field v-model="info.Name" label="姓名" placeholder="请输入姓名" />
			<div class="van-cell van-field van-hairline">
				<div class="van-cell__title"><span class="van-cell__text">性别</span></div>
				<div class="van-cell__value">
					<select class="van-field__control" v-model="info.Sex">
						<option value="">选择性别</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select>
				</div>
			</div>
			<van-field v-model="info.Birthday" label="出生年月" placeholder="请输入出生年月" />
			<van-field v-model="info.Tel" label="绑定手机" placeholder="请输入手机号" />
			<van-field v-model="info.IDCard" label="身份证号" placeholder="请输入身份证号" />
			<van-field v-model="info.UserAddress" label="收货地址" placeholder="请输入地址" />
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
					NickName:"",
					Name:"",
					Sex:"",
					Birthday:"",
					Tel:"",
					IDCard:"",
					UserAddress:""
				}

			}
		},
		mounted:function(){	
			Toast.loading({message: '加载中...',duration: 0});
			this.onLoad();
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			onLoad() {
				this.$http.get(this.httpUrl + "/user/edit").then((response) => {
					if(response.data.status==undefined){
						Toast.clear();
					this.info = response.data;
					}else{ window.location.href=this.httpUrl}
				}).catch(function(error) {
					console.log(error);
				})
			},
			onsubmit() {
				if(this.info.NickName != "" ) {
					const toast1 = Toast.loading({mask: true,message: '提交中...'});
					this.$http.post(this.httpUrl + "/user/editinfo",{NickName:this.info.NickName,Name:this.info.Name,Sex:this.info.Sex,Birthday:this.info.Birthday,Tel:this.info.Tel,IDCard:this.info.IDCard,UserAddress:this.info.UserAddress,UserID:this.info.UserID,OpenID:this.info.OpenID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
						if(response.data.status!="timeout"){
							toast1.clear();
						console.log(response.data);
						if(response.data.status == "y") {
							Toast.success('更新成功');
						}else{
							Toast(response.data.info);
						}
						}else{ window.location.href=this.httpUrl}
					}).catch(function(error) {
						console.log(error);
					})
				} else {
					Toast('昵称不能为空');
				}
			}
		}
	}
</script>

<style>
.userHeaderInfo{ padding:20px;overflow: hidden;background:#fff; text-align: center;}
.userHeaderInfo-img{ width: 80px; height: 80px; border-radius:40px;}
</style>