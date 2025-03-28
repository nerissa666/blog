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
        <template v-if="['title', 'des'].includes(column.dataIndex)">
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
        <template v-else-if="column.dataIndex === 'tags'">
          <span>
            <template v-if="editableData[record._id]">
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :closable="Boolean(editableData[record._id])"
                @close="() => closeTag(editableData[record._id].tags, tag)"
                :_id="tag"
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
                :key="tag"
                :_id="tag"
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
        <template v-else-if="column.dataIndex === 'md'">
          <a-upload
            v-if="editableData[record._id]"
            name="file"
            :action="baseURL + '/adminServer/article/md'"
            :max-count="1"
            accept=".md"
            :auto-upload="true"
            :with-credentials="true"
            :customRequest="
              (options) =>
                handleCustomRequest(options, editableData[record._id])
            "
          >
            <a-button>
              <upload-outlined></upload-outlined>
              Select File
            </a-button>
          </a-upload>
          <a :href="'/article/' + record._id" v-else>{{ text }}</a>
        </template>
        <template v-else-if="column.dataIndex === 'cover'">
          <a-upload
            v-if="editableData[record._id]"
            v-model:file-list="coverList"
            name="file"
            accept="image/jpeg,image/png"
            list-type="picture-card"
            :action="baseURL + '/adminServer/article/cover'"
            class="avatar-uploader"
            :show-upload-list="false"
            :with-credentials="true"
            :before-upload="coverBeforeUpload"
            @change="handleChange"
            :max-count="1"
            :customRequest="
              (options) =>
                handleCustomRequest(options, editableData[record._id])
            "
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="avatar"
              width="100%"
              height="100%"
            />
            <div v-else>
              <upload-outlined v-if="loading"></upload-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-avatar v-else :src="record.cover" />
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
              <a-popconfirm title="Sure to delete?" @confirm="delet(record)">
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
import request from "umi-request";
import axios from "axios";
import { useStore } from "vuex";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons-vue";
const store = useStore();
const baseURL = store.state.baseURL;
const columns = [
  {
    title: "标题",
    dataIndex: "title",
    width: "15%",
  },
  {
    title: "描述",
    dataIndex: "des",
    width: "20%",
  },
  {
    title: "TAG",
    _id: "tags",
    dataIndex: "tags",
  },
  {
    title: "md文件",
    _id: "md",
    dataIndex: "md",
  },
  {
    title: "封面图",
    dataIndex: "cover",
    width: "20%",
  },
  {
    title: "operation",
    dataIndex: "operation",
    width: "20%",
  },
];
const dataSource = ref([]);
let editableData = reactive({});
const getArticle = () => {
  axios.get("/get/article").then(({data}) => dataSource.value = data);
};
getArticle();
const edit = (_id) => {
  editableData[_id] = cloneDeep(
    dataSource.value.filter((item) => _id === item._id)[0]
  );
};
const delet = ({ _id: id }) => {
  axios
    .delete("/adminServer/article/delete", {
      data: {
        id,
      },
    })
    .then(() => getArticle());
};

const cancel = (_id) => {
  delete editableData[_id];
};
const closeTag = (tags, tag) => {
  tags.includes(tag) && tags.splice(tags.indexOf(tag), 1);
};
const value = ref("");
const onSearch = (searchValue) => {
  editableData = {}; // reactive 直接修改 ref 使用.value修改
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
  if (!value.value) return getArticle();
};
let tempOptions = {};
const handleCustomRequest = (options, record) => {
  if (options.action.endsWith("md")) {
    record.title = options.file.name;
  }
  // const actionPath = options.action.split('/').pop();
  !tempOptions[record._id]
    ? (tempOptions[record._id] = [options])
    : tempOptions[record._id].push(options);
};

const save = (record) => {
  const tempPromiseAll = [];
  const tempData = {};
  tempOptions[record._id].forEach((item) => {
    const formData = new FormData();
    formData.append("file", item.file);
    tempPromiseAll.push(
      axios
        .post(item.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ url }) => {
          item.onSuccess();
          tempData[record._id] = {
            ...tempData[record._id],
            [item.action.split("/").pop()]: url,
          };
        })
    );
  });
  Promise.all(tempPromiseAll).then(() => {
    axios
      .post("/adminServer/article/update", {
        id: record._id,
        doc: { ...tempData[record._id], des: record.des, title: record.title },
      })
      .then(() => {
        delete editableData[record._id];
        getArticle();
        // tempOptions[record._id] = [];
      });
  });
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
  fileList.value = [file];
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
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const coverList = ref([]);
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
