<template>
  <div class="orderInfo">
    <van-icon name="share" class="share" size="25px" />
    <Header title="订单详情"></Header>
    <div class="background-image" v-if="order.status === 1">
      <div class="order-status">待付款</div>
      <div class="tip">{{ time }}s 后自动关闭订单</div>
    </div>
    <div class="background-cancel-image" v-if="order.status === 3">
      <div class="order-status">已取消</div>
      <div class="tip">订单已关闭</div>
    </div>
    <div class="background-image" v-if="order.status === 4">
      <div class="order-status">确认中</div>
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
      <div class="tip">订单上链中，请稍后</div>
    </div>
    <!-- v-if="order.status === 5"  -->
    <div class="background-image">
      <div class="order-status">已完成</div>
      <div class="tip">
        <span>交易成功</span>
        <span>您购买的商品已经成为您的数字资产</span>
      </div>
      <!-- <div class="tipText"></div> -->
    </div>
    <div class="background-image" v-if="order.status === 7">
      <div class="order-status">已退货</div>
      <div class="tip">商品已经申请退货</div>
    </div>
    <div class="orderWrap">
      <div class="product-detail-container">
        <div class="list-wrap">
          <div class="product-info" v-for="item in order.items" :key="item.id">
            <img class="image-icon" :src="item.specs.image.res_key" />
            <div class="product-name-container">
              <div class="product-name">{{ item.caption }}</div>
              <div class="product-dec">{{ item.attrs }} × {{ item.num }}{{ item.unit_name }}</div>
              <div class="price">¥ {{ item.price }}</div>
            </div>
          </div>
          <!--  -->
          <div class="product-info">
            <img class="image-icon" src />
            <div class="product-name-container">
              <div class="product-name">伊尹招牌 | 冲浪活海参</div>
              <div class="product-dec">经典款 200g/盒 / × 1件</div>
              <div class="price">¥ 1,399</div>
            </div>
          </div>
          <div class="product-info">
            <img class="image-icon" src />
            <div class="product-name-container">
              <div class="product-name">伊尹招牌 | 冲浪活海参</div>
              <div class="product-dec">经典款 200g/盒 / × 1件</div>
              <div class="price">¥ 1,399</div>
            </div>
          </div>
          <div class="product-info">
            <img class="image-icon" src />
            <div class="product-name-container">
              <div class="product-name">伊尹招牌 | 冲浪活海参</div>
              <div class="product-dec">经典款 200g/盒 / × 1件</div>
              <div class="price">¥ 1,399</div>
            </div>
          </div>
          <div class="product-info">
            <img class="image-icon" src />
            <div class="product-name-container">
              <div class="product-name">伊尹招牌 | 冲浪活海参</div>
              <div class="product-dec">经典款 200g/盒 / × 1件</div>
              <div class="price">¥ 1,399</div>
            </div>
          </div>
          <!--  -->
        </div>
        <div class="item-info item-info1">
          <div class="info-intro1">优惠券</div>
          <div class="info-text1">满1000减200</div>
        </div>
        <div class="item-info">
          <div class="info-intro">优惠减免</div>
          <div class="info-text" v-if="order.charges">- ¥ {{ order.charges.discounts }}</div>
        </div>
        <div class="item-info">
          <div class="info-intro">运费</div>
          <div class="info-text" v-if="order.charges">¥ {{ order.charges.carriage }}</div>
        </div>
        <div class="item-info">
          <div class="info-intro2">实付</div>
          <div class="info-text2" v-if="order.charges">¥ {{ order.charges.total }}</div>
        </div>
      </div>
      <div class="order-detail-container">
        <div class="item-info">
          <div class="title">订单信息</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">订单编号</div>
          <div class="info-text1">{{ order.order_id }}</div>
        </div>
        <div class="item-info">
          <div class="info-intro1">下单时间</div>
          <div class="info-text1">{{ order.created_at }}</div>
        </div>
        <div class="item-info" v-if="order.status > 3">
          <div class="info-intro1">支付方式</div>
          <div class="info-text1">微信支付</div>
        </div>
        <div class="item-info" v-if="order.status > 3">
          <div class="info-intro1">支付时间</div>
          <div class="info-text1">{{ order.payment_time }}</div>
        </div>
        <div class="item-info" v-if="order.status > 3">
          <div class="info-intro1">链上状态</div>
          <div class="info-text1">
            {{ order.transfer.status === 1 ? "确认中" : "" }}
            {{ order.transfer.status === 2 ? "已完成" : "" }}
            {{ order.transfer.status === 9 ? "上链失败" : "" }}
          </div>
        </div>
        <div class="item-info" v-if="order.status > 3">
          <div class="info-intro1">链上交易ID</div>
          <div class="info-text1" v-if="order.transfer.status !== 1" @click="toWebView">{{ order.transfer.txid || "-" }}</div>
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
import Vue from "vue";
import Header from "../components/header.vue";
import axios from "axios";
import store from "@store";
import { formatTime, formatCountTime } from "@/utils";
import { Notify } from "vant";
import { Dialog } from "vant";
Vue.use(Notify).use(Dialog);
export default {
  data() {
    return {
      order: {},
      orderId: "",
      payLoading: false,
      payDisabled: false,
      timer: "",
      expired_time: 0,
      containerHeight: 0
    };
  },
  components: {
    Header
  },
  computed: {
    customerId() {
      return store.state.customerId;
    },
    time() {
      return formatCountTime(this.expired_time);
    },
    user() {
      return store.state.user;
    }
  },
  beforeMount() {
    this.orderId = this.$route.query.orderId;
  },
  created() {
    this.getData();
    this.getUserInfo();
  },
  methods: {
    getData() {
      axios
        .post("/v1/order/find", {
          order_id: this.orderId
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            res.data.created_at = formatTime(new Date(res.data.created_at));
            if (res.data.payment_time) {
              res.data.payment_time = formatTime(new Date(res.data.payment_time));
            }
            res.data.items.forEach((item) => {
              const attrs = Object.values(item.specs);
              attrs.forEach((item, index) => {
                if (typeof item === "object") {
                  attrs.splice(index, 1);
                }
              });
              item.attrs = attrs.join("/");
            });
            this.order = res.data;
            if (this.order.expired_time > 0) {
              this.expired_time = this.order.expired_time;
              this.loop();
            }
            if (this.order.status === 4) {
              this.timer1 = setTimeout(() => {
                this.getData();
              }, 1000);
            }

            /* this.timer = setInterval(() => {
              if (this.order.expired_time <= 0) {
                clearInterval(this.timer)
                this.getData()
                return
              }
              this.order.expired_time--
            }, 1000) */
          }
        });
    },
    /**
     * 倒计时
     */
    loop() {
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        if (this.expired_time <= 0) {
          this.getData();
          clearInterval(this.timer);
          return;
        }
        this.expired_time--;
        this.loop();
      }, 1000);
    },
    /**
     * 用户信息
     */
    getUserInfo() {
      axios.get("/v1/user/user_info").then((res) => {
        console.log(res);
        if (res.code === 0) {
          store.commit("setUser", res.data);
        } else {
          Notify(res.msg);
        }
      });
    },
    toWebView() {
      this.$router.push({
        path: "/web_view",
        query: {
          type: 1,
          txid: this.order.transfer.txid
        }
      });
    },
    ToAssets() {
      this.$router.push({
        path: "/pages/asset",
        query: {}
      });
    },
    ToAssetsDetail() {
      if (!this.order.token_origin) {
        Notify("tokenkey不能为空");
        return;
      }
      this.$router.push({
        path: "/assets_detail",
        query: {
          name: this.order.items[0].caption,
          origin: this.order.token_origin,
          status: this.order.status,
          from: "order"
        }
      });
    },
    showDialog(orderId) {
      let that = this;
      Dialog.confirm({
        title: "取消订单",
        message: "是否要取消该笔订单"
      })
        .then((res) => {
          if (res.confirm) {
            that.handleCancel(orderId);
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    handleCancel(orderId) {
      axios
        .post("/v1/order/cancel", {
          order_id: orderId
        })
        .then((res) => {
          if (res.code === 0) {
            this.getData();
            Notify("订单已取消");
          } else {
            Notify(res.msg);
          }
        });
    },
    pay(orderId) {
      if (this.payDisabled === true) {
        return;
      }
      /* const that = this; */
      this.payLoading = true;
      this.payDisabled = true;
      axios
        .post("/v1/order/confirm_pay", {
          order_id: orderId
        })
        .then(() => {
          /* if (res.code === 0) {
            
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonce_str,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.sign,
              success() {
                that.payDisabled = false;
                that.payLoading = false;
                that.getData();
               //wx.redirectTo({
                  //url: '../../pages/order_detail/main'
                //})
              },
              fail() {
                that.payDisabled = false;
                that.payLoading = false;
                wx.showToast({
                  title: "支付失败",
                  icon: "none",
                  duration: 2000
                });
              }
            });
          } */

          Notify("支付操作");
        });
    }
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
  .background-cancel-image {
    margin-top: 50px;
    height: 140px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url(https://shopimg.stringon.com/orderFinishBg.png);
    background-size: 375px;

    .order-status {
      color: rgba(0, 0, 0, 0.5);
      font-weight: 600;
      font-size: 24px;
      font-weight: 600;
      font-family: PingFangSC-Semibold, PingFang SC;
    }
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
