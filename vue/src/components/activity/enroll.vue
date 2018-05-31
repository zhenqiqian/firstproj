<template>
	<div class="page activityEnroll">
		<van-nav-bar title="报名" left-text="返回" fixed left-arrow @click-left="back" />
		<div class="enroll" style="margin-top:56px">
			<van-notice-bar mode="closeable">说明：报名后如不能按时参加活动，您的诚信度将被降低！</van-notice-bar>
			<van-cell-group>
				<van-field v-model="paramsJson.SignName" label="姓名" placeholder="姓名" required />
				<van-field v-model="paramsJson.SignTel" type="password" label="手机号" placeholder="手机号" required />
				<van-field v-model="paramsJson.SignContent" label="附言" type="textarea" placeholder="附言" rows="2" autosize />
			</van-cell-group>
		</div>
		<van-submit-bar button-text="提交报名" @submit="onsubmit">
			<div class="jf">
		    	积分 / 扣除积分： <span>{{paramsJson.Integral}}</span>
			</div>
		</van-submit-bar>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				paramsJson: {
					ActiveID: this.$route.params.id,
					Integral:this.$route.params.Integral,
					SignName: "",
					SignTel: "",
					SignContent: ""
				},
			};
		},
		mounted: function() {},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			onsubmit() {
				if(this.paramsJson.SignName != "" && this.paramsJson.SignTel != "") {
					const toast1 = Toast.loading({
						mask: true,
						message: '提交中...'
					});
					this.$http.post(this.httpUrl + "/active/reg", this.paramsJson,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
						if(response.data.status!="timeout"){
							toast1.clear();
						console.log(response.data);
						if(response.data.status == "y") {
							Toast.success('报名成功');
							setTimeout(() => {
								this.back();
							}, 2000)
						}else{
							Toast(response.data.info);
						}
						}else{ window.location.href=this.httpUrl}
					}).catch(function(error) {
						console.log(error);
					})
				} else {
					Toast('姓名或手机号不能为空');
				}
			}
		}
	};
</script>

<style>
	.activityEnroll .van-nav-bar .van-nav-bar__text,.activityEnroll .van-nav-bar .van-icon {
		color: #fff;
	}
	
	.activityEnroll .enroll {
		margin: 10px;
		background: #FFFFFF;
	}
	.activityEnroll .jf{  font-size: 14px; color: #333; padding: 0 20px;}
	.activityEnroll .jf span{ font-size:22px;color: #f44; font-weight: bold;}
</style>