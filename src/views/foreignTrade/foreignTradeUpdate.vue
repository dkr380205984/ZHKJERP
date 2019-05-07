<template>
  <div id="foreignTradeCreate">
    <div class="head">
      <h2>修改合作公司</h2>
    </div>
    <div class="body">
      <div class="inputCtn">
        <span class="label must">公司名称:</span>
        <el-input class="elInput"
                  placeholder="请输入外贸公司名称"
                  v-model="name"></el-input>
      </div>
      <div class="inputCtn">
        <span class="label">公司简称:</span>
        <el-input class="elInput"
                  placeholder="请输入外贸公司简称"
                  v-model="abbreviation"></el-input>
      </div>
      <div class="inputCtn">
        <span class="label">公司类型:</span>
        <el-select class="elInput"
                   placeholder="请选择公司类型"
                   v-model="type"
                   disabled>
          <el-option v-for="item in companyType"
                     :key="item.value"
                     :value="item.value"
                     :label="item.name"></el-option>
        </el-select>
      </div>
      <div class="inputCtn">
        <span class="label must">人员管理:</span>
        <div class="specialTable">
          <div class="tableHead">
            <div class="once">姓名</div>
            <div class="once">职务</div>
            <div class="once">联系号码</div>
            <div class="once">操作</div>
          </div>
          <div class="tableFirstLine">
            <div class="once"><input class="noborder"
                     placeholder="输入姓名"
                     v-model="contactsName" /></div>
            <div class="once"><input class="noborder"
                     placeholder="输入职务"
                     v-model="contactsStation" /></div>
            <div class="once"><input class="noborder"
                     placeholder="输入联系号码"
                     v-model="contactsPhone" /></div>
            <div class="once"><span class="btns normal"
                    @click="addContacts">添加</span></div>
          </div>
          <div class="tableBody">
            <div class="line"
                 v-for="(item,index) in contacts"
                 :key="index">
              <div class="once">{{item.name}}</div>
              <div class="once">{{item.station}}</div>
              <div class="once">{{item.phone}}</div>
              <div class="once">
                <span class="btns error"
                      @click="deleteContacts(index)">删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">合作状态:</span>
        <div style="display:flex;align-items:center;margin-left:15px;">
          <el-radio v-model="status"
                    label="1">合作中</el-radio>
          <el-radio v-model="status"
                    label="0">暂停合作</el-radio>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">联系电话:</span>
        <el-input class="elInput"
                  placeholder="请输入联系电话"
                  v-model="phone"></el-input>
      </div>
      <div class="inputCtn">
        <span class="label must">公司地址:</span>
        <el-input class="elInput"
                  placeholder="请输入公司地址"
                  v-model="address"></el-input>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
             @click="$router.go(-1)">返回</div>
        <div class="okBtn"
             @click="saveAll">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { companyType } from '@/assets/js/dictionary.js'
import { clientDetail, clientAdd } from '@/assets/js/api.js'
export default {
  data () {
    return {
      name: '',
      abbreviation: '',
      phone: '',
      address: '',
      status: '',
      contacts: [],
      contactsName: '',
      contactsStation: '',
      contactsPhone: '',
      type: '',
      companyType: companyType
    }
  },
  methods: {
    addContacts () {
      if (this.contactsName && this.contactsStation && this.contactsPhone) {
        this.contacts.push({
          name: this.contactsName,
          station: this.contactsStation,
          phone: this.contactsPhone
        })
        this.contactsName = ''
        this.contactsStation = ''
        this.contactsPhone = ''
      } else {
        this.$message.error({
          message: '请完善联系人的信息'
        })
      }
    },
    deleteContacts (index) {
      this.contacts.splice(index, 1)
    },
    saveAll () {
      if (!this.name) {
        this.$message.error({
          message: '请填写公司名称'
        })
        return
      }
      if (!this.type) {
        this.$message.error({
          message: '请选择公司公司类型'
        })
        return
      }
      console.log(this.contacts)
      if (this.contacts.length < 1) {
        this.$message.error({
          message: '合作公司至少有一个联系人'
        })
        return
      }
      clientAdd({
        id: this.$route.params.id,
        company_id: window.sessionStorage.getItem('company_id'),
        name: this.name,
        abbreviation: this.abbreviation,
        contacts: this.contacts,
        phone: this.phone,
        address: this.address,
        status: parseInt(this.status),
        type: this.type
      }).then((res) => {
        console.log(res)
        this.$message.success({
          message: '修改成功'
        })
        this.$router.push('/index/foreignTradeList')
      })
    },
    clearAll () {

    }
  },
  mounted () {
    clientDetail({
      id: this.$route.params.id
    }).then((res) => {
      if (res.data.status) {
        let data = res.data.data
        console.log(data)
        this.name = data.name
        this.address = data.address
        this.abbreviation = data.abbreviation
        this.phone = data.phone
        this.contacts = data.contacts.map((item) => {
          return {
            name: item.name,
            phone: item.phone,
            station: item.station
          }
        })
        this.status = data.status.toString()
        this.companyType.forEach((item) => {
          if (item.value === data.type) {
            this.type = item.value
          }
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/foreignTradeCreate.less";
</style>
