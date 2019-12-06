<template>
  <div>
    <div class="page" v-if="code === 0">
      <swiper :indicator-dots="indicatorDots"
              :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item, index) in slideshow" :key="index">
          <swiper-item>
            <image :src="item.res_key" :lazy-load="true" class="slide-image"/>
          </swiper-item>
        </block>
      </swiper>
      <div class="info">
        <div class="name">{{caption}}</div>
        <div class="format">{{attrs ? attrs : '可选择规格'}}</div>
        <div class="wrap clearfix">
          <div class="stock left">库存 {{currentSku.stock || totalStock}} {{unit}}</div>
          <div class="price right">
            <div class="markingprice"><span v-if='currentSku.original_price'>￥{{currentSku.original_price}}</span>
            </div>
            <div class="presentprice"><span>￥</span>{{priceInterval}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="title">提货时限</div>
        <div class="delivery-time">
          <div class="delivery-text" v-if="productInfo.delivery_start > 0">申请后 {{productInfo.delivery_start}} 天发货</div>
          <div class="delivery-text" v-if="productInfo.delivery_start <= 0">立即发货</div>
          <div v-for="(deliveryTime,index) in productInfo.delivery_time" :key="index">
            <div class="delivery-text1">{{deliveryTime.start}} 至 {{deliveryTime.end}}</div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="productInfo.producer_info" class="title">
          {{productInfo.producer_info.user_type === 1 ? '品牌商' : ''}}
          {{productInfo.producer_info.user_type === 2 ? '代理商' : ''}}
        </div>
        <!-- <div v-if="productInfo.producer_info.user_type === 1" class="title">品牌商</div>
        <div v-if="productInfo.producer_info.user_type === 2" class="title">代理商</div> -->
        <div class="manufacturer-info" @click.stop="toBrandInformation">
          <img :src="logo || mallLogo" alt="">
          <div class="manufacturer">
            <div class="name">{{company}}</div>
            <div class="address">
              地址码：<span>{{walletAddress}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="title">商品详情</div>
      <div class="pic-wrap">
        <img v-for="item in imgList" :lazy-load="true" :src="item.res_key" :key="item.res_key" alt="" mode="widthFix">
      </div>
      <div class="goods-action" v-if="totalStock !== ''">
        <div class="goods-action-icon" @click="toShopCart">
          <img src="../../../static/images/cart-product.png" alt="">
          <div>购物车</div>
          <span v-if="cartList.length > 0">{{cartList.length}}</span>
        </div>
        <button class="goods-action-icon" open-type="contact">
          <img src="../../../static/images/customer-service.png" alt="">
          <div>客服</div>
        </button>
        <button v-if="wingAuthorized" class="goods-action-icon" open-type="share">
          <img src="../../../static/images/share-product.png" alt="">
          <div>分享</div>
        </button>
        <button v-else class="goods-action-icon" @click.stop="toCreateWallet">
          <img src="../../../static/images/share-product.png" alt="">
          <div>分享</div>
        </button>
        <div v-if="totalStock > 0" class="goods-action-button add-cart" @click="() => showAddPopup('add')">加入购物车</div>
        <div v-if="totalStock > 0" class="goods-action-button buy" @click="() => showBuyPopup('buy')">立即购买</div>
        <div v-if="totalStock <= 0" class="not-enough">库存不足</div>
      </div>
      <van-popup
        :show="addPopup"
        @close="hideAddPopup"
        position="bottom"
        custom-class="popup"
      >
        <format
          v-if="addPopup"
          :activeBtn="activeBtn"
          :productInfo="productInfo"
          :callback="handleFn"
          :totalStock="totalStock"
          :hide="hideAddPopup"
        ></format>
      </van-popup>
      <van-popup
        :show="buyPopup"
        @close="hideBuyPopup"
        position="bottom"
        custom-class="popup"
      >
        <format
          v-if="buyPopup"
          :activeBtn="activeBtn"
          :productInfo="productInfo"
          :callback="handleFn"
          :totalStock="totalStock"
          :hide="hideBuyPopup"
        >
        </format>
      </van-popup>
    </div>
    <noData tipStr='商品已下架' v-else-if="code === 6001"></noData>
  </div>
</template>

<script>
  import {formatTime} from '@/utils'
  import fly from '../../utils/request'
  import format from '@/components/format'
  import store from '@/store'
  import managementAddress from '../../utils/managementAddress'
  import noData from '@/components/no_data'
  import mallLogo from '../../../static/images/mall-logo.png'

  export default {
    data () {
      return {
        slideshow: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        addPopup: false,
        buyPopup: false,
        activeBtn: '',
        currentSku: {},
        caption: '',
        imgList: [],
        skuList: [],
        unit: '',
        totalStock: '',
        logo: '',
        company: '',
        walletAddress: '',
        productInfo: {},
        attrs: '',
        intervals: '',
        code: 0,
        priceInterval: '',
        mallLogo
      }
    },
    components: {
      format,
      noData
    },
    computed: {
      cartList () {
        return store.state.cartList
      },
      wingAuthorized () {
        return store.state.wingAuthorized
      },
      customerId () {
        return store.state.customerId
      }
    },
    /* onLoad (options) {
      wx.hideShareMenu()
      wx.setNavigationBarTitle({
        title: options.name
      })
      this.spuId = options.spuId
      this.$mp.page.changeData = () => {
        managementAddress.git()
      }
    },
    onShow () {
      this.currentSku = {}
      this.getProductDetail()
    },
    onHide () {
      this.addPopup = false
      this.buyPopup = false
    },
    onShareAppMessage: function () {
      // return custom share data when user share.
      return {
        title: this.caption,
        path: 'pages/index/main?customerId=' + this.customerId + '&name=' + this.productInfo.caption + '&spuId=' + this.productInfo.spu_id,
        imageUrl: this.slideshow[0].res_key
      }
    }, */
    methods: {
      toCreateWallet () {
        if (this.wingAuthorized === null) {
          this.getProductDetail()
          return
        }
        mpvue.navigateTo({url: '../create_wallet/main'})
      },
      showAddPopup (activeBtn) {
        this.activeBtn = activeBtn
        this.addPopup = true
      },
      hideAddPopup () {
        this.addPopup = false
      },
      showBuyPopup: function (activeBtn) {
        this.activeBtn = activeBtn
        this.buyPopup = true
      },
      isPurchase () {
        return false
      },
      hideBuyPopup () {
        this.buyPopup = false
      },
      getProductDetail () {
        fly.get('/v1/shopping/detail', {pid: this.spuId}).then(res => {
          if (res.code === 0) {
            this.code = res.code
            const totalStock = res.data.sku_list.reduce((prev, next) => {
              return prev + next.stock
            }, 0)
            this.getPriceInterval(res.data.sku_list)
            this.slideshow = res.data.slideshow
            this.caption = res.data.caption
            this.imgList = res.data.intro_imgs
            this.skuList = res.data.sku_list
            this.specs = res.data.specs
            this.unit = res.data.unit_name
            this.totalStock = totalStock
            if (res.data.producer_info) {
              this.logo = res.data.producer_info.company_logo
              this.walletAddress = res.data.producer_info.wallet_address
              this.company = res.data.producer_info.company
            }
            res.data.specs.forEach(spec => {
              if (res.data.specs.every(q => q.values.length === 1)) {
                spec.selected = 0
                spec.valueIndex = 0
              }
            })
            if (res.data.delivery_time) {
              res.data.delivery_time.forEach(value => {
                value.start = formatTime(new Date(value.start))
                value.end = formatTime(new Date(value.end))
              })
            }
            this.productInfo = res.data
            if (res.data.sku_list.length === 1) {
              this.handleFn(this.skuList[0])
            } else {
              this.getPriceoriginal(this.skuList)
            }
          } else if (res.code === 6001) {
            this.code = res.code
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      handleFn (currentSku) {
        console.log('currentSku', currentSku)
        this.currentSku = currentSku
        const attrs = Object.values(currentSku.specs)
        attrs.forEach((item, index) => {
          if (typeof item === 'object') {
            attrs.splice(index, 1)
          }
        })
        this.attrs = attrs.join('/')
      },
      /**
       * 获取划线价区间排序
       */
      getPriceoriginal (newskuList) {
        function compare (arg) {
          return function (a, b) {
            return b[arg] - a[arg]
          }
        }

        let newarr = newskuList.sort(compare('original_price'))
        this.currentSku = newarr[0]
      },
      /**
       * 获取价格区间
       */
      getPriceInterval (skuList) {
        let priceInterval = []
        skuList.forEach(sku => {
          priceInterval.push(Number(sku.price))
        })
        this.priceInterval = Math.min.apply(null, priceInterval) + '~' + Math.max.apply(null, priceInterval)
        if (Math.min.apply(null, priceInterval) === Math.max.apply(null, priceInterval)) {
          this.priceInterval = Math.min.apply(null, priceInterval)
        }
      },
      toBrandInformation () {
        mpvue.navigateTo({url: '../brand_information/main?producer_info=' + encodeURIComponent(JSON.stringify(this.productInfo.producer_info))})
      },
      toShopCart () {
        mpvue.switchTab({
          url: '../shop_cart/main'
        })
      }
    }
  }
</script>
<style>
  .popup {
    height: 75vh;
  }
</style>
<style scoped lang="less">
  @import url("../../common.css");

  .page {
    padding-bottom: 103px;
    background: #f7f8fa;

    swiper {
      height: 375px;
    }

    .slide-image {
      width: 375px;
      height: 375px;
    }

    .info {
      padding: 20px;
      margin-bottom: 14px;
      background: #fff;

      .name {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
      }

      .format {
        margin-bottom: 17px;
        font-size: 15px;
        line-height: 21px;
        font-weight: 300;
      }

      .wrap {
        position: relative;

        .stock {
          font-size: 15px;
          font-weight: 300;
          position: absolute;
          bottom: 0;
        }

        .price {
          font-size: 24px;
          color: #274366;

          span {
            font-size: 14px;
          }
        }

        .right {
          .markingprice {
            text-align: right;
            font-size: 14px;
            color: #BFBFBF;
            text-decoration: line-through;
          }

          .presentprice {
            text-align: right;
            font-size: 33px;
            color: #F08F03;
          }
        }
      }
    }

    .title {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
    }

    .delivery-time {
      padding: 18px 20px;
      margin-bottom: 20px;
      background: #fff;
    }

    .delivery-text {
      font-size: 14px;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.85);
    }

    .delivery-text1 {
      margin-top: 5px;
      font-size: 14px;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.85);
    }

    .manufacturer-info {
      position: relative;
      display: flex;
      padding: 18px 20px;
      margin-bottom: 20px;
      background: #fff;

      &:after {
        content: '';
        position: absolute;
        right: 16px;
        top: 50%;
        width: 12px;
        height: 12px;
        margin-top: -8px;
        border-top: 1px solid #14141A;
        border-right: 1px solid #14141A;
        transform: rotate(45deg);
      }

      img {
        width: 48px;
        height: 48px;
        margin-right: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .manufacturer {
        flex: 1;
        min-width: 0;

        .name {
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
        }

        .address {
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

          span {
            color: #2b3b75;
            font-weight: 400;
            line-height: 17px;
          }
        }
      }
    }

    .pic-wrap {
      img {
        width: 375px;
      }
    }

    .goods-action {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      height: 85px;
      padding: 12px 10px 0 0;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);

      .goods-action-icon {
        position: relative;
        width: 42px;
        height: 50px;
        padding: 0;
        line-height: 0;
        text-align: center;
        background: none;

        &:after {
          border: none;
        }

        img {
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }

        div {
          line-height: 15px;
          font-size: 10px;
          font-weight: 400;
        }

        span {
          position: absolute;
          top: -5px;
          right: 5px;
          min-width: 16px;
          padding: 0 3px;
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          background-color: #f44;
          border: 1px solid #fff;
          border-radius: 16px;
          box-sizing: border-box;
        }
      }

      .goods-action-button,
      .not-enough {
        flex: 1;
        height: 40px;
        line-height: 40px;
        color: #ffffff;
        text-align: center;
        font-size: 15px;

        &.add-cart {
          background: rgba(0, 0, 0, 0.85);
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        &.buy {
          background: #EEA63F;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }

      .not-enough {
        background: #a4a4a6;
        border-radius: 20px;
      }
    }
  }
</style>
