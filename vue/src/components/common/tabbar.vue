<template>
	<!--底部菜单-->
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home" to="/news">新闻</van-tabbar-item>
			<van-tabbar-item icon="pending-deliver" to="/activity">活动</van-tabbar-item>
			<van-tabbar-item icon="completed" to="/learn">学习</van-tabbar-item>
			<van-tabbar-item icon="pending-evaluate" to="/interactive">互动</van-tabbar-item>
			<van-tabbar-item icon="contact" to="/center">个人中心</van-tabbar-item>
		</van-tabbar>
</template>

<script>
	export default {
		name: 'app-tabbar',
		data() {
			return {
				active:0
			};
		},
		mounted: function() {
			this.active = this.$route.path == "/news" ? 0 : 0 || this.$route.path == "/activity" ? 1 : 0 || this.$route.path == "/learn" ? 2 : 0 || this.$route.path == "/interactive" ? 3 : 0 || this.$route.path == "/center" ? 4 : 0;
		},
	};
</script>
