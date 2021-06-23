<template>
	<div class="goods_item">
		<swiper indicator-dots>
			<swiper-item v-for="swiper in swipers" :key="swiper.id">
				<image :src="swiper.src"></image>
			</swiper-item>
		</swiper>
		<div class="box1">
			<div class="price">
				<span>￥{{info.sell_price}}</span>
				<span>￥{{info.market_price}}</span>
			</div>
			<div class="goods_name">{{info.title}}</div>
		</div>
		<div class="line"></div>
		<div class="box2">
			<div>货号：{{info.goods_no}}</div>
			<div>库存：{{info.stock_quantity}}</div>
		</div>
		<div class="line"></div>
		<div class="box3">
			<div class="tit">详细介绍</div>
			<div class="content">
				<rich-text :nodes="content"></rich-text>
			</div>
		</div>
		<div class="bottom">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</div>
	</div>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				id: 0,
				swipers: [],
				info: {},
				content: '',
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			async getSwipers() {
				const promise = await this.$myRuquest({
					url: `/api/getthumimages/${this.id}`
				});
				this.swipers = promise.data.message;

			},
			async getDetail() {
				const promise1 = await this.$myRuquest({
					url: `/api/goods/getinfo/${this.id}`
				});
				this.info = promise1.data.message[0];

				const promise2 = await this.$myRuquest({
					url: `/api/goods/getdesc/${this.id}`
				});
				this.content = promise2.data.message[0].content;

			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getSwipers();
			this.getDetail();
		},
		components: {
			uniGoodsNav
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 700rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.box1 {
		padding: 10px;
		.price {
			font-size: 35rpx;
			color: $shop-color;
			line-height: 80rpx;

			span:nth-child(2) {
				color: #ccc;
				font-size: 28rpx;
				text-decoration: line-through;
				margin-left: 20rpx;
			}
		}

		.goods_name {
			font-size: 32rpx;
			line-height: 60rpx;
		}
	}

	.line {
		height: 10rpx;
		width: 100%;
		background-color: #eee;
	}

	.box2 {
		padding: 0 10px;
		font-size: 32rpx;
		line-height: 70rpx;
	}

	.box3 {
		padding-bottom: 50px;
		.tit {
			font-size: 32rpx;
			padding-left: 10px;
			border-bottom: 1px solid #eee;
			line-height: 70rpx;
		}

		.content {
			padding: 10px;
			font-size: 28rpx;
			color: #333;
			line-height: 50rpx;

		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
