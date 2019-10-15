<template>
  <div id="productMenuEdit"
    v-loading="loading">
    <div class="head">
      <h2>产品手册设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">已选产品:</span>
          <div class="content">
            <div class="listCtn">
              <div class="productBox"
                v-for="(item,key) in checkedProList"
                :key="key">
                <div class="box-top">
                  <img :src="(item.thumb && item.thumb.length !== 0) ? item.thumb[0] : require('@/assets/image/index/noPic.jpg')"
                    alt="">
                  <!-- @load="showClearImg((item.img && item.img.length !== 0) ? item.img[0].img_url : false,key)" -->
                </div>
                <div class="box-bottom">
                  <span>{{item.product_code}}</span>
                  <span>{{item.category_name + '/' + item.type_name + '/' + item.style_name}}</span>
                </div>
                <el-checkbox v-model="item.checked"
                  class="inBox"
                  @change="checked('check_delete',item)"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">添加产品:</span>
          <div class="content">
            <div class="filterCtn">
              <el-select v-model="filterList.typeVal"
                class="select-item"
                clearable
                placeholder="筛选品类">
                <el-option v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="filterList.flowerVal"
                class="select-item"
                clearable
                placeholder="筛选花型">
                <el-option v-for="item in flowerList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-date-picker v-model="filterList.date"
                type="daterange"
                align="right"
                style="margin-right:20px;"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
              <el-input placeholder="输入产品编号精确搜索"
                class="select-item"
                suffix-icon="el-icon-search"
                v-model="filterList.searchVal"></el-input>
            </div>
            <ul class="checkCtn">
              <li class="title">
                <span class="center">产品编号</span>
                <span>产品类别</span>
                <span class="flex05">产品花纹</span>
                <span class="center">产品图片</span>
                <span class="flex05">创建人</span>
                <span class="flex06 center">创建日期</span>
                <span class="flex05 center">操作</span>
              </li>
              <div class="proBox">
                <li v-for="(item,key) in filProductList"
                  :key="key">
                  <span class="center">{{item.product_code}}</span>
                  <span>{{item|filterType}}</span>
                  <span class="flex05">{{item.flower_id}}</span>
                  <span class="center">
                    <div class="imgCtn">
                      <img class="img"
                        :src="item.img.length>0?item.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                        :onerror="defaultImg" />
                      <div class="toolTips"
                        v-if="item.img.length>0"><span @click="showImg(item.img)">点击查看大图</span></div>
                      <div class="toolTips"
                        v-if="item.img.length===0"><span>没有预览图</span></div>
                    </div>
                  </span>
                  <span class="flex05">{{item.user_name}}</span>
                  <span class="flex06 center">{{item.create_time}}</span>
                  <span class="flex05 center">
                    <el-checkbox v-model="item.checked"
                      @change="checked('check_push',item)"></el-checkbox>
                  </span>
                </li>
                <li style="color:#DDD;border-bottom:none">已达底部</li>
                <div class="isCheckNum">已选产品:{{checkedProList.length + '/200' }}</div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
    <div class="shade"
      v-show="showShade"
      style="z-index:999">
      <div class="main">
        <div class="closeBtn"
          @click="showShade=false">点此退出预览</div>
        <el-carousel indicator-position="outside"
          height="550px"
          arrow="always">
          <el-carousel-item v-for="item in imgList"
            :key="item.img_url">
            <img :src="item.img_url"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { productList, flowerList, productTppeList, productMenuSetting, productMenuList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      typeList: [],
      flowerList: [],
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
      filterList: {
        typeVal: '',
        flowerVal: '',
        date: '',
        searchVal: ''
      },
      pages: 1,
      total: '',
      productList: [], // 总的产品数组
      filProductList: [], // 筛选后的产品数组
      showShade: false,
      imgList: [], // 产品图片
      checkedProList: [], // 总的已选数组
      checkedProFilterList: [] // 筛选后的已选数组
    }
  },
  methods: {
    getProductList () {
      productList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 10,
        // 'category_id': this.filterList.typeVal,
        // 'flower_id': this.filterList.flowerVal,
        // 'start_time': this.filterList.start_time,
        // 'end_time': this.filterList.end_time,
        // 'product_code': this.filterList.searchVal,
        'page': this.pages,
        'type': 1
      }).then((res) => {
        this.total = res.data.meta.total
        res.data.data.forEach(item => {
          if (this.checkedProFilterList.find(key => Number(key.product_id) === Number(item.id))) {
            item.checked = true
          }
        })
        this.productList.push(...res.data.data)
        this.filProductList = this.productList
        if (this.pages * 10 < this.total) {
          setTimeout(() => {
            this.pages++
            this.getProductList()
          }, 800)
        }
      })
    },
    showClearImg (item, e) {
      if (item) {
        let clearImg = new Image()
        clearImg.src = item
        clearImg.onload = () => {
          document.getElementsByClassName('box-top')[e].innerHTML = ''
          document.getElementsByClassName('box-top')[e].appendChild(clearImg)
        }
      }
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    checked (checkStatu, item) {
      if (checkStatu === 'check_push' && this.checkedProList.length >= 200 && item.checked) {
        this.$message.warning('已选产品已达200,不可继续添加！')
        item.checked = false
      } else if (checkStatu === 'check_push') {
        if (item.checked) {
          let flag = this.checkedProList.find(key => Number(key.product_id) === Number(item.id))
          if (!flag) {
            this.checkedProList.push({
              checked: true,
              category_name: item.category_info.product_category,
              image: item.img.map(value => {
                return value.img_url
              }),
              product_code: item.product_code,
              product_id: item.id,
              style_name: item.style_name,
              thumb: item.img.map(value => {
                return value.thumb
              }),
              type_name: item.type_name
            })
          }
        } else {
          let flag = this.checkedProList.find(key => Number(key.product_id) === Number(item.id))
          if (flag) {
            flag.checked = false
            this.checkedProList = this.checkedProList.filter(key => key.checked)
          }
        }
      } else if (checkStatu === 'check_delete') {
        item.checked = false
        let flag = this.productList.find(key => Number(key.id) === Number(item.product_id))
        if (flag) {
          flag.checked = false
        }
        this.checkedProList = this.checkedProList.filter(key => key.checked)
      }
    },
    saveAll () {
      if (this.checkedProList.length === 0) {
        this.$message.error('未选择产品')
        return
      }
      productMenuSetting({
        company_id: window.sessionStorage.getItem('company_id'),
        product_id: this.checkedProList.map(key => { return key.product_id })
      }).then(res => {
        if (res.data.status) {
          this.$message.success('保存成功,即将跳转至产品手册页')
          setTimeout(() => {
            this.$router.push('/productMenu')
          }, 800)
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  },
  created () {
    this.getProductList()
    Promise.all([
      flowerList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      productTppeList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      productMenuList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      this.flowerList = res[0].data.data
      this.typeList = res[1].data.data
      this.checkedProFilterList = res[2].data.data
      this.checkedProList = this.checkedProFilterList.map(item => {
        return {
          checked: true,
          ...item
        }
      })
      this.loading = false
    })
  },
  watch: {
    'filterList': {
      deep: true,
      handler (newVal) {
        this.filProductList = newVal.typeVal ? this.productList.filter(key => key.category_info.product_category === newVal.typeVal) : this.productList
        this.filProductList = newVal.flowerVal ? this.filProductList.filter(key => key.flower_id === newVal.flowerVal) : this.filProductList
        this.filProductList = (newVal.date !== null && newVal.date.length !== 0) ? this.filProductList.filter(key => (new Date(key.create_time).getTime() >= new Date(newVal.date[0]).getTime()) && (new Date(newVal.date[1]).getTime() >= new Date(key.create_time).getTime())) : this.filProductList
        this.filProductList = newVal.searchVal ? this.filProductList.filter(key => key.product_code.indexOf(newVal.searchVal) !== -1) : this.filProductList
      }
    }
  },
  filters: {
    filterType (item) {
      return item.category_info.product_category + '/' + item.type_name + '/' + item.style_name
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/css/productMenuEdit.less";
</style>
