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

// firebaseの初期化
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: "AIzaSyAaTuT1g4arXFmtLSynFaAyXW0pJZa-Oq8",
  authDomain: "whisperer-b2260.firebaseapp.com",
  databaseURL: "https://whisperer-b2260.firebaseio.com",
  projectId: "whisperer-b2260",
  storageBucket: "whisperer-b2260.appspot.com",
  messagingSenderId: "538624485413",
  appId: "1:538624485413:web:850729769be09f2c7177cc",
  measurementId: "G-BRJS7ZFQE4"
})

// dbという名前でアプリ内でFirestoreデータベースを使えるようにする
export const db = firebase.firestore()
// authという名前でユーザー管理のためのサービスを使えるようにする
export const auth = firebase.auth()

// FontAwesomeIconをfaという略式で呼べるように設定
Vue.component('fa', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
