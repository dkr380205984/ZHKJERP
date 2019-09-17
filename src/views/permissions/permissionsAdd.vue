<template>
  <div id="permissionsAdd"
    v-loading='loading'>
    <div class="head">
      <h2>权限详情</h2>
    </div>
    <div class="body">
      <div class="addBtn"
        @click="addRolePermiss">+新角色权限</div>
      <div class="roleBox"
        v-for="(item,key) in rolePermissionData"
        :key="key">
        <div class="title">
          <div class="info">
            <div class="name">{{item.group_name}}</div>
            <!-- <div class="time">更新时间：{{'2019年06月20日 16:00:00'}}</div> -->
          </div>
          <div class="handle">
            <div class="change"
              @click="changePermission(item)">修改</div>
            <div class="delete"
              @click="$message.warning('此功能暂未开放')">删除</div>
          </div>
        </div>
        <div class="contentBox">
          <span>权限内容：</span>
          <el-tree ref="tree"
            :data="item.data"
            default-expand-all>
          </el-tree>
        </div>
      </div>
    </div>
    <div class="shade"
      v-show='showShade'>
      <div class="main">
        <div class="close"
          @click="showShade=false">
          <span class="icon">x</span>
        </div>
        <div class="title">{{showShade === 'add' ? '添加新' : '修改'}}角色权限</div>
        <div class="inputCtn">
          <span class="label"><em>*</em>角色名称:</span>
          <div class="elCtn">
            <el-select v-model="addNewRoleList.name"
              placeholder="请选择角色名称"
              v-if="showShade === 'add'">
              <el-option v-for="item in StationData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="changeNewRoleList.name"
              placeholder="请选择角色名称"
              disabled
              v-else>
              <el-option v-for="item in StationData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>权限模块:</span>
          <div class="elCtn">
            <div class="permissBox">
              <!-- :data="showShade === 'add' ? date : changeTreeData.changeTree" -->
              <el-tree :data="date"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="setTree"
                highlight-current>
              </el-tree>
            </div>
          </div>
        </div>
        <div class="btnCtn">
          <div class="okBtn"
            @click="submit">{{showShade === 'add' ? '提交':'修改'}}</div>
          <div class="cancleBtn"
            @click="showShade=false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { permissionsData } from '@/assets/js/dictionary.js'
import { permissionList, getStation, rolePermissionAdd, stationPermissionList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      showShade: false,
      addNewRoleList: {
        name: null
      },
      changeNewRoleList: {
        name: null
      },
      date: [],
      StationData: [],
      rolePermissionData: []
      // changeTreeData: [] // 修改节点时tree的数据
    }
  },
  watch: {},
  methods: {
    submit () {
      let selectData = this.$refs.setTree.getCheckedKeys().filter(res => res !== undefined)
      // 当修改时，筛选已有权限
      // if (this.showShade === 'change') { selectData = selectData.filter(res => (this.changeTreeData.keys.indexOf(res) === -1)) }
      if (selectData.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择角色相关权限'
        })
        return
      }
      if (!this.addNewRoleList.name && this.showShade === 'add') {
        this.$message({
          type: 'error',
          message: '请选择角色'
        })
        return
      }
      rolePermissionAdd({
        group_id: (this.showShade === 'add' ? this.addNewRoleList.name : this.changeNewRoleList.name),
        company_id: window.sessionStorage.getItem('company_id'),
        permissions_json: JSON.stringify(selectData)
      }).then(res => {
        if (this.showShade === 'add') {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else if (this.showShade === 'change') {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        this.showShade = false
        this.getRoleList()
      })
    },
    // 去除每个角色(岗位)没有权限的分支
    deleteBatch (item) {
      item.forEach((val, ind) => {
        if (!val.id && val.children) {
          this.deleteBatch(val.children)
        } else if (val.value && !val.children) {
          item.splice(ind, 1)
          this.deleteBatch(item)
        }
      })
    },
    // 修改权限时设置默认权限
    changePermission (item) {
      this.showShade = 'change'
      this.changeNewRoleList.name = item.group_id
      // this.changeTreeData = item
      // console.log(this.changeTreeData)
      this.$refs.setTree.setCheckedKeys(item.keys)
    },
    addRolePermiss () {
      this.showShade = 'add'
      this.$refs.setTree.setCheckedKeys([])
    },
    getRoleList () {
      stationPermissionList({
        company_id: window.sessionStorage.getItem('company_id')
      }).then(res => {
        this.changeNewRoleList.name = ''
        this.rolePermissionData = JSON.parse(JSON.stringify(res.data.data))
        this.rolePermissionData.forEach(item => {
          if (!item.data) {
            item.data = []
          }
        })
        // 处理每个角色（岗位）的权限模块数据
        this.rolePermissionData.forEach(item => {
          let data = JSON.parse(JSON.stringify(permissionsData))
          item.permission_json.forEach(val => {
            if (!item.keys) {
              item.keys = []
            }
            item.keys.push(Number(val.id))
            let flag = data.find(key => key.value === val.type[0])
            if (flag) {
              let flag1 = item.data.find(key => key.value === flag.value)
              if (!flag1) {
                item.data.push(flag)
              }
            }
            let itemData = item.data
            val.type.forEach((valType, indType) => {
              let flag = itemData.find(key => key.value === valType)
              if (flag && indType === val.type.length - 1) {
                if (!flag.children) {
                  flag.children = []
                }
                flag.children.push({
                  id: Number(val.id),
                  label: val.name,
                  url: val.url
                })
              } else if (flag) {
                itemData = flag.children
              }
            })
          })
        })
        // 去除没用的分支类别
        this.rolePermissionData.forEach(item => {
          this.deleteBatch(item.data)
        })
        // 处理修改时禁用已有权限
        // this.rolePermissionData.forEach(item => {
        //   let data = JSON.parse(JSON.stringify(this.date))
        //   item.changeTree = data
        //   item.permission_json.forEach(val => {
        //     val.type.forEach((valType, indType) => {
        //       let flag = data.find(key => key.value === valType)
        //       if (flag && indType === val.type.length - 1) {
        //         let fleg = flag.children.find(key => key.id === Number(val.id))
        //         if (fleg) {
        //           fleg.disabled = true
        //         }
        //       } else if (flag) {
        //         data = flag.children
        //       }
        //     })
        //   })
        // })
        console.log('list:', this.rolePermissionData)
      })
    }
  },
  created () {
    Promise.all([
      permissionList({
      }),
      getStation({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      this.date = JSON.parse(JSON.stringify(permissionsData))
      this.StationData = res[1].data.data
      let permissionsInfo = res[0].data.data
      // 将权限数据插入对应大类中
      permissionsInfo.forEach(item => {
        let data = this.date
        item.type.forEach((val, ind) => {
          let flag = data.find(key => key.value === val)
          if (flag && ind === item.type.length - 1) {
            if (!flag.children) {
              flag.children = []
            }
            flag.children.push({
              id: Number(item.id),
              label: item.name,
              url: item.url
            })
          } else if (flag) {
            data = flag.children
          }
        })
      })
      console.log(this.date)
      this.getRoleList()
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/permissionsAdd.less";
</style>
<style lang="less" scoped>
#permissionsAdd {
  .shade {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .main {
      position: absolute;
      width: 640px;
      height: 580px;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: #ffffff;
      overflow: hidden;
      border-radius: 4px;
      .close {
        position: absolute;
        right: -30px;
        top: -30px;
        width: 60px;
        height: 60px;
        background: #1a95ff;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        color: #ecf0f1;
        &:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: #48aaff;
        }
        .icon {
          position: absolute;
          left: 15px;
          bottom: 7px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .title {
        line-height: 66px;
        font-size: 22px;
        padding: 0 20px;
        background: linear-gradient(to right, #1a95ff, #ceddef);
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        color: #ffffff;
        margin-bottom: 40px;
      }
      .inputCtn {
        margin: 20px;
        position: relative;
        font-size: 16px;
        padding-left: 5em;
        height: auto;
        line-height: 40px;
        color: #666;
        .label {
          position: absolute;
          left: 0;
          text-align: right;
          width: 5em;
          color: #666;
          em {
            color: #f56c6c;
            line-height: 40px;
            margin-right: 2px;
            vertical-align: -4px;
          }
        }
        .elCtn {
          margin-left: 15px;
          width: 400px;
          height: auto;
          .permissBox {
            height: 300px;
            overflow-y: scroll;
            border: 1px solid #ddd;
          }
        }
      }
      .btnCtn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .okBtn {
          margin: 0 30px;
        }
      }
    }
  }
}
</style>
