<template>
  <div class="">
    <h2>Hellow!</h2>
    <article>
      热门文章推荐。 <a href="">更多文章</a> 请访问文章页（￣︶￣）↗
    </article>
    <div>
      <ul>
        <li
          v-for="item in hotArticleList"
          :key="item._id"
          @click="() => offHandlePreview(item._id)"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.des }}</p>
        </li>
      </ul>
      <!-- <a-row :gutter="[0, 0]">
        <a-col
          class="gutter-row"
          :span="12"
          v-for="(item, index) in hotArticleList"
          :order="index"
          :key="item._id"
        >
          <div class="gutter-box">
            <a-image
              width="100%"
              :height="(index++ / 2) % 2 == 1 ? '666px' : '100%'"

              :src="$formatSRC(item.cover)"

            >
              <template #previewMask>
                <div>
                  <p class="tags">TAG: HTML</p>
                  <a-button
                    type="primary"
                    shape="round"
                    class="view_more"
                    @click="() => offHandlePreview(item._id)"
                  >
                    ViewMore
                  </a-button>
                </div>
              </template>
            </a-image>
            <p class="title">{{ item.title }}</p>
          </div>
        </a-col>
      </a-row> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import axios from "axios";
import { formatSrc } from "@/utils";
const router = useRouter();
const offHandlePreview = (articleId) => {
  router.push("/article/" + articleId);
};
const hotArticleList = reactive([
  // {
  //   tag: "HTML",
  //   articleId: "weoidwofjoewo",
  //   title: "01.React基础知识点",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },
  // {
  //   tag: "HTML",
  //   articleId: "weoidwofjoewo",
  //   title: "02.React基础知识点",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },
  // {
  //   tag: "HTML",
  //   articleId: "weoidwofjoewo",
  //   title: "03.React基础知识点",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },
]);
axios.get("/get/article").then(({ data }) => {
  data
    .reverse()
    .forEach((item, index) => index < 3 && hotArticleList.push(item));
});
</script>

<style scoped lang="scss">
$height: 30px;
.gutter-box {
  position: relative;
  height: 100%;
}
p.title {
  position: absolute;
  transform: translateY(-100%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.1);
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: $height;
  width: 100%;
  line-height: $height;
}
.tags,
.view_more {
  font-weight: 700;
  font-family: Quicksand;
}
.view_more {
  color: #000;
  background-color: #bfe2e6;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.tags {
  margin-bottom: 20px;
  color: #fff;
  font-size: 22px;
}
.ant-row {
  flex-direction: column;
  flex-wrap: wrap;
  height: 666px;
}
.ant-col-12 {
  display: block;
  flex: 0 0 50%;
  max-width: 50%;
  width: 50%;
}
li {
  padding: 10px;
  color: #444;
  font-size: 1rem;
  line-height: 30px;
  text-align: left;
  padding-bottom: 0;
  padding-top: 0;
}
h3 {
  font-weight: 700;
  margin-bottom: 1%;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
    & + p {
      text-decoration: underline;
    }
  }
}
li:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
