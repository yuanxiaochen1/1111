<template>
  <div class="backups">
    <Header title="添加地址"></Header>
    <div class="bg">
      <div class="backupsid">区块链钱包地址</div>
      <div class="code">
        <img src="../assets/images/mask.png" alt />
      </div>
      <p class="p0">长按识别二维码</p>
      <ul class="copy">
        <li class="p1"><span>&nbsp;！</span></li>
        <li class="copy_text">进入钱包小程序，复制地址后返回粘贴</li>
      </ul>
      <div class="p3">
        接收资产后，您可以在区块链钱包内
        <br />进行 <span>“提货”“转赠”</span>等行为
      </div>
    </div>
    <div class="confoot">
      <span>返回</span>
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
.backups {
  /*  width: 375px;
  height: 800px;*/
  min-height: 100vh;
  width: 100%;
  background: rgba(242, 244, 246, 1);
  .bg {
    margin: 0 auto;
    padding-top: 119px;
    width: 311px;
    height: 390px;
    /*  display: flex;
    flex-direction: column;
    align-items: center; */
    background: url(../assets/images/codebg.png) no-repeat 100%;
    background-size: 311px 390px;
    .backupsid {
      margin-top: -30px;
      /* width: 26%; */
      height: 6%;
      font-size: 4%;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 14px;
    }
    .code {
      width: 150px;
      height: 150px;
      margin-top: 20px;

      img {
        width: 148px;
        height: 149px;
        /* background: rgba(0, 0, 0, 1); */
        /*  border-radius: 4px; */
      }
    }
    .p0 {
      margin-top: 4%;
      /* width: 22.4%; */
      height: 5%;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 17px;
    }
    .copy {
      align-content: center;
      margin-top: 15px;
      /* width: 73%; */
      height: 8%;
      background: rgba(247, 181, 0, 0.1);
      border-radius: 2px;
      border: 1px solid rgba(240, 143, 3, 0.1);
      .p1 {
        display: inline-block;
        /* padding-left: 2px; */
        font-size: 11px;
        width: 12px;
        height: 12px;
        span {
          display: block;
          text-align: right;
          box-sizing: border-box;
          width: 15px;
          height: 14px;
          line-height: 14px;
          color: rgba(240, 143, 3, 1);
          border: 1px solid rgba(240, 143, 3, 1);
          border-radius: 50%;
        }
      }
      .copy_text {
        margin-top: 8px;
        display: inline-block;
        text-align: center;
        margin-left: 8px;
        width: 69%;
        height: 16px;
        font-size: 11px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(240, 143, 3, 1);
        line-height: 16px;
      }
    }
    .p3 {
      text-align: center;
      margin-top: 27px;
      /* width: 274px; */
      /* height: 38px; */
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 19px;
      span {
        color: rgba(238, 166, 63, 1);
      }
    }
  }
  .confoot {
    margin: 0 auto;
    margin-top: -20px;

    width: 53%;
    height: 50px;
    background: rgba(238, 166, 63, 1);
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      /*  width: 37px; */
      height: 25px;
      font-size: 18px;

      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
    }
  }
}
</style>
