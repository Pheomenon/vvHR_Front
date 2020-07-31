<template>
  <div class="app-container">
    <el-form label-width="120px" :model="wage" ref="wageForm">
      <!-- <el-form-item
        label="所属部门"
        prop="departmentName"
        :rules="[{ required: true, message: '请输入所属部门', trigger: 'blur' }]"
      >
        <el-select v-model="wage.departmentName" placeholder="请选择">
          <el-option
            v-for="departmentName in departmentNameList"
            :label="departmentName.name"
            :value="departmentName.name"
            :key="departmentName.name"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item
        label="选择部门"
        :rules="[{ required: true, message: '请选择部门', trigger: 'blur' }]"
        prop="departmentName"
      >
        <el-select
          v-model="wage.departmentName"
          placeholder="请选择"
          @change="getEmployeeNameUseDepartment(wage.departmentName)"
        >
          <el-option
            v-for="departmentName in departmentNameList"
            :label="departmentName.name"
            :value="departmentName.name"
            :key="departmentName.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="选择员工"
        prop="name"
        :rules="[{ required: true, message: '请选择员工', trigger: 'blur' }]"
      >
        <el-select
          v-model="wage.name"
          placeholder="请选择"
          @change="getEmployeeIdCardUseName(wage.name)"
        >
          <el-option
            v-for="employeeName in employeeNameList"
            :label="employeeName.name"
            :value="employeeName.name"
            :key="employeeName.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="idCard"
        :rules="[{ required: true, message: '请选择', trigger: 'blur' }]"
      >
        <el-select v-model="wage.idCard" placeholder="请选择">
          <el-option
            v-for="employeeIdCard in employeeIdCardList"
            :label="employeeIdCard.idCard"
            :value="employeeIdCard.idCard"
            :key="employeeIdCard.idCard"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item
        label="姓名"
        prop="name"
        :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },{validator: checkExist, trigger: 'blur'}]"
      >
        <el-col :span="3">
          <el-input v-model="wage.name" maxlength="20" />
      </el-col>-->
      <!-- </el-form-item> -->
      <!-- <el-form-item
        label="年份"
        prop="year"
        :rules="[{ required: true, message: '请输入年份', trigger: 'blur' },{validator: checkYear, trigger: 'blur'}]"
      >
        <el-col :span="3">
          <el-input v-model="wage.year" maxlength="20" />
        </el-col>
      </el-form-item>
      <el-form-item
        label="月份"
        prop="month"
        :rules="[{ required: true, message: '请输入月份', trigger: 'blur' }]"
      >
        <el-select v-model="wage.month" placeholder="请选择">
          <el-option :value=1 label="一月" />
          <el-option :value=2 label="二月" />
          <el-option :value=3 label="三月" />
          <el-option :value=4 label="四月" />
          <el-option :value=5 label="五月" />
          <el-option :value=6 label="六月" />
          <el-option :value=7 label="七月" />
          <el-option :value=8 label="八月" />
          <el-option :value=9 label="九月" />
          <el-option :value=10 label="十月" />
          <el-option :value=11 label="十一月" />
          <el-option :value=12 label="十二月" />
        </el-select>
      </el-form-item>-->
      <el-form-item
        label="日期"
        prop="date"
        :rules="[{ required: true, message: '请输入日期', trigger: 'blur' }]"
      >
        <el-date-picker
          v-model="wage.date"
          align="right"
          type="date"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="基本工资"
        prop="basicWage"
        :rules="[{ required: true, message: '该项为必填项', trigger: 'blur' },{validator: checkBasicWage, trigger: 'blur'}]"
      >
        <el-input-number v-model="wage.basicWage" :rows="10" :precision="2" :step="1" />
      </el-form-item>
      <el-form-item
        label="加班费"
        prop="overtime"
        :rules="[{ required: false, message: '该项为必填项', trigger: 'blur' },{validator: checkOvertime, trigger: 'blur'}]"
      >
        <el-input-number v-model="wage.overtime" :rows="10" :precision="2" :step="1" />
      </el-form-item>

      <el-form-item
        label="全勤奖"
        prop="payCheck"
        :rules="[{ required: false, message: '该项为必填项', trigger: 'blur' },{validator: checkPayCheck, trigger: 'blur'}]"
      >
        <el-input-number v-model="wage.payCheck" :rows="10" :precision="2" :step="1" />
      </el-form-item>
      <!-- <el-form-item label="罚款">
        <el-input-number
          v-model="wage.payAbsent"
          :rows="10"
          :precision="2"
          :step="1"
          max="10000"
          min="0"
        />
      </el-form-item>
      <el-form-item label="保险费">
        <el-input-number
          v-model="wage.paySafety"
          :rows="10"
          :precision="2"
          :step="1"
          max="10000"
          min="0"
        />
      </el-form-item>-->

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
      // departmentNameList: null,
      departmentNameList: {},
      employeeNameList: {},
      employeeIdCardList: {},
      flag: "",
      message: "",
      employeeLevel: "",
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() >
            new Date(new Date().setMonth(new Date().getMonth() + 1))
          );
        }
      }
    };
  },
  created() {
    this.init();
    this.departmentName();
    this.getList();
  },
  watch: {
    $route(to, from) {
      // 表示路由变化的方式,路由发生变化方法就会执行
      this.init();
    }
  },
  methods: {
    getList() {
      departmentApi.getDepartment().then(response => {
        this.departmentNameList = response.data.rows;
      });
    },
    checkExist(rule, value, callback) {
      employeeApi.employeeExist(value).then(response => {
        this.flag = response.success;
        this.employeeLevel = response.data.level;
        if (this.flag == true) {
          return callback();
        } else {
          return callback(new Error("该员工不存在，请先在员工库中添加员工"));
        }
      });
    },
    checkBasicWage(rule, value, callback) {
      if (this.wage.level == null) {
        employeeApi.getLevelUseIdCard(this.wage.idCard).then(response => {
          this.wage.level = response.data.idCard.level;
        });
      }
      if(value < 0){
        return callback(new Error("当月工资不应为负值"));
      }
      if (this.wage.level == 1) {
        if (value > 3000)
          return callback(new Error("一级员工的薪资不得超过3000元"));
        else return callback();
      }
      if (this.wage.level == 2) {
        if (value > 6000 || value < 3000)
          return callback(
            new Error("二级员工的薪资不得超过6000元,不得少于3000元")
          );
        else return callback();
      }
      if (this.wage.level == 3) {
        if (value > 15000 || value < 6000)
          return callback(
            new Error("三级员工的薪资不得超过15000元,不得少于6000元")
          );
        else return callback();
      }
      if (this.wage.level == 4) {
        if (value > 25000 || value < 15000)
          return callback(
            new Error("四级员工的薪资不得超过25000元,不得少于15000元")
          );
        else return callback();
      }
      if (this.wage.level == 5) {
        if (value < 25000)
          return callback(new Error("五级员工的薪资不得少于25000元"));
        else return callback();
      }
    },
    checkOvertime(rule, value, callback) {
      if(value < 0){
        return callback(new Error("当月加班费不应为负值"));
      }
      if (value > 10000) {
        return callback(new Error("单月加班费不得超过10000元"));
      } else {
        return callback();
      }
    },
    checkPayCheck(rule, value, callback) {
      if(value < 0){
        return callback(new Error("当月全勤奖不应为负值"));
      }
      if (value > 1000) {
        return callback(new Error("单月全勤奖不得超过1000元"));
      } else {
        return callback();
      }
    },
    checkYear(rule, value, callback) {
      if (value > 1970 && value <= parseInt(new Date().getFullYear())) {
        return callback();
      } else {
        return callback(new Error("请输入正确的年份"));
      }
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
    // saveWage() {
    //   this.$refs["wageForm"].validate(valid => {
    //     if (valid) {
    //       employeeApi.checkEmployeeInDepartment(this.wage).then(response => {
    //         if (response.code == 20000) {
    //           wageApi.addWage(this.wage).then(response => {
    //             console.log(this.wage);
    //             this.$message({
    //               type: "success",
    //               message: "添加成功!"
    //             });
    //             this.$router.push({ path: "/wage/table" });
    //           });
    //         }
    //       });
    //     }
    //   });
    // },
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
    },
    getEmployeeNameUseDepartment(departmentName) {
      employeeApi
        .getEmployeeNameUseDepartment(departmentName)
        .then(response => {
          this.employeeNameList = response.data.rows;
        });
    },
    getEmployeeIdCardUseName(employeeName) {
      employeeApi.getEmployeeIdCardUseName(employeeName).then(response => {
        this.employeeIdCardList = response.data.rows;
      });
    }
  }
};
</script>