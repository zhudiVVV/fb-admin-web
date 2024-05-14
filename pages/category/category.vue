<template>
  <view>
    <u-navbar
        :title="shopArrSelected.name"
        :autoBack="false"
        :placeholder="true"
    >
      <view
          class="u-nav-slot"
          slot="left"
          style="color: #ccc;font-size: 10px;display: flex;align-items: center;justify-content: center;"
          @click="popShow = true"
      >
        <u-icon
            name="list-dot"
            size="20"
        >
        </u-icon>
        <text>切换商铺</text>
      </view>
      <view
          class="u-nav-slot"
          slot="right"
      >
        <u-icon
            name="search"
            size="20"
        >
        </u-icon>
      </view>
    </u-navbar>


    <view class="content">
      <scroll-view scroll-y class="left-aside">
        <view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
          {{item.name}}
        </view>
      </scroll-view>
      <scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
        <view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
          <text class="s-item">{{item.name}}</text>
          <view class="t-list">
            <view @click="navToList(titem.id)" class="t-item" v-for="titem in item.tlist" :key="titem.id">
              <u--image
                  :showLoading="true"
                  :src="titem.pic"
                  width="80px"
                  height="80px"
                  :radius="8"
              />
              <view style="padding: 0 4px;flex: 1;">
                <view>
                  <text style="font-weight: 600; font-size: 16px;">{{titem.name}}</text>
                </view>
                <view>
                  <text style="font-weight: 400; font-size: 12px;">{{ titem.subTitle }}</text>
                </view>
                <view style="display: flex; align-items: center; gap: 4px;">
                  <u-tag v-if="titem.serviceIds.includes('1')" size="mini" text="无忧退货" type="warning" plain></u-tag>
                  <u-tag v-if="titem.serviceIds.includes('3')" size="mini" text="免费包邮" type="warning" plain style="margin-left: 4px;"></u-tag>
                </view>
                <view style="display: flex;align-items: center;justify-content: space-between;">
                  <text style="color: #e74c3c; font-size: 16px;">￥{{titem.price}}</text>
                              <u-icon name="plus-circle" color="#e74c3c"></u-icon>
<!--                  <u-icon name="photo"></u-icon>-->
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>


    <u-popup :show="popShow" mode="right"  @close="popShow=false">
      <view>
        <view style="padding: 4px;">
          请选择商家
        </view>
        <view
            v-for="item in shopArr"
            style="display: flex;align-items: center;justify-content: flex-start;gap: 4px;padding: 4px;min-width: 200px;"
            @click="shopClick(item)"
        >
          <u--image :showLoading="true" :src="item.bigPic" width="40px" height="40px" :radius="4"></u--image>
          <view>
            <view>
              <view>{{  item.name }}</view>
              <view style="font-size: 12px;color: #bdc3c7;">{{ item.area }}</view>
            </view>
          </view>

        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
	import { cloneDeep } from "lodash";

  export default {
		data() {
			return {
        popShow: false,
        tabScrollTop: 0,
				currentId: 0,
				flist: [],
				slist: [],
        shopArr: [],
        shopArrSelected: []
			}
		},
		onShow() {
			this.loadData();
		},
    watch: {
      'shopArrSelected.categoryId': {
        handler(val) {
          if(val) {
            this.getProductCategoryByParentId(val)
          }
        },
        deep: true,
        immediate: true
      }
    },
		methods: {
      shopClick(item) {
        this.shopArrSelected = cloneDeep(item)
        this.popShow = false
      },
      tabtap() {

      },

      asideScroll() {

      },
      getProductCategoryByParentId(parentId) {
        this.$fbApi.productCategoryByParentId({
          parentId
        }).then(async res => {
          this.flist = res.data.content || []
          // this.slist = []
          var tmpArr = []
          for(var i = 0; i < res.data.content.length; i++) {
            console.dir(res.data.content[i])
            var p = await this.getGoodList(this.shopArrSelected.id, res.data.content[i].id)
            tmpArr.push({
              name: res.data.content[i].name,
              id: res.data.content[i].id,
              tlist: p.data.map(s => {
                var tmpUrl = s.pic
                if(tmpUrl.startsWith("[")) {
                  tmpUrl = JSON.parse(tmpUrl)[0].url
                }
                return {
                  ...s,
                  pic: tmpUrl
                }
              }) || []
            })
          }
          this.slist = cloneDeep(tmpArr)
        })
      },
      getGoodList(brandId, categoryId) {
        return this.$fbApi.getGoodListByShopIdAndCategoryId({
          brandId,
          categoryId
        })
      },
			async loadData() {
        this.$fbApi.brandListAll({}).then(res => {
          console.dir(res)
          this.shopArr = res.data
          this.shopArrSelected = this.shopArr[0]
        })
				// fetchProductCateList(0).then(response => {
				// 	this.flist = response.data;
				// 	if (this.flist.length > 0) {
				// 		this.currentId = this.flist[0].id;
				// 		fetchProductCateList(this.currentId).then(response => {
				// 			this.slist = response.data;
				// 		});
				// 	}
				// })
			},
			//一级分类点击
			// tabtap(item) {
			// 	this.currentId = item.id;
			// 	fetchProductCateList(this.currentId).then(response => {
			// 		this.slist = response.data;
			// 	});
			// },
			navToList(sid) {
				uni.navigateTo({
					url: `/pages/product/product?id=` + sid
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
page,
.content {
  height: 100%;
  background-color: #f8f8f8;
}

.content {
  display: flex;
}
.left-aside {
  flex-shrink: 0;
  width: 200upx;
  height: 100%;
  background-color: #fff;
}
.f-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100upx;
  font-size: 28upx;
  color: $font-color-base;
  position: relative;
  &.active{
    color: $base-color;
    background: #f8f8f8;
    &:before{
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 36upx;
      width: 8upx;
      background-color: $base-color;
      border-radius: 0 4px 4px 0;
      opacity: .8;
    }
  }
}

.right-aside{
  flex: 1;
  overflow: hidden;
  padding-left: 20upx;
}
.s-item{
  display: flex;
  align-items: center;
  height: 70upx;
  padding-top: 8upx;
  font-size: 28upx;
  color: $font-color-dark;
}
.t-list{
  flex: 1;
  background: #fff;
  padding-top: 12upx;
  &:after{
    content: '';
    flex: 99;
    height: 0;
  }
}
.t-item{
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  font-size: 26upx;
  color: #666;
  padding-bottom: 20upx;

  image{
    width: 140upx;
    height: 140upx;
  }
}
</style>



<!--<style lang='scss'>-->
<!--	page,-->
<!--	.content {-->
<!--		height: 100%;-->
<!--		background-color: #f8f8f8;-->
<!--	}-->

<!--	.content {-->
<!--		display: flex;-->
<!--	}-->

<!--	.left-aside {-->
<!--		flex-shrink: 0;-->
<!--		width: 200upx;-->
<!--		height: 100%;-->
<!--		background-color: #fff;-->
<!--	}-->

<!--	.f-item {-->
<!--		display: flex;-->
<!--		align-items: center;-->
<!--		justify-content: center;-->
<!--		width: 100%;-->
<!--		height: 100upx;-->
<!--		font-size: 28upx;-->
<!--		color: $font-color-base;-->
<!--		position: relative;-->

<!--		&.active {-->
<!--			color: $base-color;-->
<!--			background: #f8f8f8;-->

<!--			&:before {-->
<!--				content: '';-->
<!--				position: absolute;-->
<!--				left: 0;-->
<!--				top: 50%;-->
<!--				transform: translateY(-50%);-->
<!--				height: 36upx;-->
<!--				width: 8upx;-->
<!--				background-color: $base-color;-->
<!--				border-radius: 0 4px 4px 0;-->
<!--				opacity: .8;-->
<!--			}-->
<!--		}-->
<!--	}-->

<!--	.right-aside {-->
<!--		flex: 1;-->
<!--		overflow: hidden;-->
<!--		padding-left: 20upx;-->
<!--	}-->

<!--	.s-list {-->
<!--		margin-top: 20upx;-->
<!--		display: flex;-->
<!--		flex-wrap: wrap;-->
<!--		width: 100%;-->
<!--		background: #fff;-->
<!--		padding-top: 12upx;-->

<!--		&:after {-->
<!--			content: '';-->
<!--			flex: 99;-->
<!--			height: 0;-->
<!--		}-->
<!--	}-->

<!--	.s-item {-->
<!--		flex-shrink: 0;-->
<!--		display: flex;-->
<!--		justify-content: center;-->
<!--		align-items: center;-->
<!--		flex-direction: column;-->
<!--		width: 176upx;-->
<!--		font-size: 26upx;-->
<!--		color: #666;-->
<!--		padding-bottom: 20upx;-->

<!--		image {-->
<!--			width: 140upx;-->
<!--			height: 140upx;-->
<!--		}-->
<!--	}-->
<!--</style>-->
