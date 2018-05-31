<template>
	<div class="page interactive">
		<app-focus></app-focus>
		<app-notice></app-notice>
		<van-tabs v-model="tabActive" @click="onClick">
			<van-tab :title="'谈天说地'"/>
			<van-tab :title="'学习心得'"/>
			<van-tab :title="'原创美文'"/>
		</van-tabs>
		<van-list v-model="loading" :finished="finished" @load="getList"  style="margin-bottom: 99px;">
			<div :id="item.InteractionID" class="interactiveList" v-for="item in list.Items">
				<div class="t">
					<img :src="item.UserObj.HeadImgUrl"/>
					<span class="name">{{item.UserObj.NickName}}</span>
					<span class="time">{{item.CreateTime}}</span>
				</div>
				<div class="c">
					<div v-if="item.AuthState!=1">
						{{item.InteractionContent}}
					</div>
					<div v-if="item.AuthState==1" class="no">
						 ( 内容正在审核中 )
					</div>
				</div>
				<ul class="re" v-if="item.Childrens!=''&&item.AuthState!=1">
					<li v-for="itemRe in item.Childrens">
						 <span class="r">{{itemRe.UserObj.NickName}}</span>回复：{{itemRe.InteractionContent}}
					</li>
				</ul>
				<a v-if="item.AuthState!=1" class="btn" @click="reply(item.InteractionID)">回复</a>
			</div>
			<div class="finished" v-if="finished">加载完毕</div>
		</van-list>
		<van-popup v-model="showPo" position="bottom">
		  	<div class="reply">
		  		<input v-model="replyContent" type="text" value="" placeholder="回复内容"/>
		  		<van-button slot="button" size="small" type="danger" @click="replyPost">提交</van-button>
		  	</div>
		</van-popup>
		<van-popup v-model="theme" position="bottom">
			<div class="theme">
			<div class="tit">
				发布新主题
				<van-button slot="button" size="small" type="danger" @click="replyPost">提交</van-button>
			</div>
		  	<div class="c">
		  		<textarea v-model="replyContent" placeholder="主题内容" rows="5"></textarea>
		  	</div>
		  	</div>
		</van-popup>
		<div id="fabu">
			<van-icon name="add" @click="themeBtn"/>
		</div>
		<!--底部菜单-->
		<app-tabbar></app-tabbar>
	</div>
</template>

<script>
	import focus from '@/components/common/focus';
	import tabbar from '@/components/common/tabbar';
	import notice from '@/components/common/notice';
	import { Toast } from 'vant';
	export default {
		data() {
			return { 
				theme:false,
				showPo: false,
				replyContent:"",
				InteractionID:"",
				tabActive: 0,
				InteractionType:1,
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
			reply(id){
				this.showPo=true;
				this.InteractionID=id;
				this.replyContent="";
			},
			themeBtn(id){
				this.theme=true;
				this.replyContent="";
				this.InteractionID="";
			},
			replyPost(){
				this.$http.post(this.httpUrl + "/Interaction/Add",{InteractionContent:this.replyContent,InteractionType:this.InteractionType,ParentID:this.InteractionID},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
					if(response.data.status!="timeout"){
							this.list.CurrentPage=this.list.CurrentPage-1
							this.onClick(this.tabActive);
							this.showPo=false;
							this.theme=false;
							Toast('提交成功');
					}else{ window.location.href=this.httpUrl}
				}).catch(function(error) {
						console.log(error);
					})
			},
			getList(){
				this.$http.get(this.httpUrl+"/Interaction/Index",{params:{InteractionType:this.InteractionType,page:this.list.CurrentPage+1}}).then((response) => {	
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
				this.InteractionType=index==0?1:0||index==1?2:0||index==2?3:0;
				this.list.CurrentPage=0;
				this.list.TotalPages=0;
				this.list.Items=[]
				this.getList();
			}
		}
	};
</script>

<style>
.interactiveList{ background: #FFFFFF; margin: 10px; border-radius:5px ; padding: 5px; border: solid 1px #eee; overflow: hidden;}
.interactiveList .t{padding: 5px 10px; overflow: hidden; line-height: 30px;}
.interactiveList .t img{ width: 30px;height: 30px; float: left;margin-right:10px;border-radius:15px;}
.interactiveList .t .name{ float: left; color:#F09F33; font-size: 14px;}
.interactiveList .t .time{ float: right; font-size:12px; color: #999;}
.interactiveList .c{ padding: 5px 10px; color: #666; font-size: 12px; line-height: 22px;}
.interactiveList .c .no{ color:#EE3333}
.interactiveList .re{ padding: 5px 10px; background: #f4f4f4; margin: 5px;}
.interactiveList .re li{ font-size: 12px; color: #666; line-height: 20px;margin: 5px 0;}
.interactiveList .re li span{ color: #F09F33;margin: 0 5px;}
.interactiveList .btn{background:#EE383D; color: #FFFFFF; height: 22px; line-height: 22px; padding: 0 10px; font-size: 12px; display: inline-block;border-radius:3px; margin:5px; float: right;}
.interactive .reply{height: 40px;padding: 5px; position: relative;}
.interactive .reply input{ line-height:30px; padding: 5px 70px 5px 5px;box-sizing: border-box; width: 100%;}
.interactive .reply button{ position: absolute;right:10px;top:10px}
.interactive #fabu{ position: fixed;bottom: 60px;left:50%;z-index: 9; color:#EE383D;margin-left: -20px;}
.interactive #fabu .van-icon{ font-size:40px;}
.interactive .theme .tit{ line-height: 40px; text-align: center; font-size: 16px; color: #EE383D;}
.interactive .theme .tit button{ float: right; margin: 5px;}
.interactive .theme .c{padding:5px 10px;}
.interactive .theme textarea{ border:solid 1px #EEEEEE; width: 100%; padding: 10px; line-height: 20px; font-size: 14px; box-sizing: border-box;}
</style>