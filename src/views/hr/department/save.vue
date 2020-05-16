<template>
  <div class="app-container">
    <el-form label-width="120px" :model="department" ref="departmentForm">
      <el-form-item
        label="部门名称"
        prop="name"
        :rules="[{ required: true, message: '该项为必填项', trigger: 'blur' }]"
      >
        <el-input v-model="department.name" maxlength="30" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="department.bz" :rows="10" type="textarea" maxlength="1000" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import departmentApi from "@/api/hr/department";
export default {
  data() {
    return {
      department: {},
      saveBtnDisabled: false
    };
  },
  created() {
    this.init();
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
        this.department = {};
      }
    },
    getInfo(id) {
      departmentApi.getDepartmentInfo(id).then(response => {
        this.department = response.data.department;
      });
    },
    saveOrUpdate() {
      if (this.department.id) {
        this.updateDepartment();
      } else {
        this.saveDepartment();
      }
    },
    updateDepartment() {
      this.$refs["departmentForm"].validate(valid => {
        if (valid) {
          departmentApi.updateDepartment(this.department).then(response => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.$router.push({ path: "/department/table" });
          });
        }
      });
    },
    saveDepartment() {
      this.$refs["departmentForm"].validate(valid => {
        if (valid) {
          departmentApi.addDepartment(this.department).then(response => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.$router.push({ path: "/department/table" });
          });
        }
      });
    }
  }
};
</script>