<template>
  <div id="designFormCreateR"
    v-loading="loading">
    <div class="head">
      <h2>添加工艺单
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
      <div class="rigth">
        <el-select class="elSelect"
          filterable
          remote
          reserve-keyword
          v-model="gyd"
          :remote-method="remoteMethod"
          :loading="loadingS"
          clearable
          @change="getCraft"
          style="width:300px"
          placeholder="输入工艺单编号导入工艺单">
          <el-option v-for="item in gydArr"
            :key="item.id"
            :label="item.craft_code"
            :value="item.id">
            <span>{{ item.craft_code }}</span>
            <span style="margin-left:10px;color: #8492a6; font-size: 13px">({{item.product_info?item.product_info.category_info.product_category +'/'+item.product_info.type_name+'/'+item.product_info.style_name+'/'+item.product_info.flower_id:'设计单' }})</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">产品基本信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="row">
            <div class="box box4">
              <div class="label">产品编号：</div>
              <div class="content important">{{productInfo.product_code}}</div>
            </div>
            <div class="box box4">
              <div class="label">产品名称：</div>
              <div class="content">{{productInfo.category_info.product_category}}/{{productInfo.type_name}}/{{productInfo.style_name}}</div>
            </div>
            <div class="box box4">
              <div class="label">产品花型：</div>
              <div class="content">{{productInfo.flower_id}}</div>
            </div>
            <div class="box box4">
              <div class="label">产品配色：</div>
              <div class="content">
                <span v-for="(item,index) in productInfo.color"
                  :key="index">
                  <span>{{item.color_name}}</span>
                  <span v-if="index<productInfo.color.length - 1">/</span>
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box4">
              <div class="label">产品成分：</div>
              <div class="content">
                <span v-for="(item,index) in productInfo.materials"
                  :key="item.id">{{item.ingredient_value}}%{{item.ingredient_name}}{{index===(productInfo.materials.length-1)?'':'/'}}</span>
              </div>
            </div>
            <div class="box box4">
              <div class="label">创建日期：</div>
              <div class="content">{{productInfo.create_time}}</div>
            </div>
            <div class="box box4">
              <div class="label">创建人：</div>
              <div class="content">{{productInfo.user_name}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box1">
              <div class="label">产品规格：</div>
              <div class="content">
                <div class="oneLine"
                  v-for="(item,index) in productInfo.size"
                  :key="index">
                  <span>{{item.measurement}}：</span>
                  <span style="margin-left:16px">{{item.size_info}}</span>
                  <span style="margin-left:16px">{{item.weight}}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">经向</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="label must">配色方案：</div>
          <div class="content">
            <div class="button"
              style="width:6em"
              @click="addColour">+ 配色方案</div>
            <div class="formCtn"
              v-for="(itemColour,indexColour) in colour"
              :key="indexColour">
              <el-select placeholder="请选择配色方案"
                v-model="itemColour.value">
                <el-option v-for="(item,index) in productInfo.color"
                  :key="index"
                  :label="item.color_name"
                  :value="item.color_name"></el-option>
              </el-select>
              <color-picker v-for="(itemColor,indexColor) in itemColour.colorWarp"
                :key="indexColor + (itemColor.color?itemColor.color:0)"
                v-model="itemColour.colorWarp[indexColor]"
                :content="filterMethods(indexColor)"
                :colorArr="colorArr"></color-picker>
              <div @click="addColor()"
                class="addBtn"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle">
                <i class="el-icon-plus"></i>
              </div>
              <div @click="deleteColor()"
                class="addBtn"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteColour(indexColour)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;border:0">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label must">主要原料：</div>
          <div class="content">
            <div class="formCtn">
              <el-select placeholder="请选择主要原料"
                v-model="yarn.yarnWarp"
                filterable>
                <el-option v-for="item in yarn.yarnArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">次要原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em"
              @click="addYarn('Warp')">+ 次要原料</div>
            <div v-for="(item,index) in yarn.yarnOtherWarp"
              :key="index"
              class="formCtn">
              <el-select placeholder="请选择次要原料"
                v-model="yarn.yarnOtherWarp[index].value"
                filterable>
                <el-option v-for="item in yarn.yarnArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select class="smallWidth"
                style="margin-left:16px;"
                v-for="(itemJia,indexJia) in item.array"
                :key="indexJia"
                placeholder="夹"
                v-model="item.array[indexJia]">
                <el-option v-for="item in colorLength"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="addBtn"
                @click="addYarnArr('Warp',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteYarnArr('Warp',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteYarn('Warp',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;border:0">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">辅助原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em"
              @click="addMaterial('Warp')">+ 辅助原料</div>
            <div class="formCtn"
              v-for="(item,index) in material.materialWarp"
              :key="index">
              <el-input class="inline-input"
                v-model="material.materialWarp[index].number"
                placeholder="请输入数量">
                <template slot="prepend">
                  <el-select v-model="material.materialWarp[index].value"
                    placeholder="辅料">
                    <el-option v-for="item in material.materialArr"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </template>
                <template slot="append">根</template>
              </el-input>
              <el-select class="smallWidth"
                style="margin-left:16px;"
                v-for="(itemJia,indexJia) in item.array"
                :key="indexJia"
                placeholder="夹"
                v-model="item.array[indexJia]">
                <el-option v-for="item in colorLength"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="addBtn"
                @click="addMaterialArr('Warp',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteMaterialArr('Warp',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteMaterial('Warp',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;border:0">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label must">经向排列：</div>
          <div class="content">
            <i class="sliderCtn">
              <span class="text"
                @click="ifDouble.warp=false"
                :class="{'active':!ifDouble.warp}">单</span>
              <span class="text"
                @click="ifDouble.warp=true"
                :class="{'active':ifDouble.warp}">双</span>
            </i>
            <el-input v-model="insertNumber.warp"
              style="width:214px;margin-left:19px;"
              placeholder="请输入插入列数">
              <template slot="append">列</template>
            </el-input>
            <div class="button"
              @click="addCol('warp')"
              style="display:inline-block;width:3.5em;margin:0 0 0 16px;font-size:14px">插入</div>
            <el-input v-model="invertedOrder.warp[0]"
              style="width:80px;margin-left:47px;"
              placeholder="列数">
            </el-input>
            <span style="color:#E9E9E9;margin:0 6px">~</span>
            <el-input v-model="invertedOrder.warp[1]"
              style="width:80px;"
              placeholder="列数">
            </el-input>
            <div class="button"
              @click="invertedCol('warp')"
              style="display:inline-block;width:5.5em;margin:0 0 0 16px;font-size:14px">倒序一遍</div>
            <div class="button"
              @click="clearTable('warp')"
              style="display:inline-block;width:3.5em;margin:0 0 0 63px;font-size:14px;background:#fff;color:#666;border:1px solid #D9D9D9;">重置</div>
            <div class="table">
              <hot-table :settings="tableData.warp"
                ref="warp"></hot-table>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          v-show="ifDouble.warp">
          <div class="label must">经向反面：</div>
          <div class="content">
            <el-input v-model="insertNumber.warpBack"
              style="width:214px;margin-left:0px;"
              placeholder="请输入插入列数">
              <template slot="append">列</template>
            </el-input>
            <div class="button"
              @click="addCol('warpBack')"
              style="display:inline-block;width:3.5em;margin:0 0 0 16px;font-size:14px">插入</div>
            <el-input v-model="invertedOrder.warpBack[0]"
              style="width:80px;margin-left:47px;"
              placeholder="列数">
            </el-input>
            <span style="color:#E9E9E9;margin:0 6px">~</span>
            <el-input v-model="invertedOrder.warpBack[1]"
              style="width:80px;"
              placeholder="列数">
            </el-input>
            <div class="button"
              @click="invertedCol('warpBack')"
              style="display:inline-block;width:5.5em;margin:0 0 0 16px;font-size:14px">倒序一遍</div>
            <div class="button"
              @click="clearTable('warpBack')"
              style="display:inline-block;width:3.5em;margin:0 0 0 63px;font-size:14px;background:#fff;color:#666;border:1px solid #D9D9D9;">重置</div>
            <div class="table">
              <hot-table :settings="tableData.warpBack"
                ref="warpBack"></hot-table>
            </div>
          </div>
        </div>
        <div class="appendInfo">
          <div class="row">
            <div class="box box2">
              <div class="label must">整经头纹：</div>
              <div class="content">
                <el-input style="width:294px"
                  disabled
                  v-model="warpInfo.weft"
                  placeholder="请输入整经头纹">
                  <template slot="append">根</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">边型：</div>
              <div class="content">
                <el-select v-model="warpInfo.side_id"
                  placeholder="请选择边型"
                  style="width:294px">
                  <el-option v-for="item in sideArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">整经门幅：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="warpInfo.width"
                  placeholder="请输入整经头纹">
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">机型：</div>
              <div class="content">
                <el-select v-model="warpInfo.machine_id"
                  placeholder="请选择机型"
                  style="width:294px">
                  <el-option v-for="item in modeleArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">筘号：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="warpInfo.reed"
                  placeholder="请输入筘号">
                  <template slot="append">筘</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">穿筘法：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="warpInfo.reed_method"
                  placeholder="请输入穿筘法">
                  <template slot="append">根/筘</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label must">筘幅：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="warpInfo.reed_width"
                  placeholder="请输入筘幅">
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">筘幅说明：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="warpInfo.reed_width_data"
                  placeholder="请输入筘幅说明"></el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">综页：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="warpInfo.sum_up"
                  placeholder="请输入综页">
                  <template slot="append">页</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">穿综法</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="label">穿综法：</div>
          <div class="content">
            <el-select v-model="commonPM"
              @change="getPM"
              placeholder="请选择常用穿综法"
              style="width:294px;">
              <el-option v-for="item in commonPMArr"
                :key="item.id"
                :value="item"
                :label="item.name">
                <div style="display: flex;justify-content: space-between;width: 100%;">
                  <span>{{ item.name }}</span>
                  <span @click.stop="deleteCommonPM(item.id)"
                    class="select_del">x</span>
                </div>
              </el-option>
            </el-select>
            <el-tooltip class="item"
              effect="dark"
              content="保存本次穿综法到常用"
              placement="top">
              <div @click="savePM"
                class="tips">
                <i class="el-icon-upload"></i>
              </div>
            </el-tooltip>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label must">纹版图：</div>
          <div class="content"
            style="max-height:32px">
            <i class="sliderCtn">
              <span class="text"
                :class="{'active':GLFlag==='normal'}"
                @click="GLFlag = 'normal'">普通</span>
              <span class="text"
                :class="{'active':GLFlag==='complex'}"
                @click="GLFlag = 'complex'">高级</span>
            </i>
            <div class="button"
              v-show="GLFlag === 'complex'"
              style="display:inline-block;width:5.5em;margin:0 0 0 24px;font-size:14px"
              @click="addGL">添加纹版</div>
          </div>
          <div class="content"
            v-for="(item1,index1) in GL"
            :key="index1"
            style="overflow:hidden">
            <div class="mark">{{alphabet[index1]}}：</div>
            <div v-for="(item2,index2) in item1"
              :key="index2"
              class="deltaCtn">
              <div class="leftCtn">
                <span>{{index2+1}}</span>
              </div>
              <div class="rightCtn">
                <el-input placeholder="数字间用逗号分隔"
                  v-model="item2[0]"></el-input>
                <el-input placeholder="数字间用逗号分隔"
                  v-model="item2[1]"></el-input>
                <el-input placeholder="非必填项"
                  v-model="item2[2]"></el-input>
              </div>
            </div>
            <div class="addBtn"
              @click="addGLChildren(index1)">
              <i class="el-icon-plus"></i>
            </div>
            <div class="addBtn"
              @click="deleteGLChildren(index1)"
              v-show="item1.length>1">
              <i class="el-icon-minus"></i>
            </div>
            <div v-show="GLFlag==='complex'"
              class="addBtn"
              @click="deleteGL(index1)"
              style="border:0">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label must">穿综循环：</div>
          <div class="content"
            style="max-height:32px">
            <i class="sliderCtn">
              <span class="text"
                :class="{'active':PMFlag==='normal'}"
                @click="PMFlag = 'normal'">普通</span>
              <span class="text"
                :class="{'active':PMFlag==='complex'}"
                @click="PMFlag = 'complex'">高级</span>
            </i>
            <div class="button"
              style="display:inline-block;width:5.5em;margin:0 0 0 24px;font-size:14px"
              @click="addPM">添加循环</div>
          </div>
          <div class="treeCtn">
            <div class="node"
              v-for="(item1,index1) in repeatPM"
              :key="index1">
              <div class="numbers">{{romanNum[index1]}}</div>
              <div class="lineCol"
                v-show="PMFlag === 'complex'"></div>
              <div class="deleteIcon"
                @click="deletePM(index1)">删除</div>
              <div class="nodeBox">
                <div class="box box1">
                  <el-input v-if="PMFlag === 'normal'"
                    placeholder="根数"
                    v-model="item1.number">
                  </el-input>
                  <el-input v-if="PMFlag === 'complex'"
                    placeholder="总数"
                    v-model="item1.total"
                    disabled>
                  </el-input>
                  <em class="unit right">根</em>
                </div>
                <div class="box box2">
                  <div class="lines">
                    <div class="line1">
                      <el-input v-if="PMFlag === 'normal'"
                        placeholder="穿综循环"
                        v-model="item1.value">
                      </el-input>
                    </div>
                    <div class="line2">
                      <em class="unit left">×</em>
                      <el-input style="padding-left:5px;box-sizing:border-box;"
                        placeholder="遍数"
                        v-model="item1.repeat">
                      </el-input>
                      <em class="unit right">遍</em>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nodeBtn"
                v-show="PMFlag === 'complex'"
                @click="addPMChild(index1)"
                style="border:0;background:#1A95FF;color:#fff;height:26px;margin-top:4px;;line-height:26px;width:26px">
                <i class="el-icon-plus"></i>
              </div>
              <div class="nodeChild"
                v-show="PMFlag === 'complex'"
                v-for="(item2,index2) in item1.children"
                :key="index2">
                <div class="nodeBox">
                  <div class="lineRow"></div>
                  <div class="nodeBtn deleteBtn"
                    @click="deletePMChild(index1,index2)">
                    <i class="el-icon-minus"></i>
                  </div>
                  <div class="box box1">
                    <el-input placeholder="根数"
                      v-model="item2.number">
                    </el-input>
                    <em class="unit right">根</em>
                  </div>
                  <div class="box box2">
                    <div class="lines"
                      v-for="(item3,index3) in item2.children"
                      :key="index3">
                      <div class="line1">
                        <el-input placeholder="穿综循环"
                          v-model="item3.value">
                        </el-input>
                      </div>
                      <div class="line2">
                        <em class="unit left">×</em>
                        <el-input style="padding-left:5px;box-sizing:border-box;"
                          placeholder="遍数"
                          v-model="item3.repeat">
                        </el-input>
                        <em class="unit right">遍</em>
                      </div>
                      <div class="oprText"
                        :class="{'add':index3===0,'delete':index3>0}"
                        @click="index3>0?deletePMLine(index1,index2,index3):addPMLine(index1,index2)">{{index3>0?'删除行':'新增行'}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">穿综备注：</div>
          <div class="content">
            <el-input style="width:294px"
              v-model="remarkPM"
              placeholder="请输入备注信息"></el-input>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">纬向</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="row">
            <div class="box box2">
              <div class="label">组织法:</div>
              <div class="content">
                <el-select v-model="weftInfo.organization_id"
                  placeholder="请选择组织法"
                  style="width:294px">
                  <el-option v-for="item in methodArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="box box2">
              <div class="label must">纬密:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="weimi"
                  disabled
                  placeholder="请输入纬密">
                  <template slot="append">梭/cm</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">机上坯幅:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="weftInfo.peifu"
                  placeholder="请输入机上坯幅">
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">坯幅说明:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="weftInfo.peifu_data"
                  placeholder="请输入坯幅说明">
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">上齿牙:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="weftInfo.shangchiya"
                  placeholder="请输入上齿牙">
                  <template slot="append">牙</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">下齿牙:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="weftInfo.xiachiya"
                  placeholder="请输入下齿牙">
                  <template slot="append">牙</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label must">让位说明:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="weftInfo.neichang"
                  placeholder="请输入内长">
                  <template slot="prepend">内长</template>
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="content">
                <el-input style="width:294px"
                  v-model="weftInfo.rangwei"
                  placeholder="请输入让位">
                  <template slot="prepend">让位</template>
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="content">
                <el-input style="width:294px"
                  v-model="weftInfo.total"
                  disabled
                  placeholder="待计算">
                  <template slot="prepend">总计</template>
                  <template slot="append">梭</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label must">配色方案：</div>
          <div class="content">
            <div class="button"
              style="width:6em"
              @click="addColour">+ 配色方案</div>
            <div class="textBtn"
              @click="useWarpColor">同步经向配色</div>
            <div class="formCtn"
              v-for="(itemColour,indexColour) in colour"
              :key="indexColour">
              <el-select placeholder="请选择配色方案"
                v-model="itemColour.value">
                <el-option v-for="(item,index) in productInfo.color"
                  :key="index"
                  :label="item.color_name"
                  :value="item.color_name"></el-option>
              </el-select>
              <color-picker v-for="(itemColor,indexColor) in itemColour.colorWeft"
                :key="indexColor + (itemColor.color?itemColor.color:0)"
                v-model="itemColour.colorWeft[indexColor]"
                :content="filterMethods(indexColor)"
                :colorArr="colorArr"></color-picker>
              <div @click="addColor()"
                class="addBtn"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle">
                <i class="el-icon-plus"></i>
              </div>
              <div @click="deleteColor()"
                class="addBtn"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteColour(indexColour)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;border:0">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label must">主要原料：</div>
          <div class="content">
            <div class="formCtn">
              <el-select placeholder="请选择主要原料"
                v-model="yarn.yarnWeft"
                filterable>
                <el-option v-for="item in yarn.yarnArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">次要原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em"
              @click="addYarn('Weft')">+ 次要原料</div>
            <div v-for="(item,index) in yarn.yarnOtherWeft"
              :key="index"
              class="formCtn">
              <el-select placeholder="请选择次要原料"
                v-model="yarn.yarnOtherWeft[index].value">
                <el-option v-for="item in yarn.yarnArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select class="smallWidth"
                style="margin-left:16px;"
                v-for="(itemJia,indexJia) in item.array"
                :key="indexJia"
                placeholder="夹"
                v-model="item.array[indexJia]">
                <el-option v-for="item in colorLength"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="addBtn"
                @click="addYarnArr('Weft',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteYarnArr('Weft',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteYarn('Weft',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;border:0">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">辅助原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em"
              @click="addMaterial('Weft')">+ 辅助原料</div>
            <div class="formCtn"
              v-for="(item,index) in material.materialWeft"
              :key="index">
              <el-input class="inline-input"
                v-model="material.materialWeft[index].number"
                placeholder="请输入数量">
                <template slot="prepend">
                  <el-select v-model="material.materialWeft[index].value"
                    placeholder="辅料">
                    <el-option v-for="item in material.materialArr"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </template>
                <template slot="append">根</template>
              </el-input>
              <el-select class="smallWidth"
                style="margin-left:16px;"
                v-for="(itemJia,indexJia) in item.array"
                :key="indexJia"
                placeholder="夹"
                v-model="item.array[indexJia]">
                <el-option v-for="item in colorLength"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="addBtn"
                @click="addMaterialArr('Weft',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteMaterialArr('Weft',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteMaterial('Weft',index)"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle;border:0">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label must">纬向排列：</div>
          <div class="content">
            <i class="sliderCtn">
              <span class="text"
                @click="ifDouble.weft=false"
                :class="{'active':!ifDouble.weft}">单</span>
              <span class="text"
                @click="ifDouble.weft=true"
                :class="{'active':ifDouble.weft}">双</span>
            </i>
            <el-input v-model="insertNumber.weft"
              style="width:214px;margin-left:19px;"
              placeholder="请输入插入列数">
              <template slot="append">列</template>
            </el-input>
            <div class="button"
              @click="addCol('weft')"
              style="display:inline-block;width:3.5em;margin:0 0 0 16px;font-size:14px">插入</div>
            <el-input v-model="invertedOrder.weft[0]"
              style="width:80px;margin-left:47px;"
              placeholder="列数">
            </el-input>
            <span style="color:#E9E9E9;margin:0 6px">~</span>
            <el-input v-model="invertedOrder.weft[1]"
              style="width:80px;"
              placeholder="列数">
            </el-input>
            <div class="button"
              @click="invertedCol('weft')"
              style="display:inline-block;width:5.5em;margin:0 0 0 16px;font-size:14px">倒序一遍</div>
            <div class="button"
              @click="clearTable('weft')"
              style="display:inline-block;width:3.5em;margin:0 0 0 63px;font-size:14px;background:#fff;color:#666;border:1px solid #D9D9D9;">重置</div>
            <div class="table">
              <hot-table :settings="tableData.weft"
                ref="weft"></hot-table>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          v-show="ifDouble.weft">
          <div class="label must">纬向反面：</div>
          <div class="content">
            <el-input v-model="insertNumber.weftBack"
              style="width:214px;margin-left:0px;"
              placeholder="请输入插入列数">
              <template slot="append">列</template>
            </el-input>
            <div class="button"
              @click="addCol('weftBack')"
              style="display:inline-block;width:3.5em;margin:0 0 0 16px;font-size:14px">插入</div>
            <el-input v-model="invertedOrder.weftBack[0]"
              style="width:80px;margin-left:47px;"
              placeholder="列数">
            </el-input>
            <span style="color:#E9E9E9;margin:0 6px">~</span>
            <el-input v-model="invertedOrder.weftBack[1]"
              style="width:80px;"
              placeholder="列数">
            </el-input>
            <div class="button"
              @click="invertedCol('weftBack')"
              style="display:inline-block;width:5.5em;margin:0 0 0 16px;font-size:14px">倒序一遍</div>
            <div class="button"
              @click="clearTable('weftBack')"
              style="display:inline-block;width:3.5em;margin:0 0 0 63px;font-size:14px;background:#fff;color:#666;border:1px solid #D9D9D9;">重置</div>
            <div class="table">
              <hot-table :settings="tableData.weftBack"
                ref="weftBack"></hot-table>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">其他信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <!-- <div class="row must">
            <div class="box box2">
              <div class="label must">产品克重：</div>
              <div class="content">
                <el-input style="width:340px"
                  v-model="weight"
                  placeholder="请输入产品克重">
                  <template slot="append">g</template>
                </el-input>
              </div>
            </div>
          </div> -->
          <div class="row">
            <div class="box box2">
              <div class="label must">物料系数：</div>
              <div class="content"
                v-for="(item,index) in allMaterial"
                :key="index">
                <el-input style="width:340px;margin-bottom:16px;"
                  v-model="coefficient[index]"
                  placeholder="系数">
                  <template slot="prepend">{{item}}</template>
                  <template slot="append">g/m</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">备注信息：</div>
              <div class="content">
                <el-input style="width:340px"
                  v-model="desc"
                  placeholder="请输入备注信息"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomBtnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">添加</div>
      </div>
    </div>
    <my-message :visible.sync="showMsg"
      :url="localName"
      :afterSave="afterSave"></my-message>
  </div>
</template>
<script>
import { porductOne, YarnList, editList, YarnColorList, materialList, saveCraft, savePM, PMList, deletePM, craftOne, craftList, notifySave } from '@/assets/js/api.js'
import { HotTable } from '@handsontable/vue'
import enCH from '@/assets/js/languages.js'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
Handsontable.languages.registerLanguageDictionary(enCH) // 注册中文字典
export default {
  components: {
    HotTable
  },
  data () {
    return {
      localName: 'designFormCreate',
      showMsg: false,
      msgFlag: window.localStorage.getItem('designFormCreate') ? JSON.parse(window.localStorage.getItem('designFormCreate')).msgFlag : false,
      msgUrl: '',
      content: '',
      loading: true,
      // 正式数据
      productInfo: {
        product_code: '',
        type_name: '',
        flower_id: '',
        style_name: '',
        category_info: {
          product_category: '',
          name: ''
        },
        color: [],
        materials: [],
        create_time: '',
        user_name: '',
        size: []
      },
      methodArr: [],
      method: '',
      sideArr: [],
      side: '',
      modeleArr: [],
      model: '',
      material: {
        materialArr: [{
          name: '金丝'
        }, {
          name: '银丝'
        }],
        materialWarp: [{
          value: '',
          number: '',
          array: ['']
        }],
        materialWeft: [{
          value: '',
          number: '',
          array: ['']
        }]
      },
      yarn: {
        yarnArr: [],
        yarnWarp: '',
        yarnWeft: '',
        yarnOtherWarp: [{
          value: '',
          array: ['']
        }],
        yarnOtherWeft: [{
          value: '',
          array: ['']
        }]
      },
      colorArr: [{
        name: '空梭',
        color_code: '#fff'
      }],
      colour: [{
        value: '',
        colorWeft: [],
        colorWarp: []
      }],
      warpInfo: {
        weft: null, // 总头纹
        side_id: null, // 边形
        width: null, // 整经门幅
        machine_id: null, // 机型
        reed: null, // 筘号
        reed_method: null, // 穿筘法
        reed_width: null, // 筘幅
        reed_width_data: null, // 筘幅说明
        sum_up: null, // 综页
        drafting_method: null // 穿综法
        // additional_data: null// 穿综法备注
      },
      weftInfo: {
        organization_id: null, // 组织法
        peifu: null, // 胚服
        peifu_data: null, // 胚幅说明
        weimi: null, // 纬密
        shangchiya: null, // 上齿牙
        xiachiya: null, // 下齿牙
        neichang: null, // 内长
        rangwei: null, // 让位
        total: null // 总计
      },
      // PM:penetration method 穿综法缩写
      commonPMArr: [],
      commonPM: '',
      PMFlag: 'normal',
      repeatPM: [{
        value: '', // 循环的值，用逗号分割
        repeat: '', // 循环次数
        number: '', // 纱线根数
        GL: '', // 高级穿综法选纹版图
        total: 0, // 高级穿综法统计值
        children: [{
          number: '',
          children: [{
            value: '',
            repeat: ''
          }]
        }]
      }],
      remarkPM: '',
      // GL:graphic layout 纹版图缩写
      GL: [[['', '', '']]],
      GLFlag: 'normal',
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      romanNum: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ'],
      // 表格数据
      tableData: {
        warp: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '穿综法']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            if (row === 0) {
              cellProperties.readOnly = true
            }
            if (row === 1) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.colorLength.map(item => item.label)
            }
            if (row === 5) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.PMArr
            }
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: [
            'mergeCells', // 合并单元格菜单
            'col_right',
            'col_left',
            'copy',
            '粘贴(Ctrl + V)',
            'undo',
            'redo',
            'remove_col'
          ],
          className: 'handsontable',
          number: 1,
          afterCreateCol: (index, amount) => {
            this.tableData.warp.number++
            for (let i = 0; i < this.tableData.warp.number; i++) {
              this.tableData.warp.data[0][i] = i + 1
            }
          },
          afterRemoveCol: (index, amount) => {
            this.tableData.warp.number--
            for (let i = 0; i < this.tableData.warp.number; i++) {
              this.tableData.warp.data[0][i] = i + 1
            }
          },
          afterChange: (changes, opt) => {
            // 计算整经头文
            if (opt === 'edit') {
              let arrWarp = JSON.parse(JSON.stringify(this.tableData.warp.data.slice(2, 5)))
              let arrWarpBack = JSON.parse(JSON.stringify(this.tableData.warpBack.data.slice(2, 5)))
              let merge = this.$refs.warp.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              let mergeBack = this.$refs.warpBack.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              merge.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWarp[item.row - 2][i] = arrWarp[item.row - 2][item.col]
                  }
                }
              })
              mergeBack.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWarpBack[item.row - 2][i] = arrWarpBack[item.row - 2][item.col]
                  }
                }
              })
              let sum = 0
              arrWarp[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWarp[1][index] ? Number(arrWarp[1][index]) : 1
                let item3 = arrWarp[2][index] ? Number(arrWarp[2][index]) : 1
                sum += item1 * item2 * item3
              })
              arrWarpBack[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWarpBack[1][index] ? Number(arrWarpBack[1][index]) : 1
                let item3 = arrWarpBack[2][index] ? Number(arrWarpBack[2][index]) : 1
                sum += item1 * item2 * item3
              })
              this.warpInfo.weft = sum
            }
          },
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          mergeCells: true,
          width: '100%',
          height: 250
        },
        warpBack: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '穿综法']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            if (row === 0) {
              cellProperties.readOnly = true
            }
            if (row === 1) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.colorLength.map(item => item.label)
            }
            if (row === 5) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.PMArr
            }
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: [
            'mergeCells', // 合并单元格菜单
            'col_right',
            'col_left',
            'copy',
            '粘贴(Ctrl + V)',
            'undo',
            'redo',
            'remove_col'
          ],
          className: 'handsontable',
          number: 1,
          afterCreateCol: (index, amount) => {
            this.tableData.warpBack.number++
            for (let i = 0; i < this.tableData.warpBack.number; i++) {
              this.tableData.warpBack.data[0][i] = i + 1
            }
          },
          afterRemoveCol: (index, amount) => {
            this.tableData.warpBack.number--
            for (let i = 0; i < this.tableData.warpBack.number; i++) {
              this.tableData.warpBack.data[0][i] = i + 1
            }
          },
          afterChange: (changes, opt) => {
            // 计算整经头文
            if (opt === 'edit') {
              let arrWarp = JSON.parse(JSON.stringify(this.tableData.warp.data.slice(2, 5)))
              let arrWarpBack = JSON.parse(JSON.stringify(this.tableData.warpBack.data.slice(2, 5)))
              let merge = this.$refs.warp.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              let mergeBack = this.$refs.warpBack.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              merge.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWarp[item.row - 2][i] = arrWarp[item.row - 2][item.col]
                  }
                }
              })
              mergeBack.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWarpBack[item.row - 2][i] = arrWarpBack[item.row - 2][item.col]
                  }
                }
              })
              let sum = 0
              arrWarp[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWarp[1][index] ? Number(arrWarp[1][index]) : 1
                let item3 = arrWarp[2][index] ? Number(arrWarp[2][index]) : 1
                sum += item1 * item2 * item3
              })
              arrWarpBack[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWarpBack[1][index] ? Number(arrWarpBack[1][index]) : 1
                let item3 = arrWarpBack[2][index] ? Number(arrWarpBack[2][index]) : 1
                sum += item1 * item2 * item3
              })
              this.warpInfo.weft = sum
            }
          },
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          mergeCells: true,
          width: '100%',
          height: 250
        },
        weft: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '纹版图']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            if (row === 0) {
              cellProperties.readOnly = true
            }
            if (row === 1) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.colorLength.map(item => item.label)
            }
            if (row === 5) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.GLArr
            }
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: [
            'mergeCells', // 合并单元格菜单
            'col_right',
            'col_left',
            'copy',
            '粘贴(Ctrl + V)',
            'undo',
            'redo',
            'remove_col'
          ],
          className: 'handsontable',
          number: 1,
          afterCreateCol: (index, amount) => {
            this.tableData.weft.number++
            for (let i = 0; i < this.tableData.weft.number; i++) {
              this.tableData.weft.data[0][i] = i + 1
            }
          },
          afterRemoveCol: (index, amount) => {
            this.tableData.weft.number--
            for (let i = 0; i < this.tableData.weft.number; i++) {
              this.tableData.weft.data[0][i] = i + 1
            }
          },
          afterChange: (changes, opt) => {
            // 计算纬向总计
            if (opt === 'edit') {
              let arrWeft = JSON.parse(JSON.stringify(this.tableData.weft.data.slice(2, 5)))
              let arrWeftBack = JSON.parse(JSON.stringify(this.tableData.weftBack.data.slice(2, 5)))
              let merge = this.$refs.weft.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              let mergeBack = this.$refs.weftBack.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              merge.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWeft[item.row - 2][i] = arrWeft[item.row - 2][item.col]
                  }
                }
              })
              mergeBack.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWeftBack[item.row - 2][i] = arrWeftBack[item.row - 2][item.col]
                  }
                }
              })
              let sum = 0
              arrWeft[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWeft[1][index] ? Number(arrWeft[1][index]) : 1
                let item3 = arrWeft[2][index] ? Number(arrWeft[2][index]) : 1
                sum += item1 * item2 * item3
              })
              arrWeftBack[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWeftBack[1][index] ? Number(arrWeftBack[1][index]) : 1
                let item3 = arrWeftBack[2][index] ? Number(arrWeftBack[2][index]) : 1
                sum += item1 * item2 * item3
              })
              this.weftInfo.total = sum
            }
          },
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          mergeCells: true,
          width: '100%',
          height: 250
        },
        weftBack: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '纹版图']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            if (row === 0) {
              cellProperties.readOnly = true
            }
            if (row === 1) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.colorLength.map(item => item.label)
            }
            if (row === 5) {
              cellProperties.type = 'dropdown'
              cellProperties.source = this.GLArr
            }
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: [
            'mergeCells', // 合并单元格菜单
            'col_right',
            'col_left',
            'copy',
            '粘贴(Ctrl + V)',
            'undo',
            'redo',
            'remove_col'
          ],
          className: 'handsontable',
          number: 1,
          afterCreateCol: (index, amount) => {
            this.tableData.weftBack.number++
            for (let i = 0; i < this.tableData.weftBack.number; i++) {
              this.tableData.weftBack.data[0][i] = i + 1
            }
          },
          afterRemoveCol: (index, amount) => {
            this.tableData.weftBack.number--
            for (let i = 0; i < this.tableData.weftBack.number; i++) {
              this.tableData.weftBack.data[0][i] = i + 1
            }
          },
          afterChange: (changes, opt) => {
            // 计算纬向总计
            if (opt === 'edit') {
              let arrWeft = JSON.parse(JSON.stringify(this.tableData.weft.data.slice(2, 5)))
              let arrWeftBack = JSON.parse(JSON.stringify(this.tableData.weftBack.data.slice(2, 5)))
              let merge = this.$refs.weft.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              let mergeBack = this.$refs.weftBack.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells
              merge.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWeft[item.row - 2][i] = arrWeft[item.row - 2][item.col]
                  }
                }
              })
              mergeBack.forEach((item) => {
                if (item.row === 3 || item.row === 4) {
                  for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
                    arrWeftBack[item.row - 2][i] = arrWeftBack[item.row - 2][item.col]
                  }
                }
              })
              let sum = 0
              arrWeft[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWeft[1][index] ? Number(arrWeft[1][index]) : 1
                let item3 = arrWeft[2][index] ? Number(arrWeft[2][index]) : 1
                sum += item1 * item2 * item3
              })
              arrWeftBack[0].forEach((item, index) => {
                let item1 = item ? Number(item) : 0
                let item2 = arrWeftBack[1][index] ? Number(arrWeftBack[1][index]) : 1
                let item3 = arrWeftBack[2][index] ? Number(arrWeftBack[2][index]) : 1
                sum += item1 * item2 * item3
              })
              this.weftInfo.total = sum
            }
          },
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          mergeCells: true,
          width: '100%',
          height: 250
        }
      },
      // 是否为双面巾
      ifDouble: {
        warp: false,
        weft: false
      },
      // 插入列数
      insertNumber: {
        warp: '',
        weft: '',
        warpBack: '',
        weftBack: ''
      },
      // 倒序
      invertedOrder: {
        warp: ['', ''],
        weft: ['', ''],
        warpBack: ['', ''],
        weftBack: ['', '']
      },
      weight: '',
      coefficient: [],
      desc: '',
      // 导入工艺单数据
      gyd: '',
      gydArr: [],
      loadingS: true
    }
  },
  watch: {
    GLFlag (newVal) {
      if (newVal === 'normal') {
        this.GL.length = 1
      }
    },
    repeatPM: {
      handler: function (newVal) {
        if (this.PMFlag === 'complex') {
          newVal.forEach((item) => {
            item.total = item.children.reduce((sum, current) => {
              return sum + Number(current.number)
            }, 0)
          })
        }
      },
      deep: true
    }
  },
  computed: {
    // 主夹信息根据颜色长度动态计算
    colorLength () {
      let maxLen = this.colour[0].colorWeft.length
      let arr = []
      for (let i = 0; i < maxLen; i++) {
        arr.push({
          value: i,
          label: i !== 0 ? '夹' + i : '主'
        })
      }
      return arr
    },
    // 统计不重复的物料信息
    allMaterial () {
      let arr = []
      arr.push(this.yarn.yarnWarp)
      arr.push(this.yarn.yarnWeft)
      arr = arr.concat(this.yarn.yarnOtherWarp.map(item => item.value)).concat(this.yarn.yarnOtherWeft.map(item => item.value))
      arr = arr.concat(this.material.materialWarp.map((item) => item.value)).concat(this.material.materialWeft.map(item => item.value))
      return Array.from(new Set(arr)).filter(item => !!item).length > 0 ? Array.from(new Set(arr)).filter(item => !!item) : ['未选择']
    },
    // 纹版图下拉框选项
    GLArr () {
      return new Array(this.GL.length).fill('').map((item, index) => this.alphabet[index])
    },
    // 表格里的纹版图下拉框
    PMArr () {
      return new Array(this.repeatPM.length).fill('').map((item, index) => this.romanNum[index])
    },
    weimi () {
      if (this.weftInfo.neichang && this.weftInfo.rangwei) {
        return ((this.weftInfo.total / (this.weftInfo.neichang + this.weftInfo.rangwei))).toFixed(2)
      } else {
        return 0
      }
    }
  },
  methods: {
    afterSave (data) {
      this.msgFlag = data.msgFlag
    },
    sendMsg () {
      let data = JSON.parse(window.localStorage.getItem(this.localName))
      let formData = {
        title: data.title,
        type: data.type,
        tag: '工序',
        content: this.content,
        router_url: this.msgUrl,
        receive_user: data.receive_user
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {
          this.$message.success('添加成功')
          this.$router.push(this.msgUrl)
        }
      })
    },
    addColour () {
      let maxLen = this.colour[0].colorWeft.length // 保持新增的配色方案和之前的配色方案主夹长度相同
      let array = new Array(maxLen).fill('')
      this.colour.push({
        value: '',
        colorWeft: JSON.parse(JSON.stringify(array)),
        colorWarp: JSON.parse(JSON.stringify(array))
      })
    },
    deleteColour (index) {
      if (this.colour.length > 1) {
        this.colour.splice(index, 1)
      } else {
        this.$message.error({
          message: '至少有一种配色方案'
        })
      }
    },
    // 保持每种配色方案的主夹长度相同
    addColor () {
      this.colour.forEach((item) => {
        item.colorWarp.push('')
        item.colorWeft.push('')
      })
    },
    deleteColor () {
      if (this.colour[0].colorWeft.length > 1) {
        this.colour.forEach((item) => {
          item.colorWarp.pop()
          item.colorWeft.pop()
        })
      } else {
        this.$message.error({
          message: '至少有一种颜色'
        })
      }
    },
    useWarpColor () {
      this.colour.forEach((item) => {
        item.colorWeft = JSON.parse(JSON.stringify(item.colorWarp))
      })
    },
    addYarn (type) {
      this.yarn['yarnOther' + type].push({
        value: '',
        array: ['']
      })
    },
    deleteYarn (type, index) {
      this.yarn['yarnOther' + type].splice(index, 1)
    },
    addYarnArr (type, index) {
      this.yarn['yarnOther' + type][index].array.push('')
    },
    deleteYarnArr (type, index) {
      if (this.yarn['yarnOther' + type][index].array.length > 1) {
        this.yarn['yarnOther' + type][index].array.pop()
      } else {
        this.$message.error({
          message: '至少有一个'
        })
      }
    },
    addMaterial (type) {
      this.material['material' + type].push({
        value: '',
        number: '',
        array: ['']
      })
    },
    deleteMaterial (type, index) {
      this.material['material' + type].splice(index, 1)
    },
    addMaterialArr (type, index) {
      this.material['material' + type][index].array.push('')
    },
    deleteMaterialArr (type, index) {
      if (this.material['material' + type][index].array.length > 1) {
        this.material['material' + type][index].array.pop()
      } else {
        this.$message.error({
          message: '至少有一个'
        })
      }
    },
    addGL () {
      this.GL.push([['', '', '']])
    },
    deleteGL (index) {
      if (this.GL.length > 1) {
        this.GL.splice(index, 1)
      } else {
        this.$message.error({
          message: '至少有一个纹版'
        })
      }
    },
    addGLChildren (index) {
      this.GL[index].push(['', '', ''])
    },
    deleteGLChildren (index) {
      if (this.GL[index].length > 1) {
        this.GL[index].pop()
      } else {
        this.$message.error({
          message: '至少有一个纹版'
        })
      }
    },
    addPM () {
      this.repeatPM.push({
        value: '',
        repeat: '',
        number: '',
        total: 0,
        GL: '',
        children: [{
          number: '',
          children: [{
            value: '',
            repeat: ''
          }]
        }]
      })
    },
    deletePM (index) {
      if (this.repeatPM.length > 1) {
        this.repeatPM.splice(index, 1)
      } else {
        this.$message.error({
          message: '至少有一种穿综循环'
        })
      }
    },
    savePM () {
      this.$prompt('<div style="font-size:16px">本次操作将以<strong style="color:#1A95FF">穿综法</strong>中实际填写的信息为准，请为该常用穿综法<strong style="color:#1A95FF">命名</strong>，在确认信息无误后点击保存：</div>', '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '保存',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        savePM({
          name: value,
          pattern_loop: {
            PM: this.repeatPM.map((item) => {
              item.number = 0
              return item
            }),
            GL: this.GL
          },
          data: {
            PMFlag: this.PMFlag,
            GLFlag: this.GLFlag
          }
        })
        this.$message({
          type: 'success',
          message: '调接口'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    getPM (value) {
      const flag = JSON.parse(value.data)
      const data = JSON.parse(value.pattern_loop)
      this.GL = data.GL
      this.repeatPM = data.PM
      this.GLFlag = flag.GLFlag
      this.PMFlag = flag.PMFlag
    },
    deleteCommonPM (id) {
      this.$confirm('此操作将删除该常用穿综, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePM({ id: id }).then((res) => {
          this.$message.success({
            message: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    addPMChild (index) {
      this.repeatPM[index].children.push({
        number: '',
        children: [{
          value: '',
          repeat: ''
        }]
      })
    },
    deletePMChild (index, indexChild) {
      if (this.repeatPM[index].children.length > 1) {
        this.repeatPM[index].children.splice(indexChild, 1)
      } else {
        this.$message.error({
          message: '至少有一种穿综循环'
        })
      }
    },
    addPMLine (index, indexChild) {
      this.repeatPM[index].children[indexChild].children.push({
        value: '',
        repeat: ''
      })
    },
    deletePMLine (index, indexChild, indexLine) {
      if (this.repeatPM[index].children[indexChild].children.length > 1) {
        this.repeatPM[index].children[indexChild].children.splice(indexLine, 1)
      } else {
        this.$message.error({
          message: '至少有一行'
        })
      }
    },
    // 匹配主/夹名称
    filterMethods (index) {
      if (index === 0) {
        return '主'
      } else {
        return '夹' + index
      }
    },
    saveAll () {
      // saveCraft
      // console.log(this.allMaterial)
      // 获取合并单元格信息
      // console.log(this.$refs)
      let errorInput = false
      errorInput = this.colour.some((itemColour) => {
        if (!itemColour.value) {
          return true
        }
        return itemColour.colorWarp.some((itemColor) => {
          if (!itemColor.name) {
            return true
          }
        }) || itemColour.colorWeft.some((itemColor) => {
          if (!itemColor.name) {
            return true
          }
        })
      })
      if (errorInput) {
        this.$message.error({
          message: '检测到配色方案信息不完整'
        })
        return
      }
      errorInput = !this.yarn.yarnWarp || !this.yarn.yarnWeft
      if (errorInput) {
        this.$message.error({
          message: '检测到主要原料信息不完整'
        })
        return
      }
      errorInput = this.yarn.yarnOtherWarp.some((item) => {
        return item.value && item.array.some((apply) => {
          return apply === ''
        })
      })
      if (errorInput) {
        this.$message.error({
          message: '检测到经向次要原料信息不完整'
        })
        return
      }
      errorInput = this.yarn.yarnOtherWeft.some((item) => {
        return item.value && item.array.some((apply) => {
          return apply === ''
        })
      })
      if (errorInput) {
        this.$message.error({
          message: '检测到纬向次要原料信息不完整'
        })
        return
      }
      errorInput = this.material.materialWarp.some((item) => {
        return item.value ? !item.number || item.array.some((apply) => {
          return apply === ''
        }) : item.number ? !item.value || item.array.some((apply) => {
          return apply === ''
        }) : false
      })
      if (errorInput) {
        this.$message.error({
          message: '检测到经向辅助原料信息不完整'
        })
        return
      }
      errorInput = this.material.materialWeft.some((item) => {
        return item.value ? !item.number || item.array.some((apply) => {
          return apply === ''
        }) : item.number ? !item.value || item.array.some((apply) => {
          return apply === ''
        }) : false
      })
      if (errorInput) {
        this.$message.error({
          message: '检测到纬向辅助原料信息不完整'
        })
        return
      }
      errorInput = this.tableData.warp.data.some((item, index) => {
        if (index === 2 || index === 1) {
          return item.some((value) => {
            return !value
          })
        } else {
          return false
        }
      })
      if (errorInput) {
        this.$message.error({
          message: '检测到经向排列信息不完整'
        })
        return
      }
      if (this.ifDouble.warp) {
        errorInput = this.tableData.warpBack.data.some((item, index) => {
          if (index === 2 || index === 1) {
            return item.some((value) => {
              return !value
            })
          } else {
            return false
          }
        })
      }
      if (errorInput) {
        this.$message.error({
          message: '检测到经向反面排列信息不完整'
        })
        return
      }
      errorInput = this.tableData.weft.data.some((item, index) => {
        if (index === 2 || index === 1) {
          return item.some((value) => {
            return !value
          })
        } else {
          return false
        }
      })
      if (errorInput) {
        this.$message.error({
          message: '检测到纬向排列信息不完整'
        })
        return
      }
      if (this.ifDouble.weft) {
        errorInput = this.tableData.weftBack.data.some((item, index) => {
          if (index === 2 || index === 1) {
            return item.some((value) => {
              return !value
            })
          } else {
            return false
          }
        })
      }
      if (errorInput) {
        this.$message.error({
          message: '检测到纬向反面排列信息不完整'
        })
        return
      }
      if (!this.warpInfo.reed_width) {
        this.$message.error({
          message: '请输入筘幅'
        })
        return
      }
      if (!this.weftInfo.neichang) {
        this.$message.error({
          message: '请输入内长'
        })
        return
      }
      if (!this.weftInfo.rangwei) {
        this.$message.error({
          message: '请输入让位'
        })
        return
      }
      // if (!this.weight) {
      //   this.$message.error({
      //     message: '请输入产品克重'
      //   })
      //   return
      // }
      errorInput = this.coefficient.some((item) => {
        return item === ''
      })
      if (errorInput) {
        this.$message.error({
          message: '请输入物料系数'
        })
        return
      }
      if (this.PMFlag === 'normal') {
        errorInput = this.repeatPM.some((item) => {
          return item.number === '' || Number(item.number) === 0
        })
      } else {
        this.repeatPM.forEach((item) => {
          item.children.forEach((itemChild) => {
            if (itemChild.number === '') {
              errorInput = true
            }
          })
        })
      }
      if (errorInput) {
        this.$message.error({
          message: '请填写穿综循环的根数'
        })
        return
      }
      let formData = {
        id: null,
        is_draft: 1,
        company_id: window.sessionStorage.getItem('company_id'),
        product_id: this.$route.params.id,
        weight: this.weight,
        desc: this.desc,
        yarn_coefficient: this.allMaterial.map((item, index) => {
          return {
            name: item,
            value: this.coefficient[index]
          }
        }),
        warp_data: {
          color_data: this.colour.map((item) => {
            return {
              product_color: item.value,
              color_scheme: item.colorWarp.map((itemColor) => {
                if (itemColor.name !== '空梭') {
                  return {
                    name: itemColor.name,
                    value: itemColor.color
                  }
                } else {
                  return {
                    name: null,
                    value: null
                  }
                }
              })
            }
          }),
          material_data: [{
            material_name: this.yarn.yarnWarp,
            type_material: 1,
            apply: this.colorLength.filter((item) => {
              return !(this.yarn.yarnOtherWarp.find((itemFind) => {
                return itemFind.array.find((itemArr) => {
                  return itemArr === item.value
                })
              }))
            }).map(item => item.value)
          }].concat(this.yarn.yarnOtherWarp.filter((item) => {
            return item.value !== ''
          }).map((item) => {
            return {
              material_name: item.value,
              apply: item.array,
              type_material: 2
            }
          })),
          assist_material: this.material.materialWarp.filter((item) => {
            return item.value !== ''
          }).map((item) => {
            return {
              material_name: item.value,
              number: item.number,
              apply: item.array
            }
          }),
          warp_rank: this.$refs.warp.hotInstance.getData().map((item, index) => {
            if (index === 1) {
              return item.map((itemJia) => {
                return this.colorLength.find((itemFind) => itemFind.label === itemJia).value
              })
            } else {
              return item
            }
          }),
          merge_data: this.$refs.warp.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells,
          back_status: this.ifDouble.warp,
          warp_rank_back: this.$refs.warpBack.hotInstance.getData().map((item, index) => {
            if (index === 1) {
              return item.map((itemJia) => {
                return this.colorLength.find((itemFind) => itemFind.label === itemJia) ? this.colorLength.find((itemFind) => itemFind.label === itemJia).value : ''
              })
            } else {
              return item
            }
          }),
          merge_data_back: this.$refs.warpBack.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells,
          weft: this.warpInfo.weft,
          side_id: this.warpInfo.side_id,
          machine_id: this.warpInfo.machine_id,
          width: this.warpInfo.width,
          reed_width_data: this.warpInfo.reed_width_data,
          reed: this.warpInfo.reed,
          reed_method: this.warpInfo.reed_method,
          reed_width: this.warpInfo.reed_width,
          sum_up: this.warpInfo.sum_up,
          contract_ratio: 100, // 缩率工艺单用不到，默认100
          additional_data: '' // 废弃字段
        },
        weft_data: {
          color_data: this.colour.map((item) => {
            return {
              product_color: item.value,
              color_scheme: item.colorWeft.map((itemColor) => {
                if (itemColor.name !== '空梭') {
                  return {
                    name: itemColor.name,
                    value: itemColor.color
                  }
                } else {
                  return {
                    name: null,
                    value: null
                  }
                }
              })
            }
          }),
          material_data: [{
            material_name: this.yarn.yarnWeft,
            type_material: 1,
            apply: this.colorLength.filter((item) => {
              return !(this.yarn.yarnOtherWeft.find((itemFind) => {
                return itemFind.array.find((itemArr) => {
                  return itemArr === item.value
                })
              }))
            }).map(item => item.value)
          }].concat(this.yarn.yarnOtherWeft.filter((item) => {
            return item.value !== ''
          }).map((item) => {
            return {
              material_name: item.value,
              apply: item.array,
              type_material: 2
            }
          })),
          assist_material: this.material.materialWeft.filter((item) => {
            return item.value !== ''
          }).map((item) => {
            return {
              material_name: item.value,
              number: item.number,
              apply: item.array
            }
          }),
          weft_rank: this.$refs.weft.hotInstance.getData().map((item, index) => {
            if (index === 1) {
              return item.map((itemJia) => {
                return this.colorLength.find((itemFind) => itemFind.label === itemJia).value
              })
            } else {
              return item
            }
          }),
          merge_data: this.$refs.weft.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells,
          back_status: this.ifDouble.weft,
          weft_rank_back: this.$refs.weftBack.hotInstance.getData().map((item, index) => {
            if (index === 1) {
              return item.map((itemJia) => {
                return this.colorLength.find((itemFind) => itemFind.label === itemJia) ? this.colorLength.find((itemFind) => itemFind.label === itemJia).value : ''
              })
            } else {
              return item
            }
          }),
          merge_data_back: this.$refs.weftBack.hotInstance.getPlugin('MergeCells').mergedCellsCollection.mergedCells,
          organization_id: this.weftInfo.organization_id,
          peifu: this.weftInfo.peifu,
          peifu_data: this.weftInfo.peifu_data,
          weimi: this.weimi,
          shangchiya: this.weftInfo.shangchiya,
          xiachiya: this.weftInfo.xiachiya,
          neichang: this.weftInfo.neichang,
          rangwei: this.weftInfo.rangwei,
          total: this.weftInfo.total,
          contract_ratio: 100 // 缩率工艺单用不到，默认100
        },
        draft_method: {
          PM: this.repeatPM.map((item, index) => {
            if (this.PMFlag === 'normal') {
              item.value = item.value.replace(/，/g, ',')
              item.repeat = Number(item.repeat) > 0 ? Number(item.repeat) : 1
            } else {
              item.children = item.children.map((item2) => {
                item2.children = item2.children.map((item3) => {
                  item3.value = item3.value.replace(/，/g, ',')
                  item3.repeat = Number(item3.repeat) > 0 ? Number(item3.repeat) : 1
                  return item3
                })
                return item2
              })
            }
            return item
          }),
          PMFlag: this.PMFlag,
          GL: this.GL.map((item) => {
            return item.map((item2) => {
              return item2.map((item3) => {
                if (item3) {
                  return item3.replace(/，/g, ',')
                } else {
                  return item3
                }
              })
            })
          }),
          GLFlag: this.GLFlag
        }
      }
      saveCraft(formData).then((res) => {
        if (res.data.code === 200) {
          if (this.msgFlag) {
            this.msgUrl = '/index/designFormDetail/' + res.data.data.id
            this.content = '<span style="color:#1A95FF">添加</span>了一张新工艺单<span style="color:#1A95FF">' + res.data.data.craft_code + '</span>'
            this.sendMsg()
          } else {
            this.$message.success('添加成功')
            this.$router.push('/index/designFormDetail/' + res.data.data.id)
          }
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      })
    },
    // 插入列操作
    addCol (type) {
      if (Number(this.insertNumber[type]) && Number(this.insertNumber[type]) > 0) {
        for (let i = 0; i < Number(this.insertNumber[type]); i++) {
          this.tableData[type].data.forEach((item, index) => {
            if (index === 0) {
              item.push(item.length + 1)
            } else {
              item.push('')
            }
          })
          this.tableData[type].number++
        }
        this.$refs[type].hotInstance.loadData(this.tableData[type].data)
      } else {
        this.$message.error({
          message: '请输入正确的正整数'
        })
      }
    },
    // 倒序操作
    invertedCol (type) {
      if (Number(this.invertedOrder[type][0]) && Number(this.invertedOrder[type][1]) && Number(this.invertedOrder[type][0]) > 0 && Number(this.invertedOrder[type][1]) > 0) {
        let reverseArr = this.tableData[type].data.map((item) => {
          let copy = JSON.parse(JSON.stringify(item))
          return copy.slice(Number(this.invertedOrder[type][0] - 1), Number(this.invertedOrder[type][1])).reverse()
        })
        reverseArr.forEach((item, index) => {
          if (index === 0) {
            for (let i = 0; i < item.length; i++) {
              this.tableData[type].number++
              this.tableData[type].data[index].push(this.tableData[type].number)
            }
          } else {
            this.tableData[type].data[index] = this.tableData[type].data[index].concat(item)
          }
        })
        // 触发一下表格更新，重新获取数据
        this.$refs[type].hotInstance.loadData(this.tableData[type].data)
      } else {
        this.$message.error({
          message: '请输入正确的正整数'
        })
      }
    },
    // 重置操作
    clearTable (type) {
      this.$confirm('此操作将清空表格数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData[type].data = [[1], [null], [null], [null], [null], [null]]
        this.$refs[type].hotInstance.loadData(this.tableData[type].data)
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    addOneCol (type) {
      this.tableData[type].data.forEach((item, index) => {
        if (index === 0) {
          item.push(item.length + 1)
        } else {
          item.push('')
        }
      })
      this.tableData[type].number++
    },
    deleteOneCol (type) {
      this.tableData[type].data.forEach((item) => {
        if (item.length > 1) {
          item.pop()
        } else {
          this.$message.error({
            message: '至少有一列数据'
          })
        }
      })
      if (this.number > 1) {
        this.tableData[type].number--
      }
    },
    // 查找工艺单
    remoteMethod (query) {
      if (query !== '') {
        this.loadingS = true
        craftList({
          company_id: this.companyId,
          type_id: null,
          style_id: null,
          category_id: null,
          limit: 20,
          page: 1,
          craft_code: query,
          is_draft: null
        }).then((res) => {
          this.gydArr = res.data.data
          this.loadingS = false
        })
      } else {
        this.gydArr = []
      }
    },
    // 导入单张工艺单
    getCraft (code) {
      this.loading = true
      craftOne({
        id: code
      }).then((res) => {
        let data = res.data.data
        this.warpInfo = data.warp_data
        this.weftInfo = data.weft_data
        this.colour = this.warpInfo.color_data.map((item, index) => {
          return {
            value: '', // 配色清空，不同产品配色不同
            colorWarp: item.color_scheme.map((item) => {
              return {
                name: item.name,
                color: item.value
              }
            }),
            colorWeft: this.weftInfo.color_data[index].color_scheme.map((item) => {
              return {
                name: item.name,
                color: item.value
              }
            })
          }
        })
        this.yarn.yarnWarp = this.warpInfo.material_data.find((item) => item.type_material === 1).material_name
        this.yarn.yarnWeft = this.weftInfo.material_data.find((item) => item.type_material === 1).material_name
        this.yarn.yarnOtherWarp = this.warpInfo.material_data.filter((item) => item.type_material === 2)
        this.yarn.yarnOtherWeft = this.weftInfo.material_data.filter((item) => item.type_material === 2)
        this.material.materialWarp = this.warpInfo.assist_material.map((item) => {
          return {
            value: item.material_name,
            number: item.number,
            array: item.apply
          }
        })
        this.material.materialWeft = this.weftInfo.assist_material.map((item) => {
          return {
            value: item.material_name,
            number: item.number,
            array: item.apply
          }
        })
        this.warpInfo.warp_rank = JSON.parse(this.warpInfo.warp_rank)
        this.warpInfo.warp_rank_back = JSON.parse(this.warpInfo.warp_rank_back)
        this.weftInfo.weft_rank = JSON.parse(this.weftInfo.weft_rank)
        this.weftInfo.weft_rank_back = JSON.parse(this.weftInfo.weft_rank_back)
        this.tableData.warp.mergeCells = JSON.parse(this.warpInfo.merge_data)
        this.tableData.weft.mergeCells = JSON.parse(this.weftInfo.merge_data)
        this.tableData.warpBack.mergeCells = JSON.parse(this.warpInfo.merge_data_back)
        this.tableData.weftBack.mergeCells = JSON.parse(this.weftInfo.merge_data_back)
        this.tableData.warp.number = this.warpInfo.warp_rank[0].length
        this.tableData.warpBack.number = this.warpInfo.warp_rank_back[0].length
        this.tableData.weft.number = this.weftInfo.weft_rank[0].length
        this.tableData.weftBack.number = this.weftInfo.weft_rank_back[0].length
        if (data.is_draft === 2) {
          this.warpInfo.warp_rank.splice(2, 1)
          this.warpInfo.warp_rank_back.splice(2, 1)
          this.weftInfo.weft_rank.splice(2, 1)
          this.weftInfo.weft_rank_back.splice(2, 1)
          this.tableData.warp.mergeCells.forEach((item) => {
            item.row--
          })
          this.tableData.weft.mergeCells.forEach((item) => {
            item.row--
          })
          this.tableData.warpBack.mergeCells.forEach((item) => {
            item.row--
          })
          this.tableData.weftBack.mergeCells.forEach((item) => {
            item.row--
          })
        }
        this.$refs.warp.hotInstance.loadData(this.warpInfo.warp_rank.map((item, index) => {
          return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
        }))
        this.$refs.weft.hotInstance.loadData(this.weftInfo.weft_rank.map((item, index) => {
          return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
        }))
        this.tableData.warp.data = this.warpInfo.warp_rank.map((item, index) => {
          return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
        })
        this.tableData.weft.data = this.weftInfo.weft_rank.map((item, index) => {
          return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
        })
        if (data.warp_data.back_status === 1) {
          this.$refs.warpBack.hotInstance.loadData(this.warpInfo.warp_rank_back.map((item, index) => {
            return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
          }))
          this.tableData.warpBack.data = this.warpInfo.warp_rank_back.map((item, index) => {
            return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
          })
        }
        if (data.weft_data.back_status === 1) {
          this.$refs.weftBack.hotInstance.loadData(this.weftInfo.weft_rank_back.map((item, index) => {
            return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
          }))
          this.tableData.weftBack.data = this.weftInfo.weft_rank_back.map((item, index) => {
            return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
          })
        }
        this.ifDouble.warp = data.warp_data.back_status
        this.ifDouble.weft = data.weft_data.back_status

        this.GL = data.draft_method.GL
        this.GLFlag = data.draft_method.GLFlag
        this.repeatPM = data.draft_method.PM
        this.PMFlag = data.draft_method.PMFlag
        this.desc = data.desc
        this.weight = data.weight
        this.coefficient = data.yarn_coefficient.map((item) => item.value)
        this.loading = false
      })
    }
  },
  mounted () {
    Promise.all([porductOne({
      id: this.$route.params.id
    }), YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    }), YarnColorList({
      company_id: this.companyId
    }), materialList({
      company_id: this.companyId
    }), PMList({

    })]).then((res) => {
      // console.log(res)
      this.productInfo = res[0].data.data
      this.yarn.yarnArr = res[1].data.data
      this.sideArr = res[2].data.data.side
      this.modeleArr = res[2].data.data.type
      this.methodArr = res[2].data.data.method
      this.colorArr = this.colorArr.concat(res[3].data.data)
      // this.material.materialArr = res[4].data.data
      this.commonPMArr = res[5].data.data
      this.loading = false
    })
    // 监听快捷键，给表格插入列
    // document.onkeydown = (e) => {
    //   if (e.keyCode === 187 && e.ctrlKey) {
    //     e.preventDefault()
    //     this.addOneCol('warp')
    //   } else if (e.keyCode === 189 && e.ctrlKey) {
    //     e.preventDefault()
    //     this.deleteOneCol('warp')
    //   } else if (e.keyCode === 187 && e.shiftKey) {
    //     e.preventDefault()
    //     this.addOneCol('weft')
    //   } else if (e.keyCode === 189 && e.shiftKey) {
    //     e.preventDefault()
    //     this.deleteOneCol('weft')
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/designFormCreateR.less";
.colorPicker {
  height: 32px;
  line-height: 32px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 16px;
  box-sizing: border-box;
  padding: 0;
  border: 0;
  border-radius: 2px;
  .realContent {
    border-radius: 2px;
  }
}
</style>
<style lang="less">
.select_del {
  color: #909399;
  width: 18px;
  height: 18px;
  display: block;
  margin: 8px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  &:hover {
    color: #fff;
    background: #f56c6c;
  }
}
#designFormCreateR {
  .nodeBox {
    .el-input__inner {
      border: 0;
    }
  }
  .smallWidth {
    .el-input__inner {
      width: 80px !important;
    }
  }
  .inline-input {
    width: 294px;
    .el-select {
      .el-input__inner {
        width: 80px !important;
      }
    }
    .el-input__inner {
      width: 158px !important;
    }
  }
  .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
  .el-input__icon {
    line-height: 32px !important;
  }
  .formCtn {
    .el-input__inner {
      width: 294px;
    }
  }
  .handsontable input,
  .handsontable textarea {
    text-align: center;
    line-height: 38px;
  }
  .textBtn {
    position: absolute;
    line-height: 32px;
    left: 105px;
    top: 0;
    font-size: 12px;
    color: #909399;
    cursor: pointer;
    &:hover {
      color: #1a95ff;
    }
  }
}
</style>
