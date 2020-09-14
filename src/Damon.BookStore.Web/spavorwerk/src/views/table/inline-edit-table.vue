/* eslint-disable no-param-reassign */
<template>
  <div class="app-container">
       <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width:100%">
      <el-table-column align="center" label="ID" width='80'>
        <template slot-scope='{row}'>
          <span>
            {{row.id}}
          </span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope='{row}'>
          <span>
            {{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align='center' label="Author">
        <template slot-scope='{row}'>
          <span>
            {{row.author}}
          </span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance"
          :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

            <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <d-pagination
     v-show="total>0"
     :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
       @pagination="getList" />
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
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      list: null,
      listLoading: true,
      total: 0,
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
      this.total = data.total;
      this.list = items.map((v) => {
        this.$set(v, 'edit', false);
        // eslint-disable-next-line no-param-reassign
        v.originalTitle = v.title;
        return v;
      });
      this.listLoading = false;
    },
    cancelEdit(row) {
      // eslint-disable-next-line no-param-reassign
      row.title = row.originalTitle;
      // eslint-disable-next-line no-param-reassign
      row.edit = false;
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning',
      });
    },
    confirmEdit(row) {
      // eslint-disable-next-line no-param-reassign
      row.edit = false;
      // eslint-disable-next-line no-param-reassign
      row.originalTitle = row.title;
      this.$message({
        message: 'The Title has been edited',
        type: 'success',
      });
    },
    handleDownload(){
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
     formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
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
