<template>
  <div class="introduce">
    <h2>Hellow!</h2>
    <article>
      你好！欢迎来到我的博客！我是一名有点傲娇的WEB前端攻城狮，热衷于研究JavaScript、NodeJs、Vue、React、WebGL、Flutter、Electron……这是我的主页！我会在这里发表一些不成熟的技术文章，记录一些沙雕的日常。博客目前使用的是Vue
      + Nuxt + AntDesignVue + Node + Express +
      MongoDB搭建的，如果对源码感兴趣的话可以
      <a href="https://github.com/nerissa666/Blog" target="_blank">点击这里</a> 。欢迎提出宝贵的建议哦！
    </article>
    <div class="information">
      <div class="base_info">
        <h3 :style="{ margin: '16px 0' }">personal information</h3>
        <a-row :gutter="[16, 40]">
          <template v-for="item in baseInfo" :key="item">
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box—head">{{ item.head }}</div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <div class="gutter-box-content">{{ item.content }}</div>
            </a-col>
          </template>
        </a-row>
      </div>
      <div class="skills">
        <h3 :style="{ margin: '16px 0' }">Skills</h3>
        <h5>HTML5 & CSS3</h5>
        <a-progress
          :percent="90"
          status="active"
          :stroke-color="{
            to: '#6eb3a3',
            from: '#bfe2e6',
          }"
        />
        <h5>Javascript</h5>
        <a-progress
          :percent="80"
          status="active"
          :stroke-color="{
            to: '#6eb3a3',
            from: '#bfe2e6',
          }"
        />
        <h5>NodeJs</h5>
        <a-progress
          :percent="70"
          status="active"
          :stroke-color="{
            to: '#6eb3a3',
            from: '#bfe2e6',
          }"
        />
        <h5>Vue & React & 小程序</h5>
        <a-progress
          :percent="80"
          status="active"
          :stroke-color="{
            to: '#6eb3a3',
            from: '#bfe2e6',
          }"
        />
        <h5>DB & JAVA...</h5>
        <a-progress
          :percent="50"
          status="active"
          :stroke-color="{
            to: '#6eb3a3',
            from: '#bfe2e6',
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const baseInfo = reactive([
  {
    head: "NICKNAME",
    content: "桂霞",
  },
  {
    head: "ADDRESS",
    content: "西安",
  },
  {
    head: "EMAIL",
    content: "190665845@qq.com",
  },
  {
    head: "GITHUB",
    content: "https://github.com/nerissa666/Blog",
  }
]);
</script>
<style scoped lang="scss">
.information {
  display: flex;
  justify-content: space-between;
  > div {
    width: 50%;
  }
}

.gutter-row,
h3,
h5 {
  text-align: left;
}
h3 {
  font-weight: 500;
  font-size: 1.4rem;
  color: #666;
}
h5 {
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 1rem;
}
.ant-row {
  padding-top: 4%;
}
.gutter-box—head {
  color: #000;
  font-weight: 700;
  font-family: Quicksand;
}
.gutter-box-content {
  color: #000;
}
</style>
