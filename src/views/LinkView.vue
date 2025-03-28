<template>
  <div class="link">
    <div>
      <h2>友链</h2>
      <article>
        请在
        <router-link to="/message">留言区</router-link>
        申请友链，本站友链信息：<br />

        名称：小红帽>.o<br />

        主页：<span>https://nerissa666.xyz</span> <br />

        图标：<span>https://nerissa666.xyz/logo.png</span> <br />

        描述：一名没秃头的前端工程师😆
      </article>
    </div>
    <div class="svg_block">
      <a :href="item.home" v-for="item in linkList" target="_blank" :key="item.home">
        <svg
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
          data-v-32945398=""
        >
          <path
            stroke="red"
            fill="none"
            d="M 300 100 V 0 H 0 V 100 H 300"
            data-v-32945398=""
          />
        </svg>
        <div class="top">
          <template v-if="!item.logo">
            <svg v-html="item.svg" />
          </template>
          <div
            class="img"
            v-else
            :style="{
              backgroundImage: `url(${item.logo})`,
            }"
          />
          <span :class="!item.logo && 'svg_span'">{{ item.name }}</span>
        </div>
        <p>{{ item.des }}</p>
      </a>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
const linkList = ref([]); //图片应该支持svg
axios.get("/get/link").then(({ data }) => {
  // linkList.push(...data); reactive 不能直接赋值
  linkList.value = data;
});
</script>
<style scoped lang="scss">
.link {
  > div {
    box-shadow: 0 0 4px #ddd;
    margin-bottom: 2%;
    background-color: #fff;
    padding: 2%;
    font-family: Quicksand;
  }
  .svg_block {
    display: flex;
    flex-wrap: wrap;
    gap: 2%;
    a {
      position: relative;
      width: 49%;
      background-color: rgba(27, 31, 35, 0.05);
      box-sizing: border-box;
      padding: 0 2%;
      margin: 2% 0;

      &:nth-of-type(1) .img {
        background-position: 49%;
      }
      &:hover > svg path {
        stroke-dashoffset: 0;
      }
      svg {
        position: absolute;
        top: 0;
        left: 0;
        path {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          transition: 1s;
        }
      }
      .top {
        height: 50px;
        display: flex;
        align-items: center;
        color: #409eff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        gap: 5%;
        .img {
          width: 50px;
          height: 50px;
          vertical-align: middle;
          background-repeat: no-repeat;
          background-size: cover;
        }
        svg {
          width: 50px;
          height: 50px;
        }
      }
      > p {
        font-size: 12px;
        height: 60px;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        text-indent: 1rem;
        color: #444;
        letter-spacing: 4px;
        line-height: 30px;
      }
    }
  }
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
    text-align: left;
    font-weight: bold;
    color: #000;
  }
  article {
    color: #444;
    font-size: 1rem;
    letter-spacing: 0.2rem;
    line-height: 30px;
    text-align: left;
    margin-bottom: 1%;
    padding-left: 2rem;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
    span {
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
  }
}
.svg_span {
  text-indent: calc(20% + 50px);
}
h3 {
  margin: 40px 0 0;
}
</style>
