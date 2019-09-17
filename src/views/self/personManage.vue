<template>
  <div id="personManage">
    <div class="head">
      <h2>员工账号管理</h2>
    </div>
    <div class="body">
      <div class="filterMenu">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag v-show="stationVal===''&&groupVal===''&&searchName===''">显示全部</el-tag>
          <el-tag @close="stationVal=''"
            v-show="stationVal!==''"
            closable>{{stationLabel}}</el-tag>
          <el-tag @close="groupVal=''"
            v-show="groupVal!==''"
            closable>{{groupLabel}}</el-tag>
          <el-tag @close="searchName=''"
            v-show="searchName!==''"
            closable>{{searchName}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-input placeholder="请输入手机号或用户姓名"
              v-model="searchName"
              @keydown.native.enter="getAuthList">
              <i slot="suffix"
                class="el-input__icon el-icon-search"
                @click="getAuthList"></i>
            </el-input>
            <el-select v-model="stationVal"
              placeholder="筛选用户岗位">
              <el-option v-for="item in stationArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="groupVal"
              placeholder="筛选用户小组">
              <el-option v-for="item in groupArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="rightFilter">
            <div class="okBtn"
              @click="shadeType='create'">+ 添加新员工</div>
          </div>
        </div>
      </div>
      <div class="tableCtn">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">序号</div>
          <div class="tableColumn">姓名</div>
          <div class="tableColumn">电话号码</div>
          <div class="tableColumn">联系电话</div>
          <div class="tableColumn">用户分组</div>
          <div class="tableColumn">用户岗位</div>
          <div class="tableColumn">注册时间</div>
          <div class="tableColumn flex8">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item,index) in authArr"
          :key="item.id">
          <div class="tableColumn">{{index+1}}</div>
          <div class="tableColumn">{{item.name}}</div>
          <div class="tableColumn">{{item.telephone}}</div>
          <div class="tableColumn">{{item.mobile}}</div>
          <div class="tableColumn">{{item.group}}</div>
          <div class="tableColumn">{{item.station}}</div>
          <div class="tableColumn">{{item.create_time}}</div>
          <div class="tableColumn flex8">
            <span class="btns normal"
              @click="updateAuth(item)">修改</span>
            <span class="btns error"
              v-if="item.status===1"
              @click="banauth(item.id,'禁用')">禁用</span>
            <span class="btns success"
              v-if="item.status===0"
              @click="banauth(item.id,'启用')">启用</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          layout="prev, pager, next,total"
          @current-change="getAuthList"
          :page-size="5"
          :current-page.sync="page"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="shade"
      v-show="shadeType==='create'||shadeType==='update'">
      <div class="main">
        <div class="close"
          @click="shadeType=''">
          <span class="icon">x</span>
        </div>
        <div class="title"
          v-if="shadeType==='create'">新增员工账号</div>
        <div class="title"
          v-if="shadeType==='update'">修改员工信息</div>
        <div class="inputCtn">
          <span class="label"><em>*</em>电话号码:</span>
          <div class="elCtn">
            <el-input v-model="telephone"
              placeholder="请输入用户账号/手机号"></el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>姓名:</span>
          <div class="elCtn">
            <el-input v-model="authName"
              placeholder="请输入用户姓名"></el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>联系电话:</span>
          <div class="elCtn">
            <el-input v-model="mobile"
              placeholder="请输入联系方式"></el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>用户岗位:</span>
          <div class="elCtn">
            <el-select v-model="addStationVal"
              placeholder="请选择">
              <el-option v-for="item in stationArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>用户分组:</span>
          <div class="elCtn">
            <el-select v-model="addGroupVal"
              placeholder="请选择">
              <el-option v-for="item in groupArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="btnCtn">
          <div v-if="shadeType==='create'"
            class="okBtn"
            @click="addauth">添加</div>
          <div v-if="shadeType==='update'"
            class="okBtn"
            @click="addauth">修改</div>
          <div class="cancleBtn"
            @click="shadeType=''">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addStation, addGroup, getStation, getGroup, addAuth, authList, banAuth } from '@/assets/js/api.js'
export default {
  data () {
    return {
      authId: '',
      shadeType: '', // 新增员工/修改员工
      telephone: '',
      authName: '',
      mobile: '',
      status: '',
      hide1: true,
      hide2: true,
      authArr: [],
      station: '',
      stationVal: '',
      addStationVal: '',
      stationArr: [],
      group: '',
      groupVal: '',
      addGroupVal: '',
      groupArr: [],
      searchName: '',
      page: 1,
      total: 0
    }
  },
  computed: {
    stationLabel () {
      let obj = this.stationArr.find((item) => {
        return item.value === this.stationVal
      })
      if (obj) {
        return obj.label
      } else {
        return ''
      }
    },
    groupLabel () {
      let obj = this.groupArr.find((item) => {
        return item.value === this.groupVal
      })
      if (obj) {
        return obj.label
      } else {
        return ''
      }
    }
  },
  watch: {
    stationVal (newVal) {
      this.page = 1
      this.getAuthList()
    },
    groupVal (newVal) {
      this.page = 1
      this.getAuthList()
    },
    searchName (newVal) {
      this.page = 1
      if (newVal === '') {
        this.getAuthList()
      }
    }
  },
  methods: {
    // 新增岗位
    addstation () {
      addStation({
        company_id: window.sessionStorage.getItem('company_id'),
        user_id: window.sessionStorage.getItem('user_id'),
        name: this.station
      }).then((res) => {
        console.log(res)
      })
    },
    // 新增分组
    addgroup () {
      addGroup({
        company_id: window.sessionStorage.getItem('company_id'),
        user_id: window.sessionStorage.getItem('user_id'),
        name: this.group
      }).then((res) => {
        console.log(res)
      })
    },
    // 添加/修改员工
    addauth () {
      let _this = this
      if (this.shadeType === 'create') {
        this.authId = ''
        this.status = 1
      }
      if (this.telephone === '') {
        this.$message({
          type: 'error',
          message: '电话号码不能为空'
        })
      } else if (this.name === '') {
        this.$message({
          type: 'error',
          message: '名字不能为空'
        })
      } else if (this.mobile === '') {
        this.$message({
          type: 'error',
          message: '联系方式不能为空'
        })
      } else {
        addAuth({
          id: _this.authId,
          status: _this.status,
          telephone: _this.telephone,
          group_id: _this.addGroupVal,
          company_id: window.sessionStorage.getItem('company_id'),
          station_id: _this.addStationVal,
          name: _this.authName,
          mobile: _this.mobile
        }).then((res) => {
          if (res.data.status) {
            if (_this.authId) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.shadeType = ''
              this.telephone = ''
              this.addStationVal = ''
              this.addGroupVal = ''
              this.mobile = ''
              this.authName = ''
              this.getAuthList()
            } else {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.telephone = ''
              this.addStationVal = ''
              this.addGroupVal = ''
              this.mobile = ''
              this.authName = ''
              this.getAuthList()
            }
          }
        })
      }
    },
    // 员工列表
    getAuthList () {
      let _this = this
      authList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 5,
        page: _this.page,
        group_id: _this.groupVal,
        station_id: _this.stationVal,
        keyword: _this.searchName
      }).then((res) => {
        if (res.status) {
          _this.authArr = res.data.data
          _this.total = res.data.meta.total
          console.log(_this.authArr)
        }
      })
    },
    // 分页
    handleCurrentChange (val) {
      this.page = val
      this.getAuthList()
    },
    // 修改员工信息
    updateAuth (item) {
      this.telephone = item.telephone
      this.addStationVal = item.station_id
      this.addGroupVal = item.group_id
      this.mobile = item.mobile
      this.authName = item.name
      this.authId = item.id
      this.status = item.status
      this.shadeType = 'update'
    },
    // 禁用员工
    banauth (id, opt) {
      if (opt === '禁用') {
        this.$confirm('此操作将使得该员工不能正常登录账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          banAuth({
            id: id
          }).then((res) => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '禁用成功!'
              })
            }
            this.getAuthList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        })
      } else {
        this.$confirm('是否要重新激活该账号, 激活后该账号可以正常登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          banAuth({
            id: id
          }).then((res) => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '启用成功!'
              })
            }
            this.getAuthList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          })
        })
      }
    }
  },
  created () {
    let _this = this
    getStation({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.data.code === 200) {
        _this.stationArr = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    })
    getGroup({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.data.code === 200) {
        _this.groupArr = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    })
    this.getAuthList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/personManage.less";
</style>
