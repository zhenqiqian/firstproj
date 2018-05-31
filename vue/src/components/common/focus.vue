<template>
	<van-swipe :autoplay="5000" style="height:12rem;">
		<van-swipe-item v-for="image in images">
			<img v-lazy="image" style="width: 100%;">
		</van-swipe-item>
	</van-swipe>
</template>

<script>
	export default {
		name: 'app-focus',
		data() {
			return {
				images: [
					'../../../static/images/banner.jpg'
				]
			};
		}
	};
</script>
