<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%" border stripe fit highlight-current-row>
      <el-table-column prop="name" label="部门" width="300" align="center"></el-table-column>
      <el-table-column prop="bz" label="备注" width="700" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/department/edit/'+scope.row.id" width="100">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <!-- scope是表格的所有元素的集合 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import departmentApi from "@/api/hr/department";
export default {
  data() {
    return {
      list: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      departmentApi.getDepartment().then(response => {
        this.list = response.data.rows;
      });
    },
    deleteById(id) {
      this.$confirm("此操作将删除该部门信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        departmentApi.deleteDepartment(id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    }
  }
};
</script>