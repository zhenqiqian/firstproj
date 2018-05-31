<template>
	<van-notice-bar :text="text" left-icon="/static/images/lb.png" />
</template>

<script>
	export default {
		name: 'app-notice',
		data() {
			return {
				text:""
			};
		},
		mounted:function(){	
			this.$http.get(this.httpUrl+"/message/index").then((response) => {
				this.text=response.data[0].MessageContent;
			}).catch(function (error) {
				console.log(error);
			})

		}
	};
</script>
