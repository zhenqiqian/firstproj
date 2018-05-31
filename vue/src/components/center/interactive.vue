<template>
	<div class="page interactiveMg">
		<van-nav-bar title="互动管理" left-text="返回" fixed left-arrow @click-left="back" />
		<div style="top: 40px;position: fixed; width: 100%; height: 30px;">
			<van-tabs v-model="tabActive" type="tabtt" @click="onClick">
				<van-tab :title="'主题'" />
				<van-tab :title="'回复'" />
			</van-tabs>
		</div>
		<van-list v-model="loading" :finished="finished" @load="getList" style="margin-top: 100px;">
			<div :id="item.InteractionID" class="interactiveList" v-for="item in list.Items">
				<div v-if="interactionState==1">
					<div class="t">
						<img :src="item.UserObj.HeadImgUrl" />
						<span class="name">{{item.UserObj.NickName}}</span>
						<span class="time">{{item.CreateTime}}</span>
					</div>
					<div class="c">
						<div v-if="item.AuthState!==1">
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
					<a class="btn" @click="del(item.InteractionID)">删除</a>
				</div>
				<div v-if="interactionState==2">
					<div class="t">
						<img :src="item.ParentObj.UserObj.HeadImgUrl" />
						<span class="name">{{item.ParentObj.UserObj.NickName}}</span>
						<span class="time">{{item.ParentObj.CreateTime}}</span>
					</div>
					<div class="c">
							{{item.ParentObj.InteractionContent}}
					</div>
					<ul class="re">
						<li>
							<span class="r">我</span>回复：{{item.InteractionContent}}
						</li>
					</ul>
					<a class="btn" @click="del(item.InteractionID)">删除</a>
				</div>
			</div>
			<div class="finished" v-if="finished">加载完毕</div>
		</van-list>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				interactionState: 1,
				tabActive: 0,
				loading: false,
				finished: false,
				list: {
					CurrentPage: 0,
					ItemsPerPage: 0,
					Items: []
				}

			}
		},
		mounted: function() {
			//			Toast.loading({message: '加载中...',duration: 0});
			//			this.onLoad();
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			getList() {
				this.$http.get(this.httpUrl + "/Interaction/MinePaste", {
					params: {
						interactionState: this.interactionState,
						page: this.list.CurrentPage + 1
					}
				}).then((response) => {
					if(response.data.status==undefined){
						this.list.CurrentPage = response.data.CurrentPage;
					this.list.TotalPages = response.data.TotalPages;
					for(let i = 0; i < response.data.Items.length; i++) {
						this.list.Items.push(response.data.Items[i]);
					}
					this.loading = false;
					if(this.list.CurrentPage >= this.list.TotalPages) {
						this.finished = true;
					}
					}else{ window.location.href=this.httpUrl}
				}).catch(function(error) {
					console.log(error);
				})
			},
			del(id){
				Dialog.confirm({
				  title: '删除',
				  message: '确认要删除吗？'
				}).then(() => {
				  				this.$http.post(this.httpUrl + "/Interaction/Delete",{InteractionID:id},{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response) => {
					if(response.data.status == "y") {
							this.onClick(this.tabActive);
							Toast('删除成功');
						}else{
							Toast(response.data.info);
						}
				}).catch(function(error) {
						console.log(error);
					})
				}).catch(() => {
				  // on cancel
				});

			},
			onClick(index, title) {
				//				this.finished = false;
				this.interactionState = index == 0 ? 1 : 0 || index == 1 ? 2 : 0 || index == 2 ? 3 : 0;
				this.list.CurrentPage = 0;
				this.list.TotalPages = 0;
				this.list.Items = []
				this.getList();
			}
		}
	}
</script>

<style>
	.van-tabs--tabtt {
		margin: 20px 20px 0 20px;
		height: 30px;
		border-radius: 15px;
		overflow: hidden;
		background: #f4f4f4;
	}
	
	.van-tabs--tabtt .van-tab {
		height: 30px;
		line-height: 30px;
		background: #f4f4f4;
	}
	
	.van-tabs--tabtt .van-tab--active {
		border-radius: 15px;
		background: #EE383D;
		color: #fff;
		overflow: hidden;
	}
	
	.van-tabs__nav {
		background: none;
	}
	
	.interactiveList {
		background: #FFFFFF;
		margin: 10px;
		border-radius: 5px;
		padding: 5px;
		border: solid 1px #eee;
		overflow: hidden;
	}
	
	.interactiveList .t {
		padding: 5px 10px;
		overflow: hidden;
		line-height: 30px;
	}
	
	.interactiveList .t img {
		width: 30px;
		height: 30px;
		float: left;
		margin-right: 10px;
		border-radius: 15px;
	}
	
	.interactiveList .t .name {
		float: left;
		color: #F09F33;
		font-size: 14px;
	}
	
	.interactiveList .t .time {
		float: right;
		font-size: 12px;
		color: #999;
	}
	
	.interactiveList .c {
		padding: 5px 10px;
		color: #666;
		font-size: 12px;
		line-height: 22px;
	}
	
	.interactiveList .c .no {
		color: #EE3333
	}
	
	.interactiveList .re {
		padding: 5px 10px;
		background: #f4f4f4;
		margin: 5px;
	}
	
	.interactiveList .re li {
		font-size: 12px;
		color: #666;
		line-height: 20px;
		margin: 5px 0;
	}
	
	.interactiveList .re li span {
		color: #F09F33;
		margin: 0 5px;
	}
	.interactiveList .btn{background:#EE383D; color: #FFFFFF; height: 22px; line-height: 22px; padding: 0 10px; font-size: 12px; display: inline-block;border-radius:3px; margin:5px; float: right;}
</style>