<template>
  <div id="personManage">
    <div class="head">
      <h2>员工账号管理</h2>
      <div class="rightMenu">
        <el-input placeholder="请输入手机号或用户姓名" suffix-icon="el-icon-search"/>
        <el-select v-model="value" placeholder="筛选用户岗位">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="筛选用户小组">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="addBtn" @click="shadeShow=true">
          <span>添加新员工</span>
          <span>+</span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="tableCtn">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">序号</div>
          <div class="tableColumn">姓名</div>
          <div class="tableColumn">电话号码</div>
          <div class="tableColumn">所属公司</div>
          <div class="tableColumn">联系电话</div>
          <div class="tableColumn">用户岗位</div>
          <div class="tableColumn">用户小组</div>
          <div class="tableColumn">注册时间</div>
          <div class="tableColumn flex8">操作</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">1</div>
          <div class="tableColumn">张三</div>
          <div class="tableColumn">12345667788</div>
          <div class="tableColumn">所属公司</div>
          <div class="tableColumn">8888888</div>
          <div class="tableColumn">产品检测员</div>
          <div class="tableColumn">A组</div>
          <div class="tableColumn">2018-03-24</div>
           <div class="tableColumn flex8">
            <span class="btns normal">修改</span>
            <span class="btns warning">禁用</span>
            <span class="btns error">删除</span>
          </div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">1</div>
          <div class="tableColumn">张三</div>
          <div class="tableColumn">12345667788</div>
          <div class="tableColumn">所属公司</div>
          <div class="tableColumn">8888888</div>
          <div class="tableColumn">产品检测员</div>
          <div class="tableColumn">A组</div>
          <div class="tableColumn">2018-03-24</div>
           <div class="tableColumn flex8">
            <span class="btns normal">修改</span>
            <span class="btns warning">禁用</span>
            <span class="btns error">删除</span>
          </div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">1</div>
          <div class="tableColumn">张三</div>
          <div class="tableColumn">12345667788</div>
          <div class="tableColumn">所属公司</div>
          <div class="tableColumn">8888888</div>
          <div class="tableColumn">产品检测员</div>
          <div class="tableColumn">A组</div>
          <div class="tableColumn">2018-03-24</div>
          <div class="tableColumn flex8">
            <span class="btns normal">修改</span>
            <span class="btns warning">禁用</span>
            <span class="btns error">删除</span>
          </div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">1</div>
          <div class="tableColumn">张三</div>
          <div class="tableColumn">12345667788</div>
          <div class="tableColumn">所属公司</div>
          <div class="tableColumn">8888888</div>
          <div class="tableColumn">产品检测员</div>
          <div class="tableColumn">A组</div>
          <div class="tableColumn">2018-03-24</div>
           <div class="tableColumn flex8">
            <span class="btns normal">修改</span>
            <span class="btns warning">禁用</span>
            <span class="btns error">删除</span>
          </div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">1</div>
          <div class="tableColumn">张三</div>
          <div class="tableColumn">12345667788</div>
          <div class="tableColumn">所属公司</div>
          <div class="tableColumn">8888888</div>
          <div class="tableColumn">产品检测员</div>
          <div class="tableColumn">A组</div>
          <div class="tableColumn">2018-03-24</div>
           <div class="tableColumn flex8">
            <span class="btns normal">修改</span>
            <span class="btns warning">禁用</span>
            <span class="btns error">删除</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <div class="shade" v-show="shadeShow">
      <div class="main">
        <div class="close" @click="shadeShow=false">
          <span class="icon">x</span>
        </div>
        <div class="title">新增员工账号</div>
        <div class="inputCtn">
          <span class="label">电话号码:</span>
          <div class="elCtn">
            <el-input v-model="telephone" placeholder="请输入用户账号/手机号"></el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">姓名:</span>
          <div class="elCtn">
            <el-input v-model="telephone" placeholder="请输入用户姓名"></el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">联系电话:</span>
          <div class="elCtn">
            <el-input v-model="telephone" placeholder="请输入联系方式"></el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">所属公司:</span>
          <div class="elCtn">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">用户岗位:</span>
          <div class="elCtn">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">用户分组:</span>
          <div class="elCtn">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="btnCtn">
          <div class="okBtn">添加</div>
          <div class="cancleBtn" @click="shadeShow=false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shadeShow: false,
      telephone: '',
      options: [{
        value: '1',
        label: 'A组'
      }, {
        value: '2',
        label: 'B组'
      }, {
        value: '3',
        label: 'C组'
      }],
      value: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/personManage.less';
</style>
