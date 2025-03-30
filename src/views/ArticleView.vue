<template>
  <div class="">
    <ul>
      <li v-for="item in dataList" :key="item._id">
        <h2>{{ item.title }}</h2>
        <div class="date">
          <p class="day">{{ new Date(item.date).getDate() }}</p>
          <span>{{ new Date(item.date).getMonth() }}</span
          >&nbsp;&nbsp;&nbsp;
          <span>{{ new Date(item.date).getFullYear() }}</span>
        </div>
        <div class="cover_description">
          <a-image width="50%" height="100%" :src="$formatSRC(item.cover)" />

          <!-- <img :src="$formatSRC(item.cover)" alt="" width="50%" height="100%" style="cursor: pointer;" @click="() => offHandlePreview(item._id)"/> -->

          <div>
            <p>{{ item.des }}</p>
            <div>
              <p>
                浏览量：<span>{{ item.pv }}</span>
              </p>
              <a-button type="primary" @click="() => offHandlePreview(item._id)"
                >阅读全文</a-button
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- <router-view /> -->
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { formatSrc } from '@/utils'
const dataList = reactive([
  // {
  //   title: "01.React基础知识点",
  //   date: "2023-01-01",
  //   description: "React基础知识点讲解",
  //   articleId: 'fewojf ',
  //   cover:
  //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   view: 1,
  // },
  // {
  //   title: "01.React基础知识点",
  //   date: "2023-01-01",
  //   articleId: 'fewojf',
  //   description: "React基础知识点讲解",
  //   cover:
  //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   view: 1,
  // },
  // {
  //   title: "01.React基础知识点",
  //   date: "2023-01-01",
  //   articleId: 'fewojf',
  //   description: "React基础知识点讲解",
  //   cover:
  //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   view: 1,
  // },
]);
axios
  .get("/get/article")
  .then(({ data }) => {
    data.forEach((item) => 
      dataList.push(item));
  })
const router = useRouter();
const offHandlePreview = (articleId) => {
  router.push("/article/" + articleId);
  
};
</script>
<style scoped lang="scss">
li {
  font-family: Quicksand, Microsoft YaHei, sans-serif;
  background-color: #fff;
  padding: 2%;
  margin-bottom: 2%;
  position: relative;
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
  .date {
    position: absolute;
    top: 0;
    right: 10px;
    width: 60px;
    .day {
      font-weight: bolder;
      font-size: 40px;
      text-align: center;
      color: #6bc30d;
    }
  }
  .cover_description {
    padding-top: 2%;
    display: flex;

    > div {
      padding: 0 2% 2%;
      flex: 1;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > div {
        text-align: right;
        p {
          margin-bottom: 1%;
          color: #aaa;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
