<template>
  <div class="">
    <a-form
      :label-col="labelCol"
      :model="formArticle"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
      @finish="onSubmit"
    >
      <a-form-item label="标题：">
        <a-input name="title" v-model:value="formArticle.title" />
      </a-form-item>

      <a-form-item label="描述：">
        <a-textarea name="des" :rows="4" v-model:value="formArticle.des" />
      </a-form-item>
      <a-form-item label="md上传：">
        <a-upload-dragger
          v-model="fileList"
          name="file"
          :multiple="false"
          :action="baseURL + '/adminServer/article/md'"
          @change="handleChange"
          :auto-upload="false"
          accept=".md"
          :maxCount="1"
          :with-credentials="true"
          @drop="handleDrop"
          :customRequest="handleCustomRequest"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </a-upload-dragger>
      </a-form-item>
      <a-form-item label="封面图上传：">
        <a-upload
          name="file"
          :action="baseURL + '/adminServer/article/cover'"
          :max-count="1"
          accept="image/jpeg,image/png"
          list-type="picture-card"
          :with-credentials="true"
          :auto-upload="false"
          :customRequest="handleCustomRequest"
        >
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{ ...wrapperCol, offset: 10 }">
        <a-button type="primary" html-type="submit">发表文章</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const baseURL = store.state.baseURL;
const labelCol = { style: { width: "120px" } };
const wrapperCol = { span: 14 };
const formArticle = reactive({
  cover: "",
  des: "",
  md: "",
  title: "",
});
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
const fileList = ref([]);
let [tempOptions, tempFileObj] = [[], {}];

// const handleSuccess = (response, file, fileList) => {
// };
const handleCustomRequest = (options) => {
  if (options.action.endsWith("md")) {
    formArticle.title = options.file.name;
  }
  tempOptions.push(options);
};
const onSubmit = () => {
  const promiseAll = [];
  tempOptions.forEach((item) => {
    promiseAll.push(
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", item.file);
        axios
          .post(item.action, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          // .then(({ code, url, msg }) => {
          .then((...res) => {
            console.log(res, "res");
            const { code, url, msg } = res[0];
            if (code === 0) {
              if (item.action.endsWith("md")) {
                tempFileObj.md = url;
              } else {
                tempFileObj.cover = url;
              }
              resolve(res)
            } else {
              message.error(msg);
              reject(res)
            }
          });
      })
    );
  });
  Promise.all(promiseAll).then(() => {
    axios
      .post("/adminServer/article/add", {
        ...formArticle,
        ...tempFileObj,
      })
      .then((...res) => {
        const { code, msg, data:{id} } = res[0]
        if (code === 0) {
          message.success(msg);
          router.push("/article/" + id);
        } else {
          message.error(msg);
        }
      });
  });
};
const handleChange = (info) => {
  const status = info.file.status;

  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e) {}
</script>

<style scoped lang="scss"></style>
