<template>
  <div id="foreignTradeFinancialDetail"
    v-loading="loading">
    <div class="head">
      <h2>合作公司财务详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司名称:</span>
          <span class="content">{{client_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司简称:</span>
          <span class="content">{{abbreviation}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司类型:</span>
          <span class="content">{{client_typeStr}}</span>
        </div>
        <div class="rightCtn">
          <span class="totalPrice">
            <span class="label">共计:</span>
            <span class="content">{{total_price|filterNumber}}万元</span>
          </span>
          <span class="settlement">
            <span class="settle">
              <span class="label">已结算:</span>
              <span class="content">{{(settle_price ? settle_price : 0)|filterNumber}}万元</span>
            </span>
            <span class="noSettle">
              <span class="label">待结算:</span>
              <span class="content">{{(total_price-settle_price > 0 ? total_price-settle_price : 0)|filterNumber}}万元</span>
            </span>
            <span class="deduct">
              <span class="label">已扣款:</span>
              <span class="content">{{(deduct_price ? deduct_price : 0)|filterNumber}}万元</span>
            </span>
          </span>
        </div>
      </div>
      <!-- 切换表格按钮 -->
      <div class="lineCtn"
        style="flex-direction:row;">
        <span :class="{cutList:true,active:flag[1].active}"
          @click="cutList(1)"
          v-if="this.client_type.indexOf(1) !== -1">订单列表</span>
        <span :class="{cutList:true,active:flag[2].active}"
          @click="cutList(2)"
          v-if="this.client_type.indexOf(2) !== -1">物料订购列表</span>
        <span :class="{cutList:true,active:flag[3].active}"
          @click="cutList(3)"
          v-if="this.client_type.indexOf(3) !== -1">物料加工列表</span>
        <span :class="{cutList:true,active:flag[4].active}"
          @click="cutList(4)"
          v-if="this.client_type.indexOf(4) !== -1">生产织造列表</span>
        <span :class="{cutList:true,active:flag[5].active}"
          @click="cutList(5)"
          v-if="this.client_type.indexOf(5) !== -1">产品加工列表</span>
        <span :class="{cutList:true,active:flag[7].active}"
          @click="cutList(7)"
          v-if="this.client_type.indexOf(7) !== -1">包装订购列表</span>
        <span :class="{cutList:true,active:flag[8].active}"
          @click="cutList(8)"
          v-if="this.client_type.indexOf(8) !== -1">运输列表</span>
        <span :class="{cutList:true,active:flag[9].active}"
          @click="cutList(9)">转账列表</span>
      </div>
      <!-- 订单列表 -->
      <div class="lineCtn"
        v-show="flag[1].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.orderList.filter.clientVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选外贸公司">
              <el-option v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.orderList.filter.groupVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.orderList.filter.orderVal"
              style="margin-left:20px;width:150px;"
              filterable
              placeholder="筛选订单号">
              <el-option v-for="item in list.orderList.list"
                :key="item.id"
                :label="item.order_code"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.orderList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="list.orderList.management">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="list.orderList.management = !list.orderList.management">{{!list.orderList.management ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all','orderList')"
                v-if="list.orderList.management"></el-checkbox>
              订单号
            </span>
            <span>负责小组</span>
            <span>下单日期</span>
            <span>订单公司</span>
            <span>合计金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.orderList.lists"
                :key="key"
                class="infinite-list-item">
                <div class="list"
                  @click="getOutStockInfo(item)"
                  style="line-height:59px;">
                  <span>
                    <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                    <el-checkbox class="checkBox"
                      v-if="list.orderList.management"
                      v-model="item.checked"
                      @change="checked(item)"></el-checkbox>
                    {{item.order_code}}
                  </span>
                  <span>{{item.group_name}}</span>
                  <span>{{item.order_time}}</span>
                  <span>{{item.client_name}}</span>
                  <span>{{(item.total_price ? item.total_price : 0)|filterToFixed}}元</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'cut')">{{item.deduct_number ? item.deduct_number : '-'}}</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'pay')">{{item.settle_number ? item.settle_number : '-'}}</span>
                  <span class="flex15">
                    <span class="btn"
                      @click.stop="$router.push('/index/orderDetailNew/' + item.id)">详情</span>
                  </span>
                </div>
                <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                  <div v-loading='item.loading'>
                    <span class="title">
                      <span>产品类型</span>
                      <span>产品图片</span>
                      <span class="flex05">尺码</span>
                      <span class="flex05">颜色</span>
                      <span class="flex08">单价</span>
                      <span>订单数量</span>
                      <span>发货数量</span>
                      <span>合计金额</span>
                    </span>
                    <span class="content"
                      v-for="(valPro,indPro) in item.product_info"
                      :key="indPro">
                      <span class=" col">
                        <span>{{valPro.product_code}}</span>
                        <span>{{valPro.product_type}}</span>
                      </span>
                      <span>
                        <div class="imgCtn">
                          <img class="img"
                            :src="valPro.img.length>0?valPro.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                            :onerror="defaultImg" />
                          <div class="toolTips"
                            v-if="valPro.img.length>0"><span @click="showImg(valPro.img)">点击查看大图</span></div>
                          <div class="toolTips"
                            v-if="valPro.img.length===0"><span>没有预览图</span></div>
                        </div>
                      </span>
                      <span class="flex48 col">
                        <span v-for="(valSize,indSize) in valPro.size"
                          :key="indSize">
                          <span class="flex05">{{valSize.size}}</span>
                          <span class="flex05">{{valSize.color}}</span>
                          <span class="flex08">{{valSize.price|filterToFixed}}{{item.account_unit}}/{{valPro.unit}}</span>
                          <span>{{valSize.number}}{{valPro.unit}}</span>
                          <span>{{valSize.pack_number ? valSize.pack_number : 0}}{{valPro.unit}}</span>
                          <span>{{((valSize.pack_number ? valSize.pack_number : 0)*valSize.price)|filterToFixed}}{{item.account_unit}}</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{list.orderList.total_price|filterNumber}}万元</span>
            <span>{{list.orderList.total_deduct}}</span>
            <span>{{list.orderList.total_settle}}</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- 物料订购列表 -->
      <div class="lineCtn"
        v-show="flag[2].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.material_orderList.filter.clientVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选外贸公司">
              <el-option v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.material_orderList.filter.groupVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.material_orderList.filter.orderVal"
              style="margin-left:20px;width:150px;"
              filterable
              placeholder="筛选订单号">
              <el-option v-for="item in list.material_orderList.list"
                :key="item.id"
                :label="item.order_code"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.material_orderList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="list.material_orderList.management">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="list.material_orderList.management = !list.material_orderList.management">{{!list.material_orderList.management ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all','material_orderList')"
                v-if="list.material_orderList.management"></el-checkbox>
              订单号
            </span>
            <span>负责小组</span>
            <span>下单日期</span>
            <span>订单公司</span>
            <span>合计金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.material_orderList.lists"
                :key="key"
                @click="item.flag = !item.flag"
                class="infinite-list-item">
                <div class="list"
                  style="line-height:59px;">
                  <span>
                    <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                    <el-checkbox class="checkBox"
                      v-if="list.material_orderList.management"
                      v-model="item.checked"
                      @change="checked(item)"></el-checkbox>
                    {{item.order_code}}
                  </span>
                  <span>{{item.group_name}}</span>
                  <span>{{item.order_time}}</span>
                  <span>{{item.client_name}}</span>
                  <span>{{(item.total_price ? item.total_price: 0)|filterToFixed}}元</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'cut')">{{item.deduct_number ? item.deduct_number : '-'}}</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'pay')">{{item.settle_number ? item.settle_number : '-'}}</span>
                  <span class="flex15">
                    <span class="btn"
                      @click.stop="$router.push('/index/orderDetailNew/' + item.id)">详情</span>
                  </span>
                </div>
                <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                  <div v-loading='item.loading'>
                    <span class="title">
                      <span>物料名称</span>
                      <span>类型</span>
                      <span class="flex08">属性</span>
                      <span class="flex08">单价</span>
                      <span class="flex05">数量</span>
                      <span>合计金额</span>
                    </span>
                    <span class="content"
                      v-for="(val,ind) in item.info"
                      :key="ind">
                      <span>{{val.material_name}}</span>
                      <span class="flex41 col">
                        <span v-for="(valInfo,indInfo) in val.material_info"
                          :key="indInfo">
                          <span>{{valInfo.type}}</span>
                          <span class="flex08">{{valInfo.attr ? valInfo.attr : '无'}}/{{valInfo.color}}</span>
                          <span class="flex08">{{valInfo.price|filterToFixed}}元/kg</span>
                          <span class="flex05">{{valInfo.number|filterToFixed}}kg</span>
                          <span>{{((valInfo.number ? valInfo.number : 0)*valInfo.price)|filterToFixed}}元</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{list.material_orderList.total_price|filterNumber}}万元</span>
            <span>{{list.material_orderList.total_deduct}}</span>
            <span>{{list.material_orderList.total_settle}}</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- 物料加工列表 -->
      <div class="lineCtn"
        v-show="flag[3].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.material_processList.filter.clientVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选外贸公司">
              <el-option v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.material_processList.filter.groupVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.material_processList.filter.orderVal"
              style="margin-left:20px;width:150px;"
              filterable
              placeholder="筛选订单号">
              <el-option v-for="item in list.material_processList.list"
                :key="item.id"
                :label="item.order_code"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.material_processList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="list.material_processList.management">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="list.material_processList.management = !list.material_processList.management">{{!list.material_processList.management ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all','material_processList')"
                v-if="list.material_processList.management"></el-checkbox>
              订单号
            </span>
            <span>负责小组</span>
            <span>下单日期</span>
            <span>订单公司</span>
            <span>合计金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.material_processList.lists"
                :key="key"
                @click="item.flag = !item.flag"
                class="infinite-list-item">
                <div class="list"
                  style="line-height:59px;">
                  <span>
                    <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                    <el-checkbox class="checkBox"
                      v-if="list.material_processList.management"
                      v-model="item.checked"
                      @change="checked(item)"></el-checkbox>
                    {{item.order_code}}
                  </span>
                  <span>{{item.group_name}}</span>
                  <span>{{item.order_time}}</span>
                  <span>{{item.client_name}}</span>
                  <span>{{(item.total_price ? item.total_price: 0)|filterToFixed}}元</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'cut')">{{item.deduct_number ? item.deduct_number : '-'}}</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'pay')">{{item.settle_number ? item.settle_number : '-'}}</span>
                  <span class="flex15">
                    <span class="btn"
                      @click.stop="$router.push('/index/orderDetailNew/' + item.id)">详情</span>
                  </span>
                </div>
                <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                  <div v-loading='item.loading'>
                    <span class="title">
                      <span>物料名称</span>
                      <span>类型</span>
                      <span class="flex08">属性</span>
                      <span class="flex08">单价</span>
                      <span class="flex05">数量</span>
                      <span>合计金额</span>
                    </span>
                    <span class="content"
                      v-for="(val,ind) in item.info"
                      :key="ind">
                      <span>{{val.material_name}}</span>
                      <span>{{val.process_type}}</span>
                      <span class="flex21 col">
                        <span v-for="(valInfo,indInfo) in val.material_info"
                          :key="indInfo">
                          <span class="flex08">{{valInfo.attr ? valInfo.attr : '无'}}/{{valInfo.color}}</span>
                          <span class="flex08">{{'-'}}</span>
                          <span class="flex05">{{(valInfo.value)|filterToFixed}}kg</span>
                        </span>
                      </span>
                      <span>{{val.total_price|filterToFixed}}元</span>
                    </span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{list.material_processList.total_price|filterNumber}}万元</span>
            <span>{{list.material_processList.total_deduct}}</span>
            <span>{{list.material_processList.total_settle}}</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- 生产织造列表 -->
      <div class="lineCtn"
        v-show="flag[4].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.weaveList.filter.clientVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选外贸公司">
              <el-option v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.weaveList.filter.groupVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.weaveList.filter.orderVal"
              style="margin-left:20px;width:150px;"
              filterable
              placeholder="筛选订单号">
              <el-option v-for="item in list.weaveList.list"
                :key="item.id"
                :label="item.order_code"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.weaveList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="list.weaveList.management">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="list.weaveList.management = !list.weaveList.management">{{!list.weaveList.management ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all','weaveList')"
                v-if="list.weaveList.management"></el-checkbox>
              订单号
            </span>
            <span>负责小组</span>
            <span>下单日期</span>
            <span>订单公司</span>
            <span>合计金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.weaveList.lists"
                :key="key"
                @click="item.flag = !item.flag"
                class="infinite-list-item">
                <div class="list"
                  style="line-height:59px;">
                  <span>
                    <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                    <el-checkbox class="checkBox"
                      v-if="list.weaveList.management"
                      v-model="item.checked"
                      @change="checked(item)"></el-checkbox>
                    {{item.order_code}}
                  </span>
                  <span>{{item.group_name}}</span>
                  <span>{{item.order_time}}</span>
                  <span>{{item.client_name}}</span>
                  <span>{{(item.total_price ? item.total_price: 0)|filterToFixed}}元</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'cut')">{{item.deduct_number ? item.deduct_number : '-'}}</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'pay')">{{item.settle_number ? item.settle_number : '-'}}</span>
                  <span class="flex15">
                    <span class="btn"
                      @click.stop="$router.push('/index/orderDetailNew/' + item.id)">详情</span>
                  </span>
                </div>
                <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                  <div v-loading='item.loading'>
                    <span class="title">
                      <span>产品类型</span>
                      <span>产品图片</span>
                      <span class="flex05">尺码</span>
                      <span class="flex08">颜色</span>
                      <span class="flex08">单价</span>
                      <span>数量</span>
                      <span>合计金额</span>
                    </span>
                    <span class="content"
                      v-for="(valPro,indPro) in item.info"
                      :key="indPro">
                      <span class=" col">
                        <span>{{valPro.product_code}}</span>
                        <span>{{valPro.product_type}}</span>
                      </span>
                      <span>
                        <div class="imgCtn">
                          <img class="img"
                            :src="valPro.img.length>0?valPro.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                            :onerror="defaultImg" />
                          <div class="toolTips"
                            v-if="valPro.img.length>0"><span @click="showImg(valPro.img)">点击查看大图</span></div>
                          <div class="toolTips"
                            v-if="valPro.img.length===0"><span>没有预览图</span></div>
                        </div>
                      </span>
                      <span class="flex41 col">
                        <span v-for="(valSize,indSize) in valPro.size"
                          :key="indSize">
                          <span class="flex05">{{valSize.size}}</span>
                          <span class="flex08">{{valSize.color}}</span>
                          <span class="flex08">{{valSize.price|filterToFixed}}元/{{valPro.unit}}</span>
                          <span>{{valSize.number}}{{valPro.unit}}</span>
                          <span>{{((valSize.number ? valSize.number : 0)*valSize.price)|filterToFixed}}元</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{list.weaveList.total_price|filterNumber}}万元</span>
            <span>{{list.weaveList.total_deduct}}</span>
            <span>{{list.weaveList.total_settle}}</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- 产品加工列表 -->
      <div class="lineCtn"
        v-show="flag[5].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.product_processList.filter.clientVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选外贸公司">
              <el-option v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.product_processList.filter.groupVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.product_processList.filter.orderVal"
              style="margin-left:20px;width:150px;"
              filterable
              placeholder="筛选订单号">
              <el-option v-for="item in list.product_processList.list"
                :key="item.id"
                :label="item.order_code"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.product_processList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="list.product_processList.management">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="list.product_processList.management = !list.product_processList.management">{{!list.product_processList.management ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all','product_processList')"
                v-if="list.product_processList.management"></el-checkbox>
              订单号
            </span>
            <span>负责小组</span>
            <span>下单日期</span>
            <span>订单公司</span>
            <span>合计金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.product_processList.lists"
                :key="key"
                @click="item.flag = !item.flag"
                class="infinite-list-item">
                <div class="list"
                  style="line-height:59px;">
                  <span>
                    <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                    <el-checkbox class="checkBox"
                      v-if="list.product_processList.management"
                      v-model="item.checked"
                      @change="checked(item)"></el-checkbox>
                    {{item.order_code}}
                  </span>
                  <span>{{item.group_name}}</span>
                  <span>{{item.order_time}}</span>
                  <span>{{item.client_name}}</span>
                  <span>{{(item.total_price ? item.total_price: 0)|filterToFixed}}元</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'cut')">{{item.deduct_number ? item.deduct_number : '-'}}</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'pay')">{{item.settle_number ? item.settle_number : '-'}}</span>
                  <span class="flex15">
                    <span class="btn"
                      @click.stop="$router.push('/index/orderDetailNew/' + item.id)">详情</span>
                  </span>
                </div>
                <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                  <div v-loading='item.loading'>
                    <span class="title">
                      <span>产品类型</span>
                      <span>产品图片</span>
                      <span>类型</span>
                      <span class="flex05">尺码</span>
                      <span class="flex05">颜色</span>
                      <span class="flex08">单价</span>
                      <span>数量</span>
                      <span>合计金额</span>
                    </span>
                    <span class="content"
                      v-for="(valPro,indPro) in item.info"
                      :key="indPro">
                      <span class=" col">
                        <span>{{valPro.product_code}}</span>
                        <span>{{valPro.product_type}}</span>
                      </span>
                      <span>
                        <div class="imgCtn">
                          <img class="img"
                            :src="valPro.img.length>0?valPro.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                            :onerror="defaultImg" />
                          <div class="toolTips"
                            v-if="valPro.img.length>0"><span @click="showImg(valPro.img)">点击查看大图</span></div>
                          <div class="toolTips"
                            v-if="valPro.img.length===0"><span>没有预览图</span></div>
                        </div>
                      </span>
                      <span class="flex48 col">
                        <span v-for="(valSize,indSize) in valPro.size"
                          :key="indSize">
                          <span>{{valSize.type}}</span>
                          <span class="flex05">{{valSize.size}}</span>
                          <span class="flex05">{{valSize.color}}</span>
                          <span class="flex08">{{valSize.price|filterToFixed}}元/{{valPro.unit}}</span>
                          <span>{{valSize.number}}{{valPro.unit}}</span>
                          <span>{{((valSize.number ? valSize.number : 0)*valSize.price)|filterToFixed}}元</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{list.product_processList.total_price|filterNumber}}万元</span>
            <span>{{list.product_processList.total_deduct}}</span>
            <span>{{list.product_processList.total_settle}}</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- 包装订购列表 -->
      <div class="lineCtn"
        v-show="flag[7].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.packList.filter.clientVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选外贸公司">
              <el-option v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.packList.filter.groupVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.packList.filter.orderVal"
              style="margin-left:20px;width:150px;"
              filterable
              placeholder="筛选订单号">
              <el-option v-for="item in list.packList.list"
                :key="item.id"
                :label="item.order_code"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.packList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="list.packList.management">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="list.packList.management = !list.packList.management">{{!list.packList.management ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all','packList')"
                v-if="list.packList.management"></el-checkbox>
              订单号
            </span>
            <span>负责小组</span>
            <span>下单日期</span>
            <span>订单公司</span>
            <span>合计金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.packList.lists"
                :key="key"
                @click="item.flag = !item.flag"
                class="infinite-list-item">
                <div class="list"
                  style="line-height:59px;">
                  <span>
                    <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                    <el-checkbox class="checkBox"
                      v-if="list.packList.management"
                      v-model="item.checked"
                      @change="checked(item)"></el-checkbox>
                    {{item.order_code}}
                  </span>
                  <span>{{item.group_name}}</span>
                  <span>{{item.order_time}}</span>
                  <span>{{item.client_name}}</span>
                  <span>{{(item.total_price ? item.total_price: 0)|filterToFixed}}元</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'cut')">{{item.deduct_number ? item.deduct_number : '-'}}</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'pay')">{{item.settle_number ? item.settle_number : '-'}}</span>
                  <span class="flex15"
                    @click="$router.push('/index/orderDetailNew/' + item.id)">
                    <span cl.stopass="btn">详情</span>
                  </span>
                </div>
                <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                  <div v-loading='item.loading'>
                    <span class="title">
                      <span>包装名称</span>
                      <span class="flex15">尺寸</span>
                      <span class="flex08">单价</span>
                      <span class="flex08">数量</span>
                      <span>合计金额</span>
                    </span>
                    <span class="content"
                      v-for="(val,ind) in item.info"
                      :key="ind">
                      <span>{{val.name}}</span>
                      <span class="flex41 col">
                        <span v-for="(valInfo,indInfo) in val.material_info"
                          :key="indInfo">
                          <span class="flex15">{{valInfo.size}}</span>
                          <span class="flex08">{{valInfo.price|filterToFixed}}元/个</span>
                          <span class="flex08">{{valInfo.number}}个</span>
                          <span>{{(valInfo.price * valInfo.number)|filterToFixed}}元</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{list.packList.total_price|filterNumber}}万元</span>
            <span>{{list.packList.total_deduct}}</span>
            <span>{{list.packList.total_settle}}</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- 运输列表 -->
      <div class="lineCtn"
        v-show="flag[8].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.transportList.filter.clientVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选外贸公司">
              <el-option v-for="item in clientList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.transportList.filter.groupVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.transportList.filter.orderVal"
              style="margin-left:20px;width:150px;"
              filterable
              placeholder="筛选订单号">
              <el-option v-for="item in list.transportList.list"
                :key="item.id"
                :label="item.order_code"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.transportList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="list.material_processList.management">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="list.material_processList.management = !list.material_processList.management">{{!list.material_processList.management ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all','material_processList')"
                v-if="list.material_processList.management"></el-checkbox>
              订单号
            </span>
            <span>负责小组</span>
            <span>下单日期</span>
            <span>订单公司</span>
            <span>合计金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.transportList.lists"
                :key="key"
                @click="item.flag = !item.flag"
                class="infinite-list-item">
                <div class="list"
                  style="line-height:59px;">
                  <span>
                    <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                    <el-checkbox class="checkBox"
                      v-if="list.material_processList.management"
                      v-model="item.checked"
                      @change="checked(item)"></el-checkbox>
                    {{item.order_code}}
                  </span>
                  <span>{{item.group_name}}</span>
                  <span>{{item.order_time}}</span>
                  <span>{{item.client_name}}</span>
                  <span>{{(item.total_price ? item.total_price: 0)|filterToFixed}}元</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'cut')">{{item.deduct_number ? item.deduct_number : '-'}}</span>
                  <span class="find"
                    @click.stop="find(item.order_code,'pay')">{{item.settle_number ? item.settle_number : '-'}}</span>
                  <span class="flex15"
                    @click="$router.push('/index/orderDetailNew/' + item.id)">
                    <span cl.stopass="btn">详情</span>
                  </span>
                </div>
                <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                  <div v-loading='item.loading'>
                    <span class="title">
                      <span>物料名称</span>
                      <span>类型</span>
                      <span class="flex08">属性</span>
                      <span class="flex08">单价</span>
                      <span class="flex05">数量</span>
                      <span>合计金额</span>
                    </span>
                    <span class="content"
                      v-for="(val,ind) in item.info"
                      :key="ind">
                      <span>{{val.material_name}}</span>
                      <span>{{val.process_type}}</span>
                      <span class="flex21 col">
                        <span v-for="(valInfo,indInfo) in val.material_info"
                          :key="indInfo">
                          <span class="flex08">{{valInfo.attr ? valInfo.attr : '无'}}/{{valInfo.color}}</span>
                          <span class="flex08">{{'-'}}</span>
                          <span class="flex05">{{valInfo.value|filterToFixed}}kg</span>
                        </span>
                      </span>
                      <span>{{val.total_price|filterToFixed}}元</span>
                    </span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{list.material_processList.total_price|filterNumber}}万元</span>
            <span>{{list.material_processList.total_deduct}}</span>
            <span>{{list.material_processList.total_settle}}</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- 转账列表 -->
      <div class="lineCtn"
        v-show="flag[9].active">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select clearable
              v-model="list.transferList.filter.typeVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选转账类型">
              <el-option v-for="item in [{name:'收款',id:1},{name:'付款',id:2}]"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select clearable
              v-model="list.transferList.filter.methodVal"
              style="margin-left:20px;width:150px;"
              placeholder="筛选转账方式">
              <el-option v-for="item in classList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="list.transferList.filter.data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="addBtn"
            @click="transfer.flag = true,transfer.time = now_time">+转账记录</div>
        </div>
        <div class="table">
          <div class="title">
            <span class="icon"> 转账日期 </span>
            <span>转账类型</span>
            <span class="icon"> 转账金额 </span>
            <span>转账说明</span>
            <span>转账凭证</span>
            <span>转账方式</span>
            <span>操作</span>
          </div>
          <ul class="infinite-list">
            <div class="box">
              <li v-for="(item,key) in list.transferList.lists"
                :key="key"
                class="infinite-list-item">
                <div class="list"
                  style="line-height:59px;">
                  <span>{{item.complete_time}}</span>
                  <span>{{item.type === 1 ? '收款' : '付款'}}</span>
                  <span>{{(item.transfer_price ? item.transfer_price : 0)|filterToFixed}}元</span>
                  <span>{{item.desc ? item.desc : '无'}}</span>
                  <span>
                    <div class="imgCtn">
                      <img class="img"
                        :src="item.file_url.length>0?item.file_url[0]:require('@/assets/image/index/noPic.jpg')"
                        :onerror="defaultImg" />
                      <div class="toolTips"
                        v-if="item.file_url.length>0"><span @click="showImg(item.file_url)">点击查看大图</span></div>
                      <div class="toolTips"
                        v-if="item.file_url.length===0"><span>没有预览图</span></div>
                    </div>
                  </span>
                  <span>{{classList.find(key=>key.id === item.transfer_way).name}}</span>
                  <span>
                    <span class="btn change">修改</span>
                  </span>
                </div>
              </li>
            </div>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span>{{list.transferList.transfer_total_price|filterNumber}}元</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 转账弹窗 -->
    <div class="shade"
      v-show="transfer.flag">
      <div class="window">
        <div class="title">添加转账记录</div>
        <div class="content">
          <div class="lineCtn">
            <span class="label">转账日期:</span>
            <el-date-picker v-model="transfer.time"
              class="inputBox"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="lineCtn">
            <span class="label">转账类型:</span>
            <el-radio v-model="transfer.type"
              label="1">收款</el-radio>
            <el-radio v-model="transfer.type"
              label="2">付款</el-radio>
          </div>
          <div class="lineCtn">
            <span class="label">转账方式:</span>
            <el-select clearable
              v-model="transfer.method"
              class="inputBox"
              placeholder="请选择转账方式">
              <el-option v-for="item in classList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="lineCtn">
            <span class="label">转账金额:</span>
            <el-input v-model="transfer.total_price"
              class="inputBox"
              placeholder="请输入转账金额"></el-input>
          </div>
          <div class="lineCtn">
            <span class="label">上传图片:</span>
            <el-upload class="upload-demo"
              action="http://upload.qiniup.com/"
              accept="image/jpeg,image/gif,image/png,image/bmp"
              :before-upload="beforeUpload"
              :data="postData"
              ref="uploada"
              list-type="picture-card">
              <i slot="default"
                class="el-icon-plus"></i>
              <div slot="tip"
                class="el-upload__tip">只能上传jpg/png图片文件，且不超过10M</div>
            </el-upload>
            <el-dialog :visible.sync="transfer.dialogVisible">
              <img width="100%"
                :src="transfer.dialogImageUrl"
                alt="">
            </el-dialog>
          </div>
          <div class="lineCtn">
            <span class="label">转账说明:</span>
            <el-input type="textarea"
              class="inputBox"
              :rows="3"
              placeholder="请输入转账说明"
              v-model="transfer.desc">
            </el-input>
          </div>
          <div class="btnCtn">
            <span class=""
              @click="$message.warning('已取消'),transfer.flag = false">取消</span>
            <span class="submit"
              @click="submit('transfer')">提交</span>
          </div>
        </div>
        <span class="close el-icon-close"
          @click="$message.warning('已取消'),transfer.flag = false"></span>
      </div>
    </div>
    <!-- 扣款弹窗 -->
    <div class="shade"
      v-show="cutPay.cutPayFlag">
      <div class="window">
        <div class="title">订单扣款</div>
        <div class="content">
          <div class="lineCtn">
            <span class="label">订单号:</span>
            <el-select clearable
              v-model="cutPay.order_code_str"
              class="inputBox"
              disabled
              placeholder="请选择转账方式">
            </el-select>
          </div>
          <div class="lineCtn">
            <span class="label">扣款日期:</span>
            <el-date-picker v-model="cutPay.cutPay_time"
              class="inputBox"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="lineCtn">
            <span class="label">扣款金额:</span>
            <el-input v-model="cutPay.cutPay_price"
              class="inputBox"
              placeholder="请输入转账金额"></el-input>
          </div>
          <div class="lineCtn">
            <span class="label">扣款原因:</span>
            <el-input type="textarea"
              class="inputBox"
              :rows="3"
              placeholder="请输入扣款原因"
              v-model="cutPay.desc">
            </el-input>
          </div>
          <div class="btnCtn">
            <span class=""
              @click="$message.warning('已取消'),cutPay.cutPayFlag = false">取消</span>
            <span class="submit"
              @click="submit('cutPay')">提交</span>
          </div>
        </div>
        <span class="close el-icon-close"
          @click="$message.warning('已取消'),cutPay.cutPayFlag = false"></span>
      </div>
    </div>
    <!-- 结算弹窗 -->
    <div class="shade"
      v-show="payMoney.payFlag">
      <div class="window">
        <div class="title">订单结算</div>
        <div class="content">
          <div class="lineCtn">
            <span class="label">订单号:</span>
            <el-select clearable
              v-model="payMoney.order_code_str"
              class="inputBox"
              disabled
              placeholder="请选择订单号">
              <!-- <el-option v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option> -->
            </el-select>
          </div>
          <div class="lineCtn">
            <span class="label">结算日期:</span>
            <el-date-picker v-model="payMoney.pay_time"
              class="inputBox"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="lineCtn">
            <span class="label">结算金额:</span>
            <el-input v-model="payMoney.pay_price"
              class="inputBox"
              placeholder="请输入转账金额"></el-input>
          </div>
          <div class="lineCtn">
            <span class="label">是否开票:</span>
            <el-radio v-model="payMoney.type"
              :label='1'>是</el-radio>
            <el-radio v-model="payMoney.type"
              :label='2'>否</el-radio>
          </div>
          <template v-if="payMoney.type === 1">
            <template v-for="(item,key) in payMoney.info">
              <div class="lineCtn"
                :key="key">
                <span class="label">开票号码:</span>
                <el-input v-model="item.pay_code"
                  class="inputBox"
                  placeholder="请输入开票号码"></el-input>
                <span class="el-icon-plus icon"
                  @click="appendPayMoneyInfo"
                  v-if="key===0"></span>
                <span class="el-icon-delete icon"
                  @click="deletePayMoneyInfo(key)"
                  v-if="key !== 0"></span>
              </div>
              <div class="lineCtn"
                :key="key+'y'">
                <span class="label">开票金额:</span>
                <el-input v-model="item.pay_price"
                  class="inputBox"
                  placeholder="请输入开票金额"></el-input>
              </div>
            </template>
          </template>
          <div class="lineCtn">
            <span class="label">备注信息:</span>
            <el-input type="textarea"
              class="inputBox"
              :rows="3"
              placeholder="请输入备注信息"
              v-model="cutPay.desc">
            </el-input>
          </div>
          <div class="btnCtn">
            <span class=""
              @click="$message.warning('已取消'),payMoney.payFlag = false">取消</span>
            <span class="submit"
              @click="submit('settle')">提交</span>
          </div>
        </div>
        <span class="close el-icon-close"
          @click="$message.warning('已取消'),payMoney.payFlag = false"></span>
      </div>
    </div>
    <!-- 操作记录弹窗 -->
    <div class="shade"
      v-show="record.recordFlag">
      <div class="window">
        <div class="title">操作记录</div>
        <div class="content">
          <div class="lineCtn filterCtn">
            <div class="filterBox">
              <el-date-picker v-model="record.time"
                type="date"
                class="inputBox"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              <el-input placeholder="请输入订单号"
                class="inputBox"
                prefix-icon="el-icon-search"
                v-model="record.searchVal">
              </el-input>
            </div>
            <div class="btn">
              <span :class='{"active":record.type === "all"}'
                @click="record.type = 'all'">全部</span>
              <span :class='{"active":record.type === "pay"}'
                @click="record.type = 'pay'">结算</span>
              <span :class='{"active":record.type === "cut"}'
                @click="record.type = 'cut'">扣款</span>
            </div>
          </div>
          <el-collapse accordion
            v-model="record.activeName"
            class="timeLine">
            <div class="borderCtn">
              <span class="border"></span>
            </div>
            <template v-if="record.infos.length > 0">
              <el-collapse-item v-for="(item,key) in record.infos"
                :key="key">
                <div slot="title"
                  class="title">
                  <div class="borderCtn">
                    <span class="circle"></span>
                  </div>
                  <span class="flex08">{{item.created_time}}</span>
                  <span class="flex08">{{flag[item.type] ? flag[item.type].name+'/' : '未知来源/'}}{{item.method === 1 ? '结算' : '扣款'}}</span>
                  <span class="flex08"
                    style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">金额：<strong>{{item.total_price|filterNumber}}万</strong></span>
                </div>
                <div class="line"
                  v-if="item.method === 1">
                  <span class="label">是否开票:</span>
                  <span class="info">{{item.isKp? '已开票' : '未开票'}}</span>
                </div>
                <template v-if="item.isKp">
                  <template v-for="(val,ind) in item.invoice_info">
                    <div class="line"
                      :key="ind">
                      <span class="label">开票号码:</span>
                      <span class="info">{{val.pay_code}}</span>
                    </div>
                    <div class="line"
                      :key="ind+'money'">
                      <span class="label">开票金额:</span>
                      <span class="info">{{val.pay_price}}</span>
                    </div>
                  </template>
                </template>
                <div class="line">
                  <span class="label">包含订单:</span>
                  <span class="info">
                    <span class="code"
                      v-for="(val,ind) in item.order_code_list"
                      :key="ind">{{val}}</span>
                  </span>
                </div>
                <div class="line">
                  <span class="label">备注信息:</span>
                  <span class="info">{{item.desc ? item.desc : '暂无'}}</span>
                </div>
              </el-collapse-item>
            </template>
            <span v-else>暂无数据</span>
          </el-collapse>
        </div>
        <span class="close el-icon-close"
          @click="record.recordFlag = false"></span>
      </div>
    </div>
    <!-- 图片弹窗 -->
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
            <img :src="item"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { companyType } from '@/assets/js/dictionary.js'
import { getToken, clientDetail, transferAdd, transferList, settleAdd, settleList, deductAdd, deductList, clientFinancialLog, packagNumberDetail, getGroup, clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      now_time: '',
      client_name: '',
      abbreviation: '',
      client_type: '',
      client_typeStr: '',
      total_price: 0, // 总金额
      settle_price: 0, // 结算总金额
      deduct_price: 0, // 扣款总金额
      groupList: [],
      clientList: [],
      imgList: [],
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
      selectVal: '',
      postData: { token: '' },
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
      flag: {
        1: {
          name: '订单列表',
          active: false,
          listName: 'orderList'
        },
        2: {
          name: '物料订购列表',
          active: false,
          listName: 'material_orderList'
        },
        3: {
          name: '物料加工列表',
          active: false,
          listName: 'material_processList'
        },
        4: {
          name: '生产织造列表',
          active: false,
          listName: 'weaveList'
        },
        5: {
          name: '产品加工列表',
          active: false,
          listName: 'product_processList'
        },
        7: {
          name: '包装订购列表',
          active: false,
          listName: 'packList'
        },
        8: {
          name: '运输列表',
          active: false,
          listName: 'transportList'
        },
        9: {
          name: '转账列表',
          active: true,
          listName: 'transferList'
        }
      }, // 切换列表
      list: {
        orderList: {
          list: [],
          lists: [],
          management: false,
          filter: {
            groupVal: '',
            data: '',
            orderVal: '',
            clientVal: ''
          },
          total_price: 0,
          total_deduct: 0,
          total_settle: 0
        }, // 订单列表
        material_orderList: {
          list: [],
          lists: [],
          management: false,
          filter: {
            groupVal: '',
            data: '',
            orderVal: '',
            clientVal: ''
          },
          total_price: 0,
          total_deduct: 0,
          total_settle: 0
        }, // 物料订购
        material_processList: {
          list: [],
          lists: [],
          management: false,
          filter: {
            groupVal: '',
            data: '',
            orderVal: '',
            clientVal: ''
          },
          total_price: 0,
          total_deduct: 0,
          total_settle: 0
        }, // 物料加工
        weaveList: {
          list: [],
          lists: [],
          management: false,
          filter: {
            groupVal: '',
            data: '',
            orderVal: '',
            clientVal: ''
          },
          total_price: 0,
          total_deduct: 0,
          total_settle: 0
        }, // 生产织造
        product_processList: {
          list: [],
          lists: [],
          management: false,
          filter: {
            groupVal: '',
            data: '',
            orderVal: '',
            clientVal: ''
          },
          total_price: 0,
          total_deduct: 0,
          total_settle: 0
        }, // 半成品加工
        packList: {
          list: [],
          lists: [],
          management: false,
          filter: {
            groupVal: '',
            data: '',
            orderVal: '',
            clientVal: ''
          },
          total_price: 0,
          total_deduct: 0,
          total_settle: 0
        }, // 包装订购
        transportList: {
          list: [],
          lists: [],
          management: false,
          filter: {
            groupVal: '',
            data: '',
            orderVal: '',
            clientVal: ''
          },
          total_price: 0,
          total_deduct: 0,
          total_settle: 0
        }, // 运输
        transferList: {
          list: [],
          lists: [],
          filter: {
            data: '',
            typeVal: '',
            methodVal: ''
          },
          transfer_total_price: 0
        } // 转账列表
      },
      classList: [
        {
          id: 1,
          name: '电子汇款'
        }, {
          id: 2,
          name: '支票'
        }, {
          id: 3,
          name: '网银转账'
        }, {
          id: 4,
          name: '第三方支付'
        }
      ],
      transfer: {
        flag: false,
        time: '',
        type: '1',
        method: '',
        total_price: '',
        desc: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      },
      cutPay: {
        flag: false, // 是否处于批量管理状态
        checkAllFlag: false, // 是否处于全选状态
        checkedList: [], // 批量选择的数据
        cutPayFlag: false, // 扣款弹窗flag
        order_code_list: '',
        order_id_list: [],
        cutPay_time: '',
        cutPay_price: '',
        desc: ''
      },
      payMoney: {
        payFlag: false, // 结算弹窗flag
        order_code_list: '',
        order_id_list: [],
        pay_time: '',
        pay_price: '',
        type: 1,
        info: [
          {
            pay_code: '',
            pay_price: ''
          }
        ],
        desc: ''
      },
      record: {
        activeName: '',
        recordFlag: false,
        time: '',
        searchVal: '',
        type: 'all',
        info: [],
        infos: []
      }
    }
  },
  methods: {
    // 获取操作记录
    getRecordList () {
      this.loading = true
      Promise.all([
        deductList({
          client_id: this.$route.params.id
        }),
        settleList({
          client_id: this.$route.params.id
        })
      ]).then(res => {
        this.record.info = []
        this.deduct_price = 0
        this.settle_price = 0
        for (const prop in this.list) {
          this.list[prop].list.forEach(item => {
            item.settle_number = 0
            item.deduct_number = 0
          })
          this.list[prop].total_deduct = 0
          this.list[prop].total_settle = 0
        }
        res[0].data.data.forEach(item => {
          this.deduct_price = Number(this.deduct_price ? this.deduct_price : 0) + Number(item.deduct_price)
          this.record.info.push({
            created_time: item.created_at,
            method: 2,
            type: item.type,
            total_price: item.deduct_price,
            isKp: false,
            invoice_info: [],
            order_code_list: JSON.parse(item.order_id),
            desc: item.desc
          })
          if (item.type) {
            JSON.parse(item.order_id).forEach(value => {
              let flag = this.list[this.flag[item.type].listName].list.find(key => key.order_code === value)
              if (flag) {
                if (!flag.deduct_number) {
                  flag.deduct_number = 0
                }
                flag.deduct_number++
                this.list[this.flag[item.type].listName].total_deduct++
              }
            })
          }
        })
        res[1].data.data.forEach(item => {
          this.settle_price = Number(this.settle_price ? this.settle_price : 0) + Number(item.settle_price)
          this.record.info.push({
            created_time: item.created_at,
            method: 1,
            type: item.type,
            total_price: item.settle_price,
            isKp: item.is_invoice === 1,
            invoice_info: JSON.parse(item.invoice_info),
            order_code_list: JSON.parse(item.order_id),
            desc: item.desc
          })
          if (item.type) {
            JSON.parse(item.order_id).forEach(value => {
              let flag = this.list[this.flag[item.type].listName].list.find(key => key.order_code === value)
              if (flag) {
                if (!flag.settle_number) {
                  flag.settle_number = 0
                }
                flag.settle_number++
                this.list[this.flag[item.type].listName].total_settle++
              }
            })
          }
        })
        this.record.info.sort((a, b) => {
          return new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
        })
        this.record.infos = this.record.info
        this.loading = false
      })
    },
    // 提交数据
    submit (item) {
      let type = null
      for (const prop in this.flag) {
        if (this.flag[prop].active) {
          type = prop
        }
      }
      if (item === 'transfer') {
        if (!this.transfer.time) {
          this.$message.error('请选择转账日期')
          return
        }
        if (!this.transfer.method) {
          this.$message.error('请选择转账方式')
          return
        }
        if (!this.transfer.total_price) {
          this.$message.error('请输入转账金额')
          return
        }
        const imgArr = this.$refs.uploada.uploadFiles.map((items) => { return 'http://zhihui.tlkrzf.com/' + items.response.key })
        transferAdd({
          company_id: window.sessionStorage.getItem('company_id'),
          user_id: window.sessionStorage.getItem('user_id'),
          client_id: this.$route.params.id,
          complete_time: this.transfer.time,
          type: this.transfer.type,
          transfer_way: this.transfer.method,
          transfer_price: this.transfer.total_price,
          file_url: JSON.stringify(imgArr),
          desc: this.transfer.desc,
          id: null
        }).then(res => {
          this.$message.success('添加转账成功')
          this.transfer.flag = false
          this.getPayList()
        })
      } else if (item === 'cutPay') {
        if (!this.cutPay.cutPay_time) {
          this.$message.error('请选择结算日期')
          return
        }
        if (!this.cutPay.cutPay_price) {
          this.$message.error('请输入扣款金额')
          return
        }
        deductAdd({
          user_id: window.sessionStorage.getItem('user_id'),
          client_id: this.$route.params.id,
          company_id: window.sessionStorage.getItem('company_id'),
          complete_time: this.cutPay.cutPay_time,
          order_id: JSON.stringify(this.cutPay.order_code_list),
          deduct_price: this.cutPay.cutPay_price,
          type: type,
          desc: this.cutPay.desc
        }).then(res => {
          this.$message.success('添加扣款成功')
          this.cutPay.cutPayFlag = false
          this.getRecordList()
        })
      } else if (item === 'settle') {
        if (!this.payMoney.pay_time) {
          this.$message.error('请选择结算日期')
          return
        }
        if (!this.payMoney.pay_price) {
          this.$message.error('请输入结算金额')
          return
        }
        if (!this.payMoney.type) {
          this.$message.error('请选择是否开票')
          return
        }
        settleAdd({
          company_id: window.sessionStorage.getItem('company_id'),
          client_id: this.$route.params.id,
          order_id: JSON.stringify(this.payMoney.order_code_list),
          user_id: window.sessionStorage.getItem('user_id'),
          settle_price: this.payMoney.pay_price,
          is_invoice: this.payMoney.type,
          invoice_info: JSON.stringify(this.payMoney.info),
          complete_time: this.payMoney.pay_time,
          type: type,
          desc: this.payMoney.desc
        }).then(res => {
          this.$message.success('添加结算成功')
          this.payMoney.payFlag = false
          this.getRecordList()
        })
      } else {
        this.$message.error('出错了！请刷新页面')
      }
    },
    // 获取转账记录
    getPayList () {
      transferList({
        client_id: this.$route.params.id
      }).then(res => {
        this.transfer_total_price = 0
        this.list.transferList.list = res.data.data
        this.list.transferList.list.forEach(item => {
          this.list.transferList.transfer_total_price += Number(item.transfer_price)
          if (item.file_url) {
            item.file_url = JSON.parse(item.file_url)
          }
        })
        this.list.transferList.lists = this.list.transferList.list
      })
    },
    // 上传图片前验证
    beforeUpload: function (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 6
      // const isReapeat = this.fileArr.find((item) => {
      //   return item.key === file.name
      // })
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 6MB!')
        return false
      }
      // if (isReapeat) {
      //   this.$message.error('不能重复上传图片')
      //   return false
      // }
    },
    // 批量管理全选按钮
    checked (item, type) {
      if (item === 'all') {
        if (this.cutPay.checkAllFlag) {
          this.list[type].list.forEach(item => {
            item.checked = true
            this.cutPay.checkedList.push(item)
          })
        } else {
          this.list[type].list.forEach(item => { item.checked = false })
          this.cutPay.checkedList = []
        }
      } else {
        if (item.checked === true) {
          this.cutPay.checkedList.push(item)
        } else {
          this.cutPay.checkedList.forEach((val, ind) => {
            if (item.id === val.id) {
              this.cutPay.checkedList.splice(ind, 1)
            }
          })
        }
      }
    },
    // 扣款弹窗前
    cutPayMoney () {
      if (this.cutPay.checkedList.length === 0) {
        this.$message.warning('请选择需要扣款的订单！')
        return
      }
      this.cutPay.cutPayFlag = true
      this.cutPay.cutPay_time = this.now_time
      this.cutPay.order_code_list = []
      this.cutPay.order_code_str = ''
      this.cutPay.order_id_list = []
      this.cutPay.checkedList.forEach(item => {
        if (this.cutPay.order_code_list.indexOf(item.order_code) === -1) {
          this.cutPay.order_code_list.push(item.order_code)
          this.cutPay.order_code_str += (item.order_code + ';')
        }
        if (this.cutPay.order_id_list.indexOf(item.order_id) === -1) {
          this.cutPay.order_id_list.push(item.id)
        }
      })
    },
    // 结算弹窗前
    payMoneys () {
      if (this.cutPay.checkedList.length === 0) {
        this.$message.warning('请选择需要结算的订单！')
        return
      }
      this.payMoney.payFlag = true
      this.payMoney.pay_time = this.now_time
      this.payMoney.order_code_list = []
      this.payMoney.order_code_str = ''
      this.payMoney.order_id_list = []
      this.cutPay.checkedList.forEach(item => {
        if (this.payMoney.order_code_list.indexOf(item.order_code) === -1) {
          this.payMoney.order_code_list.push(item.order_code)
          this.payMoney.order_code_str += (item.order_code + ';')
        }
        if (this.payMoney.order_id_list.indexOf(item.order_id) === -1) {
          this.payMoney.order_id_list.push(item.id)
        }
      })
    },
    // 添加发票信息
    appendPayMoneyInfo () {
      this.payMoney.info.push({
        pay_code: '',
        pay_price: ''
      })
    },
    // 删除发票信息
    deletePayMoneyInfo (index) {
      this.payMoney.info.splice(index, 1)
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    // 切换操作列表
    cutList (item) {
      for (const prop in this.flag) {
        if (item === Number(prop)) {
          this.flag[prop].active = true
        } else {
          this.flag[prop].active = false
        }
      }
      for (const prop in this.list) {
        this.list[prop].management = false
        this.list[prop].list.forEach(value => {
          value.checked = false
        })
      }
      this.cutPay.checkAllFlag = false
      this.cutPay.checkedList = []
    },
    getOutStockInfo (item) {
      item.flag = !item.flag
      item.loading = true
      item.product_info.forEach(val => {
        val.size.forEach(valSize => {
          valSize.pack_number = 0
        })
      })
      packagNumberDetail({
        order_id: item.id
      }).then(res => {
        res.data.data.forEach(val => {
          JSON.parse(val.product_info).forEach(valPro => {
            valPro.size_info.forEach(valSize => {
              let pro = item.product_info.find(key => key.product_code === valPro.product_code)
              if (pro) {
                let size = pro.size.find(key => (key.size === valSize.size && key.color === valSize.color && key.batch_id === val.batch_id))
                if (size) {
                  size.pack_number = Number(size.pack_number ? size.pack_number : 0) + Number(valSize.pack_number)
                }
              }
            })
          })
        })
        item.loading = false
      })
    },
    find (code, type) {
      this.record.recordFlag = true
      this.record.searchVal = code
      this.record.type = type
    }
  },
  created () {
    getToken().then(res => {
      this.postData.token = res.data.data
    })
    clientDetail({
      id: this.$route.params.id
    }).then(res => {
      this.client_name = res.data.data.name
      this.abbreviation = res.data.data.abbreviation
      this.client_type = res.data.data.type
      res.data.data.type.forEach((item, index) => {
        this.client_typeStr += ((index !== 0 ? ',' : '') + companyType.find(key => key.value === item).name)
      })
    })
    clientFinancialLog({
      client_id: this.$route.params.id
    }).then(res => {
      // 订单整理
      res.data.data.order_info.forEach(item => {
        let productInfo = []
        item.order_batch.forEach(valBat => {
          valBat.batch_info.forEach(valPro => {
            valPro.size.forEach(valSize => {
              let pro = productInfo.find(key => key.product_code === valPro.productCode)
              if (!pro) {
                productInfo.push({
                  product_code: valPro.productCode,
                  product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : ''),
                  img: valPro.productInfo.img,
                  unit: valPro.productInfo.category_info.name,
                  size: [{
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers,
                    price: valSize.unitPrice,
                    batch_id: valBat.batch_id
                  }]
                })
              } else {
                let size = pro.size.find(key => (key.size === valSize.name[0] && key.color === valSize.name[1] && key.price === valSize.unitPrice))
                if (!size) {
                  pro.size.push({
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers,
                    price: valSize.unitPrice,
                    batch_id: valBat.batch_id
                  })
                } else {
                  size.number = Number(size.number ? size.number : 0) + Number(valSize.numbers)
                }
              }
            })
          })
        })
        this.list.orderList.total_price = Number(this.list.orderList.total_price) + Number(item.total_real)
        this.list.orderList.list.push({
          id: item.id,
          order_code: item.order_code,
          group_name: item.group_name,
          order_time: item.order_time,
          client_name: item.client_name,
          total_price: item.total_real,
          rate: item.exchange_rate / 100,
          account_unit: item.account_unit,
          product_info: productInfo,
          deduct_number: 0,
          settle_number: 0,
          flag: false,
          checked: false,
          loading: false
        })
      })
      // 物料订购整理
      res.data.data.material_order.filter(key => key.type_source === 2).forEach(item => {
        this.list.material_orderList.total_price = Number(this.list.material_orderList.total_price) + Number(item.weight * item.price)
        let flag = this.list.material_orderList.list.find(key => key.id === item.order_id)
        if (!flag) {
          this.list.material_orderList.list.push({
            id: item.order_id,
            order_code: item.order_code,
            group_name: item.group_name,
            order_time: item.order_date,
            client_name: item.order_client,
            total_price: item.weight * item.price,
            info: [{
              material_name: item.material_name,
              material_info: [{
                type: '订购',
                attr: item.attribute,
                color: item.color_code,
                price: item.price,
                number: item.weight
              }]
            }],
            deduct_number: 0,
            settle_number: 0,
            flag: false,
            checked: false,
            loading: false
          })
        } else {
          flag.total_price = Number(flag.total_price ? flag.total_price : 0) + Number(item.weight * item.price)
          let name = flag.info.find(key => key.material_name === item.material_name)
          if (!name) {
            flag.info.push({
              material_name: item.material_name,
              material_info: [{
                type: '订购',
                attr: item.attribute,
                color: item.color_code,
                price: item.price,
                number: item.weight
              }]
            })
          } else {
            let info = name.material_info.find(key => (key.attr === item.attribute && key.color === item.color_code && key.price === item.price))
            if (!info) {
              name.material_info.push({
                type: '订购',
                attr: item.attribute,
                color: item.color_code,
                price: item.price,
                number: item.weight
              })
            } else {
              info.number = Number(info.number ? info.number : 0) + Number(item.weight)
            }
          }
        }
      })
      // 预定购整理
      res.data.data.material_reserve.forEach(item => {
        let info = []
        let totalPrice = 0
        item.reserve_detail.forEach(val => {
          this.list.material_orderList.total_price = Number(this.list.material_orderList.total_price) + Number(val.price * val.weight)
          totalPrice = Number(totalPrice) + val.price * val.weight
          let name = info.find(key => key.material_name === val.material_name)
          if (!name) {
            info.push({
              material_name: val.material_name,
              material_info: [{
                type: '预定购',
                attr: val.attribute,
                color: val.color_code,
                price: val.price,
                number: val.weight
              }]
            })
          } else {
            let flag = name.material_info.find(key => (key.attr === val.attribute && key.color === val.color_code && key.price === val.price))
            if (!flag) {
              name.material_info.push({
                type: '预定购',
                attr: val.attribute,
                color: val.color_code,
                price: val.price,
                number: val.weight
              })
            } else {
              flag.number = Number(flag.number ? flag.number : 0) + Number(val.weight)
            }
          }
        })
        if (item.reserve_detail.length !== 0) {
          this.list.material_orderList.list.push({
            id: null,
            order_code: item.id + '(预定购)',
            group_name: null,
            order_time: item.order_time,
            total_price: totalPrice,
            client_name: null,
            info: info,
            deduct_number: 0,
            settle_number: 0,
            flag: false,
            checked: false,
            loading: false
          })
        }
      })
      // 物料加工整理
      res.data.data.material_process_log.forEach(item => {
        this.list.material_processList.total_price = Number(this.list.material_processList.total_price) + Number(item.total_price)
        let flag = this.list.material_processList.list.find(key => key.id === item.order_id)
        if (!flag) {
          this.list.material_processList.list.push({
            id: item.order_id,
            order_code: item.order_code,
            group_name: item.order_group,
            order_time: item.order_time,
            client_name: item.order_company,
            total_price: item.total_price,
            info: [{
              material_name: item.material_name,
              process_type: item.process_type,
              total_price: item.total_price,
              material_info: JSON.parse(item.material_info)
            }],
            deduct_number: 0,
            settle_number: 0,
            flag: false,
            checked: false,
            loading: false
          })
        } else {
          flag.total_price = Number(flag.total_price ? flag.total_price : 0) + Number(item.total_price)
          let name = flag.info.find(key => (key.material_name === item.material_name && key.process_type === item.process_type))
          if (!name) {
            flag.info.push({
              material_name: item.material_name,
              process_type: item.process_type,
              total_price: item.total_price,
              material_info: JSON.parse(item.material_info)
            })
          } else {
            name.material_info.push(...JSON.parse(item.material_info))
          }
        }
      })
      // 物料织造整理
      res.data.data.weave_log.forEach(item => {
        this.list.weaveList.total_price = Number(this.list.weaveList.total_price) + Number(item.number * item.price)
        let flag = this.list.weaveList.list.find(key => key.id === item.order_id)
        if (!flag) {
          this.list.weaveList.list.push({
            id: item.order_id,
            order_code: item.order_code,
            order_time: item.order_time,
            group_name: item.group_name,
            client_name: item.order_client_name,
            total_price: item.number * item.price,
            info: [{
              product_code: item.product_info.product_code,
              product_type: item.product_info.category_info.product_category + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_id ? '/' + item.product_info.flower_id : ''),
              img: item.product_info.img,
              unit: item.product_info.category_info.name,
              size: [{
                size: item.size,
                color: item.color,
                number: item.number,
                price: item.price
              }]
            }],
            deduct_number: 0,
            settle_number: 0,
            flag: false,
            checked: false,
            loading: false
          })
        } else {
          flag.total_price = Number(flag.total_price ? flag.total_price : 0) + Number(item.number * item.price)
          let pro = flag.info.find(key => key.product_code === item.product_info.product_code)
          if (!pro) {
            flag.info.push({
              product_code: item.product_info.product_code,
              product_type: item.product_info.category_info.product_category + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_id ? '/' + item.product_info.flower_id : ''),
              img: item.product_info.img,
              unit: item.product_info.category_info.name,
              size: [{
                size: item.size,
                color: item.color,
                number: item.number,
                price: item.price
              }]
            })
          } else {
            let size = pro.size.find(key => (key.size === item.size && key.color === item.color && key.price === item.price))
            if (!size) {
              pro.size.push({
                size: item.size,
                color: item.color,
                number: item.number,
                price: item.price
              })
            } else {
              size.number = Number(size.number ? size.number : 0) + Number(item.number)
            }
          }
        }
      })
      // 产品加工整理
      res.data.data.semi_product_log.forEach(item => {
        this.list.product_processList.total_price = Number(this.list.product_processList.total_price) + Number(item.number * item.price)
        let flag = this.list.product_processList.list.find(key => key.id === item.order_id)
        if (!flag) {
          this.list.product_processList.list.push({
            id: item.order_id,
            order_code: item.order_code,
            order_time: item.order_time,
            client_name: item.order_client_name,
            group_name: item.group_name,
            total_price: item.number * item.price,
            info: [{
              product_code: item.product_info.product_code,
              product_type: item.product_info.category_info.product_category + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_id ? '/' + item.product_info.flower_id : ''),
              img: item.product_info.img,
              unit: item.product_info.category_info.name,
              size: [{
                type: item.type,
                size: item.size,
                color: item.color,
                number: item.number,
                price: item.price
              }]
            }],
            deduct_number: 0,
            settle_number: 0,
            flag: false,
            checked: false,
            loading: false
          })
        } else {
          flag.total_price = Number(flag.total_price ? flag.total_price : 0) + Number(item.number * item.price)
          let pro = flag.info.find(key => key.product_code === item.product_info.product_code)
          if (!pro) {
            flag.info.push({
              product_code: item.product_info.product_code,
              product_type: item.product_info.category_info.product_category + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_id ? '/' + item.product_info.flower_id : ''),
              img: item.product_info.img,
              unit: item.product_info.category_info.name,
              size: [{
                type: item.type,
                size: item.size,
                color: item.color,
                number: item.number,
                price: item.price
              }]
            })
          } else {
            let size = pro.size.find(key => (key.size === item.size && key.color === item.color && key.price === item.price))
            if (!size) {
              pro.size.push({
                type: item.type,
                size: item.size,
                color: item.color,
                number: item.number,
                price: item.price
              })
            } else {
              size.number = Number(size.number ? size.number : 0) + Number(item.number)
            }
          }
        }
      })
      // 包装订购整理
      res.data.data.pack_log.forEach(item => {
        this.list.packList.total_price = Number(this.list.packList.total_price) + Number(item.number * item.price)
        let flag = this.list.packList.list.find(key => key.id === item.order_id)
        if (!flag) {
          this.list.packList.list.push({
            id: item.order_id,
            order_code: item.order_code,
            order_time: item.order_time,
            group_name: item.group_name,
            client_name: item.order_client_name,
            total_price: item.price * item.number,
            info: [{
              name: item.material_name,
              material_info: [{
                size: item.size,
                price: item.price,
                number: item.number
              }]
            }],
            deduct_number: 0,
            settle_number: 0,
            flag: false,
            checked: false,
            loading: false
          })
        } else {
          flag.total_price = Number(flag.total_price ? flag.total_price : 0) + Number(item.price * item.number)
          let name = flag.info.find(key => key.name === item.material_name)
          if (!name) {
            flag.info.push({
              name: item.material_name,
              material_info: [{
                size: item.size,
                price: item.price,
                number: item.number
              }]
            })
          } else {
            let size = name.material_info.find(key => (key.size === item.size && key.price === item.price))
            if (!size) {
              name.material_info.push({
                size: item.size,
                price: item.price,
                number: item.number
              })
            } else {
              size.number = Number(size.number ? size.number : 0) + Number(item.number)
            }
          }
        }
      })
      // 运输整理
      res.data.data.stock_out.forEach(item => {
        let flag = this.list.transportList.list.find(key => key.id === item.order_id)
        if (!flag) {
          this.list.transportList.list.push({

          })
        }
      })
      console.log(this.list)
      // 统计共计金额及可筛选数据数组
      for (const prop in this.list) {
        this.total_price = Number(this.total_price ? this.total_price : 0) + Number(this.list[prop].total_price ? this.list[prop].total_price : 0)
        this.list[prop].lists = this.list[prop].list
      }
      this.getRecordList()
    })
    getGroup({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.groupList = res.data.data
    })
    clientList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.clientList = res.data.data.filter(key => key.type.indexOf(1) !== -1)
    })
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    this.getPayList()
    // this.getOrderList()
  },
  filters: {
    filterNumber (val) {
      return Number((val / 10000).toFixed(2)).toLocaleString()
    },
    filterToFixed (val) {
      return Number(val).toFixed(2)
    }
  },
  watch: {
    'record.time': {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.record.infos = this.record.info.filter(item => (new Date(item.created_time).getFullYear() === new Date(newVal).getFullYear() && new Date(item.created_time).getMonth() === new Date(newVal).getMonth() && new Date(item.created_time).getDate() === new Date(newVal).getDate()))
        } else {
          this.record.infos = this.record.info
        }
      }
    },
    'record.searchVal': {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.record.infos = this.record.info.filter(item => (item.order_code_list.indexOf(newVal) !== -1))
        } else {
          this.record.infos = this.record.info
        }
      }
    },
    'record.type': {
      deep: true,
      handler (newVal) {
        if (newVal === 'all') {
          this.record.infos = this.record.info
        } else if (newVal === 'pay') {
          this.record.infos = this.record.info.filter(item => item.method === 1)
        } else if (newVal === 'cut') {
          this.record.infos = this.record.info.filter(item => item.method === 2)
        }
      }
    },
    'list.orderList.filter': {
      deep: true,
      handler (newVal) {
        this.list.orderList.lists = newVal.clientVal ? this.list.orderList.list.filter(item => item.client_name === newVal.clientVal) : this.list.orderList.list
        this.list.orderList.lists = newVal.groupVal ? this.list.orderList.lists.filter(item => item.group_name === newVal.groupVal) : this.list.orderList.lists
        this.list.orderList.lists = newVal.orderVal ? this.list.orderList.lists.filter(item => item.id === newVal.orderVal) : this.list.orderList.lists
        this.list.orderList.lists = newVal.data ? this.list.orderList.lists.filter(item => (new Date(item.order_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.order_time).getTime())) : this.list.orderList.lists
        this.list.orderList.total_deduct = 0
        this.list.orderList.total_price = 0
        this.list.orderList.total_settle = 0
        this.list.orderList.lists.forEach(item => {
          this.list.orderList.total_deduct += Number(item.deduct_number)
          this.list.orderList.total_settle += Number(item.settle_number)
          this.list.orderList.total_price += Number(item.total_price)
        })
      }
    },
    'list.material_orderList.filter': {
      deep: true,
      handler (newVal) {
        this.list.material_orderList.lists = newVal.clientVal ? this.list.material_orderList.list.filter(item => item.client_name === newVal.clientVal) : this.list.material_orderList.list
        this.list.material_orderList.lists = newVal.groupVal ? this.list.material_orderList.lists.filter(item => item.group_name === newVal.groupVal) : this.list.material_orderList.lists
        this.list.material_orderList.lists = newVal.orderVal ? this.list.material_orderList.lists.filter(item => item.id === newVal.orderVal) : this.list.material_orderList.lists
        this.list.material_orderList.lists = newVal.data ? this.list.material_orderList.lists.filter(item => (new Date(item.order_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.order_time).getTime())) : this.list.material_orderList.lists
        this.list.material_orderList.total_deduct = 0
        this.list.material_orderList.total_price = 0
        this.list.material_orderList.total_settle = 0
        this.list.material_orderList.lists.forEach(item => {
          this.list.material_orderList.total_deduct += Number(item.deduct_number)
          this.list.material_orderList.total_settle += Number(item.settle_number)
          this.list.material_orderList.total_price += Number(item.total_price)
        })
      }
    },
    'list.material_processList.filter': {
      deep: true,
      handler (newVal) {
        this.list.material_processList.lists = newVal.clientVal ? this.list.material_processList.list.filter(item => item.client_name === newVal.clientVal) : this.list.material_processList.list
        this.list.material_processList.lists = newVal.groupVal ? this.list.material_processList.lists.filter(item => item.group_name === newVal.groupVal) : this.list.material_processList.lists
        this.list.material_processList.lists = newVal.orderVal ? this.list.material_processList.lists.filter(item => item.id === newVal.orderVal) : this.list.material_processList.lists
        this.list.material_processList.lists = newVal.data ? this.list.material_processList.lists.filter(item => (new Date(item.order_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.order_time).getTime())) : this.list.material_processList.lists
        this.list.material_processList.total_deduct = 0
        this.list.material_processList.total_price = 0
        this.list.material_processList.total_settle = 0
        this.list.material_processList.lists.forEach(item => {
          this.list.material_processList.total_deduct += Number(item.deduct_number)
          this.list.material_processList.total_settle += Number(item.settle_number)
          this.list.material_processList.total_price += Number(item.total_price)
        })
      }
    },
    'list.weaveList.filter': {
      deep: true,
      handler (newVal) {
        this.list.weaveList.lists = newVal.clientVal ? this.list.weaveList.list.filter(item => item.client_name === newVal.clientVal) : this.list.weaveList.list
        this.list.weaveList.lists = newVal.groupVal ? this.list.weaveList.lists.filter(item => item.group_name === newVal.groupVal) : this.list.weaveList.lists
        this.list.weaveList.lists = newVal.orderVal ? this.list.weaveList.lists.filter(item => item.id === newVal.orderVal) : this.list.weaveList.lists
        this.list.weaveList.lists = newVal.data ? this.list.weaveList.lists.filter(item => (new Date(item.order_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.order_time).getTime())) : this.list.weaveList.lists
        this.list.weaveList.total_deduct = 0
        this.list.weaveList.total_price = 0
        this.list.weaveList.total_settle = 0
        this.list.weaveList.lists.forEach(item => {
          this.list.weaveList.total_deduct += Number(item.deduct_number)
          this.list.weaveList.total_settle += Number(item.settle_number)
          this.list.weaveList.total_price += Number(item.total_price)
        })
      }
    },
    'list.product_processList.filter': {
      deep: true,
      handler (newVal) {
        this.list.product_processList.lists = newVal.clientVal ? this.list.product_processList.list.filter(item => item.client_name === newVal.clientVal) : this.list.product_processList.list
        this.list.product_processList.lists = newVal.groupVal ? this.list.product_processList.lists.filter(item => item.group_name === newVal.groupVal) : this.list.product_processList.lists
        this.list.product_processList.lists = newVal.orderVal ? this.list.product_processList.lists.filter(item => item.id === newVal.orderVal) : this.list.product_processList.lists
        this.list.product_processList.lists = newVal.data ? this.list.product_processList.lists.filter(item => (new Date(item.order_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.order_time).getTime())) : this.list.product_processList.lists
        this.list.product_processList.total_deduct = 0
        this.list.product_processList.total_price = 0
        this.list.product_processList.total_settle = 0
        this.list.product_processList.lists.forEach(item => {
          this.list.product_processList.total_deduct += Number(item.deduct_number)
          this.list.product_processList.total_settle += Number(item.settle_number)
          this.list.product_processList.total_price += Number(item.total_price)
        })
      }
    },
    'list.packList.filter': {
      deep: true,
      handler (newVal) {
        this.list.packList.lists = newVal.clientVal ? this.list.packList.list.filter(item => item.client_name === newVal.clientVal) : this.list.packList.list
        this.list.packList.lists = newVal.groupVal ? this.list.packList.lists.filter(item => item.group_name === newVal.groupVal) : this.list.packList.lists
        this.list.packList.lists = newVal.orderVal ? this.list.packList.lists.filter(item => item.id === newVal.orderVal) : this.list.packList.lists
        this.list.packList.lists = newVal.data ? this.list.packList.lists.filter(item => (new Date(item.order_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.order_time).getTime())) : this.list.packList.lists
        this.list.packList.total_deduct = 0
        this.list.packList.total_price = 0
        this.list.packList.total_settle = 0
        this.list.packList.lists.forEach(item => {
          this.list.packList.total_deduct += Number(item.deduct_number)
          this.list.packList.total_settle += Number(item.settle_number)
          this.list.packList.total_price += Number(item.total_price)
        })
      }
    },
    'list.transportList.filter': {
      deep: true,
      handler (newVal) {
        this.list.transportList.lists = newVal.clientVal ? this.list.transportList.list.filter(item => item.client_name === newVal.clientVal) : this.list.transportList.list
        this.list.transportList.lists = newVal.groupVal ? this.list.transportList.lists.filter(item => item.group_name === newVal.groupVal) : this.list.transportList.lists
        this.list.transportList.lists = newVal.orderVal ? this.list.transportList.lists.filter(item => item.id === newVal.orderVal) : this.list.transportList.lists
        this.list.transportList.lists = newVal.data ? this.list.transportList.lists.filter(item => (new Date(item.order_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.order_time).getTime())) : this.list.transportList.lists
        this.list.transportList.total_deduct = 0
        this.list.transportList.total_price = 0
        this.list.transportList.total_settle = 0
        this.list.transportList.lists.forEach(item => {
          this.list.transportList.total_deduct += Number(item.deduct_number)
          this.list.transportList.total_settle += Number(item.settle_number)
          this.list.transportList.total_price += Number(item.total_price)
        })
      }
    },
    'list.transferList.filter': {
      deep: true,
      handler (newVal) {
        this.list.transferList.lists = newVal.typeVal ? this.list.transferList.list.filter(item => item.type === newVal.typeVal) : this.list.transferList.list
        this.list.transferList.lists = newVal.methodVal ? this.list.transferList.lists.filter(item => item.transfer_way === newVal.methodVal) : this.list.transferList.lists
        this.list.transferList.lists = newVal.data ? this.list.transferList.lists.filter(item => (new Date(item.complete_time).getTime() >= newVal.data[0].getTime() && newVal.data[1].getTime() >= new Date(item.complete_time).getTime())) : this.list.transferList.lists
        this.list.transferList.transfer_total_price = 0
        this.list.transferList.lists.forEach(item => {
          this.list.transferList.transfer_total_price += Number(item.transfer_price)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/foreignTradeFinancialDetail.less";
</style>
<style lang="less" scoped>
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
