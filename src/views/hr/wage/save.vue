<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="所属部门">
        <el-select v-model="wage.department" placeholder="请选择">
          <el-option
            v-for="departmentName in departmentNameList"
            :label="departmentName.name"
            :value="departmentName.name"
            :key="departmentName.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="wage.name" />
      </el-form-item>
      <el-form-item label="月份">
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
      <el-form-item label="基本工资">
        <el-input v-model="wage.basicWage" :rows="10" />
      </el-form-item>
      <el-form-item label="加班次数">
        <el-input v-model="wage.overtime" :rows="10" />
      </el-form-item>
      <el-form-item label="工龄">
        <el-input v-model="wage.age" :rows="10" />
      </el-form-item>
      <el-form-item label="全勤奖">
        <el-input v-model="wage.payCheck" :rows="10" />
      </el-form-item>
      <el-form-item label="缺勤罚款">
        <el-input v-model="wage.payAbsent" :rows="10" />
      </el-form-item>
      <el-form-item label="保险费">
        <el-input v-model="wage.paySafety" :rows="10" />
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
export default {
  data() {
    return {
      wage: {},
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
      wageApi.updateWage(this.wage).then(response => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.$router.push({ path: "/wage/table" });
      });
    },
    saveWage() {
      wageApi.addWage(this.wage).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        //路由到列表页面
        this.$router.push({ path: "/wage/table" });
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