<template>
  <div id="productPlanDetail">
    <div class="head">
      <h2>产品计划单详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">工艺单编号:</span>
          <span class="content">KR-0001</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content">KR19011101</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品名称:</span>
          <span class="content">围巾/针织/长巾</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品花型:</span>
          <span class="content">条纹</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品规格:</span>
          <span class="content contentLine"
                v-for="(item,key) in productDetail.size"
                :key="key">
            <span class="size">{{key}}</span>
            <span class="sizeDetail">
              <span class="sizeOnce"
                    v-for="itemChild in item"
                    :key="itemChild.id">{{itemChild.size_name + '：' + itemChild.size_value + (itemChild.size_name == '克重' ? 'g' : 'cm')}}</span>
              <!-- <span class="sizeOnce">{{ item[0].weight + 'g' + '(克重)'}}</span> -->
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">损耗比例:</span>
          <span class="content">8%</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">主要原料:</span>
          <!-- <span class="content">8%</span> -->
          <div class="content tableBox">
            <yl-table color="#1A95FF"
                      :date='productDetail.date1'
                      class="table" />
            <yl-table color="#1A95FF"
                      :date='productDetail.date2'
                      class="table marT" />
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">主要辅料:</span>
          <div class="content tableBox">
            <yl-table color="#1A95FF"
                      :date='productDetail.date1'
                      class="table" />
            <yl-table color="#1A95FF"
                      :date='productDetail.date3'
                      class="table marT" />
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label change">外道加工流程:</span>
          <ul class="liucheng content">
            <li v-for="(item,index) in productDetail.liucheng"
                :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="cancel"
                  @click="cancel">取消</span>
            <span class="save"
                  @click='save'>保存</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ylTable from '@/components/table/table.vue'
// import { porductOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      // defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      productDetail: {
        size: {
          S: [
            {
              size_name: '长',
              size_value: '20'
            },
            {
              size_name: '宽',
              size_value: '10'
            },
            {
              size_name: '克重',
              size_value: '100'
            }
          ],
          M: [
            {
              size_name: '长',
              size_value: '20'
            },
            {
              size_name: '宽',
              size_value: '10'
            },
            {
              size_name: '克重',
              size_value: '100'
            }
          ]
        },
        date1: [
          {
            name: 'S',
            data: ['黑白', '蓝紫', '灰绿']
          },
          {
            name: '52支单股上光晴纶',
            data: [
              {
                black: 460,
                while: 460
              },
              {
                blue: 460,
                purple: 460
              },
              {
                gray: 460,
                green: 460
              }
            ]
          },
          {
            name: '36支上光晴纶',
            data: [
              {
                black: 460,
                while: 460
              },
              {
                blue: 460,
                purple: 460
              },
              {
                gray: 460,
                green: 460
              }
            ]
          }
        ],
        date2: [
          {
            name: 'M',
            data: ['黑白', '蓝紫', '灰绿']
          },
          {
            name: '52支单股上光晴纶',
            data: [
              {
                black: 460,
                while: 460
              },
              {
                blue: 460,
                purple: 460
              },
              {
                gray: 460,
                green: 460
              }
            ]
          },
          {
            name: '36支上光晴纶',
            data: [
              {
                black: 460,
                while: 460
              },
              {
                blue: 460,
                purple: 460
              },
              {
                gray: 460,
                green: 460
              }
            ]
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          }
        ],
        date3: [
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '52支单股上光晴纶',
            data: [
              {
                black: 460,
                while: 460
              },
              {
                blue: 460,
                purple: 460
              },
              {
                gray: 460,
                green: 460
              }
            ]
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '52支单股上光晴纶',
            data: [
              {
                black: 460,
                while: 460
              },
              {
                blue: 460,
                purple: 460
              },
              {
                gray: 460,
                green: 460
              }
            ]
          }
        ],
        liucheng: ['搓须', '搓须', '搓须', '搓须', '搓须']
        // {
        //   [], [], [],
        //   S: [{
        //     name: '52支单股上光晴纶',
        //     black: 460,
        //     while: 460,
        //     blue: 460,
        //     purple: 460,
        //     gray: 460,
        //     green: 460
        //   }, {
        //     name: '36支上光晴纶',
        //     black: 460,
        //     while: 460,
        //     blue: 460,
        //     purple: 460,
        //     gray: 460,
        //     green: 460
        //   }]

        // },
      }
      // loading: true
    }
  },
  components: {
    ylTable
  },
  methods: {
    cancel () {

    },
    save () {

    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productPlanDetail.less";
</style>
