<template>
  <div class="">
    <a-comment class="root_comment" v-for="item in rootComment" :key="item._id">
      <template #author>
        <a>{{ item.author.user }}</a>
      </template>
      <template #avatar>
        <a-avatar :src="item.author.photo" :alt="item.author.user" />
      </template>
      <template #content>
        <p>
          {{ item.text }}
        </p>
        <div class="action_hobby">
          <i
            class="iconfont icon-xinaixin"
            :class="item.likes.includes('67e0b96ecd5c97cd4fd85d97') && 'like'"
            @click.stop="() => handleLike(item)"
          />
          <span>{{ item.likes.length }}</span>
          <i class="iconfont icon-huifu" @click.stop="() => item.openPanel = !item?.openPanel" />
          <div :class="['action_comment', item?.openPanel ? 'open_panel' : 'close_panel']">
            <a-form :model="item" @submit="() => onSubmit(item)">
              <a-textarea :maxlength="100" v-model:value="item.val" />
              <a-button type="primary" size="small" html-type="submit"
                >发送</a-button
              ></a-form
            >
          </div>
        </div>
      </template>
      <template #datetime>
        <a-tooltip :title="item.date">
          <span>{{ formatDate(item.date) }}</span>
        </a-tooltip>
      </template>
      <a-comment
        class="child_comment"
        v-for="child in item.children"
        :key="child._id"
      >
        <template #actions v-if="child?.replyUser">
          <span>Reply to: {{ child.replyUser.user }}</span>
        </template>
        <template #author>
          <a>{{ child.author.user }}</a>
        </template>
        <template #avatar>
          <a-avatar :src="child.author.photo" :alt="child.author.photo" />
        </template>
        <template #content>
          <p>
            {{ child.text }}
          </p>
          <div class="action_hobby">
            <i
              class="iconfont icon-xinaixin"
              :class="
                child.likes.includes('67e0b96ecd5c97cd4fd85d97') && 'like'
              "
              @click.stop="() => handleLike(child)"
            />
            <span>{{ child.likes.length }}</span>
            <i class="iconfont icon-huifu" @click.stop="() => child.openPanel = !child?.openPanel" />
            <div :class="['action_comment', child?.openPanel ? 'open_panel' : 'close_panel']">
              <a-form :model="child" @submit="() => onSubmit(child, item._id)">
              <a-textarea maxlength="100" v-model:value="child.val" />
              <a-button type="primary" size="small" html-type="submit"
                >发送</a-button
              ></a-form>
            </div>
          </div>
        </template>
        <template #datetime>
          <a-tooltip :title="child.date">
            <span>{{ formatDate(child.date) }}</span>
          </a-tooltip>
        </template>
        <a-comment
          v-for="grandSon in child?.childrens"
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
                :class="
                  grandSon.likeList.includes('67e0b96ecd5c97cd4fd85d97') &&
                  'like'
                "
                @click.stop="() => handleLike(grandSon)"
              />
              <span>{{ grandSon.likeList.length }}</span>
              <i class="iconfont icon-huifu" @click.stop="() => grandSon.openPanel = !grandSon?.openPanel" />
              <div :class="['action_comment', grandSon.openPanel ? 'open_panel' : 'close_panel']" >
                <a-form :model="grandSon" @submit="() => onSubmit(grandSon, item._id)">
                <a-textarea maxlength="100" v-model:value="grandSon.val" />
                <a-button type="primary" size="small" html-type="submit"
                  >发送</a-button
                >
                </a-form>
              </div>
            </div>
          </template>
          <template #datetime>
            <a-tooltip :title="grandSon.date">
              <span>{{ formatDate(grandSon.date) }}</span>
            </a-tooltip>
          </template>
        </a-comment>
      </a-comment>
    </a-comment>
  </div>
</template>

<script setup>
import axios from "axios";
import {
  reactive,
  onMounted,
  defineExpose,
  onUpdated,
  onBeforeUpdate,
} from "vue";
import { message } from "ant-design-vue";
const rootComment = reactive([
  // {
  //   commentId: "1",
  //   author: "Han Solo",
  //   avatar: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   date: "YYYY-MM-DD HH:mm:ss",
  //   content:
  //     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
  //   likeList: ["Han Solo", "xgx", "小红帽"],
  //   childrens: [
  //     {
  //       commentId: "2",
  //       author: "ewfwf",
  //       date: "YYYY-MM-DD HH:mm:ss",
  //       avatar: "https://joeschmoe.io/api/v1/random",
  //       content:
  //         "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
  //       likeList: ["Han Solo", "xgx", "小红帽"],
  //       childrens: [
  //         {
  //           commentId: "5",
  //           author: "34r",
  //           avatar: "https://joeschmoe.io/api/v1/random",
  //           date: "YYYY-MM-DD HH:mm:ss",
  //           content:
  //             "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
  //           likeList: ["Han Solo", "xgx", "小红帽"],
  //         },
  //         {
  //           commentId: "6",
  //           author: "ewfwf",
  //           date: "YYYY-MM-DD HH:mm:ss",
  //           replyTo: "34r",
  //           avatar: "https://joeschmoe.io/api/v1/random",
  //           content:
  //             "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
  //           likeList: ["Han Solo", "xgx", "小红帽"],
  //         },
  //       ],
  //     },
  //     {
  //       commentId: "3",
  //       author: "wrefreg3",
  //       date: "YYYY-MM-DD HH:mm:ss",
  //       replyTo: "ewfwf",
  //       avatar: "https://joeschmoe.io/api/v1/random",
  //       content:
  //         "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
  //       likeList: ["xgx", "小红帽"],
  //     },
  //     {
  //       commentId: "4",
  //       author: "34543653",
  //       avatar: "https://joeschmoe.io/api/v1/random",
  //       date: "YYYY-MM-DD HH:mm:ss",
  //       content:
  //         "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
  //       likeList: ["Han Solo"],
  //     },
  //   ],
  // },
  // {
  //   commentId: "1",
  //   author: "Han Solo",
  //   avatar: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   date: "YYYY-MM-DD HH:mm:ss",
  //   content:
  //     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).",
  //   likeList: ["Han Solo", "xgx", "小红帽"],
  // }
]);
const getComment = () => {
  axios
    .get("/get/msg")
    .then(({ data }) => {
      rootComment.length = 0;
      data.data.forEach((item, index) => {
        rootComment.push(item);
      });
    })
    .catch((err) => {
    });
};

defineExpose({
  getComment,
});
onMounted(() => {
  getComment();
});

const handleLike = ({ _id: id }) => {
  axios
    .post("/msg/like/parent", { id })
    .then(({ data: { msg } }) => {
      message.success(msg);
      getComment();
    })
    .catch((err) => {
      message.error(err.msg);
    });
};

const onSubmit = async ({_id: id, author,val}, parentId) => {
  axios
    .post("/msg/reply/submit", { id: parentId || id, replyUser:author._id, text:val })
    .then(async ({ data: { msg } }) => {
      message.success(msg);
      getComment()
    })
    .catch((err) => {
      message.error(err.msg);
    });
};
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};
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
  border-bottom: 1px dashed #ddd;
}
.child_comment {
  border-bottom: 1px dotted #ddd;
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
.open_panel {
  height: auto;
}
.close_panel {
  height: 0;
}
</style>
