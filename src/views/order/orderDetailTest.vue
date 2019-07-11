<template>
  <div id="orderDetail">
    <div class="head"
      style="overflow:auto"
      id="top">
      <h2>订单详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="keyBtn">
            <!-- <span class="btns">一键完成</span> -->
            <el-dropdown size="medium"
              split-button
              type="primary">
              一键完成
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="infoCtn">
            <div class="labelInfo">
              <span class="label">订单状态</span>
              <span class="info"
                :style="{'color':orderStateColor}">{{orderState}}</span>
            </div>
            <div class="labelInfo">
              <span class="label">订单金额</span>
              <span class="info">{{moneyCmp}}</span>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">订单号:</span>
            <span class="content">{{order_info.order_code}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">订单公司:</span>
            <span class="content">{{order_info.client_name}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">汇率:</span>
            <span class="content">100元={{order_info.exchange_rate}}{{order_info.account_unit}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">下单日期:</span>
            <span class="content">{{order_info.order_time}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">联系人:</span>
            <span class="content">{{order_info.contacts}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">税率:</span>
            <span class="content">{{order_info.tax_rate}}%</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">备注信息:</span>
            <span class="content">{{order_info.remark?order_info.remark:'暂无信息'}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">流程进度</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="processCtn">
          <div class="leaveTime">
            <span class="text">订单已经生产<em class="blue">{{useTime}}</em>天，还剩<em class="red">{{leaveTime}}</em>天</span>
          </div>
          <div class="processOuter">
            <div class="processInner"
              :style="{'width':process.product_ins_pre+'%'}"></div>
            <div class="processInfo">成品检验完成度：{{process.product_ins_pre+'%'}}</div>
            <div class="timeCtn"
              v-for="(item,index) in timeAxis"
              :key="index"
              :style="{left:item.rate}">
              <div class="time">{{item.time}}</div>
              <div class="line"></div>
              <div class="info">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="cardCtn">
          <div class="transformBtn leftBtn"
            @mousedown="translated('left')"
            @mouseup="clearTimer"><i class="el-icon-arrow-left"></i></div>
          <div class="cardTransform"
            ref="cardTransform">
            <div class="card">
              <div class="model1"></div>
              <i class="line"></i>
              <div class="model2"></div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
          </div>
          <div class="transformBtn rightBtn"
            @mousedown="translated('right')"
            @mouseup="clearTimer"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">流程详情</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="iconCtn">
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>已下单</span></div>
              <div style="height:0%"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单下单.png" />
              <div style="height:100%"
                class="backBottom complete"></div>
            </div>
            <div class="label">订单下单</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{'原料:'+process.main_material_pre + '%'}}<br />{{'辅料:'+process.assist_material_pre+ '%'}}</span></div>
              <div :style="{height:(100-process.main_material_pre) + '%'}"
                class="backTop halfL"></div>
              <div :style="{height:(100-process.assist_material_pre) + '%'}"
                class="backTop halfR"></div>
              <div class="lineMid"></div>
              <div :style="{height:process.main_material_pre + '%'}"
                :class="{'complete':process.main_material_pre>=100}"
                class="backBottom halfL"></div>
              <div :style="{height:process.assist_material_pre + '%'}"
                :class="{'complete':process.assist_material_pre>=100}"
                class="backBottom halfR"></div>
              <img class="icon"
                src="@/assets/image/icon/订单物料.png" />
            </div>
            <div class="label">物料订购</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{process.weave_pre + '%'}}</span></div>
              <div :style="{height:(100-process.weave_pre) + '%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单生产.png" />
              <div :style="{height:process.weave_pre + '%'}"
                :class="{'complete':process.weave_pre>=100}"
                class="backBottom"></div>
            </div>
            <div class="label">生产织造</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{process.product_pop_push + '%'}}</span></div>
              <div :style="{height:(100-process.product_pop_push) + '%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单收发.png" />
              <div :style="{height:process.product_pop_push + '%'}"
                :class="{'complete':process.product_pop_push>=100}"
                class="backBottom"></div>
            </div>
            <div class="label">产品收发</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{'成品:'+process.product_ins_pre + '%'}}<br />{{'半成品:'+process.semi_product_ins_pre+ '%'}}</span></div>
              <div :style="{height:(100-process.semi_product_ins_pre) + '%'}"
                class="backTop halfL"></div>
              <div :style="{height:(100-process.product_ins_pre) + '%'}"
                class="backTop halfR"></div>
              <div class="lineMid"></div>
              <div :style="{height:process.semi_product_ins_pre + '%'}"
                :class="{'complete':process.semi_product_ins_pre>=100}"
                class="backBottom halfL"></div>
              <div :style="{height:process.product_ins_pre + '%'}"
                :class="{'complete':process.product_ins_pre>=100}"
                class="backBottom halfR"></div>
              <img class="icon"
                src="@/assets/image/icon/订单检验.png" />
            </div>
            <div class="label">产品检验</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{process.pack_pre + '%'}}</span></div>
              <div :style="{height:(100-process.pack_pre) + '%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单出库.png" />
              <div :style="{height:process.pack_pre + '%'}"
                :class="{'complete':process.pack_pre>=100}"
                class="backBottom"></div>
            </div>
            <div class="label">产品出库</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>暂无</span></div>
              <div style="height:100%"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/财务结算.png" />
              <div style="height:0%"
                class="backBottom"></div>
            </div>
            <div class="label">财务结算</div>
          </div>
        </div>
        <div class="hrefCtn"
          id="href1">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">物料概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">物料详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">物料名称</span>
              <span>计划数量</span>
              <span>订购数量</span>
              <span style="flex:2">
                <span>加工类型</span>
                <span>加工数量</span>
              </span>
              <span>入库数量</span>
              <span>出库数量</span>
              <span>补充数量</span>
              <span>物料状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in materialList"
              :key="index">
              <span style="flex:2">{{item.material_name}}</span>
              <span>{{item.plan_number}}{{item.unit}}</span>
              <span>{{item.order_number}}{{item.unit}}</span>
              <span class="col"
                style="flex:2">
                <span v-for="(itemType,indexType) in item.processType"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span>{{itemType.number}}{{item.unit}}</span>
                </span>
              </span>
              <span>{{item.in_stock_number ? item.in_stock_number : 0}}{{item.unit}}</span>
              <span>{{item.out_stock_number ? item.out_stock_number : 0}}{{item.unit}}</span>
              <span>{{item.replenish_number?item.replenish_number:0}}{{item.unit}}</span>
              <span>还没统计</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href2">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">生产概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">生产详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
              <span>产品图片</span>
              <span>下单数量</span>
              <span>库存调取</span>
              <span>计划生产</span>
              <span>织造分配</span>
              <span>加工工序</span>
              <span>加工数量</span>
              <span>生产状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in designList"
              :key="index">
              <span style="flex:2">{{item.product_code}}({{item.type}})</span>
              <span>
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
              <span>{{item.order_num}}{{item.unit}}</span>
              <span>{{item.stock_pick}}{{item.unit}}</span>
              <span>{{item.plan_num}}{{item.unit}}</span>
              <span>{{item.weave_number}}{{item.unit}}</span>
              <span class="col"
                style="flex:2">
                <span v-for="(itemType,indexType) in item.processType"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span>{{itemType.number}}{{item.unit}}</span>
                </span>
              </span>
              <span>还没统计</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href3">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">收发概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">收发详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
              <span>产品图片</span>
              <span>工序</span>
              <span>出库捆数</span>
              <span>出库数量</span>
              <span>入库捆数</span>
              <span>入库数量</span>
              <span>收发状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in designList"
              :key="index">
              <span style="flex:2">{{item.product_code}}({{item.type}})</span>
              <span>
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
              <span class="col"
                style="flex:5">
                <span v-for="(val,ind) in item.store"
                  :key="ind">
                  <span>{{val.type}}</span>
                  <span>{{val.store_out_count ? val.store_out_count : 0}}</span>
                  <span>{{val.store_out_number ? val.store_out_number : 0}}{{item.unit}}</span>
                  <span>{{val.store_in_count ? val.store_in_count : 0}}</span>
                  <span>{{val.store_in_number ? val.store_in_number : 0}}{{item.unit}}</span>
                </span>
              </span>
              <span>收发状态</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href4">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">检验概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">检验详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
              <span>产品图片</span>
              <span>半成品检验</span>
              <span>半成品次品数</span>
              <span>半成品次品率</span>
              <span>成品检验数</span>
              <span>成品次品数</span>
              <span>成品次品率</span>
              <span>检验状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in designList"
              :key="index">
              <span style="flex:2">{{item.product_code}}({{item.type}})</span>
              <span>
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
              <span>{{item.semi_number ? item.semi_number : 0}}{{item.unit}}</span>
              <span>{{item.semi_defective ? item.semi_defective : 0}}{{item.unit}}</span>
              <span>{{(item.semi_defective ? item.semi_defective : 0)/(item.semi_number ? item.semi_number : 0) ? (item.semi_defective ? item.semi_defective : 0)/(item.semi_number ? item.semi_number : 0) : 0}}%</span>
              <span>{{item.finished_number ? item.finished_number : 0}}{{item.unit}}</span>
              <span>{{item.finished_defective ? item.finished_defective : 0}}{{item.unit}}</span>
              <span>{{((item.finished_defective ? item.finished_defective : 0)/(item.finished_number ? item.finished_number : 0)) ? ((item.finished_defective ? item.finished_defective : 0)/(item.finished_number ? item.finished_number : 0)) : 0}}%</span>
              <span>还没统计</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href5">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">出库概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">出库详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:1.7">发货批次</span>
              <span style="flex:7">
                <span style="flex:2">产品信息</span>
                <span>产品图片</span>
                <span>发货数量</span>
                <span>装箱数量</span>
                <span>装箱状态</span>
              </span>
              <span>装箱出库</span>
              <span>发货状态</span>
            </li>
            <li class="material_info"
              v-for="(item,key) in outStockList"
              :key="key">
              <span style="flex:1.7">第{{item.batch_id}}批({{item.delivery_time}})</span>
              <span class="col"
                style="flex:7">
                <span v-for="(valPro,indPro) in item.product_info"
                  :key="indPro">
                  <span style="flex:2">{{valPro.product_code}}{{valPro.product_type}}</span>
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
                  <span>{{valPro.number}}</span>
                  <span>{{valPro.product_number}}</span>
                  <span>{{valPro.product_number > valPro.number ? '多装' + (valPro.product_number - valPro.number) + '条' : '少装' + (valPro.number - valPro.product_number) + '条'}}</span>
                </span>
              </span>
              <span>{{item.pack_number}}</span>
              <span>还没统计</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href6">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">财务概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">财务详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="tablesCtn"
            style="line-height:40px;width:1220px;box-sizing:border-box">
            <li class="title">
              <span style="flex:1.7">物料名称</span>
              <span>合计费用</span>
              <span>订购公司</span>
              <span>订购数量</span>
              <span>订购费用</span>
              <span style="flex:4">
                <span>加工公司</span>
                <span>加工类型</span>
                <span>加工数量</span>
                <span>加工费用</span>
              </span>
            </li>
            <li class="content"
              v-for="(item,key) in materialList"
              :key="key">
              <span class="tableRow"
                style="flex:1.7">{{item.material_name}}</span>
              <span class="tableRow">{{item|filterTotal}}元</span>
              <span class="tableRow">{{item.order_client}}</span>
              <span class="tableRow">{{item.order_number}}{{item.unit}}</span>
              <span class="tableRow">{{item.total_price_order}}元</span>
              <span class="tableRow col"
                style="flex:4">
                <span class="tableColumn"
                  v-for="(valType,indType) in item.processType"
                  :key="indType">
                  <span class="tableRow">{{valType.process_client}}</span>
                  <span class="tableRow">{{valType.type}}</span>
                  <span class="tableRow">{{valType.number}}{{item.unit}}</span>
                  <span class="tableRow">{{valType.total_price_process}}元</span>
                </span>
              </span>
            </li>
          </div>
          <div class="tablesCtn"
            style="line-height:40px;width:1220px;box-sizing:border-box;margin-top:30px;">
            <li class="title">
              <span style="flex:2">产品名称</span>
              <span>产品图片</span>
              <span>合计费用</span>
              <span>织造单位</span>
              <span>织造数量</span>
              <span>织造费用</span>
              <span>加工单位</span>
              <span>加工类型</span>
              <span>加工数量</span>
              <span>加工费用</span>
            </li>
            <li class="content"
              v-for="(item,key) in designList"
              :key="key">
              <span class="tableRow"
                style="flex:2">{{item.product_code}}{{item.type}}</span>
              <span class="tableRow">
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
              <span class="tableRow">{{item|filterPrice}}</span>
              <span class="tableRow">{{item.weave_client}}</span>
              <span class="tableRow">{{item.weave_number}}{{item.unit}}</span>
              <span class="tableRow">{{item.total_price_weave}}元</span>
              <span class="tableRow col"
                style="flex:4">
                <span class="tableColumn"
                  v-for="(valType,indType) in item.processType"
                  :key="indType">
                  <span class="tableRow">{{valType.process_client}}</span>
                  <span class="tableRow">{{valType.type}}</span>
                  <span class="tableRow">{{valType.number}}{{item.unit}}</span>
                  <span class="tableRow">{{valType.total_price_semiProcess}}元</span>
                </span>
              </span>
            </li>
          </div>
          <div class="tablesCtn"
            style="line-height:40px;width:1220px;box-sizing:border-box;margin-top:30px;">
            <li class="title">
              <span style="flex:1.7">发货日期</span>
              <span style="flex:7">
                <span style="flex:2">产品品类</span>
                <span>产品图片</span>
                <span style="flex:4">
                  <span>尺码颜色</span>
                  <span>发货数量</span>
                  <span>单价</span>
                  <span>总价</span>
                </span>
              </span>
            </li>
            <li class="content"
              v-for="(item,key) in productPriceList"
              :key="key">
              <span class="tableRow"
                style="flex:1.7">第{{item.batch_id}}批{{item.delivery_time}}</span>
              <span class="tableRow col"
                style="flex:7">
                <span class="tableColumn"
                  v-for="(valPro,indPro) in item.batch_info"
                  :key="indPro">
                  <span class="tableRow"
                    style="flex:2">{{valPro.productCode}}({{valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name}})</span>
                  <span class="tableRow">
                    <div class="imgCtn">
                      <img class="img"
                        :src="valPro.productInfo.img.length>0?valPro.productInfo.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                        :onerror="defaultImg" />
                      <div class="toolTips"
                        v-if="valPro.productInfo.img.length>0"><span @click="showImg(valPro.productInfo.img)">点击查看大图</span></div>
                      <div class="toolTips"
                        v-if="valPro.productInfo.img.length===0"><span>没有预览图</span></div>
                    </div>
                  </span>
                  <span class="tableRow col"
                    style="flex:4">
                    <span class="tableColumn"
                      v-for="(valSize,indSize) in valPro.size"
                      :key="indSize">
                      <span class="tableRow">{{valSize.name[0] + '/' + valSize.name[1]}}</span>
                      <span class="tableRow">{{valSize.numbers}}条</span>
                      <span class="tableRow">{{valSize.unitPrice}}元/条</span>
                      <span class="tableRow">{{valSize.numbers * valSize.unitPrice}}元</span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </div>
        </div>
      </div>
    </div>
    <!-- 目录 -->
    <div class="catalogue">
      <div class="title">详情目录</div>
      <li class="ahref"><a href="#href1">物料概述</a></li>
      <li class="ahref"><a href="#href2">生产概述</a></li>
      <li class="ahref"><a href="#href3">收发概述</a></li>
      <li class="ahref"><a href="#href4">检验概述</a></li>
      <li class="ahref"><a href="#href5">出库概述</a></li>
      <li class="ahref"><a href="#href6">财务概述</a></li>
    </div>
    <div class="suspend">
      <span class="blue"
        style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
        <a href="#top"
          style="color: rgb(255, 255, 255); text-decoration: none;">回到顶部</a>
      </span>
    </div>
  </div>
</template>

<script>
import { orderDetailNew, rawMaterialOrderInit, productionDetail, packagNumberDetail } from '@/assets/js/api.js'
import { moneyArr } from '@/assets/js/dictionary.js'
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
      imgList: [],
      scroll: 0,
      timer: '',
      order_info: {
        order_code: '',
        client_name: '',
        contacts: '',
        exchange_rate: '',
        tax_rate: '',
        total_price: '',
        account_unit: '元',
        order_time: '',
        remark: '',
        status: 0
      },
      timeAxis: [],
      order_log: {},
      process: {
        assist_material_pre: 0,
        main_material_pre: 0,
        pack_pre: 0,
        product_ins_pre: 0,
        product_pop_push: 9,
        semi_product_ins_pre: 0,
        weave_pre: 0
      },
      materialList: [], // 物料概述
      designList: [], //  生产概述
      outStockList: [], // 出库概述
      productPriceList: [], // 产品价格信息
      storeList: [] // 收发概述
    }
  },
  methods: {
    // 日期格式化
    getTime (date) {
      let fmt = 'yyyy-MM-dd'
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    // 获取时间差
    getTimeDif (big, small) {
      return parseInt((new Date(big).getTime() - (new Date(small)).getTime()) / (1000 * 60 * 60 * 24))
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    translated (str) {
      const maxScroll = this.$refs.cardTransform.scrollWidth - this.$refs.cardTransform.clientWidth
      if (str === 'right') {
        this.timer = setInterval(() => {
          this.scroll -= 10
          if (Math.abs(this.scroll) >= maxScroll) {
            clearInterval(this.timer)
          } else {
            this.$refs.cardTransform.style.transform = 'translateX(' + this.scroll + 'px)'
          }
        }, 20)
      } else {
        this.timer = setInterval(() => {
          this.scroll += 10
          if (this.scroll >= 0) {
            clearInterval(this.timer)
          } else {
            this.$refs.cardTransform.style.transform = 'translateX(' + this.scroll + 'px)'
          }
        }, 20)
      }
    },
    clearTimer () {
      clearInterval(this.timer)
    }
  },
  computed: {
    // 订单金额
    moneyCmp () {
      return moneyArr.find((itemFind) => itemFind.name === this.order_info.account_unit).sign + this.order_info.total_price.toLocaleString()
    },
    // 订单状态
    orderState () {
      if (this.order_info.status === 1) {
        return '已完成'
      } else if (this.order_info.status === 2) {
        return '订单异常'
      } else {
        for (let key in this.order_log) {
          if (this.order_log[key].length > 0) {
            return '进行中'
          }
        }
        return '已创建'
      }
    },
    // 订单状态的样式
    orderStateColor () {
      if (this.order_info.status === 1) {
        return '#67c23a'
      } else if (this.order_info.status === 2) {
        return '#F56C6C'
      } else {
        for (let key in this.order_log) {
          if (this.order_log[key].length > 0) {
            return '#1A95FF'
          }
        }
        return '#E6A23C'
      }
    },
    // (今天 + 1) - 下单日期
    useTime () {
      if (this.timeAxis.length > 0) {
        return this.getTimeDif((new Date().getTime()) + (1000 * 60 * 60 * 24), new Date(this.timeAxis[0].time))
      } else {
        return 0
      }
    },
    // 交货日期 - 今天
    leaveTime () {
      if (this.timeAxis.length > 0) {
        return this.getTimeDif(new Date(this.timeAxis[this.timeAxis.length - 1].time), new Date())
      } else {
        return 0
      }
    }
  },
  filters: {
    // 物料合计费用
    filterTotal (item) {
      let price = 0
      item.processType.forEach(val => {
        price += Number(val.total_price_process)
      })
      price += Number(item.total_price_order)
      return price
    },
    // 生产合计费用
    filterPrice (item) {
      let price = 0
      return price
    }
  },
  mounted () {
    Promise.all([orderDetailNew({
      id: 20
    }), rawMaterialOrderInit({
      order_id: 20
    }), productionDetail({
      order_id: 20
    }), packagNumberDetail({
      order_id: 20
    })]).then((res) => {
      // console.log(res)
      const data = res[0].data.data
      this.order_info = data.order_info
      this.order_log = data.order_log
      this.process = data.order_schedule
      for (let key in this.process) {
        this.process[key] = this.process[key] > 100 ? 100 : this.process[key].toFixed(1)
      }
      // 整理时间线 并排序
      this.order_info.order_batch.forEach((item, index) => {
        if (index === this.order_info.order_batch.length - 1) {
          this.timeAxis.push({
            name: '交货日期',
            time: item.delivery_time
          })
        } else {
          this.timeAxis.push({
            name: '第' + (index + 1) + '批',
            time: item.delivery_time
          })
        }
      })
      this.timeAxis.push({
        name: '今天',
        time: this.getTime(new Date())
      })
      this.timeAxis.push({
        name: '下单日期',
        time: this.order_info.order_time
      })
      // 按时间排序
      this.timeAxis.sort((a, b) => {
        return (new Date(a.time) - new Date(b.time))
      })
      const allTime = this.getTimeDif(new Date(this.timeAxis[this.timeAxis.length - 1].time), new Date(this.timeAxis[0].time))
      this.timeAxis.forEach((item) => {
        item.rate = (this.getTimeDif(new Date(item.time), new Date(this.timeAxis[0].time)) / allTime).toFixed(2) * 100 + '%'
      })
      // 物料概述
      let materialInfo = res[1].data.data
      let processInfo = this.order_log.material_production
      let outStockInfo = [].concat(this.order_log.material_push_z, this.order_log.material_push_f)
      let inStockInfo = [].concat(this.order_log.material_pop_z, this.order_log.material_pop_f)
      let materialPageInfo = this.order_log.material_order
      // 物料计划值
      materialInfo.material_info.forEach(item => {
        for (let prop in item) {
          let flag = this.materialList.find(key => key.material_name === prop)
          if (!flag) {
            this.materialList.push({
              material_name: prop,
              unit: item[prop].unit === '克' ? 'kg' : (item[prop].unit === 'g' ? 'kg' : item[prop].unit),
              plan_number: (item[prop].unit === '克' || item[prop].unit === 'g') ? (item[prop].total_number / 1000) : item[prop].total_number
            })
          } else {
            flag.plan_number = Number(flag.plan_number) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? (item[prop].total_number / 1000) : item[prop].total_number)
          }
        }
      })
      // 物料加工值，订购值
      this.materialList.map(res => {
        if (materialInfo.total_weight_order[res.material_name]) {
          res.order_number = materialInfo.total_weight_order[res.material_name]
        }
      })
      // 物料入库值
      inStockInfo.forEach(item => {
        let flag = this.materialList.find(keys => keys.material_name === item.material_name)
        if (flag) {
          flag.in_stock_number = Number(flag.in_stock_number ? flag.in_stock_number : 0) + Number(item.weight)
        }
      })
      // 物料出库值
      outStockInfo.forEach(item => {
        let flag = this.materialList.find(keys => keys.material_name === item.material_name)
        if (flag) {
          flag.out_stock_number = Number(flag.out_stock_number ? flag.out_stock_number : 0) + Number(item.total_weight)
        }
      })
      // 物料订购值
      materialPageInfo.forEach(item => {
        let flag = this.materialList.find(keys => keys.material_name === item.material_name)
        if (flag && item.replenish_id !== null) {
          flag.replenish_number = Number(flag.replenish_number ? flag.replenish_number : 0) + Number(item.weight)
        }
        if (flag) {
          if (!flag.order_client) {
            flag.order_client = []
          }
          if (flag.order_client.indexOf(item.order_client) === -1) {
            flag.order_client.push(item.order_client)
          }
          flag.total_price_order = Number(flag.total_price_order ? flag.total_price_order : 0) + Number(item.price * item.weight)
        }
      })
      // 物料加工类型
      processInfo.forEach(item => {
        let flag = this.materialList.find(keys => keys.material_name === item.material_name)
        if (flag) {
          if (!flag.processType) {
            flag.processType = []
          }
          item.material_info = JSON.parse(item.material_info)
          let num = 0
          item.material_info.map(key => {
            num += Number(key.value)
          })
          let flag1 = flag.processType.find(key => key.type === item.process_type)
          if (!flag1) {
            flag.processType.push({
              type: item.process_type,
              number: num,
              total_price_process: item.total_price,
              process_client: [item.client_name]
            })
          } else {
            if (flag1.process_client.indexOf(item.client_name) === -1) {
              flag1.process_client.push(item.client_name)
            }
            flag1.number = Number(flag1.number) + Number(num)
            flag1.total_price_process = Number(flag1.total_price_process) + Number(item.total_price)
          }
        }
      })
      // console.log(this.materialList)
      // 生产概述
      let designInfo = res[2].data.data
      let weaveInfo = this.order_log.product_weave
      let halfProductInfo = this.order_log.semi_finished_production
      designInfo.production_detail.product_info.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_code,
            type: item.category_name + '/' + item.type_name + '/' + item.style_name,
            img: [],
            order_num: item.order_num,
            stock_pick: item.stock_pick,
            plan_num: item.production_num,
            unit: item.unit_name
          })
        } else {
          flag.order_num = Number(flag.order_num ? flag.order_num : 0) + Number(item.order_num)
          flag.stock_pick = Number(flag.stock_pick ? flag.stock_pick : 0) + Number(item.stock_pick)
          flag.plan_num = Number(flag.plan_num ? flag.plan_num : 0) + Number(item.production_num)
        }
      })
      weaveInfo.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (flag) {
          if (!flag.weave_client) {
            flag.weave_client = []
          }
          if (flag.weave_client.indexOf(item.client_name) === -1) {
            flag.weave_client.push(item.client_name)
          }
          flag.weave_number = Number(flag.weave_number ? flag.weave_number : 0) + Number(item.number)
          flag.total_price_weave = Number(flag.total_price_weave ? flag.total_price_weave : 0) + Number(item.price * item.number)
        }
      })
      console.log(halfProductInfo)
      halfProductInfo.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (flag) {
          if (!flag.processType) {
            flag.processType = []
          }
          let flag1 = flag.processType.find(key => key.type === item.type)
          if (!flag1) {
            flag.processType.push({
              type: item.type,
              number: item.number,
              process_client: [item.client_name],
              total_price_semiProcess: item.price * item.number
            })
          } else {
            if (flag1.process_client.indexOf(item.client_name) === -1) {
              flag1.process_client.push(item.client_name)
            }
            flag1.total_price_semiProcess = Number(flag1.total_price_semiProcess ? flag1.total_price_semiProcess : 0) + Number(item.price * item.number)
            flag1.number = Number(flag1.number ? flag1.number : 0) + Number(item.number)
          }
          // flag.total_price_semiProcess = Number(flag.total_price_semiProcess ? flag.total_price_semiProcess : 0) + Number(item.price * item.number)
        }
      })
      // 收发概述
      let storeIn = this.order_log.product_push
      let storeOut = this.order_log.product_pop
      storeIn.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
            store: [{
              type: item.type,
              store_in_count: item.count,
              store_in_number: item.number
            }]
          })
        } else {
          if (!flag.store) {
            flag.store = []
          }
          let flag1 = flag.store.find(key => key.type === item.type)
          if (!flag1) {
            flag.store.push({
              type: item.type,
              store_in_count: item.count,
              store_in_number: item.number
            })
          } else {
            flag1.store_in_number = Number(flag1.store_in_number ? flag.store_in_number : 0) + Number(item.number)
            flag1.store_in_count = Number(flag1.store_in_count ? flag.store_in_count : 0) + Number(item.count)
          }
          // if (flag.store_in.indexOf(item.type) === -1) {
          //   flag.store_in.push(item.type)
          // }
        }
      })
      storeOut.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
            store: [{
              type: item.type,
              store_out_count: item.count,
              store_out_number: item.number
            }]
          })
        } else {
          if (!flag.store) {
            flag.store = []
          }
          let flag1 = flag.store.find(key => key.type === item.type)
          if (!flag1) {
            flag.store.push({
              type: item.type,
              store_out_count: item.count,
              store_out_number: item.number
            })
          } else {
            flag1.store_out_number = Number(flag1.store_out_number ? flag.store_out_number : 0) + Number(item.number)
            flag1.store_out_count = Number(flag1.store_out_count ? flag.store_out_count : 0) + Number(item.count)
          }
          // if (flag.store_out.indexOf(item.type) === -1) {
          //   flag.store_out.push(item.type)
          // }
          // flag.store_out_number = Number(flag.store_out_number ? flag.store_out_number : 0) + Number(item.number)
          // flag.store_out_count = Number(flag.store_out_count ? flag.store_out_count : 0) + Number(item.count)
        }
      })
      // 检验概述
      let semiInfo = this.order_log.semi_product_inspection
      let finishedInfo = this.order_log.product_inspection
      semiInfo.forEach(item => {
        item.rejects_info = JSON.parse(item.rejects_info)
        let num = 0
        item.rejects_info.map(keys => {
          num += Number(keys.number ? keys.number : 0)
        })
        let flag = this.designList.find(key => key.product_code === item.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_code,
            img: [],
            semi_number: item.number,
            semi_defective: num
          })
        } else {
          flag.semi_number = Number(item.number) + Number(flag.semi_number ? flag.semi_number : 0)
          flag.semi_defective = Number(flag.semi_defective ? flag.semi_defective : 0) + Number(num)
        }
      })
      finishedInfo.forEach(item => {
        item.rejects_info = JSON.parse(item.rejects_info)
        let num = 0
        item.rejects_info.map(keys => {
          num += Number(keys.number ? keys.number : 0)
        })
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
            img: [],
            finished_number: item.number,
            finished_defective: num
          })
        } else {
          flag.finished_number = Number(item.number) + Number(flag.finished_number ? flag.finished_number : 0)
          flag.finished_defective = Number(flag.finished_defective ? flag.finished_defective : 0) + Number(num)
        }
      })
      // console.log(this.designList)
      // 出库概述
      let orderInfo = this.order_info
      orderInfo.order_batch.forEach(item => {
        item.batch_info.forEach(val => {
          val.size.forEach(valSize => {
            let flag = this.outStockList.find(key => key.batch_id === item.batch_id)
            if (!flag) {
              this.outStockList.push({
                batch_id: item.batch_id,
                delivery_time: item.delivery_time,
                product_info: [{
                  product_code: val.productCode,
                  product_type: val.productInfo.category_info.product_category + '/' + val.productInfo.type_name + '/' + val.productInfo.style_name,
                  number: valSize.numbers,
                  img: [...val.productInfo.img]
                }]
              })
            } else {
              let flag1 = flag.product_info.find(key => key.product_code === val.productCode)
              if (!flag1) {
                flag.product_info.push({
                  product_code: val.productCode,
                  product_type: val.productInfo.category_info.product_category + '/' + val.productInfo.type_name + '/' + val.productInfo.style_name,
                  number: valSize.numbers,
                  img: [...val.productInfo.img]
                })
              } else {
                flag1.number = Number(flag1.number) + Number(valSize.numbers)
                flag1.img.push(...val.productInfo.img)
              }
            }
            let fleg = this.designList.find(key => key.product_code === val.productCode)
            if (fleg) {
              fleg.img = val.productInfo.img
            }
          })
        })
      })
      this.productPriceList = orderInfo.order_batch
      let stockOutInfo = this.order_log.stock_out_info // 订单出库日志
      stockOutInfo.forEach(item => {
        let flag = this.outStockList.find(key => key.batch_id === item.batch_id)
        if (flag) {
          flag.pack_number = Number(flag.pack_number ? flag.pack_number : 0) + Number(item.number)
        }
      })
      // console.log(this.outStockList)
      // 出库概述添加装箱实际数量
      let outStockNumberInfo = res[3].data.data
      outStockNumberInfo.forEach(item => {
        let flag = this.outStockList.find(key => key.batch_id === item.batch_id)
        if (flag) {
          item.product_info = JSON.parse(item.product_info)
          item.product_info.forEach(valPro => {
            let flag1 = flag.product_info.find(key => key.product_code === valPro.product_code)
            if (flag1) {
              let num = 0
              valPro.size_info.forEach(key => { num += Number(key.pack_number) })
              flag1.product_number = num
            }
          })
        }
      })
      console.log(this.materialList)
      console.log(this.designList)
      console.log(this.productPriceList)
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/orderDetailNew.less";
</style>
<style lang="less">
#orderDetail .el-button {
  font-weight: 300 !important;
}
#orderDetail .el-button--medium {
  padding: 5px 14px !important;
  line-height: normal !important;
  background: #1a95ff;
  &:last-child {
    padding: 5px !important;
  }
}
.imgCtn {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    .toolTips {
      display: flex;
      align-items: center;
    }
  }
  .img {
    width: 48px;
    padding: 6px;
    height: 48px;
  }
  .toolTips {
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    line-height: 1;
    cursor: pointer;
    span {
      color: #fff;
      &:hover {
        color: #1a95ff;
      }
    }
  }
}
</style>
