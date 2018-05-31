<template>
	<div class="page">
		<van-nav-bar :title="title" left-text="返回" fixed left-arrow @click-left="back" />
		<van-notice-bar mode="closeable" style="margin-top:46px">您对本次活动满意吗？留下你对本次活动的评价</van-notice-bar>
		<van-cell-group style="margin-bottom:46px">
			<van-field v-model="info.EvaluateContent" label="评价" type="textarea" placeholder="请输入评价内容" rows="5" autosize />
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
				title:this.$route.params.title,
				info:{
					ActiveID:this.$route.params.id,
					EvaluateContent:""
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
					this.$http.post(this.httpUrl + "/active/EvaluateAdd ",this.info,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
						if(response.data.status!="timeout"){
							toast1.clear();
						console.log(response.data);
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
					Toast('评价内容不能为空');
				}
			}
		}
	}
</script>

<style>
.userHeaderInfo{ padding:20px;overflow: hidden;background:#fff; text-align: center;}
.userHeaderInfo-img{ width: 80px; height: 80px; border-radius:40px;}
</style>