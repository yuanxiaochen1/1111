<template>
  <div>
    <div class="page" v-if="code === 0">
      <Header :title="$route.query.name"></Header>
      <div class="main">
        <van-swipe @change="onChange" :autoplay="interval" :show-indicators="indicatorDots" :duration="duration">
          <van-swipe-item v-for="(item, index) in slideshow" :key="index">
            <img :src="item.res_key" alt class="swiperImg" />
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{ slideshow.length }}</div>
        </van-swipe>
        <div class="info">
          <div class="name">{{ caption }}</div>
          <div class="format">{{ attrs ? attrs : "可选择规格" }}</div>
          <div class="wrap clearfix">
            <div class="stock left">库存 {{ currentSku.stock || totalStock }} {{ unit }}</div>
            <div class="price right">
              <div class="markingprice">
                <span v-if="currentSku.original_price">￥{{ currentSku.original_price }}</span>
              </div>
              <div class="presentprice">
                <span>￥</span>999~
                <span>￥</span>
                {{ priceInterval }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="title">提货时限</div>
          <div class="delivery-time">
            <div class="delivery-text" v-if="productInfo.delivery_start > 0">申请后 {{ productInfo.delivery_start }} 天发货</div>
            <div class="delivery-text" v-if="productInfo.delivery_start <= 0">立即发货</div>
            <div v-for="(deliveryTime, index) in productInfo.delivery_time" :key="index">
              <div class="delivery-text1">{{ deliveryTime.start }} 至 {{ deliveryTime.end }}</div>
            </div>
          </div>
        </div>
        <div>
          <div v-if="productInfo.producer_info" class="title">
            {{ productInfo.producer_info.user_type === 1 ? "品牌商" : "" }}
            {{ productInfo.producer_info.user_type === 2 ? "代理商" : "" }}
          </div>
          <!-- <div v-if="productInfo.producer_info.user_type === 1" class="title">品牌商</div>
          <div v-if="productInfo.producer_info.user_type === 2" class="title">代理商</div>-->
          <div class="manufacturer-info" @click.stop="toBrandInformation">
            <img :src="logo || mallLogo" alt />
            <div class="manufacturer">
              <div class="name">{{ company }}</div>
              <div class="address">
                地址：
                <span>{{ walletAddress }}</span>
              </div>
            </div>
          </div>
          <div class="manufacturer-list">
            <div>
              <span style="color:#56AB42;">98%</span>
              <p>发货率</p>
            </div>
            <div>
              <span style="color:#F08F03;">15天</span>
              <p>发货速度</p>
            </div>
            <div>
              <span>66%</span>
              <p>提货率</p>
            </div>
            <div>
              <span>1225</span>
              <p>发行量</p>
            </div>
            <div>
              <span>234个</span>
              <p>地址</p>
            </div>
          </div>
        </div>
        <div>
          <div class="title">商品详情</div>
          <div class="commodity-info">
            <div class="pic-wrap">
              <img v-for="item in imgList" :lazy-load="true" :src="item.res_key" :key="item.res_key" alt mode="widthFix" />
            </div>
          </div>
        </div>
      </div>
      <div class="buttonBox">
        <router-link to="/wallet">
          <div class="button">立即购买</div>
        </router-link>
      </div>
    </div>
    <div v-else-if="code === 6001">商品下架</div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import store from "@store";
import { Swipe, SwipeItem } from "vant";
import { Notify } from "vant";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Notify);
import Header from "../components/header.vue";
import { formatTime } from "@/utils";
export default {
  data() {
    return {
      slideshow: [],
      current: 0,
      interval: 5000,
      duration: 1000,
      indicatorDots: true,
      addPopup: false,
      buyPopup: false,
      activeBtn: "",
      currentSku: {},
      caption: "",
      imgList: [],
      skuList: [],
      unit: "",
      totalStock: "",
      logo: "",
      company: "",
      walletAddress: "",
      productInfo: {},
      attrs: "",
      intervals: "",
      code: 0,
      priceInterval: "",
      mallLogo: null
    };
  },
  components: {
    Header
  },
  computed: {
    cartList() {
      return store.state.cartList;
    },
    wingAuthorized() {
      return store.state.wingAuthorized;
    },
    customerId() {
      return store.state.customerId;
    }
  },
  created() {
    this.spuId = this.$route.query.spuId;
    this.currentSku = {};
    this.getProductDetail();
  },
  beforeMount() {
    /* this.$mp.page.changeData = () => {
        managementAddress.git()
      } */
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    toCreateWallet() {
      if (this.wingAuthorized === null) {
        this.getProductDetail();
        return;
      }
      this.$router.push("/create_wallet");
    },
    showAddPopup(activeBtn) {
      this.activeBtn = activeBtn;
      this.addPopup = true;
    },
    hideAddPopup() {
      this.addPopup = false;
    },
    showBuyPopup: function(activeBtn) {
      this.activeBtn = activeBtn;
      this.buyPopup = true;
    },
    isPurchase() {
      return false;
    },
    hideBuyPopup() {
      this.buyPopup = false;
    },
    getProductDetail() {
      axios.get("/v1/shopping/detail", { params: { pid: this.spuId } }).then((res) => {
        if (res.code === 0) {
          this.code = res.code;
          const totalStock = res.data.sku_list.reduce((prev, next) => {
            return prev + next.stock;
          }, 0);
          this.getPriceInterval(res.data.sku_list);
          this.slideshow = res.data.slideshow;
          this.caption = res.data.caption;
          this.imgList = res.data.intro_imgs;
          this.skuList = res.data.sku_list;
          this.specs = res.data.specs;
          this.unit = res.data.unit_name;
          this.totalStock = totalStock;
          if (res.data.producer_info) {
            this.logo = res.data.producer_info.company_logo;
            this.walletAddress = res.data.producer_info.wallet_address;
            this.company = res.data.producer_info.company;
          }
          res.data.specs.forEach((spec) => {
            if (res.data.specs.every((q) => q.values.length === 1)) {
              spec.selected = 0;
              spec.valueIndex = 0;
            }
          });
          if (res.data.delivery_time) {
            res.data.delivery_time.forEach((value) => {
              value.start = formatTime(new Date(value.start));
              value.end = formatTime(new Date(value.end));
            });
          }
          this.productInfo = res.data;
          if (res.data.sku_list.length === 1) {
            this.handleFn(this.skuList[0]);
          } else {
            this.getPriceoriginal(this.skuList);
          }
        } else if (res.code === 6001) {
          this.code = res.code;
        } else {
          Notify(res.msg);
        }
      });
    },
    handleFn(currentSku) {
      console.log("currentSku", currentSku);
      this.currentSku = currentSku;
      const attrs = Object.values(currentSku.specs);
      attrs.forEach((item, index) => {
        if (typeof item === "object") {
          attrs.splice(index, 1);
        }
      });
      this.attrs = attrs.join("/");
    },
    /**
     * 获取划线价区间排序
     */
    getPriceoriginal(newskuList) {
      function compare(arg) {
        return function(a, b) {
          return b[arg] - a[arg];
        };
      }

      let newarr = newskuList.sort(compare("original_price"));
      this.currentSku = newarr[0];
    },
    /**
     * 获取价格区间
     */
    getPriceInterval(skuList) {
      let priceInterval = [];
      skuList.forEach((sku) => {
        priceInterval.push(Number(sku.price));
      });
      this.priceInterval = Math.min.apply(null, priceInterval) + "~" + Math.max.apply(null, priceInterval);
      if (Math.min.apply(null, priceInterval) === Math.max.apply(null, priceInterval)) {
        this.priceInterval = Math.min.apply(null, priceInterval);
      }
    },
    toBrandInformation() {
      this.$router.push({
        path: "/brand_information",
        query: {
          producer_info: encodeURIComponent(JSON.stringify(this.productInfo.producer_info))
        }
      });
    }
    /*  toShopCart() {
      mpvue.switchTab({
        url: "../shop_cart/main"
      });
    } */
  }
};
</script>
<style scoped lang="less">
.main {
  margin-top: 50px;
  .swiperImg {
    display: block;
    width: 100vw;
    height: 100vw;
    background: rosybrown;
  }
  .custom-indicator {
    position: absolute;
    width: 100vw;
    top: 95vw;
    text-align: center;
  }
  .info {
    padding: 20px;
    margin-bottom: 14px;
    background: #fff;

    .name {
      margin-bottom: 20px;
      text-align: left;
      line-height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
    }

    .format {
      margin-bottom: 17px;
      font-size: 14px;
      font-weight: 300;
      text-align: left;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.85);
      line-height: 16px;
    }

    .wrap {
      position: relative;

      .stock {
        position: absolute;
        bottom: 0;
        font-size: 14px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(0, 0, 0, 0.85);
        line-height: 16px;
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
          text-decoration: line-through;
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(191, 191, 191, 1);
          line-height: 14px;
        }

        .presentprice {
          margin-top: 5px;
          text-align: right;
          font-size: 33px;
          color: #f08f03;
        }
      }
    }
  }
  .title {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    text-align: left;
  }

  .delivery-time {
    padding: 18px 20px;
    margin-bottom: 20px;
    background: rgba(247, 248, 250, 1);
    text-align: left;
  }

  .delivery-text {
    font-size: 14px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.85);
    line-height: 23px;
    text-align: left;
    margin-bottom: 10px;
  }

  .delivery-text1 {
    margin-top: 5px;
    font-size: 14px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.85);
    line-height: 23px;
    text-align: left;
  }
  .manufacturer-info {
    position: relative;
    display: flex;
    padding: 18px 20px;
    background: #fff;

    &:after {
      content: "";
      position: absolute;
      right: 16px;
      top: 50%;
      width: 12px;
      height: 12px;
      margin-top: -8px;
      border-top: 1px solid #14141a;
      border-right: 1px solid #14141a;
      transform: rotate(45deg);
    }

    img {
      width: 48px;
      height: 48px;
      margin-right: 12px;
      border-radius: 50%;
      flex-shrink: 0;
      background: #000000;
    }

    .manufacturer {
      flex: 1;
      min-width: 0;

      .name {
        margin-bottom: 5px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 17px;
        text-align: left;
        padding-left: 3px;
        margin-top: 3px;
      }

      .address {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        line-height: 11px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        padding-left: 3px;
        margin-top: 10px;
        span {
          color: #2b3b75;
          font-weight: 400;
          line-height: 17px;
        }
      }
    }
  }
  .manufacturer-list {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    div {
      height: 50px;
      span {
        display: block;
        width: 18vw;
        height: 10px;
        text-align: center;
        border-top: 0.5px solid #979797;
        font-size: 10px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        line-height: 23px;
        padding-top: 5px;
        color: #000000;
      }
      p {
        display: block;
        width: 18vw;
        height: 10px;
        text-align: center;
        font-size: 8px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(123, 123, 124, 1);
        line-height: 23px;
      }
    }
  }
  .commodity-info {
    min-height: 100vh;
    margin-bottom: 50px;
    .pic-wrap {
      img {
        width: 375px;
      }
    }
  }
}
.buttonBox {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding-top: 3px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  .button {
    margin: 0 auto;
    height: 44px;
    width: 300px;
    text-align: center;
    line-height: 44px;
    background: rgba(238, 166, 63, 1);
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.03);
    border-radius: 22px;
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
