<template>
	<div class="page">
		<app-focus></app-focus>
		<app-notice></app-notice>
		<van-tabs v-model="WechatStatus" @click="onClick">
			<van-tab :title="'全部活动'"/>
			<van-tab :title="'我的支部活动'"/>
			<van-tab :title="'其他支部活动'"/>
		</van-tabs>
		<van-tabs v-model="tabActive1" type="tabtt" @click="onClick1">
		  	<van-tab :title="'最新活动'"/>
			<van-tab :title="'预告活动'"/>
			<van-tab :title="'历史活动'"/>
		</van-tabs>
		<van-list v-model="loading" :finished="finished" @load="getList"  style="margin-bottom:69px;padding:10px;">
			<div class="activityList" v-for="item in list.Items">
				<router-link  class="activityCell" :to="/activityView/+item.ActiveID">
					<div class="pic"><img :src="item.attachmentPath" />
					<span v-if="item.ActivingState==1" class="bm">可报名</span>
					<span v-if="item.ActivingState==2" class="hd">活动中</span>
					</div>
					<h3>{{item.ActiveTitle}}</h3>
					<p>发布机构：{{item.RealseOrg}}</p>
					<p>人数限制：{{item.PersonNum}}</p>
				</router-link>
			</div>
			<div class="finished" v-if="finished">加载完毕</div>
		</van-list>
		<!--底部菜单-->
		<app-tabbar></app-tabbar>
	</div>
</template>

<script>
	import focus from '@/components/common/focus';
	import tabbar from '@/components/common/tabbar';
	import notice from '@/components/common/notice';
	export default {
		data() {
			return {
				tabActive1: 0,
				WechatStatus:0,
				SearchStatus:1,
				list:{
					CurrentPage:0,
					ItemsPerPage:0,
					Items:[]
				},
				loading: false,
				finished: false
			};
		},
		mounted:function(){	
//			console.log(this.httpUrl);

		},
		components:{
			"app-focus":focus,
			"app-notice":notice,
			"app-tabbar":tabbar
		},
		methods: {
			getList(){
				this.$http.get(this.httpUrl+"/active",{params:{SearchStatus:this.SearchStatus,WechatStatus:this.WechatStatus,page:this.list.CurrentPage+1}}).then((response) => {	
				if(response.data.status==undefined){
				  this.list.CurrentPage=response.data.CurrentPage;
				  this.list.TotalPages=response.data.TotalPages;
				  for (let i = 0; i < response.data.Items.length; i++) {
						this.list.Items.push(response.data.Items[i]);
        			}
				  this.loading = false;
				  if (this.list.CurrentPage >= this.list.TotalPages) {
			          this.finished = true;
				  }
				  }else{
					  window.location.href=this.httpUrl
					}
				 }).catch(function (error) {
				    console.log(error);
				  })
			},
			onClick(index, title) {
				this.WechatStatus=index;
				this.list.CurrentPage=0;
				this.list.TotalPages=0;
				this.tabActive1=0;
				this.SearchStatus=1;
				this.list.Items=[];
				this.getList();
			},
			onClick1(index, title) {
				this.SearchStatus=index+1;
				this.list.CurrentPage=0;
				this.list.TotalPages=0;
				this.list.Items=[];
				this.getList();
			}
		}
	};
</script>

<style>
.activityList{ width: 50%;padding:10px; display: inline-block;box-sizing: border-box;}
.activityList .pic{border-radius:5px;overflow: hidden;width: 100%;width: 100%; height:7rem; position: relative;}
.activityList .bm{ height: 20px;line-height: 20px;position: absolute; width:80px;font-size:0.5rem; color: #FFFFFF;background: #EE383D; text-align:center;transform:rotate(-45deg);top:10px;left:-20px;}
.activityList .hd{ height: 20px;line-height: 20px;position: absolute; width:80px;font-size:0.5rem; color: #FFFFFF;background: #F09F33; text-align:center;transform:rotate(-45deg);top:10px;left:-20px;}
.activityList .pic img{ width: 100%; height:7rem; border-radius:5px;}
.activityList h3{height:1rem;line-height: 1rem;overflow: hidden;display: -webkit-box;-webkit-line-clamp:1;-webkit-box-orient: vertical;margin:0.5rem 0 0.3rem 0;font-size:.8rem;color: #333;}
.activityList p{ color: #999;font-size: 12px;height:1.2rem}
.van-tabs--tabtt{margin: 20px 20px 0 20px;height: 30px;border-radius:15px; overflow:hidden;}
.van-tabs--tabtt .van-tab{height: 30px; line-height: 30px;background: #f4f4f4;}
.van-tabs--tabtt .van-tab--active{border-radius:15px;background:#EE383D; color: #fff; overflow: hidden;}
.van-tabs__nav{background:none;}
</style>