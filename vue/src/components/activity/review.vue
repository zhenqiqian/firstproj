<template>
	<div class="page activityReview">
		<van-nav-bar title="评价" left-text="返回" fixed left-arrow @click-left="back"/>
		<van-list v-model="loading" :finished="finished" @load="getList"  style="margin-top:46px">
			<van-cell v-for="item in list.Items">
				<div class="ReviewCell">
					<div class="t">
						<img :src="item.CName"/>
						<span class="name">{{item.CName}}</span>
						<span class="timedate">{{item.CreateTime}}</span>
					</div>
					<div class="c">
						{{item.EvaluateContent}}
					</div>
				</div>
			</van-cell>
			<div class="finished" v-if="finished">加载完毕</div>
		</van-list>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
			
		},
		methods: {
			getList(){
				this.$http.get(this.httpUrl+"/active/evaluate",{params:{id:this.$route.params.id,page:this.list.CurrentPage+1}}).then((response) => {	
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
			back(){
		        this.$router.go(-1);//返回上一层
		   	}
		}
	};
</script>

<style>
.activityReview{}
.activityReview .van-cell{ background: #fff; margin-bottom:10px; overflow: hidden;}
.activityReview .ReviewCell .t{ line-height: 40px; overflow: hidden;}
.activityReview .ReviewCell .t img{ width: 30px; height: 30px; float: left; border-radius:15px; margin: 5px 0;}
.activityReview .ReviewCell .t .name{ float: left;padding-left: 10px; font-size: 14px; color:#EE383D;}
.activityReview .ReviewCell .t .timedate{ float: right; color: #999; font-size: 10px;}
.activityReview .ReviewCell .c{ line-height: 20px; color: #333;padding: 5px 0;}
</style>