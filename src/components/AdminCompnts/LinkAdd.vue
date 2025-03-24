<template>
  <div class="">
    <a-form
      ref="formRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
      :model="formState"
      :rules="rules"
    >
      <a-form-item label="名称" name="title">
        <a-input />
      </a-form-item>
      <a-form-item label="首页" name="home">
        <a-input type="url" />
      </a-form-item>
      <a-form-item
        label="描述"
        name="description"
      >
        <a-textarea :rows="4" />
      </a-form-item>
      <a-form-item label="图标">
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
        <a-input name="icon" placeholder="本地上传/url/svg" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...wrapperCol, offset: 10 }">
        <a-button type="primary" html-type="submit" @click.stop="onSubmit"
          >确认添加</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { reactive, ref, toRaw } from "vue";
const labelCol = { style: { width: "120px" } };
const wrapperCol = { span: 14 };
const formState = reactive({
  title: "",
  home: "",
  description: "",
  icon: "",
});
const formRef = ref();
const rules = {
  title: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "change",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  home: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "Please pick a date",
      trigger: "change",
      type: "object",
    },
  ],
  icon: [
    {
      // type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("values", formState, toRaw(formState));
    })
    .catch((error) => {
      console.log("error", error);
    });
};
</script>

<style scoped lang="scss"></style>
