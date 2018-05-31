<template>
	<div class="page">
		<div class="userHeader">
			<img class="userHeader-img" :src="info.HeadImgUrl"/>
			<div class="userHeader-text">
				<p class="userHeader-text-name">{{info.NickName}}</p>
				<p class="userHeader-text-info" v-if="info.UserType==2">绑定号码：号码未绑定</p>
				<p class="userHeader-text-info" v-if="info.UserType==1">绑定号码：{{info.Tel}}</p>
			</div>
			<div class="sm">
				<img src="/static/images/sm.png" width="36" @click="scanQRCode"/>
				<span>扫码签到</span>
			</div>
		</div>
		<div class="userHeader-bottom">
			<van-row>
	  <van-col span="12">用户类型：<span>{{info.UserTypeView}}</span></van-col>
	  <van-col span="12">积分: <span>{{info.IntegralVal}}</span></van-col>
				</van-row>
		</div>
		<van-cell-group>
		  <van-cell title="我的活动" icon="pending-deliver" is-link to="/centerActivity"/>
		  <van-cell title="我的党组织" icon="pending-payment" is-link to="/centerOrg"/>
		  <van-cell title="我的资料" icon="contact" is-link to="/centerInfo"/>
		  <van-cell title="我的积分" icon="cash-back-record" is-link />
		  <van-cell title="问卷调查" icon="completed" is-link />
		  <van-cell title="建议留言" icon="records" is-link to="/centerAdvice"/>
		  <van-cell title="互动" icon="pending-evaluate" is-link to="/centerInteractive"/>
		  <van-cell title="用户绑定" icon="location" is-link to="/centerReg" v-if="info.UserType==2||info.UserType==1&&info.UserState==1"/>
		</van-cell-group>
		<!--底部菜单-->
		<app-tabbar></app-tabbar>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import tabbar from '@/components/common/tabbar';
	export default {
		data() {
			return {
				info:{}
			}
		},
		components: {
			"app-tabbar": tabbar
		},
		mounted: function() {
//			Toast.loading({
//				message: '加载中...',
//				duration: 0
//			});
			this.onLoad();
			//微信SDK config
			this.$http.post(this.httpUrl + "/BA/GetWeChatSDK",{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
			wx.config({
			      debug: false,
			      appId: response.data.AppId,
			      timestamp: response.data.Timestamp,
			      nonceStr: response.data.NonceStr,
			      signature: response.data.Signature,
			      jsApiList: [
			        'scanQRCode'
			      ]
			  });
			  }).catch(function(error) {
					console.log(error);
				})  
		},
		methods: {
			onLoad() {
				this.$http.get(this.httpUrl + "/User/Center").then((response) => {
					if(response.data.status==undefined){
						Toast.clear();
						this.info = response.data;
					}else{ window.location.href=this.httpUrl}
				}).catch(function(error) {
					console.log(error);
				})
			},
			scanQRCode(){
				const _this=this
				wx.scanQRCode({
			      needResult: 1,
			      desc: 'scanQRCode desc',
			      success: function (res) {
			      	_this.$http.post(res.resultStr,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
						  if(response.data.status!="timeout"){
							  Toast(response.data.info)
						  }else{ window.location.href=this.httpUrl}
					}).catch(function(error) {
							console.log(error);
					})          
			      }
			    })
			}
		}
	}
</script>

<style>
/*个人中心*/
.userHeader{ padding:20px;overflow: hidden;background:radial-gradient(200%100%at bottom center,#f09f33,#ee383d);}
.userHeader .sm{ position: absolute;top:25px; right:20px; text-align: center; width: 50px;}
.userHeader .sm span{ display: block; font-size: 10px; color: #FFFFFF;}
.userHeader-bottom{ background: #fff;border-bottom: solid 1px #e5e5e5; height: 40px;margin-bottom: 10px;}
.userHeader-bottom .van-col{ text-align: center; line-height: 40px; color: #999; font-size: 14px;}
.userHeader-bottom .van-col:first-child{border-right:solid 1px #eee; }
.userHeader-bottom .van-col span{ color: #F53711}
.userHeader-img{ width: 60px; height: 60px; border-radius:40px; float: left;}
.userHeader-text{ margin-left: 10px; float: left;padding: 5px;}
.userHeader-text-name{ font-size: 20px; line-height:30px; font-weight: normal;color: #fff;}
.userHeader-text-info{ font-size: 14px;line-height:20px;color: #eee;}
</style>
