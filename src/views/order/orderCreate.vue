<template>
  <div id="orderCreate">
    <div class="head">
      <h2>添加订单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">订单号：</span>
          <el-input class="elInput" v-model="orderId" placeholder="请输入订单号"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">外贸公司：</span>
           <el-select class="elInput" v-model="company" placeholder="请选择外贸公司">
            <el-option
              v-for="item in companyArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label must">联系人：</span>
          <el-select class="elInput" v-model="contacts" placeholder="请选择联系人">
            <el-option
              v-for="item in contactsArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">结算单位：</span>
          <el-select class="elInput" v-model="money" placeholder="请选择联系人">
            <el-option
              v-for="item in moneyArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label must">汇率：</span>
          <el-input class="elInput" v-model="exchangeRate" placeholder="请输入汇率">
            <template slot="append">人民币</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">税率：</span>
          <el-input class="elInput" v-model="taxRate" placeholder="请选择货币">
            <template slot="append">%</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">下单日期：</span>
          <el-date-picker
            class="elInput"
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">添加产品：</span>
          <div class="lineSearch" :class="{'show':showSeach}">
            <el-input
              class="elInput"
              placeholder="请输入产品编号搜索"
              suffix-icon="el-icon-search"
              v-model="search">
            </el-input>
            <span class="gjss" @click="showSeach=!showSeach">高级搜索
              <i class="el-icon" :class="{'el-icon-arrow-up':!showSeach,'el-icon-arrow-down':showSeach}"></i>
            </span>
            <div class="hideSearch">
              <div class="block">
                <div class="blockOnce">
                  <span class="name">产品类别：</span>
                   <el-cascader
                    class="elInput"
                    placeholder="请选择产品类别"
                    :options="typeArr"
                    v-model="type">
                  </el-cascader>
                </div>
                <div class="blockOnce">
                  <span class="name">创建日期：</span>
                  <el-date-picker
                    class="elInput"
                    v-model="dateSearch"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="block">
                <div class="blockOnce">
                  <span class="name">产品花型：</span>
                  <el-select class="elInput" v-model="flower" placeholder="请选择联系人">
                    <el-option
                      v-for="item in flowerArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="blockOnce">
                  <span class="name">创建人：</span>
                  <el-select class="elInput" v-model="people" placeholder="请选择联系人">
                    <el-option
                      v-for="item in peopleArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="lineTitle">产品列表</div>
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
            <div class="lineBody">
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">
                  <el-checkbox></el-checkbox>
                </div>
              </div>
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
            </div>
          </div>
          <div class="lineTitle">已选产品</div>
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
            <div class="lineBody">
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">
                  <el-checkbox></el-checkbox>
                </div>
              </div>
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
            </div>
          </div>
          <div class="specialCtn">
            <div class="lineTitle">第一批</div>
            <div class="mainCtn">
              <div class="mainOnce">
                <span class="label">交货日期：</span>
                <el-date-picker
                  class="elInput"
                  v-model="addDate[0]"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="mainOnce">
                <span class="label">产品信息：</span>
                <div class="btnCtn">
                  <div class="addBtn">
                    <span>添加产品</span>
                    <span>+</span>
                  </div>
                </div>
                <div class="productCtn">
                  <el-select class="elInput" v-model="product[0]" placeholder="请选择产品" style="margin-top:24px;">
                    <el-option
                      v-for="item in productArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <i class="el-icon-delete"></i>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div style="margin-top:24px;">
                    <div class="addBtn">
                      <span>产品尺码</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
                <div class="productCtn">
                  <el-select class="elInput" v-model="product[0]" placeholder="请选择产品" style="margin-top:24px;">
                    <el-option
                      v-for="item in productArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <i class="el-icon-delete"></i>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div style="margin-top:24px;">
                    <div class="addBtn">
                      <span>产品尺码</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lineTitle">第二批</div>
            <div class="mainCtn">
              <div class="mainOnce">
                <span class="label">交货日期：</span>
                <el-date-picker
                  class="elInput"
                  v-model="addDate[0]"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="mainOnce">
                <span class="label">产品信息：</span>
                <div class="btnCtn">
                  <div class="addBtn">
                    <span>添加产品</span>
                    <span>+</span>
                  </div>
                </div>
                <div class="productCtn">
                  <el-select class="elInput" v-model="product[0]" placeholder="请选择产品" style="margin-top:24px;">
                    <el-option
                      v-for="item in productArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <i class="el-icon-delete"></i>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div style="margin-top:24px;">
                    <div class="addBtn">
                      <span>产品尺码</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
                <div class="productCtn">
                  <el-select class="elInput" v-model="product[0]" placeholder="请选择产品" style="margin-top:24px;">
                    <el-option
                      v-for="item in productArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <i class="el-icon-delete"></i>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div class="typeCtn">
                    <el-cascader
                      style="width:160px;margin-right:15px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="colorSizeArr"
                      v-model="colorSize">
                    </el-cascader>
                    <el-input class="elInput" v-model="unitPrice[0]" placeholder="单价" style="width:150px;margin-right:15px">
                      <template slot="append">元</template>
                    </el-input>
                    <el-input class="elInput" v-model="numbers[0]" placeholder="数量" style="width:150px;">
                      <template slot="append">个</template>
                    </el-input>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div style="margin-top:24px;">
                    <div class="addBtn">
                      <span>产品尺码</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">总价：</span>
          <el-input class="elInput" v-model="totalMoney" placeholder="总价" disabled></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">备注：</span>
          <el-input style="width:670px" type="textarea" :rows="6" class="elInput" v-model="otherInfo" placeholder="其他信息填写"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      orderId: '',
      companyId: window.sessionStorage.getItem('company_id'),
      companyArr: [],
      company: '',
      contactsArr: [],
      contacts: '',
      moneyArr: [],
      money: '',
      exchangeRate: '',
      taxRate: '14',
      date: '',
      search: '',
      typeArr: [],
      type: [],
      flowerArr: [],
      flower: '',
      dateSearch: '',
      peopleArr: [],
      people: '',
      showSeach: false,
      totalMoney: '',
      otherInfo: '',
      addDate: [''],
      product: [],
      productArr: [],
      colorSizeArr: [],
      colorSize: [],
      unitPrice: [],
      numbers: []
    }
  },
  mounted () {
    clientList({
      company_id: this.companyId,
      keyword: '',
      status: ''
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/orderCreate.less';
</style>
