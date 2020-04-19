<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="employee.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="employee.sex" placeholder="请选择">
          <el-option :value="0" label="女" />
          <el-option :value="1" label="男" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="employee.age" :rows="10" />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select v-model="employee.departmentName" placeholder="部门名称">
          <el-option
            v-for="departmentName in departmentNameList"
            :label="departmentName.name"
            :value="departmentName.name"
            :key="departmentName.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="employee.idCard" :rows="10" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="employee.born" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="国籍">
        <el-input v-model="employee.nation" :rows="10" />
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="employee.marriage" placeholder="请选择">
          <el-option :value="0" label="已婚" />
          <el-option :value="1" label="未婚" />
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="employee.politicalStatus" placeholder="请选择">
          <el-option :value="0" label="党员" />
          <el-option :value="1" label="群众" />
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="employee.hometown" :rows="10" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="employee.tel" :rows="10" />
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="employee.address" :rows="10" />
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="employee.speciality" :rows="10" />
      </el-form-item>
      <el-form-item label="学历">
        <el-input v-model="employee.culture" :rows="10" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import employeeApi from "@/api/hr/employee";
import departmentApi from "@/api/hr/department";
export default {
  data() {
    return {
      employee: {},
      saveBtnDisabled: false,
      departmentNameList: null
    };
  },
  created() {
    this.init();
    this.departmentName();
  },
  watch: {
    $route(to, from) {
      // 表示路由变化的方式,路由发生变化方法就会执行
      this.init();
    }
  },
  methods: {
    init() {
      //判断路径中是否有ID
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getInfo(id);
      } else {
        //没有ID进入Else分支，也就是执行了save方法，此时要清空表单
        this.employee = {};
      }
    },
    departmentName() {
      departmentApi.getDepartment().then(response => {
        this.departmentNameList = response.data.rows;
      });
    },
    getInfo(id) {
      employeeApi.getEmployeeInfo(id).then(response => {
        this.employee = response.data.employee;
      });
    },
    saveOrUpdate() {
      if (this.employee.id) {
        this.updateEmployee();
      } else {
        this.saveEmployee();
      }
    },
    updateEmployee() {
      employeeApi.updateEmployee(this.employee).then(response => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.$router.push({ path: "/employee/table" });
      });
    },
    saveEmployee() {
      employeeApi.addEmployee(this.employee).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        //路由到列表页面
        this.$router.push({ path: "/employee/table" });
      });
    }
  }
};
</script>