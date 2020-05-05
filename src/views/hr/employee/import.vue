<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="'/static/员工信息表模板.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/employee/importEmployeeInfo'"
          accept=".xlsx"
          name="file"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >{{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      fileUploadBtnText: "批量导入", // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false
    };
  },
  created() {},
  methods: {
    submitUpload() {
      this.$confirm("此操作将批量导入员工信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.importBtnDisabled = true;
        this.loading = true;
        this.$refs.upload.submit();
      });
    },
    fileUploadSuccess() {
      this.loading = false;
      this.$message({
        type: "success",
        message: "导入成功"
      });
      this.$router.push({ path: "/employee/table" });
    },
    //上传失败
    fileUploadError() {
      this.loading = false;
      this.$message({
        type: "error",
        message: "导入失败"
      });
    }
  }
};
</script>