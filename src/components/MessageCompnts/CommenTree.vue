<template>
  <div class="">
    <a-comment class="root_comment" v-for="item in rootComment" :key="item.commentId">
      <template #author>
        <a>{{ item.author }}</a>
      </template>
      <template #avatar>
        <a-avatar :src="item.avatar" :alt="item.author" />
      </template>
      <template #content>
        <p>
          {{ item.content }}
        </p>
        <div class="action_hobby">
          <i
            class="iconfont icon-xinaixin"
            :class="item.likeList.includes('xgx') && 'like'"
            @click.stop="() => handleLike(item.likeList)"
          />
          <span>{{ item.likeList.length }}</span>
          <i class="iconfont icon-huifu" @click.stop="switchPanel" />
          <div class="action_comment">
            <a-textarea maxlength="100" />
            <a-button type="primary" size="small" @click.stop="onSubmit"
              >发送</a-button
            >
          </div>
        </div>
      </template>
      <template #datetime>
        <a-tooltip :title="item.date">
          <span>{{ item.date }}</span>
        </a-tooltip>
      </template>
      <a-comment class="child_comment" v-for="child in item.childrens" :key="child.commentId">
        <template #actions v-if="child?.replyTo">
          <span>Reply to: {{ child.replyTo }}</span>
        </template>
        <template #author>
          <a>{{ child.author }}</a>
        </template>
        <template #avatar>
          <a-avatar :src="child.avatar" :alt="child.author" />
        </template>
        <template #content>
          <p>
            {{ child.content }}
          </p>
          <div class="action_hobby">
            <i
              class="iconfont icon-xinaixin"
              :class="child.likeList.includes('xgx') && 'like'"
              @click.stop="() => handleLike(child.likeList)"
            />
            <span>{{ child.likeList.length }}</span>
            <i class="iconfont icon-huifu" @click.stop="switchPanel" />
            <div class="action_comment">
              <a-textarea maxlength="100" />
              <a-button type="primary" size="small" @click.stop="onSubmit"
                >发送</a-button
              >
            </div>
          </div>
        </template>
        <template #datetime>
          <a-tooltip :title="child.date">
            <span>{{ child.date }}</span>
          </a-tooltip>
        </template>
        <a-comment
          v-for="grandSon in child.childrens"
          :key="grandSon.commentId"
        >
          <template #actions v-if="grandSon?.replyTo">
            <span>Reply to: {{ grandSon.replyTo }}</span>
          </template>
          <template #author>
            <a>{{ grandSon.author }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="grandSon.avatar" :alt="grandSon.author" />
          </template>
          <template #content>
            <p>
              {{ grandSon.content }}
            </p>
            <div class="action_hobby">
              <i
                class="iconfont icon-xinaixin"
                :class="grandSon.likeList.includes('xgx') && 'like'"
                @click.stop="() => handleLike(grandSon.likeList)"
              />
              <span>{{ grandSon.likeList.length }}</span>
              <i class="iconfont icon-huifu" @click.stop="switchPanel" />
              <div class="action_comment">
                <a-textarea maxlength="100" />
                <a-button type="primary" size="small" @click="onSubmit"
                  >发送</a-button
                >
              </div>
            </div>
          </template>
          <template #datetime>
            <a-tooltip :title="grandSon.date">
              <span>{{ grandSon.date }}</span>
            </a-tooltip>
          </template>
        </a-comment>
      </a-comment>
    </a-comment>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const rootComment = reactive([
  {
    commentId: "1",
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    date: "YYYY-MM-DD HH:mm:ss",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
    likeList: ["Han Solo", "xgx", "颉桂霞"],
    childrens: [
      {
        commentId: "2",
        author: "ewfwf",
        date: "YYYY-MM-DD HH:mm:ss",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
        likeList: ["Han Solo", "xgx", "颉桂霞"],
        childrens: [
          {
            commentId: "5",
            author: "34r",
            avatar: "https://joeschmoe.io/api/v1/random",
            date: "YYYY-MM-DD HH:mm:ss",
            content:
              "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
            likeList: ["Han Solo", "xgx", "颉桂霞"],
          },
          {
            commentId: "6",
            author: "ewfwf",
            date: "YYYY-MM-DD HH:mm:ss",
            replyTo: "34r",
            avatar: "https://joeschmoe.io/api/v1/random",
            content:
              "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
            likeList: ["Han Solo", "xgx", "颉桂霞"],
          },
        ],
      },
      {
        commentId: "3",
        author: "wrefreg3",
        date: "YYYY-MM-DD HH:mm:ss",
        replyTo: "ewfwf",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
        likeList: ["xgx", "颉桂霞"],
      },
      {
        commentId: "4",
        author: "34543653",
        avatar: "https://joeschmoe.io/api/v1/random",
        date: "YYYY-MM-DD HH:mm:ss",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
        likeList: ["Han Solo"],
      },
    ],
  },
  {
    commentId: "1",
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    date: "YYYY-MM-DD HH:mm:ss",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
    likeList: ["Han Solo", "xgx", "颉桂霞"],
  }
]);
const handleLike = (likeList) => {
  if (likeList.includes("xgx")) {
    const index = likeList.indexOf("xgx");
    likeList.splice(index, 1);
  } else {
    likeList.push("xgx");
  }
};
const switchPanel = ($event) => {
  $event.target.nextSibling.style.height == "auto"
    ? ($event.target.nextSibling.style.height = "0")
    : ($event.target.nextSibling.style.height = "auto");
};
const onSubmit = () => {};
</script>

<style scoped lang="scss">
.action_hobby {
  margin: 10px 0;
  letter-spacing: 5px;
  span {
    font-size: 12px;
    color: #aaa;
  }

  i {
    &:nth-of-type(2) {
      margin-left: 20px;
    }
    cursor: pointer;
    font-size: 14px;
    color: #aaa;
  }
  i.like {
    color: #f30606;
  }
}
.action_comment {
  overflow: hidden;
  height: 0;
  text-align: right;
  .ant-input {
    margin-bottom: 6px;
  }
}
:deep(.ant-comment .ant-comment-content-author-name > a) {
  color: #000;
}
.root_comment {
  border-bottom: 1px dashed  #ddd;
}
.child_comment {
  border-bottom: 1px dotted  #ddd;

}
.ant-comment-content-detail > p {
  color: #666;
  letter-spacing: 2px;
  word-break: break-word;
}
:deep(.ant-comment .ant-comment-inner) {
  padding: 0;
  margin: 10px 0;
}
</style>
