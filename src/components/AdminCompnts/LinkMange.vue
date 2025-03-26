<template>
  <div class="">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      bordered
      size="small"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name', 'home', 'des'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record._id]"
              v-model:value="editableData[record._id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'logo'">
          <!-- <a-upload
            v-if="editableData[record._id]"
            v-model:file-list="coverList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="coverBeforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload> -->
          <a-input
            v-if="editableData[record._id]"
            v-model:value="editableData[record._id][column.dataIndex]"
            style="margin: -5px 0"
          />
          <a-avatar v-else :src="record.logo" />
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record._id]">
              <a-typography-link @click="save(editableData[record._id])"
                >保存</a-typography-link
              >
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record._id)"
              >
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record._id)">修改</a>
              <a-popconfirm
                title="Sure to delete?"
                @confirm="delet(record._id, record)"
              >
                <a>删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { cloneDeep } from "lodash-es";
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    width: 1,
    resizable: true,
  },
  {
    title: "首页",
    dataIndex: "home",
    width: 0.5, // Set a fixed width of 100 pixels without 'px'
    resizable: true,
  },
  {
    title: "logo",
    dataIndex: "logo",
    width: 1,
    resizable: true,
  },
  {
    title: "描述",
    dataIndex: "des",
    resizable: true,
    width: 1,
  },
  {
    title: "operation",
    dataIndex: "operation",
    width: 1,
    resizable: true,
  },
];
// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     _id: i.toString(),
//     title: `Edrward ${i}`,
//     home: 32,
//     des: `London Park no. ${i}`,
//     log: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   });
// }
const dataSource = ref([]);
const editableData = reactive({});
const coverList = ref([]);
const imageUrl = ref("");
const loading = ref(false);
axios.get("/get/link").then(({ data }) => {
  dataSource.value = data.data;
});
const edit = (_id) => {
  editableData[_id] = cloneDeep(
    dataSource.value.filter((item) => _id === item._id)[0]
  );
};
const save = (record) => {
  axios.post("/adminServer/link/update", record).then(({ data }) => {
    if (data.code === 0) {
      message.success(data.msg);
    }
  });
  delete editableData[record._id];
};
const cancel = (_id) => {
  delete editableData[_id];
};
const delet = (_id) => {
  axios.delete("/adminServer/link/delete", { _id }).then(({ data }) => {
    if (data.code === 0) {
      message.success(data.msg);
    }
  });
  dataSource.value = dataSource.value.filter((item) => _id !== item._id);
};
const coverBeforeUpload = (file) => {
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
.editable-row-operations a {
  margin-right: 8px;
}
</style>
