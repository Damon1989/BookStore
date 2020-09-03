<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width:100%">
      <el-table-column align="center" label="ID" width='80'>
        <template slot-scope='{row}'>
          <span>
            {{row.id}}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { fetchList } from '@/api/article'
  ;

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        deaft: 'info',
        deleted: 'danger',
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = await fetchList(this.listQuery);
      const items = data.items;
      console.log(items);
      this.list = items.map((v) => {
        this.$set(v, 'edit', false);
        v.originalTitle = v.title;
        return v;
      });
      this.listLoading = false;
    },
    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning',
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: 'The Title has been edited',
        type: 'success',
      });
    },
  },

};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
