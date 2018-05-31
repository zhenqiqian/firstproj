<template>
	<div class="page" v-cloak>
		<van-nav-bar title="我的党组织" left-text="返回" fixed left-arrow @click-left="back" />
		<van-cell-group style="margin-top:46px">
			<van-cell title="所属支部" :value="view.Branch" />
			<van-cell title="支部书记" :value="view.Secretary" />
		</van-cell-group>
	</div>
</template>
<script>
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				view:{
					Branch:"",
					Secretary:"",
				}
			};
		},
		mounted:function(){	
			Toast.loading({message: '加载中...',duration: 0});
			this.onLoad();
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			onLoad() {
				this.$http.get(this.httpUrl + "/PartyOrg/Mine").then((response) => {
					if(response.data.status==undefined){
						Toast.clear();
					this.view = response.data;
					}else{ window.location.href=this.httpUrl}
				}).catch(function(error) {
					console.log(error);
				})
			}
		}
	}
</script>

<style>

</style>