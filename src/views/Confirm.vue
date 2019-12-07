<template>
  <div class="confirm">
    <Header title="确认地址"></Header>
    <div class="address">
      <div class="dizhi">
        <div class="left">接受订单</div>
        <div class="right">
          怎么添加地址
          <span>？</span>
        </div>
        <input type="text" placeholder="请输入物影地址码" class="context" />
      </div>
    </div>
    <div class="commoditys">
      <div class="commodity">
        <!-- v-for="item in confirmOrderData.skus" :key="item.origins" -->
        <img class="commodity-img" src />
        <!-- :src="item.specs.image.res_key" -->
        <div class="commodity-content">
          <div class="commodity-name"></div>
          <!-- {{ item.caption }} -->
          <div class="commodity-type">经典款 200g/盒/ x 1件</div>
          <!-- {{ item.attrs }} × {{ item.num }} {{ item.unit_name }} -->
          <div class="commodity-mo">
            <div class="money">¥ 1，399</div>
            <!-- {{ item.price }} -->
          </div>
        </div>
      </div>
      <div class="coupon">
        <!-- @click="toCardQuan " -->
        <div class="purchasing-method-text">优惠券</div>
        <div class="good">
          <div class="goods">满1000减200</div>
          <img class="goods-img" src="../assets/images/right-arrow.png" />
        </div>
      </div>
    </div>
    <div class="div"></div>
    <div class="totals">
      <div class="total">
        <div class="discount">优惠减免</div>
        <div class="discount1"><span class="discount2">会员</span>- ¥ 20,300</div>
        <!-- {{ confirmOrderData.charges.discounts }} -->
      </div>
      <div class="total">
        <div class="discount1"><span class="discount2">会员</span>- ¥ 10</div>
        <!-- {{ confirmOrderData.charges.discounts }} -->
      </div>
      <div class="total">
        <div class="discount">运费</div>
        <div class="discount1">¥ 1,199</div>
        <!-- {{confirmOrderData.charges.carriage}} -->
      </div>
      <div class="total">
        <div class="total-merchandise">商品金额</div>
        <div class="total-merchandise-pic">¥ 1,399</div>
        <!-- {{ confirmOrderData.charges.total }} -->
      </div>
    </div>
    <div class="buttonBox">
      <router-link to="/wallet">
        <div class="button"><span>¥ 1,199 </span>立即支付</div>
      </router-link>
    </div>
    <van-action-sheet :show="show" :actions="actions" cancel-text="取消">
      <!--  
        @select="onSelect" 
        @cancel="onClose"
      @close="onClose"
      -->
    </van-action-sheet>
  </div>
</template>

<script>
import Header from "../components/header.vue";
/*  import store from "@/store"; */
/*import fly from "../../utils/request";
import util from "../../utils/util";
import lostAccuracy from "../../utils/lostAccuracy"; */
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      show: false,
      actions: [
        {
          name: "暂不提货，存入账户",
          value: 1
        },
        {
          name: "立即提货",
          value: 2
        }
      ]
    };
  },
  components: {
    Header
  } /* ,
 computed: {
    confirmOrderData() {
      return store.state.confirmOrderData;
    } 
  },
  methods: {
    toCardQuan() {
      mpvue.navigateTo({ url: "../card_quan/main" });
    } ,
     onSelect (event) {
        if (event.mp.detail.value === 2) {
          for (let i = 0; i < this.confirmOrderData.skus.length; i++) {
            let isDelivery = util.isDelivery(this.confirmOrderData.skus[i].delivery_time, 1)
            if (!isDelivery) {
              console.log('第', i, '件商品不可提货')
              return
            } else {
              console.log('第', i, '件商品可提货')
            }
          }
        }
        this.actionsName = event.mp.detail.name
        this.deliveryType = event.mp.detail.value
        this.show = false
      },
      onClose () {
        this.show = false
      },
   
  } */
};
</script>
<style>
page {
  background: #f2f4f6;
}

.gosettlement {
  width: 170px !important;
  height: 40px !important;
  font-size: 15px !important;
  line-height: 40px !important;
  background: #eea63f !important;
  border: 0 !important;
}
</style>
<style lang="less" scoped>
.confirm {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: rgba(242, 244, 246, 1);
  .header {
    margin-bottom: 20px;
  }
  .address {
    margin: 0 auto;
    margin-top: 65px;
    padding-top: 11px;
    width: 96%;
    height: 92px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 15px;
    .dizhi {
      width: 100%;
      /* display: flex;
      justify-content: space-between; */
      .left {
        margin-left: 10px;
        width: 59px;
        text-align: left;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
      }
      .right {
        margin-right: 10px;
        width: 105px;
        height: 20px;
        font-size: 12px;
        text-align: right;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(240, 143, 3, 1);
        line-height: 20px;
        span {
          width: 10px;
          height: 10px;
          border: 1px solid rgba(240, 143, 3, 1);
          border-radius: 50%;
        }
      }
      .context {
        display: inline-block;
        margin: 10px auto;
        padding-left: 20px;
        width: 94%;
        height: 40px;
        background: rgba(247, 181, 0, 0.1);
        border-radius: 4px;
        border: 1px solid rgba(240, 143, 3, 1);
        font-size: 12px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(0, 0, 0, 0.85);
        line-height: 17px;
      }
    }
  }
  .div {
    height: 15px;
  }

  .commoditys {
    width: 96%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    .commodity {
      height: 130px;
      border-bottom: 1px solid rgba(242, 244, 246, 1);
      display: flex;
      flex-direction: row;
      align-items: center;
      .commodity-img {
        width: 100px;
        height: 100px;
        background: rgba(216, 216, 216, 1);
        border-radius: 1px;
      }

      .commodity-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100px;
        margin-left: 15px;
        margin-right: 14px;
        .commodity-name {
          // height: 21px;
          font-size: 15px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          line-height: 21px;
        }

        .commodity-type {
          margin-top: 7px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Light;
          font-weight: 300;
          color: rgba(0, 0, 0, 0.85);
          line-height: 18px;
        }

        .commodity-mo {
          display: flex;
          flex: 1;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-end;
          .money {
            height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.85);
            line-height: 22px;
          }
        }
      }
    }
    .coupon {
      display: flex;
      height: 50px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .good {
        display: flex;
        flex-direction: row;
        align-items: center;
        .goods {
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Light;
          font-weight: 300;
          color: rgba(0, 0, 0, 0.85);
          line-height: 18px;
        }

        .goods-img {
          margin-left: 10px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .totals {
    width: 96%;
    box-sizing: border-box;
    padding: 10px 10px 0;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .total {
      padding-bottom: 10px;
      /* display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between; */
      .discount {
        float: left;
        text-align: left;
        height: 18px;
        font-size: 13px;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(0, 0, 0, 0.85);
        line-height: 18px;
      }
      .discount1 {
        float: right;
        width: 130px;
        text-align: right;
        height: 18px;
        font-size: 13px;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(0, 0, 0, 0.85);
        line-height: 18px;
      }
      .discount2 {
        margin-right: 10px;
        float: left;
        height: 18px;
        font-size: 12px;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: #f08f03;
        line-height: 18px;
        background: rgba(255, 187, 0, 0.1);
        border-radius: 2px;
        border: 1px solid rgba(240, 143, 3, 1);
      }
      .total-merchandise {
        float: left;
        text-align: left;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
        margin-top: 15px;
      }

      .total-merchandise-pic {
        float: right;
        text-align: right;
        margin-top: 15px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(238, 166, 63, 1);
        line-height: 22px;
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
}
</style>
