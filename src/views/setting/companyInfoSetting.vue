<template>
  <div id="productMenuEdit">
    <div class="head">
      <h2>产品手册设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司LOGO:</span>
          <div class="content">
            <el-upload class="avatar-uploader"
              drag
              action="http://upload.qiniup.com/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeUpload"
              :data="postData"
              :file-list="file_logo"
              ref="uploada_logo">
              <img v-if="logoUrl"
                :src="logoUrl"
                class="logo-img">
              <i v-else
                class="el-icon-plus logo-icon"></i>
            </el-upload>
            <div class="prompt">点击或拖拽至上传框,只能上传jpg/png文件，且不超过6MB</div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司名称:</span>
          <div class="content">
            <el-input placeholder="请输入公司名称"
              class="input-item"
              v-model="client_name"
              disabled
              clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司简介:</span>
          <div class="content">
            <el-input class="input-item"
              style="width:600px;"
              type="textarea"
              placeholder="公司简介在200字以内..."
              v-model="client_about"
              :rows="5"
              maxlength="200">
            </el-input>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司图片:</span>
          <div class="content">
            <el-upload action="http://upload.qiniup.com/"
              class="img-upload"
              drag
              :before-upload="beforeUpload"
              :data="postData"
              :file-list="file_image"
              list-type="picture-card"
              ref="uploada_image">
              <i slot="default"
                class="el-icon-plus"
                style="font-size:30px;"></i>
              <!-- <div slot="file"
                slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div> -->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                :src="dialogImageUrl"
                alt="">
            </el-dialog>
            <div class="prompt">点击或拖拽至上传框,只能上传jpg/png文件，且不超过6MB</div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司电话:</span>
          <div class="content">
            <el-input placeholder="请输入公司电话"
              class="input-item"
              v-model="client_tel">
            </el-input>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司邮箱:</span>
          <div class="content">
            <el-input placeholder="请输入公司邮箱"
              class="input-item"
              v-model="client_email">
            </el-input>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司地址:</span>
          <div class="content">
            <el-input placeholder="请输入公司地址"
              class="input-item"
              v-model="client_address">
            </el-input>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="clearAll">清空</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, companyInfoDetail, companyInfoSetting } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      client_name: '',
      client_about: '',
      client_tel: '',
      client_email: '',
      client_address: '',
      logoUrl: '', // logo图片地址
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      postData: { token: '' },
      file_logo: [],
      file_image: []
    }
  },
  methods: {
    beforeUpload: function (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 6
      // const isReapeat = this.fileArr.find((item) => {
      //   return item.key === file.name
      // })
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 6MB!')
        return false
      }
      // if (isReapeat) {
      //   this.$message.error('不能重复上传图片')
      //   return false
      // }
    },
    handleAvatarSuccess (res, file) {
      console.log(file)
      this.logoUrl = URL.createObjectURL(file.raw)
    },
    clearAll () {
      this.file_logo = []
      this.file_image = []
      this.logoUrl = ''
      this.client_about = ''
      this.client_tel = ''
      this.client_email = ''
      this.client_address = ''
    },
    saveAll () {
      console.log(this.$refs)
      const logoUrl = this.$refs.uploada_logo.uploadFiles.map((items) => { return (items.response ? ('http://zhihui.tlkrzf.com/' + items.response.key) : items.url) })
      const imageUrl = this.$refs.uploada_image.uploadFiles.map((items) => { return (items.response ? ('http://zhihui.tlkrzf.com/' + items.response.key) : items.url) })
      if (logoUrl.length === 0 || !logoUrl) {
        this.$message.error('请上传公司LOGO')
        return
      }
      if (!this.client_name) {
        this.$message.error('请填写公司名称')
        return
      }
      if (!this.client_about) {
        this.$message.error('请填写公司简介')
        return
      }
      if (imageUrl.length === 0 || !imageUrl) {
        this.$message.error('请上传公司图片')
        return
      }
      if (!this.client_tel) {
        this.$message.error('请填写公司电话')
        return
      }
      if (!this.client_email) {
        this.$message.error('请填写公司邮箱')
        return
      }
      if (!this.client_address) {
        this.$message.error('请填写公司地址')
        return
      }
      companyInfoSetting({
        address: this.client_address,
        phone: this.client_tel,
        contacts: '1',
        logo: logoUrl.reverse()[0],
        introduce: this.client_about,
        email: this.client_email,
        images: imageUrl,
        id: window.sessionStorage.getItem('company_id')
      }).then(res => {
        this.$message.success('保存成功')
      })
    }
  },
  created () {
    Promise.all([
      getToken(),
      companyInfoDetail({
        id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      this.postData.token = res[0].data.data
      let companyInfo = res[1].data.data
      this.file_logo.push({
        url: companyInfo.logo
      })
      companyInfo.image.forEach(item => {
        this.file_image.push({
          url: item
        })
      })
      this.logoUrl = companyInfo.logo
      console.log(this.file_logo, this.file_image)
      this.client_name = companyInfo.company_name
      this.client_about = companyInfo.introduce
      this.client_tel = companyInfo.phone
      this.client_email = companyInfo.email
      this.client_address = companyInfo.address
      console.log(this.$refs)
    })
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/css/productMenuEdit.less";
</style>
<style lang="less">
#productMenuEdit {
  .avatar-uploader {
    width: 100px;
    height: 100px;
    .logo-img {
      width: 100px;
      height: 100px;
    }
    .logo-icon {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      margin: 0;
      font-size: 30px;
      color: #8c939d;
    }
  }
  .img-upload {
    width: auto;
    height: auto;
    .el-upload-dragger {
      width: 150px;
      height: 150px;
      border: none;
    }
  }
  .el-upload,
  .el-upload-dragger {
    width: inherit;
    height: inherit;
  }
}
</style>
