<template>
  <div id="orderCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加样单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">样单标题：</span>
          <el-input class="elInput"
            v-model="orderTitle"
            placeholder="请输入样单标题"></el-input>
          <!-- <span>{{order_code}}</span> -->
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">样单类型：</span>
          <el-select class="elInput"
            v-model="orderType"
            placeholder="请选择样单类型"
            @change="getContacts">
            <el-option v-for="item in sampleTypeArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">外贸公司：</span>
          <el-select class="elInput"
            v-model="company"
            placeholder="请选择外贸公司"
            @change="getContacts">
            <el-option v-for="item in companyArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label">联系人：</span>
          <el-select class="elInput"
            v-model="contacts"
            placeholder="请选择联系人">
            <el-option v-for="item in contactsArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">下单日期：</span>
          <el-date-picker value-format="yyyy-MM-dd"
            class="elInput"
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="inputCtn">
          <span class="label must">负责小组：</span>
          <el-select class="elInput"
            v-model="group"
            placeholder="请选择小组">
            <el-option v-for="item in groupArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">添加产品：</span>
          <div class="lineSearch">
            <el-cascader expand-trigger="hover"
              class="elInput"
              placeholder="请选择产品类别"
              :options="typeArr"
              v-model="types"
              @change="getSearch"
              clearable>
            </el-cascader>
            <el-select class="elInput"
              v-model="flower"
              placeholder="请选择产品花型"
              @change="getSearchList"
              clearable>
              <el-option @change="getSearch"
                v-for="item in flowerArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select class="elInput"
              v-model="hasJHD"
              placeholder="配料单筛选"
              @change="getSearchList"
              clearable>
              <el-option @change="getSearch"
                v-for="item in hasJHDArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker @change="getSearch"
              value-format="yyyy-MM-dd"
              class="elInput"
              v-model="dateSearch"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-input class="elInput"
              placeholder="产品编号搜索"
              suffix-icon="el-icon-search"
              v-model="search"
              @keyup.enter.native="getSearch">
            </el-input>
          </div>
          <div class="lineTable">
            <div class="lineHead">
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
            </div>
            <div class="lineBody"
              ref="scrollBox">
              <div class="list"
                v-for="item in seachProduct"
                :key="item.id">
                <div class="flex"
                  style="color:#10AEF5;cursor:help"
                  @click="openUrl('/index/productDetail/'+item.product_code)">{{item.product_code}}</div>
                <div class="flex">{{item|filterType}}</div>
                <div class="flex">{{item.flower_id}}</div>
                <div class="flex">{{item.user_name}}</div>
                <div class="flex">{{item.create_time}}</div>
                <div class="flex">
                  <el-checkbox v-model="item.checked"
                    @change="checked(true,item)"></el-checkbox>
                </div>
              </div>
              <div class="list"
                v-if="nomore"
                style="text-align:center;display:block;color:rgb(181,181,181)">没有更多产品信息</div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn col">
        <!-- <div class="inputCtn oneLine">
          <el-radio-group v-model="settleFun"
            class="elInput"
            @change="changeSettleFun">
            <el-radio :label="true">按单件计算费用</el-radio>
            <el-radio :label="false">按订单计算费用</el-radio>
          </el-radio-group>
        </div> -->
        <div class="inputCtn"
          v-if="productArr.length === 0">
          <span class="label">已选产品：</span>
          暂无已选样品
        </div>
        <div class="inputCtn oneLine"
          v-for="(item,key) in productArr"
          :key="key">
          <span class="label"
            v-if="key === 0">已选产品：</span>
          <el-select v-model="item.id"
            class="elInput"
            disabled
            placeholder="请选择样品">
            <el-option v-for="item in seachProduct"
              :key="item.id"
              :label="item.product_code + '(' + item.category_info.product_category + '/' + item.type_name + '/'  + item.style_name + ')'"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="delete"
            @click="checked(false,item)">删除</span>
          <el-input v-model="item.price"
            v-if="settleFun"
            class="elInput"
            style="width:140px"
            placeholder="样品单价">
            <template slot="append">元</template>
          </el-input>
          <el-input v-model="item.number"
            class="elInput"
            style="width:140px;margin-left:8px"
            placeholder="打样数量">
            <template slot="append">{{item.category_info.name}}</template>
          </el-input>
        </div>
      </div>
      <!-- <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">样费承担：</span>
          <el-input class="elInput"
            v-model="exchangeRate"
            placeholder="请输入客户承担比例(默认0%)">
            <template slot="append">%</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">打样费用：</span>
          <el-input class="elInput"
            v-model="totalMoney"
            placeholder="总价"></el-input>
        </div>
      </div> -->
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">样单交期：</span>
          <el-date-picker value-format="yyyy-MM-dd"
            class="elInput"
            v-model="presentDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">上传文件：</span>
          <el-upload class="upload-demo"
            action="http://upload.qiniup.com/"
            accept=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeAvatarUpload"
            :data="postData"
            ref="uploada"
            list-type="picture">
            <el-button size="small"
              type="primary">点击上传</el-button>
            <div slot="tip"
              class="el-upload__tip">请不要上传超过20M的文件</div>
          </el-upload>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label">备注：</span>
          <el-input style="width:670px"
            type="textarea"
            :rows="6"
            class="elInput"
            v-model="otherInfo"
            placeholder="其他信息填写"></el-input>
        </div>
      </div>
      <div class="bottom">
        <div class="cancleBtn"
          @click="$router.push('/index/orderList')">返回</div>
        <div class="okBtn"
          @click="saveAll">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { clientList, productList, productTppeList, flowerList, orderSave, getGroup, getToken } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      orderTitle: '',
      orderType: '',
      sampleTypeArr: [{
        id: 0,
        name: '开发样'
      }, {
        id: 1,
        name: '修改样'
      }, {
        id: 2,
        name: '销售样'
      }, {
        id: 3,
        name: '确认样'
      }, {
        id: 4,
        name: '产前样'
      }, {
        id: 5,
        name: '大货样'
      }],
      company: '',
      companyArr: [],
      contacts: '',
      contactsArr: [],
      date: '',
      group: '',
      groupArr: [],
      typeArr: [],
      types: [],
      dateSearch: '',
      flower: '',
      flowerArr: [],
      hasJHD: '',
      hasJHDArr: [{
        id: null,
        name: '全部'
      }, {
        id: 1,
        name: '有'
      }, {
        id: 0,
        name: '无'
      }],
      search: '',
      seachProduct: [],
      settleFun: true,
      productArr: [],
      exchangeRate: '',
      totalMoney: 0,
      presentDate: '',
      total: '',
      otherInfo: '',
      postData: { token: '' },
      page: 1,
      companyId: window.sessionStorage.getItem('company_id'),
      scrollTop: 0,
      timer: null,
      nomore: false
    }
  },
  methods: {
    // 计算方式改变
    changeSettleFun () {
      console.log(this.settleFun)
    },
    // 根据选取的外贸公司获取联系人
    getContacts (id) {
      this.contactsArr = this.companyArr.find((item) => item.id === id).contacts
    },
    checked (flag, item) {
      if (flag) {
        if (item.checked) {
          let flag = this.productArr.find(value => value.id === item.id)
          if (!flag) {
            this.productArr.push(item)
          }
        } else {
          let flag = this.productArr.find(value => value.id === item.id)
          if (flag) {
            flag.checked = false
          }
          this.productArr = this.productArr.filter(value => value.checked)
        }
      } else {
        let flag = this.seachProduct.find(value => value.id === item.id)
        if (flag) {
          flag.checked = false
        }
        item.checked = false
        this.productArr = this.productArr.filter(value => value.checked)
      }
    },
    // 获取产品加入搜索条件后的列表
    getSearchList () {
      this.loading = true
      let date = new Date()
      let endTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      productList({
        company_id: this.companyId,
        limit: 5,
        page: this.page,
        category_id: this.types[0] || null,
        style_id: this.types[2] || null,
        type_id: this.types[1] || null,
        flower_id: this.flower || null,
        start_time: this.dateSearch || null,
        end_time: endTime,
        product_code: this.search || null,
        has_plan: this.hasJHD,
        type: 2
      }).then((res) => {
        this.loading = false
        if (this.page === 1) {
          this.nomore = false
          this.seachProduct = res.data.data
          this.seachProduct.forEach(item => {
            let flag = this.productArr.find(key => key.id === item.id)
            if (flag) {
              item.checked = flag.checked
            }
          })
        } else {
          this.seachProduct = this.seachProduct.concat(res.data.data)
          if (res.data.data.length < 5) {
            this.nomore = true
          }
        }
      })
    },
    // 如果是选筛选条件,需要page重置
    getSearch () {
      this.page = 1
      this.scrollTop = 0
      this.getSearchList()
    },
    // 文件上传相关操作
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeAvatarUpload: function (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isLt2M = file.size / 1024 / 1024 < 20
      // const isReapeat = this.fileArr.find((item) => {
      //   return item.key === file.name
      // })
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 20MB!')
        return false
      }
      // if (isReapeat) {
      //   this.$message.error('不能重复上传图片')
      //   return false
      // }
    },
    handleSuccess (res, file) {
      console.log(res)
    },
    // 清空
    clearAll () {
    },
    // 保存
    saveAll () {
      if (!this.lock) {
        if (!this.orderId) {
          this.$message.error({
            message: '订单号未填写，请输入订单号'
          })
          return
        }
        if (!this.company) {
          this.$message.error({
            message: '外贸公司未选择，请选择外贸公司'
          })
          return
        }
        if (!this.contacts) {
          this.$message.error({
            message: '联系人未选择，请选择联系人'
          })
          return
        }
        if (!this.money) {
          this.$message.error({
            message: '结算单位未选择，请选择结算单位'
          })
          return
        }
        if (!this.exchangeRate) {
          this.$message.error({
            message: '汇率未填写，请填写汇率'
          })
          return
        }
        if (!this.taxRate) {
          this.$message.error({
            message: '税率未填写，请填写税率'
          })
          return
        }
        if (!this.date) {
          this.$message.error({
            message: '下单日期未选择，请选择下单日期'
          })
          return
        }
        if (!this.group) {
          this.$message.error({
            message: '负责小组未选择，请选择负责小组'
          })
          return
        }
        let timeState = true
        let productState = true
        let sizeState = true
        this.orderArr.forEach((itemOrder) => {
          if (!itemOrder.date) {
            timeState = false
          }
          itemOrder.product.forEach((itemProduct) => {
            if (!itemProduct.name) {
              productState = false
            }
            itemProduct.size.forEach((itemSize, indexSize) => {
              itemProduct.size.forEach((item, index) => {
                if (itemSize.name.length > 0 && indexSize !== index) {
                  if (itemSize.name[0] === item.name[0] && itemSize.name[1] === item.name[1]) {
                    sizeState = false
                  }
                }
              })
              if (!itemSize.numbers) {
                productState = false
              }
              if (!itemSize.unitPrice) {
                productState = false
              }
              if (itemSize.name.length === 0) {
                productState = false
              }
            })
          })
        })
        if (!timeState) {
          this.$message.error({
            message: '交货日期填写不完整，请检查'
          })
          return
        }
        if (!productState) {
          this.$message.error({
            message: '产品信息填写不完整，请检查'
          })
          return
        }
        if (!sizeState) {
          this.$message.error({
            message: '检测到同一批次中有相同的产品颜色和尺寸,请合并后提交'
          })
          return
        }
        const fileArr = this.$refs.uploada.uploadFiles.map((item) => { return 'http://zhihui.tlkrzf.com/' + item.response.key })
        let obj = {
          company_id: this.companyId,
          user_id: window.sessionStorage.getItem('user_id'),
          order_code: this.orderId,
          client_id: this.company,
          contacts: this.contacts,
          account_unit: this.money,
          exchange_rate: this.exchangeRate,
          tax_rate: this.taxRate,
          order_time: this.date,
          group_id: this.group,
          order_info: this.orderArr.map((item, index) => {
            return {
              batch_info: item.product.map((item) => {
                return {
                  productCode: item.name,
                  size: item.size,
                  productInfo: item.product_info
                }
              }),
              delivery_time: item.date,
              batch_id: parseInt(index + 1)
            }
          }),
          total_price: this.totalMoney,
          remark: this.otherInfo,
          total_price_RMB: this.totalMoney * this.exchangeRate / 100,
          file_url: JSON.stringify(fileArr)
        }
        this.lock = true
        this.loading = true
        orderSave(obj).then((res) => {
          console.log(res)
          if (res.data.status) {
            this.$message.success({
              message: '添加订单成功'
            })
            if (res.data && res.data.data) {
              this.$router.push('/index/orderDetailNew/' + res.data.data)
            }
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
          this.lock = false
          this.loading = false
        })
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      }
    }
  },
  created () {
    Promise.all([clientList({
      company_id: this.companyId,
      keyword: '',
      status: ''
    }), productList({
      company_id: this.companyId,
      category_id: null,
      style_id: null,
      type_id: null,
      flower_id: null,
      start_time: null,
      end_time: null,
      plan_code: null,
      has_plan: null,
      limit: 5,
      page: 1,
      type: 2
    }), productTppeList({
      company_id: this.companyId
    }), flowerList({
      company_id: this.companyId
    }), getGroup({
      company_id: this.companyId
    }), getToken()]).then((res) => {
      console.log(res[1])
      this.companyArr = res[0].data.data.filter((item) => (item.type.indexOf(1) !== -1))
      this.seachProduct = res[1].data.data
      this.typeArr = res[2].data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          child_footage: item.child_footage,
          child_size: item.child_size,
          children: item.child.length === 0 ? null : item.child.map((item) => {
            return {
              value: item.id,
              label: item.name,
              children: item.child.length === 0 ? null : item.child.map((item) => {
                return {
                  value: item.id,
                  label: item.name
                }
              })
            }
          })
        }
      })
      console.log(this.typeArr)
      this.flowerArr = res[3].data.data
      this.groupArr = res[4].data.data
      this.postData.token = res[5].data.data
      this.loading = false
    })
  },
  mounted () {
    // 给产品列表做优化
    this.$refs.scrollBox.addEventListener('scroll', (ev) => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (ev.target.scrollTop - this.scrollTop > 60) {
          console.log('刷新数据')
          this.scrollTop = ev.target.scrollTop
          this.page++
          this.getSearchList()
        }
      }, 300)
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/sampleOrderCreate.less";
</style>
<style lang="less">
#orderCreate {
  .el-radio__label {
    color: #666;
    font-weight: 400;
  }
}
</style>
