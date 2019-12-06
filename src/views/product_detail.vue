<template>
  <div class="page">
    <Header title="伊尹招牌 | 冲浪活海参"></Header>
    <div class="main">
      <van-swipe @change="onChange" :autoplay="3000">
        <van-swipe-item>
          <img src alt class="swiperImg" />
        </van-swipe-item>
        <van-swipe-item>
          <img src alt class="swiperImg" style="background:red" />
        </van-swipe-item>
        <van-swipe-item>
          <img src alt class="swiperImg" style="background:green" />
        </van-swipe-item>
        <van-swipe-item>
          <img src alt class="swiperImg" style="background:yellow" />
        </van-swipe-item>

        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
      </van-swipe>
      <div class="info">
        <div class="name">伊尹招牌 | 冲浪活海参</div>
        <div class="format">可选择规格</div>
        <div class="wrap clearfix">
          <div class="stock left">库存 1209 件</div>
          <div class="price right">
            <div class="markingprice">
              <span>原价 ￥1700</span>
            </div>
            <div class="presentprice"><span>￥</span>999~ <span>￥</span>1133</div>
          </div>
        </div>
      </div>
      <div>
        <div class="title">提货时限</div>
        <div class="delivery-time">
          <div class="delivery-text">申请后 1 天发货</div>

          <div>
            <div class="delivery-text1">2019-12-12 至 2019-12-12</div>
          </div>
          <div>
            <div class="delivery-text1">2019-12-12 至 2019-12-12</div>
          </div>
        </div>
      </div>
      <div>
        <div class="title">生产商</div>
        <!-- <div v-if="productInfo.producer_info.user_type === 1" class="title">品牌商</div>
        <div v-if="productInfo.producer_info.user_type === 2" class="title">代理商</div>-->
        <div class="manufacturer-info">
          <img src alt />
          <div class="manufacturer">
            <div class="name">盛世伊尹食品有限公司</div>
            <div class="address">
              地址：
              <span>3Niu9faBiSxcf27YaezVrNUczRN4h9xt9</span>
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
        <div class="commodity-info"></div>
      </div>
    </div>
    <div class="buttonBox">
      <router-link to="/wallet">
        <div class="button">立即购买</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);
import Header from "../components/header.vue";
export default {
  data() {
    return {
      current: 0
    };
  },
  components: {
    Header
  },
  computed: {},

  methods: {
    onChange(index) {
      this.current = index;
    }
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
    background-color: #274366;
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
    width: 80%;
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
