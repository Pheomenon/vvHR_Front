<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="姓名" width:300px>
        <el-col :span="3">
          <el-input v-model="invite.name" width:300px />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="invite.sex" placeholder="请选择">
          <el-option :value="1" label="男" />
          <el-option :value="0" label="女" />
        </el-select>
      </el-form-item>

      <el-form-item label="上传简历" width:300px>
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:4444/file"
          multiple
          limit=1
          accept = ".doc,.docx,.pdf"
          :on-success="bind"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将简历拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传pdf/doc/docx文件，且不超过10MB</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import inviteApi from "@/api/hr/invite";
export default {
  data() {
    return {
      invite: {},
      saveBtnDisabled: false,
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
    bind() {
      inviteApi.bind().then(response => {
        this.invite.id = response.data.id;
      });
    },
    init() {
      //判断路径中是否有ID
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getInfo(id);
      } else {
        //没有ID进入Else分支，也就是执行了save方法，此时要清空表单
        this.invite = {};
      }
    },
    getInfo(id) {
      inviteApi.getInviteInfo(id).then(response => {
        this.invite = response.data.invite;
      });
    },
    saveOrUpdate() {
      if (this.invite.id) {
        this.updateInvite();
      } else {
        this.saveInvite();
      }
    },
    updateInvite() {
      inviteApi.updateInvite(this.invite).then(response => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.$router.push({ path: "/invite/table" });
      });
    },
    saveInvite() {
      inviteApi.addInvite(this.invite).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        //路由到列表页面
        this.$router.push({ path: "/invite/table" });
      });
    }
  }
};
</script>
