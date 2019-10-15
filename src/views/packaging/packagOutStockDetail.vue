<template>
  <div id="semiExaminationDetail"
    v-loading="loading">
    <div class="head">
      <h2>装箱出库详情
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
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
        <div class="stepTitle">发货批次信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <template v-if="batchList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn">
                  <li class="title">
                    <span>发货日期</span>
                    <span class="flex3">
                      <span>产品品类</span>
                      <span>
                        <span>尺码/颜色</span>
                        <span>发货数量</span>
                      </span>
                    </span>
                    <span class="flex17">操作</span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in batchList"
                    :key="key">
                    <span style="line-height:1.5em"
                      class="tableRow">
                      <div>
                        <span>{{'第' + chinaNumber(item.id) + '批'}}</span>
                        <span>{{item.delivery_time}}</span>
                      </div>
                    </span>
                    <span class="tableRow col flex3">
                      <span v-for="(val,ind) in item.product_info"
                        :key="ind"
                        class="tableColumn">
                        <span style="line-height:1.5em"
                          class="tableRow">
                          <div>
                            <span>{{val.product_type}}</span>
                            <span class="blue"
                              @click="$router.push('/index/productDetail/' + val.product_code)">{{val.product_code}}</span>
                          </div>
                        </span>
                        <span class="tableRow col">
                          <span class="tableColumn"
                            v-for="(valSize,indSize) in val.size_info"
                            :key="indSize">
                            <span class="tableRow">{{valSize.size}}/{{valSize.color}}</span>
                            <span class="tableRow">{{valSize.number}}条</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="tableRow flex17">
                      <span class="blue"
                        @click="go('batch' + item.id)">显示详情</span>
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
      <div class="stepCtn"
        v-for="(item,key) in batchList"
        :key="key">
        <div class="stepTitle"
          :id="'batch' + item.id">第{{chinaNumber(item.id) }}批</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"
            v-if="key !== batchList.length -1"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>订单批次</span>
                  <span class="flex13">装箱资料</span>
                  <span class="flex55">
                    <span class="flex17">产品信息</span>
                    <span class="flex4">
                      <span>尺码/颜色</span>
                      <span>预计装箱</span>
                      <span>实际装箱</span>
                      <span>数量差值</span>
                    </span>
                  </span>
                  <span>发货状态</span>
                </li>
                <li class="handle"
                  @click="appendPack(key)">添加实际装箱</li>
                <li class="content">
                  <span style="line-height:1.5em;"
                    class="tableRow">
                    <div>
                      <span>第{{item.id}}批</span>
                      <span>{{item.delivery_time}}</span>
                    </div>
                  </span>
                  <span class="tableRow blue flex13"
                    @click="item.logFlag = !item.logFlag">{{ item.logFlag ? '隐藏' : '显示'}}装箱资料</span>
                  <span class="tableRow col flex55">
                    <span v-for="(valPro,indPro) in item.product_info"
                      :key="indPro"
                      class="tableColumn">
                      <span class="tableRow flex17"
                        style="line-height:1.5em">
                        <div>
                          <span>{{valPro.product_code}}</span>
                          <span>{{valPro.product_type}}</span>
                        </div>
                      </span>
                      <span class="tableRow flex4 col">
                        <span class="tableColumn"
                          v-for="(valSize,indSize) in valPro.size_info"
                          :key="indSize">
                          <span class="tableRow">{{valSize.size}}/{{valSize.color}}</span>
                          <span class="tableRow">{{valSize.number}}条</span>
                          <span :class="{tableRow:true,noDate:!valSize.pack_number}">{{valSize.pack_number ? valSize.pack_number + '条' : '暂无数据'}}</span>
                          <span :class="{tableRow:true,noDate:!valSize.pack_number,compiled:(valSize.number - valSize.pack_number) === 0,unCompiled:valSize.pack_number ? (valSize.number - valSize.pack_number) !== 0 : false}">{{chazhi(valSize.number,valSize.pack_number)}}</span>
                          <!-- <span class="tableRow">{{(valPro.plan_number - valPro.packag_number) !== 0 ? (((valPro.plan_number - valPro.packag_number) > 0) ? ('少装:' + (valPro.plan_number - valPro.packag_number) + valPro.unit) : ('多装:' + ((valPro.plan_number - valPro.packag_number)*-1) + valPro.unit)) : '正常装箱'}}</span> -->
                        </span>
                      </span>
                    </span>
                  </span>
                  <span :class="{tableRow:true,unCompiled:timeGet(item.delivery_time,item.packag_time) !== '正常出库',compiled:timeGet(item.delivery_time,item.packag_time) === '正常出库'}">{{timeGet(item.delivery_time,item.packag_time)}}</span>
                </li>
              </ul>
              <ul class="tablesCtn"
                style="margin-top:30px;"
                v-if="item.logFlag">
                <li class="title">
                  <span>包装序号</span>
                  <span>包装类型</span>
                  <span>毛重</span>
                  <span>净重</span>
                  <span class='flex4'>
                    <span class="flex17">产品类型</span>
                    <span>尺码颜色</span>
                    <span>装箱数量</span>
                  </span>
                  <span>备注信息</span>
                  <span>操作</span>
                </li>
                <li class="handle"
                  @click="$router.push('/index/packagInfoCreate/' + $route.params.id + '/' + item.id )">添加装箱资料</li>
                <li class="handle"
                  style="right:7em">打印</li>
                <li v-if="item.packagInfoList.length === 0">暂无信息</li>
                <li v-for="(value,index) in item.packagInfoList"
                  :key="index"
                  class="content">
                  <span class="tableRow">{{value.pack_code}}</span>
                  <span class="tableRow">{{value.pack_material}}</span>
                  <span class="tableRow">{{value.weight}}kg</span>
                  <span class="tableRow">{{value.net_weight}}kg</span>
                  <span class="tableRow col flex4">
                    <span class="tableColumn"
                      v-for="(valPro,indPro) in value.product_info"
                      :key="indPro">
                      <span class="tableRow flex17">{{valPro.product[0]}}</span>
                      <span class="tableRow">{{valPro.product[1] + '/' + valPro.product[2]}}</span>
                      <span class="tableRow">{{valPro.all_number}}</span>
                    </span>
                  </span>
                  <span :class="{tableRow:true,noDate:!value.desc}">{{value.desc ? value.desc : '暂无备注'}}</span>
                  <span class="tableRow blue"
                    @click="changeLog(value,true)">修改</span>
                </li>
              </ul>
              <ul class="tablesCtn"
                style="margin-top:30px;">
                <li class="title">
                  <span>出库时间</span>
                  <span>运输单位</span>
                  <span>
                    <span>出库箱数</span>
                  </span>
                  <span>出库立方数/m³</span>
                  <span>出库国家</span>
                  <span>运输地址</span>
                  <span>到达港口</span>
                  <span>费用</span>
                  <span>备注</span>
                  <span class="flex17">操作</span>
                </li>
                <li class="handle"
                  @click="$router.push('/index/packagOutStock/' + $route.params.id + '/' +item.id)">添加出库</li>
                <li v-if="item.outStockInfoList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(val,ind) in item.outStockInfoList"
                  :key="ind">
                  <span class="tableRow">{{val.created_at.split(' ')[0]}}</span>
                  <span class="tableRow">{{val.client_name}}</span>
                  <span class="tableRow">{{val.number}}</span>
                  <span class="tableRow">{{val.cubic_number}}</span>
                  <span :class="{tableRow:true,noDate:!val.country}">{{val.country ? val.country : '暂无数据'}}</span>
                  <span :class="{tableRow:true,noDate:!val.address}">{{val.address ? val.address : '暂无数据'}}</span>
                  <span :class="{tableRow:true,noDate:!val.port}">{{val.port ? val.port : '暂无数据'}}</span>
                  <span :class="{tableRow:true,noDate:!val.cost}">{{val.cost ? val.cost : '暂未添加'}}</span>
                  <span :class="{tableRow:true,noDate:!val.desc}">{{val.desc ? val.desc : '暂无备注'}}</span>
                  <span class="tableRow flex17">
                    <span class="blue"
                      @click="changeLog(val)">修改</span>
                    <span class="blue flex17"
                      v-show="val.cost === null"
                      @click="changeLog(val),addPackCost = true">添加运输费用</span>
                  </span>
                </li>
              </ul>
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
    <div class="confirm"
      v-if="show">
      <div class="box"
        v-loading='confirmLoading'
        element-loading-text="数据提交中"
        element-loading-background="rgba(0, 0, 0, 0.3)">
        <div class="content">
          <span class="tishi">请输入以下产品实际装箱数量</span>
          <ul>
            <template v-for="(item,key) in addPackNumberList[id].product_info">
              <li v-for="(val,ind) in item.size_info"
                :key="ind+ '' +key"
                style="flex-direction:column">
                <span>
                  <span class="flex4">{{item.product_code + ' ' + item.product_type}}</span>
                  <span class="flex17">{{val.size + '/' + val.color}}</span>
                </span>
                <el-input v-model="val.pack_number"
                  placeholder="请输入实际装箱数量"
                  style="display:block;margin-top:10px;"></el-input>
              </li>
            </template>
          </ul>
          <div class="btn">
            <span @click="closeConfirm(false)">取消</span>
            <span class="yes"
              @click="closeConfirm(true,addPackNumberList[id].product_info,addPackNumberList[id].id)">确认</span>
          </div>
        </div>
        <em class="el-icon-close close"
          @click="closeConfirm(false)"></em>
      </div>
    </div>
    <div class="shades"
      v-show='changeOutStockShow'>
      <div class="main"
        style="height:660px">
        <div class="close"
          @click="changeOutStockShow=false,addPackCost = false">
          <span class="icon">x</span>
        </div>
        <div class="title">{{addPackCost ? '添加运输费用' : '修改出库信息'}}</div>
        <div class="content"
          v-if="!addPackCost"
          style="height:610px;">
          <div class="inputCtn">
            <span class="label"><em>*</em>运输单位</span>:
            <el-select v-model="changeOutStockInfo.client_id"
              placeholder="请选择运输单位"
              style="width:300px;">
              <el-option v-for="client in clientList"
                :key="client.id"
                :label="client.name"
                :value="client.id">
              </el-option>
            </el-select>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>出库箱数</span>:
            <el-input placeholder="请输入数量"
              v-model="changeOutStockInfo.number"
              style="width:300px">
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>出库立方</span>:
            <el-input placeholder="请输入出库立方数"
              v-model="changeOutStockInfo.cubic_number"
              style="width:300px">
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">出库国家</span>:
            <el-select v-model="changeOutStockInfo.country"
              placeholder="请选择出库国家"
              filterable
              style="width:300px;">
              <el-option v-for="country in country"
                :key="country.value"
                :value="country">
              </el-option>
            </el-select>
          </div>
          <div class="inputCtn">
            <span class="label">运输地址</span>:
            <el-input placeholder="请输入运输地址"
              v-model="changeOutStockInfo.address"
              style="width:300px">
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">到达港口</span>:
            <el-input placeholder="请输入港口"
              v-model="changeOutStockInfo.port"
              style="width:300px">
            </el-input>
          </div>
          <div class="inputCtn"
            v-if="changeOutStockInfo.cost !== null">
            <span class="label">运输费用</span>:
            <el-input placeholder="请输入运输费用"
              v-model="changeOutStockInfo.cost"
              style="width:300px">
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">备注</span>:
            <el-input placeholder="请输入备注信息"
              v-model="changeOutStockInfo.desc"
              style="width:300px">
            </el-input>
          </div>
          <div class="btnCtn">
            <div class="okBtn"
              @click="submit('outStock')">修改</div>
            <div class="cancleBtn"
              @click="changeOutStockShow=false">取消</div>
          </div>
        </div>
        <div class="content"
          v-else>
          <div class="inputCtn">
            <span class="label">运输费用</span>:
            <el-input placeholder="请输入运输费用"
              v-model="changeOutStockInfo.cost"
              style="width:300px">
            </el-input>
          </div>
          <div class="btnCtn">
            <div class="okBtn"
              @click="submit('outStock')">提交</div>
            <div class="cancleBtn"
              @click="changeOutStockShow=false,addPackCost = false">取消</div>
          </div>
        </div>
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
            <span class="label"><em>*</em>包装序号:</span>
            <div class="elCtn">
              <el-input placeholder="请输入起始序号"
                v-model="changePackInfo.pack_start"
                style="width:143px">
              </el-input>
              <span>—</span>
              <el-input placeholder="请输入末尾序号"
                v-model="changePackInfo.pack_end"
                style="width:143px">
              </el-input>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>包装类型:</span>
            <div class="elCtn">
              <el-select v-model="changePackInfo.pack_type"
                placeholder="请选择包装类型"
                filterable
                style="width:300px;">
                <el-option v-for="packType in packTypeList"
                  :key="packType.id"
                  :label="packType.name"
                  :value="packType.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>包装重量:</span>
            <div class="elCtn">
              <el-input placeholder="请输入毛重"
                v-model="changePackInfo.weight"
                style="width:143px">
              </el-input>
              <span>—</span>
              <el-input placeholder="请输入净重"
                v-model="changePackInfo.net_weight"
                style="width:143px">
              </el-input>
            </div>
          </div>
          <template v-for="(item,key) in changePackInfo.product_info">
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
            </div>
            <div :key="key + 'X'"
              class="inputCtn">
              <span class="label"></span>
              <div class="elCtn">
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
          <div class="inputCtn">
            <span class="label">备注:</span>
            <div class="elCtn">
              <el-input placeholder="请输入备注信息"
                v-model="changePackInfo.desc"
                style="width:300px">
              </el-input>
            </div>
          </div>
          <div class="btnCtn">
            <div class="okBtn"
              @click="submit('pack')">修改</div>
            <div class="cancleBtn"
              @click="changePackShow=false">取消</div>
          </div>
        </div>
      </div>
    </div>
    <my-message :visible.sync="showMsg"
      :url="localName"
      :afterSave="afterSave"></my-message>
  </div>
</template>

<script>
import { countries } from '@/assets/js/dictionary.js'
import { orderDetail, packagDetail, outStockDetail, packagNumberAdd, packagNumberDetail, clientList, packagMaterialList, packagCreate, outStockAdd, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'packagOutStockDetail',
      showMsg: false,
      msgFlag: window.localStorage.getItem('packagOutStockDetail') ? JSON.parse(window.localStorage.getItem('packagOutStockDetail')).msgFlag : false,
      msgUrl: '',
      content: '',
      loading: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      batchList: [],
      show: false,
      flag: true,
      id: 1,
      confirmLoading: false,
      addPackNumberList: [],
      changePackInfo: {},
      changePackShow: false,
      changeOutStockInfo: {},
      changeOutStockShow: false,
      clientList: [],
      country: countries.split('、'),
      productList: [],
      packTypeList: [],
      addPackCost: false
    }
  },
  watch: {
    'changePackInfo': {
      deep: true,
      handler (newVal) {
        newVal.product_info.forEach(item => {
          item.all_number = item.one_number * ((newVal.pack_end > newVal.pack_start ? newVal.pack_end : newVal.pack_start) - newVal.pack_start + 1)
        })
        console.log(newVal.start, newVal.end)
      }
    }
  },
  methods: {
    afterSave (data) {
      this.msgFlag = data.msgFlag
    },
    sendMsg () {
      let data = JSON.parse(window.localStorage.getItem(this.localName))
      let formData = {
        title: data.title,
        type: data.type,
        tag: '工序',
        content: this.content,
        router_url: this.msgUrl,
        receive_user: data.receive_user
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {
          this.$message.success('添加成功')
          this.getData()
        }
      })
    },
    addProduct () {
      this.changePackInfo.product_info.push({
        all_number: '',
        one_number: '',
        product: []
      })
    },
    deleteProduct (key) {
      this.changePackInfo.product_info.splice(key, 1)
    },
    changeLog (item, type) {
      console.log(item)
      if (type) {
        this.changePackInfo = JSON.parse(JSON.stringify(item))
        // this.changePackInfo.pack_start = item.pack_code.split('-')[0]
        // this.changePackInfo.pack_end = item.pack_code.split('-')[1]
        this.changePackInfo.pack_type = this.packTypeList.find(key => this.changePackInfo.pack_material === key.name).id
        this.changePackShow = true
      } else {
        this.changeOutStockInfo = JSON.parse(JSON.stringify(item))
        this.changeOutStockInfo.client_id = this.changeOutStockInfo.client_id.toString()
        this.changeOutStockShow = true
      }
    },
    submit (type) {
      let data = []
      if (this.addPackCost) {
        if (!this.changeOutStockInfo.cost) {
          this.$message({
            type: 'error',
            message: `请输入运输费用`
          })
          return
        }
      }
      if (type === 'outStock') {
        let flag = true
        if (!this.changeOutStockInfo.client_name) {
          this.$message({
            type: 'error',
            message: `请选择运输单位`
          })
          flag = false
          return
        }
        if (!this.changeOutStockInfo.number) {
          this.$message({
            type: 'error',
            message: `请输入出库箱数`
          })
          flag = false
          return
        }
        if (!this.changeOutStockInfo.cubic_number) {
          this.$message({
            type: 'error',
            message: `请输入出库立方数`
          })
          flag = false
          return
        }
        data.push({
          company_id: window.sessionStorage.getItem('company_id'),
          order_id: this.$route.params.id,
          batch_id: this.changeOutStockInfo.batch_id,
          user_id: window.sessionStorage.getItem('user_id'),
          client_id: this.changeOutStockInfo.client_id,
          number: this.changeOutStockInfo.number,
          cubic_number: this.changeOutStockInfo.cubic_number,
          country: this.changeOutStockInfo.country,
          address: this.changeOutStockInfo.address,
          port: this.changeOutStockInfo.port,
          cost: this.changeOutStockInfo.cost,
          desc: this.changeOutStockInfo.desc
        })
        if (flag) {
          outStockAdd({
            id: this.changeOutStockInfo.id,
            data: data
          }).then(res => {
            if (res.data.code === 200 && res.data.status) {
              this.$message.success('修改成功')
              this.addPackCost = false
              this.changeOutStockShow = false
              this.getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      } else if (type === 'pack') {
        let flag = true
        if (!this.changePackInfo.pack_start) {
          this.$message({
            type: 'error',
            message: `请输入起始序号`
          })
          flag = false
          return
        }
        if (!this.changePackInfo.pack_end) {
          this.$message({
            type: 'error',
            message: `请输入末尾序号`
          })
          flag = false
          return
        }
        if (!this.changePackInfo.pack_material_id) {
          this.$message({
            type: 'error',
            message: `请选择包装类型`
          })
          flag = false
          return
        }
        if (!this.changePackInfo.weight) {
          this.$message({
            type: 'error',
            message: `请输入毛重`
          })
          flag = false
          return
        }
        if (!this.changePackInfo.net_weight) {
          this.$message({
            type: 'error',
            message: `请输入净重`
          })
          flag = false
          return
        }
        this.changePackInfo.product_info.forEach(valPro => {
          if (valPro.product.length === 0) {
            this.$message({
              type: 'error',
              message: `请选择产品`
            })
            flag = false
            return
          }
          if (!valPro.one_number) {
            this.$message({
              type: 'error',
              message: `请输入单箱产品数量`
            })
            flag = false
            return
          }
          if (!valPro.all_number) {
            this.$message({
              type: 'error',
              message: `请检查序号与单箱数量数据类型是否正确(数值)`
            })
            flag = false
          }
        })
        data.push({
          order_id: this.$route.params.id,
          user_id: window.sessionStorage.getItem('user_id'),
          pack_code: this.changePackInfo.pack_start + '-' + (this.changePackInfo.pack_end ? this.changePackInfo.pack_end : this.changePackInfo.pack_start),
          pack_material: this.changePackInfo.pack_material_id,
          weight: this.changePackInfo.weight,
          net_weight: this.changePackInfo.net_weight,
          product_info: JSON.stringify(this.changePackInfo.product_info),
          desc: this.changePackInfo.desc,
          batch_id: this.changePackInfo.bacth_id
        })
        if (flag) {
          packagCreate({
            id: this.changePackInfo.id,
            data: data
          }).then(res => {
            if (res.data.code === 200 && res.data.status) {
              this.$message.success('修改成功')
              this.changePackShow = false
              this.getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
        console.log(this.changePackInfo)
      }
    },
    closeConfirm (key, item, batchId) {
      if (!key) {
        this.show = false
      } else {
        this.confirmLoading = true
        console.log(item)
        let flag = true
        item.forEach((valPro, indPro) => {
          valPro.size_info.forEach((valSize, indSize) => {
            if (!valSize.pack_number) {
              this.confirmLoading = false
              this.$message({
                type: 'error',
                message: '请填写实际装箱数量'
              })
              flag = false
            }
          })
        })
        if (flag) {
          packagNumberAdd({
            company_id: window.sessionStorage.getItem('company_id'),
            order_id: this.$route.params.id,
            user_id: window.sessionStorage.getItem('user_id'),
            batch_id: batchId,
            product_info: JSON.stringify(item)
          }).then(res => {
            this.confirmLoading = false
            this.show = false
            if (this.msgFlag) {
              this.msgUrl = '/index/packagOutStockDetail/' + this.$route.params.id
              this.content = '订单' + this.order_code + '<span style="color:#1A95FF">添加实际装箱</span>'
              this.sendMsg()
            } else {
              this.$message.success('添加成功')
              this.getData()
            }
          })
        }
      }
    },
    chazhi (planNumber, packNumber) {
      if (!packNumber) {
        return '暂无数据'
      } else {
        if (Number(planNumber) > Number(packNumber)) {
          let num = planNumber - packNumber
          return '短装' + num + '条'
        } else if (Number(planNumber) < Number(packNumber)) {
          let num = (planNumber - packNumber) * -1
          return '多装' + num + '条'
        } else {
          return '正常装箱'
        }
      }
    },
    appendPack (id) {
      this.id = id
      this.show = true
    },
    timeGet (time, packTime) {
      let nowTime = packTime ? new Date(packTime).getTime() : new Date().getTime()
      let times = (nowTime - (new Date(time).getTime())) / 1000 / 60 / 60 / 24
      if (times > 0) {
        if (packTime) {
          return '超时' + Math.floor(times) + '天'
        } else {
          return '延期' + Math.floor(times) + '天'
        }
      } else {
        if (packTime) {
          return '正常出库'
        } else {
          return '剩余' + Math.floor(times) * -1 + '天'
        }
      }
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
    go (idName) {
      console.log(idName)
      document.getElementById(idName).scrollIntoView(true)
    },
    chinaNumber (key) {
      let obj = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      }
      if (key / 10 > 1) {
        let str = ''
        str = obj[Math.floor(key / 10)] + '十' + obj[key % 10]
        return str
      } else {
        return obj[key]
      }
    },
    getData () {
      this.loading = true
      this.batchList = []
      Promise.all([
        orderDetail({
          id: this.$route.params.id
        }),
        packagDetail({
          order_id: this.$route.params.id
        }),
        outStockDetail({
          order_id: this.$route.params.id
        }),
        packagNumberDetail({
          order_id: this.$route.params.id
        })
      ]).then(res => {
        this.loading = true
        let orderInfo = res[0].data.data
        let packagInfo = res[1].data.data
        let outStockInfo = res[2].data.data
        let packagNumberInfo = res[3].data.data
        console.log(res)
        // 初始化订单信息
        this.order_code = orderInfo.order_code
        this.client_name = orderInfo.client_name
        this.order_time = orderInfo.order_time
        this.group_name = orderInfo.group_name
        // 初始化发货批次信息
        for (let prop in orderInfo.order_batch) {
          let valBatch = orderInfo.order_batch[prop]
          valBatch.forEach(valPro => {
            let flag = this.batchList.find(key => key.id === valPro.batch_id)
            if (!flag) {
              this.batchList.push({
                id: valPro.batch_id,
                delivery_time: valPro.delivery_time,
                logFlag: false,
                packagInfoList: [],
                outStockInfoList: [],
                product_info: [{
                  product_code: valPro.product_code,
                  product_type: valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name + (valPro.category_info.flower_name ? '/' + valPro.category_info.flower_name : ''),
                  size_info: [{
                    size: valPro.size,
                    color: valPro.color,
                    number: valPro.numbers
                  }]
                }]
              })
            } else {
              let flag1 = flag.product_info.find(key => key.product_code === valPro.product_code)
              if (!flag1) {
                flag.product_info.push({
                  product_code: valPro.product_code,
                  product_type: valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name + (valPro.category_info.flower_name ? '/' + valPro.category_info.flower_name : ''),
                  size_info: [{
                    size: valPro.size,
                    color: valPro.color,
                    number: valPro.numbers
                  }]
                })
              } else {
                let flag2 = flag1.size_info.find(key => (key.size === valPro.size && key.color === valPro.color))
                if (!flag2) {
                  flag1.size_info.push({
                    size: valPro.size,
                    color: valPro.color,
                    number: valPro.numbers
                  })
                } else {
                  flag2.number = Number(flag2.number) + Number(valPro.numbers)
                }
              }
            }
            // 初始化装箱产品信息
            let str = valPro.product_code + ' ' + valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name + (valPro.category_info.flower_name ? '/' + valPro.category_info.flower_name : '')
            let fleg = this.productList.find(key => key.value === str)
            if (!fleg) {
              this.productList.push({
                value: str,
                label: str,
                children: [
                  {
                    label: valPro.size,
                    value: valPro.size,
                    children: [{
                      label: valPro.color,
                      value: valPro.color
                    }]
                  }
                ]
              })
            } else {
              let fleg1 = fleg.children.find(key => key.value === valPro.size)
              if (!fleg1) {
                fleg.children.push({
                  value: valPro.size,
                  label: valPro.size,
                  children: [{
                    value: valPro.color,
                    label: valPro.color
                  }]
                })
              } else {
                let fleg2 = fleg1.children.find(key => key.value === valPro.color)
                if (!fleg2) {
                  fleg1.children.push({
                    value: valPro.color,
                    label: valPro.color
                  })
                }
              }
            }
          })
        }
        this.addPackNumberList = JSON.parse(JSON.stringify(this.batchList))
        console.log(this.addPackNumberList)
        // 初始化包装信息
        packagInfo.forEach(item => {
          let flag = this.batchList.find(key => key.id === item.bacth_id)
          if (flag) {
            item.product_info = JSON.parse(item.product_info)
            // console.log(item)
            flag.packagInfoList.push(item)
          }
        })
        // 初始化出库信息
        outStockInfo.forEach(item => {
          let flag = this.batchList.find(key => key.id === item.batch_id)
          if (flag) {
            flag.outStockInfoList.push(item)
          }
        })
        // 初始化装箱数量
        packagNumberInfo.forEach(item => {
          item.product_info = JSON.parse(item.product_info)
          item.product_info.forEach(valPro => {
            valPro.size_info.forEach(valSize => {
              let flag = this.batchList.find(key => key.id === item.batch_id)
              if (flag) {
                let flag1 = flag.product_info.find(key => key.product_code === valPro.product_code)
                flag.packag_time = item.updated_at.split(' ')[0]
                if (flag1) {
                  let flag2 = flag1.size_info.find(key => (key.size === valSize.size && key.color === valSize.color))
                  if (flag2) {
                    flag2.pack_number = Number(flag2.pack_number ? flag2.pack_number : 0) + Number(valSize.pack_number)
                  }
                }
              }
            })
          })
        })
        this.loading = false
      })
    }
  },
  created () {
    this.getData()
    packagMaterialList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.packTypeList = res.data.data
    })

    clientList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.clientList = res.data.data.filter(res => res.type.indexOf(8) !== -1)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/semiExaminationDetail.less";
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
        display: flex;
        align-items: center;
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
        .el-input,
        .el-select {
          height: 40px;
          .el-input__inner {
            height: 40px;
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
