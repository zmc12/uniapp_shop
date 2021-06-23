<template>
	<div>
		<div class="news_item" v-for="item in newsList" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url"></image>
			<div class="right">
				<div class="tit">{{item.title}}</div>
				<div class="info">
					<span>发表时间:{{item.add_time | formatDate}}</span>
					<span>浏览:{{item.click}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			newsList:Array
		},
		filters:{
			formatDate(date){
				const nDate = new Date(date);
				const year = nDate.getFullYear();
				const month = nDate.getMonth().toString();
				const day = nDate.getDay();
				
				return year+'-'+month+'-'+day;
			}
		},
		methods:{
			navigator(id){
				this.$emit('itemClick',id);
			}
		}
	}
</script>

<style lang="scss">
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
</style>
