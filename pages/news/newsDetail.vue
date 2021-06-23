<template>
	<div class="news_detail">
		<span class="title">{{detail.title}}</span>
		<div class="info">
			<span>发表时间：{{detail.add_time | formatDate}}</span>
			<span>浏览：{{detail.click}}</span>
		</div>
		<div class="content">
			<rich-text :nodes="detail.content"></rich-text>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				id:0,
				detail:{}
			}
		},
		methods:{
			async getDetail(){
				const promise = await this.$myRuquest({
					url:`/api/getnew/`+this.id
				})
				
				this.detail = promise.data.message[0];
			}
		},
		onLoad(options){
			this.id = options.id;
			this.getDetail();
		}
	}
</script>

<style lang="scss">
	.news_detail{
		font-size: 30rpx;
		padding: 0 20rpx;
		.title{
			text-align: center;
			width: 710rpx;
			display: block;
			margin: 20rpx 0;
		}
		.info{
			display: flex;
			justify-content: space-between;
		}
	}
</style>
