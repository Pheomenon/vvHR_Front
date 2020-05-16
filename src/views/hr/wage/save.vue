<template>
  <div class="app-container">
    <el-form label-width="120px" :model="wage" ref="wageForm">
      <el-form-item
        label="所属部门"
        prop="department"
        :rules="[{ required: true, message: '请输入所属部门', trigger: 'blur' }]"
      >
        <el-select v-model="wage.department" placeholder="请选择">
          <el-option
            v-for="departmentName in departmentNameList"
            :label="departmentName.name"
            :value="departmentName.name"
            :key="departmentName.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="name"
        :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },{validator: checkExist, trigger: 'blur'}]"
      >
        <el-col :span="3">
          <el-input v-model="wage.name" maxlength="20" />
        </el-col>
      </el-form-item>
      <el-form-item
        label="月份"
        prop="month"
        :rules="[{ required: true, message: '请输入月份', trigger: 'blur' }]"
      >
        <el-select v-model="wage.month" placeholder="请选择">
          <el-option :value="1" label="一月" />
          <el-option :value="2" label="二月" />
          <el-option :value="3" label="三月" />
          <el-option :value="4" label="四月" />
          <el-option :value="5" label="五月" />
          <el-option :value="6" label="六月" />
          <el-option :value="7" label="七月" />
          <el-option :value="8" label="八月" />
          <el-option :value="9" label="九月" />
          <el-option :value="10" label="十月" />
          <el-option :value="11" label="十一月" />
          <el-option :value="12" label="十二月" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="基本工资"
        prop="basicWage"
        :rules="[{ required: true, message: '该项为必填项', trigger: 'blur' }]"
      >
        <el-input-number
          v-model="wage.basicWage"
          :rows="10"
          :precision="2"
          :step="1"
          max="1000000"
          min="0"
        />
      </el-form-item>
      <el-form-item label="加班费">
        <el-input-number
          v-model="wage.overtime"
          :rows="10"
          :precision="2"
          :step="1"
          max="1000000"
          min="0"
        />
      </el-form-item>
      <el-form-item label="全勤奖">
        <el-input-number
          v-model="wage.payCheck"
          :rows="10"
          :precision="2"
          :step="1"
          max="1000000"
          min="0"
        />
      </el-form-item>
      <el-form-item label="缺勤罚款">
        <el-input-number
          v-model="wage.payAbsent"
          :rows="10"
          :precision="2"
          :step="1"
          max="1000000"
          min="0"
        />
      </el-form-item>
      <el-form-item label="保险费">
        <el-input-number
          v-model="wage.paySafety"
          :rows="10"
          :precision="2"
          :step="1"
          max="1000000"
          min="0"
        />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import wageApi from "@/api/hr/wage";
import departmentApi from "@/api/hr/department";
import employeeApi from "@/api/hr/employee";
export default {
  data() {
    return {
      wage: {},
      saveBtnDisabled: false,
      departmentNameList: null,
      flag: "",
      message: ""
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
    checkExist(rule, value, callback) {
      employeeApi.employeeExist(value).then(response => {
        this.flag = response.success;
        if (this.flag == true) {
          return callback();
        } else {
          return callback(new Error("该员工不存在，请先在员工库中添加员工"));
        }
      });
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getInfo(id);
      } else {
        this.wage = {};
      }
    },
    getInfo(id) {
      wageApi.getWageInfo(id).then(response => {
        this.wage = response.data.wage;
      });
    },
    saveOrUpdate() {
      if (this.wage.id) {
        this.updateWage();
      } else {
        this.saveWage();
      }
    },
    updateWage() {
      this.$refs["wageForm"].validate(valid => {
        if (valid) {
          wageApi.updateWage(this.wage).then(response => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.$router.push({ path: "/wage/table" });
          });
        }
      });
    },
    saveWage() {
      this.$refs["wageForm"].validate(valid => {
        if (valid) {
          wageApi.addWage(this.wage).then(response => {
            console.log(this.wage);
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.$router.push({ path: "/wage/table" });
          });
        }
      });
    },
    departmentName() {
      departmentApi.getDepartment().then(response => {
        this.departmentNameList = response.data.rows;
      });
    }
  }
};
</script>