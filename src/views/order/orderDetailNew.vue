<template>
  <div id="orderDetail"
    v-loading="loading">
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
        <div class="appendInfos">
          <div class="keyBtn">
            <!-- <span class="btns">确认完成</span> -->
            <el-dropdown size="medium"
              @click="order_info.status===0?orderStatus(1):''"
              @command="orderStatus"
              split-button
              type="primary">
              {{orderStateOpr}}
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>订单异常</el-dropdown-item> -->
                <el-dropdown-item v-show="order_info.status!==2"
                  command="8">取消订单</el-dropdown-item>
                <el-dropdown-item v-show="order_info.status===2"
                  command="9">物料产品入库</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="infoCtn">
            <div class="labelInfo">
              <span class="label">订单状态</span>
              <span class="info"
                :style="{'color':orderStateColor}">
                {{orderState}}
                <el-tooltip class="item"
                  v-show="!hasPlan"
                  effect="dark"
                  content="该订单还未填写生产计划单,点击按钮前往填写"
                  placement="top">
                  <i class="el-icon-question"
                    @click="$router.push('/index/productDesignCreate/'+$route.params.id)"></i>
                </el-tooltip>
              </span>
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
            <span class="content">100{{order_info.account_unit}} = {{order_info.exchange_rate}}元</span>
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
        <div class="lineCtn"
          v-show="order_info.fileArr.length>0">
          <div class="inputCtn"
            style="width:100%">
            <span class="label">文件信息:</span>
            <span class="fileCtn"
              v-for="item in order_info.fileArr"
              :key="item">
              <a target="view_window"
                :href="item"
                :download="item">
                <i class="el-icon-document"
                  style="margin-right:5px"></i>{{item.replace('http://zhihui.tlkrzf.com/', '')}}
              </a>
            </span>
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
              style="z-index:1"
              :style="{'width':process.product_ins_pre+'%',background:process.product_ins_pre<parseInt(useTimeRate)?'#F56C6C':'#67c23a'}"></div>
            <div class="processInfo"
              :style="{background:process.product_ins_pre<parseInt(useTimeRate)?'#F56C6C':'#67c23a'}">成品检验完成度：{{process.product_ins_pre+'%'}}</div>
            <div class="timeCtn"
              v-for="(item,index) in timeAxis"
              :key="index"
              :style="{left:item.rate}">
              <div class="time">{{item.time}}</div>
              <div class="line"></div>
              <div class="info">{{item.name}}</div>
            </div>
            <div class="processInner todoy"
              :style="{'width':useTimeRate}">
            </div>
          </div>
        </div>
        <div class="cardCtn"
          v-show="hasPlan"
          :class="{'needScroll':productRate.length>2}">
          <div class="transformBtn leftBtn"
            @mousedown="translated('left')"
            @mouseup="clearTimer"><i class="el-icon-arrow-left"></i></div>
          <div class="cardTransform"
            ref="cardTransform">
            <div class="card"
              v-for="(item,index) in productRate"
              :key="index">
              <div class="flexCtn">
                <div class="title">
                  <span class="blue">{{item.product_code}}</span>
                  <span>{{item.product_type}}</span>
                  <span>下单数:{{item.order_num}}{{item.unit}}</span>
                  <span>计划生产数:{{item.production_num}}{{item.unit}}</span>
                </div>
                <div class="content">
                  <div class="model1">
                    <div class="rectCtn">
                      <div class="tips">
                        <div class="tip">
                          <div class="circle"></div>
                          <span>分配 ({{parseInt((item.weaveInfo.weaveNum/item.production_num).toFixed(2) * 100)>100?'100%':parseInt((item.weaveInfo.weaveNum/item.production_num).toFixed(2) * 100) + '%'}})</span>
                        </div>
                        <div class="tip">
                          <div class="circle"
                            style="background:#36CBCB"></div>
                          <span>织造 ({{parseInt((item.weaveInfo.weavePushNum/item.production_num).toFixed(2) * 100)>100?'100%':parseInt((item.weaveInfo.weaveNum/item.production_num).toFixed(2) * 100) + '%'}})</span>
                        </div>
                      </div>
                      <div class="rect">
                        <span class="rectLabel">织造进度:</span>
                        <div class="rectOut">
                          <div class="rectIn1"
                            :style="{'width':rateChange(item.weaveInfo.weaveNum,item.production_num)}"
                            :rate="(item.weaveInfo.weaveNum/item.production_num).toFixed(2) * 100 + '%'"></div>
                          <div class="rectIn2"
                            style="background:#36CBCB"
                            :style="{'width':rateChange(item.weaveInfo.weavePushNum,item.production_num)}"
                            :rate="(item.weaveInfo.weavePushNum/item.production_num).toFixed(2) * 100 + '%'"></div>
                        </div>
                        <span class="rectContent"></span>
                      </div>
                    </div>
                    <div class="rectCtn">
                      <div class="tips">
                        <div class="tip">
                          <div class="circle"></div>
                          <span>分配 ({{parseInt(item.semiInfo.semiNum>item.production_num?'100%':(item.semiInfo.semiNum/item.production_num).toFixed(2) * 100) + '%'}})</span>
                        </div>
                        <div class="tip">
                          <div class="circle"
                            style="background:#4DCB73"></div>
                          <span>加工 ({{parseInt((item.semiInfo.semiPushNum/item.semiInfo.semiNum).toFixed(2) * 100)?parseInt((item.semiInfo.semiPushNum/item.semiInfo.semiNum).toFixed(2) * 100):0 + '%'}})</span>
                        </div>
                      </div>
                      <div class="rect">
                        <span class="rectLabel">加工进度:</span>
                        <div class="rectOut">
                          <div class="rectIn1"
                            :style="{'width':rateChange(item.semiInfo.semiNum,item.production_num)}"
                            :rate="item.semiInfo.semiNum>item.production_num?'100%':(item.semiInfo.semiNum/item.production_num).toFixed(2) * 100 + '%'"></div>
                          <div class="rectIn2"
                            style="background:#4DCB73"
                            :style="{'width':rateChange(item.semiInfo.semiPushNum,item.semiInfo.semiNum)}"
                            :rate="(item.semiInfo.semiPushNum/item.semiInfo.semiNum).toFixed(2) * 100 + '%'"></div>
                        </div>
                        <span class="rectContent"></span>
                      </div>
                    </div>
                    <div class="rectCtn">
                      <div class="tips">
                        <div class="tip">
                          <div class="circle"></div>
                          <span>半成品 ({{parseInt((item.inspInfo.inspSemiNum/item.production_num).toFixed(2) * 100)>100?'100%':parseInt((item.inspInfo.inspSemiNum/item.production_num).toFixed(2) * 100) + '%'}})</span>
                        </div>
                        <div class="tip">
                          <div class="circle"
                            style="background:#FAD336"></div>
                          <span>成品 ({{parseInt((item.inspInfo.inspProNum/item.production_num).toFixed(2) * 100)>100?'100%':parseInt((item.inspInfo.inspProNum/item.production_num).toFixed(2) * 100) + '%'}})</span>
                        </div>
                      </div>
                      <div class="rect">
                        <span class="rectLabel">检验进度:</span>
                        <div class="rectOut">
                          <div class="rectIn1"
                            :style="{'width':rateChange(item.inspInfo.inspSemiNum,item.production_num)}"
                            :rate="(item.inspInfo.inspSemiNum/item.production_num).toFixed(2) * 100 + '%'"></div>
                          <div class="rectIn2"
                            style="background:#FAD336"
                            :style="{'width':rateChange(item.inspInfo.inspProNum,item.order_num)}"
                            :rate="(item.inspInfo.inspProNum/item.order_num).toFixed(2) * 100 + '%'"></div>
                        </div>
                        <span class="rectContent"></span>
                      </div>
                    </div>
                    <div class="rectCtn">
                      <div class="tips">
                        <div class="tip">
                          <div class="circle"></div>
                          <span>装箱 ({{parseInt((item.packInfo.packNum/item.order_num).toFixed(2) * 100) + '%'}})</span>
                        </div>
                        <!-- <div class="tip">
                          <div class="circle"
                            style="background:#F2637B"></div>
                          <span>出库 ({{parseInt((item.packInfo.proOutNum/item.order_num).toFixed(2) * 100) + '%'}})</span>
                        </div> -->
                      </div>
                      <div class="rect">
                        <span class="rectLabel">装箱进度:</span>
                        <div class="rectOut">
                          <div class="rectIn1"
                            :style="{'width':rateChange(item.packInfo.packNum,item.order_num)}"
                            :rate="(item.packInfo.packNum/item.order_num).toFixed(2) * 100 + '%'"></div>
                          <!-- <div class="rectIn2"
                            :style="{'width':rateChange(item.packInfo.proOutNum,item.order_num)}"
                            :rate="(item.packInfo.proOutNum/item.order_num).toFixed(2) * 100 + '%'"
                            style="background:#F2637B"></div> -->
                        </div>
                        <span class="rectContent"></span>
                      </div>
                    </div>
                  </div>
                  <i class="line"></i>
                  <div class="model2"></div>
                </div>
              </div>
            </div>
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
              <div class="shadeInfo"><span>原料:{{ order_info.status_material_order===1?'100%':process.main_material_pre + '%'}}<br />辅料:{{order_info.status_material_order===1?'100%':process.assist_material_pre+ '%'}}</span></div>
              <div :style="{height:order_info.status_material_order===0?(100-process.main_material_pre) + '%':'0%'}"
                class="backTop halfL"></div>
              <div :style="{height:order_info.status_material_order===0?(100-process.assist_material_pre) + '%':'0%'}"
                class="backTop halfR"></div>
              <div class="lineMid"></div>
              <div :style="{height:order_info.status_material_order===0?process.main_material_pre + '%':'100%'}"
                :class="{'complete':process.main_material_pre>=100 || order_info.status_material_order===1}"
                class="backBottom halfL"></div>
              <div :style="{height:order_info.status_material_order===0?process.assist_material_pre + '%':'100%'}"
                :class="{'complete':process.assist_material_pre>=100 || order_info.status_material_order===1}"
                class="backBottom halfR"></div>
              <img class="icon"
                src="@/assets/image/icon/订单物料.png" />
            </div>
            <div class="label">物料订购</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{order_info.status_weave===0?process.weave_pre + '%':'100%'}}</span></div>
              <div :style="{height:order_info.status_weave===0?(100-process.weave_pre) + '%':'0%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单生产.png" />
              <div :style="{height:order_info.status_weave===0?process.weave_pre + '%':'100%'}"
                :class="{'complete':process.weave_pre>=100||order_info.status_weave===1}"
                class="backBottom"></div>
            </div>
            <div class="label">生产织造</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{order_info.status_pop_push===0?process.product_pop_push + '%':'100%'}}</span></div>
              <div :style="{height:order_info.status_pop_push===0?(100-process.product_pop_push) + '%':'0%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单收发.png" />
              <div :style="{height:order_info.status_pop_push===0?process.product_pop_push + '%':'100%'}"
                :class="{'complete':process.product_pop_push>=100 || order_info.status_pop_push===1}"
                class="backBottom"></div>
            </div>
            <div class="label">产品收发</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>成品:{{order_info.status_inspection===0?process.product_ins_pre + '%':'100%'}}<br />半成品:{{order_info.status_inspection===0?process.semi_product_ins_pre+ '%':'100%'}}</span></div>
              <div :style="{height:order_info.status_inspection===0?(100-process.semi_product_ins_pre) + '%':'0%'}"
                class="backTop halfL"></div>
              <div :style="{height:order_info.status_inspection===0?(100-process.product_ins_pre) + '%':'0%'}"
                class="backTop halfR"></div>
              <div class="lineMid"></div>
              <div :style="{height:order_info.status_inspection===0?process.semi_product_ins_pre + '%':'100%'}"
                :class="{'complete':process.semi_product_ins_pre>=100||order_info.status_inspection===1}"
                class="backBottom halfL"></div>
              <div :style="{height:order_info.status_inspection===0?process.product_ins_pre + '%':'100%'}"
                :class="{'complete':process.product_ins_pre>=100||order_info.status_inspection===1}"
                class="backBottom halfR"></div>
              <img class="icon"
                src="@/assets/image/icon/订单检验.png" />
            </div>
            <div class="label">产品检验</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{order_info.status_stock_out===0?process.pack_pre + '%':'100%'}}</span></div>
              <div :style="{height:order_info.status_stock_out===0?(100-process.pack_pre) + '%':'0%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单出库.png" />
              <div :style="{height:order_info.status_stock_out===0?process.pack_pre + '%':'100%'}"
                :class="{'complete':process.pack_pre>=100||order_info.status_stock_out===1}"
                class="backBottom"></div>
            </div>
            <div class="label">产品出库</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>暂无</span></div>
              <div :style="{height:order_info.status===0?'100%':'0%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/财务结算.png" />
              <div :style="{height:order_info.status===1||order_info.status===2?'100%':'0%'}"
                class="backBottom complete"></div>
            </div>
            <div class="label">财务结算</div>
          </div>
        </div>
        <div v-show="hasPlan"
          class="hrefCtn"
          id="href1">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">物料概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <el-dropdown @command="openWin"
                trigger="click">
                <span class="el-dropdown-link opration"
                  style="color:#1A95FF">
                  物料详情<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="原料详情">原料详情</el-dropdown-item>
                  <el-dropdown-item command="辅料详情">辅料详情</el-dropdown-item>
                  <el-dropdown-item command="原料出入库">原料出入库</el-dropdown-item>
                  <el-dropdown-item command="辅料出入库">辅料出入库</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="opration"
                v-if="order_info.status_material_order===0&&order_info.status!==2"
                @click="orderStatus(3)">确认完成</span>
              <span class="opration"
                style="color:#67c23a"
                v-else-if="order_info.status_material_order===1||order_info.status===1">已完成</span>
              <span class="opration"
                style="color:#ddd;cursor:not-allowed"
                v-else-if="order_info.status===2">已取消</span>
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
              <span>{{parseInt(item.plan_number)}}{{item.unit}}</span>
              <span>{{item.order_number?parseInt(item.order_number):0}}{{item.unit}}</span>
              <span class="col"
                v-if="item.processType"
                style="flex:2">
                <span v-for="(itemType,indexType) in item.processType"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span>{{itemType.number}}{{item.unit}}</span>
                </span>
              </span>
              <span class="col"
                v-else
                style="flex:2;text-align:center">
                暂无加工信息
              </span>
              <span>{{item.out_stock_number ? item.out_stock_number : 0}}{{item.unit}}</span>
              <span>{{item.in_stock_number ? item.in_stock_number : 0}}{{item.unit}}</span>
              <span>{{item.replenish_number?item.replenish_number:0}}{{item.unit}}</span>
              <span :style="{'color':parseInt(item.order_number)/parseInt(item.plan_number)>=1||order_info.status_material_order===1?'#67C23A':'#E6A23C'}">{{parseInt(item.order_number)/parseInt(item.plan_number)>=1||order_info.status_material_order===1?'完成':'未完成'}}</span>
            </li>
          </div>
        </div>
        <div v-show="hasPlan"
          class="hrefCtn"
          id="href2">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">生产概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <el-dropdown trigger="click"
                @command="openWin">
                <span class="el-dropdown-link opration"
                  style="color:#1A95FF">
                  生产详情<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="织造详情">织造详情</el-dropdown-item>
                  <el-dropdown-item command="半成品加工详情">半成品加工详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="opration"
                v-if="order_info.status_weave===0 && order_info.status!==2"
                @click="orderStatus(2)">确认完成</span>
              <span class="opration"
                style="color:#67c23a"
                v-else-if="order_info.status_weave===1||order_info.status===1">已完成</span>
              <span class="opration"
                style="color:#ddd;cursor:not-allowed"
                v-else-if="order_info.status===2">已取消</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
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
              <span>{{item.order_num}}{{item.unit}}</span>
              <span>{{item.stock_pick}}{{item.unit}}</span>
              <span>{{item.plan_num}}{{item.unit}}</span>
              <span>{{item.weave_number?item.weave_number:0}}{{item.unit}}</span>
              <span class="col"
                style="flex:2"
                v-if="item.processType">
                <span v-for="(itemType,indexType) in item.processType"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span>{{itemType.number}}{{item.unit}}</span>
                </span>
              </span>
              <span class="col"
                v-else
                style="flex:2;text-align:center">
                暂无加工信息
              </span>
              <span :style="{'color':order_info.status_weave===1?'#67C23A':'#E6A23C'}">{{order_info.status_weave===1?'完成':'未完成'}}</span>
            </li>
          </div>
        </div>
        <div v-show="hasPlan"
          class="hrefCtn"
          id="href3">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">收发概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <el-dropdown trigger="click"
                @command="openWin">
                <span class="el-dropdown-link opration"
                  style="color:#1A95FF">
                  收发详情<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="收发详情">收发详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span v-if="order_info.status_pop_push===0&&order_info.status!==2"
                class="opration"
                @click="orderStatus(5)">确认完成</span>
              <span class="opration"
                style="color:#67c23a"
                v-else-if="order_info.status_pop_push===1||order_info.status===1">已完成</span>
              <span class="opration"
                style="color:#ddd;cursor:not-allowed"
                v-else-if="order_info.status===2">已取消</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
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
              <span class="col"
                v-if="item.store"
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
              <span class="col"
                v-else
                style="flex:5;text-align:center">
                暂无收发信息
              </span>
              <span :style="{'color':order_info.status_pop_push===1?'#67C23A':'#E6A23C'}">{{order_info.status_pop_push===1?'完成':'未完成'}}</span>
            </li>
          </div>
        </div>
        <div v-show="hasPlan"
          class="hrefCtn"
          id="href4">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">检验概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <el-dropdown trigger="click"
                @command="openWin">
                <span class="el-dropdown-link opration"
                  style="color:#1A95FF">
                  检验详情<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="半成品检验">半成品检验</el-dropdown-item>
                  <el-dropdown-item command="成品检验">成品检验</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="opration"
                v-if="order_info.status_inspection===0&&order_info.status!==2"
                @click="orderStatus(4)">确认完成</span>
              <span class="opration"
                style="color:#67c23a"
                v-else-if="order_info.status===1||order_info.status_inspection===1">已完成</span>
              <span class="opration"
                style="color:#ddd;cursor:not-allowed"
                v-else-if="order_info.status===2">已取消</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
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
              <span>{{item.semi_number ? item.semi_number : 0}}{{item.unit}}</span>
              <span>{{item.semi_defective ? item.semi_defective : 0}}{{item.unit}}</span>
              <span>{{(item.semi_defective ? item.semi_defective : 0)/(item.semi_number ? item.semi_number : 0) ? ((item.semi_defective ? item.semi_defective : 0)/(item.semi_number ? item.semi_number : 0)*100).toFixed(2) : 0}}%</span>
              <span>{{item.finished_number ? item.finished_number : 0}}{{item.unit}}</span>
              <span>{{item.finished_defective ? item.finished_defective : 0}}{{item.unit}}</span>
              <span>{{((item.finished_defective ? item.finished_defective : 0)/(item.finished_number ? item.finished_number : 0)) ? ((item.finished_defective ? item.finished_defective : 0)/(item.finished_number ? item.finished_number : 0)*100).toFixed(2) : 0}}%</span>
              <span :style="{'color':(item.semi_number - item.semi_defective)/item.plan_number>=1&&(item.finished_number - item.finished_defective)/item.order_num>=1||order_info.status_inspection===1?'#67C23A':'#E6A23C'}">{{(item.semi_number - item.semi_defective)/item.plan_number>=1&&(item.finished_number - item.finished_defective)/item.order_num>1||order_info.status_inspection===1?'完成':'未完成'}}</span>
            </li>
          </div>
        </div>
        <div v-show="hasPlan"
          class="hrefCtn"
          id="href5">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">出库概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <el-dropdown trigger="click"
                @command="openWin">
                <span class="el-dropdown-link opration"
                  style="color:#1A95FF">
                  出库详情<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="装箱出库">装箱出库</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="opration"
                v-if="order_info.status_stock_out===0&&order_info.status!==2"
                @click="orderStatus(6)">确认完成</span>
              <span class="opration"
                style="color:#67c23a"
                v-else-if="order_info.status===1||order_info.status_stock_out===1">已完成</span>
              <span class="opration"
                style="color:#ddd;cursor:not-allowed"
                v-else-if="order_info.status===2">已取消</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:1.7">发货批次</span>
              <span style="flex:7">
                <span style="flex:2">产品信息</span>
                <span>下单数量</span>
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
                  <span>{{valPro.number?valPro.number:0}}{{ valPro.unit}}</span>
                  <span>{{valPro.product_number?valPro.product_number:0}}{{valPro.unit}}</span>
                  <span>{{valPro.product_number ? valPro.product_number > valPro.number ? '多装' + (valPro.product_number - valPro.number) +  valPro.unit : '少装' + (valPro.number - valPro.product_number) +  valPro.unit:'暂无信息'}}</span>
                </span>
              </span>
              <span>{{item.pack_number?item.pack_number:0}}箱</span>
              <span :style="{'color':order_info.status_stock_out===1?'#67C23A':'#E6A23C'}">{{order_info.status_stock_out===1?'完成':'未完成'}}</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          v-show="hasPlan"
          id="href6">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">财务概述</span>
              <i class="border"></i>
            </div>
            <!-- <div class="oprationCtn">
              <span class="opration">财务详情</span>
            </div> -->
          </div>
          <span class="title">物料成本</span>
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
              <span class="tableRow">{{item.order_client?item.order_client[0]:'暂无'}}</span>
              <span class="tableRow">{{item.order_number?item.order_number:0}}{{item.unit}}</span>
              <span class="tableRow">{{item.total_price_order?item.total_price_order:0}}元</span>
              <span class="tableRow col"
                style="flex:4">
                <span class="tableColumn"
                  v-for="(valType,indType) in item.processType"
                  :key="indType">
                  <span class="tableRow">{{valType.process_client[0]}}</span>
                  <span class="tableRow">{{valType.type}}</span>
                  <span class="tableRow">{{valType.number}}{{item.unit}}</span>
                  <span class="tableRow">{{valType.total_price_process}}元</span>
                </span>
              </span>
            </li>
          </div>
          <span class="title">产品织造加工成本</span>
          <div class="tablesCtn"
            style="line-height:40px;width:1220px;box-sizing:border-box;">
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
              <span class="tableRow">{{item.weave_client ? item.weave_client[0] : '暂无'}}</span>
              <span class="tableRow">{{item.weave_number ? item.weave_number : 0}}{{item.unit}}</span>
              <span class="tableRow">{{item.total_price_weave ? item.total_price_weave : 0}}元</span>
              <span class="tableRow col"
                style="flex:4">
                <span class="tableColumn"
                  v-for="(valType,indType) in item.processType"
                  :key="indType">
                  <span class="tableRow">{{(valType.process_client || valType.process_client.length !==0) ? valType.process_client[0] : '暂无'}}</span>
                  <span class="tableRow">{{valType.type}}</span>
                  <span class="tableRow">{{valType.number ? valType.number : 0}}{{item.unit}}</span>
                  <span class="tableRow">{{valType.total_price_semiProcess ? valType.total_price_semiProcess : 0}}元</span>
                </span>
              </span>
            </li>
          </div>
          <span class="title">包装订购成本</span>
          <div class="tablesCtn"
            style="line-height:40px;width:1220px;box-sizing:border-box">
            <li class="title">
              <span>包装名称</span>
              <span>订购公司</span>
              <span>尺寸</span>
              <span>属性</span>
              <span>单价</span>
              <span>订购数量</span>
              <span>总价</span>
            </li>
            <li class="content"
              v-for="(item,key) in packOrderList"
              :key="key">
              <span class="tableRow">{{item.pack_name}}</span>
              <span class="tableRow col"
                style="flex:6">
                <span class="tableColumn"
                  v-for="(value,index) in item.client_info"
                  :key="index">
                  <span class="tableRow">{{value.client_name}}</span>
                  <span class="tableRow col"
                    style="flex:5">
                    <span class="tableColumn"
                      v-for="(val,ind) in value.size_info"
                      :key="ind">
                      <span class="tableRow">{{val.size}}</span>
                      <span class="tableRow"><template v-for="(valAttr,indAttr) in val.attr">{{(indAttr !== 0 && !valAttr) ? '/' : ''}}{{valAttr.pack_attr ? valAttr.pack_attr : '无'}}</template></span>
                      <span class="tableRow">{{val.price}}</span>
                      <span class="tableRow">{{val.number}}</span>
                      <span class="tableRow">{{val.number*val.price}}元</span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">发货信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="hrefCtn"
          id="href7">
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
                      <span class="tableRow">{{valSize.numbers}}{{valPro.productInfo.category_info.name}}</span>
                      <span class="tableRow">{{valSize.unitPrice}}{{order_info.account_unit}}/{{valPro.productInfo.category_info.name}}</span>
                      <span class="tableRow">{{parseInt(valSize.numbers * valSize.unitPrice)}}{{order_info.account_unit}}</span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-show="order_info.status===2">
        <div class="stepTitle">订单取消日志</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="hrefCtn"
          id="href8">
          <div class="tablesCtn"
            style="line-height:40px;width:1220px;box-sizing:border-box;margin-top:30px;">
            <li class="title">
              <span>入库时间</span>
              <span>产品信息</span>
              <span>尺码颜色</span>
              <span>入库数量</span>
            </li>
            <li class="content"
              v-for="(item,index) in logList"
              :key="index">
              <span class="tableRow">{{item.created_at.slice(0,10)}}</span>
              <span class="tableRow col"
                style="flex:3">
                <span class="tableColumn"
                  v-for="itemPro in item.product_info"
                  :key="itemPro.product_id">
                  <span class="tableRow">{{itemPro.info[0].product_info.product_code}}({{itemPro.info[0].product_info.category_info.product_category}}/{{itemPro.info[0].product_info.type_name}}/{{itemPro.info[0].product_info.style_name}})</span>
                  <span class="tableRow col"
                    style="flex:2">
                    <span class="tableColumn"
                      v-for="(itemColor,indexColor) in itemPro.info"
                      :key="indexColor">
                      <span class="tableRow">{{itemColor.size}}/{{itemColor.color}}</span>
                      <span class="tableRow">{{itemColor.stock_number}}{{itemColor.product_info.category_info.name}}</span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </div>
          <div class="tablesCtn"
            style="line-height:40px;width:1220px;box-sizing:border-box;margin-top:30px;">
            <li class="title">
              <span>入库时间</span>
              <span>纱线名称</span>
              <span>纱线颜色</span>
              <span>入库数量</span>
            </li>
            <li class="content"
              v-for="(item,index) in logList"
              :key="index">
              <span class="tableRow">{{item.created_at.slice(0,10)}}</span>
              <span class="tableRow col"
                style="flex:3">
                <span class="tableColumn"
                  v-for="itemPro in item.material_info"
                  :key="itemPro.material_name">
                  <span class="tableRow">{{itemPro.material_name}}</span>
                  <span class="tableRow col"
                    style="flex:2">
                    <span class="tableColumn"
                      v-for="(itemColor,indexColor) in itemPro.info"
                      :key="indexColor">
                      <span class="tableRow">{{itemColor.color_code}}</span>
                      <span class="tableRow">{{itemColor.total_weight}}kg</span>
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
    <div class="catalogue"
      v-show="hasPlan">
      <div class="title">详情目录</div>
      <li class="ahref"><a href="#href1">物料概述</a></li>
      <li class="ahref"><a href="#href2">生产概述</a></li>
      <li class="ahref"><a href="#href3">收发概述</a></li>
      <li class="ahref"><a href="#href4">检验概述</a></li>
      <li class="ahref"><a href="#href5">出库概述</a></li>
      <li class="ahref"><a href="#href6">财务概述</a></li>
      <li class="ahref"><a href="#href7">发货信息</a></li>
      <li class="ahref"
        v-show="order_info.status===2"><a href="#href8">订单取消日志</a></li>
    </div>
    <div class="suspend">
      <span class="blue"
        style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
        <a href="#top"
          style="color: rgb(255, 255, 255); text-decoration: none;">回到顶部</a>
      </span>
    </div>
    <div class="shade"
      style="z-index:99"
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
    <div class="shade2"
      style="z-index:99;"
      v-show="showStep">
      <div class="main">
        <div class="close">
          <span class="icon"
            @click="showStep=false">x</span>
        </div>
        <div class="title">{{stepTitle[step]}}</div>
        <div class="content"><i class="el-icon-info"
            style="margin-right:5px;"></i>
          <span>{{materialDetail.length===0&&step===0?'检测到该产品还未订购过任何原料，请直接跳过本步骤':stepContent[step]}}</span></div>
        <div class="inputCtn"
          v-show="step===0">
          <el-input v-for="item in materialDetail"
            :key="item.material_name+item.color_code"
            class="inputs"
            v-model="item.number"
            placeholder="请填写剩余数量">
            <template slot="prepend">{{item.material_name}}({{item.color_code}})</template>
            <template slot="append">{{item.unit}}</template>
          </el-input>
        </div>
        <div class="inputCtn"
          v-show="step===1">
          <el-input v-for="(item,index) in productDetail"
            :key="index"
            class="inputs"
            v-model="item.number"
            placeholder="请填写剩余数量">
            <template slot="prepend">{{item.productCode}} {{item.type}}({{item.size}})</template>
            <template slot="append">{{item.unit}}</template>
          </el-input>
        </div>
        <div class="loading"
          v-show="step===2">
          <div class="spinner"
            v-show="showLoading">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
          <div class="success"
            v-show="showMsg">
            <i class="el-icon-check"></i>
            <span class="des">订单取消成功</span>
          </div>
        </div>
        <div class="btnCtn">
          <div class="btn1 btn"
            @click="step--"
            v-show="step>0">{{step===0?'':'上一步'}}</div>
          <div class="btn2 btn"
            @click="step===2?orderCancle():step++">{{step===2?(order_info.status===2&&firstCancle?'关闭窗口':'确认提交'):'下一步'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetailNew, rawMaterialOrderInit, productionDetail, packagNumberDetail, orderCheck, orderCancleLog } from '@/assets/js/api.js'
import { moneyArr } from '@/assets/js/dictionary.js'
export default {
  data () {
    return {
      logList: [],
      firstCancle: false,
      showMsg: false,
      showLoading: false,
      showStep: false,
      stepTitle: ['物料结余', '产品结余', '确认提交'],
      stepContent: ['该订单已经订购过以下物料，请按实际情况填写物料剩余数量。', '该订单包含以下产品，请按实际情况填写需要入库的产品数量。', '警告！执行取消订单操作后会导致该订单无法继续执行相关生产操作，是否确认取消订单？'],
      step: 0,
      loading: true,
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
        status: 0,
        fileArr: []
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
      hasPlan: false,
      materialDetail: [], // 物料详细信息
      productDetail: [], // 产品详细信息
      productRate: [], // 流程详情
      materialList: [], // 物料概述
      designList: [], //  生产概述
      outStockList: [], // 出库概述
      productPriceList: [], // 产品价格信息
      storeList: [], // 收发概述
      packOrderList: []// 包装订购
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
    },
    // 合并函数
    jsonMerge (jsonArr, keyArr) {
      let newJson = [] // 合并好的数据都放在这个数组里
      jsonArr.forEach((itemJson, indexJson) => {
        let mark = -1
        let finded = newJson.find((itemFind, indexFind) => {
          if (itemFind[keyArr[0]] === itemJson[keyArr[0]]) {
            mark = indexFind
            return itemFind[keyArr[0]] === itemJson[keyArr[0]]
          }
        })
        if (!finded) {
          let value = {}
          value[keyArr[0]] = itemJson[keyArr[0]]
          value['info'] = []
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          value['info'].push(info)
          newJson.push(value)
        } else {
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          newJson[mark]['info'].push(info)
        }
      })
      // 递归的条件是不断的缩减keyArr的length，每次都去除第零个，直到为0
      if (keyArr.length === 1) {
        return newJson
      } else {
        return newJson.map((itemInfo) => {
          let newKeyArr = []
          keyArr.forEach((item, index) => {
            if (index > 0) {
              newKeyArr.push(item)
            }
          })
          return {
            [keyArr[0]]: itemInfo[keyArr[0]],
            'info': this.jsonMerge(itemInfo['info'], newKeyArr)
          }
        })
      }
    },
    // 百分比转化成宽度
    rateChange (numSamll, numBig) {
      let rate = numSamll / numBig * 100
      if (rate < 5) {

      } else if (rate > 100) {
        rate = 100
      }
      return parseInt(rate) + '%'
    },
    orderStatus (state) {
      let filterArr = ['', '订单状态', '订单生产状态', '订单物料状态', '订单检验状态', '订单收发状态', '订单出库状态']
      if (state < 8) {
        this.$confirm('该操作将直接修改' + filterArr[state] + ',你无法再对该订单的相关步骤进行操作, 请确认是否修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          orderCheck({
            id: this.$route.params.id,
            company_id: window.sessionStorage.getItem('company_id'),
            type: state,
            product_data: [],
            material_data: []
          }).then((res) => {
            if (res.data.status) {
              this.$message.success({
                message: '修改成功'
              })
              if (state === 1) {
                this.status = 1
                this.order_info.status_weave = 1
                this.order_info.status_material_order = 1
                this.order_info.status_inspection = 1
                this.order_info.status_pop_push = 1
                this.order_info.status_stock_out = 1
              } else if (state === 2) {
                this.order_info.status_weave = 1
              } else if (state === 3) {
                this.order_info.status_material_order = 1
              } else if (state === 4) {
                this.order_info.status_inspection = 1
              } else if (state === 5) {
                this.order_info.status_pop_push = 1
              } else if (state === 6) {
                this.order_info.status_stock_out = 1
              }
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        if (state === '8') {
          if (this.order_info.status !== 2) {
            this.showStep = true
          } else {
            this.$message.error({
              message: '该订单已取消，请勿重复操作'
            })
          }
        }
        if (state === '9') {
          this.showStep = true
        }
      }
    },
    // 打开详情页
    openWin (cmd) {
      const orderId = this.$route.params.id
      let urlJson = {
        '原料详情': '/index/rawMaterialOrderDetail/' + orderId + '/0',
        '辅料详情': '/index/rawMaterialOrderDetail/' + orderId + '/1',
        '原料出入库': '/index/rawMaterialStockDetail/' + orderId + '/0',
        '辅料出入库': '/index/rawMaterialStockDetail/' + orderId + '/1',
        '织造详情': '/index/productDesignWeavingDetail/' + orderId,
        '半成品加工详情': '/index/productDesignHalfDetail/' + orderId,
        '收发详情': '/index/orderStockDetail/' + orderId,
        '半成品检验': '/index/semiExaminationDetail/' + orderId,
        '成品检验': '/index/finishedExaminationDetail/' + orderId,
        '装箱出库': '/index/packagOutStockDetail/' + orderId
      }
      window.open(urlJson[cmd])
    },
    // 取消订单
    orderCancle () {
      if (this.order_info.status === 2 && this.firstCancle) {
        this.showStep = false
      } else {
        this.showMsg = false
        this.showLoading = true
        const materialDetail = this.materialDetail.map((item) => {
          return {
            company_id: window.sessionStorage.getItem('company_id'),
            order_id: this.$route.params.id,
            material_name: item.material_name,
            vat_code: 'vat_null',
            color_code: item.color_code,
            number: 0,
            total_weight: item.number === '' ? 0 : item.number,
            complete_time: this.getTime(new Date()),
            desc: '原料结余',
            attribute: item.attribute,
            type: item.type,
            stock_id: 0,
            user_id: window.sessionStorage.getItem('user_id')
          }
        })
        const productDetail = this.productDetail.map((item) => {
          return {
            user_id: window.sessionStorage.getItem('user_id'),
            order_code: this.order_info.order_code,
            company_id: window.sessionStorage.getItem('company_id'),
            product_id: item.id,
            product_info: item.product_info,
            size: item.size.split('/')[0],
            color: item.size.split('/')[1],
            stock_number: item.number ? item.number : 0,
            rejects_product: '',
            cost_price: item.cost,
            total_price: parseInt(item.cost * (item.number ? item.number : 0)),
            store_id: 0,
            storage_time: this.getTime(new Date()),
            remark: '订单取消结余'
          }
        })
        orderCheck({
          id: this.$route.params.id,
          company_id: window.sessionStorage.getItem('company_id'),
          type: 8,
          product_data: productDetail,
          material_data: materialDetail
        }).then((res) => {
          if (res.data.status) {
            this.showLoading = false
            this.showMsg = true
            this.order_info.status = 2
            this.firstCancle = true
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        })
      }
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
        return '已取消'
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
    // 订单状态操作
    orderStateOpr () {
      const state = ['确认完成', '已完成', '已取消']
      return state[this.order_info.status]
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
    },
    // 使用时间百分比
    useTimeRate () {
      if (this.timeAxis.length > 0) {
        return this.getTimeDif((new Date().getTime()), new Date(this.timeAxis[0].time)) / this.getTimeDif(new Date(this.timeAxis[this.timeAxis.length - 1].time), new Date(this.timeAxis[0].time)) * 100 + '%'
      } else {
        return 0
      }
    }
  },
  filters: {
    // 物料合计费用
    filterTotal (item) {
      let price = 0
      if (item.processType) {
        item.processType.forEach(val => {
          price += Number(val.total_price_process)
        })
        price += Number(item.total_price_order)
      }
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
      id: this.$route.params.id
    }), rawMaterialOrderInit({
      order_id: this.$route.params.id
    }), productionDetail({
      order_id: this.$route.params.id
    }), packagNumberDetail({
      order_id: this.$route.params.id
    }), orderCancleLog({
      id: this.$route.params.id,
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      const data = res[0].data.data
      this.order_info = data.order_info
      this.order_info.fileArr = this.order_info.file_url ? JSON.parse(this.order_info.file_url) : []
      this.order_log = data.order_log
      this.process = data.order_schedule
      this.logList = res[4].data.data.map((item) => {
        item.material_info = this.jsonMerge(item.material_info, ['material_name'])
        item.product_info = this.jsonMerge(item.product_info, ['product_id'])
        return item
      })
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

      // 流程进度,按产品
      const productPlan = res[2].data.status ? res[2].data.data.production_detail.product_info : []
      this.hasPlan = res[2].data.status
      // 合并下产品编号相同的产品
      const productPlanMerge = this.jsonMerge(productPlan, ['product_code'])
      productPlanMerge.forEach((itemProduct, indexPorduct) => {
        // 统计织造
        let weaveNum = 0 // 织造分配数量
        let weavePushNum = 0 // 织造入库数量
        this.order_log.product_weave.forEach((itemWeave, indexWeave) => {
          if (itemWeave.product_info.product_code === itemProduct.product_code) {
            weaveNum += itemWeave.number
          }
        })
        this.order_log.product_pop.forEach((itemProPush, indexProPush) => {
          if (itemProPush.product_info.product_code === itemProduct.product_code && itemProPush.type === '织造') {
            weavePushNum += itemProPush.number
          }
        })
        // 统计半成品加工
        let semiNum = 0 // 半成品加工分配数量
        let semiPushNum = 0 // 半成品加工入库数量
        this.order_log.semi_finished_production.forEach((itemSemi, indexSemi) => {
          if (itemSemi.product_info.product_code === itemProduct.product_code) {
            semiNum += itemSemi.number
          }
        })
        this.order_log.product_pop.forEach((itemProPush, indexProPush) => {
          if (itemProPush.product_info.product_code === itemProduct.product_code && itemProPush.type !== '织造') {
            semiPushNum += itemProPush.number
          }
        })
        // 统计检验
        let inspSemiNum = 0 // 半成品检验
        let inspProNum = 0 // 成品检验
        this.order_log.semi_product_inspection.forEach((itemInspSemi, indexInspSemi) => {
          if (itemInspSemi.product_info.product_code === itemProduct.product_code) {
            inspSemiNum += itemInspSemi.number
          }
        })
        this.order_log.product_inspection.forEach((itemInspPro, indexInspPro) => {
          if (itemInspPro.product_info.product_code === itemProduct.product_code) {
            inspProNum += itemInspPro.number
          }
        })
        // 装箱统计
        let packNum = 0
        let proOutNum = 0
        this.order_log.pack_info.forEach((itemPack, indexPack) => {
          JSON.parse(itemPack.product_info).forEach((itemNum, indexNum) => {
            if (itemNum.product_code === itemProduct.product_code) {
              packNum += itemNum.size_info.reduce((total, current) => {
                return total + Number(current.pack_number)
              }, 0)
            }
          })
        })
        // 出库数值统计不了,根据订单状态来确定
        if (res[0].data.data.order_info.status || res[0].data.data.order_info.status_stock_out) {
          proOutNum = itemProduct.info.reduce((total, current) => {
            return total + Number(current.production_num)
          }, 0)
        }
        this.productRate.push({
          product_code: itemProduct.product_code,
          product_type: itemProduct.info[0].category_name + '/' + itemProduct.info[0].type_name + '/' + itemProduct.info[0].style_name,
          unit: itemProduct.info[0].unit_name,
          production_num: itemProduct.info.reduce((total, current) => {
            return total + Number(current.production_num)
          }, 0),
          order_num: itemProduct.info.reduce((total, current) => {
            return total + Number(current.order_num)
          }, 0),
          weaveInfo: {
            weaveNum: weaveNum,
            weavePushNum: weavePushNum
          },
          semiInfo: {
            semiNum: semiNum,
            semiPushNum: semiPushNum
          },
          inspInfo: {
            inspSemiNum: inspSemiNum,
            inspProNum: inspProNum
          },
          packInfo: {
            packNum: packNum,
            proOutNum: proOutNum
          }
        })
      })
      console.log(this.productRate)
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
      // 生产概述
      let designInfo = res[2].data.status ? res[2].data.data : {
        production_detail: {
          product_info: []
        }
      }
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
      let storeIn = this.order_log.product_pop
      let storeOut = this.order_log.product_push
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
            flag1.store_in_number = Number(flag1.store_in_number ? flag1.store_in_number : 0) + Number(item.number)
            flag1.store_in_count = Number(flag1.store_in_count ? flag1.store_in_count : 0) + Number(item.count)
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
            flag1.store_out_number = Number(flag1.store_out_number ? flag1.store_out_number : 0) + Number(item.number)
            flag1.store_out_count = Number(flag1.store_out_count ? flag1.store_out_count : 0) + Number(item.count)
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
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
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
                  img: [...val.productInfo.img],
                  unit: val.productInfo.category_info.name
                }]
              })
            } else {
              let flag1 = flag.product_info.find(key => key.product_code === val.productCode)
              if (!flag1) {
                flag.product_info.push({
                  product_code: val.productCode,
                  product_type: val.productInfo.category_info.product_category + '/' + val.productInfo.type_name + '/' + val.productInfo.style_name,
                  number: valSize.numbers,
                  img: [...val.productInfo.img],
                  unit: val.productInfo.category_info.name
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
      // 包装订购成本统计
      let packOrderInfo = this.order_log.pack_order
      console.log(packOrderInfo)
      packOrderInfo.forEach(item => {
        let pack = this.packOrderList.find(key => key.pack_name === item.material_name)
        if (!pack) {
          this.packOrderList.push({
            pack_name: item.material_name,
            client_info: [{
              client_name: item.client_name,
              client_id: item.client_id,
              size_info: [{
                size: item.size,
                attr: JSON.parse(item.attribute),
                number: item.number,
                price: item.price
              }]
            }]
          })
        } else {
          let client = pack.client_info.find(key => key.client_id === item.client_id)
          if (!client) {
            pack.client_info.push({
              client_name: item.client_name,
              client_id: item.client_id,
              size_info: [{
                size: item.size,
                attr: JSON.parse(item.attribute),
                number: item.number,
                price: item.price
              }]
            })
          } else {
            let size = client.size_info.find(key => (key.size === item.size && key.price === item.price))
            if (!size) {
              size.size_info.push({
                size: item.size,
                attr: JSON.parse(item.attribute),
                number: item.number,
                price: item.price
              })
            } else {
              size.number = Number(size.number ? size.number : 0) + Number(item.number)
            }
          }
        }
      })
      console.log(this.packOrderList)
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
      // 订单取消的时候需要拿物料订购日志（分颜色），下单产品信息（分尺码颜色）
      this.order_log.material_order.forEach((item) => {
        const finded = this.materialDetail.find((itemFind) => itemFind.material_name === item.material_name && itemFind.color_code === item.color_code)
        if (!finded) {
          this.materialDetail.push({
            material_name: item.material_name,
            color_code: item.color_code,
            unit: item.unit || 'kg',
            type: item.type,
            number: '',
            attribute: item.attribute,
            stock_id: item.stock_id,
            vat_code: item.vat_code
          })
        }
      })
      this.order_info.order_batch.forEach((itemBacth) => {
        itemBacth.batch_info.forEach((itemPro) => {
          itemPro.size.forEach((itemSize) => {
            const finded = this.productDetail.find((itemFind) => itemFind.productCode === itemPro.productCode && itemFind.size === itemSize.name.join('/'))
            if (!finded) {
              this.productDetail.push({
                product_info: itemPro.productInfo,
                id: itemPro.productInfo.id,
                number: '',
                cost: itemSize.unitPrice,
                productCode: itemPro.productCode,
                size: itemSize.name.join('/'),
                unit: itemPro.productInfo.category_info.name,
                type: itemPro.productInfo.category_info.product_category + '/' + itemPro.productInfo.type_name + '/' + itemPro.productInfo.style_name
              })
            }
          })
        })
      })
      this.loading = false
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
#orderDetail {
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
  .el-carousel__arrow {
    background: #1a95ff;
  }
}
</style>
