<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}"
               @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload
          class="editor-slide-upload"
          action="#"
         :multiple="true"
         :file-list="fileList"
         :show-file-list="true"
         list-type="picture-card"
          :http-request="upload"
         :on-remove="handleRemove"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {policy} from '@/api/oss'
  import {upload} from "@/api/upload";

  export default {
    name: 'editorSlideUpload',
    props: {
      color: {
        type: String,
        default: '#1890ff'
      }
    },
    data() {
      return {
        dialogVisible: false,
        listObj: {},
        fileList: [],
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        useOss:false, //使用oss->true;使用MinIO->false
        ossUploadUrl:'http://macro-oss.oss-cn-shenzhen.aliyuncs.com',
        minioUploadUrl:'http://localhost:8080/api/v1/minio/upload',
      }
    },
    methods: {
      upload(param) {
        var that = this;
        const formData = new FormData()
        formData.append('file', param.file)
        console.log('param==>', param)
        const url = '/mini/upload/'
        upload(formData).then(data => {
          // console.log('上传图片成功')
          // console.dir(data)
          // this.fileList.push(data.data)
          // that.$emit('success', data.data)

          this.listObj[param.file.uid] = {
            uid: param.file.uid,
            name: param.file.name,
            url: data.data
          }
          // this.listObj.set(param.file.uid, {
          //   uid: param.file.uid,
          //   name: param.file.name,
          //   url: data.data
          // })
        })
      },

      handleSubmit() {
        const arr = Object.keys(this.listObj).map(v => this.listObj[v])
        // if (!this.checkAllSuccess()) {
        //   this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        //   return
        // }
        console.log(arr);
        this.$emit('successCBK', arr);
        this.listObj = {};
        this.fileList = [];
        this.dialogVisible = false;
      },

      handleRemove(file) {
        const uid = file.uid;
        const objKeyArr = Object.keys(this.listObj);
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]];
            return
          }
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .upload-container .editor-slide-upload{
    margin-bottom: 20px;
  }
</style>
