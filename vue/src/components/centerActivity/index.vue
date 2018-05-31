<template>
	<div class="page centerActivity">
		<van-nav-bar title="我的活动申请" left-text="返回" fixed left-arrow @click-left="back" />
		<van-tabs v-model="tabActive" @click="onClick">
			<van-tab :title="'已申请'"/>
			<van-tab :title="'审核通过'"/>
			<van-tab :title="'活动中'"/>
			<van-tab :title="'已结束'"/>
			<van-tab :title="'待评价'"/>
		</van-tabs>
		<van-list v-model="loading" :finished="finished" @load="getList" style="margin-top:46px; padding-top: 10px;">
				<div class="centerActivityLi" v-for="item in list.Items">
					<div class="t">
						<span class="jg">{{item.RealseOrg}}</span>
						<span class="state">{{item.Integral}}分</span>
					</div>
					<router-link  class="centerActivityCell" :to="/activityView/+item.ActiveID">
						<div class="pic"><img :src="item.attachmentPath" /></div>
						<h3>{{item.ActiveTitle}}</h3>
						<p>活动开始时间：{{item.ActiveStartTime}}</p>
						<p>活动结束时间：{{item.ActiveEndTime}}</p>
					</router-link>
					<div class="b">
						<span class="jf"><van-icon name="location" />{{item.ActiveAddress}}</span><a v-if="myActiveState==5" class="btn" :href="'/centerActivityEvaluation/'+item.ActiveID+'/'+item.ActiveTitle">评价</a>
						<span class="pj" v-if="item.IsEvaluate">已评价</span>
					</div>
				</div>
				<div class="finished" v-if="finished">加载完毕</div>
		</van-list>
	</div>
</template>

<script>
	export default {
		data() {
			return { 
				tabActive: 0,
				myActiveState:1,
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
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			getList(){
				this.$http.get(this.httpUrl+"/active/Mine",{params:{myActiveState:this.myActiveState,page:this.list.CurrentPage+1}}).then((response) => {	
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
				}else{ window.location.href=this.httpUrl}
				 }).catch(function (error) {
				    console.log(error);
				  })
			},
			onClick(index, title) {
//				this.finished = false;
				this.myActiveState=index+1;
				this.list.CurrentPage=0;
				this.list.TotalPages=0;
				this.list.Items=[]
				this.getList();
			}
		}
	};
</script>

<style>
.centerActivity .van-tabs__wrap{position: fixed;top:46px;}
.centerActivityCell{ background: #F4F4F4; overflow: hidden; padding: 10px; display: block;}
.centerActivityCell .pic{overflow: hidden;margin-right: 10px; float: left;}
.centerActivityCell .pic img{width: 6rem;height:5rem;float: left;}
.centerActivityCell h3{height:1.5em;overflow: hidden;display: -webkit-box;-webkit-line-clamp:1;-webkit-box-orient: vertical;line-height: 1.5em;font-size: 1rem;color: #333;margin-bottom: 0.2rem;}
.centerActivityCell p{ color: #999;margin-right: 15px; line-height: 24px;}
.centerActivityCell p span .van-icon{ font-size: 12px;margin-right: 5px;display: inline-block;}
.centerActivityLi{ background: #FFFFFF;border-bottom: solid 1px #ddd; font-size: 12px; overflow: hidden;margin-bottom: 10px;}
.centerActivityLi .t{ line-height: 40px;height: 40px; border-bottom: solid 1px #EEEEEE; padding: 0 10px; color: #333;}
.centerActivityLi .t .state{ float: right; color: #F09F33;font-size: 14px; }
.centerActivityLi .b{padding:5px 10px; overflow: hidden;line-height:26px}
.centerActivityLi .b a.btn{ padding:0 20px;display: inline-block;line-height:26px; border: solid 1px #EE383D; color: #EE383D; background: #fff; border-radius:13px ; float:right;}
.centerActivityLi .b span.jf{ float: left; color: #999;}
.centerActivityLi .b .van-icon{ font-size: 14px; float: left;margin:6px 5px 0 0;}
.centerActivityLi .b span.pj{ float: right; color: #F09F33;}
</style>