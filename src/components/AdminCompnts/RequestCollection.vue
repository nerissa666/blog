<template>
  <div class="table-container">
    <a-table bordered :data-source="dataSource" :columns="columns" size="small">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'wechat'">
          <a-image width="100%" :src="record.wechat" />
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-switch
            v-model:checked="record.read"
            @change="() => handleChange(record)"
          />
        </template>
        <template v-else>
          {{ text || " " }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";
const columns = [
  {
    title: "日期",
    dataIndex: "date",
    width: 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 1,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 1,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    width: 1,
  },
  {
    title: "Message",
    dataIndex: "message",
    width: 1,
  },
  {
    title: "Wechat",
    dataIndex: "wechat",
    width: 1,
  },
  {
    title: "operation",
    dataIndex: "operation",
    width: 1,
  },
];
const dataSource = ref([
  // {
  //   requestId: "0",
  //   date: "Edward King 0",
  //   name: 32,
  //   email: "edwardking@yahoo.com",
  //   subject: "London, Park Lane no. 0",
  //   message: "London, Park Lane no. 0",
  //   wechat:
  //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   checked: true,
  // },
  // {
  //   requestId: "0",
  //   date: "Edward King 0",
  //   name: 32,
  //   email: "edwardking@yahoo.com",
  //   subject: "London, Park Lane no. 0",
  //   message: "London, Park Lane no. 0",
  //   wechat:
  //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   checked: true,
  // },
  // {
  //   requestId: "0",
  //   date: "Edward King 0",
  //   name: 32,
  //   email: "edwardking@yahoo.com",
  //   subject: "London, Park Lane no. 0",
  //   message: "London, Park Lane no. 0",
  //   wechat:
  //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   checked: true,
  // },
]);
axios.get("/adminServer/contact").then(({ data }) => {
  dataSource.value = data.data;
});
const handleChange = ({  read, _id: id }) => {
  axios
    .post("/adminServer/contact/read", {
      id,
      read,
    })
    .then(({ data }) => {
      if (data.code === 0) {
        message.success(data.msg);
      }
    });
};
</script>
<style scoped lang="scss">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
