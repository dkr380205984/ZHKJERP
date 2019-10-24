<template>
  <div id="index">
    <common-header></common-header>
    <div class="mainCtn">
      <div class="menuCtn">
        <!-- 本层嵌套是为了消除滚动条的影响 该容器预留五像素宽度给滚动条-->
        <div class="menuCtnForScroll">
          <el-menu class="myMenu"
            background-color="#2E384E"
            text-color="#EEEEEE"
            active-text-color="#FFFFFF"
            :default-active="$route.path"
            :router="true">
            <el-submenu v-for="(item,index) in menu"
              :index="index.toString()"
              :key="item.name">
              <div slot="title">
                <img :src="require('@/assets/image/icon/'+ item.name +'.png')"
                  alt=""
                  class="icon">
                {{item.name}}</div>
              <el-menu-item v-for="(item2) in item.children"
                :index="item2.url"
                :key="item2.name">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <!-- 此容器左侧有留白五像素，在布局的时候需要留意给左侧滚动条的五像素 -->
      <div class="contentCtn">
        <!-- 面包屑容器需要顶到左侧导航栏,由于左侧五像素预留给marign了,因此需要用伪类补齐五像素的留白,具体查看CSS -->
        <div class="breadCtn">
          <span class="father"
            @click="$router.push('/index')">主页</span>
          <span class="break"
            v-show="breadRouter[nowRouter]&&breadRouter[nowRouter].children1">/</span>
          <span class="now"
            @click="goBack('children1')">{{breadRouter[nowRouter]?breadRouter[nowRouter].children1:''}}</span>
          <span class="break"
            v-show="breadRouter[nowRouter]&&breadRouter[nowRouter].children2">/</span>
          <span class="now"
            @click="goBack('children2')">{{breadRouter[nowRouter]?breadRouter[nowRouter].children2:''}}</span>
          <span class="break"
            v-show="breadRouter[nowRouter]&&breadRouter[nowRouter].children3">/</span>
          <span class="now">{{breadRouter[nowRouter]?breadRouter[nowRouter].children3:''}}</span>
        </div>
        <div class="mainCtn2">
          <div class="mainCtnForScroll">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { menu } from '@/assets/js/dictionary.js'
export default {
  data () {
    return {
      menu: menu,
      nowRouter: '',
      breadRouter: {
        index: {
          children1: '',
          children2: '',
          children3: ''
        },
        sampleCreate: {
          children1: '样品添加',
          children2: '',
          children3: ''
        },
        sampleList: {
          children1: '样品列表',
          children2: '',
          children3: ''
        },
        sampleDetail: {
          children1: '样品列表',
          children2: '样品详情',
          children3: ''
        },
        sampleUpdate: {
          children1: '样品列表',
          children2: '样品修改',
          children3: ''
        }, // 样品
        sampleOrderCreate: {
          children1: '添加样品订单',
          children2: '',
          children3: ''
        },
        sampleOrderList: {
          children1: '样品订单列表',
          children2: '',
          children3: ''
        },
        sampleOrderDetail: {
          children1: '样品订单列表',
          children2: '样品订单详情',
          children3: ''
        },
        priceListCreate: {
          children1: '添加报价单',
          children2: '',
          children3: ''
        },
        priceListList: {
          children1: '报价单列表',
          children2: '',
          children3: ''
        },
        priceListDetail: {
          children1: '报价单列表',
          children2: '报价单详情',
          children3: ''
        },
        priceListUpdate: {
          children1: '报价单列表',
          children2: '修改报价单',
          children3: ''
        },
        productCreate: {
          children1: '添加新产品',
          children2: '',
          children3: ''
        },
        productList: {
          children1: '产品列表',
          children2: '',
          children3: ''
        },
        productDetail: {
          children1: '产品列表',
          children2: '产品详情',
          children3: ''
        },
        productUpdate: {
          children1: '产品列表',
          children2: '修改产品',
          children3: ''
        }, // 产品
        productStockList: {
          children1: '产品库存列表',
          children2: '',
          children3: ''
        },
        productStockDetail: {
          children1: '产品库存列表',
          children2: '产品库存详情',
          children3: ''
        },
        designFormAdd: {
          children1: '添加工艺单列表',
          children2: '',
          children3: ''
        },
        designFormCreate: {
          children1: '添加工艺单列表',
          children2: '添加工艺单',
          children3: ''
        },
        designFormList: {
          children1: '工艺单列表',
          children2: '',
          children3: ''
        },
        designFormDetail: {
          children1: '工艺单列表',
          children2: '工艺单详情',
          children3: ''
        },
        designFormUpdate: {
          children1: '工艺单列表',
          children2: '修改工艺单',
          children3: ''
        },
        designFormPlanCreate: {
          children1: '添加设计单',
          children2: '',
          children3: ''
        },
        designFormPlanList: {
          children1: '设计单列表',
          children2: '',
          children3: ''
        },
        designFormPlanDetail: {
          children1: '设计单列表',
          children2: '设计单详情',
          children3: ''
        },
        productPlanAdd: {
          children1: '添加配料单列表',
          children2: '',
          children3: ''
        },
        productPlanCreate: {
          children1: '添加配料单列表',
          children2: '添加配料单',
          children3: ''
        },
        productPlanList: {
          children1: '配料单列表',
          children2: '',
          children3: ''
        },
        productPlanDetail: {
          children1: '配料单列表',
          children2: '配料单详情',
          children3: ''
        },
        productPlanUpdate: {
          children1: '配料单列表',
          children2: '修改配料单',
          children3: ''
        },
        orderCreate: {
          children1: '添加新订单',
          children2: '',
          children3: ''
        },
        orderList: {
          children1: '订单列表',
          children2: '',
          children3: ''
        },
        orderDetailNew: {
          children1: '订单列表',
          children2: '订单详情',
          children3: ''
        },
        orderUpdate: {
          children1: '订单列表',
          children2: '修改订单',
          children3: ''
        },
        orderStat: {
          children1: '订单发货列表',
          children2: '',
          children3: ''
        },
        productDesignCreateList: {
          children1: '订单列表',
          children2: '',
          children3: ''
        },
        productDesignCreate: {
          children1: '订单列表',
          children2: '添加生产计划单',
          children3: ''
        },
        productDesignList: {
          children1: '生产计划单列表',
          children2: '',
          children3: ''
        },
        productDesignDetail: {
          children1: '生产计划单列表',
          children2: '生产计划单详情',
          children3: ''
        },
        productDesignUpdate: {
          children1: '生产计划单列表',
          children2: '修改生产计划单',
          children3: ''
        },
        rawMaterialPurchase: {
          children1: '原料预订购',
          children2: '',
          children3: ''
        },
        rawMaterialPurchaseList: {
          children1: '原料预订购列表',
          children2: '',
          children3: ''
        },
        rawMaterialPurchaseDetail: {
          children1: '原料预订购列表',
          children2: '原料预订购详情',
          children3: ''
        },
        rawMaterialPurchaseUpdate: {
          children1: '原料预订购列表',
          children2: '修改原料预订购',
          children3: ''
        },
        rawMaterialOrderList: {
          children1: '物料订购列表',
          children2: '',
          children3: ''
        },
        rawMaterialOrderDetail: {
          children1: '物料订购列表',
          children2: '原料订购详情',
          children3: ''
        }, // 原料订购详情
        rawMaterialOrderPageBu: {
          children1: '物料订购列表',
          children2: '原料订购详情',
          children3: '原料补充订购'
        },
        // rawMaterialOrderDetail: {
        //   children1: '物料订购列表',
        //   children2: '装饰辅料订购详情',
        //   children3: ''
        // }, // 装饰辅料订购详情
        packagDetail: {
          children1: '物料订购列表',
          children2: '包装辅料订购详情',
          children3: ''
        }, // 包装辅料订购详情
        packagMaterialPage: {
          children1: '物料订购列表',
          children2: '包装辅料订购详情',
          children3: '包装辅料订购'
        }, // 包装辅料订购详情
        rawMaterialStockList: {
          children1: '物料出入库列表',
          children2: '',
          children3: ''
        },
        rawMaterialStockDetail: {
          children1: '物料出入库列表',
          children2: '物料出入库详情',
          children3: ''
        }, // 原料出入库
        rawMaterialStock: {
          children1: '物料出入库列表',
          children2: '物料出入库详情',
          children3: '物料入库'
        }, // 原料入库
        rawMaterialOutStock: {
          children1: '物料出入库列表',
          children2: '物料出入库详情',
          children3: '物料出库'
        }, // 原料出库
        // rawMaterialStockDetail: {
        //   children1: '物料出入库列表',
        //   children2: '辅料出入库详情',
        //   children3: ''
        // }, // 辅料出入库
        // rawMaterialStock: {
        //   children1: '物料出入库列表',
        //   children2: '原料出入库详情',
        //   children3: '原料入库'
        // }, // 辅料入库
        // rawMaterialOutStock: {
        //   children1: '物料出入库列表',
        //   children2: '原料出入库详情',
        //   children3: '原料出库'
        // }, // 辅料出库
        productDesignList2: {
          children1: '织造加工列表',
          children2: '',
          children3: ''
        },
        productDesignWeavingDetail: {
          children1: '织造加工列表',
          children2: '产品织造详情',
          children3: ''
        }, // 织造详情
        productDesignWeavingCreate: {
          children1: '织造加工列表',
          children2: '产品织造详情',
          children3: '产品织造分配'
        }, // 织造分配
        rawMaterialSupply: {
          children1: '织造加工列表',
          children2: '产品织造详情',
          children3: '纱线原料补充'
        }, // 补纱
        productDesignHalfDetail: {
          children1: '织造加工列表',
          children2: '半成品加工详情',
          children3: ''
        }, // 半成品加工详情
        productDesignHalfCreate: {
          children1: '织造加工列表',
          children2: '半成品加工详情',
          children3: '半成品加工分配'
        }, // 半成品加工分配
        otherMaterialSupply: {
          children1: '织造加工列表',
          children2: '半成品加工详情',
          children3: '装饰辅料补充'
        }, // 补辅料
        orderStockList: {
          children1: '产品出入库列表',
          children2: '',
          children3: ''
        },
        orderStockDetail: {
          children1: '产品出入库列表',
          children2: '出入库详情',
          children3: ''
        },
        orderStockIn: {
          children1: '产品出入库列表',
          children2: '出入库详情',
          children3: '产品入库'
        },
        orderStockOut: {
          children1: '产品出入库列表',
          children2: '出入库详情',
          children3: '产品出库'
        },
        productExaminationList: {
          children1: '产品检验列表',
          children2: '',
          children3: ''
        },
        semiExaminationDetail: {
          children1: '产品检验列表',
          children2: '半成品检验详情',
          children3: ''
        }, // 半成品
        semiExamination: {
          children1: '产品检验列表',
          children2: '半成品检验详情',
          children3: '半成品检验'
        }, // 半成品
        finishedExaminationDetail: {
          children1: '产品检验列表',
          children2: '成品检验详情',
          children3: ''
        }, // 成品
        finishedExamination: {
          children1: '产品检验列表',
          children2: '成品检验详情',
          children3: '成品检验'
        }, // 成品
        packagOutStockList: {
          children1: '装箱出库列表',
          children2: '',
          children3: ''
        },
        packagOutStockDetail: {
          children1: '装箱出库列表',
          children2: '装箱出库详情',
          children3: ''
        },
        packagInfoCreate: {
          children1: '装箱出库列表',
          children2: '装箱出库详情',
          children3: '添加装箱资料'
        }, // 装箱资料
        packagOutStock: {
          children1: '装箱出库列表',
          children2: '装箱出库详情',
          children3: '装箱出库'
        }, // 装箱出库
        mainMaterialStockCreate: {
          children1: '添加原料库存',
          children2: '',
          children3: ''
        },
        materialStockListNew: {
          children1: '物料库存列表',
          children2: '',
          children3: ''
        },
        mainMaterialStockDetail: {
          children1: '物料库存列表',
          children2: '物料库存详情',
          children3: ''
        },
        orderFinancialList: {
          children1: '订单财务统计表',
          children2: '',
          children3: ''
        },
        foreignTradeFinancialList: {
          children1: '合作公司财务统计表',
          children2: '',
          children3: ''
        },
        foreignTradeFinancialDetail: {
          children1: '合作公司财务统计表',
          children2: '合作公司财务详情',
          children3: ''
        },
        productFinancialList: {
          children1: '产品产量统计表',
          children2: '',
          children3: ''
        },
        materialFinancialList: {
          children1: '物料使用统计表',
          children2: '',
          children3: ''
        },
        foreignTradeCreate: {
          children1: '添加客户',
          children2: '',
          children3: ''
        },
        foreignTradeList: {
          children1: '客户列表',
          children2: '',
          children3: ''
        },
        foreignTradeDetail: {
          children1: '客户列表',
          children2: '客户详情',
          children3: ''
        },
        foreignTradeUpdate: {
          children1: '客户列表',
          children2: '修改客户信息',
          children3: ''
        },
        setting: {
          children1: '系统设置',
          children2: '',
          children3: ''
        },
        productSetting: {
          children1: '系统设置',
          children2: '产品设置',
          children3: ''
        },
        designFormSetting: {
          children1: '系统设置',
          children2: '工艺单设置',
          children3: ''
        },
        yarnSetting: {
          children1: '系统设置',
          children2: '物料设置',
          children3: ''
        },
        accountSetting: {
          children1: '系统设置',
          children2: '账号设置',
          children3: ''
        },
        packagMaterialList: {
          children1: '系统设置',
          children2: '包装辅料列表',
          children3: ''
        },
        packagMaterialSetting: {
          children1: '系统设置',
          children2: '包装辅料列表',
          children3: '操作包装辅料'
        }, // 添加包装辅料
        // packagMaterialSetting: {
        //   children1: '系统设置',
        //   children2: '包装辅料列表',
        //   children3: '修改包装辅料'
        // }, // 修改包装辅料
        processSetting: {
          children1: '系统设置',
          children2: '加工工序设置',
          children3: ''
        },
        stockCreate: {
          children1: '添加仓库',
          children2: '',
          children3: ''
        },
        stockList: {
          children1: '仓库列表',
          children2: '',
          children3: ''
        },
        stockDetail: {
          children1: '仓库列表',
          children2: '仓库管理',
          children3: ''
        },
        stockUpdate: {
          children1: '仓库列表',
          children2: '修改仓库',
          children3: ''
        }
      }// 面包屑路由表

    }
  },
  methods: {
    goBack (which) {
      if (which === 'children1') {
        if (this.breadRouter[this.nowRouter].children3) {
          this.$router.go(-2)
          return
        }
        if (this.breadRouter[this.nowRouter].children2) {
          this.$router.go(-1)
        }
      }
      if (which === 'children2') {
        if (this.breadRouter[this.nowRouter].children3) {
          this.$router.go(-1)
        }
      }
    }
  },
  watch: {
    '$route.name': function (val, oldVal) {
      // 样品修改和产品修改页面相同
      if (oldVal === 'sampleList' && val === 'productUpdate') {
        this.nowRouter = 'sampleUpdate'
      } else {
        this.nowRouter = val || 'index'
      }
    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/index.less";
</style>
