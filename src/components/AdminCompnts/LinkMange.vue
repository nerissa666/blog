<template>
  <div class="">
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['title', 'home', 'description'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.linkId]"
              v-model:value="editableData[record.linkId][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'logo'">
          <a-upload
            v-if="editableData[record.linkId]"
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
          </a-upload>
          <a-avatar v-else :src="record.logo" />
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.linkId]">
              <a-typography-link @click="save(record.linkId)"
                >Save</a-typography-link
              >
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record.linkId)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.linkId)">Edit</a>
              <a-popconfirm
                title="Sure to delete?"
                @confirm="delet(record.linkId, record)"
              >
                <a>Delete</a>
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

const columns = [
  {
    title: "名称",
    dataIndex: "title",
    width: "25%",
  },
  {
    title: "首页",
    dataIndex: "home",
    width: "15%",
  },
  {
    title: "logo",
    dataIndex: "logo",
    width: "20%",
  },
  {
    title: "描述",
    dataIndex: "description",
    width: "40%",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    linkId: i.toString(),
    title: `Edrward ${i}`,
    home: 32,
    description: `London Park no. ${i}`,
    log: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  });
}

const dataSource = ref(data);
const editableData = reactive({});
const coverList = ref([]);
const imageUrl = ref('');
const loading = ref(false);

const edit = (linkId) => {
  editableData[linkId] = cloneDeep(
    dataSource.value.filter((item) => linkId === item.linkId)[0]
  );
};
const save = (linkId) => {
  Object.assign(
    dataSource.value.filter((item) => linkId === item.linkId)[0],
    editableData[linkId]
  );
  delete editableData[linkId];
};
const cancel = (linkId) => {
  delete editableData[linkId];
};
const delet = (linkId) => {
  dataSource.value = dataSource.value.filter((item) => linkId !== item.linkId);
};
const coverBeforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const handleChange = (info) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};
</script>

<style scoped lang="scss">
.editable-row-operations a {
  margin-right: 8px;
}
</style>
