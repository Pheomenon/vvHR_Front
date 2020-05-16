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
      <el-form-item label="金额">
        <el-input-number v-model="cj.money" controls-position="right" min="0" max="10000" />
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
export default {
  data() {
    return {
      cj: {},
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
        this.cj = {};
      }
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
        cjApi.updateCj(this.cj).then(response => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push({ path: "/cj/table" });
        });
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
    }
  }
};
</script>