<template>
	<div class="page">
		<app-focus></app-focus>
		<app-notice></app-notice>
		<van-tabs v-model="tabActive" @click="onClick">
			<van-tab :title="'党建微课堂'"/>
			<van-tab :title="'优秀标杆'"/>
			<van-tab :title="'在线学习'"/>
		</van-tabs>
		<van-tabs v-model="tabActive1" type="tabtt" @click="onClick1" v-if="Category==5||Category==6||Category==7" style="margin-bottom: 10px;">
		  	<van-tab :title="'优秀班长'"/>
			<van-tab :title="'优秀文体骨干'"/>
			<van-tab :title="'优秀三长'"/>
		</van-tabs>
		<van-list v-model="loading" :finished="finished" @load="getList"  style="margin-bottom:69px">
			<van-cell v-for="item in list.Items" v-if="tabActive==0">
				<router-link  class="learnCell" :to="/LearnView/+item.NewsID" >
					<div class="pic"><img :src="item.attachmentPath" /></div>
					<h3>{{item.Title}}</h3>
					<p><span><van-icon name="clock" />{{item.CreateTime}}</span></p>
				</router-link>
			</van-cell>
			<div style="margin: 0 10px;" v-if="tabActive==1">
			<div v-for="item in list.Items" class="learnDiv">
				<router-link :to="/LearnView/+item.NewsID" >
					<div class="pic">
						<img :src="item.attachmentPath" />
					</div>
					<h3>{{tabActive1text}}事迹</h3>
					<p>{{item.Title}}</p>
				</router-link>
			</div>
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
				tabActive: 0,
				tabActive1:0,
				tabActive1text:"优秀班长",
				Category:4,
				list:{
					CurrentPage:0,
					ItemsPerPage:0,
					Items:[]
				},
				loading: false,
				finished: false
			};
		},
		components:{
			"app-focus":focus,
			"app-notice":notice,
			"app-tabbar":tabbar
		},
		mounted:function(){	
//			console.log(this.httpUrl);

		},
		methods: {
			getList(){
				this.$http.get(this.httpUrl+"/News/Index",{params:{Category:this.Category,page:this.list.CurrentPage+1}}).then((response) => {	
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
				this.Category=index==0?4:0||index==1?5:6||index==2?4:0;
				this.list.CurrentPage=0;
				this.list.TotalPages=0;
				this.tabActive1=0;
				this.list.Items=[];
				this.getList();
			},
			onClick1(index, title) {
				this.Category=5+index;
				this.tabActive1text=title;
				this.list.CurrentPage=0;
				this.list.TotalPages=0;
				this.list.Items=[];
				this.getList();
			}
		}
	};
</script>

<style>
.learnCell .pic{overflow: hidden;margin-right: 10px; float:left;}
.learnCell .pic img{width: 7rem;height:5rem;float: left;}
.learnCell h3{height: 3em;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;margin-bottom:0.5rem;line-height: 1.5em;font-size: 1rem;color: #333;}
.learnCell p span{ color: #999;margin-right: 15px; font-size: 12px;}
.learnCell p span .van-icon{ font-size: 12px;margin-right: 5px;display: inline-block;}

.learnDiv{ width: 50%;padding:10px; display: inline-block;box-sizing: border-box;}
.learnDiv a{  float: left;}
.learnDiv .pic{border-radius:5px;overflow: hidden;width: 100%;width: 100%; height:7rem; position: relative;border-radius:5px ;}
.learnDiv .bm{ height: 20px;line-height: 20px;position: absolute; width:80px;font-size:6px; color: #FFFFFF;background: #EE383D; text-align:center;transform:rotate(-45deg);top:10px;left:-20px;}
.learnDiv .hd{ height: 20px;line-height: 20px;position: absolute; width:80px;font-size:6px; color: #FFFFFF;background: #F09F33; text-align:center;transform:rotate(-45deg);top:10px;left:-20px;}
.learnDiv .pic img{ width: 100%; height:7rem; border-radius:5px;}
.learnDiv h3{height:1rem;line-height: 1rem;overflow: hidden;display: -webkit-box;-webkit-line-clamp:1;-webkit-box-orient: vertical;margin:0.7rem 0rem 0.5rem 0rem;font-size:1rem;color: #333;}
.learnDiv p{ color: #999;font-size: 12px;height:1.2rem;overflow: hidden;display: -webkit-box;-webkit-line-clamp:1;-webkit-box-orient: vertical}


.van-tabs--tabtt{margin: 20px 20px 0 20px;height: 30px;border-radius:15px; overflow:hidden;}
.van-tabs--tabtt .van-tab{height: 30px; line-height: 30px;background: #f4f4f4;}
.van-tabs--tabtt .van-tab--active{border-radius:15px;background:#EE383D; color: #fff; overflow: hidden;}
.van-tabs__nav{background:none;}

</style>