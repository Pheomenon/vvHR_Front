<template>
  <div class="app-container">
    <el-form label-width="120px" :model="cj" ref="cjForm">
      <el-form-item
        label="标题"
        prop="title"
        :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]"
      >
        <el-input v-model="cj.title" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
        :rules="[{ required: true, message: '请选择类型', trigger: 'blur' }]"
      >
        <el-select v-model="cj.type" clearable placeholder="请选择">
          <el-option :value="1" label="奖励" />
          <el-option :value="0" label="惩罚" />
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="money" :rules="[{ required: true, message: '该项为必填项', trigger: 'blur' },{validator: checkMoney, trigger: 'blur'}]">
        <el-input-number v-model="cj.money" controls-position="right" />
      </el-form-item>

      <el-form-item
        label="选择部门"
        :rules="[{ required: true, message: '请选择部门', trigger: 'blur' }]"
        prop="departmentName"
      >
        <el-select
          v-model="cj.departmentName"
          placeholder="请选择"
          @change="getEmployeeNameUseDepartment(cj.departmentName)"
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
        <el-select v-model="cj.name" placeholder="请选择" @change="getEmployeeIdCardUseName(cj.name)">
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
        <el-select v-model="cj.idCard" placeholder="请选择">
          <el-option
            v-for="employeeIdCard in employeeIdCardList"
            :label="employeeIdCard.idCard"
            :value="employeeIdCard.idCard"
            :key="employeeIdCard.idCard"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="日期"
        prop="date"
        :rules="[{ required: true, message: '请输入日期', trigger: 'blur' }]"
      >
        <el-date-picker
          v-model="cj.date"
          align="right"
          type="date"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="奖惩详情">
        <el-input v-model="cj.content" :rows="10" type="textarea" maxlength="1000" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import cjApi from "@/api/hr/cj";
import employeeApi from "@/api/hr/employee";
import departmentApi from "@/api/hr/department";
export default {
  data() {
    return {
      cj: {},
      saveBtnDisabled: false,
      employeeList: {},
      departmentNameList: {},
      employeeNameList: {},
      employeeIdCardList: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > new Date(new Date().setMonth(new Date().getMonth()+1));
        }
      }
    };
  },
  created() {
    this.init();
    this.getList();
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
        this.cj = {};
      }
    },
    getList() {
      departmentApi.getDepartment().then(response => {
        this.departmentNameList = response.data.rows;
      });
    },
    getInfo(id) {
      cjApi.getCjInfo(id).then(response => {
        this.cj = response.data.cj;
      });
    },
    saveOrUpdate() {
      if (this.cj.id) {
        this.updateCj();
      } else {
        this.saveCj();
      }
    },
    updateCj() {
      this.$refs["cjForm"].validate(valid => {
        if (valid) {
          cjApi.updateCj(this.cj).then(response => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.$router.push({ path: "/cj/table" });
          });
        }
      });
    },
    saveCj() {
      this.$refs["cjForm"].validate(valid => {
        if (valid) {
          cjApi.addCj(this.cj).then(response => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.$router.push({ path: "/cj/table" });
          });
        }
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
    },
    checkMoney(rule, value, callback) {
      if (value > 500 || value < 0) {
        return callback(new Error("单次奖惩的金额应在0~500元之间"));
      } else {
        return callback();
      }
    },
  }
};
</script>