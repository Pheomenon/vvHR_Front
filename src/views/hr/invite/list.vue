<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" align="center">
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="inviteQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="inviteQuery.end"
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
      <el-table-column sortable prop="sex" label="性别" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.sex==1?'男':'女' }}</template>
      </el-table-column>
      <el-table-column sortable prop="isHire" label="是否录用" align="center">
        <template slot-scope="scope">{{ scope.row.isHire==1?'录用':'未录用' }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="登记时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="mini" icon="el-icon-view" @click="check(scope.row.id)" v-if="scope.row.resumeUrl !== null">查看简历</el-button>

          <!-- 点录用以后给employee发个请求把invite里的姓名和性别加入 TODO -->
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-success"
              @click="hire(scope.row.id)"
              v-if="scope.row.isHire!=1"
            >录用</el-button>

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
import inviteApi from "@/api/hr/invite";
import employeeApi from "@/api/hr/employee";
export default {
  data() {
    return {
      list: null,
      total: 0,
      inviteQuery: {},
      page: 1,
      limit: 10,
      invite: {},
      newEmployee:{}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page = 1) {
      this.page = page;
      inviteApi
        .getInviteList(this.inviteQuery, this.page, this.limit)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    resetData() {
      this.inviteQuery = {};
      this.getList();
    },
    deleteById(id) {
      this.$confirm("此操作将删除该记录，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        inviteApi.deleteInviteById(id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    hire(id) {
      this.$confirm("确定录用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        inviteApi.getInviteInfo(id).then(response => {
          this.invite = response.data.invite;
          this.invite.isHire = 1;
          inviteApi.updateInvite(this.invite).then(response => {
            this.$message({
              type: "success",
              message: "录用成功!"
            });
            this.newEmployee.name = this.invite.name
            this.newEmployee.sex = this.invite.sex
            employeeApi.addEmployee(this.newEmployee)
            this.getList();
          });
        });
      });
    },
    check(id) {
      inviteApi.getInviteInfo(id).then(response => {
        this.invite = response.data.invite;
        window.open('http://192.168.56.74:8012/onlinePreview?url='+encodeURIComponent(this.invite.resumeUrl));
      })
    }
  }
};
</script>