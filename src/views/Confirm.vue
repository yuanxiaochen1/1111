<template>
  <div class="confirm">
    <Header title="确认订单"></Header>
    <div class="bg">
      <span class="bgleft">接收地址</span>
      <ul class="bgright">
        <li>怎么添加地址</li>
        <li>
          <span>？</span>
        </li>
      </ul>
      <input type="text" placeholder="请输入物影地址码" />
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
.confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 905px;
  background: rgba(242, 244, 246, 1);
  .bg {
    margin-top: 99px;
    width: 355px;
    height: 92px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    .bgleft {
      float: left;
      margin-left: 10px;
      width: 59px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
    }
    .bgright {
      float: right;
      margin-right: 21px;
      width: 95px;
      height: 17px;
      li {
        margin-left: 2px;
        color: rgba(240, 143, 3, 1);
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        span {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1px solid rgba(240, 143, 3, 1);
        }
      }
    }
  }
}
</style>
