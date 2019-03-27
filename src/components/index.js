
import commonHeader from './header/header.vue'
import colorPicker from './colorPicker/colorPicker.vue'
export default {
  install: function (vue) {
    vue.component('commonHeader', commonHeader)
    vue.component('colorPicker', colorPicker)
  }
}
