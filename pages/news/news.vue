<template>
	<div class="news">
		<news-item @itemClick="goDetail" :newsList="newsList"></news-item>
	</div>
</template>

<script>
	import newsItem from '../../components/news-item/news-item.vue'
	export default{
		data(){
			return{
				newsList:[]
			}
		},
		methods:{
			async getNews(){
				const promise = await this.$myRuquest({
					url:'/api/getnewslist/'
				})
				
				this.newsList = promise.data.message;
			},
			goDetail(id){
				uni.navigateTo({
					url:`/pages/news/newsDetail?id=${id}`
				})
			}
		},
		onLoad(){
			this.getNews();
		},
		components:{
			"news-item":newsItem
		}
	}
</script>

<style lang="scss">
	.news{
		.news_item{
			display: flex;
			padding: 10rpx 20rpx;
			border-bottom: 1px solid $shop-color;
			image{
				min-width: 200rpx;
				max-width: 200rpx;
				height: 150rpx;
			}
			.right{
				margin-left: 15rpx;
				display: flex;
				flex-direction: column;
				.tit{
					font-size: 30rpx;
				}
				.info{
					font-size: 24rpx;
					span:nth-child(2){
						margin-left: 30rpx;
					}
				}
			}
			
		}
	}
</style>
