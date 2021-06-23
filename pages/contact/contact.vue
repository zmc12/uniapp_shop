<template>
	<div class="contact">
		<img class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"/>
		<div class="info">
			<div @click="phone">联系电话:13020289348(点击拨打)</div>
			<div>地址：江苏省常州市1801号江苏理工学院</div>
		</div>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				longitude:120,
				latitude:30,
				markers:[
					{
						longitude:120,
						latitude:30,
						icon:'../../static/logo.png'
					}
				]
			}
		},
		methods:{
			phone(){
				uni.makePhoneCall({
					phoneNumber:'13020289348'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact{
		.img{
			width: 750rpx;
			height: 320rpx;
		}
		.info{
			padding: 10rpx 20rpx;
			font-size: 30rpx;
			div{
				line-height: 80rpx;
				border-bottom: 1px solid #eee;
			}
		}
		.map{
			width:750rpx;
			height:750rpx
		}
	}
</style>
