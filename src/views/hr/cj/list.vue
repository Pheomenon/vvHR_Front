<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" align="center">
      <el-form-item>
        <el-select v-model="cjQuery.type" placeholder="类型">
          <el-option :value=1 label="奖励" />
          <el-option :value=0 label="惩罚" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="cjQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="cjQuery.end"
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
      <el-table-column prop="type" label="类型" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.type==1?'奖励':'惩罚' }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center"></el-table-column>
      <el-table-column prop="content" label="详细" align="center"></el-table-column>
      <el-table-column prop="money" label="金额" align="center"></el-table-column>
      <el-table-column prop="time" label="时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/cj/edit/'+scope.row.id">
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
import cjApi from "@/api/hr/cj";
export default {
  data() {
    return {
      list: null,
      total: 0,
      cjQuery: {},
      page: 1,
      limit: 10
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page = 1) {
      this.page = page;
      cjApi.getCjList(this.cjQuery, this.page, this.limit).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    resetData() {
      this.cjQuery = {};
      this.getList();
    },
    deleteById(id) {
      this.$confirm("此操作将删除该记录，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        cjApi.deleteCjById(id).then(response => {
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