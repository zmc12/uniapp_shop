<template>
	<div class="goods_list">
		<div v-for="item in goods" :key="item.id" class="goods_item" @click="navigator(item.id)">
			<image :src="item.img_url"></image>
			<div class="price">
				<span>￥{{item.sell_price}}</span>
				<span>￥{{item.market_price}}</span>
			</div>
			<div class="name">
				{{item.title}}
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			goods:Array
		},
		methods:{
			navigator(id){
				this.$emit('clickGood',id);
			}
		}
	}
</script>

<style lang="scss">
    .goods_list{
    	padding: 0 15rpx;
    	display: flex;
    	flex-wrap: wrap;
    	justify-content: space-between;
    	.goods_item{
    		background: #fff;
    		width: 355rpx;
    		margin: 10rpx 0;
    		padding: 15rpx;
    		box-sizing: border-box;
    		image{
    			width:80%;
    			height: 150rpx;
    			display: block;
    			margin: 0 auto;
    		}
    		.price{
    			color: $shop-color;
    			font-size: 36rpx;
    			margin: 15rpx 0 5rpx 0;
    			span:nth-child(2){
    				color: #ccc;
    				font-size: 28rpx;
    				margin-left: 17rpx;
    				text-decoration: line-through;
    			}
    		}
    		
    		.name{
    			font-size: 32rpx;
    			line-height: 50rpx;
    			padding-bottom: 15rpx;
    			padding-top: 10rpx;
    		}
    	}
    }
</style>
