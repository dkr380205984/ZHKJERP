<template>
  <div id="stockDetail"
    v-loading="loading">
    <div class="head">
      <h2>仓库管理</h2>
    </div>
    <div class="body">
      <div class="stepCtn"
        v-show="type.indexOf(1)!==-1">
        <div class="stepTitle">原料出入库</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">搜索原料:</span>
              <el-input class="elInput"
                placeholder="请输入原料名称搜索"
                v-model="productSearch"></el-input>
              <div class="addBtn"
                @click="stockWhich='yarn'">原料入库</div>
            </div>
          </div>
          <ul class="tablesCtn"
            style="width:1200px">
            <li class="title"
              style="background:#f5f5f5">
              <span>原料名称</span>
              <span>原料颜色</span>
              <span>批号/缸号</span>
              <span>原料属性</span>
              <span>库存数量</span>
              <span>更新日期</span>
              <span>原料出入库</span>
              <span>查看日志</span>
            </li>
            <li class="content"
              v-for="(item,index) in yarnStockList"
              :key="index">
              <span class="tableRow">{{item.material_name}}</span>
              <span class="tableRow">{{item.material_color}}</span>
              <span class="tableRow">{{item.vat_code?item.vat_code:'暂无'}}</span>
              <span class="tableRow">{{item.material_attribute?item.material_attribute:'暂无'}}</span>
              <span class="tableRow">{{item.total_weight}}</span>
              <span class="tableRow">{{item.updated_at.slice(0,10)}}</span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="item.stockInFlag=true">入库</span>
                <span style="cursor:pointer"
                  @click="item.stockOutFlag=true">出库</span>
              </span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="watchLog(item,'yarn')">查看</span>
              </span>
              <span class="tableRow"
                v-show="item.stockInFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockInFlag=false">取消</span>
                  <input class="tableInput"
                    v-model="item.inputNumber"
                    style="width:70px"
                    placeholder="数量" />
                  <input class="tableInput"
                    style="border-left:0;width:100px"
                    v-model="item.inputDesc"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockIn(item,'yarn')">确认</span>
                </div>
              </span>
              <span class="tableRow"
                v-show="item.stockOutFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockOutFlag=false">取消</span>
                  <input class="tableInput"
                    style="width:70px"
                    v-model="item.inputNumber"
                    placeholder="数量" />
                  <input class="tableInput"
                    v-model="item.inputDesc"
                    style="border-left:0;width:100px"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockOut(item,'yarn')">确认</span>
                </div>
              </span>
            </li>
          </ul>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.yarn"
              :current-page.sync="pages.yarn"
              @current-change="getYarnStockList">
            </el-pagination>
          </div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">筛选条件:</span>
              <el-input class="elInput"
                placeholder="原料名称"
                v-model="searchYarnName"></el-input>
              <el-select style="width:168px"
                placeholder="原料颜色"
                v-model="searchYarnColor"></el-select>
            </div>
          </div>
          <div class="logBox">
            <div class="title">
              <span>原料名称</span>
              <span>颜色</span>
              <span>订单号</span>
              <span>操作类型</span>
              <span>数量</span>
              <span>操作人</span>
              <span>备注信息</span>
              <span>时间</span>
            </div>
            <ul class="logUl">
              <li class="item"
                v-for="(item,index) in yarnStockLog"
                :key="index">
                <span>{{item.material_name}}</span>
                <span>{{item.color_code}}</span>
                <span>{{item.order_code?item.order_code:'无相关订单'}}</span>
                <span>{{actionArr[item.action-1]}}</span>
                <span>{{item.weight}}</span>
                <span>{{item.user_name}}</span>
                <span>{{item.desc?item.desc:'暂无'}}</span>
                <span>{{item.create_time.slice(0,10)}}</span>
              </li>
            </ul>
          </div>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.yarnLog"
              :current-page.sync="pages.yarnLog"
              @current-change="getYarnStockLog">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-show="type.indexOf(2)!==-1">
        <div class="stepTitle">辅料出入库</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">搜索辅料:</span>
              <el-input class="elInput"
                v-model="materialSearch"
                placeholder="请输入辅料名称搜索"></el-input>
              <div class="addBtn"
                @click="stockWhich='material'">辅料入库</div>
            </div>
          </div>
          <ul class="tablesCtn"
            style="width:1200px">
            <li class="title"
              style="background:#f5f5f5">
              <span>辅料名称</span>
              <span>辅料属性</span>
              <span>库存数量</span>
              <span>更新日期</span>
              <span>辅料出入库</span>
              <span>查看日志</span>
            </li>
            <li class="content"
              v-for="(item,index) in materialStockList"
              :key="index">
              <span class="tableRow">{{item.material_name}}</span>
              <span class="tableRow">{{item.material_color}}</span>
              <span class="tableRow">{{item.total_weight}}</span>
              <span class="tableRow">{{item.updated_at.slice(0,10)}}</span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="item.stockInFlag=true">入库</span>
                <span style="cursor:pointer"
                  @click="item.stockOutFlag=true">出库</span>
              </span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="watchLog(item,'material')">查看</span>
              </span>
              <span class="tableRow"
                v-show="item.stockInFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockInFlag=false">取消</span>
                  <input class="tableInput"
                    v-model="item.inputNumber"
                    style="width:70px"
                    placeholder="数量" />
                  <input class="tableInput"
                    style="border-left:0;width:100px"
                    v-model="item.inputDesc"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockIn(item,'material')">确认</span>
                </div>
              </span>
              <span class="tableRow"
                v-show="item.stockOutFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockOutFlag=false">取消</span>
                  <input class="tableInput"
                    style="width:70px"
                    v-model="item.inputNumber"
                    placeholder="数量" />
                  <input class="tableInput"
                    v-model="item.inputDesc"
                    style="border-left:0;width:100px"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockOut(item,'material')">确认</span>
                </div>
              </span>
            </li>
          </ul>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.material"
              :current-page.sync="pages.material"
              @current-change="getMaterialList">
            </el-pagination>
          </div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">筛选条件:</span>
              <el-input class="elInput"
                placeholder="请输入辅料名称搜索"
                v-model="searchMaterialName"></el-input>
            </div>
          </div>
          <div class="logBox">
            <div class="title">
              <span>辅料名称</span>
              <span>属性</span>
              <span>订单号</span>
              <span>操作类型</span>
              <span>数量</span>
              <span>操作人</span>
              <span>备注信息</span>
              <span>时间</span>
            </div>
            <ul class="logUl">
              <li class="item"
                v-for="(item,index) in materialStockLog"
                :key="index">
                <span>{{item.material_name}}</span>
                <span>{{item.color_code}}</span>
                <span>{{item.order_code?item.order_code:'无相关订单'}}</span>
                <span>{{actionArr[item.action-1]}}</span>
                <span>{{item.weight}}</span>
                <span>{{item.user_name}}</span>
                <span>{{item.desc?item.desc:'暂无'}}</span>
                <span>{{item.create_time.slice(0,10)}}</span>
              </li>
            </ul>
          </div>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.materialLog"
              :current-page.sync="pages.materialLog"
              @current-change="getMaterialStockLog">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-show="type.indexOf(3)!==-1">
        <div class="stepTitle">包装辅料出入库</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">包装辅料:</span>
              <el-input class="elInput"
                v-model="packSearch"
                placeholder="请输入包装辅料搜索"></el-input>
              <div class="addBtn"
                @click="stockWhich='pack'">包装辅料入库</div>
            </div>
          </div>
          <ul class="tablesCtn"
            style="width:1200px">
            <li class="title"
              style="background:#f5f5f5">
              <span>包装辅料名称</span>
              <span>规格</span>
              <span>属性</span>
              <span>数量</span>
              <span>备注</span>
              <span>包装辅料出入库</span>
              <span>查看日志</span>
            </li>
            <li class="content"
              v-for="(item,index) in packStockList"
              :key="index">
              <span class="tableRow">{{item.material_name}}</span>
              <span class="tableRow">{{item.size}}</span>
              <span class="tableRow">{{item.attribute}}</span>
              <span class="tableRow">{{item.total_number}}</span>
              <span class="tableRow">{{item.desc?item.desc:'暂无'}}</span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="item.stockInFlag=true">入库</span>
                <span style="cursor:pointer"
                  @click="item.stockOutFlag=true">出库</span>
              </span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="watchLog(item,'pack')">查看</span>
              </span>
              <span class="tableRow"
                v-show="item.stockInFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockInFlag=false">取消</span>
                  <input class="tableInput"
                    v-model="item.inputNumber"
                    style="width:70px"
                    placeholder="数量" />
                  <input class="tableInput"
                    style="border-left:0;width:100px"
                    v-model="item.inputDesc"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockIn(item,'pack')">确认</span>
                </div>
              </span>
              <span class="tableRow"
                v-show="item.stockOutFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockOutFlag=false">取消</span>
                  <input class="tableInput"
                    style="width:70px"
                    v-model="item.inputNumber"
                    placeholder="数量" />
                  <input class="tableInput"
                    v-model="item.inputDesc"
                    style="border-left:0;width:100px"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockOut(item,'pack')">确认</span>
                </div>
              </span>
            </li>
          </ul>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.pack"
              :current-page.sync="pages.pack"
              @current-change="getList('pack')">
            </el-pagination>
          </div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">筛选条件:</span>
              <el-input class="elInput"
                placeholder="请输入辅料名称搜索"
                v-model="searchPackName"></el-input>
            </div>
          </div>
          <div class="logBox">
            <div class="title">
              <span style="flex:1.5">包装辅料名称</span>
              <span>规格</span>
              <span>属性</span>
              <span>订单号</span>
              <span>操作类型</span>
              <span>数量</span>
              <span>操作人</span>
              <span>备注信息</span>
              <span>时间</span>
            </div>
            <ul class="logUl">
              <li class="item"
                v-for="(item,index) in packStockLog"
                :key="index">
                <span style="flex:1.5">{{item.material_name}}</span>
                <span>{{item.size}}</span>
                <span>{{item.attributes}}</span>
                <span>{{item.order_code?item.order_code:'无相关订单'}}</span>
                <span>{{actionTypeArr[item.action_type]}}</span>
                <span>{{item.number}}</span>
                <span>{{item.user_name}}</span>
                <span>{{item.desc?item.desc:'暂无'}}</span>
                <span>{{item.created_at.slice(0,10)}}</span>
              </li>
            </ul>
          </div>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.packLog"
              :current-page.sync="pages.packLog"
              @current-change="getPackStockList">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-show="type.indexOf(4)!==-1">
        <div class="stepTitle">产品出入库</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">搜索产品:</span>
              <el-input class="elInput"
                v-model="productSearch"
                placeholder="请输入产品编号搜索"></el-input>
              <div class="addBtn"
                @click="stockWhich='product'">产品入库</div>
            </div>
          </div>
          <ul class="tablesCtn"
            style="width:1200px">
            <li class="title"
              style="background:#f5f5f5">
              <span>产品名称</span>
              <span>配色方案</span>
              <span>产品尺寸</span>
              <span>库存数量</span>
              <span>更新日期</span>
              <span>产品出入库</span>
              <span>查看日志</span>
            </li>
            <li class="content"
              v-for="(item,index) in productStockList"
              :key="index">
              <span class="tableRow">{{item.product_code}}</span>
              <span class="tableRow">{{item.color}}</span>
              <span class="tableRow">{{item.size}}</span>
              <span class="tableRow">{{item.total_number}}</span>
              <span class="tableRow">{{item.update_time.slice(0,10)}}</span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="item.stockInFlag=true">入库</span>
                <span style="cursor:pointer"
                  @click="item.stockOutFlag=true">出库</span>
              </span>
              <span class="tableRow"
                v-show="!item.stockInFlag&&!item.stockOutFlag"
                style="color:rgb(26, 149, 255)">
                <span style="cursor:pointer"
                  @click="watchLog(item,'product')">查看</span>
              </span>
              <span class="tableRow"
                v-show="item.stockInFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockInFlag=false">取消</span>
                  <input class="tableInput"
                    v-model="item.inputNumber"
                    style="width:70px"
                    placeholder="数量" />
                  <input class="tableInput"
                    style="border-left:0;width:100px"
                    v-model="item.inputDesc"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockIn(item,'product')">确认</span>
                </div>
              </span>
              <span class="tableRow"
                v-show="item.stockOutFlag"
                style="flex:2">
                <div class="tableInputCtn">
                  <span class="btns"
                    @click="item.stockOutFlag=false">取消</span>
                  <input class="tableInput"
                    style="width:70px"
                    v-model="item.inputNumber"
                    placeholder="数量" />
                  <input class="tableInput"
                    v-model="item.inputDesc"
                    style="border-left:0;width:100px"
                    placeholder="请输入备注" />
                  <span class="btns"
                    @click="stockOut(item,'product')">确认</span>
                </div>
              </span>
            </li>
          </ul>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.product"
              :current-page.sync="pages.product"
              @current-change="getProductStockList">
            </el-pagination>
          </div>
        </div>
        <div class="lineCtn"
          style="flex-direction: column;">
          <div class="filterCtn">
            <div class="filterInput">
              <span class="label">筛选条件:</span>
              <el-input class="elInput"
                placeholder="请输入产品编号搜索"
                v-model="searchProductCode"></el-input>
              <!-- <el-select style="width:168px"
                placeholder="出库/入库"
                v-model="searchProductType">
                <el-option label="全部"
                  value="0"></el-option>
                <el-option label="入库"
                  value="1"></el-option>
                <el-option label="出库"
                  value="2"></el-option>
              </el-select> -->
            </div>
          </div>
          <div class="logBox">
            <div class="title">
              <span>产品名称</span>
              <span>尺码/配色</span>
              <span>订单号</span>
              <span>操作类型</span>
              <span>数量</span>
              <span>操作人</span>
              <span>备注信息</span>
              <span>时间</span>
            </div>
            <ul class="logUl">
              <li class="item"
                v-for="(item,index) in productStockLog"
                :key="index">
                <span>{{item.product_code}}</span>
                <span>{{item.size}}/{{item.color}}</span>
                <span>{{item.order_code?item.order_code:'无相关订单'}}</span>
                <span>{{actionTypeArr[item.type]}}</span>
                <span>{{item.stock_number}}</span>
                <span>{{item.user_name}}</span>
                <span>{{item.remark?item.remark:'暂无'}}</span>
                <span>{{item.create_time.slice(0,10)}}</span>
              </li>
            </ul>
          </div>
          <div class="pageCtn"
            style="width:1200px;margin:15px 0">
            <el-pagination background
              :page-size="5"
              layout="prev, pager, next"
              :total="total.productLog"
              :current-page.sync="pages.productLog"
              @current-change="getProductStockLog">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="shade"
      v-show="stockWhich">
      <div class="main">
        <div class="close"
          @click="stockWhich=''">
          <span class="icon">x</span>
        </div>
        <div class="title">{{stockName[stockWhich]}}入库</div>
        <div class="inputCtn">
          <span class="label"><em>*</em>选择{{stockName[stockWhich]}}:</span>
          <div class="elCtn">
            <el-select v-if="stockWhich==='yarn'"
              style="width:100%"
              placeholder="请根据原料名称搜索"
              filterable
              v-model="stockObj.name">
              <el-option v-for="(item,index) in yarnList"
                :key="index"
                :label="item.name"
                :value="item.name"></el-option>
            </el-select>
            <el-select v-if="stockWhich==='material'"
              style="width:100%"
              filterable
              placeholder="请根据辅料名称搜索"
              v-model="stockObj.name">
              <el-option v-for="(item,index) in materialList"
                :key="index"
                :label="item.name"
                :value="item.name"></el-option>
            </el-select>
            <el-select v-if="stockWhich==='pack'"
              style="width:100%"
              filterable
              placeholder="请根据包装辅料名称搜索"
              v-model="stockObj.name">
              <el-option v-for="(item,index) in packList"
                :key="index"
                :label="item.name"
                :value="item.name"></el-option>
            </el-select>
            <el-select v-show="stockWhich==='product'"
              style="width:100%"
              v-model="stockObj.name"
              filterable
              remote
              placeholder="请输入产品编号搜索"
              :remote-method="getProductList"
              :loading="proLoading"
              @change="getColourList">
              <el-option v-for="item in productList"
                :key="item.id"
                :label="item.product_code +'(' +item.category_info.product_category + '/' + item.type_name + '/' + item.style_name +')'"
                :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">订单号:</span>
          <div class="elCtn">
            <el-input v-model="stockObj.order_code"
              placeholder="请输入订单号">
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>{{stockColor[stockWhich]}}:</span>
          <div class="elCtn">
            <el-input v-if="stockWhich==='material'||stockWhich==='pack'"
              v-model="stockObj.color"
              :placeholder="'请输入'+stockColor[stockWhich]">
            </el-input>
            <el-select style="width:100%"
              v-if="stockWhich==='yarn'"
              v-model="stockObj.color"
              placeholder="请选择颜色"
              filterable>
              <el-option v-for="(item,index) in colorList"
                :key="index"
                :label="item.name"
                :value="item.name"></el-option>
            </el-select>
            <el-select style="width:100%"
              v-if="stockWhich==='product'"
              v-model="stockObj.color"
              placeholder="请选择配色"
              filterable>
              <el-option v-for="(item,index) in colourList"
                :key="index"
                :label="item.color_name"
                :value="item.color_name"></el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn"
          v-if="stockWhich!=='material'">
          <span class="label"><em>*</em>{{stockType[stockWhich]}}:</span>
          <div class="elCtn">
            <el-input v-if="stockWhich==='yarn'||stockWhich==='pack'"
              v-model="stockObj.type"
              :placeholder="'请输入'+stockType[stockWhich]">
            </el-input>
            <el-select style="width:100%"
              v-if="stockWhich==='product'"
              v-model="stockObj.type"
              placeholder="请选择尺码"
              filterable>
              <el-option v-for="(item,index) in sizeList"
                :key="index"
                :label="item.measurement"
                :value="item.measurement"></el-option>
            </el-select>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>数量:</span>
          <div class="elCtn">
            <el-input v-model="stockObj.number"
              placeholder="请输入数量">
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">备注:</span>
          <div class="elCtn">
            <el-input v-model="stockObj.desc"
              type="textarea"
              :row="3"
              placeholder="请输入备注"></el-input>
          </div>
        </div>
        <div class="btnCtn">
          <div class="cancleBtn"
            @click="stockWhich=''">取消</div>
          <div class="okBtn"
            @click="stockIn">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  YarnList,
  materialList,
  packagMaterialList,
  productList,
  stockMaterialAdd,
  colorList,
  materialStock,
  materialStockLog,
  stockPack,
  packStockList,
  packStockLog,
  productStockList,
  productStockDetail,
  productStockSave,
  stockDetail
} from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      type: '',
      proLoading: false,
      today: '',
      actionTypeArr: ['', '入库', '出库'],
      actionArr: ['预定购入库', '加工出库', '加工入库', '生产出库', '订购入库', '结余入库', '结余出库', '订单取消入库', '', '仓库入库', '', '', '仓库出库'],
      stockName: {
        yarn: '原料',
        material: '辅料',
        pack: '包装',
        product: '产品'
      },
      stockColor: {
        yarn: '颜色',
        material: '属性',
        pack: '规格',
        product: '配色'
      },
      stockType: {
        yarn: '批号/缸号',
        material: '',
        pack: '属性',
        product: '尺码'
      },
      yarnList: [],
      materialList: [],
      packList: [],
      productList: [],
      colourList: [],
      sizeList: [],
      yarnStockList: [],
      materialStockList: [],
      packStockList: [],
      productStockList: [],
      yarnStockLog: [],
      materialStockLog: [],
      packStockLog: [],
      productStockLog: [],
      colorList: [],
      stockWhich: '',
      stockObj: {
        product_id: '',
        name: '',
        color: '',
        order_code: '',
        type: '',
        number: '',
        desc: ''
      },
      stockInFlag: '',
      total: {
        yarn: 1,
        yarnLog: 1,
        material: 1,
        materialLog: 1,
        pack: 1,
        packLog: 1,
        product: 1,
        productLog: 1
      },
      pages: {
        yarn: 1,
        material: 1,
        pack: 1,
        product: 1
      },
      // 搜日志
      searchProductCode: '',
      searchYarnName: '',
      searchYarnColor: '',
      searchMaterialName: '',
      searchPackName: '',
      // 搜列表
      yarnSeach: '',
      materialSearch: '',
      packSearch: '',
      productSearch: ''
    }
  },
  methods: {
    // 给数据加标记
    addFlag (data) {
      data.forEach((item) => {
        item.stockInFlag = false
        item.stockOutFlag = false
        item.inputNumber = ''
        item.inputDesc = ''
      })
      return data
    },
    // 选择产品的时候更新其对应的配色方案
    getColourList (id) {
      let finded = this.productList.find((item) => item.id === id)
      this.stockObj.product_id = id
      this.colourList = finded.color
      this.sizeList = finded.size
    },
    clearStock () {
      this.stockObj = {
        name: '',
        color: '',
        order_code: '',
        type: '',
        number: '',
        desc: ''
      }
    },
    getYarnList (keyword) {
      YarnList({
        keyword: keyword,
        limit: 15,
        page: 1
      }).then((res) => {
        this.yarnList = res.data.data
      })
    },
    getYarnStockList (page) {
      this.loading = true
      materialStock({
        stock_id: this.$route.params.id,
        type: 1,
        limit: 5,
        page: page,
        material_name: this.yarnSeach
      }).then((res) => {
        let yarnStockList = res.data.data
        this.yarnStockList = this.addFlag(yarnStockList)
        this.total.yarn = res.data.meta.total
        this.loading = false
      })
    },
    getYarnStockLog (page) {
      this.loading = true
      materialStockLog({
        stock_id: this.$route.params.id,
        type: 1,
        limit: 5,
        page: page,
        material_name: this.searchYarnName,
        color: this.searchYarnColor
      }).then((res) => {
        this.yarnStockLog = res.data.data
        this.total.yarnLog = res.data.meta.total
        this.loading = false
      })
    },
    getMaterialList (keyword) {
      materialList({
        keyword: keyword,
        limit: 15,
        page: 1
      }).then((res) => {
        this.materialList = res.data.data
      })
    },
    getMaterialStockList (page) {
      this.loading = true
      materialStock({
        stock_id: this.$route.params.id,
        type: 2,
        limit: 5,
        page: page,
        material_name: this.materialSearch
      }).then((res) => {
        let materialStockList = res.data.data
        this.materialStockList = this.addFlag(materialStockList)
        this.total.material = res.data.meta.total
        this.loading = false
      })
    },
    getMaterialStockLog (page) {
      this.loading = true
      materialStockLog({
        stock_id: this.$route.params.id,
        type: 2,
        limit: 5,
        page: page,
        material_name: this.searchMaterialName
      }).then((res) => {
        this.materialStockLog = res.data.data
        this.total.materialLog = res.data.meta.total
        this.loading = false
      })
    },
    getPackList (keyword) {
      packagMaterialList({
        keyword: keyword,
        limit: 15,
        page: 1
      }).then((res) => {
        this.packList = res.data.data
      })
    },
    getPackStockList (page) {
      this.loading = true
      packStockList({
        stock_id: this.$route.params.id,
        limit: 5,
        page: page,
        material_name: this.packSearch
      }).then((res) => {
        let packStockList = res.data.data.data
        this.packStockList = this.addFlag(packStockList)
        this.total.pack = res.data.data.total
        this.loading = false
      })
    },
    getPackStockLog (page) {
      this.loading = true
      packStockLog({
        stock_id: this.$route.params.id,
        limit: 5,
        page: page,
        material_name: this.searchPackName
      }).then((res) => {
        console.log(res)
        this.packStockLog = res.data.data
        this.total.packLog = res.data.meta.total
        this.loading = false
      })
    },
    getProductList (keyword) {
      this.proLoading = true
      productList({
        product_code: keyword,
        limit: 15,
        page: 1
      }).then((res) => {
        this.productList = res.data.data
        this.proLoading = false
      })
    },
    getProductStockList (page) {
      this.loading = true
      productStockList({
        stock_id: this.$route.params.id,
        limit: 5,
        page: page,
        product_code: this.productSearch
      }).then((res) => {
        let productStockList = res.data.data
        this.productStockList = this.addFlag(productStockList)
        this.total.product = res.data.meta.total
        this.loading = false
      })
    },
    getProductStockLog (page) {
      this.loading = true
      productStockDetail({
        stock_id: this.$route.params.id,
        limit: 5,
        page: page,
        product_code: this.searchProductCode
      }).then((res) => {
        this.productStockLog = res.data.data
        this.total.productLog = res.data.meta.total
        this.loading = false
      })
    },
    stockIn (item, which) {
      if (item && (which === 'yarn' || which === 'material')) {
        this.stockObj.name = item.material_name
        this.stockObj.color = item.material_color
        this.stockObj.number = item.inputNumber
        this.stockObj.desc = item.inputDesc
      }
      if (item && which === 'pack') {
        this.stockObj.desc = item.inputDesc
        this.stockObj.number = item.inputNumber
        this.stockObj.color = item.size
        this.stockObj.type = item.attribute
        this.stockObj.name = item.material_name
      }
      if (item && which === 'product') {
        this.stockObj.desc = item.inputDesc
        this.stockObj.number = item.inputNumber
        this.stockObj.color = item.color
        this.stockObj.order_code = item.order_code
        this.stockObj.product_id = item.product_id
        this.stockObj.type = item.size
      }
      if (!this.stockObj.name && !this.stockObj.product_id) {
        this.$message.error('入库信息不完整')
        return
      }
      if (!this.stockObj.color) {
        this.$message.error('入库信息不完整')
        return
      }
      if (!this.stockObj.number) {
        this.$message.error('入库信息不完整')
        return
      }
      this.loading = true
      if (this.stockWhich === 'yarn' || which === 'yarn') {
        stockMaterialAdd({
          material_name: this.stockObj.name,
          color_code: this.stockObj.color,
          vat_code: this.stockObj.type,
          attribute: '',
          stock_id: this.$route.params.id,
          weight: this.stockObj.number,
          type: 1,
          desc: this.stockObj.desc
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('入库成功')
            if (item) {
              item.total_weight += Number(item.inputNumber)
              item.stockInFlag = false
            }
            this.stockWhich = ''
            this.clearStock()
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      } else if (this.stockWhich === 'material' || which === 'material') {
        stockMaterialAdd({
          material_name: this.stockObj.name,
          color_code: this.stockObj.color,
          vat_code: '',
          attribute: '',
          stock_id: this.$route.params.id,
          weight: this.stockObj.number,
          type: 2,
          desc: this.stockObj.desc
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('入库成功')
            if (item) {
              item.total_weight += Number(item.inputNumber)
              item.stockInFlag = false
            }
            this.stockWhich = ''
            this.clearStock()
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      } else if (this.stockWhich === 'pack' || which === 'pack') {
        stockPack({
          material_name: this.stockObj.name,
          size: this.stockObj.color,
          attribute: this.stockObj.type,
          stock_id: this.$route.params.id,
          desc: this.stockObj.desc,
          number: this.stockObj.number,
          action_type: 1
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('入库成功')
            if (item) {
              item.total_number += Number(item.inputNumber)
              item.stockInFlag = false
            }
            this.stockWhich = ''
            this.clearStock()
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      } else if (this.stockWhich === 'product' || which === 'product') {
        productStockSave({
          data: [{
            remark: this.stockObj.desc,
            stock_number: this.stockObj.number,
            color: this.stockObj.color,
            size: this.stockObj.type,
            product_id: this.stockObj.product_id,
            order_code: this.stockObj.order_code,
            stock_id: this.$route.params.id
          }]
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('入库成功')
            if (item) {
              item.total_number += Number(item.inputNumber)
              item.stockInFlag = false
            }
            this.stockWhich = ''
            this.clearStock()
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      }
    },
    stockOut (item, which) {
      this.loading = true
      if (which === 'yarn') {
        stockMaterialAdd({
          material_name: item.material_name,
          color_code: item.material_color,
          vat_code: item.vat_code,
          attribute: '',
          stock_id: this.$route.params.id,
          weight: -Number(item.inputNumber),
          type: 1,
          desc: item.inputDesc
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('出库成功')
            item.total_weight -= Number(item.inputNumber)
            item.stockOutFlag = false
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      } else if (which === 'material') {
        stockMaterialAdd({
          material_name: item.material_name,
          color_code: item.material_color,
          vat_code: item.vat_code,
          attribute: '',
          stock_id: this.$route.params.id,
          weight: -Number(item.inputNumber),
          type: 2,
          desc: item.inputDesc
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('出库成功')
            item.total_weight -= Number(item.inputNumber)
            item.stockOutFlag = false
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      } else if (which === 'pack') {
        stockPack({
          material_name: item.material_name,
          size: item.size,
          attribute: item.attribute,
          stock_id: this.$route.params.id,
          desc: item.inputDesc,
          number: -Number(item.inputNumber),
          action_type: 2
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('出库成功')
            item.total_number -= Number(item.inputNumber)
            item.stockInFlag = false
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      } else if (which === 'product') {
        productStockSave({
          data: [{
            remark: item.inputDesc,
            stock_number: -Number(item.inputNumber),
            color: item.color,
            size: item.size,
            product_id: item.product_id,
            order_code: '',
            stock_id: this.$route.params.id
          }]
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('出库成功')
            item.stock_number -= Number(item.inputNumber)
            item.stockOutFlag = false
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      }
    },
    watchLog (item, which) {
      if (which === 'yarn') {
        this.searchYarnName = item.material_name
        this.searchYarnColor = item.material_color
      } else if (which === 'material') {
        this.searchMaterialName = item.material_name
      } else if (which === 'pack') {
        this.searchPackName = item.material_name
      } else if (which === 'product') {
        this.searchProductCode = item.product_code
      }
    }
  },
  watch: {
    searchYarnName () {
      this.getYarnStockLog(1)
    },
    searchYarnColor () {
      this.getYarnStockLog(1)
    },
    searchMaterialName () {
      this.getMaterialStockLog(1)
    },
    searchPackName () {
      this.getPackStockLog(1)
    },
    searchProductCode () {
      this.getProductStockLog(1)
    },
    yarnSeach () {
      this.getYarnStockList(1)
    },
    materialSearch () {
      this.getMaterialStockList(1)
    },
    packSearch () {
      this.getPackStockList(1)
    },
    productSearch () {
      this.getProductStockList(1)
    }
  },
  mounted () {
    let date = new Date()
    this.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    stockDetail({
      id: this.$route.params.id
    }).then((res) => {
      let type = res.data.data.type
      this.type = type
      if (type.indexOf(1) !== -1) {
        this.getYarnList('')
        this.getYarnStockList(1)
        this.getYarnStockLog(1)
        colorList().then((res) => {
          this.colorList = [{ id: 0, name: '白胚' }, ...res.data.data]
        })
      }
      if (type.indexOf(2) !== -1) {
        this.getMaterialList('')
        this.getMaterialStockList(1)
        this.getMaterialStockLog(1)
      }
      if (type.indexOf(3) !== -1) {
        this.getPackList('')
        this.getPackStockList(1)
        this.getPackStockLog(1)
      }
      if (type.indexOf(4) !== -1) {
        this.getProductList('')
        this.getProductStockList(1)
        this.getProductStockLog(1)
      }
    })
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/stockDetail.less";
</style>
<style lang="less">
#stockDetail {
  .tableRow {
    .tableInputCtn {
      display: flex;
      font-size: 14px;
      padding: 3px 0px;
      .btns {
        width: 62px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        color: #666;
        background-color: #f5f7fa;
        &:nth-child(1) {
          border: 1px solid #dcdfe6;
          border-right: 0;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
        &:nth-last-child(1) {
          border: 1px solid #dcdfe6;
          border-left: 0;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
        &:hover {
          color: #1a95ff;
        }
      }
      .tableInput {
        width: 100px;
        height: 34px;
        border: 1px solid #dcdfe6;
        padding: 0px 12px;
        box-sizing: border-box;
        &:focus {
          outline: none;
        }
      }
    }
  }
  .filterInput {
    max-width: 1200px;
    .addBtn {
      float: right;
      line-height: 36px;
      padding: 0 12px;
      background: #1a95ff;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
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
      position: absolute;
      width: 640px;
      height: 540px;
      right: 0;
      top: 0;
      bottom: 0;
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
        background: #1a95ff;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        color: #ecf0f1;
        &:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: #48aaff;
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
        font-size: 22px;
        padding: 0 20px;
        background: linear-gradient(to right, #1a95ff, #ceddef);
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        color: #ffffff;
        margin-bottom: 40px;
      }
      .inputCtn {
        margin: 20px;
        position: relative;
        font-size: 16px;
        padding-left: 6em;
        height: 40px;
        line-height: 40px;
        color: #666;
        .label {
          position: absolute;
          left: 0;
          text-align: right;
          width: 6em;
          color: #666;
          em {
            color: #f56c6c;
            line-height: 40px;
            margin-right: 2px;
            vertical-align: -4px;
          }
        }
        .elCtn {
          margin-left: 15px;
          padding-right: 25px;
          box-sizing: border-box;
          width: 100%;
        }
      }
      .btnCtn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .okBtn {
          margin: 0 30px;
        }
      }
    }
  }
}
</style>
