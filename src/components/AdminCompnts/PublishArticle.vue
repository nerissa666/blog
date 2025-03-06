<template>
  <div class="">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
    >
      <a-form-item label="标题：">
        <a-input />
      </a-form-item>

      <a-form-item label="描述：">
        <a-textarea :rows="4" />
      </a-form-item>
      <a-form-item label="md上传：">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
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
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{ ...wrapperCol, offset: 10 }">
        <a-button type="primary" html-type="submit" @click.prevent="onSubmit"
          >发表文章</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const labelCol = { style: { width: "120px" } };
const wrapperCol = { span: 14 };

const onSubmit = () => {
  console.log("submit");
};
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
const fileList = ref([]);
const handleChange = (info) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e) {
  console.log(e);
}
</script>

<style scoped lang="scss"></style>
