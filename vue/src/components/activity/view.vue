<template>
	<div class="page activityView" v-if="view.ActiveTitle">
		<div class="back" @click="back">
			<van-icon name="arrow-left" />
		</div>
		<div class="pic">
			<img :src="view.attachmentPath"/>
		</div>
		<div class="title">
			<h1>{{view.ActiveTitle}}</h1>
			<p><span>发布机构：{{view.RealseOrg}}</span></p>
		</div>
		<div class="tableBox">
			<table>
				<tr><th>活动类型：</th><td>{{view.ActiveTypeView}}</td></tr>
				<tr><th>活动方式：</th><td>{{view.ActiveMethodView}}</td></tr>
				<tr><th>报名时间：</th><td>开始：{{view.RegStartTime}}<br>结束：{{view.RegEndTime}}</td></tr>
				<tr><th>活动时间：</th><td>开始：{{view.ActiveStartTime}}<br>结束：{{view.ActiveEndTime}}</td></tr>
				<tr><th>活动地址：</th><td>{{view.ActiveAddress}}</td></tr>
				<tr><th>人数限制：</th><td>{{view.PersonNum}}</td></tr>
				<tr><th>积分奖励：</th><td><div class="b">{{view.Integral}}</div></td></tr>
			</table>
		</div>
		<h3 class="title_h3">活动详情：</h3>
		<div class="content" v-html="view.ActiveContent">
			{{view.ActiveContent}}
		</div>
		<van-goods-action>
		  <van-goods-action-mini-btn icon="wap-home" text="首页" to="/news" />
		  <van-goods-action-mini-btn icon="share" text="分享"  />
		  <van-goods-action-big-btn v-if="view.ActivingState==3" text="期待您的参与"/>
		  <van-goods-action-big-btn v-if="view.ActivingState==2" text="活动正在进行中"/>
		  <van-goods-action-big-btn v-if="view.ActivingState==5" text="报名结束"/>
		  <van-goods-action-big-btn v-if="view.ActivingState==4" text="查看评价" @click="reviewLink"/>
		  <van-goods-action-big-btn v-if="view.ActivingState==1" text="参与活动"  primary @click="enrollLink"/>
		</van-goods-action>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
	data() {
		return {
			view: {}
		};
	},
	mounted: function() {
		this.onLoad();
	},
	methods: {
		back() {
			this.$router.go(-1); //返回上一层
		},
		onLoad() {
			Toast.loading({message: '加载中...',duration: 0});
			this.$http.get(this.httpUrl + "/active/details", {
				params: {
					id: this.$route.params.id
				}
			}).then((response) => {
				if(response.data.status==undefined){
					Toast.clear();
					this.view = response.data;
				}else{ window.location.href=this.httpUrl}
			}).catch(function(error) {
				console.log(error);
			})
		},
		reviewLink() {
			this.$router.push({
				name: 'activityReview',
				params: {
					id: this.$route.params.id
				}
			});
		},
		enrollLink() {
			this.$router.push({
				name: 'activityEnroll',
				params: {
					id: this.$route.params.id,
					Integral:this.view.Integral
				}
			});
		}
	}
};
</script>

<style>
.activityView .b{ font-size:20px; font-weight: bold; color: #f60;}
.activityView .tableBox{background: #fff;padding: 20px}
.activityView .tableBox table{ background: #f4f4f4; width: 100%; border-collapse:collapse}
.activityView .tableBox table td{border: solid 1px #eee;line-height:25px; font-size: 12px; color: #666; padding: 5px 10px;}
.activityView .tableBox table th{border: solid 1px #eee; font-size:14px; color: #333; width:100px;}
.activityView .back{ position:fixed;left:20px;top:20px;width: 2rem;height: 2rem; background:rgba(232,232,232,.7); border-radius:1rem;}
.activityView .back i{margin: .5rem;}
.activityView .pic{ overflow: hidden;}
.activityView .pic img{ width: 100%;}
.activityView .title{padding:10px;}
.activityView .title h1{font-size: 1.25rem;line-height:1.7rem;font-family: PingFangSC-Semibold;font-weight: 400;color: #333;}
.activityView .title p{ color: #999;margin-top:5px;}
.activityView .title p span{ margin-right: 20px; font-size: 12px;}
.activityView .content{ width: 100%; overflow: hidden;padding: 20px;box-sizing:border-box;color: #666; line-height: 30px;background: #fff; margin-bottom: 49px;}
.activityView .content img{ width:90%; margin: 10px auto; text-align: center;}
.activityView .content p{padding: 10px 0;}
.activityView .content .image-wrap{text-align: center;}
.activityView .title_h3{ font-size:16px; line-height: 20px;margin:0 20px; background: #fff; border-left:solid 3px #EE383D ; padding: 0 10px;}
</style>