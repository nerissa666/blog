<template>
  <div class="">
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="width: 200px"
      allowClear
      @input="handleClear"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['title', 'description'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.articleID]"
              v-model:value="editableData[record.articleID][column.dataIndex]"
              style="margin: -5px 0"
            />

            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'tags'">
          <span>
            <template v-if="editableData[record.articleID]">
              <a-tag
                v-for="tag in record.tags"
                :closable="Boolean(editableData[record.articleID])"
                @close="
                  () => closeTag(editableData[record.articleID].tags, tag)
                "
                :articleID="tag"
                :color="
                  tag === 'loser'
                    ? 'volcano'
                    : tag.length > 5
                    ? 'geekblue'
                    : 'green'
                "
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </template>
            <template v-else>
              <a-tag
                v-for="tag in record.tags"
                :articleID="tag"
                :color="
                  tag === 'loser'
                    ? 'volcano'
                    : tag.length > 5
                    ? 'geekblue'
                    : 'green'
                "
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </template>
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'mdfile'">
          <a-upload
            v-if="editableData[record.articleID]"
            :file-list="fileList"
            :before-upload="beforeUpload"
            @remove="handleRemove"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              Select File
            </a-button>
          </a-upload>
          <a :href="'/article:' + record.articleID" v-else>{{ text }}</a>
        </template>
        <template v-else-if="column.dataIndex === 'cover'">
          <a-upload
            v-if="editableData[record.articleID]"
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
          <a-avatar v-else :src="record.cover" />
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.articleID]">
              <a-typography-link @click="save(record.articleID)"
                >Save</a-typography-link
              >
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record.articleID)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.articleID)">Edit</a>
              <a-popconfirm
                title="Sure to delete?"
                @confirm="delet(record.articleID, record)"
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
import { UploadOutlined,PlusOutlined, LoadingOutlined  } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import request from "umi-request";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    width: "15%",
  },
  {
    title: "描述",
    dataIndex: "description",
    width: "20%",
  },
  {
    title: "TAG",
    articleID: "tags",
    dataIndex: "tags",
  },
  {
    title: "md文件",
    articleID: "mdfile",
    dataIndex: "mdfile",
  },
  {
    title: "封面图",
    dataIndex: "cover",
    width: "20%",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },
];

const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    articleID: i.toString(),
    title: `Edrward ${i}`,
    tags: ["nice", "developer"],
    description: "32",
    cover: "https://www.antdv.com/assets/logo.1ef800a8.svg",
    mdfile: "werewfw",
    // articleID: "123",
  });
}
data.unshift({
  articleID: "wcwrc",
  title: "xgx",
  tags: ["beauty", "developer"],
  description: "16",
  cover: "https://www.antdv.com/assets/logo.1ef800a8.svg",
  mdfile: "123",
  articleID: "123",
});
const dataSource = ref(data);
const editableData = reactive({});

const edit = (articleID) => {
  editableData[articleID] = cloneDeep(
    dataSource.value.filter((item) => articleID === item.articleID)[0]
  );
};
const delet = (articleID, record) => {
  dataSource.value = dataSource.value.filter(
    (item) => articleID !== item.articleID
  );
};
const save = (articleID) => {
  Object.assign(
    dataSource.value.filter((item) => articleID === item.articleID)[0],
    editableData[articleID]
  );
  delete editableData[articleID];
  handleUpload();
};
const cancel = (articleID) => {
  delete editableData[articleID];
};
const closeTag = (tags, tag) => {
  tags.includes(tag) && tags.splice(tags.indexOf(tag), 1);
};
const value = ref("");
const onSearch = (searchValue) => {
  const valReg = new RegExp(".*" + value.value + ".*");
  const tempData = [];
  dataSource.value.filter((item) => {
    for (const val in item) {
      if (typeof item[val] !== "object") {
        if (valReg.test(item[val])) return tempData.push(item);
      } else {
        for (const tag of item[val]) {
          if (valReg.test(tag)) {
            return tempData.push(item);
          }
        }
      }
    }
  });
  dataSource.value = tempData;
};
const handleClear = () => {
  if (!value.value) return (dataSource.value = data);
};

const fileList = ref([]);
const uploading = ref(false);

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload = (file) => {
  fileList.value = [...(fileList.value || []), file];
  return false;
};

const handleUpload = () => {
  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append("files[]", file);
  });
  uploading.value = true;

  // You can use any AJAX library you like
  request("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
    method: "post",
    data: formData,
  })
    .then(() => {
      fileList.value = [];
      uploading.value = false;
      message.success("upload successfully.");
    })
    .catch(() => {
      uploading.value = false;
      message.error("upload failed.");
    });
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const coverList = ref([]);
const loading = ref(false);
const imageUrl = ref('');

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
</script>

<style scoped lang="scss">
.editable-row-operations a {
  margin-right: 8px;
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
