<template>
  <div class="">
    <a-form
      ref="formRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
      :model="formState"
      @finish="onSubmit"
    >
      <a-form-item label="名称" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="首页" name="home">
        <a-input type="url" v-model:value="formState.home" />
      </a-form-item>
      <a-form-item label="描述" name="des">
        <a-textarea :rows="4" v-model:value="formState.des" />
      </a-form-item>
      <a-form-item label="图标" name="logoimg">
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="图标" name="logo">
        <a-input v-model:value="formState.logo" placeholder="本地上传/url/svg" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...wrapperCol, offset: 10 }">
        <a-button type="primary" html-type="submit">确认添加</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import axios from "axios";
import { reactive, ref, toRaw } from "vue";
const labelCol = { style: { width: "120px" } };
const wrapperCol = { span: 14 };

const formState = reactive({
  name: "",
  home: "",
  des: "",
  logo: "",
});
const formRef = ref();
// const rules = {
//   name: [
//     {
//       required: true,
//       message: "Please input Activity name",
//       trigger: "change",
//     },
//     { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
//   ],
//   home: [
//     {
//       required: true,
//       message: "Please select Activity zone",
//       trigger: "change",
//     },
//   ],
//   des: [
//     {
//       required: true,
//       message: "Please pick a date",
//       trigger: "change",
//       type: "object",
//     },
//   ],
//   logo: [
//     {
//       // type: "array",
//       required: true,
//       message: "Please select at least one activity type",
//       trigger: "change",
//     },
//   ],
// };
const onSubmit = () => {
  formRef.value
    .validate()
    .then((values) => {
      axios
        .post("/adminServer/link/add", {
          ...values
        })
        .then(({ data }) => {
          if (data.code === 0) {
            message.success(data.msg);
            formRef.value.resetFields();
          } else {
            message.error(data.msg);
          }
        })
        .catch((error) => {
          message.error("Network Error: Please try again later.");
        });
    })
    .catch((error) => {
    });
};
</script>

<style scoped lang="scss"></style>
