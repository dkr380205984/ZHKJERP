<template>
  <div id="foreignTradeCreate">
    <div class="head">
      <h2>添加客户</h2>
    </div>
    <div class="body">
      <div class="inputCtn">
        <span class="label must">客户类型:</span>
        <div style="display:flex;align-items:center;margin-left:15px;">
          <el-radio v-model="statusType"
            label="1">个体户</el-radio>
          <el-radio v-model="statusType"
            label="2">公司</el-radio>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">客户名称:</span>
        <el-input class="elInput"
          placeholder="请输入客户名称"
          v-model="name"></el-input>
      </div>
      <div class="inputCtn"
        v-if="statusType !== '1'">
        <span class="label">客户简称:</span>
        <el-input class="elInput"
          placeholder="请输入客户简称"
          v-model="abbreviation"></el-input>
      </div>
      <div class="inputCtn">
        <span class="label must">客户类型:</span>
        <el-select class="elInput"
          multiple
          placeholder="请选择客户类型"
          v-model="type">
          <el-option v-for="item in companyType"
            :key="item.value"
            :value="item.value"
            :label="item.name"></el-option>
        </el-select>
        <!-- <el-cascader :options="companyType"
          v-model="type"
          class="elInput"
          :show-all-levels='false'
          :props="{ multiple: true, expandTrigger: 'hover'  }"
          clearable></el-cascader> -->
      </div>
      <div class="inputCtn"
        v-if="statusType !== '1'">
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
      <div class="inputCtn"
        v-if="statusType !== '1'">
        <span class="label must">合作状态:</span>
        <div style="display:flex;align-items:center;margin-left:15px;">
          <el-radio v-model="status"
            label="1">合作中</el-radio>
          <el-radio v-model="status"
            label="0">暂停合作</el-radio>
        </div>
      </div>
      <div class="inputCtn">
        <span :class="{label:true,must:statusType === '1'}">联系电话:</span>
        <el-input class="elInput"
          placeholder="请输入联系电话"
          v-model="phone"></el-input>
      </div>
      <div class="inputCtn"
        v-if="statusType !== '1'">
        <span class="label">公司地址:</span>
        <el-input class="elInput"
          placeholder="请输入公司地址"
          v-model="address"></el-input>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { companyType } from '@/assets/js/dictionary.js'
import { clientAdd } from '@/assets/js/api.js'
export default {
  data () {
    return {
      name: '',
      abbreviation: '',
      phone: '',
      address: '',
      status: '1',
      contacts: [],
      contactsName: '',
      contactsStation: '',
      contactsPhone: '',
      companyType: companyType,
      type: [],
      statusType: '2',
      lock: true
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
      if (this.lock) {
        if (!this.name) {
          this.$message.error({
            message: '请填写公司名称'
          })
          return
        }
        if (this.type.length === 0) {
          this.$message.error({
            message: '请选择公司公司类型'
          })
          return
        }
        if (this.statusType === '2' && this.contacts.length < 1) {
          this.$message.error({
            message: '合作公司至少有一个联系人'
          })
          return
        }
        if (this.statusType === '1' && !this.phone) {
          this.$message.error({
            message: '请输入联系电话'
          })
          return
        }
        this.lock = false
        clientAdd({
          id: '',
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.name,
          abbreviation: this.abbreviation,
          contacts: this.contacts,
          phone: this.phone,
          address: this.address,
          status: parseInt(this.status),
          type: this.type
        }).then((res) => {
          this.lock = true
          if (res.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.$router.push('/index/foreignTradeList')
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        })
      } else {
        this.$message.warning('请勿频繁操作')
      }
    },
    clearAll () {

    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/foreignTradeCreate.less";
</style>
<style lang="less">
// #foreignTradeCreate {
//   .el-checkbox {
//     margin-right: 0 !important;
//   }
// }
</style>
