import Vue from 'vue'
import App from './App.vue'
import router from './router'

// アイコンを使うためのlibraryをインポート
import { library } from '@fortawesome/fontawesome-svg-core' 
// 使用する３つのアイコンをfree-solid-svg-iconsの中から選んでインポート
import {
  faUser,
  faSignOutAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
// FontAwesomeIconというコンポーネントをインポート
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// インポートしたアイコンをlibraryに登録
library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)
// FontAwesomeIconをfaという略式で呼べるように設定
Vue.component('fa', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
