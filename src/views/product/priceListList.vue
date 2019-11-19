<template>
  <div id="orderList"
    v-loading="loading"
    v-getHash="{'searchVal':searchVal,'pages':pages,'company':company,'status':status}">
    <div class="head">
      <h2>产品报价单列表</h2>
      <div>
        <el-input placeholder="输入产品编号精确搜索"
          suffix-icon="el-icon-search"
          v-model="searchProVal"></el-input>
        <el-input placeholder="输入报价单编号精确搜索"
          style="margin-left:8px"
          suffix-icon="el-icon-search"
          v-model="searchVal"></el-input>
      </div>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
            v-show="companyCmp"
            @close="clear('company')">{{companyCmp}}</el-tag>
          <el-tag closable
            v-show="statusCmp"
            @close="clear('status')">{{statusCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="company"
              filterable
              @change="getContacts"
              placeholder="外贸公司">
              <el-option v-for="item in companyArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="status"
              filterable
              placeholder="审核状态">
              <el-option v-for="item in statusArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="rightFilter">
            <el-date-picker v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="pickTime">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="mergeTable">
        <div class="mergeHeader">
          <div class="tableColumn">报价单号</div>
          <div class="tableColumn"
            style="flex:1.5">外贸公司</div>
          <div class="tableColumn"
            style="flex:2">产品信息</div>
          <div class="tableColumn">产品图片</div>
          <div class="tableColumn">产品报价</div>
          <div class="tableColumn">起订数量</div>
          <div class="tableColumn">创建日期</div>
          <div class="tableColumn">审核状态</div>
          <div class="tableColumn"
            style="flex:1.5">操作</div>
        </div>
        <div class="mergeBody"
          v-for="(item ,index) in list"
          :key="index">
          <div class="tableColumn">{{item.quotation_code}}</div>
          <div class="tableColumn"
            style="flex:1.5">{{item.client_name}}</div>
          <div class="tableColumn"
            style="flex:2">
            <div class="small"
              v-for="(itemPro,indexPro) in item.product_info"
              style="height:60px;text-align:center;justify-content:space-around"
              :key="indexPro">
              {{itemPro.product_info.product_code ? itemPro.product_info.product_code + '(' + [itemPro.product_info.category_name ,itemPro.product_info.type_name,itemPro.product_info.style_name].join('/') + ')' : '' }}
            </div>
          </div>
          <div class="tableColumn">
            <div class="imgCtn small"
              v-for="(itemProduct,indexProduct) in item.product_info"
              :key="indexProduct">
              <img class="img"
                :src="itemProduct.product_info.images.length>0?itemProduct.product_info.images[0].thumb:require('@/assets/image/index/noPic.jpg')"
                :onerror="defaultImg" />
              <div class="toolTips"
                v-if="itemProduct.product_info.images.length>0"><span @click="showImg(itemProduct.product_info.images)">点击查看大图</span></div>
              <div class="toolTips"
                v-if="itemProduct.product_info.images.length===0"><span>没有预览图</span></div>
            </div>
          </div>
          <div class="tableColumn">{{item|cmpPrice}}元</div>
          <div class="tableColumn">{{item.number}}件</div>
          <div class="tableColumn">{{item.created_at.slice(0,10)}}</div>
          <div class="tableColumn"
            :style="{'color':getColor(item.status)}">{{item.status|filterStatus}}</div>
          <div class="tableColumn"
            style="flex-direction:row;flex:1.5;">
            <div style="margin:auto">
              <span class="btns warning"
                @click="$router.push('/index/priceListUpdate/'+item.id)">修改</span>
              <span class="btns success"
                @click="$router.push('/index/priceListDetail/'+item.id)">审核</span>
              <span class="btns error"
                @click="deletePriceList(item.id)">删除</span>
            </div>
          </div>
        </div>
        <div class="mergeBody"
          style="display:flex;justify-content:center;align-items:center;color:#DDD;"
          v-if="list.length === 0">
          暂无报价单
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="15"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getList">
        </el-pagination>
      </div>
    </div>
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="closeBtn"
          @click="showShade=false">点此退出预览</div>
        <el-carousel indicator-position="outside"
          height="550px"
          arrow="always">
          <el-carousel-item v-for="item in imgList"
            :key="item.image_url">
            <img :src="item.image_url"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { priceListList, clientList, deletePriceList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      first: true, // 判断是不是第一次进入页面
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
      imgList: [],
      loading: true,
      searchVal: '',
      searchProVal: '',
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
      },
      total: 0,
      pages: 1,
      list: [],
      timer: '',
      start_time: '',
      end_time: '',
      companyArr: [],
      company: '',
      contactsArr: [],
      contacts: '',
      status: status,
      statusArr: [{
        value: 1,
        label: '待审核'
      }, {
        value: 2,
        label: '已通过'
      }, {
        value: 3,
        label: '驳回'
      }]
    }
  },
  watch: {
    company (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getList()
      }
    },
    group (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getList()
      }
    },
    status (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getList()
      }
    },
    searchVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getList()
      }
    },
    searchProVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getList()
      }
    }
  },
  computed: {
    companyCmp () {
      if (this.company) {
        return this.companyArr.find((item) => item.id === this.company).name
      } else {
        return '所有单位'
      }
    },
    contactsCmp () {
      if (this.contacts) {
        return this.contactsArr.find((item) => item.id === this.contacts).name
      } else {
        return ''
      }
    },
    statusCmp () {
      if (this.status) {
        return this.statusArr.find((item) => item.value === this.status).label
      } else {
        return ''
      }
    }
  },
  filters: {
    cmpPrice (val) {
      return ((val.material_info).reduce((total, current) => {
        return total + Number(current.total_price ? current.total_price : 0)
      }, 0) + (val.assist_info).reduce((total, current) => {
        return total + Number(current.total_price ? current.total_price : 0)
      }, 0) + (val.weave_info).reduce((total, current) => {
        return total + Number(current.price ? current.price : 0)
      }, 0) + (val.semi_product_info).reduce((total, current) => {
        return total + Number(current.price ? current.price : 0)
      }, 0) + (val.pack_material_info).reduce((total, current) => {
        return total + Number(current.price ? current.price : 0)
      }, 0) + (val.production_info).reduce((total, current) => {
        return total + Number(current.price ? current.price : 0)
      }, 0) + (val.desc_info).reduce((total, current) => {
        return total + Number(current.price ? current.price : 0)
      }, 0) + Number(val.transport_cost) + Number(val.no_product_cost) + Number(JSON.parse(val.profit).price) + Number(JSON.parse(val.commission).price) + Number(JSON.parse(val.tax).price)).toFixed(2)
    },
    filterStatus (val) {
      let arr = ['暂无', '待审核', '已通过', '驳回']
      return arr[val]
    }
  },
  methods: {
    // 删除报价单
    deletePriceList (id) {
      this.$confirm('此操作将永久删除该报价单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePriceList({
          id: id
        }).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            window.location.reload()
          } else {
            this.$message({
              type: 'error',
              message: res.data.massage
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    getList () {
      this.loading = true
      priceListList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 15,
        page: this.pages,
        start_time: this.start_time,
        end_time: this.end_time,
        status: this.status,
        client_id: this.company,
        code: this.searchVal,
        product_code: this.searchProVal
      }).then((res) => {
        this.total = res.data.meta.total
        res.data.data.forEach(item => {
          if (item.file_url && JSON.parse(item.file_url)) {
            if (item.product_info && item.product_info[0] && item.product_info[0].product_info && item.product_info[0].product_info.images && item.product_info[0].product_info.images[0]) {
              item.product_info[0].product_info.images = item.product_info[0].product_info.images.concat(JSON.parse(item.file_url).map(vals => {
                return {
                  image_url: vals,
                  thumb: vals
                }
              }))
            } else {
              item.product_info = [{
                product_info: {
                  images: JSON.parse(item.file_url).map(vals => {
                    return {
                      image_url: vals,
                      thumb: vals
                    }
                  })
                }
              }]
            }
          }
        })
        this.list = res.data.data.map((item) => {
          return {
            id: item.id,
            client_name: item.client_name,
            quotation_code: item.quotation_code,
            contact_name: item.contact_name,
            exchange_rate: item.exchange_rate,
            account_unit: item.account_unit,
            product_info: item.product_info,
            product_need: item.product_need,
            material_info: JSON.parse(item.material_info),
            assist_info: JSON.parse(item.assist_info),
            weave_info: JSON.parse(item.weave_info),
            semi_product_info: JSON.parse(item.semi_product_info),
            pack_material_info: JSON.parse(item.pack_material_info),
            production_info: JSON.parse(item.production_info),
            no_product_cost: item.no_product_cost,
            desc_info: JSON.parse(item.desc_info),
            transport_cost: item.transport_cost,
            number: item.number,
            profit: item.profit,
            commission: item.commission,
            tax: item.tax,
            desc: item.desc,
            created_at: item.created_at,
            status: item.status
          }
        })
        this.first = false
        this.loading = false
      })
    },
    getContacts (id) {
      this.contactsArr = this.companyArr.find((item) => item.id === id).contacts
    },
    pickTime (date) {
      if (date) {
        this.start_time = date[0]
        this.end_time = date[1]
      } else {
        this.start_time = ''
        this.end_time = ''
      }
      this.pages = 1
      this.getList()
    },
    // 删除条件
    clear (item) {
      if (item === 'company') {
        this.company = ''
      }
      if (item === 'status') {
        this.status = ''
      }
    },
    getColor (val) {
      let arr = ['#ddd', '#1A95FF', '#67c23a', '#F56C6C']
      return arr[val]
    }
  },
  created () {
    const hash = window.location.hash ? JSON.parse(decodeURIComponent(window.location.hash).slice(1)) : {}
    // 分页的特殊性单独处理
    this.pages = hash.pages
    Promise.all([clientList({
      company_id: window.sessionStorage.getItem('company_id'),
      keyword: '',
      status: 1
    })]).then((res) => {
      this.companyArr = res[0].data.data.filter((item) => (item.type.indexOf(1) !== -1))
      for (let key in hash) {
        this[key] = hash[key]
      }
      this.getList()
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/orderList.less";
</style>
<style lang="less">
#orderList {
  .el-carousel__arrow {
    color: #fff;
    background: #1a95ff;
    &:hover {
      background: #48aaff;
    }
  }
}
.hoverBlue {
  &:hover {
    color: #1a95ff;
  }
}
.imgCtn {
  position: relative;
  width: 100%;
  height: 100%;
  &:hover {
    .toolTips {
      display: block;
    }
  }
  .img {
    width: 48px;
    padding: 6px;
    height: 48px;
    margin: auto;
  }
  .toolTips {
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 60px;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    cursor: pointer;
    span {
      color: #fff;
      &:hover {
        color: #1a95ff;
      }
    }
  }
}
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .main {
    width: 1000px;
    height: 600px;
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    .imgList {
      max-height: 550px;
      margin: auto;
      display: block;
    }
    .closeBtn {
      position: absolute;
      right: 0;
      top: -78px;
      color: #fff;
      width: 100%;
      text-align: center;
      font-size: 26px;
      cursor: pointer;
      &:hover {
        color: #1a95ff;
      }
    }
  }
}
</style>
