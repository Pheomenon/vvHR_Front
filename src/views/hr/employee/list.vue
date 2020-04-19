<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" align="center">
      <el-form-item>
        <el-select v-model="employeeQuery.departmentName" placeholder="部门名称">
          <el-option
            v-for="departmentName in departmentNameList"
            :label="departmentName.name"
            :value="departmentName.name"
            :key="departmentName.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="employeeQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="employeeQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table :data="list" style="width: 100%" border stripe fit highlight-current-row>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.sex==1?'男':'女' }}</template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="departmentName" label="所属部门" align="center"></el-table-column>
      <el-table-column prop="tel" label="电话" align="center"></el-table-column>
      <el-table-column prop="createTime" label="修改时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/employee/edit/'+scope.row.id">
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

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import employeeApi from "@/api/hr/employee";
import departmentApi from "@/api/hr/department";
export default {
  data() {
    return {
      list: null,
      total: 0,
      employeeQuery: {},
      page: 1,
      limit: 10,
      departmentNameList: null
    };
  },
  created() {
    this.getList();
    this.departmentName();
  },
  methods: {
    getList(page = 1) {
      this.page = page;
      employeeApi
        .getEmployeeList(this.employeeQuery, this.page, this.limit)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    departmentName() {
      departmentApi.getDepartment().then(response => {
        this.departmentNameList = response.data.rows;
      });
    },
    resetData() {
      this.employeeQuery = {};
      this.getList();
    },
    deleteById(id) {
      this.$confirm("此操作将删除该记录，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        employeeApi.deleteEmployeeById(id).then(response => {
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