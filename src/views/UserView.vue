<template>
  <div class="user">
    <div>
      <h2>修改用户名</h2>
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages-user"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-form-item label="当前用户名：" v-bind="validateInfos.newName">
          <span class="userName">{{ user }}</span>
        </a-form-item>
        <a-form-item name="newName" label="新用户名：">
          <a-input v-model:value="formState.newName" />
        </a-form-item>
      </a-form>
    </div>
    <div>
      <h2>修改密码</h2>
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages-password"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-form-item
          name="passWord"
          label="原密码："
          v-bind="validateInfos.passWord"
        >
          <a-input type="password" v-model:value="formState.passWord" />
        </a-form-item>
        <a-form-item
          name="newPassWord"
          label="新密码："
          v-bind="validateInfos.newPassWord"
        >
          <a-input type="password" v-model:value="formState.newPassWord" />
        </a-form-item>
        <a-form-item
          name="repeatNewPassWord"
          label="确认新密码："
          v-bind="validateInfos.repeatNewPassWord"
        >
          <a-input
            type="password"
            v-model:value="formState.repeatNewPassWord"
          />
        </a-form-item>
      </a-form>
    </div>
    <div>
      <h2>头像上传</h2>
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages-avatar"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
          <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="baseURL + '/personal/photo'"
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
  </div>
</template>

<script setup>
import { reactive, ref, toRaw } from "vue";
import { Form, UploadChangeParam, UploadProps, message } from "ant-design-vue";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();
const useForm = Form.useForm;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
const user = ref(loginInfo?.user);
const baseURL = ref(store.state.baseURL);
const validateMessages = {
  required: "${label} is required!",
  // types: {
  //   email: "${label} is not a valid email!",
  //   number: "${label} is not a valid number!",
  //   name: "${label} must be a valid name!",
  // },
  // number: {
  //   range: "${label} must be between ${min} and ${max}",
  // },
};
const passWordValidator = (_, value) => {
  //长度验证
  if (value.length < 6 || value.length > 18) {
    return Promise.reject(new Error("请输入6~18位的密码"));
  }
  //规则验证
  if (!/^[\w\[\]\/\\~`|<>,.?;':"{}!@#$%^&*()_+=-]+$/.test(value)) {
    return Promise.reject(new Error("不允许的密码字符"));
  }
  return Promise.resolve();
};
const validater = reactive({
  newName: [
    {
      validator: (_, value) => {
        //长度验证
        if (value.length < 2 || value.length > 8) {
          return Promise.reject(new Error("请输入2~8位的用户名"));
        }
        //规则验证
        if (!/^[\w\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]+$/.test(value)) {
          return Promise.reject("只允许 数字 字母 _ 中/日/韩文");
        }
        //不能和原来的一样
        if (value === user) {
          return Promise.reject("用户名没有变化...");
        }
        return Promise.resolve();
      },
      trigger: "change",
    },
  ],
  passWord: [
    {
      validator: passWordValidator,
      trigger: "change",
    },
  ],
  newPassWord: [{ validator: passWordValidator, trigger: "change" }],
  repeatNewPassWord: [
    { validator: passWordValidator, trigger: "change" },
    {
      validator: (_, value) => {
        if (value !== formState.newPassWord) {
          return Promise.reject(new Error("两次密码不一致"));
        }
        return Promise.resolve();
      },
      trigger: "change",
    },
  ],
});

const formState = reactive({
  // name: "",
  newName: "",
  passWord: "",
  newPassWord: "",
  repeatNewPassWord: "",
});
const { validate, validateInfos } = useForm(formState, validater);

const onFinish = () => {
  validate()
    .then((values) => {
      console.log(values, "values");
      Promise.any([
        axios
          .post("/personal/user", {
            user: values.newName,
          })
          .then(({ data }) => {
            message.success(data.msg);
          }),
        axios
          .post("/personal/pass", {
            oldPass: values.passWord,
            pass: values.newPassWord,
          })
          .then(({ data }) => {
            message.success(data.msg);
          }),
      ]).then(() => {
        store.commit("setInfoLogin", null);
        console.log(store.state.infoLogin, 'store.state.infoLogin');
        localStorage.removeItem("loginInfo");
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};

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
.user {
  > div {
    box-shadow: 0 0 4px #ddd;
    margin-bottom: 2%;
    background-color: #fff;
    padding: 2%;
    font-family: Quicksand;
  }
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
    text-align: left;
    font-weight: bold;
    color: #000;
  }
  span.userName {
    color: #bd4147;
    background-color: rgba(27, 31, 35, 0.05);
    font-weight: 700;
  }
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
