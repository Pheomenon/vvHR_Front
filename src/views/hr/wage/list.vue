<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" align="center">
      <el-form-item label="姓名">
        <el-input v-model="wageQuery.name" clearable />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table :data="list" style="width: 100%" border stripe fit highlight-current-row>
      <el-table-column prop="departmentName" label="所属部门" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
      <!-- <el-table-column prop="year" label="年份" width="130" align="center"></el-table-column>
      <el-table-column prop="month" label="月份" width="130" align="center">
          <template slot-scope="scope">{{ month(scope.row.month) }}</template>
      </el-table-column>-->
      <el-table-column sortable prop="id" label="员工编号" width="130" align="center"></el-table-column>
      <!-- <el-table-column prop="idCard" label="身份证号" width="130" align="center"></el-table-column> -->
      <el-table-column sortable prop="date" label="日期" align="center"></el-table-column>
      <el-table-column sortable prop="basicWage" label="基本工资" align="center"></el-table-column>
      <el-table-column sortable prop="overtime" label="加班费" align="center"></el-table-column>
      <el-table-column sortable prop="payCheck" label="全勤奖" align="center"></el-table-column>
      <el-table-column sortable prop="fine" label="罚款" align="center"></el-table-column>
      <el-table-column sortable prop="bonus" label="奖金" align="center"></el-table-column>
      <el-table-column prop="0" label="合计" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.basicWage+scope.row.overtime+scope.row.payCheck-scope.row.fine+scope.row.bonus | numFilter}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <router-link :to="'/wage/edit/'+scope.row.wageId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <!-- scope是表格的所有元素的集合 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteById(scope.row.wageId)"
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
import wageApi from "@/api/hr/wage";
import employeeApi from "@/api/hr/employee";
export default {
  data() {
    return {
      list: null,
      total: 0,
      wageQuery: {},
      page: 1,
      limit: 10,
      employeeList: {}
    };
  },
  created() {
    this.getList();
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    }
  },
  methods: {
    getList(page = 1) {
      this.page = page;
      wageApi
        .getWageList(this.wageQuery, this.page, this.limit)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
      // employeeApi.getEmployeeList(this.wageQuery,this.page,this.limit).then(response => {
      //   this.employeeList = response.data.rows;
      //   for(let key in this.employeeList){
      //     for(let key2 in this.list){
      //       if(key.name == key2.name){
      //         this.list.push(key.portraitUrl)
      //       }
      //     }
      //   }
      // })
    },
    resetData() {
      this.wageQuery = {};
      this.getList();
    },
    deleteById(id) {
      this.$confirm("此操作将删除该记录，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        wageApi.deleteWageById(id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    month(month) {
      if (month == 1) {
        return "一月";
      }
      if (month == 2) {
        return "二月";
      }
      if (month == 3) {
        return "三月";
      }
      if (month == 4) {
        return "四月";
      }
      if (month == 5) {
        return "五月";
      }
      if (month == 6) {
        return "六月";
      }
      if (month == 7) {
        return "七月";
      }
      if (month == 8) {
        return "八月";
      }
      if (month == 9) {
        return "九月";
      }
      if (month == 10) {
        return "十月";
      }
      if (month == 11) {
        return "十一月";
      }
      if (month == 12) {
        return "十二月";
      }
    }
  }
};
</script>