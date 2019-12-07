<template>
  <div class="header">
    <van-icon name="cross" class="left" @click="left" size="27px" />
    <div class="title" v-html="title"></div>
    <van-icon name="ellipsis" class="right" @click="right" size="27px" />
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
import router from "../router/index";
export default {
  props: ["title"],
  data: function() {
    return {};
  },
  methods: {
    left() {
      router.go(-1);
    },
    right() {
      console.log("...");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9999;
  height: 50px;
  min-height: 50px;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  .title {
    width: 260px;
    height: 27px;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(24, 24, 24, 1);
    line-height: 25px;
    margin: 11.5px auto;
  }
  .left {
    height: 27px;
    width: 27px;
    margin: 11.5px 0 0 15px;
  }
  .right {
    height: 27px;
    width: 27px;
    margin: 11.5px 15px 0 0;
  }
}
</style>
