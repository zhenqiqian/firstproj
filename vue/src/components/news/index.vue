<template>
	<div class="page">
		<app-focus></app-focus>
		<app-notice></app-notice>
		<van-tabs v-model="tabActive" @click="onClick">
			<van-tab :title="'新闻动态'"/>
			<van-tab :title="'基层动态'"/>
			<van-tab :title="'党务公开'"/>
		</van-tabs>
		<van-list v-model="loading" :finished="finished" @load="getList"  style="margin-bottom: 49px;">
			<van-cell v-for="item in list.Items">
				<router-link  class="newsCell" :to="/newsView/+item.NewsID">
					<div class="pic"><img :src="item.attachmentPath" /></div>
					<h3>{{item.Title}}</h3>
					<p><span>{{item.Source}}</span><span><van-icon name="clock" />{{item.CreateTime}}</span></p>
				</router-link>
			</van-cell>
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
				tabActive: 0,
				Category:1,
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
				this.$http.get(this.httpUrl+"/news",{params:{Category:this.Category,page:this.list.CurrentPage+1}}).then((response) => {	
				  this.list.CurrentPage=response.data.CurrentPage;
				  this.list.TotalPages=response.data.TotalPages;
				  for (let i = 0; i < response.data.Items.length; i++) {
						this.list.Items.push(response.data.Items[i]);
        			}
				  this.loading = false;
				  if (this.list.CurrentPage >= this.list.TotalPages) {
			          this.finished = true;
			      }
				 }).catch(function (error) {
				    console.log(error);
				  })
			},
			onClick(index, title) {
//				this.finished = false;
				this.Category=index==0?1:0||index==1?2:0||index==2?3:0;
				this.list.CurrentPage=0;
				this.list.TotalPages=0;
				this.list.Items=[]
				this.getList();
			}
		}
	};
</script>

<style>
.newsCell{}
.newsCell .pic{overflow: hidden;margin-right: 10px; float: left;}
.newsCell .pic img{width: 7rem;height:5rem;float: left;}
.newsCell h3{height: 3em;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;margin-bottom:0.5rem;    line-height: 1.5em;font-size: 1rem;color: #333;}
.newsCell p span{ color: #999;margin-right: 15px; font-size: 12px;}
.newsCell p span .van-icon{ font-size: 12px;margin-right: 5px;display: inline-block;}
</style>