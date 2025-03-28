<template>
  <div class="">
    <CommentBlock
      v-for="item in rootComment"
      :key="item._id"
      :rootComment="item"
      :root="true"
      :background="{}"
      @getComment="getComment"
    >
      <CommentBlock
        v-for="(child,index) in item.children"
        :key="child._id"
        :rootComment="child"
        @getComment="getComment"
        :background="{ cIndex:index, pID: item._id }"
      >
        <!-- <CommentBlock
          v-for="grandSon in child.children"
          :key="grandSon._id"
          :rootComment="grandSon"
          @getComment="getComment"
        >
        </CommentBlock> -->
      </CommentBlock>
    </CommentBlock>
     </div>
</template>

<script setup>
import axios from "axios";
import CommentBlock from "./CommentBlock.vue";
import {
  reactive,
  onMounted,
  defineExpose,
} from "vue";

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
  axios.get("/get/msg").then(({ data }) => {
    rootComment.length = 0;
    data.forEach((item) => rootComment.push(item));
  });
};

defineExpose({
  getComment,
});
onMounted(() => {
  getComment();
});


</script>

