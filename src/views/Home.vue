<template>
  <div class="home">
    <Header title="首页"></Header>
    <img class="video" src="../assets/images/homeButton.png" alt />
    <div class="head" :class="{ 'head-bg': !background }">
      <img :src="background" alt="header" />
      <!--      <div class="mask">-->
      <!--        <div class="logo-wrap">-->
      <!--          <img class="logo left" :src="logo" alt="logo">-->
      <!--          <div class="mall-name left">{{shopName}}</div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <ul class="list">
      <li v-for="item in list" class="item" :key="item.spu_id">
        <router-link to="/product_detail">
          <img class="img" :src="item.slideshow[0].res_key" alt />
          <div class="info">
            <div class="name">伊尹招牌 | 冲浪活海参</div>
            <div class="price-wrap clearfix">
              <div class="price_top">
                <!-- <span v-if="item.original_price">¥</span>{{ item.original_price }} -->
                发货率:98% 发货速度:1.5天 提货率:66%
              </div>
              <div class="price left">
                <span>￥</span>
                {{ item.price }}
              </div>
              <img class="shop-cart right" :lazy-load="true" src="../assets/images/cart.png" alt />
            </div>
          </div>
        </router-link>
      </li>
      <!-- 复制的 -->
      <li v-for="item in list" class="item" :key="item.spu_id">
        <router-link to="/product_detail">
          <img class="img" :src="item.slideshow[0].res_key" alt />
          <div class="info">
            <div class="name">伊尹招牌 | 冲浪活海参</div>
            <div class="price-wrap clearfix">
              <div class="price_top">
                <!-- <span v-if="item.original_price">¥</span>{{ item.original_price }} -->
                发货率:98% 发货速度:1.5天 提货率:66%
              </div>
              <div class="price left">
                <span>￥</span>
                {{ item.price }}
              </div>
              <img class="shop-cart right" :lazy-load="true" src="../assets/images/cart.png" alt />
            </div>
          </div>
        </router-link>
      </li>
      <li v-for="item in list" class="item" :key="item.spu_id">
        <router-link to="/product_detail">
          <img class="img" :src="item.slideshow[0].res_key" alt />
          <div class="info">
            <div class="name">伊尹招牌 | 冲浪活海参</div>
            <div class="price-wrap clearfix">
              <div class="price_top">
                <!-- <span v-if="item.original_price">¥</span>{{ item.original_price }} -->
                发货率:98% 发货速度:1.5天 提货率:66%
              </div>
              <div class="price left">
                <span>￥</span>
                {{ item.price }}
              </div>
              <img class="shop-cart right" :lazy-load="true" src="../assets/images/cart.png" alt />
            </div>
          </div>
        </router-link>
      </li>
      <li v-for="item in list" class="item" :key="item.spu_id">
        <router-link to="/product_detail">
          <img class="img" :src="item.slideshow[0].res_key" alt />
          <div class="info">
            <div class="name">伊尹招牌 | 冲浪活海参</div>
            <div class="price-wrap clearfix">
              <div class="price_top">
                <!-- <span v-if="item.original_price">¥</span>{{ item.original_price }} -->
                发货率:98% 发货速度:1.5天 提货率:66%
              </div>
              <div class="price left">
                <span>￥</span>
                {{ item.price }}
              </div>
              <img class="shop-cart right" :lazy-load="true" src="../assets/images/cart.png" alt />
            </div>
          </div>
        </router-link>
      </li>
      <!-- 复制结束 -->
    </ul>
    <!-- <div class="last">{{bottom}}</div> -->
    <!-- <button v-if="wingAuthorized" class="share" open-type="share"></button>
    <button v-else class="share" @click.stop="toCreateWallet"></button>-->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import store from "@store";
import { Notify } from "vant";
import Header from "../components/header.vue";
Vue.use(Notify);
export default {
  name: "home",
  data() {
    return {
      list: [],
      logo: "",
      background: "",
      shopName: "",
      show: false,
      video_button: ""
    };
  },
  computed: {
    options() {
      return store.state.options;
    },
    getCartCount() {
      return store.state.getCartCount;
    },
    wingAuthorized() {
      return store.state.wingAuthorized;
    },
    customerId() {
      return store.state.customerId;
    }
  },
  components: { Header },
  created() {
    this.getProductList();
    this.getShopInfo();
  },
  methods: {
    /* getVideo() {
      axios.get("/v1/video/get").then((res) => {
        if (res.code === 0) {
          if (!res.data) {
            this.show = false;
            return;
          }
          if (!res.data.show) {
            this.show = false;
            return;
          }
          this.show = true;
          this.video_button = res.data.video_button;
        } else {
          Notify(res.msg);
        }
      });
    },
    toWebView() {
      mpvue.navigateTo({ url: "../web_view/main?type=3" });
    }, */
    onLoadMethod() {
      /* if (this.options.query) {
          fly.getWingAuthorized().then(p => {
            console.log('获取当前是否授权', p.wingAuthorized)
            if (!p.wingAuthorized) {
              console.log('this.options.query.customerId', this.options)
              store.state.applyInviter(this.options.query.customerId)
            }
          })
        } */
      // this.bindPrinterAction()
    },
    getProductList() {
      axios.get("/v1/shopping/list").then((res) => {
        if (res.code === 0) {
          this.list = res.data;
        } else {
          Notify(res.msg);
        }
      });
    },
    getShopInfo() {
      axios.get("/v1/shopping/shop_info").then((res) => {
        if (res.code === 0) {
          this.logo = res.data.logo;
          this.background = res.data.background;
          this.shopName = res.data.shop_name;
          store.commit("setShopInfo", res.data);
        } else {
          Notify(res.msg);
        }
      });
    }
    /**
     * 绑定打印员
     */
    /* bindPrinterAction () {
        if (!this.options.query.printer) {
          return
        }
        fly.get('/v1/user/bind_printer', {ticket: this.options.query.printer}).then(res => {
          if (res.code === 0) {
            mpvue.navigateTo({url: '../success/main?navigationBarTitleText=' + '绑定打印员' + '&title=' + '绑定成功'})
            console.log('绑定打印员', res.msg)
            this.options.query.printer = ''
            store.commit('getOptions', this.options)
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      toCreateWallet () {
        if (this.wingAuthorized === null) {
          this.onLoadMethod()
          console.log(this.$root.$mp.query, 'options')
          this.getCartCount()
          return
        }
        mpvue.navigateTo({url: '../create_wallet/main'})
      } */
  }
};
</script>

<style lang="less" scope>
@import url("../assets/common.css");
.home {
  min-height: 100vh;
  background: #f2f4f6;
  overflow: hidden;
  margin-top: 50px;
  .head {
    /*  position: fixed; */
    position: absolute;
    left: 0;
    top: 50px;
    right: 0;
    height: 100px;
    z-index: 999;

    &.head-bg {
      background: #f2f4f6;
    }

    img {
      width: 100%;
      height: 100%;
    }

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      .logo-wrap {
        padding: 88px 25px 0;

        .logo {
          width: 44px;
          height: 44px;
          margin-right: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        .mall-name {
          font-size: 20px;
          font-weight: 500;
          line-height: 44px;
          color: #ffffff;
        }
      }
    }
  }

  .video {
    position: fixed;
    right: 0;
    bottom: 70px;
    width: 70px;
    height: 70px;
    background-size: 70px;
    z-index: 1000;
  }

  .list {
    width: 325px;
    margin: 118px auto 0;

    .item {
      margin-bottom: 20px;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);

      .img {
        width: 100%;
        height: 325px;
      }

      .info {
        padding: 15px 20px;

        .name {
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          text-align: left;
          margin-bottom: 13px;
          font-size: 18px;
          line-height: 25px;
        }

        .price-wrap {
          color: #274366;

          .price_top {
            text-align: left;
            //text-decoration: line-through;
            font-size: 12px;

            margin-bottom: 4px;

            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(191, 191, 191, 1);
            line-height: 17px;
          }

          .price {
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(240, 143, 3, 1);
            line-height: 20px;

            span {
              font-size: 14px;
            }
          }

          .shop-cart {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }

  /* .last {
      margin: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 30px;
      text-align: center;
    } */

  .share {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 70px;
    height: 70px;
    background: url("https://shopimg.stringon.com/share.png") no-repeat;
    background-size: 70px;

    &:after {
      border: none;
    }
  }
}
</style>
