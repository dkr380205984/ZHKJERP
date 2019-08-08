<template>
  <div id="packagDetail"
    v-loading="loading">
    <div class="head">
      <h2>包装订购详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号:</span>
            <span class="content important"
              @click="$router.push('/index/orderDetail/' + $route.params.id)">{{order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
            <span class="content">{{client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">{{order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">{{group_name}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <template v-if="productList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn"
                  style="width:900px;">
                  <li class="title">
                    <span>产品编号</span>
                    <span class="flex17">产品类别</span>
                    <span class="flex17">
                      <span>尺码颜色</span>
                      <span>发货数量</span>
                    </span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in productList"
                    :key="key">
                    <span class="tableRow blue"
                      @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                    <span class="tableRow flex17">{{item.type}}</span>
                    <span class="tableRow col flex17">
                      <span v-for="(val,ind) in item.size_info"
                        :key="ind"
                        class="tableColumn">
                        <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                        <span class="tableRow">{{val.plan_number ? val.plan_number : 0}}{{'条'}}</span>
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <div v-else
            class="inputCtn">暂无信息</div>
        </div>
      </div>
      <!-- <div class="stepCtn">
        <div class="stepTitle">装箱预计表</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>包装编号</span>
                  <span>包装分类</span>
                  <span>包装规格</span>
                  <span>包装属性</span>
                  <span class="flex35">
                    <span class="flex15">产品/包装</span>
                    <span>数量</span>
                    <span>每包数量</span>
                  </span>
                  <span>预计包装数量</span>
                  <span>更新时间</span>
                  <span>操作人</span>
                  <span>操作</span>
                </li>
                <li v-if="packagList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in packagList"
                  :key="key">
                  <span class="tableRow">{{item.packag_code}}</span>
                  <span class="tableRow">{{item.packag_type}}</span>
                  <span class="tableRow">{{item.packag_size}}</span>
                  <span class="tableRow">{{item.packag_attr}}</span>
                  <span class="tableRow flex35 col">
                    <span class="tableColumn"
                      v-for="(value,index) in item.packag_info"
                      :key="index">
                      <span class="tableRow flex15"
                        style="line-height:1.5em;">
                        <div style="padding:10px 0;">
                          <span>{{value.code}}</span>
                          <span>{{value.type}}</span>
                        </div>
                      </span>
                      <span class="tableRow">{{value.number}}{{value.unit}}</span>
                      <span class="tableRow">{{value.one_packag}}{{value.unit}}</span>
                    </span>
                  </span>
                  <span class="tableRow">{{item.packag_number}}{{item.unit}}</span>
                  <span class="tableRow">{{item.updated_time}}</span>
                  <span class="tableRow">{{item.user_name}}</span>
                  <span class="tableRow blue">修改</span>
                  <span class="tableRow"
                    style="line-height:1.5em;">
                    <div>
                      <span class="blue"
                        @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                      <span>{{item.type}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex55">
                    <span v-for="(value,index) in item.size_info"
                      :key="index"
                      class="tableColumn">
                      <span class="tableRow">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="tableRow flex45 col">
                        <span v-for="(val,ind) in value.production_info"
                          :key="ind"
                          class="tableColumn">
                          <span class="tableRow flex13">{{val.production_client}}</span>
                          <span class="tableRow flex13">{{val.plan_number}}{{'条'}}</span>
                          <span class="tableRow">{{val.test_number ? val.test_number : 0}}{{'条'}}</span>
                          <span class="tableRow">{{val.defective_number ? val.defective_number : 0}}{{'条'}}</span>
                          <span :class="{'tableRow':true,'compiled':val.plan_number === val.test_number,'unCompiled':val.plan_number !== val.test_number}">{{val.plan_number === val.test_number ? '完成' : '未完成'}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                  @click="packagFlag = !packagFlag">{{ packagFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="packagFlag">
                <div>
                  <li>
                    <span>检验日期</span>
                    <span>生产单位</span>
                    <span>尺码颜色</span>
                    <span class="flexMid">检验件数</span>
                    <span class="flexMid">次品数量</span>
                    <span>次品原因</span>
                    <span>备注信息</span>
                    <span class="flexMid">检验人</span>
                    <span class="flexMid">操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="item.log.length === 0">暂无信息</li>
                  <li v-for="(value,index) in item.Log"
                    :key="index">
                    <span class="flexBig">{{item.order_time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.price|fixedFilter}}{{'元/' + item.unit}}</span>
                    <span class="flexMid">{{item.weight|fixedFilter}}{{item.unit}}</span>
                    <span class="flexMid">{{item.total_price|fixedFilter}}{{'元'}}</span>
                    <span class="flexBig remark">
                      <i>
                        {{item.remark ? item.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                          title="备注信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(item.remark) > 15"
                          :content="item.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span class="flexMid">{{item.user}}</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                  @click="$router.push('/index/packagInfoCreate/' + $route.params.id )">
                  <img class="icon"
                    v-if="flag"
                    src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/order_disabled.png">
                  <span>去包装</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">其他辅料统计表</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span class="flex13">产品/包装</span>
                  <span class="flex5">
                    <span>辅料名称</span>
                    <span>辅料属性</span>
                    <span>产品数量</span>
                    <span>包装要求</span>
                    <span>辅料数量</span>
                  </span>
                  <span>更新时间</span>
                  <span>操作人</span>
                  <span>操作</span>
                </li>
                <li v-if="materialList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in materialList"
                  :key="key">
                  <span class="tableRow flex13"
                    style="line-height:1.5em;">
                    <div>
                      <span>{{item.code}}</span>
                      <span>{{item.type}}</span>
                    </div>
                  </span>
                  <span class="tableRow flex5 col">
                    <span class="tableColumn"
                      v-for="(value,index) in item.material_info"
                      :key="index">
                      <span class="tableRow">{{value.name}}</span>
                      <span class="tableRow">{{value.attr ? value.attr : '无'}}</span>
                      <span class="tableRow">{{value.number}}{{item.unit}}</span>
                      <span class="tableRow">{{value.one_packag}}{{value.unit + '/' + item.unit}}</span>
                      <span class="tableRow">{{value.material_number}}{{value.unit}}</span>
                    </span>
                  </span>
                  <span class="tableRow">{{item.updated_time}}</span>
                  <span class="tableRow">{{item.user_name}}</span>
                  <span class="tableRow blue">修改</span>
                </li>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                  @click="$router.push('/index/packagInfoCreate/' + $route.params.id )">
                  <img class="icon"
                    v-if="flag"
                    src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/order_disabled.png">
                  <span>去包装</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="stepCtn">
        <div class="stepTitle">订购包装辅料</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <!-- <div class="border"></div> -->
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>订购单位</span>
                  <span class="flex75">
                    <span class="flex45">
                      <span class="flex15">包装辅料名称</span>
                      <span>订购价格</span>
                      <span>订购数量</span>
                      <span>合计价格</span>
                    </span>
                    <span>完成日期</span>
                  </span>
                  <span>总价</span>
                  <span>
                    <span>操作</span>
                  </span>
                </li>
                <li v-if="packagMaterialPageList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in packagMaterialPageList"
                  :key="key">
                  <span class="tableRow">{{item.client_name}}</span>
                  <span class="tableRow flex75 col">
                    <span class="tableColumn"
                      v-for="(value,index) in item.create_time"
                      :key="index">
                      <span class="tableRow col flex45">
                        <span class="tableColumn"
                          v-for="(valMat,indMat) in value.material_info"
                          :key="indMat">
                          <span class="tableRow flex15">{{valMat.name}}{{valMat.attr ? '/' + valMat.attr : ''}}</span>
                          <span class="tableRow">{{valMat.price}}元/个</span>
                          <span class="tableRow">{{valMat.number}}个</span>
                          <span class="tableRow">{{Math.ceil(valMat.price*valMat.number)}}{{'元'}}</span>
                        </span>
                      </span>
                      <span class="tableRow">{{item.time}}</span>
                    </span>
                  </span>
                  <span class="tableRow">{{item.total_price}}元</span>
                  <span class="tableRow col">
                    <span class="tableColumn"
                      v-for="(value,index) in item.create_time"
                      :key="index"
                      :style="'flex:' + value.material_info.length">
                      <span class="tableRow blue"
                        @click="open($route.params.id,item.client_id,value.create_at)">打印</span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                  @click="packagMaterialPageLogFlag = !packagMaterialPageLogFlag">{{ packagMaterialPageLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="packagMaterialPageLogFlag">
                <div>
                  <li>
                    <span>创建时间</span>
                    <span class="flexBig">订购公司</span>
                    <span>包装辅料名称</span>
                    <span>属性</span>
                    <span class="flexMid">单价</span>
                    <span class="flexMid">数量</span>
                    <span class="flexMid">合计</span>
                    <span class="flexBig">备注</span>
                    <span class="flexMid">操作人</span>
                    <span class="flexMid">操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="packagMaterialPageLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in packagMaterialPageLog"
                    :key="key">
                    <span>{{item.created_at}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.material_name}}</span>
                    <span>
                      <template v-for="(valAttr,indAttr) in item.attr">{{(indAttr !== 0 ? ',' : '') + valAttr.pack_attr}}</template>
                    </span>
                    <span class="flexMid">{{item.price|fixedFilter}}{{'元/个'}}</span>
                    <span class="flexMid">{{Math.ceil(item.number)}}个</span>
                    <span class="flexMid">{{Math.ceil(item.price * item.number)}}{{'元'}}</span>
                    <span class="flexBig remark">
                      <i>
                        {{item.remark ? item.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                          title="备注信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(item.remark) > 15"
                          :content="item.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span class="flexMid">{{item.user_name}}</span>
                    <span class="flexMid blue"
                      @click="changeOrderInfo(item)">修改</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                  @click="$router.push('/index/packagMaterialPage/' + $route.params.id )">
                  <img class="icon"
                    v-if="flag"
                    src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/order_disabled.png">
                  <span>去订购</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="$router.go(-1)">确认</div>
      </div>
    </div>
    <div class="shades"
      v-show='changePackShow'>
      <div class="main">
        <div class="close"
          @click="changePackShow=false">
          <span class="icon">x</span>
        </div>
        <div class="title">修改装箱信息</div>
        <div class="content">
          <div class="inputCtn">
            <span class="label"><em>*</em>订购来源:</span>
            <div class="elCtn">
              <el-select v-model="changeInfo.client_name"
                placeholder="请选择订购来源"
                filterable
                style="width:300px;">
                <el-option v-for="packType in packagPageClientList"
                  :key="packType.id"
                  :label="packType.name"
                  :value="packType.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>包装名称:</span>
            <div class="elCtn">
              <el-select v-model="changeInfo.pack_material_name"
                placeholder="请选择包装"
                filterable
                style="width:300px;">
                <el-option v-for="packType in packagMaterialList"
                  :key="packType.id"
                  :label="packType.name+'('+packType.size+')'"
                  :value="packType.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>单价:</span>
            <div class="elCtn">
              <el-input placeholder="请输入单价"
                v-model="changeInfo.price"
                style="width:300px">
              </el-input>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>订购数量:</span>
            <div class="elCtn">
              <el-input placeholder="请输入订购数量"
                v-model="changeInfo.number"
                style="width:300px">
              </el-input>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label">备注:</span>
            <div class="elCtn">
              <el-input placeholder="请输入备注信息"
                v-model="changeInfo.desc"
                style="width:300px">
              </el-input>
            </div>
          </div>
          <!--<template v-for="(item,key) in changePackInfo.product_info">
            <div class="inputCtn"
              :key="key">
              <span class="label">产品数量:</span>
              <div class="elCtn">
                <el-cascader v-model="item.product"
                  :options="productList"
                  placeholder="请选择产品"
                  style="width:300px;"></el-cascader>
                <em class="el-icon-plus"
                  v-if="key === 0"
                  style="top:13px;"
                  @click="addProduct()"></em>
                <em class="el-icon-minus"
                  style="top:13px;"
                  v-else
                  @click="deleteProduct(key)"></em>
              </div>
              <div class="elCtn"
                style="margin-top:20px;">
                <el-input placeholder="请输入单箱数量"
                  v-model="item.one_number"
                  style="width:143px">
                </el-input>
                <span>—</span>
                <el-input placeholder="合计数量"
                  v-model="item.all_number"
                  disabled
                  style="width:143px">
                </el-input>
              </div>
            </div>
          </template>
           -->
          <div class="btnCtn">
            <div class="okBtn"
              @click="submit">修改</div>
            <div class="cancleBtn"
              @click="changePackShow=false">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail, packagMaterialDetail, clientList, packagMaterialList, packagMaterialPage } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      changePackShow: false,
      save: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      productList: [],
      packagMaterialPageList: [],
      packagMaterialPageLog: [],
      packagMaterialPageLogFlag: false,
      flag: true,
      changeInfo: {
        id: '',
        client_name: '',
        pack_material_name: '',
        order_time: '',
        pack_attr: [],
        attr: '',
        price: '',
        number: '',
        desc: ''
      },
      packagPageClientList: [],
      packagMaterialList: []
    }
  },
  watch: {
    'changeInfo.pack_material_name': {
      deep: true,
      handler (newVal) {
        this.changeInfo.pack_attr = this.packagMaterialList.find(key => key.id === newVal).attribute
        console.log(this.changeInfo.pack_attr)
      }
    }
  },
  methods: {
    open (orderId, clientId, time) {
      window.open('/packagMaterialTable/' + orderId + '/' + clientId + '/' + time)
    },
    charCodeLength (item) {
      if (!item) {
        return 0
      }
      let len = item.length
      let lengths = 0
      for (let i = 0; i < len; i++) {
        if (item.charCodeAt(i) > 255) {
          lengths += 2
        } else {
          lengths++
        }
      }
      return lengths
    },
    submit () {
      if (this.save) {
        this.save = false
        if (!this.changeInfo.client_name) {
          this.$message({
            type: 'error',
            message: `请选择订购来源`
          })
          return
        }
        if (!this.changeInfo.pack_material_name) {
          this.$message({
            type: 'error',
            message: `请选择包装`
          })
          return
        }
        if (!this.changeInfo.price) {
          this.$message({
            type: 'error',
            message: `请输入单价`
          })
          return
        }
        if (!this.changeInfo.number) {
          this.$message({
            type: 'error',
            message: `请输入订购数量`
          })
          return
        }
        packagMaterialPage({
          id: this.changeInfo.id,
          data: [{
            user_id: window.sessionStorage.getItem('user_id'),
            order_id: this.$route.params.id,
            material_id: this.changeInfo.pack_material_name,
            client_id: this.changeInfo.client_name,
            number: this.changeInfo.number,
            price: this.changeInfo.price,
            order_time: this.changeInfo.order_time,
            desc: this.changeInfo.desc,
            attribute: this.changeInfo.pack_attr
          }]
        }).then(res => {
          this.$message({
            type: 'success',
            message: `修改成功`
          })
          this.getOrderDetail()
          this.changePackShow = false
        })
        setTimeout(() => { this.save = true }, 1000)
      } else {
        this.$alert('请求速度过于频繁', '提醒', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `请于1s后重新请求`
            })
          }
        })
      }
    },
    changeOrderInfo (item) {
      this.changePackShow = true
      this.changeInfo.id = item.id
      this.changeInfo.pack_material_name = item.material_id
      this.changeInfo.client_name = item.client_id
      this.changeInfo.price = item.price
      this.changeInfo.desc = item.remark
      this.changeInfo.number = item.number
      this.changeInfo.order_time = item.order_time
    },
    getOrderDetail () {
      this.packagMaterialPageLog = []
      this.packagMaterialPageList = []
      packagMaterialDetail({
        order_id: this.$route.params.id
      }).then(res => {
        // 初始化订购包装详情
        console.log(res.data.data)
        res.data.data.forEach(item => {
          this.packagMaterialPageLog.unshift({
            time: item.order_time.split(' ')[0],
            client_name: item.client_name,
            material_name: item.material_name,
            attr: JSON.parse(item.attribute),
            price: item.price,
            number: item.number,
            remark: item.desc,
            user_name: item.user_name,
            created_at: item.created_at,
            order_time: item.order_time,
            id: item.id,
            material_id: item.material_id,
            client_id: String(item.client_id)
          })
        })
        // 初始化订购包装表格数据
        this.packagMaterialPageLog.forEach(item => {
          let flag = this.packagMaterialPageList.find(key => key.client_name === item.client_name)
          if (!flag) {
            this.packagMaterialPageList.push({
              client_name: item.client_name,
              client_id: item.client_id,
              total_price: item.price * item.number,
              time: item.time,
              create_time: [
                {
                  create_at: item.created_at,
                  material_info: [{
                    name: item.material_name,
                    price: item.price,
                    number: item.number
                  }]
                }
              ]
            })
          } else {
            flag.total_price += item.price * item.number
            let flag1 = flag.create_time.find(key => key.create_at === item.created_at)
            if (!flag1) {
              flag.create_time.push({
                create_at: item.created_at,
                material_info: [{
                  name: item.material_name,
                  price: item.price,
                  number: item.number
                }]
              })
            } else {
              let flag2 = flag1.material_info.find(key => (key.name === item.material_name && key.price === item.price))
              if (!flag2) {
                flag1.material_info.push({
                  name: item.material_name,
                  price: item.price,
                  number: item.number
                })
              } else {
                flag2.number = Number(flag2.number) + Number(item.number)
              }
            }
            // if (!(new Date(flag.time).getTime() > new Date(item.time).getTime())) {
            //   flag.time = item.time
            //   flag.user_name = item.user_name
            // }
          }
        })
      })
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  created () {
    this.getOrderDetail()
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      }),
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      packagMaterialList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化产品信息
      orderInfo.order_batch.forEach(item => {
        item.batch_info.forEach(value => {
          value.size.forEach(val => {
            let flag = this.productList.find(key => key.product_code === value.productCode)
            if (!flag) {
              let type = value.productInfo.category_info.product_category + '/' + value.productInfo.type_name + '/' + value.productInfo.style_name + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
              this.productList.push({
                product_code: value.productCode,
                type: type,
                size_info: [{
                  size: val.name[0],
                  color: val.name[1],
                  plan_number: val.numbers
                }]
              })
            } else {
              let flag1 = flag.size_info.find(key => (key.size === val.name[0] && key.color === val.name[1]))
              if (!flag1) {
                flag.size_info.push({
                  size: val.name[0],
                  color: val.name[1],
                  plan_number: val.numbers
                })
              } else {
                flag1.plan_number = Number(flag1.plan_number) + Number(val.numbers)
              }
            }
          })
        })
      })
      this.packagPageClientList = res[1].data.data.filter(key => (key.type.indexOf(7) !== -1))
      this.packagMaterialList = res[2].data.data
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagDetail.less";
</style>
<style lang="less" scope>
// 弹窗样式
.shades {
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
    }
    .content {
      height: 514px;
      overflow-y: scroll;
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
          & > em {
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
          em {
            padding: 5px;
            margin-left: 20px;
            cursor: pointer;
            &:hover {
              background-color: #1a95ff;
              color: #fff;
              border-radius: 50%;
            }
          }
        }
      }
      .btnCtn {
        margin: 40px 0;
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
