<template>
  <div class="">
    <h2 id="admin">CONTACT ME</h2>
    <article>有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</article>
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item
        :name="['user', 'name']"
        label="Name"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item
        :name="['user', 'email']"
        label="Email"
        :rules="[{ type: 'email' }]"
      >
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
      <a-form-item
        :name="['user', 'age']"
        label="Phone Number"
        :rules="[{ type: 'number', length: [5, 11] }]"
      >
        <a-input v-model:value="formState.user.age" />
      </a-form-item>
      <a-form-item :name="['user', 'website']" label="Subject">
        <a-input v-model:value="formState.user.website" />
      </a-form-item>
      <a-form-item :name="['user', 'introduction']" label="Message">
        <a-textarea v-model:value="formState.user.introduction" />
      </a-form-item>
      <a-form-item :name="['user', 'WeChat']" label="WeChat">
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 10 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 14 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const formState = reactive({
  user: {
    name: "",
    age: undefined,
    email: "",
    website: "",
    introduction: "",
  },
});
const onFinish = (values) => {
  console.log("Success:", values);
};
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
// import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref("");

const handleChange = (info) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
</script>

<style scoped lang="scss">
.ant-btn-primary {
  background-color: #bfe2e6;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 2px;
  font-family: Quicksand, "sans-serif";
  color: #000;
}
</style>
