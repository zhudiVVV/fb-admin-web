<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <el-form-item label="店铺名称：" prop="name">
        <el-input v-model="brand.name"></el-input>
      </el-form-item>
      <el-form-item label="所属一级分类：" prop="name">
        <el-select v-model="brand.categoryId" placeholder="请选择">
          <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区">
        <el-cascader v-model="brand.areaRegion" :options="regionData"/>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input v-model="brand.area"></el-input>
      </el-form-item>
      <el-form-item label="店铺LOGO：" prop="logo">
        <single-upload v-model="brand.logo" @success="handleUploadLogoSuccess"></single-upload>
      </el-form-item>
      <el-form-item label="店铺Logo大图：">
        <single-upload v-model="brand.bigPic" @success="handleUploadSuccess"></single-upload>
      </el-form-item>

      <el-form-item label="店铺经纬度：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商家联系方式：">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="店铺介绍：">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="brand.brandStory"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="brand.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="brand.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="店铺制造商：">
        <el-radio-group v-model="brand.factoryStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
        <el-button @click="goBack">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createBrand, getBrand, updateBrand} from '@/api/brand'
  import SingleUpload from '@/components/Upload/singleUpload'

  import { provinceAndCityData,regionData,pcTextArr,pcaTextArr, codeToText} from 'element-china-area-data'
  import {productCategoryList} from "@/api/productCate";

  const defaultBrand={
    bigPic: '',
    areaRegion: ["33", "3302", "330212"],
    area: '',
    brandStory: '',
    factoryStatus: 0,
    firstLetter: '',
    logo: '',
    name: '',
    showStatus: 0,
    sort: 0,
    categoryId: null
  };
  export default {
    name: 'BrandDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        categoryList: [],
        regionData,
        brand:Object.assign({}, defaultBrand),
        rules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请输入店铺logo', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ],
        }
      }
    },
    created() {
      this.getProductCategoryList()
      if (this.isEdit) {
        getBrand(this.$route.query.id).then(response => {
          this.brand = response.data;
          if(response.data.areaRegion) {

            this.brand.areaRegion = JSON.parse(response.data.areaRegion).map(s => String(s))
          }
        });
      }else{
        this.brand = Object.assign({},defaultBrand);
      }
    },
    methods: {
      getProductCategoryList() {
        this.$api.productCategoryList(0, {
          pageNum: 1,
          pageSize: 10
        }).then(res => {
          console.dir(res)
          this.categoryList = res.data.content || []
        })
      },
      handleUploadLogoSuccess(src) {
        this.brand.logo = src
      },
      handleUploadSuccess(data) {
        this.brand.bigPic = data
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                this.brand.areaRegion = JSON.stringify(this.brand.areaRegion)
                updateBrand(this.$route.query.id, this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createBrand(this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.brand = Object.assign({},defaultBrand);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({},defaultBrand);
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style>
</style>


