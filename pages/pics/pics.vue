<template>
	<div class="pics">
		<scroll-view class="left" scroll-y>
			<div :class="active===index ? 'active' : '' " @click="clickLeft(index,cate.id)" v-for="(cate,index) in cates" :key="cate.id">{{cate.title}}</div>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<div class="item" v-for="item in rightData" :key="item.id">
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<div>{{item.title}}</div>
			</div>
			<div v-if="rightData.length === 0">暂无数据</div>
		</scroll-view>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				cates:[],
				active:-1,
				rightData:[]
			}
		},
		methods:{
			async getCates(){
				const promise = await this.$myRuquest({
					url:'/api/getimgcategory'
				})
				
				this.cates = promise.data.message;
				this.clickLeft(0,this.cates[0].id);
			},
			async clickLeft(index,id){
				this.active = index;
				
				const promise = await this.$myRuquest({
					url:`/api/getimages/`+id
				})
				
				this.rightData = promise.data.message;
				
			},
			previewImg(current){
				const urls = this.rightData.map(item =>{
					return item.img_url;
				})
				
				uni.previewImage({
					current,
					urls
				})
			}
		},
		onLoad(){
			this.getCates();
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.pics{
		height: 100%;
		display: flex;
		.left{
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;
			div{
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}
			.active{
				background: $shop-color;
				color: #fff;
			}
		}
		.right{
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;
			.item{
				image{
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}
				text{
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
