<template>
  <div id="designFormSetting">
    <div class="head">
      <h2>工艺单设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn" :style="{'max-height':flagObj.piece?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">纱线支数:</span>
          <el-input class="elInput" v-model="piece" placeholder="请输入纱线支数"></el-input>
          <div class="okBtn" @click="savePiece">添加</div>
          <div class="showAll" @click="flagObj.piece=!flagObj.piece">{{!flagObj.piece?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.piece?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in pieceArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deletePiece(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn" :style="{'max-height':flagObj.blast?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">纱线股数:</span>
          <el-input class="elInput" v-model="blast" placeholder="请输入纱线股数"></el-input>
          <div class="okBtn" @click="saveBlast">添加</div>
          <div class="showAll" @click="flagObj.blast=!flagObj.blast">{{!flagObj.blast?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.blast?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in blastArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteBlast(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn" :style="{'max-height':flagObj.type?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">纱线类型:</span>
          <el-input class="elInput" v-model="type" placeholder="请输入纱线类型"></el-input>
          <div class="okBtn" @click="saveType">添加</div>
          <div class="showAll" @click="flagObj.type=!flagObj.type">{{!flagObj.type?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.type?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in typeArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteType(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn" :style="{'max-height':flagObj.ruffled?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">边型:</span>
          <el-input class="elInput" v-model="ruffled" placeholder="请输入边型"></el-input>
          <div class="okBtn" @click="saveRuffled">添加</div>
          <div class="showAll" @click="flagObj.ruffled=!flagObj.ruffled">{{!flagObj.ruffled?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.ruffled?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in ruffledArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteRuffled(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn" :style="{'max-height':flagObj.model?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">机型:</span>
          <el-input class="elInput" v-model="model" placeholder="请输入机型"></el-input>
          <div class="okBtn" @click="saveModel">添加</div>
          <div class="showAll" @click="flagObj.model=!flagObj.model">{{!flagObj.model?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.model?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in modelArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteModel(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn" :style="{'max-height':flagObj.organization?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">组织法:</span>
          <el-input class="elInput" v-model="organization" placeholder="请输入组织法"></el-input>
          <div class="okBtn" @click="saveOrganization">添加</div>
          <div class="showAll" @click="flagObj.organization=!flagObj.organization">{{!flagObj.organization?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.organization?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in organizationArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteOrganization(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn" :style="{'max-height':flagObj.process?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">工序流程:</span>
          <el-input class="elInput" v-model="process" placeholder="请输入工序流程"></el-input>
          <div class="okBtn" @click="saveProcess">添加</div>
          <div class="showAll" @click="flagObj.process=!flagObj.process">{{!flagObj.process?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.process?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in processArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteProcess(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flagObj: {
        blast: false,
        piece: false,
        type: false,
        ruffled: false,
        model: false,
        organization: false,
        process: false
      },
      blast: '',
      blastArr: [{
        name: '单股',
        id: 1
      }, {
        name: '双股',
        id: 2
      }, {
        name: '多股',
        id: 3
      }],
      piece: '',
      pieceArr: [{
        name: '36支',
        id: 1
      }, {
        name: '52支',
        id: 2
      }, {
        name: '86支',
        id: 3
      }],
      type: '',
      typeArr: [{
        name: '晴纶',
        id: 1
      }, {
        name: '涤纶',
        id: 2
      }, {
        name: '羊毛',
        id: 3
      }],
      ruffled: '',
      ruffledArr: [{
        name: '一边',
        id: 1
      }, {
        name: '两边',
        id: 2
      }, {
        name: '三边',
        id: 3
      }],
      model: '',
      modelArr: [{
        name: '飞机',
        id: 1
      }, {
        name: '火车',
        id: 2
      }, {
        name: '发动机',
        id: 3
      }],
      organization: '',
      organizationArr: [{
        name: '组织1',
        id: 1
      }, {
        name: '组织2',
        id: 2
      }, {
        name: '组织3',
        id: 3
      }],
      process: '',
      processArr: [{
        name: '流程1',
        id: 1
      }, {
        name: '流程2',
        id: 2
      }, {
        name: '流程3',
        id: 3
      }]
    }
  },
  methods: {
    // 添加纱线支数
    savePiece () {

    },
    // 删除纱线支数
    deletePiece () {

    },
    // 添加纱线股数
    saveBlast () {

    },
    // 删除纱线股数
    deleteBlast () {

    },
    // 添加纱线类型
    saveType () {

    },
    // 删除纱线类型
    deleteType () {

    },
    // 添加边型
    saveRuffled () {

    },
    // 删除边型
    deleteRuffled () {

    },
    // 添加机型
    saveModel () {

    },
    // 删除机型
    deleteModel () {

    },
    // 添加组织法
    saveOrganization () {

    },
    // 删除组织法
    deleteOrganization () {

    },
    // 添加工艺流程
    saveProcess () {

    },
    deleteProcess () {

    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/designFormSetting.less';
</style>
