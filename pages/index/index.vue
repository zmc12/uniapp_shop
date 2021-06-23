<template>
	<div class="home">
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>	
			</swiper-item>
		</swiper>
		
		<!--导航 -->
		<div class="nav">
			<div v-for="(item,index) in navs" :key="index" class="nav_item" @click="navItemClick(item.path)">
				<div :class="item.icon"></div>
				<span>{{item.title}}</span>
			</div>
		</div>
		
		<!--推荐商品 -->
		<div class="hot_goods">
			<div class="tit">推荐商品</div>
			<goods-list :goods="goods" @clickGood="goodDetail"/>
		</div>
		
	</div>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				
				swipers:[],
				goods:[],
				navs:[
					{
						icon:'iconfont icon-ziyuan',
						title:'超市',
						path:'/pages/goods/goods'
					},
					{
						icon:'iconfont icon-guanyuwomen',
						title:'联系我们',
						path:'/pages/contact/contact'
					},
					{
						icon:'iconfont icon-tupian',
						title:'社区图片',
						path:'/pages/pics/pics'
					},
					{
						icon:'iconfont icon-shipin',
						title:'学习视频',
						path:'/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			this.getSwipers();
			this.getHotGoods();
		},
		methods: {
			async getSwipers(){
			
				const promise = await this.$myRuquest({
					url:'/api/getlunbo'
				});
				
				this.swipers = promise.data.message;
			},
			async getHotGoods(){
				const promise = await this.$myRuquest({
					url:'/api/getgoods?pageindex=1'
				});
				this.goods = promise.data.message;
				
			},
			navItemClick(path){
				uni.navigateTo({
					url:path
				})
			},
			goodDetail(id){
			
				uni.navigateTo({
					url:`../goods/goodDetail?id=${id}`
				})
			}
		},
		components:{
			"goods-list":goodsList
		}
		
	}
</script>

<style lang="scss">
	.home{
		swiper{
			width: 750rpx;
			height: 380rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		
		.nav{
			display: flex;
			.nav_item{
				width: 25%;
				text-align: center;
				span{
					font-size: 30rpx;
				}
				div{
					width: 120rpx;
					heigth: 120rpx;
					background: $shop-color;
					border-radius: 60rpx;
					margin: 10px auto;
					line-height: 120rpx;
					color: #fff;
					font-size: 50rpx;
				}
				.icon-tupian{
					font-size: 45rpx;
				}
			}
		}
		
		.hot_goods{
			background: #eee;
			overflow: hidden;
			margin-top: 10px;
			.tit{
				height: 50px;
				line-height: 50px;
				color: $shop-color;
				text-align: center;
				letter-spacing: 20px;
				background: #fff;
				margin: 7rpx 0;
			}
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
		}
		
		
	}
	

	
	
</style>
