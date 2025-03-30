<template>
  <div :class="{ left_side: true }">
    <div class="personal_info">
      <div class="top_info">
        <div class="avatar">
          <a-avatar :src="$formatSRC('/file/photo/avatar.jpg')" />
          <div class="name">
            <span>小红帽</span>
            <p>WEB Developer</p>
          </div>
        </div>
        <ul>
          <li v-for="obj in socialList" :key="obj.name">
            <a
              :href="obj.url"
              :title="obj?.title"
              class="iconfont"
              v-html="obj.icon"
              target="_blank"
            />
          </li>
          <li>
            <a-popover placement="bottom" trigger="click">
              <template #content>
                <img
                  :src="formatSrc('/file/photo/wechat.jpg')"
                  alt=""
                  width="100px"
                  height="100px"
                />
              </template>
              <a href="" class="iconfont">&#xe739;</a>
            </a-popover>
          </li>
        </ul>
      </div>
      <div class="bottom_btn">
        <a href="https://github.com/nerissa666" target="_blank">
          <a-button type="primary" shape="round" size="large">
            <template #icon>
              <DownloadOutlined />
            </template>
            Download
          </a-button>
        </a>
      </div>
    </div>
    <div :class="['fakewrapper', { fixed: ifFixed }]">
      <div class="hot_article">
        <!-- <div :class="['hot_article', 'fixed']"> -->
        <h4>Hot Articles</h4>
        <a-list item-layout="horizontal" :data-source="hotArticleList">
          <template #renderItem="{ item, index }">
            <a-list-item>
              <a-list-item-meta :description="item.description">
                <template #title>
                  <a :href="'/article/' + item._id">{{ item.title }}</a>
                </template>
                <template #avatar>
                  <span class="order">{{ index + 1 }}</span>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </div>
      <div class="recent_visitor">
        <h4>最近访客</h4>
        <a-list
          :grid="{ gutter: 6, column: 4 }"
          :data-source="visitorList"
          size="small"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <a-card :title="item.visitor.user">
                <!-- <a-image width="100%" height="100%" :src="$formatSRC(item.visitor?.photo)" /> -->
                <a-image width="100%" height="100%" :src="item.visitor?.photo" />
                <!-- <img
                :src="item.avatar"
                :title="item.description"
                width="100%"
                height="100%"
            /> -->
              </a-card>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, defineEmits, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { DownloadOutlined } from "@ant-design/icons-vue";
import axios from "axios";
const router = useRouter();
let ifFixed = ref(false);
const interceptorSrc = inject('$interceptorSrc')
import { formatSrc } from '@/utils'
const scrollFn = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  ifFixed.value = scrollTop >= 235;
};
scrollFn();
window.addEventListener("scroll", () => {
  scrollFn();
});

const socialList = reactive([
  {
    icon: "&#xe632;",
    name: "GitHub",
    qrCode: "",
    url: "https://github.com/nerissa666",
    title: "",
  },
  {
    icon: "&#xe8db;",
    name: "DouYin",
    className: "douyin",
    qrCode: "",
    url: "https://www.douyin.com/",
    title: "普通人不可见",
  },
  {
    icon: "&#xe60a;",
    name: "WeiBo",
    qrCode: "",
    url: "https://weibo.com/",
    title: "有防火墙！！！",
  },
  // {
  //   icon: "&#xe739;",
  //   name: "WeChat",
  //   qrCode: "@/assets/img/infoSelf/wechat.jpg",
  //   url: "",
  // },
  {
    icon: "&#xe619;",
    name: "QQ",
    qrCode: "",
    url: "https://im.qq.com/index/",
    title: "哎呀，老马关了，呜呜呜...",
  },
]);
const hotArticleList = reactive([
  // {
  //   title: "01.React基础知识点",
  // },
  // {
  //   title: "02.JSX的使用",
  // },
  // {
  //   title: "03.React组件基础",
  // },
]);

const visitorList = reactive([
  // {
  //   name: "Title 16689879",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
  // {
  //   name: "Title 1",
  //   avatar: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  //   description: "This is description",
  // },
]);
axios.get("/get/article").then(({data}) => {
  data.forEach((item, index) => index < 3 && hotArticleList.push(item));
});

axios.get("/get/visitor").then(({data}) => {
  data.forEach((item, index) => index < 12 && visitorList.push(item));
});

</script>
<style scoped lang="scss">
div.fixed {
  position: fixed;
  top: 80px;
  width: 28.7%;
  padding: 6%;
}
// @media screen and (max-width: 1024px) {
//   div.fixed {
//     top: 14%;
//     width: 28.7%;
//     padding: 6%;
//   }
// }

.left_side {
  text-align: center;

  > div, .fakewrapper>div {
    box-shadow: 0 0 4px #ddd;
    margin-bottom: 5%;
    background-color: #fff;
  }
  > div:not(:first-child) ,div.fakewrapper>div{
    padding: 6%;
    text-align: left;
    h4 {
      border-bottom: 1px solid #e8e9e7;
      color: #383937;
      font-size: 1.2rem;
      font-family: Quicksand;
      font-weight: 700;
      padding-bottom: 4%;
      margin-bottom: 3%;
    }
  }
  .personal_info {
    > div {
      padding: 4% 3%;
    }
    .top_info {
      background-color: #bfe2e6;
      .avatar {
        align-items: center;
        gap: 10%;
        display: flex;
        padding: 5%;
        .ant-avatar {
          width: 30%;
          height: 30%;
        }
        .name {
          flex: 1;
          text-align: left;
          font-size: 1.5rem;
          font-weight: bolder;
          letter-spacing: 0.1rem;
          color: #000;
          p {
            font-family: Quicksand;
            color: #555;
            font-weight: 700;
            letter-spacing: 0.1rem;
            font-size: 0.9rem;
            margin-top: 5%;
          }
        }
      }
      ul {
        display: flex;
        padding: 0 0 5% 0;
        li {
          width: 30px;
          &:hover a {
            color: #4096ff;
          }
        }
      }
    }
    .bottom_btn {
      .ant-btn-primary {
        letter-spacing: 0.2rem;
        background-color: #bfe2e6;
        color: #000;
        font-family: Quicksand;
        font-weight: 700;
      }
      .ant-btn-primary:not(:disabled):hover {
        color: #fff;
        background-color: #4096ff;
      }
    }
  }
  .hot_article {
    :deep(
        .ant-list .ant-list-item .ant-list-item-meta .ant-list-item-meta-avatar
      ) {
      margin-inline-end: 16px;
      background-color: #71a598;
      width: 9%;
      border-radius: 50%;
      text-align: center;
      font-weight: 100;
      font-family: Pacifico;
      color: #fff;
      font-size: 1.1rem;
      line-height: 1.3rem;
      height: 1.6rem;
    }

    :deep(
        .ant-list-split
          .ant-list-item:nth-of-type(2)
          .ant-list-item-meta
          .ant-list-item-meta-avatar
      ) {
      background-color: #6eb3a3;
    }
    :deep(
        .ant-list-split
          .ant-list-item:last-of-type
          .ant-list-item-meta
          .ant-list-item-meta-avatar
      ) {
      background-color: #93bbb2;
    }
    .ant-list .ant-list-item .ant-list-item-meta {
      align-items: normal;
    }
    .ant-list .ant-list-item {
      padding: 5% 2%;
    }
  }
  .recent_visitor {
    height: auto;
    h4 {
      font-family: "Microsoft YaHei", serif !important;
    }
    :deep(.ant-card > div),
    :deep(.ant-list .ant-list-item) {
      padding: 0;
    }
    :deep(.ant-card .ant-card-head),
    :deep(.ant-card .ant-card-head .ant-card-head-wrapper) {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #fff;
      border-radius: 8px;
      font-size: 0.8rem;
      text-align: center;
    }
    :deep(.ant-card .ant-card-head .ant-card-head-wrapper) {
      border-radius: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    :deep(.ant-list-grid .ant-col > .ant-list-item) {
      cursor: pointer;
    }
    :deep(.ant-row > div) {
      // width: 22% !important;
    }
    :deep(.ant-list-grid .ant-col > .ant-list-item) {
      margin-block-end: 12%;
    }
  }
}
li {
  flex: 1;
}
.iconfont {
  font-size: 1.5rem;
  color: #525252;
}
h3 {
  margin: 40px 0 0;
}
.ant-list .ant-list-item .ant-list-item-meta .ant-list-item-meta-title > a {
  color: #787977;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.fakewrapper {
  padding: 0 !important;
  background-color: transparent !important;
  > div {
    border: none;
    padding: 6%;
  }

}
</style>
