<template>
	<div class="page newsView">
		<div class="back" @click="back">
			<van-icon name="arrow-left" />
		</div>
		<div class="pic">
			<img :src="view.attachmentPath"/>
		</div>
		<div class="title">
			<h1>{{view.Title}}</h1>
			<p><span>{{view.CreateTime}}</span><span>{{view.Source}}</span></p>
		</div>
		<div class="content" v-html="view.Content">
			{{view.Content}}
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				view:{}
			};
		},
		mounted:function(){
			this.onLoad();
		},
		methods: {
			back(){
		        this.$router.go(-1);//返回上一层
		   	},
			onLoad() {
				this.$http.get(this.httpUrl+"/news/details",{params:{id:this.$route.params.id}}).then((response) => {	
				  	console.log(response.data);
				  	this.view=response.data;
				 }).catch(function (error){
				    console.log(error);
				  })
		}
		}
	};
</script>

<style>
.newsView .back{ position:fixed;left:20px;top:20px;width: 2rem;height: 2rem; background:rgba(232,232,232,.7); border-radius:1rem;}
.newsView .back i{margin: .5rem;}
.newsView .pic{ overflow: hidden;}
.newsView .pic img{ width: 100%;}
.newsView .title{padding:10px;}
.newsView .title h1{font-size: 1.25rem;line-height:1.7rem;font-family: PingFangSC-Semibold;font-weight: 400;color: #333;}
.newsView .title p{ color: #999;margin-top:5px;}
.newsView .title p span{ margin-right: 20px; font-size: 12px;}
.newsView .content{ width: 100%; overflow: hidden;padding: 20px;box-sizing:border-box;color: #666; line-height: 30px;background: #fff;}
.newsView .content img{ width: 90%; margin: 10px auto; text-align: center;}
.newsView .content .image-wrap{text-align: center;}
.newsView .content p{padding: 10px 0;}
</style>