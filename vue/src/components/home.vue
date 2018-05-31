<template>
	<div class="home">
		<router-link class="b1 icon-v" to="/news">
			<van-icon name="pending-orders" />
			<span>新闻</span>
		</router-link>
		<router-link class="b2 icon-v" to="/learn">
			<van-icon name="completed" />
			<span>学习</span>
		</router-link>
		<router-link class="b3 icon-v" to="/interactive">
			<van-icon name="pending-evaluate" />
			<span>互动</span>
		</router-link>
		<router-link class="b4 icon-v" to="/activity">
			<van-icon name="pending-deliver" />
			<span>活动</span>
		</router-link>
	</div>
</template>

<script>
</script>

<style>
	.home{ width:100%;height:100%;background:url(/static/images/home.jpg) no-repeat; background-size: 100% 100%; position: absolute;}
	.home .icon-v{ width: 6rem; height: 6rem; color: #FFFFFF; text-align: center; border-radius:3rem ; background:#fa853f;}
	.home .icon-v .van-icon{ font-size:2rem; margin-top: 1.1rem;}
	.home .icon-v span{ font-size: 1.2rem; display: block;}
	.home .b1{position: absolute; top:270px;left:60px}
	.home .b2{position: absolute; top:270px;right:60px}
	.home .b3{position: absolute; top:390px;left:60px}
	.home .b4{position: absolute; top:390px;right:60px}
</style>