<template>
  <div id="sampleList">
    <div class="head">
      <h2>产品列表</h2>
      <el-input placeholder="输入订单号精确搜索" suffix-icon="el-icon-search" v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable>条件1</el-tag>
          <el-tag closable>条件2</el-tag>
          <el-tag closable>条件3</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="value" placeholder="筛选公司">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="筛选小组">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="rightFilter">
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="tableCtn">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn">品类</div>
          <div class="tableColumn">类型</div>
          <div class="tableColumn">款型</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">成分</div>
          <div class="tableColumn">尺寸(厘米)</div>
          <div class="tableColumn">克重(克)</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">描述</div>
          <div class="tableColumn">添加日期</div>
          <div class="tableColumn">创建人</div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: '',
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
      value: '',
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/sampleList.less';
</style>
