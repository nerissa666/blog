<template>
  <div>
    <a-comment class="root_comment">
      <template #author>
        <a>{{ rootComment.author.user }}</a>
      </template>
      <template #avatar>
        <a-avatar
<<<<<<< HEAD
          :src="formatSrc(rootComment.author.photo)"
          :alt="rootComment.author.user"
=======
          :src="$formatSRC(rootComment.author.photo)"
          :alt="$formatSRC(rootComment.author.user)"
>>>>>>> 509820a0a2dcb0a47b8fe17f5da39a5ad40a6db2
        />
      </template>
      <template #content>
        <p>
          {{ rootComment.text }}
        </p>
        <div class="action_hobby">
          <i
            class="iconfont icon-xinaixin"
            :class="rootComment.likes.includes(user) && 'like'"
            @click.stop="
              () =>
                handleLike(
                  {
                    ...rootComment,
                    cID: rootComment._id,
                    ...background,
                  },
                  root
                )
            "
          />
          <span>{{ rootComment.likes.length }}</span>
          <i
            class="iconfont icon-huifu"
            @click.stop="
              () => (openPanel = !openPanel)
            "
          />
          <div
            :class="[
              'action_comment',
              openPanel ? 'open_panel' : 'close_panel',
            ]"
          >
            <InputPanel
              ref="formRef"
              :model="rootComment"
              @rewriteSubmit="(val) => onSubmit({ ...rootComment, val }, background.pID)"
              :rewrite="true"
            />
          </div>
        </div>
      </template>
      <template #datetime>
        <a-tooltip :title="rootComment.date">
          <span>{{ formatDate(rootComment.date) }}</span>
        </a-tooltip>
      </template>
      <slot></slot>
    </a-comment>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from "vue";
import store from "@/store";
import InputPanel from "./InputPanel.vue";

import { formatDate, formatSrc } from "@/utils";
import axios from "axios";
let user = ref(store.getters.user);
watch(store.state.infoLogin, () => {
  user = computed(() => store.getters.user);
});
const formRef = ref(null)
const openPanel = ref(false)
const CancelToken = axios.CancelToken;
const props = defineProps({
  background: {
    type: Object,
    required: true,
    default: () => ({}) // Provide a default value for the prop
  },
  rootComment: {
    type: Object,
    required: true,
  },
  root: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["getComment"]);
const handleLike = ({ _id: id, cID, pID, cIndex }, isParent = false) => {
  isParent &&
    axios
      .post(
        "/msg/like/parent",
        { id },
        {
          cancelToken: new CancelToken((c) => {}),
        }
      )
      .then(({ code, message: msg, name }) => {
        if (code === "ERR_CANCELED") return;
        emit("getComment");
      });
  !isParent &&
    axios
      .post(
        "/msg/like/child",
        {
          cID,
          cIndex,
          pID,
        },
        {
          cancelToken: new CancelToken((c) => {}),
        }
      )
      .then(({ code, message: msg, name }) => {
        if (code === "ERR_CANCELED") return;
        emit("getComment");
      });
};
const onSubmit = async ({ _id: id, author, val, ...res }, parentId) => {
  console.log(id, author, val, res, "id, author, val,res");
  axios
    .post(
      "/msg/reply/submit",
      {
        id: parentId || id,
        replyUser: author._id,
        text: val,
      },
      {
        cancelToken: new CancelToken((c) => {}),
      }
    )
    .then(({ code, message: msg, name }) => {
      if (code === "ERR_CANCELED") return;
      emit("getComment");
      openPanel.value = false;
      formRef.value.clearInput();
    });
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
