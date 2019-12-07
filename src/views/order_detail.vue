<template>
  <div class="orderInfo">
    <van-icon name="share" class="share" size="25px" />
    <Header title="订单详情"></Header>
    <div class="background-image">
      <div class="order-status">已完成</div>
      <div class="tip">
        <span>交易成功</span>
        <span>您购买的商品已经成为您的数字资产</span>
      </div>
      <!-- <div class="tipText"></div> -->
    </div>
    <div class="orderWrap">
      <div class="product-detail-container">
        <div class="list-wrap">
          <div class="product-info">
            <img class="image-icon" src />
            <div class="product-name-container">
              <div class="product-name">伊尹招牌 | 冲浪活海参</div>
              <div class="product-dec">经典款 200g/盒 / × 1件</div>
              <div class="price">¥ 1,399</div>
            </div>
          </div>
        </div>
        <div class="item-info item-info1">
          <div class="info-intro1">优惠券</div>
          <div class="info-text1">满1000减200</div>
        </div>
        <div class="item-info">
          <div class="info-intro">优惠减免</div>
          <div class="info-text">- ¥ 200</div>
        </div>
        <div class="item-info">
          <div class="info-intro">运费</div>
          <div class="info-text">¥ 0</div>
        </div>
        <div class="item-info">
          <div class="info-intro2">实付</div>
          <div class="info-text2">¥ 1,199</div>
        </div>
      </div>
      <div class="order-detail-container">
        <div class="item-info">
          <div class="title">订单信息</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">订单编号</div>
          <div class="info-text1">NK34768949834</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">下单时间</div>
          <div class="info-text1">2018-12-25 19:42:08</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">支付方式</div>
          <div class="info-text1">微信支付</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">支付时间</div>
          <div class="info-text1">2018-12-25 19:42:08</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">链上状态</div>
          <div class="info-text1">已完成</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">链上交易ID</div>
          <div class="info-text1">9d9e0159da5aa4e……7fae9452ab</div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <router-link to="/">
        <div class="button1">返回首页</div>
      </router-link>
      <router-link to="/">
        <div class="button2">前往物影</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import Header from "../components/header.vue";
export default {
  data() {
    return {};
  },
  components: {
    Header
  }
};
</script>
<style lang="less" scoped>
.orderInfo {
  display: flex;
  flex-direction: column;
  background-color: #fdf4df;
  box-sizing: border-box;
  min-height: 100vh;
  position: relative;
  .share {
    position: absolute;
    top: 60px;
    right: 20px;
  }
  .background-image {
    margin-top: 50px;
    height: 140px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url(https://shopimg.stringon.com/orderStatusBg.png);
    background-size: 375px;
    .order-status {
      color: #eea63f;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(238, 166, 63, 1);
      line-height: 33px;
    }
  }
  .tip {
    margin-top: 10px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      flex: 1;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 21px;
    }
  }
  .image-container {
    height: auto;
  }

  .product-detail-container {
    padding: 0 10px 10px;
    background-color: #ffffff;
    margin: 10px;
    border-radius: 5px;

    .list-wrap {
      border-bottom: 1px solid #eaeaea;

      .product-info {
        display: flex;
        padding: 15px 0;
      }
    }
  }

  .image-icon {
    width: 100px;
    height: 100px;
  }

  .product-name-container {
    padding-left: 15px;
    flex: 1;
  }

  .product-name {
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 21px;
    text-align: left;
  }

  .product-dec {
    margin-top: 7px;
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.85);
    line-height: 18px;
    text-align: left;
  }

  .price {
    margin-top: 30px;
    text-align: right;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
  }

  .order-detail-container {
    background-color: #ffffff;
    border-radius: 5px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 12px 10px;
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    line-height: 26px;
    margin-top: 5px;
  }
  .item-info1 {
    margin-top: 10px;
  }
  .info-intro1 {
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.85);
    line-height: 26px;
  }

  .info-intro2 {
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 26px;
  }

  .title {
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
  }

  .info-intro {
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.85);
    line-height: 26px;
  }

  .info-text1 {
    flex: 1;
    padding-left: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 13px;
    text-align: right;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.85);
    line-height: 26px;
  }

  .info-text2 {
    color: #eea63f;
    font-size: 16px;
    font-weight: 600;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    line-height: 26px;
  }

  .info-text {
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.85);
    line-height: 26px;
  }
  .orderWrap {
    width: 100%;
    // height: 459px;
    flex: 1;
    overflow-y: scroll;
  }
  .buttonBox {
    height: 36px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 30px;
    .button1 {
      height: 36px;
      width: 170px;
      box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.03);
      border-radius: 20px;
      border: 1px solid rgba(240, 143, 3, 1);
      text-align: center;
      line-height: 36px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(240, 143, 3, 1);
      margin-right: 8px;
    }
    .button2 {
      height: 36px;
      width: 170px;
      box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.03);
      border-radius: 20px;
      border: 1px solid rgba(240, 143, 3, 1);
      text-align: center;
      line-height: 36px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(240, 143, 3, 1);
    }
  }
}
</style>
