<template>
  <div id="orderDetail"
    v-loading="loading">
    <div class="head"
      style="overflow:auto"
      id="top">
      <h2>样单详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">样单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfos">
          <div class="keyBtn">
            <!-- <el-dropdown size="medium"
              @command="showMessage"
              split-button
              type="primary">
              {{'操作'}}
              <el-dropdown-menu slot="dropdown"
                v-if="order_info.status === 0">
                <el-dropdown-item v-show="order_info.sample_order_apply_status === 12 || (sample_order_list[0] ? sample_order_list[0].id:'') === $route.params.id"
                  command="ok"
                  style="color:#1A94FF">客户确认</el-dropdown-item>
                <el-dropdown-item v-show="order_info.sample_order_apply_status === 12 || (sample_order_list[0] ? sample_order_list[0].id:'') === $route.params.id"
                  command="change"
                  style="color:#E6A23C">修改样单</el-dropdown-item>
                <el-dropdown-item v-show="order_info.status===0"
                  command="cancle"
                  style="color:#FF4D4D">样单取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            <el-menu class="editMenu"
              mode="horizontal"
              @select="showMessage">
              <el-submenu index="1">
                <template slot="title">操作</template>
                <el-menu-item index="waitConfirm"
                  class="elMenuItem">待客户确认</el-menu-item>
                <!-- <el-menu-item index="1-2">已确认</el-menu-item> -->
                <el-submenu index="1-2"
                  class="elMenuItem">
                  <template slot="title">已确认</template>
                  <el-menu-item index="change"
                    class="elMenuItem">继续打样</el-menu-item>
                  <el-menu-item index="ok"
                    class="elMenuItem">不继续打样</el-menu-item>
                  <el-menu-item index="addOrder"
                    class="elMenuItem">大货生产</el-menu-item>
                </el-submenu>
                <el-menu-item index="cancle"
                  class="elMenuItem">取消样单</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <div class="infoCtn">
            <div class="labelInfo">
              <span class="label">样单状态</span>
              <span class="info"
                :style="{'color':orderStateColor}">
                {{orderState}}
                <el-tooltip class="item"
                  v-show="!hasPlan && !isOK"
                  effect="dark"
                  content="该样单还未填写生产计划单,点击按钮前往填写"
                  placement="top">
                  <i class="el-icon-question"
                    @click="$router.push('/index/productDesignCreate/'+$route.params.id)"></i>
                </el-tooltip>
              </span>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">样单号:</span>
            <span class="content">{{order_info.order_code}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">系统编号:</span>
            <span class="content">{{order_info.inside_order_code}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">样单公司:</span>
            <span class="content">{{order_info.client_name}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">负责小组:</span>
            <span class="content">{{order_info.group_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">联系人:</span>
            <span class="content">{{order_info.contacts}}</span>
          </div>
        </div>
        <!-- <div class="lineCtn"
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
                  style="margin-right:5px"></i>{{item.replace('https://zhihui.tlkrzf.com/', '')}}
              </a>
            </span>
          </div>
        </div> -->
        <div class="lineCtn sampleCtn">
          <div class="catBtn">
            <span v-for="(item,key) in sample_order_list"
              :key="key"
              :class="{'active':item.id === $route.params.id}"
              @click="reloadPage(item.id)">第{{key+1|filterChinese}}次打样</span>
          </div>
          <!-- iderror -->
          <div class="applyProcess"
            v-if="$route.params.id !== (sample_order_list[0] ? sample_order_list[0].id : '')"
            style="margin-bottom:33px;">
            <div class="title">申请流程</div>
            <div class="info row">
              <div class="item col">
                <div class="borderCtn">
                  <div class="leftBorder"></div>
                  <div class="circle isOk"></div>
                  <!-- <el-popover placement="top"
                    width="200"
                    trigger="hover">
                    <div class="popover-title">
                      <span class="user">隔壁老王</span>
                      <span :class="{'status':true,'ok':true}">{{'未响应'}}</span>
                    </div>
                    <p class="useTime">耗时：{{getUseTime('2019-06-12 15:30')}}</p>
                    <span class="hurry">催一下</span>
                    <div class="circle"
                      slot="reference"></div>
                  </el-popover> -->
                  <div class="border isOk"></div>
                </div>
                <span>提交样单修改申请</span>
                <!-- <span>王经理</span> -->
                <!-- <span>2016-12-12 12:32</span> -->
              </div>
              <div class="item col">
                <div class="borderCtn">
                  <div class="leftBorder isOk"></div>
                  <div :class="{'circle':true,'isOk':order_info.sample_order_apply_status> 1}"></div>
                  <!-- <el-popover placement="top"
                    width="200"
                    trigger="hover">
                    <div class="popover-title">
                      <span class="user">隔壁老王</span>
                      <span :class="{'status':true,'ok':true}">{{'未响应'}}</span>
                    </div>
                    <p class="useTime">耗时：{{getUseTime('2019-06-12 15:30')}}</p>
                    <span class="hurry">催一下</span>
                    <div class="circle"
                      slot="reference"></div>
                  </el-popover> -->
                  <div :class="{'border':true,'isOk':order_info.sample_order_apply_status> 1}"></div>
                </div>
                <span>修改样品<span style="color:#1a95ff;margin-left:8px;cursor: pointer;font-weight:400;"
                    @click="handleType = 'changeSample'"
                    v-if="10>order_info.sample_order_apply_status">去修改</span></span>
                <!-- <span>王经理</span> -->
                <!-- <span>2016-12-12 12:32</span> -->
              </div>
              <div class="item col">
                <div class="borderCtn">
                  <div :class="{'leftBorder':true,'isOk':order_info.sample_order_apply_status> 1}"></div>
                  <div :class="{'circle':true,'isOk':order_info.sample_order_apply_status> 10}"></div>
                  <!-- <el-popover placement="top"
                    width="200"
                    trigger="hover">
                    <div class="popover-title">
                      <span class="user">隔壁老王</span>
                      <span :class="{'status':true,'ok':true}">{{'未响应'}}</span>
                    </div>
                    <p class="useTime">耗时：{{getUseTime('2019-06-12 15:30')}}</p>
                    <span class="hurry">催一下</span>
                    <div class="circle"
                      slot="reference"></div>
                  </el-popover> -->
                  <div :class="{'border':true,'isOk':order_info.sample_order_apply_status> 10}"></div>
                </div>
                <span>修改工艺单<span style="color:#1a95ff;margin-left:8px;cursor: pointer;font-weight:400;"
                    @click="handleType = 'changeCraft'"
                    v-if="10 === order_info.sample_order_apply_status">去修改</span></span>
                <!-- <span>王经理</span> -->
                <!-- <span>2016-12-12 12:32</span> -->
              </div>
              <div class="item col">
                <div class="borderCtn">
                  <div :class="{'leftBorder':true,'isOk':order_info.sample_order_apply_status> 10}"></div>
                  <div :class="{'circle':true,'isOk':order_info.sample_order_apply_status> 11}"></div>
                  <!-- <el-popover placement="top"
                    width="200"
                    trigger="hover">
                    <div class="popover-title">
                      <span class="user">隔壁老王</span>
                      <span :class="{'status':true,'ok':true}">{{'未响应'}}</span>
                    </div>
                    <p class="useTime">耗时：{{getUseTime('2019-06-12 15:30')}}</p>
                    <span class="hurry">催一下</span>
                    <div class="circle"
                      slot="reference"></div>
                  </el-popover> -->
                  <div :class="{'border':true,'isOk':order_info.sample_order_apply_status> 11}"></div>
                </div>
                <span>修改配料单<span style="color:#1a95ff;margin-left:8px;cursor: pointer;font-weight:400;"
                    @click="handleType = 'changePlan'"
                    v-if="11 === order_info.sample_order_apply_status">去修改</span></span>
                <!-- <span>王经理</span> -->
                <!-- <span>2016-12-12 12:32</span> -->
              </div>
              <div class="item col">
                <div class="borderCtn">
                  <div :class="{'leftBorder':true,'isOk':order_info.sample_order_apply_status> 11}"></div>
                  <div :class="{'circle':true,'isOk':order_info.sample_order_apply_status> 11}"></div>
                  <!-- <el-popover placement="top"
                    width="200"
                    trigger="hover">
                    <div class="popover-title">
                      <span class="user">隔壁老王</span>
                      <span :class="{'status':true,'ok':true}">{{'未响应'}}</span>
                    </div>
                    <p class="useTime">耗时：{{getUseTime('2019-06-12 15:30')}}</p>
                    <span class="hurry">催一下</span>
                    <div class="circle"
                      slot="reference"></div>
                  </el-popover> -->
                  <div :class="{'border':true,'isOk':order_info.sample_order_apply_status> 11}"></div>
                </div>
                <span>样单修改完成</span>
                <!-- <span>王经理</span> -->
                <!-- <span>2016-12-12 12:32</span> -->
              </div>
            </div>
          </div>
          <div class="applyInfo">
            <div class="title">打样信息</div>
            <div class="info col">
              <div class="item-info">
                <div class="items">
                  <span class="label">客户确认:</span>
                  <span :class="{'content':true,'success':order_info.client_confirm,'error':(!order_info.client_confirm)  && order_info.status === 1,'running':!order_info.client_confirm}">{{order_info.client_confirm ? '已确认' : '待确认'}}</span>
                </div>
                <div class="items">
                  <span class="label">样单类型:</span>
                  <span class="content">{{(order_info.sample_order_type || order_info.sample_order_type === 0) ? sampleTypeArr.find(item=>Number(item.id) === Number(order_info.sample_order_type)).name : '暂无'}}</span>
                </div>
              </div>
              <div class="item-info">
                <div class="items">
                  <span class="label">下单日期:</span>
                  <span class="content">{{order_info.order_time ? order_info.order_time : '暂无'}}</span>
                </div>
                <div class="items">
                  <span class="label">备注:</span>
                  <span class="content">{{order_info.remark ? order_info.remark : '暂无'}}</span>
                </div>
              </div>
            </div>
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
            <span class="text">样单已经生产<em class="blue">{{useTime}}</em>天，还剩<em class="red">{{leaveTime}}</em>天</span>
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
              <div class="info">{{index === timeAxis.length -1 ? '交货日期' : item.name}}</div>
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
            <div class="label">样单下单</div>
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
        <div class="hrefCtn"
          id="href1">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">制版工艺</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration"
                v-if="order_info.status_material_order===0&&order_info.status!==2"
                @click="designShare = true">工艺制版确认</span>
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
              <span style="flex:2">样品信息</span>
              <span style="flex:4">
                <span>工艺/制版类型</span>
                <span>操作人</span>
                <span>工艺制版状态</span>
                <span>确认时间</span>
              </span>
              <span>样品状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in productDetailInfo"
              :key="index">
              <span style="flex:2;color:#1a95ff;cursor: pointer;"
                @click="$router.push('/index/productDetail/' + item.product_id)">{{item.product_code}}({{item.product_type}})</span>
              <span class="col"
                style="flex:4">
                <span v-for="(itemType,indexType) in item.type"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span :style="{color:!itemType.user_name ? '#DDD' : '#67C23A'}">{{itemType.user_name ? itemType.user_name : '暂无信息'}}</span>
                  <span :style="{color:!itemType.status ? '#DDD' : '#67C23A'}">{{itemType.status ? '完成' : '未完成'}}</span>
                  <span :style="{color:!itemType.time ? '#DDD' : '#67C23A'}">{{itemType.time ? itemType.time : '暂无信息'}}</span>
                </span>
              </span>
              <span :style="{'color': item.type.filter(vals=> !vals.status).length > 0 ? '#E6A23C':'#67C23A'}">{{item.type.filter(vals=> !vals.status).length > 0 ?'未完成':'完成'}}</span>
            </li>
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
              v-if="materialList.length === 0">暂无物料订购加工信息</li>
            <li class="material_info"
              v-for="(item,index) in materialList"
              :key="index">
              <span style="flex:2">{{item.material_name}}</span>
              <span>{{item.plan_number ? item.plan_number.toFixed(2) : 0}}{{item.unit}}</span>
              <span>{{item.order_number ? item.order_number.toFixed(2) : 0}}{{item.unit}}</span>
              <span class="col"
                v-if="item.processType"
                style="flex:2">
                <span v-for="(itemType,indexType) in item.processType"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span>{{itemType.number.toFixed(2)}}{{item.unit}}</span>
                </span>
              </span>
              <span class="col"
                v-else
                style="flex:2;text-align:center">
                暂无加工信息
              </span>
              <span>{{item.out_stock_number ? item.out_stock_number.toFixed(2) : 0}}{{item.unit}}</span>
              <span>{{item.in_stock_number ? item.in_stock_number.toFixed(2) : 0}}{{item.unit}}</span>
              <span>{{item.replenish_number?item.replenish_number.toFixed(2):0}}{{item.unit}}</span>
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
        <div class="hrefCtn"
          v-show="hasPlan"
          id="href6">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">财务概述</span>
              <i class="border"></i>
            </div>
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
              <span class="tableRow">{{item.order_number?item.order_number.toFixed(2):0}}{{item.unit}}</span>
              <span class="tableRow">{{item.total_price_order?item.total_price_order:0}}元</span>
              <span class="tableRow col"
                style="flex:4">
                <span class="tableColumn"
                  v-for="(valType,indType) in item.processType"
                  :key="indType">
                  <span class="tableRow">{{valType.process_client[0]}}</span>
                  <span class="tableRow">{{valType.type}}</span>
                  <span class="tableRow">{{valType.number.toFixed(2)}}{{item.unit}}</span>
                  <span class="tableRow">{{valType.total_price_process.toFixed(2)}}元</span>
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
              <span class="tableRow">{{item|filterPrice}}元</span>
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
                style="flex:1.7">第{{key}}批{{item[0].delivery_time}}</span>
              <span class="tableRow col"
                style="flex:7">
                <span class="tableColumn"
                  v-for="(valPro,indPro) in item"
                  :key="indPro">
                  <span class="tableRow"
                    style="flex:2">{{valPro.product_code}}({{valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name}})</span>
                  <span class="tableRow">
                    <div class="imgCtn">
                      <img class="img"
                        :src="valPro.category_info.images.length>0?valPro.category_info.images[0].thumb:require('@/assets/image/index/noPic.jpg')"
                        :onerror="defaultImg" />
                      <div class="toolTips"
                        v-if="valPro.category_info.images.length>0"><span @click="showImg(valPro.category_info.images)">点击查看大图</span></div>
                      <div class="toolTips"
                        v-if="valPro.category_info.images.length===0"><span>没有预览图</span></div>
                    </div>
                  </span>
                  <span class="tableRow col"
                    style="flex:4">
                    <span class="tableColumn">
                      <span class="tableRow">{{valPro.size + '/' + valPro.color}}</span>
                      <span class="tableRow">{{valPro.numbers}}{{valPro.category_info.unit}}</span>
                      <span class="tableRow">{{'-'}}</span>
                      <span class="tableRow">{{'-'}}</span>
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
        <div class="stepTitle">样单取消日志</div>
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
                  <span class="tableRow">{{itemPro.info[0].product_info.product_code}}({{itemPro.info[0].product_info.category_name}}/{{itemPro.info[0].product_info.type_name}}/{{itemPro.info[0].product_info.style_name}})</span>
                  <span class="tableRow col"
                    style="flex:2">
                    <span class="tableColumn"
                      v-for="(itemColor,indexColor) in itemPro.info"
                      :key="indexColor">
                      <span class="tableRow">{{itemColor.size}}/{{itemColor.color}}</span>
                      <span class="tableRow">{{itemColor.stock_number}}{{itemColor.product_info.unit}}</span>
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
      <li class="ahref"><a href="#href6">财务概述</a></li>
      <li class="ahref"><a href="#href7">发货信息</a></li>
      <li class="ahref"
        v-show="order_info.status===2"><a href="#href8">样单取消日志</a></li>
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
        <div class="loading"
          v-show="step===1">
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
            <span class="des">样单取消成功</span>
          </div>
        </div>
        <div class="btnCtn">
          <div class="btn1 btn"
            @click="step--"
            v-show="step>0">{{step===0?'':'上一步'}}</div>
          <div class="btn2 btn"
            @click="step===1?orderCancle():step++">{{step===1?(order_info.status===2&&firstCancle?'关闭窗口':'确认提交'):'下一步'}}</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="message"
      v-if="showMessageBox">
      <div class="messageBox">
        <div :class="{'title':true,'success':handleType === 'ok','change': handleType === 'change','cancle' : handleType === 'cancle'}">{{handleType === 'ok' ? '客户确认样' : (handleType === 'change' ? '客户修改样' : '样单取消')}}</div>
        <div class="inputBox">
          <template v-if="handleType !== 'cancle'">
            <template v-if="handleType === 'change' && isFirstPage">
              <div class="item"
                style="margin-top:27px">
                <span class="label">样单类型:</span>
                <div class="content">
                  <el-select v-model="submitInfo.sampleType"
                    class="input_item elInput"
                    placeholder="请选择样单类型">
                    <el-option v-for="item in sampleTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <template v-for="(item,key) in productInfo">
                <div class="item"
                  :key="key + 'X'">
                  <span class="label"
                    v-if="key === 0">打样样品:</span>
                  <div class="content">
                    <el-select v-model="item.product_code"
                      class="input_item elInput"
                      disabled
                      placeholder="请选择打样样品">
                      <el-option v-for="(items,keys) in productInfo"
                        :key="keys"
                        :label="items.product_code + (items.product_type)"
                        :value="items.product_code">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="item"
                  :key="key + 'Y'">
                  <span class="label"></span>
                  <div class="content">
                    <el-select v-model="item.sizeColor"
                      disabled
                      class="input_item elInput marginRight">
                      <el-option v-for="(items,keys) in productInfo"
                        :key="keys"
                        :label="items.size + '/' + items.color"
                        :value="items.size + '/' +items.color">
                      </el-option>
                    </el-select>
                    <el-input v-model="item.number"
                      class="elInput"
                      placeholder="打样数量">
                      <template slot="append">{{item.unit}}</template>
                    </el-input>
                  </div>
                </div>
              </template>
              <div class="item">
                <div class="content">
                  <el-input v-model="submitInfo.sampleIdea"
                    class="elInput"
                    placeholder="请输入该样品修改意见"></el-input>
                </div>
              </div>
              <div class="item">
                <span class="label">完成时间:</span>
                <div class="content">
                  <el-date-picker v-model="submitInfo.sample_complete_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    class="elInput"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
            </template>
            <template v-if="handleType === 'ok'">
              <div v-for="(item,key) in submitInfo.createProInfo"
                :key="key">
                <div class="item"
                  style='margin-top:27px;'>
                  <span class="label">建立产品{{submitInfo.createProInfo.length > 1 ? key+1 : ''}}:</span>
                  <div class="content">
                    <el-select v-model="item.sample_odd"
                      class="elInput"
                      placeholder="请选择样品添加至产品库">
                      <el-option v-for="item in productDetailInfo"
                        :key="item.product_id"
                        :label="item.detail.product_code"
                        :value="item.product_id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="item">
                  <div class="content">
                    <el-select v-model="item.design_odd"
                      class="elInput"
                      placeholder="请选择样品工艺单">
                      <el-option v-for="item in getCraftInfo(item.sample_odd,'craft_info')"
                        :key="item.id"
                        :label="item.craft_code + '('+ item.create_time +')'"
                        :value="item.id">
                        <div style="width:100%;height:100%">
                          <span style="float: left">{{ item.craft_code }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.create_time }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="item"
                  style="margin-bottom:46px">
                  <div class="content">
                    <el-select v-model="item.plan_odd"
                      class="elInput"
                      placeholder="请选择样品配料单">
                      <el-option v-for="item in getCraftInfo(item.sample_odd,'product_plan_info')"
                        :key="item.id"
                        :label="item.plan_code + '('+ item.create_time +')'"
                        :value="item.id">
                        <div style="width:100%;height:100%">
                          <span style="float: left">{{ item.plan_code }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.create_time }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </div>
                  <span class="addBtn"
                    v-if="key === 0"
                    @click="submitInfo.createProInfo.push({sample_odd:'',plan_odd:'',design_odd:''})">添加样品</span>
                  <span class="addBtn deleteBtn"
                    v-else
                    @click="submitInfo.createProInfo.splice(key,1)">删除样品</span>
                </div>
              </div>
            </template>
            <div class="item"
              v-if="handleType === 'ok' || (handleType === 'change' && !isFirstPage)">
              <span class="label">客户付费:</span>
              <div class="content">
                <el-switch v-model="submitInfo.isCustomerPay"
                  class="elInput"
                  active-text="是"
                  inactive-text="否">
                </el-switch>
              </div>
            </div>
            <template v-if="(submitInfo.isCustomerPay && handleType === 'ok') || (handleType === 'change' && !isFirstPage && submitInfo.isCustomerPay)">
              <template v-for="(item,key) in productInfo">
                <div class="item"
                  :key="key + 'X1'">
                  <div class="content">
                    <el-select v-model="item.product_code"
                      class="elInput"
                      disabled
                      placeholder="请选择付费样品">
                      <el-option v-for="(items,keys) in productInfo"
                        :key="keys"
                        :label="items.product_code + '(' +items.product_type+ ')' + '(' +item.sizeColor + ')'"
                        :value="items.product_code">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="item"
                  :key="key + 'Y1'">
                  <div class="content">
                    <el-input v-model="item.price"
                      class="elInput marginRight"
                      placeholder="输入数量"
                      @input="(item.total_price = ((item.totalNum ? item.totalNum : 0) * (item.price ? item.price : 0)).toFixed(1))">
                      <template slot="append">元/条</template>
                    </el-input>
                    <el-input v-model="item.totalNum"
                      class="elInput"
                      placeholder="输入数量"
                      @input="(item.total_price = ((item.totalNum ? item.totalNum : 0) * (item.price ? item.price : 0)).toFixed(1))">
                      <template slot="append">条</template>
                    </el-input>
                  </div>
                </div>
                <div class="item"
                  :key="key + 'Z1'">
                  <div class="content">
                    <el-input placeholder="总价"
                      class="elInput"
                      v-model="item.total_price">
                      <template slot="append">元</template>
                    </el-input>
                  </div>
                </div>
              </template>
            </template>
          </template>
        </div>
        <div class="footer">
          <span class="cancel"
            v-if="!isFirstPage && handleType === 'change'"
            @click="isFirstPage = true">上一步</span>
          <span class="cancel"
            v-else
            @click="showMessageBox = false,submitInfo.isCustomerPay = false,isFirstPage = true">取消</span>
          <span class="ok"
            v-if="isFirstPage && handleType === 'change'"
            @click="isFirstPage = false">下一步</span>
          <span class="ok"
            v-else
            @click="submitChange(handleType)">确定</span>
        </div>
        <span class="close el-icon-close"
          @click="showMessageBox = false,submitInfo.isCustomerPay = false,isFirstPage = true"
          style="z-index:3;"></span>
      </div>
    </div>
    <div class="message"
      v-if="designShare">
      <div class="messageBox">
        <div class="title">工艺制版确认</div>
        <div class="inputBox">
          <div class="item"
            v-for="(item,key) in productDetailInfo"
            :key="key"
            style="margin-top:27px;">
            <span class="label">产品信息:</span>
            <div class="content">
              <span>{{item.product_code}}({{item.product_type}})</span>
              <el-checkbox-group v-model="item.checked">
                <el-checkbox v-for="(val,ind) in item.type"
                  :key="ind"
                  :label="val.type"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="footer">
          <span class="cancel"
            @click="designShare = false">取消</span>
          <span class="ok"
            @click="setCraftStatu">确定</span>
        </div>
        <span class="close el-icon-close"
          @click="designShare = false"></span>
      </div>
    </div>
    <!-- 点击去修改样品时候的弹窗 -->
    <div class="message"
      v-show="handleType === 'changeSample' || handleType === 'changeSample_change'">
      <div class="messageBox">
        <div class="title">请选择你要修改的产品<span @click="orderStatus(10)"
            v-if="handleType === 'changeSample'"
            style="color:#1a95ff;cursor: pointer;margin-left:20px;">无需修改</span></div>
        <div class="inputBox"
          style="padding: 20px 0;">
          <div class="item">
            <el-radio-group v-model="submitInfo.changeSamplePro">
              <el-radio v-for="item in productDetailInfo"
                :key="item.product_id"
                style="color:#999;margin:0.5em 0;"
                :label="item.product_id + '?type=' + (item.detail ? item.detail.type : '' )">{{item.detail ? item.detail.product_code : ''}}({{item.detail ?(item.detail.category_info.product_category + '/' + item.detail.type_name + '/' + item.detail.style_name + (item.detail.flower_id ? '/' + item.detail.flower_id : '')) : ''}})</el-radio>
            </el-radio-group>
            <!-- /index/productUpdate/41?type=2 -->
          </div>
        </div>
        <div class="footer">
          <span class="cancel"
            @click="handleType = 'ok',showMessageBox = false">取消</span>
          <span class="ok"
            @click="submitInfo.changeSamplePro ? $router.push('/index/productUpdate/' + submitInfo.changeSamplePro) : $message.warning('请选择要修改的样品')">去修改</span>
        </div>
        <span class="close el-icon-close"
          style="z-index:3;"
          @click="handleType = 'ok',showMessageBox = false"></span>
      </div>
    </div>
    <!-- 点击去修改工艺单时候的弹窗 -->
    <div class="message"
      v-show="handleType === 'changeCraft'">
      <div class="messageBox">
        <div class="title">请选择你要修改的工艺单<span @click="orderStatus(11)"
            style="color:#1a95ff;cursor: pointer;margin-left:20px;">无需修改</span></div>
        <div class="inputBox"
          style="padding: 20px 0;">
          <div class="item">
            <el-radio-group v-model="submitInfo.changeCraft">
              <template v-for="(value) in productDetailInfo">
                <el-radio v-for="item in (value.detail ? value.detail.craft_info : [])"
                  :key="item.id"
                  style="color:#999;margin:0.5em 0;"
                  :label="item.id">{{item.craft_code}}(创建于:{{item.create_time}})</el-radio>
              </template>
            </el-radio-group>
          </div>
        </div>
        <div class="footer">
          <span class="cancel"
            @click="handleType = 'ok'">取消</span>
          <span class="ok"
            @click="submitInfo.changeCraft ? $router.push('/index/designFormUpdate/' + submitInfo.changeCraft) : $message.waring('请选择要修改的工艺单')">去修改</span>
        </div>
        <span class="close el-icon-close"
          style="z-index:3;"
          @click="handleType = 'ok'"></span>
      </div>
    </div>
    <!-- 点击去修改样品时候的弹窗 -->
    <div class="message"
      v-show="handleType === 'changePlan'">
      <div class="messageBox">
        <div class="title">请选择你要修改的配料单<span @click="orderStatus(12)"
            style="color:#1a95ff;cursor: pointer;margin-left:20px;">无需修改</span></div>
        <div class="inputBox"
          style="padding: 20px 0;">
          <div class="item">
            <el-radio-group v-model="submitInfo.changePlan">
              <template v-for="(value) in productDetailInfo">
                <el-radio v-for="item in (value.detail ? value.detail.product_plan_info : [])"
                  :key="item.id"
                  style="color:#999;margin:0.5em 0;"
                  :label="item.id">{{item.plan_code}}(创建于:{{item.create_time}})</el-radio>
              </template>
            </el-radio-group>
          </div>
        </div>
        <div class="footer">
          <span class="cancel"
            @click="handleType = 'ok'">取消</span>
          <span class="ok"
            @click="submitInfo.changePlan ? $router.push('/index/productPlanUpdate/' + submitInfo.changePlan) : $message.warning('请选择需要修改的配料单')">去修改</span>
        </div>
        <span class="close el-icon-close"
          style="z-index:3;"
          @click="handleType = 'ok'"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetailNew, rawMaterialOrderInit, productionDetail, packagNumberDetail, orderCheck, orderCancleLog, orderMaterialSotckDetail, orderSave, porductOne, orderList, isCheckedPlanAndCraft, confirmCraft } from '@/assets/js/api.js'
// import { orderDetailNew, rawMaterialOrderInit, productionDetail, packagNumberDetail, orderCheck, orderCancleLog, orderMaterialSotckDetail, orderSave, porductOne} from '@/assets/js/api.js'
import { moneyArr } from '@/assets/js/dictionary.js'
export default {
  data () {
    return {
      logList: [],
      firstCancle: false,
      showMsg: false,
      showLoading: false,
      showStep: false,
      stepTitle: ['物料结余', '确认提交'],
      stepContent: ['该样单已经订购过以下物料，请按实际情况填写物料剩余数量。', '警告！执行取消样单操作后会导致该样单无法继续执行相关生产操作，是否确认取消样单？'],
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
      packOrderList: [], // 包装样购
      showMessageBox: false,
      handleType: 'ok',
      submitInfo: {
        sampleType: '',
        isCustomerPay: false,
        isStockForMaterial: true,
        sample_complete_time: '',
        sampleIdea: '',
        createProInfo: [{
          sample_odd: '',
          design_odd: '',
          plan_odd: ''
        }],
        changeSamplePro: '',
        changeCraft: '',
        changePlan: ''
      },
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
      }], // 样单类型
      design: [], // 制版工艺
      productInfo: [], // 样单产品数据
      isFirstPage: true,
      designShare: false,
      productDetailInfo: [], // 产品详情
      lock: true,
      sample_order_list: [], // 多次打样信息
      isOK: false // 判断流程是否全部完成
    }
  },
  methods: {
    // 获取已用时间
    getUseTime (startTime, endTime) {
      let start = new Date(startTime).getTime()
      let end = endTime ? new Date(endTime).getTime : new Date().getTime()
      let useTime = (start - end) / 1000 / 60
      return parseInt(useTime / 60) + '小时' + parseInt(useTime % 60) + '分钟'
    },
    // 刷新页面
    reloadPage (id) {
      this.$router.push('/index/sampleOrderDetail/' + id)
      window.location.reload()
    },
    getSampleOrderList (code) {
      orderList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'type': 2,
        'inside_order_code': code
      }).then(res => {
        this.sample_order_list = res.data.data.sort((itemA, itemB) => {
          return Number(itemA.id) > Number(itemB.id)
        })
      })
    },
    //
    setCraftStatu () {
      let data = this.productDetailInfo.map(item => {
        return {
          product_code: item.product_code,
          status_craft: ((item.checked.indexOf('工艺') !== -1) ? 2 : 1),
          status_print: ((item.checked.indexOf('制版') !== -1) ? 2 : 1)
        }
      })
      confirmCraft({
        data: data
      }).then(res => {
        if (res.data.status) {
          this.$message.success('修改成功')
          window.location.reload()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getCraftInfo (item, key) {
      if (!item) {
        return []
      } else {
        let flag = this.productDetailInfo.find(vals => vals.product_id === item)
        if (flag) {
          return flag.detail[key]
        } else {
          return []
        }
      }
    },
    submitChange (type) {
      if (this.lock) {
        this.lock = false
        let dataPro = this.submitInfo.isCustomerPay ? this.productInfo.map(vals => {
          return {
            order_id: this.$route.params.id,
            product_code: vals.product_code,
            size: vals.size,
            color: vals.color,
            price: vals.price,
            number: vals.totalNum,
            total_price: vals.total_price
          }
        }) : null
        if (type === 'ok') {
          let data = this.submitInfo.createProInfo.filter(items => items.sample_odd).map(items => {
            return {
              product_id: items.sample_odd,
              craft_id: items.design_odd,
              plan_id: items.plan_odd,
              product_code: this.productDetailInfo.find(val => val.product_id === items.sample_odd).detail.product_code
            }
          })
          isCheckedPlanAndCraft({
            data_client_info: dataPro,
            data: data,
            order_id: this.$route.params.id
          }).then(res => {
            this.lock = true
            this.showMessageBox = false
            if (res.status) {
              this.$message.success({
                message: '确认成功,即将刷新页面。'
              })
              setTimeout(() => {
                window.location.reload()
              }, 800)
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
          })
        } else if (type === 'change') {
          let batchInfo = []
          this.productInfo.forEach(item => {
            let flagPro = batchInfo.find(val => val.productCode === item.product_code)
            if (!flagPro) {
              batchInfo.push({
                productCode: item.product_code,
                size: [{
                  name: [item.size, item.color],
                  unitPrice: null,
                  numbers: item.number
                }]
              })
            } else {
              let flagSizeColor = flagPro.size.find(val => val.name[0] === item.size && val.name[1] === item.color)
              if (!flagSizeColor) {
                flagPro.size.push({
                  name: [item.size, item.color],
                  unitPrice: null,
                  numbers: item.number
                })
              }
            }
          })
          if (!this.submitInfo.sampleType && this.submitInfo.sampleType !== 0) {
            this.$message.error('请选择样单类型')
            this.lock = true
            return
          }
          if (!this.submitInfo.sample_complete_time) {
            this.$message.error('请选择样单完成时间')
            this.lock = true
            return
          }
          let data = {
            data_client_info: dataPro, // 客户是否付费
            id: null,
            company_id: window.sessionStorage.getItem('company_id'),
            user_id: window.sessionStorage.getItem('user_id'),
            order_code: this.order_info.order_code,
            inside_order_code: this.order_info.inside_order_code,
            group_id: this.order_info.group_id,
            client_id: this.order_info.client_id,
            contacts: this.order_info.contacts_id,
            account_unit: null,
            exchange_rate: null,
            tax_rate: null,
            order_time: this.getTime(new Date()),
            order_info: [{
              batch_id: 1,
              batch_info: batchInfo,
              delivery_time: this.submitInfo.sample_complete_time
            }],
            sample_order_type: this.submitInfo.sampleType,
            total_price: null,
            remark: this.submitInfo.sampleIdea,
            total_price_RMB: null,
            order_contract: this.order_info.order_contract ? JSON.stringify(this.order_info.order_contract) : null,
            pack_means: this.order_info.pack_means ? JSON.stringify(this.order_info.pack_means) : null,
            store_means: this.order_info.store_means ? JSON.stringify(this.order_info.store_means) : null,
            other_info: this.order_info.others_info ? JSON.stringify(this.order_info.others_info) : null,
            type: 2
          }
          orderSave(data).then((res) => {
            this.lock = true
            if (res.data.status) {
              this.$message.success({
                message: '修改成功'
              })
              if (res.data && res.data.data) {
                this.$router.push('/index/sampleOrderDetail/' + res.data.data.id)
                window.location.reload()
              }
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
          })
        } else if (type === 'waitConfirm') {

        }
      }
    },
    showMessage (type) {
      if (type === 'cancle') { // 取消样单
        this.showStep = true
        // } else if (type === 'yes') {
        //   this.orderStatus(1)
      } else if (type === 'change') { // 确认并再次打样
        this.$confirm('是否需要修改样品信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleType = 'changeSample_change'
          this.showMessageBox = true
          // this.handleType = type
        }).catch(() => {
          this.showMessageBox = true
          this.handleType = type
        })
      } else if (type === 'addOrder') { // 确认并进行添加订单
        this.orderStatus(1, true, true) // 后面的true是为了判断是否需要跳转至添加订单页面
      } else if (type === 'ok') { // 确认并转成产品
        this.$confirm('是否需要将样品转为产品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showMessageBox = true
          this.handleType = type
        }).catch(() => {
          this.orderStatus(1, true)
        })
      } else if (type === 'waitConfirm') { // 等待用户确认
        this.orderStatus(1, false)
      }
    },
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
    orderStatus (state, clientConfirm, goOrder) {
      let filterArr = ['', '样单状态', '样单生产状态', '样单物料状态', '样单检验状态', '样单收发状态', '样单出库状态', '', '', '', '申请流程样品状态', '申请流程工艺单状态', '申请流程配料单状态']
      if (state < 8) {
        this.$confirm('该操作将直接修改' + filterArr[state] + ',你无法再对该样单的相关步骤进行操作, 请确认是否修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          orderCheck({
            id: this.$route.params.id,
            company_id: window.sessionStorage.getItem('company_id'),
            type: state,
            product_data: [],
            material_data: [],
            client_confirm: clientConfirm
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
              if (goOrder) {
                this.$router.push('/index/orderCreate')
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
      } else if (state === '8' || state === '9') {
        if (state === '8') {
          if (this.order_info.status !== 2) {
            this.showStep = true
          } else {
            this.$message.error({
              message: '该样单已取消，请勿重复操作'
            })
          }
        }
        if (state === '9') {
          this.showStep = true
        }
      } else {
        this.$confirm('该操作将直接修改' + filterArr[state] + ',你无法再对该样单的相关步骤进行操作, 请确认是否修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          orderCheck({
            id: this.$route.params.id,
            company_id: window.sessionStorage.getItem('company_id'),
            type: 9,
            sample_order_apply_status: state,
            product_data: [],
            material_data: []
          }).then((res) => {
            if (res.data.status) {
              this.$message.success({
                message: '修改成功'
              })
              this.order_info.sample_order_apply_status = state
              this.handleType = 'ok'
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
    // 取消样单
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
            remark: '样单取消结余',
            storage_time: this.getTime(new Date()),
            stock_number: item.number ? item.number : 0,
            company_id: window.sessionStorage.getItem('company_id'),
            color: item.size.split('/')[1],
            size: item.size.split('/')[0],
            order_code: this.order_info.order_code,
            product_id: item.product_info.category_info.product_id
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
    // 样单金额
    moneyCmp () {
      return moneyArr.find((itemFind) => itemFind.name === this.order_info.account_unit).sign + this.order_info.total_price.toLocaleString()
    },
    // 样单状态
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
    // 样单状态的样式
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
    // 转换中文数字
    filterChinese (item) {
      let chinese = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      return chinese[item]
    },
    // 物料合计费用
    filterTotal (item) {
      let price = 0
      if (item.processType) {
        item.processType.forEach(val => {
          price += Number(val.total_price_process)
        })
      }
      price += Number(item.total_price_order)
      return price
    },
    // 生产合计费用
    filterPrice (item) {
      let price = 0
      if (item.processType) {
        item.processType.forEach(val => {
          price += Number(val.total_price_semiProcess)
        })
      }
      price += Number(item.total_price_weave)
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
    }), orderMaterialSotckDetail({
      order_id: this.$route.params.id
    })]).then((res) => {
      const data = res[0].data.data
      this.order_info = data.order_info
      // this.order_info.fileArr = this.order_info.file_url ? JSON.parse(this.order_info.file_url) : []
      this.order_log = data.order_log
      this.process = data.order_schedule
      this.logList = res[4].data.data.map((item) => {
        item.material_info = this.jsonMerge(item.material_info, ['material_name'])
        item.product_info = this.jsonMerge(item.product_info, ['product_id'])
        return item
      })
      this.surplus = res[5].data.data // 该订单结余物料
      for (let key in this.process) {
        this.process[key] = this.process[key] > 100 ? 100 : this.process[key].toFixed(1)
      }
      // 整理时间线 并排序
      for (let prop in this.order_info.order_batch) {
        let item = this.order_info.order_batch[prop]
        this.timeAxis.push({
          name: '第' + prop + '批',
          time: item[0].delivery_time
        })
      }
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
        // 出库数值统计不了,根据样单状态来确定
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
      // 制版工艺初始化及初始化产品信息
      for (let prop in this.order_info.order_batch) {
        let valBat = this.order_info.order_batch[prop]
        valBat.forEach(valPro => {
          // 初始化制版工艺
          // if (!this.design.find(item => item.category_info.product_id === valPro.category_info.product_id)) {
          //   this.design.push({
          //     ...valPro

          //   })
          // }
          // 初始化产品信息
          let flagPro = this.productInfo.find(item => (item.product_id === valPro.category_info.product_id && item.size === valPro.size && item.color === valPro.color))
          if (!flagPro) {
            this.productInfo.push({
              product_code: valPro.product_code,
              product_id: valPro.category_info.product_id,
              product_type: valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name,
              size: valPro.size,
              color: valPro.color,
              unit: valPro.category_info.unit,
              number: 0,
              sizeColor: valPro.size + '/' + valPro.color,
              payMoneyNumber: '',
              price: '',
              total_price: ''
            })
          }
          // 初始化产品详情
          let flagProNew = this.productDetailInfo.find(item => item.product_id === valPro.category_info.product_id)
          if (!flagProNew) {
            this.productDetailInfo.push({
              product_id: valPro.category_info.product_id,
              product_code: valPro.product_code,
              product_type: valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name,
              checked: [],
              type: [
                {
                  type: '工艺',
                  user_name: '',
                  status: '',
                  time: ''
                }, {
                  type: '制版',
                  user_name: '',
                  status: '',
                  time: ''
                }
              ]
            })
          }
        })
      }
      // 物料概述
      let materialInfo = res[1].data.data
      let processInfo = this.order_log.material_production
      let outStockInfo = [].concat(this.order_log.material_push_z, this.order_log.material_push_f)
      let inStockInfo = [].concat(this.order_log.material_pop_z, this.order_log.material_pop_f)
      let materialPageInfo = this.order_log.material_order
      // 物料计划值
      // materialInfo.material_info.forEach(item => {
      for (let prop in materialInfo.material_info) {
        // for (let prop in item) {
        let item = materialInfo.material_info[prop]
        let flag = this.materialList.find(key => key.material_name === prop)
        if (!flag) {
          this.materialList.push({
            material_name: prop,
            unit: item.unit === '克' ? 'kg' : (item.unit === 'g' ? 'kg' : item.unit),
            plan_number: (item.unit === '克' || item.unit === 'g') ? (item.total_number / 1000) : item.total_number
          })
        } else {
          flag.plan_number = Number(flag.plan_number) + Number((item.unit === '克' || item.unit === 'g') ? (item.total_number / 1000) : item.total_number)
        }
      }
      // })
      // 物料加工值，样购值
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
      // 物料样购值
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
              total_price_process: item.price * num,
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
        }
      })
      // 更新产品数据
      this.productDetailInfo.forEach(item => {
        porductOne({
          id: item.product_id
        }).then(res => {
          let item = this.productDetailInfo.find(val => Number(val.product_id) === Number(res.data.data.id))
          if (item) {
            item.detail = res.data.data
            if (!item.detail.craft_info) {
              item.detail.craft_info = []
            }
            if (!item.detail.product_plan_info) {
              item.detail.product_plan_info = []
            }
            if (Object.prototype.toString.call(item.detail.craft_info) === '[object Object]') {
              item.detail.craft_info = [item.detail.craft_info]
            }
            if (Object.prototype.toString.call(item.detail.product_plan_info) === '[object Object]') {
              item.detail.product_plan_info = [item.detail.product_plan_info]
            }
            item.type.find(vals => vals.type === '工艺').status = (res.data.data.status_craft === 2)
            item.type.find(vals => vals.type === '制版').status = (res.data.data.status_print === 2)
            if (res.data.data.status_craft === 2) {
              item.checked.push('工艺')
            }
            if (res.data.data.status_print === 2) {
              item.checked.push('制版')
            }
          }
        })
      })
      // 样单取消的时候需要拿物料样购日志（分颜色），下单产品信息（分尺码颜色）
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
      for (let prop in this.order_info.order_batch) {
        let itemBacth = this.order_info.order_batch[prop]
        itemBacth.forEach(itemPro => {
          const finded = this.productDetail.find((itemFind) => itemFind.productCode === itemPro.product_code && itemFind.size === (itemPro.size + '/' + itemPro.color))
          if (!finded) {
            this.productDetail.push({
              product_info: itemPro,
              id: itemPro.id,
              number: '',
              cost: itemPro.unit_price,
              productCode: itemPro.product_code,
              size: itemPro.size + '/' + itemPro.color,
              unit: itemPro.category_info.unit,
              type: itemPro.category_info.category_name + '/' + itemPro.category_info.type_name + '/' + itemPro.category_info.style_name
            })
          }
        })
      }
      this.productPriceList = this.order_info.order_batch
      // 获取多次打样信息
      this.getSampleOrderList(this.order_info.inside_order_code)
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
  .messageBox {
    overflow: hidden;
    padding: 0;
    .inputBox {
      width: 100%;
      height: calc(100% - 100px);
      overflow-y: scroll;
      margin: 50px 0px;
      padding: 0 46px;
      box-sizing: border-box;
    }
    .title {
      line-height: 50px;
      height: 50px;
      width: inherit;
      padding-left: 16px;
      border-bottom: 1px solid rgb(233, 233, 233);
      background: #fff;
      z-index: 2;
    }
    .footer {
      background: #fff;
      z-index: 2;
    }
    .addBtn {
      position: absolute;
      bottom: -38px;
      width: 74px;
      height: 29px;
      border: 1px solid #1a95ff;
      border-radius: 4px;
      text-align: center;
      color: #1a95ff;
      line-height: 29px;
      cursor: pointer;
      &.deleteBtn {
        color: #ee3f59;
        border-color: #ee3f59;
      }
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
  .sampleCtn {
    display: flex;
    flex-direction: column;
    .catBtn {
      width: 100%;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
      display: flex;
      justify-content: flex-start;
      margin-bottom: 37px;
      height: 32px;
      & > span {
        margin-right: 2px;
        width: 88px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        box-sizing: border-box;
        cursor: pointer;
        border: 1px solid rgba(233, 233, 233, 1);
        border-bottom: none;
        background: rgba(247, 247, 247, 1);
        border-radius: 4px 4px 0px 0px;
        font-size: 14px;
        &:hover,
        &.active {
          color: #1a95ff;
          background: #fff;
          height: 33px;
        }
      }
    }
    .applyProcess,
    .applyInfo {
      width: 1260px;
      border: 1px solid #ddd;
      border-radius: 3px 3px 0px 0px;
      .title {
        border-bottom: 1px solid #ddd;
        line-height: 44px;
        box-sizing: border-box;
        background: rgba(250, 250, 250, 1);
        padding-left: 46px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 16px;
      }
      .info {
        padding: 40px 96px 36px 83px;
        display: flex;
        .item-info {
          display: flex;
          .items {
            flex: 1;
            padding-left: 6em;
            position: relative;
            min-height: 40px;
            .label {
              position: absolute;
              display: inline-block;
              width: 6em;
              height: 40px;
              line-height: 40px;
              top: 0;
              left: 0;
            }
            .content {
              display: flex;
              width: auto;
              height: 40px;
              line-height: 40px;
            }
            .success {
              color: #67c23a;
            }
            .error {
              color: #ee3f59;
            }
            .running {
              color: #1a95ff;
            }
          }
        }
        .item {
          display: flex;
          flex: 1;
          &:first-child {
            .leftBorder {
              background: transparent !important;
            }
          }
          &:last-child {
            flex: none;
            .border {
              background: transparent !important;
            }
          }
          .borderCtn {
            width: 100%;
            position: static;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .leftBorder {
              width: 28px;
              height: 2px;
              background: #e9e9e9;
            }
            .circle {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #e9e9e9;
            }
            .border {
              width: 100%;
              height: 2px;
              background: #e9e9e9;
            }
            .isOk {
              background: #1a95ff;
            }
          }
          & > span {
            font-size: 12px;
            margin-top: 14px;
            &:first-of-type {
              font-size: 14px;
              font-weight: 500;
            }
            &:last-child {
              margin-top: 8px;
            }
          }
        }
      }
      .row {
        justify-content: space-between;
      }
      .col {
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .item {
    .content {
      width: 100%;
      display: flex;
      .elInput {
        flex: 1;
        &.marginRight {
          margin-right: 8px;
        }
      }
    }
  }
  .success {
    color: #67c23a;
  }
  .change {
    color: #e6a23c;
  }
  .cancle {
    color: #ee3f59;
  }
  .el-carousel__arrow {
    background: #1a95ff;
  }
  //操作按钮重写
  .editMenu {
    width: auto;
    background: #1a95ff;
    height: 32px;
    border-radius: 4px;
    .el-submenu {
      width: auto;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-submenu__title {
        width: 100%;
        padding: 0 8px;
        line-height: 32px;
        height: 100%;
        border-bottom: none;
        padding: none;
        color: #fff;
        i {
          color: #fff;
        }
        &:hover {
          background: transparent !important;
        }
      }
    }
  }
}
//操作按钮重写
.elMenuItem {
  color: #999 !important;
  &.is-active {
    color: #999 !important;
    .el-submenu__title {
      color: #999 !important;
    }
  }
  &:hover {
    background: #1a95ff !important;
    color: #fff !important;
    .el-submenu__title:hover {
      background: transparent !important;
      color: #fff !important;
      i {
        color: #fff;
      }
    }
  }
}
.el-popover {
  padding: 40px 1em 20px;
  box-sizing: border-box;
  .popover-title {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 1em;
    line-height: 40px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    & > .status {
      color: #aaa;
      &::before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #aaa;
        border-radius: 50%;
        margin-right: 8px;
      }
      &.ok {
        color: #67c23a !important;
        &::before {
          background: #67c23a !important;
        }
      }
    }
  }
  .useTime {
    height: 40px;
    line-height: 40px;
    padding: 0;
    margin: 0;
  }
  .hurry {
    color: #1a95ff;
    cursor: pointer;
  }
}
</style>
