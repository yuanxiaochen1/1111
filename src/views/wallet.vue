<template>
  <div class="wallet">
    <Header title="物影钱包"></Header>
    <div class="imgBox">
      <img src alt />
      <div>长按识别二维码</div>
      <div>如需查看资产和订单，请前往物影钱包进行查看</div>
    </div>
    <router-link to="./">
      <div class="button">返回</div>
    </router-link>
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
.wallet {
  min-height: 100vh;
  background-color: #f2f4f6;
  overflow: hidden;
  .imgBox {
    background-color: white;
    width: 311px;
    height: 274px;
    margin: 20vh auto 0;
    overflow: hidden;
    img {
      display: block;
      width: 150px;
      height: 150px;
      background: black;
      margin: 30px auto 0;
    }
    div {
      width: 100%;
      text-align: center;
      margin-top: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 19px;
    }
  }
  .button {
    width: 200px;
    height: 50px;
    background: rgba(238, 166, 63, 1);
    border-radius: 25px;
    margin: 40px auto;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    text-align: center;
  }
}
</style>
