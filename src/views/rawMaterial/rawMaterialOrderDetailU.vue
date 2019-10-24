<template>
  <div id="rawMaterialOrderDetail"
    v-loading="loading">
    <div class="head">
      <h2>{{type === '0' ? '原' : '辅'}}料详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单基本信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号：</span>
            <span class="content important"
              @click="$router.push('/index/orderDetail/' + $route.params.id)">{{orderInfo.order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司：</span>
            <span class="content">{{orderInfo.client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期：</span>
            <span class="content">{{orderInfo.order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组：</span>
            <span class="content">{{orderInfo.group_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品信息:</span>
            <span class="content">
              <ul class="productInfo">
                <li v-for="(item,key) in productList"
                  :key="key">
                  <span @click="$router.push('/index/productDetail/' + item.product_id)">{{item.product_code}}({{item.type}})</span>
                  <span>{{item.product_size+'/'+item.product_color}}</span>
                  <span>{{item.number+'条'}}</span>
                  <span v-if="item.state===0"
                    @click="$router.push('/index/productPlanCreate/' + item.product_id)">配料单信息缺失(点击添加)</span>
                  <span v-if="item.state===1"
                    @click="$router.push('/index/productPlanUpdate/' + item.product_plan_id)">配料单配色缺失(点击补充)</span>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料信息统计</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding"
            v-if="materialList.length > 0">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>计划原料</span>
                  <span class="flex2">
                    <span>{{type==='0'?'颜色':'属性'}}</span>
                    <span class="flex08">数量</span>
                  </span>
                  <span>总计划</span>
                  <span>已订购</span>
                  <span>已调取</span>
                  <!-- <span>已加工</span> -->
                </li>
                <li class="content"
                  v-for="(item,key) in materialList"
                  :key="key">
                  <span class="tableRow">{{item.material}}</span>
                  <span class="flex2 col tableRow">
                    <span v-for="(val,ind) in item.need"
                      :key="ind"
                      class="tableColumn">
                      <span class="tableRow">{{val.name}}</span>
                      <span class="tableRow flex08">{{val.value|fixedFilter}}{{item.unit}}</span>
                    </span>
                  </span>
                  <span class="tableRow">{{(item.total_weight ? item.total_weight : 0)|fixedFilter}}{{item.unit}}</span>
                  <span class="tableRow">{{(item.order_weight ? item.order_weight : 0)|fixedFilter}}{{item.unit}}</span>
                  <span class="tableRow">{{(item.stock_weight ? item.stock_weight : 0)|fixedFilter}}{{item.unit}}</span>
                  <!-- <span class="tableRow">{{(item.process_weight ? item.process_weight : 0)|fixedFilter}}{{item.unit}}</span> -->
                </li>
              </ul>
            </div>
          </div>
          <div v-else
            class="inputCtn noPadding"
            style="margin-left: 40px;color:#E6A23C">该订单不需要{{type === '0' ? '原': '辅'}}料，请检查配料单是否填写正确！</div>
        </div>
      </div>
      <div class="stepCtn"
        v-if="stockList.length>0">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料库存信息
          <i class="el-icon-message-solid"
            :class="{'active':msgFlag.KCDQ}"
            @click="showMsg.KCDQ = true"></i>
        </div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <div class="tabCtn">
                <div class="tab"
                  v-for="(item,index) in stockList"
                  :key="index"
                  @click="stockActive=index"
                  :class="{'active':index===stockActive}">{{item.material_name}}</div>
              </div>
              <ul class="tablesCtn">
                <li class="title">
                  <span>仓库</span>
                  <span>原料颜色</span>
                  <span>原料属性</span>
                  <span>批/缸号</span>
                  <span>库存数量</span>
                  <span>操作</span>
                </li>
                <li class="content"
                  v-for="(item,index) in stockList[stockActive].info"
                  :key="index">
                  <span class="tableRow">{{item.stock_name}}</span>
                  <span class="tableRow">{{item.material_color}}</span>
                  <span class="tableRow">{{item.type}}</span>
                  <span class="tableRow">{{item.vat_code}}</span>
                  <span class="tableRow">{{item.total_weight}}</span>
                  <span class="tableRow">
                    <span style="cursor:pointer;color:#1A95FF"
                      @click="getStock(item)">调取</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料调拨信息
          <i class="el-icon-message-solid"
            :class="{'active':msgFlag.WLDG}"
            @click="showMsg.WLDG = true"></i>
        </div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span class="flex104 tableRow">
                    <span class="tableColumn">
                      <span class="flex17">调拨来源</span>
                      <span class="flex43">
                        <span class="flex17">原料名称</span>
                        <span class="flex26">
                          <span>{{type==='0'?'颜色':'属性'}}</span>
                          <span>单价</span>
                          <span>数量</span>
                        </span>
                      </span>
                      <span>总价</span>
                      <span>完成日期</span>
                      <span>操作</span></span>
                  </span>
                </li>
                <li v-for="(value,index) in orderList"
                  :key="index"
                  class="content">
                  <span class="flex17 tableRow"
                    style="flex-direction:column">
                    <span style="height:25px;"
                      :style="{'color':value.where==='调取'?'#E6A23C':'#67C23A'}">{{value.where}}</span>
                    <span style="line-height:25px">{{value.company}}</span>
                  </span>
                  <span class="flex43 tableRow col">
                    <span v-for="(iten,kay) in value.materials"
                      :key="kay"
                      class="tableColumn">
                      <span class="flex17 tableRow">{{iten.material}}</span>
                      <span class="flex26 col">
                        <span v-for="(content,number) in iten.colors"
                          :key="number"
                          class="tableColumn">
                          <span class="tableRow">{{content.color}}</span>
                          <span class="tableRow">{{content.price|fixedFilter}}{{'元/' + content.unit}}</span>
                          <span class="tableRow">{{content.value|fixedFilter}}{{content.unit}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="tableRow">{{value.total_price|fixedFilter}}{{'元'}}</span>
                  <span class="tableRow">{{value.create_time}}</span>
                  <span class="blue tableRow"
                    @click="open('table',$route.params.id,'',value.company)">打印</span>
                </li>
                <li class="addLine">
                  <span class="add"
                    v-show="!DGFlag"
                    @click="addOperation('DG')"><i class="el-icon el-icon-plus"></i>订购{{type==='0'?'原':'辅'}}料</span>
                  <span v-show="DGFlag"
                    class="save"
                    @click="saveOperation('DG')"><i class="el-icon el-icon-folder-checked"></i>确认订购</span>
                  <span v-show="DGFlag && type==='0'"
                    class="set"
                    @click="setOperation('DG','色纱')"><i class="el-icon el-icon-shopping-cart-full"></i>一键订购(色纱)</span>
                  <span v-show="DGFlag&& type==='0'"
                    class="set"
                    @click="setOperation('DG','白胚')"><i class="el-icon el-icon-shopping-cart-full"></i>一键订购(白胚)</span>
                  <span v-show="DGFlag&& type==='1'"
                    class="set"
                    @click="setOperation('DG','辅料')"><i class="el-icon el-icon-shopping-cart-full"></i>一键订购</span>
                  <span v-show="DGFlag"
                    class="cancle"
                    @click="cancleOperation('DG')"><i class="el-icon el-icon-close"></i>取消</span>
                </li>
                <div class="logList"
                  @click="orderLogFlag = !orderLogFlag">{{ orderLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="orderLogFlag">
                <div>
                  <li>
                    <span class="flexMid">订购属性</span>
                    <span class="flexBig">完成日期</span>
                    <span class="flexBig">订购来源</span>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexMid">{{type==='0'?'颜色':'属性'}}</span>
                    <span class="flexMid">单价</span>
                    <span class="flexMid">重量</span>
                    <span class="flexMid">总价</span>
                    <span class="flexBig">备注</span>
                    <span class="flexMid">操作人</span>
                    <span style="flex:0.5">操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="orderLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in orderLog"
                    :key="item.time + key">
                    <span class="flexMid"
                      :style="{'color':item.replenish_id?'#F56C6C':item.where==='订购'?'#67c23a':'#E6A23C'}">{{item.replenish_id?'补充':item.where}}</span>
                    <span class="flexBig">{{item.order_time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.price|fixedFilter}}{{'元/' + item.unit}}</span>
                    <span class="flexMid">{{item.weight|fixedFilter}}{{item.unit}}</span>
                    <span class="flexMid">{{item.total_price|fixedFilter}}{{'元'}}</span>
                    <span class="flexBig remark">
                      <i>
                        {{item.remark ? item.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                          title="备注信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(item.remark) > 15"
                          :content="item.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span class="flexMid">{{item.user}}</span>
                    <span style="flex:0.5"
                      @click="deleteDGLog(item.id)"><span style="color:#F56C6C;cursor:pointer">删除</span></span>
                  </li>
                </div>
              </ul>
              <div class="buyInfo">
                <ul class="buyFrom"
                  v-for="(item,index) in WLDG"
                  :key="index">
                  <li>
                    <span>选择{{type==='0'?'原':'辅'}}料:</span>
                    <el-select v-model="item.material_name"
                      @change="selectColor($event,index,'DG')">
                      <el-option v-for="itemOpt in materialList"
                        :key="itemOpt.material"
                        :label="itemOpt.material"
                        :value="itemOpt.material">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span>订购公司:</span>
                    <el-select v-if="type==='0'"
                      v-model="item.client_id"
                      filterable>
                      <el-option v-for="itemOpt in clientList.YLDGList"
                        :key="itemOpt.id"
                        :label="itemOpt.name"
                        :value="itemOpt.id">
                      </el-option>
                    </el-select>
                    <el-select v-if="type==='1'"
                      v-model="item.client_id"
                      filterable>
                      <el-option v-for="itemOpt in clientList.FLDGList"
                        :key="itemOpt.id"
                        :label="itemOpt.name"
                        :value="itemOpt.id">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span>单价:</span>
                    <el-input size="small"
                      placeholder="单价"
                      v-model="item.price">
                    </el-input>
                    <i>元</i>
                  </li>
                  <li class="col">
                    <div v-for="(itemMaterial,indexMaterial) in item.materialArr"
                      :key="indexMaterial">
                      <span>{{type === '0' ? '原': '辅'}}料{{indexMaterial+1}}:</span>
                      <div>
                        <el-select v-model="itemMaterial.color_code"
                          :placeholder="type==='0'?'颜色':'属性'"
                          size="small"
                          :no-data-text="'还未选择'+ (type==='0'?'原料':'辅料')">
                          <el-option v-for="itemColor in item.needColor"
                            :key="itemColor.name"
                            :label="itemColor.name"
                            :value="itemColor.name">
                          </el-option>
                        </el-select>
                        <strong>—</strong>
                        <el-input size="small"
                          placeholder="数量"
                          v-model="itemMaterial.total_weight">
                        </el-input>
                      </div>
                      <em v-if="indexMaterial===0"
                        class="el-icon-plus"
                        @click="addColor('DG',index)"></em>
                      <em v-if="indexMaterial>0"
                        class="el-icon-minus"
                        @click="deleteColor('JG',index,indexMaterial)"></em>
                    </div>
                  </li>
                  <li>
                    <span>完成日期:</span>
                    <el-date-picker v-model="item.complete_time"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      size="small"
                      style="width:243px"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </li>
                  <li>
                    <span>备注:</span>
                    <el-input type="textarea"
                      placeholder="请输入内容"
                      style="width:243px;margin: 0 0 0 15px;height:45px;"
                      v-model="item.desc">
                    </el-input>
                  </li>
                  <span class="el-icon-close"
                    @click="closeBox('DG',index)"></span>
                </ul>
                <ul v-show="DGFlag"
                  class="buyFrom addBtn"
                  @click="addOperation('DG')">
                  <span><i class="el-icon el-icon-plus"></i>添加{{type==='0'?'原':'辅'}}料</span>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料加工信息
          <i class="el-icon-message-solid"
            :class="{'active':msgFlag.WLJG}"
            @click="showMsg.WLJG = true"></i>
        </div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>加工类型</span>
                  <span class="flex104">
                    <span class="flex17">加工单位</span>
                    <span class="flex37">
                      <span class="flex17">原料名称</span>
                      <span class="flex2">
                        <span>{{type==='0'?'颜色':'属性'}}</span>
                        <span>数量</span>
                      </span>
                    </span>
                    <span>单价</span>
                    <span>总价</span>
                    <span>完成日期</span>
                    <span>操作</span>
                  </span>
                </li>
                <li v-if="processList.length === 0">暂无信息</li>
                <li v-for="(value,index) in processList"
                  :key="index"
                  class="content">
                  <span class="tableRow">{{value.process_type}}</span>
                  <span class="flex104 col tableRow">
                    <span v-for="(item,key) in value.companys"
                      :key="key"
                      class="tableColumn">
                      <span class="flex17 tableRow">{{item.company}}</span>
                      <span class="flex37 tableRow col">
                        <span v-for="(iten,kay) in item.materials"
                          :key="kay"
                          class="tableColumn">
                          <span class="flex17 tableRow">{{iten.material}}</span>
                          <span class="tableRow col flex2">
                            <span v-for="(content,number) in iten.colors"
                              :key="number"
                              class="tableColumn">
                              <span class="tableRow">{{content.color}}</span>
                              <span class="tableRow">{{content.value|fixedFilter}}{{content.unit}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span class="tableRow">{{item.price}}元</span>
                      <span class="tableRow">{{item.total_price|fixedFilter}}元</span>
                      <span class="tableRow">{{item.create_time}}</span>
                      <span class="blue tableRow"
                        @click="open('table',$route.params.id,'',item.company,value.process_type)">打印</span>
                    </span>
                  </span>
                </li>
                <li class="addLine">
                  <span class="add"
                    v-show="!JGFlag"
                    @click="addOperation('JG')"><i class="el-icon el-icon-plus"></i>加工{{type==='0'?'原':'辅'}}料</span>
                  <span v-show="JGFlag"
                    class="save"
                    @click="saveOperation('JG')"><i class="el-icon el-icon-folder-checked"></i>确认加工</span>
                  <span v-show="JGFlag"
                    class="set"
                    @click="setOperation('JG')"><i class="el-icon el-icon-shopping-cart-full"></i>一键加工</span>
                  <span v-show="JGFlag"
                    class="cancle"
                    @click="cancleOperation('JG')"><i class="el-icon el-icon-close"></i>取消</span>
                </li>
                <div class="logList"
                  @click="processLogFlag = !processLogFlag">{{ processLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="processLogFlag">
                <div>
                  <li>
                    <span class="flexBig">完成日期</span>
                    <span class="flexBig">加工单位</span>
                    <span>加工类型</span>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexMid">颜色</span>
                    <span class="flexMid">重量</span>
                    <span class="flexMid">单价</span>
                    <span class="flexBig">备注</span>
                    <span>操作人</span>
                    <span style="flex:0.5">操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="processLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in processLog"
                    :key="item.time + key">
                    <span class="flexBig">{{item.order_time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.process_type}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.weight|fixedFilter}}{{item.unit}}</span>
                    <span class="flexMid">{{item.price}}元</span>
                    <span class="flexBig remark">
                      <i>
                        {{item.remark ? item.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                          title="备注信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(item.remark) > 15"
                          :content="item.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span>{{item.user}}</span>
                    <span style="flex:0.5"
                      @click="deleteJGLog(item.id)"><span style="color:#F56C6C;cursor:pointer">删除</span></span>
                  </li>
                </div>
              </ul>
              <div class="buyInfo">
                <ul class="buyFrom"
                  style="height:456px;"
                  v-for="(item,index) in WLJG"
                  :key="index">
                  <li>
                    <span>选择{{type==='0'?'原':'辅'}}料:</span>
                    <el-select v-model="item.material_name"
                      @change="selectColor($event,index,'JG')">
                      <el-option v-for="itemOpt in materialList"
                        :key="itemOpt.material"
                        :label="itemOpt.material"
                        :value="itemOpt.material">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span>加工单位:</span>
                    <el-select v-if="type==='0'"
                      v-model="item.client_id"
                      filterable>
                      <el-option v-for="itemOpt in clientList.YLJGList"
                        :key="itemOpt.id"
                        :label="itemOpt.name"
                        :value="itemOpt.id">
                      </el-option>
                    </el-select>
                    <el-select v-if="type==='1'"
                      v-model="item.client_id"
                      filterable>
                      <el-option v-for="itemOpt in clientList.FLJGList"
                        :key="itemOpt.id"
                        :label="itemOpt.name"
                        :value="itemOpt.id">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span>加工步骤:</span>
                    <el-select v-model="item.process_type"
                      multiple
                      filterable>
                      <el-option v-for="itemOpt in machiningType"
                        :key="itemOpt.name"
                        :label="itemOpt.name"
                        :value="itemOpt.name">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span>单价:</span>
                    <el-input size="small"
                      placeholder="单价"
                      v-model="item.price">
                    </el-input>
                    <i>元</i>
                  </li>
                  <li class="col">
                    <div v-for="(itemMaterial,indexMaterial) in item.materialArr"
                      :key="indexMaterial">
                      <span>{{type === '0' ? '原': '辅'}}料{{indexMaterial+1}}:</span>
                      <div>
                        <el-select v-model="itemMaterial.color_code"
                          :placeholder="type==='0'?'颜色':'属性'"
                          size="small"
                          :no-data-text="'还未选择'+ (type==='0'?'原料':'辅料')">
                          <el-option v-for="itemColor in item.needColor"
                            :key="itemColor.name"
                            :label="itemColor.name"
                            :value="itemColor.name">
                          </el-option>
                        </el-select>
                        <strong>—</strong>
                        <el-input size="small"
                          placeholder="数量"
                          v-model="itemMaterial.total_weight">
                        </el-input>
                      </div>
                      <em v-if="indexMaterial===0"
                        class="el-icon-plus"
                        @click="addColor('JG',index)"></em>
                      <em v-if="indexMaterial>0"
                        class="el-icon-minus"
                        @click="deleteColor('JG',index,indexMaterial)"></em>
                    </div>
                  </li>
                  <li>
                    <span>完成日期:</span>
                    <el-date-picker v-model="item.complete_time"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      size="small"
                      style="width:243px"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </li>
                  <li>
                    <span>备注:</span>
                    <el-input type="textarea"
                      placeholder="请输入内容"
                      style="width:243px;margin: 0 0 0 15px;height:45px;"
                      v-model="item.desc">
                    </el-input>
                  </li>
                  <span class="el-icon-close"
                    @click="closeBox('JG',index)"></span>
                </ul>
                <ul v-show="JGFlag"
                  style="height:456px;"
                  class="buyFrom addBtn"
                  @click="addOperation('JG')">
                  <span><i class="el-icon el-icon-plus"></i>添加{{type==='0'?'原':'辅'}}料</span>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-if="bushaList.length>0">
        <div class="stepTitle">{{type==='0'?'补纱信息':'辅料补充信息'}}</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>次数</span>
                  <span style="flex:2">{{type==='0'?'原料名称':'辅料名称'}}</span>
                  <span>{{type==='0'?'颜色':'属性'}}</span>
                  <span>{{type==='0'?'重量':'数量'}}</span>
                  <span>已补量</span>
                  <span>订购总价</span>
                  <span>承担单位/比例</span>
                  <span>原因</span>
                  <span>操作时间</span>
                  <span>操作</span>
                </li>
                <li class="material_info"
                  v-for="(item,index) in bushaList"
                  :key="index">
                  <span>第 {{index+1}} 次</span>
                  <span class="col"
                    style="flex:6">
                    <span v-for="(itemYarn,indexYarn) in item.yarn_info"
                      :key="indexYarn">
                      <span style="flex:2">{{itemYarn.name}}</span>
                      <span class="col"
                        style="flex:3">
                        <span v-for="(itemColor,indexColor) in itemYarn.info"
                          :key="indexColor">
                          <span>{{itemColor.color}}</span>
                          <span>{{itemColor.weight}}{{type==='0'?'kg':''}}</span>
                          <span>{{itemColor.buchong?itemColor.buchong:0}}{{type==='0'?'kg':''}}</span>
                        </span>
                      </span>
                      <span>{{itemYarn.total_price}}元</span>
                    </span>
                  </span>
                  <span style="display:flex;flex-direction:column;justify-content: space-around;">
                    <span style="border:0;align-items:center"
                      v-for="(itemClient,indexClient) in item.client_info"
                      :key="indexClient">{{itemClient.client_name}}({{itemClient.percent}}%)</span>
                  </span>
                  <span>{{item.desc}}</span>
                  <span>{{item.created_at.slice(0,10)}}</span>
                  <span style="color:#1A95FF;cursor:pointer"
                    @click="$router.push('/index/rawMaterialOrderPageBu/'+$route.params.id+'/'+$route.params.type + '/' + index)">去订购</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shadeSelf"
      v-show="WLDQFlag">
      <div class="main">
        <div class="close"
          @click="WLDQFlag=false">
          <span class="icon">x</span>
        </div>
        <div class="title">调取库存</div>
        <div class="inputCtn"
          style="padding-left:8px"
          v-if="WLDQ.warning">
          <div class="warning">警告！检测到调取数量大于库存量({{WLDQ.KCNumber}})，请手动输入调取值，或添加库存。</div>
        </div>
        <div class="inputCtn">
          <span class="label"><span>调取数量:</span></span>
          <div class="elCtn">
            <el-input v-model="WLDQ.DQNumber"
              placeholder="请输入调取数量"></el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><span>一键加工:</span></span>
          <div class="elCtn">
            <el-switch v-model="WLDQ.JGFlag"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </div>
        </div>
        <div style="width:100%;height:1px;background:#efefef"></div>
        <div class="inputCtn"
          v-show="WLDQ.needColor.length>0&&WLDQ.JGFlag">
          <span class="label"><span>加工单位1:</span></span>
          <div class="elCtn">
            <el-select v-if="type==='0'"
              v-model="WLDQ.JGDW1"
              placeholder="请选择加工单位"
              filterable>
              <el-option v-for="itemOpt in clientList.YLJGList"
                :key="itemOpt.id"
                :label="itemOpt.name"
                :value="itemOpt.id">
              </el-option>
            </el-select>
            <el-select v-if="type==='1'"
              v-model="WLDQ.JGDW1"
              placeholder="请选择加工单位"
              filterable>
              <el-option v-for="itemOpt in clientList.FLJGList"
                :key="itemOpt.id"
                :label="itemOpt.name"
                :value="itemOpt.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn"
          v-show="WLDQ.needColor.length>0&&WLDQ.JGFlag">
          <span class="label"><span>工序:</span></span>
          <div class="elCtn">
            <el-select v-model="WLDQ.process_type1"
              multiple
              placeholder="请选择加工步骤"
              filterable>
              <el-option v-for="itemOpt in machiningType"
                :key="itemOpt.name"
                :label="itemOpt.name"
                :value="itemOpt.name">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn"
          v-show="WLDQ.needColor.length>0&&WLDQ.JGFlag">
          <span class="label"><span>加工单价:</span></span>
          <div class="elCtn">
            <el-input v-model="WLDQ.price1"
              placeholder="请输入单价"></el-input>
          </div>
        </div>
        <div class="inputCtn"
          v-show="WLDQ.JGFlag"
          v-for="(item,index) in WLDQ.needColor"
          :key="'dq1'+index">
          <span class="label"><span>{{item.name}}:</span></span>
          <div class="elCtn"
            style="display:flex">
            <el-input v-model="item.value"
              placeholder="请输入加工数量"></el-input>
            <div class="deleteIcon"
              @click="WLDQ.needColor.splice(index,1)"><i class="el-icon-close"></i></div>
          </div>
        </div>
        <div v-show="WLDQ.needColor.length>0&&WLDQ.JGFlag"
          style="width:100%;height:1px;background:#efefef"></div>
        <div class="inputCtn"
          v-show="WLDQ.needColor2.length>0&&WLDQ.JGFlag">
          <span class="label"><span>加工单位2:</span></span>
          <div class="elCtn">
            <el-select v-if="type==='0'"
              v-model="WLDQ.JGDW2"
              placeholder="请选择加工单位"
              filterable>
              <el-option v-for="itemOpt in clientList.YLJGList"
                :key="itemOpt.id"
                :label="itemOpt.name"
                :value="itemOpt.id">
              </el-option>
            </el-select>
            <el-select v-if="type==='1'"
              v-model="WLDQ.JGDW2"
              placeholder="请选择加工单位"
              filterable>
              <el-option v-for="itemOpt in clientList.FLJGList"
                :key="itemOpt.id"
                :label="itemOpt.name"
                :value="itemOpt.id">
              </el-option>
            </el-select>
            <div class="deleteIcon"
              @click="WLDQ.needColor2 = []"><i class="el-icon-close"></i></div>
          </div>
        </div>
        <div class="inputCtn"
          v-show="WLDQ.needColor2.length>0&&WLDQ.JGFlag">
          <span class="label"><span>工序:</span></span>
          <div class="elCtn">
            <el-select v-model="WLDQ.process_type2"
              multiple
              placeholder="请选择加工工序"
              filterable>
              <el-option v-for="itemOpt in machiningType"
                :key="itemOpt.name"
                :label="itemOpt.name"
                :value="itemOpt.name">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn"
          v-show="WLDQ.needColor2.length>0&&WLDQ.JGFlag">
          <span class="label"><span>加工单价:</span></span>
          <div class="elCtn">
            <el-input v-model="WLDQ.price2"
              placeholder="请输入单价"></el-input>
          </div>
        </div>
        <div v-show="WLDQ.JGFlag"
          class="inputCtn"
          v-for="(item,index) in WLDQ.needColor2"
          :key="'dq2'+index">
          <span class="label"><span>{{item.name}}:</span></span>
          <div class="elCtn"
            style="display:flex">
            <el-input v-model="item.value"
              placeholder="请输入加工数量"></el-input>
            <div class="deleteIcon"
              @click="WLDQ.needColor2.splice(index,1)"><i class="el-icon-close"></i></div>
          </div>
        </div>
        <div v-show="WLDQ.needColor2.length>0&&WLDQ.JGFlag"
          style="width:100%;height:1px;background:#efefef"></div>
        <div class="btnCtn">
          <div class="okBtn"
            @click="saveStock">确认</div>
          <div class="cancleBtn"
            @click="WLDQFlag=false">取消</div>
        </div>
      </div>
    </div>
    <my-message :visible.sync="showMsg.KCDQ"
      :url="localName.KCDQ"
      :afterSave="saveKCDQ"></my-message>
    <my-message :visible.sync="showMsg.WLDG"
      :url="localName.WLDG"
      :afterSave="saveWLDG"></my-message>
    <my-message :visible.sync="showMsg.WLJG"
      :url="localName.WLJG"
      :afterSave="saveWLJG"></my-message>
  </div>
</template>

<script>
import { rawMaterialOrderList, orderDetail, rawMaterialOrderInit, rawMaterialProcessList, productionDetail, replenishYarnList, orderMaterialSotckDetail, clientList, rawMaterialOrder, rawMaterialProcessPage, deleteOrderProcess,
  deleteOrderMaterial, notifySave, courseList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: {
        KCDQ: 'KCDQ',
        WLDG: 'WLDG',
        WLJG: 'WLJG'
      },
      showMsg: {
        KCDQ: false,
        WLDG: false,
        WLJG: false
      },
      msgUrl: {
        KCDQ: '',
        WLDG: '',
        WLJG: ''
      },
      msgFlag: {
        KCDQ: window.localStorage.getItem('KCDQ') ? JSON.parse(window.localStorage.getItem('KCDQ')).msgFlag : false,
        WLDG: window.localStorage.getItem('WLDG') ? JSON.parse(window.localStorage.getItem('WLDG')).msgFlag : false,
        WLJG: window.localStorage.getItem('WLJG') ? JSON.parse(window.localStorage.getItem('WLJG')).msgFlag : false
      },
      content: {
        KCDQ: '',
        WLDG: '',
        WLJG: ''
      },
      loading: true,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      },
      orderInfo: {
        order_code: '',
        order_time: '',
        client_name: '',
        group_name: ''
      },
      productList: [],
      materialList: [],
      orderList: [],
      processList: [],
      stockActive: 0,
      stockList: [{
        material_name: '',
        info: []
      }],
      clientList: {
        YLDGList: [],
        FLDGList: [],
        YLJGList: [],
        FLJGList: []
      },
      machiningType: [],
      orderLogFlag: false,
      orderLog: [],
      processLogFlag: false,
      processLog: [],
      bushaList: [],
      DGFlag: false,
      JGFlag: false,
      WLDG: [], // 物料订购
      WLJG: [], // 物料加工
      WLDQ: {
        stock: {},
        KCNumber: 0,
        DQNumber: 0, // 调取数量
        warning: false, // 库存不足警告
        JGFlag: true, // 是否需要加工
        JGDW1: '', // 加工单位
        process_type1: [], // 加工工序
        price1: '',
        JGDW2: '', // 加工单位2
        process_type2: [], // 加工工序2
        price2: '',
        needColor: [],
        needColor2: []
      }, // 物料调取
      WLDQFlag: false
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(1)
    }
  },
  methods: {
    saveKCDQ (data) {
      this.msgFlag.KCDQ = data.msgFlag
    },
    saveWLDG (data) {
      this.msgFlag.WLDG = data.msgFlag
    },
    saveWLJG (data) {
      this.msgFlag.WLJG = data.msgFlag
    },
    sendMsg (which) {
      let data = JSON.parse(window.localStorage.getItem(this.localName[which]))
      let formData = {
        title: data.title,
        type: data.type,
        tag: '工序',
        content: this.content[which],
        router_url: this.msgUrl[which],
        receive_user: data.receive_user
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {
          if (which === 'KCDQ') {
            this.$message.success('调取成功')
            this.reload()
          } else if (which === 'WLDG') {
            this.$message.success('订购成功')
            this.reload()
          } else if (which === 'WLJG') {
            this.$message.success('加工成功')
            this.reload()
          }
        }
      })
    },
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
    open (where, id, flag, companyId, type) {
      if (where === 'table') {
        let str = '/rawMaterialProcessTable/' + id + '/' + companyId + '/' + (type ? type.split('/').join('-') : type) + '/' + this.$route.params.type
        window.open(str)
      } else if (where === 'order') {
        this.$router.push('/index/rawMaterialOrderPage/' + id + '/' + this.type)
      } else if (where === 'process') {
        this.$router.push('/index/rawMaterialProcess/' + id + '/' + this.type)
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
    addOperation (which) {
      if (which === 'DG') {
        this.DGFlag = true
        this.WLDG.push({
          material_name: '',
          desc: '',
          complete_time: '',
          price: '',
          client_id: '',
          materialArr: [{
            total_weight: '',
            color_code: ''
          }],
          needColor: []
        })
      } else if (which === 'JG') {
        this.JGFlag = true
        this.WLJG.push({
          material_name: '',
          desc: '',
          complete_time: '',
          price: '',
          client_id: '',
          process_type: [],
          materialArr: [{
            total_weight: '',
            color_code: ''
          }],
          needColor: []
        })
      }
    },
    saveOperation (which) {
      if (which === 'DG') {
        if (this.type === '0') {
          this.$confirm('请确认配料单信息和订购信息是否正确，确认订购后将无法修改与本次订购相关的配料单!', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let flag = false
            flag = this.WLDG.some((item) => {
              return !item.client_id
            })
            if (flag) {
              this.$message.error({
                message: '未选择订购公司'
              })
              return
            }
            flag = this.WLDG.some((item) => {
              return !item.price
            })
            if (flag) {
              this.$message.error({
                message: '未填写单价信息'
              })
              return
            }
            flag = this.WLDG.some((item) => {
              return !item.complete_time
            })
            if (flag) {
              this.$message.error({
                message: '未选择日期'
              })
              return
            }
            let orderData = []
            this.WLDG.forEach((item) => {
              item.materialArr.forEach((itemMat) => {
                orderData.push({
                  attribute: null,
                  type_source: 2,
                  replenish_id: null,
                  vat_code: 'vat-null',
                  type: 1,
                  order_id: this.$route.params.id,
                  user_id: window.sessionStorage.getItem('user_id'),
                  material_name: item.material_name,
                  client_id: item.client_id,
                  color_code: itemMat.color_code,
                  total_weight: itemMat.total_weight,
                  price: item.price,
                  desc: item.desc,
                  complete_time: item.complete_time,
                  stock_id: null
                })
              })
            })
            rawMaterialOrder({
              data: {
                order_data: orderData,
                stock_data: []
              }
            }).then((res) => {
              if (res.data.status) {
                if (this.msgFlag.WLDG) {
                  this.msgUrl.WLDG = '/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type
                  this.content.WLDG = '订单' + this.orderInfo.order_code + '<span style="color:#1A95FF">订购</span>了一批原料'
                  this.sendMsg('WLDG')
                } else {
                  this.$message.success('订购成功')
                  this.reload()
                }
              } else {
                this.$message.success({
                  message: res.data.message
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          this.$confirm('请确认配料单信息和订购信息是否正确，确认订购后将无法修改与本次订购相关的配料单!', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let flag = false
            flag = this.WLDG.some((item) => {
              return !item.client_id
            })
            if (flag) {
              this.$message.error({
                message: '未选择订购公司'
              })
              return
            }
            flag = this.WLDG.some((item) => {
              return !item.price
            })
            if (flag) {
              this.$message.error({
                message: '未填写单价信息'
              })
              return
            }
            flag = this.WLDG.some((item) => {
              return !item.complete_time
            })
            if (flag) {
              this.$message.error({
                message: '未选择日期'
              })
              return
            }
            let orderData = []
            this.WLDG.forEach((item) => {
              item.materialArr.forEach((itemMat) => {
                orderData.push({
                  attribute: null,
                  type_source: 2,
                  replenish_id: null,
                  vat_code: 'vat-null',
                  type: 2,
                  order_id: this.$route.params.id,
                  user_id: window.sessionStorage.getItem('user_id'),
                  material_name: item.material_name,
                  client_id: item.client_id,
                  color_code: itemMat.color_code,
                  total_weight: itemMat.total_weight,
                  price: item.price,
                  desc: item.desc,
                  complete_time: item.complete_time,
                  stock_id: null
                })
              })
            })
            rawMaterialOrder({
              data: {
                order_data: orderData,
                stock_data: []
              }
            }).then((res) => {
              if (res.data.status) {
                if (this.msgFlag.WLDG) {
                  this.msgUrl.WLDG = '/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type
                  this.content.WLDG = '订单' + this.orderInfo.order_code + '<span style="color:#1A95FF">订购</span>了一批辅料'
                  this.sendMsg('WLDG')
                } else {
                  this.$message.success('订购成功')
                  this.reload()
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
              message: '已取消'
            })
          })
        }
      } else if (which === 'JG') {
        this.$confirm('请确认配料单信息和加工信息是否正确，确认订购后将无法修改与本次订购相关的配料单!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let flag = false
          flag = this.WLJG.some((item) => {
            return !item.client_id
          })
          if (flag) {
            this.$message.error({
              message: '未选择加工公司'
            })
            return
          }
          flag = this.WLJG.some((item) => {
            return !item.price
          })
          if (flag) {
            this.$message.error({
              message: '未填写单价信息'
            })
            return
          }
          flag = this.WLJG.some((item) => {
            return item.process_type.length === 0
          })
          if (flag) {
            this.$message.error({
              message: '未填写加工工序'
            })
            return
          }
          flag = this.WLJG.some((item) => {
            return !item.complete_time
          })
          if (flag) {
            this.$message.error({
              message: '未选择日期'
            })
            return
          }
          let data = []
          this.WLJG.forEach((item) => {
            data.push({
              process_type: item.process_type.join('/'),
              type: Number(this.type + 1),
              order_id: this.$route.params.id,
              user_id: window.sessionStorage.getItem('user_id'),
              material_name: item.material_name,
              client_id: item.client_id,
              material_info: JSON.stringify(item.materialArr.map((itemMat) => {
                return {
                  color: itemMat.color_code,
                  value: itemMat.total_weight
                }
              })),
              price: item.price,
              desc: item.desc,
              complete_time: item.complete_time
            })
          })
          rawMaterialProcessPage({
            data: data
          }).then((res) => {
            if (res.data.status) {
              if (this.msgFlag.WLJG) {
                this.msgUrl.WLJG = '/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type
                this.content.WLJG = '订单' + this.orderInfo.order_code + '<span style="color:#1A95FF">加工</span>了一批物料'
                this.sendMsg('WLJG')
              } else {
                this.$message.success('加工成功')
                this.reload()
              }
              this.reload()
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    setOperation (which, opt) {
      let today = new Date()
      if (which === 'DG') {
        if (this.type === '0') {
          if (opt === '色纱') {
            this.WLDG = this.materialList.map((item) => {
              return {
                material_name: item.material,
                desc: '',
                complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
                total_price: '',
                price: '',
                client_id: '',
                materialArr: item.need.map((itemColor) => {
                  return {
                    total_weight: itemColor.value.toFixed(1),
                    color_code: itemColor.name
                  }
                }),
                needColor: [{ name: '白胚', value: 0 }, ...item.need]
              }
            })
          } else {
            this.WLDG = this.materialList.map((item) => {
              return {
                material_name: item.material,
                desc: '',
                complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
                total_price: '',
                price: '',
                client_id: '',
                materialArr: [{
                  color_code: '白胚',
                  total_weight: item.need.reduce((total, itemColor) => {
                    return total + Number(itemColor.value)
                  }, 0).toFixed(1)
                }],
                needColor: [{ name: '白胚', value: 0 }, ...item.need]
              }
            })
          }
        } else {
          this.WLDG = this.materialList.map((item) => {
            return {
              material_name: item.material,
              desc: '',
              complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
              total_price: '',
              price: '',
              client_id: '',
              materialArr: item.need.map((itemColor) => {
                return {
                  total_weight: itemColor.value.toFixed(1),
                  color_code: itemColor.name
                }
              }),
              needColor: item.need
            }
          })
        }
        this.$alert('请核对订购信息，并填写订购公司，单价！', '提示', {
          confirmButtonText: '确定'
        })
      } else if (which === 'JG') {
        this.WLJG = this.materialList.map((item) => {
          return {
            process_type: [],
            material_name: item.material,
            desc: '',
            complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
            total_price: '',
            price: '',
            client_id: '',
            materialArr: item.need.map((itemColor) => {
              return {
                total_weight: itemColor.value.toFixed(1),
                color_code: itemColor.name
              }
            }),
            needColor: item.need
          }
        })
        this.$alert('请核对加工信息，并填写加工单位，加工步骤，单价！', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    cancleOperation (which) {
      if (which === 'DG') {
        this.DGFlag = false
        this.WLDG.length = 0
      } else if (which === 'JG') {
        this.JGFlag = false
        this.WLJG.length = 0
      }
    },
    closeBox (which, index) {
      if (which === 'DG') {
        this.WLDG.splice(index, 1)
      } else if (which === 'JG') {
        this.WLJG.splice(index, 1)
      }
    },
    // 选中原料时，下拉框颜色修改
    selectColor (material, index, which) {
      if (which === 'DG') {
        if (this.type === '0') {
          this.WLDG[index].needColor = [{ name: '白胚', value: 0 }, ...this.materialList.find((item) => item.material === material).need]
        } else {
          this.WLDG[index].needColor = this.materialList.find((item) => item.material === material).need
        }
      } else if (which === 'JG') {
        this.WLJG[index].needColor = [{ name: '白胚', value: 0 }, ...this.materialList.find((item) => item.material === material).need]
      }
    },
    addColor (which, index) {
      if (which === 'DG') {
        this.WLDG[index].materialArr.push({
          total_weight: '',
          color_code: ''
        })
      } else if (which === 'JG') {
        this.WLJG[index].materialArr.push({
          total_weight: '',
          color_code: ''
        })
      }
    },
    deleteColor (which, index, indexMaterial) {
      if (which === 'DG') {
        this.WLDG[index].materialArr.splice(indexMaterial, 1)
      } else if (which === 'JG') {
        this.WLJG[index].materialArr.splice(indexMaterial, 1)
      }
    },
    // 调取物料
    getStock (stock) {
      this.WLDQ.stock = stock
      this.WLDQFlag = true
      this.WLDQ.JGDW1 = ''
      this.WLDQ.JGDW2 = ''
      this.WLDQ.JGFlag = true
      this.WLDQ.warning = false
      this.WLDQ.needColor = []
      this.WLDQ.needColor2 = []
      this.WLDQ.process_type1 = []
      this.WLDQ.process_type2 = []
      let finded = this.materialList.find((item) => item.material === this.stockList[this.stockActive].material_name)
      this.WLDQ.DQNumber = (finded.total_weight - (finded.stock_weight ? finded.stock_weight : 0) - (finded.order_weight ? finded.order_weight : 0)).toFixed(1)
      if (this.WLDQ.DQNumber < 0) {
        this.WLDQ.DQNumber = 0
      }
      if (stock.total_weight < this.WLDQ.DQNumber) {
        this.WLDQ.warning = true
        this.WLDQ.KCNumber = stock.total_weight
      }
      // 白胚调取 和 色纱调取分开处理
      if (stock.material_color === '白胚') {
        this.WLDQ.process_type1 = ['染色']
        this.WLDQ.process_type2 = ['倒纱']
        let findClient = this.clientList.YLJGList.find((item) => item.name === stock.stock_name)
        if (findClient) {
          this.WLDQ.JGDW1 = findClient.id
          this.WLDQ.JGDW2 = findClient.id
        }
        this.WLDQ.needColor = JSON.parse(JSON.stringify(finded.need))
        this.WLDQ.needColor.forEach((item) => {
          item.value = item.value.toFixed(1)
        })
        this.WLDQ.needColor2 = JSON.parse(JSON.stringify(finded.need))
        this.WLDQ.needColor2.forEach((item) => {
          item.value = item.value.toFixed(1)
        })
      } else {
        this.WLDQ.needColor = JSON.parse(JSON.stringify(finded.need)).filter((item) => item.name === stock.material_color)
        this.WLDQ.needColor.forEach((item) => {
          item.value = item.value.toFixed(1)
        })
      }
    },
    // 保存调取信息
    saveStock () {
      if (this.WLDQ.JGFlag) {
        if (this.WLDQ.needColor.length > 0) {
          if (!this.WLDQ.JGDW1) {
            this.$message.error({
              message: '请选择加工单位'
            })
            return
          }
          if (!this.WLDQ.price1) {
            this.$message.error({
              message: '请输入单价'
            })
            return
          }
        }
        if (this.WLDQ.needColor2.length > 0) {
          if (!this.WLDQ.JGDW2) {
            this.$message.error({
              message: '请选择加工单位'
            })
            return
          }
          if (!this.WLDQ.price2) {
            this.$message.error({
              message: '请输入单价'
            })
            return
          }
        }
      }
      let today = new Date()
      let orderData = [{
        attribute: this.WLDQ.stock.material_attribute,
        type_source: 1,
        replenish_id: null,
        vat_code: this.WLDQ.stock.vat_code,
        type: Number(this.type) + 1,
        order_id: this.$route.params.id,
        user_id: window.sessionStorage.getItem('user_id'),
        material_name: this.stockList[this.stockActive].material_name,
        client_id: null,
        color_code: this.WLDQ.stock.material_color,
        total_weight: this.WLDQ.DQNumber,
        price: 0,
        desc: '',
        complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
        stock_id: this.WLDQ.stock.stock_id
      }]
      let stockData = [{
        material_name: this.stockList[this.stockActive].material_name,
        color_code: this.WLDQ.stock.material_color,
        user_id: window.sessionStorage.getItem('user_id'),
        weight: this.WLDQ.DQNumber,
        stock_id: this.WLDQ.stock.stock_id,
        vat_code: this.WLDQ.stock.vat_code,
        order_id: this.$route.params.id
      }]
      rawMaterialOrder({
        data: {
          order_data: orderData,
          stock_data: stockData
        }
      }).then((res) => {
        if (res.data.status) {
          if (this.WLDQ.JGFlag) {
            if (this.WLDQ.needColor.length === 0 && this.WLDQ.needColor2.length === 0) {
              if (this.msgFlag.KCDQ) {
                this.msgUrl.KCDQ = '/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type
                this.content.KCDQ = '订单' + this.orderInfo.order_code + '<span style="color:#1A95FF">调取</span>' + this.stockList[this.stockActive].material_name + '共计<span style="color:#1A95FF">' + this.WLDQ.DQNumber + 'kg</span>'
                this.sendMsg('KCDQ')
              } else {
                this.$message.success('调取成功')
                this.reload()
              }
            } else {
              let data = []
              if (this.WLDQ.needColor.length > 0) {
                data.push({
                  process_type: this.WLDQ.process_type1.join('/'),
                  type: Number(this.type + 1),
                  order_id: this.$route.params.id,
                  user_id: window.sessionStorage.getItem('user_id'),
                  material_name: this.stockList[this.stockActive].material_name,
                  client_id: this.WLDQ.JGDW1,
                  material_info: JSON.stringify(this.WLDQ.needColor.map((itemMat) => {
                    return {
                      color: itemMat.name,
                      value: itemMat.value
                    }
                  })),
                  price: this.WLDQ.price1,
                  desc: '',
                  complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate())
                })
              }
              if (this.WLDQ.needColor2.length > 0) {
                data.push({
                  process_type: this.WLDQ.process_type2.join('/'),
                  type: Number(this.type + 1),
                  order_id: this.$route.params.id,
                  user_id: window.sessionStorage.getItem('user_id'),
                  material_name: this.stockList[this.stockActive].material_name,
                  client_id: this.WLDQ.JGDW2,
                  material_info: JSON.stringify(this.WLDQ.needColor2.map((itemMat) => {
                    return {
                      color: itemMat.name,
                      value: itemMat.value
                    }
                  })),
                  price: this.WLDQ.price2,
                  desc: '',
                  complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate())
                })
              }
              rawMaterialProcessPage({
                data: data
              }).then((res) => {
                if (res.data.status) {
                  if (this.msgFlag.KCDQ) {
                    this.msgUrl.KCDQ = '/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type
                    this.content.KCDQ = '订单' + this.orderInfo.order_code + '<span style="color:#1A95FF">调取</span>' + this.stockList[this.stockActive].material_name + '共计<span style="color:#1A95FF">' + this.WLDQ.DQNumber + 'kg</span><span style="color:#1A95FF">并加工</span>'
                    this.sendMsg('KCDQ')
                  } else {
                    this.$message.success('调取成功')
                    this.reload()
                  }
                } else {
                  this.$message.error({
                    message: res.data.message
                  })
                }
              })
            }
          } else {
            if (this.msgFlag.KCDQ) {
              this.msgUrl.KCDQ = '/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type
              this.content.KCDQ = '订单' + this.orderInfo.order_code + '<span style="color:#1A95FF">调取</span>' + this.stockList[this.stockActive].material_name + '共计<span style="color:#1A95FF">' + this.WLDQ.DQNumber + 'kg</span>'
              this.sendMsg('KCDQ')
            } else {
              this.$message.success('调取成功')
              this.reload()
            }
          }
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      })
    },
    // 删除订购日志
    deleteDGLog (id) {
      deleteOrderMaterial({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          this.reload()
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      })
    },
    // 删除加工日志
    deleteJGLog (id) {
      deleteOrderProcess({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          this.reload()
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      })
    },
    reload () {
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  },
  created () {
    this.type = this.$route.params.type
    Promise.all([
      rawMaterialOrderInit({
        order_id: this.$route.params.id
      }),
      rawMaterialOrderList({
        order_id: this.$route.params.id
      }),
      orderDetail({
        id: this.$route.params.id
      }),
      rawMaterialProcessList({
        order_id: this.$route.params.id
      }),
      productionDetail({
        order_id: this.$route.params.id
      }),
      replenishYarnList({
        order_id: this.$route.params.id,
        type: parseInt(this.type) + 1
      }), orderMaterialSotckDetail({
        order_id: this.$route.params.id
      }), clientList(), courseList({
        type: 1
      })
    ]).then(res => {
      this.machiningType = res[8].data.data
      let info = res[0].data.data.material_info || {}
      let stock = res[0].data.data.stock_info || []
      let materialInfo = res[1].data || []
      this.orderInfo = res[2].data.data || []
      let processInfo = res[3].data.data || []
      let productPlan = res[4].data.data.product_plan // 获取生产计划单所有产品的配料单
      Object.keys(this.orderInfo.order_batch).forEach((key) => {
        this.orderInfo.order_batch[key].forEach((itemPro) => {
          // 0代表没有计划单,1代表不完整,2代表完整
          let json = {
            product_code: itemPro.product_code,
            type: itemPro.category_info.category_name + (itemPro.category_info.type_name ? '/' + itemPro.category_info.type_name : '') + (itemPro.category_info.style_name ? '/' + itemPro.category_info.type_name : '') + (itemPro.category_info.flower_name ? '/' + itemPro.category_info.flower_name : ''),
            product_size: itemPro.size,
            product_color: itemPro.color,
            number: itemPro.numbers,
            product_id: itemPro.product_id
          }
          if (productPlan[itemPro.product_code]) {
            if (productPlan[itemPro.product_code].find(a => ((a.size === itemPro.size) && (a.color_match_name === itemPro.color)))) {
              json.state = 2
            } else {
              json.state = 1
              json.product_plan_id = productPlan[itemPro.product_code][0].product_plan_id
            }
          } else {
            json.state = 0
          }
          this.productList.push(json)
        })
      })
      for (let prop in info) {
        for (let value in info[prop]) {
          if (value !== 'total_number' && value !== 'type' && value !== 'unit') {
            if (info[prop].type === Number(this.type)) {
              let flag = this.materialList.find(val => val.material === prop)
              if (!flag) {
                this.materialList.push({
                  material: prop,
                  total_weight: (info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value],
                  unit: (info[prop].unit === '克' || info[prop].unit === 'g') ? 'kg' : info[prop].unit === '千克' ? 'kg' : info[prop].unit,
                  need: [{
                    name: value,
                    value: (info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value]
                  }]
                })
              } else {
                flag.total_weight = Number(flag.total_weight) + Number((info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value])
                let arr = flag.need.find(val => val.name === value)
                if (!arr) {
                  flag.need.push({
                    name: value,
                    value: (info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value]
                  })
                } else {
                  arr.value = Number(arr.value) + Number((info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value])
                }
              }
            }
          }
        }
      }
      materialInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          // 初始化订购信息
          let flag = this.orderList.find(val => val.company === item.client_name)
          if (!flag) {
            this.orderList.push({
              company: (item.client_name ? item.client_name : '仓库'),
              where: (item.type_source === 1 ? '调取' : '订购'),
              total_price: Math.ceil(item.price * item.weight),
              create_time: item.complete_time.split(' ')[0],
              remark: item.desc,
              materials: [{
                material: item.material_name,
                colors: [{
                  color: item.color_code,
                  price: item.price,
                  value: item.weight,
                  unit: item.unit === null ? 'kg' : item.unit
                }]
              }]
            })
          } else {
            let flag1 = flag.materials.find(val => val.material === item.material_name)
            if (!flag1) {
              flag.materials.push({
                material: item.material_name,
                colors: [{
                  color: item.color_code,
                  price: item.price,
                  value: item.weight,
                  unit: item.unit === null ? 'kg' : item.unit
                }]
              })
            } else {
              flag.total_price = Number(flag.total_price) + Number(item.price * item.weight)
              flag1.colors.push({
                color: item.color_code,
                price: item.price,
                value: item.weight,
                unit: item.unit === null ? 'kg' : item.unit
              })
            }
          }
          // 已订购/调取数量累加
          let finded = this.materialList.find(val => val.material === item.material_name)
          if (item.type_source === 1) {
            // 已调取数量累加
            finded.stock_weight = finded.stock_weight ? (finded.stock_weight + item.weight) : item.weight
          } else {
            // 已订购数量累加
            finded.order_weight = finded.order_weight ? (finded.order_weight + item.weight) : item.weight
          }

          // 初始化日志
          this.orderLog.unshift({
            time: item.create_time,
            id: item.id,
            client_name: (item.client_name ? item.client_name : '仓库'),
            where: (item.type_source === 1 ? '调取' : '订购'),
            material: item.material_name,
            color: item.color_code,
            price: item.price,
            weight: item.weight,
            total_price: item.price * item.weight,
            order_time: item.complete_time.split(' ')[0],
            remark: item.desc,
            user: item.user_name,
            replenish_id: item.replenish_id,
            unit: (item.unit ? item.unit : 'kg')
          })
        }
      })
      // 物料库存数据整理
      this.stockList = this.jsonMerge(stock.filter(item => item.type === parseInt(this.type) + 1), ['material_name'])
      // 初始化加工信息
      processInfo.forEach(item => {
        item.material_info = JSON.parse(item.material_info)
        item.material_info.forEach(value => {
          if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
            // 初始化加工信息
            let flag = this.processList.find(val => val.process_type === item.process_type)
            if (!flag) {
              this.processList.push({
                process_type: item.process_type,
                companys: [{
                  company: item.client_name,
                  price: item.price,
                  create_time: item.complete_time.split(' ')[0],
                  remark: item.desc,
                  materials: [{
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    }]
                  }]
                }]
              })
            } else {
              let flag1 = flag.companys.find(val => val.company === item.client_name)
              if (!flag1) {
                flag.companys.push({
                  company: item.client_name,
                  price: item.price,
                  create_time: item.complete_time.split(' ')[0],
                  remark: item.desc,
                  materials: [{
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    }]
                  }]
                })
              } else {
                let flag2 = flag1.materials.find(val => val.material === item.material_name)
                if (!flag2) {
                  flag1.materials.push({
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    }]
                  })
                } else {
                  let flag3 = flag2.colors.find(val => val.color === value.color)
                  if (!flag3) {
                    flag2.colors.push({
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    })
                  } else {
                    flag3.value = Number(flag3.value) + Number(value.value)
                  }
                }
              }
            }
            // 统计已加工总价
            let arr = this.materialList.find(val => val.material === item.material_name)
            if (arr) {
              arr.process_weight = arr.process_weight ? (Number(arr.process_weight) + Number(value.value)) : value.value
            }
            // 日志初始化
            this.processLog.unshift({
              id: item.id,
              price: item.price,
              time: item.create_time,
              client_name: item.client_name,
              process_type: item.process_type,
              material: item.material_name,
              color: value.color,
              weight: value.value,
              order_time: item.complete_time.split(' ')[0],
              remark: item.desc,
              user: item.user_name,
              unit: item.unit ? item.unit : 'kg'
            })
          }
        })
      })
      this.processList.forEach(item => {
        item.companys.forEach(itemCom => {
          let weight = 0
          itemCom.materials.forEach(itemMater => {
            itemMater.colors.forEach(itemColor => {
              weight += Number(itemColor.value)
            })
          })
          itemCom.total_price = weight * itemCom.price
        })
      })
      // 补纱信息合并
      this.bushaList = res[5].data.data.filter(item => ((item.type - 1) === Number(this.type))).map((item) => {
        let json = item
        json.yarn_info = this.jsonMerge(json.yarn_info, ['name'])
        json.yarn_info.map((itemYarn) => {
          itemYarn.total = itemYarn.info.reduce((total, current) => {
            return total + parseInt(current.weight)
          }, 0)
          return itemYarn
        })
        return json
      })
      this.bushaList.forEach((item) => {
        item.yarn_info.forEach((itemYarn) => {
          itemYarn.total_price = itemYarn.info.reduce((total, itemColor) => {
            let finded = this.orderLog.find((itemFind) => itemFind.replenish_id === item.id && itemFind.material === itemYarn.name && itemFind.color === itemColor.color)
            if (finded) {
              return total + parseInt(finded.total_price)
            } else {
              return total
            }
          }, 0)
          itemYarn.info.forEach((itemColor) => {
            let finded = this.orderLog.find((itemFind) => itemFind.replenish_id === item.id && itemFind.material === itemYarn.name && itemFind.color === itemColor.color)
            if (finded) {
              itemColor['buchong'] = itemColor['buchong'] ? itemColor['buchong'] + finded.weight : finded.weight
            }
          })
        })
      })
      let client = res[7].data.data
      this.clientList = {
        YLDGList: client.filter((item) => item.type.indexOf(2) !== -1),
        FLDGList: client.filter((item) => item.type.indexOf(7) !== -1),
        YLJGList: client.filter((item) => item.type.indexOf(3) !== -1),
        FLJGList: client.filter((item) => item.type.indexOf(3) !== -1)
      }
      this.loading = false
    })
  }
}
</script>

<style lang="less">
#rawMaterialOrderDetail {
  .el-input--suffix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .shadeSelf {
    .el-input__icon {
      line-height: 32px;
    }
    .el-select {
      width: 100%;
    }
  }
  .el-input__inner {
    height: 32px !important;
    line-height: 32px;
  }
  .el-switch__label {
    color: #666;
  }
}
</style>
<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
#rawMaterialOrderDetail {
  .tabCtn {
    width: 100%;
    .tab {
      display: inline-block;
      line-height: 40px;
      border: 1px solid #e9e9e9;
      padding: 0 12px;
      border-right: 0;
      cursor: pointer;
      margin-bottom: 12px;
      &:nth-last-child(1) {
        border-right: 1px solid #e9e9e9;
      }
      &.active {
        border-bottom: 0;
        color: #1a95ff;
      }
      &:hover {
        color: #1a95ff;
      }
    }
  }
  .tablesCtn {
    .addLine {
      line-height: 40px;
      color: #1a95ff;
      span {
        cursor: pointer;
        &.save {
          &:hover {
            background: #67c23a;
            color: #fff;
          }
        }
        &.add {
          &:hover {
            outline: 2px dotted #1a95ff;
          }
        }
        &.cancle {
          &:hover {
            background: #e9e9e9;
            color: #666;
          }
        }
        &.set {
          &:hover {
            background: #1a95ff;
            color: #fff;
          }
        }
      }
      .el-icon {
        line-height: 40px;
        margin-right: 5px;
      }
    }
  }
  .buyInfo {
    width: 1202px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    & > .buyFrom {
      position: relative;
      margin-top: 30px;
      background-color: #fafafa;
      width: 392px;
      height: 416px;
      overflow-y: scroll;
      padding: 25px 25px 25px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      margin-left: 13px;
      &:nth-child(1) {
        margin-left: 0px;
      }
      & > .el-icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          background-color: @normalBlue;
          color: #fff;
        }
      }
      & > li {
        position: relative;
        height: auto;
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        &.col {
          flex-direction: column;
          align-items: flex-start;
        }
        &:first-child {
          margin: 0;
        }
        & > span {
          display: inline-block;
          width: 5em;
          text-align: right;
          font-size: 14px;
        }
        & > .el-select {
          margin: 0 0 0 15px;
          width: 243px;
        }
        & > .el-input {
          width: 193px;
          margin: 0 0 0 15px;
        }
        & > div {
          margin-top: 20px;
          display: flex;
          align-items: center;
          &:first-child {
            margin: 0;
          }
          & > span {
            width: 5em;
            text-align: right;
            font-size: 14px;
          }
          & > div {
            display: flex;
            width: 243px;
            margin: 0 0 0 15px;
            & > strong {
              color: #ddd;
              font-weight: 300 !important;
            }
            & > .el-select {
              flex: 1;
            }
            & > .el-input {
              flex: 1;
            }
          }
        }
        & > i {
          display: inline-block;
          width: 50px;
          text-align: center;
          font-style: normal;
          border-top: 1px solid rgb(230, 230, 230);
          border-bottom: 1px solid rgb(230, 230, 230);
          border-right: 1px solid rgb(230, 230, 230);
          height: 32px;
          box-sizing: border-box;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: 14px;
          line-height: 30px;
          background-color: rgb(245, 247, 250);
        }
        em {
          position: absolute;
          right: -10px;
          line-height: 40px;
          cursor: pointer;
          &:hover {
            color: @normalBlue;
          }
        }
      }
    }
    .addBtn {
      background: #fff;
      outline: 1px dotted #1a95ff;
      background: #f7fbff;
      color: #1a95ff;
      text-align: center;
      line-height: 416px;
      padding: 0;
      cursor: pointer;
    }
  }
  .shadeSelf {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .main {
      position: absolute;
      width: 520px;
      min-height: 420px;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
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
        background: @normalBlue;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        color: #ecf0f1;
        &:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: @hoverBlue;
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
        font-size: @fontSubhead;
        padding: 0 20px;
        background: linear-gradient(to right, #1a95ff, #ceddef);
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        color: #ffffff;
        margin-bottom: 40px;
      }
      .inputCtn {
        margin: 10px 20px 10px 20px;
        position: relative;
        font-size: 14px;
        padding-left: 5em;
        height: 32px;
        line-height: 32px;
        color: @fontNormal;
        .label {
          position: absolute;
          left: 0;
          text-align: right;
          width: 5em;
          height: 32px;
          color: #666;
          em {
            line-height: 32px;
            color: @error;
            vertical-align: text-top;
            margin-right: 2px;
            vertical-align: -4px;
          }
        }
        .elCtn {
          height: 32px;
          line-height: 32px;
          margin-left: 15px;
          position: relative;
          padding-right: 20px;
          .deleteIcon {
            position: absolute;
            line-height: 32px;
            top: 0;
            bottom: 0;
            right: 0;
            color: #666;
            cursor: pointer;
            font-size: 14px;
            &:hover {
              color: #1a95ff;
              font-weight: 500;
            }
          }
        }
      }
      .btnCtn {
        margin-bottom: 40px;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .okBtn {
          margin: 0 30px;
        }
      }
      .warning {
        font-size: 12px;
        color: #f56c6c;
      }
    }
  }
}
</style>
