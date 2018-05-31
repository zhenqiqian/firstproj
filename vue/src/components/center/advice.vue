<template>
	<div class="page">
		<van-nav-bar title="建议留言" left-text="返回" fixed left-arrow @click-left="back" />
		<van-notice-bar mode="closeable" style="margin-top:46px">如对我们有什么意见和建议，请给我们留言</van-notice-bar>
		<van-cell-group style="margin-bottom:46px">
			<van-field v-model="info.LeaveMsgContent" label="留言" type="textarea" placeholder="请输入留言" rows="5" autosize />
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
					LeaveMsgContent:""
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
				if(this.info.advice != "" ) {
					const toast1 = Toast.loading({mask: true,message: '提交中...'});
					this.$http.post(this.httpUrl + "/LeaveMsg/Add",this.info,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
						if(response.data.status!="timeout"){
							toast1.clear();
						if(response.data.status == "y") {
							Toast.success('提交成功');
							this.back()
						}else{
							Toast(response.data.info);
						}
						}else{ window.location.href=this.httpUrl}
					}).catch(function(error) {
						console.log(error);
					})
				} else {
					Toast('留言内容不能为空');
				}
			}
		}
	}
</script>

<style>
.userHeaderInfo{ padding:20px;overflow: hidden;background:#fff; text-align: center;}
.userHeaderInfo-img{ width: 80px; height: 80px; border-radius:40px;}
</style>