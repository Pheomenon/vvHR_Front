<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-col :span="8">
          <el-input v-model="ruleForm.username" maxlength="100"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-col :span="8">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="100"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-col :span="8">
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off" maxlength="100"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span="8">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="100"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-col :span="6">
          <el-input v-model.number="ruleForm.code"></el-input>
        </el-col>
        <el-button type="primary" :disabled="smsButtonDisabled" @click.once="sendVerifyCode()">发送验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import modifyApi from '@/api/hr/modify'
import cookie from 'js-cookie'
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value.toString().length != 6) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        newPassword: "",
        checkPass: "",
        code: "",
        password: "",
        smsButtonDisabled: false,
      },
      rules: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      },
      userForm: {}
    };
  },
  methods: {
    sendVerifyCode(){
        if(this.ruleForm.newPassword == this.ruleForm.checkPass && this.ruleForm.username && this.ruleForm.newPassword){
            this.smsButtonDisabled = true
            this.userForm.username = this.ruleForm.username
            this.userForm.password = this.ruleForm.password
            modifyApi.sendVerifyCode(this.userForm).then(response => {
                this.$message({
                    type: "success",
                    message: response.message
                });
            })
        }
        else{
            this.$message({
                    type: "error",
                    message: "账户信息输入错误"
                });
        }
        
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.userForm.username = this.ruleForm.username
            this.userForm.password = this.ruleForm.newPassword
            this.userForm.code = this.ruleForm.code
            modifyApi.checkVerifyCode(this.userForm).then(response =>{
                cookie.remove('Admin-Token')
                this.$message({
                    type: "success",
                    message: response.message
                });
                this.$router.push({path: "/"})
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>