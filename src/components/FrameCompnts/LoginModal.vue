<template>
  <a-modal v-model:open="visible" title="" centered :footer="null">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="login" tab="登录">
        <a-form
          :model="formLogin"
          :rules="rulesLogin"
          layout="horizontal"
          :label-col="labelCol"
          @finish="LoginFinish"
        >
          <a-form-item label="用户名" name="user" required>
            <a-input v-model:value.trim="formLogin.user" />
          </a-form-item>
          <a-form-item label="密码" name="pass" required>
            <a-input v-model:value.trim="formLogin.pass" type="password" />
          </a-form-item>
          <a-form-item :wrapper-col="{ ...wrapperCol, offset: 10 }">
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="regist" tab="注册" force-render
        ><a-form
          :model="formRegist"
          :rules="rulesRegist"
          layout="horizontal"
          :label-col="labelCol"
          @finish="RegistFinish"
        >
          <a-form-item label="用户名" name="user" required>
            <a-input v-model:value.trim="formRegist.user" />
          </a-form-item>
          <a-form-item label="密码" name="pass" required>
            <a-input v-model:value.trim="formRegist.pass" type="password" />
          </a-form-item>
          <a-form-item label="repeat密码" name="repeatpass" required>
            <a-input
              v-model:value.trim="formRegist.repeatpass"
              type="password"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ ...wrapperCol, offset: 10 }">
            <a-button type="primary" html-type="submit">注册</a-button>
          </a-form-item>
        </a-form></a-tab-pane
      >
    </a-tabs>
  </a-modal>
</template>

<script setup>
import axios from "axios";
import { ref, defineEmits, defineProps, watch } from "vue";
import { message } from "ant-design-vue";
import { useStore, mapState, mapMutations, mapActions } from "vuex";
const props = defineProps({
  modal2Visible: {
    type: Boolean,
    default: false,
  },
});
const labelCol = { style: { width: "20%" } };
const wrapperCol = { span: 14 };
const activeKey = ref("login");
const emit = defineEmits(["update:modal2Visible", "update:isLogin"]);
const formLogin = ref({
  user: "",
  pass: "",
});
const formRegist = ref({
  user: "",
  pass: "",
  repeatpass: "",
});
const rules = {
  user: [
    {
      required: true,
      message: "请输入用户名",
      whitespace: true,
      type: "string",
    },
    {
      validator: (rule, value, callback) => {
        if (value.length < 2 || value.length > 8) {
          return Promise.reject("用户名长度只能是2-8个字符");
        } else if (
          !/^[\u4E00-\u9FA5\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3a-zA-Z0-9]+$/.test(
            value
          )
        ) {
          return Promise.reject("只能包含字母、数字、中文、韩文或日文");
        } else {
          return Promise.resolve();
        }
      },
      trigger: "blur",
    },
  ],
  pass: [
    { required: true, message: "请输入密码", whitespace: true, type: "string" },
    {
      message: "请输入6-8位密码",
      min: 5,
      max: 8,
      trigger: "blur",
    },
  ],
};
const rulesLogin = ref(rules);
const rulesRegist = ref({
  ...rules,
  repeatpass: [
    ...rules.pass,
    {
      validator: (rule, value) => {
        if (value !== formRegist.value.pass) {
          return Promise.reject("两次输入的密码不一致");
        } else {
          return Promise.resolve();
        }
      },
      trigger: "blur",
    },
  ],
});
const store = useStore();
const { infoLogin } = mapState(store, ["infoLogin"]);
const { setInfoLogin } = mapMutations(store, ["setInfoLogin"]);
const LoginFinish = (values) => {
  axios
    .post("/login", values)
    .then(({ data }) => {
      if (data.code === 0) {
        message.success(data.msg);
        visible.value = false;
        localStorage.setItem('loginInfo', JSON.stringify(data.data));
        store.commit('setInfoLogin', data.data);
        emit("update:modal2Visible", visible.value);
        emit("update:isLogin", data.data);
      } else {
        message.error(data.msg);
      }
    })
    .catch((err) => {
      message.error(err.msg);
    });
};
const RegistFinish = (values) => {
  axios.post("/reg", values).then(({ data }) => {
    if (data.code === 0) {
      message.success(data.msg);
      activeKey.value = "login";
    } else {
      message.error(data.msg);
    }
  });
};
watch(
  () => props.modal2Visible,
  (newVal) => {
    emit("update:modal2Visible", newVal);
  }
);
const visible = ref(false);

watch(
  () => props.modal2Visible,
  (newVal) => {
    visible.value = newVal;
  }
);

watch(visible, (newVal) => {
  emit("update:modal2Visible", newVal);
});
</script>
