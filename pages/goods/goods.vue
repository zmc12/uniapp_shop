<template>
	<div class="goods-list">
		<goods-list :goods="goods" @clickGood="goodDetail"/>
		<div class="isOver" v-if="flag">-----我是有底线的-----</div>
	</div>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default{
		components:{
			"goods-list":goodsList
		},
		data(){
			return{
				pageIndex:1,
				goods:[],
				flag:false
			}
		},
		methods:{
			async getGoodList(callback){
				
				const promise = await this.$myRuquest({
					url:`/api/getgoods?pageindex=${this.pageIndex}`
				});
				this.goods = [...this.goods,...promise.data.message];
				callback && callback();
			},
			goodDetail(id){
			
				uni.navigateTo({
					url:`../goods/goodDetail?id=${id}`
				})
			}
		},
		onLoad(){
			this.getGoodList();
		},
		onReachBottom(){
			if(this.goods.length<this.pageIndex*10){
				return this.flag = true;
			}
			this.pageIndex++;
			this.getGoodList();
		},
		onPullDownRefresh(){
			this.pageIndex = 1;
			this.goods = [];
			this.flag = false;
			setTimeout(() => {
				this.getGoodList(() => {
					uni.stopPullDownRefresh();
				})
			},300)
		}
	}
</script>

<style lang="scss">
	.goods-list{
		background: #eee;
	}
	.isOver{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 28rpx;
	}
</style>
