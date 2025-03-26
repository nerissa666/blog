<template>
  <div class="link">
    <div>
      <h2>友链</h2>
      <article>
        请在
        <router-link to="/message">留言区</router-link>
        申请友链，本站友链信息：<br />

        名称：小红帽>.o<br />

        主页：<span>http://nerissa.fun</span> <br />

        图标：<span>http://nerissa.fun/logo.png</span> <br />

        描述：一名没秃头的前端工程师😆
      </article>
    </div>
    <div class="svg_block">
      <a :href="item.home" v-for="item in linkList" :key="item.name">
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
const linkList = ref([
  {
    name: "百度",
    home: "https://www.baidu.com/",
    des: "百度一下,你就知道",
    logo: "https://www.baidu.com/img/flexible/logo/pc/result.png",
  },
  {
    name: "抖音",
    home: "https://www.douyin.com/",
    des: "抖音-记录美好生活官方",
    logo: "https://p3-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/logo-horizontal.svg",
  },
  {
    name: "GitHub",
    home: "https://github.com/",
    des: "GitHub · Build software better, together.",
    svg: `<svg height="50" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="50" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
    </svg>`,
  },
]);
axios.get("/get/link").then(({ data }) => {
  // linkList.push(...data.data); reactive 不能直接赋值
  linkList.value = data.data;
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
