<!-- Header.vue -->
<template>
  <header>
    <router-link to="/">
      <h1>whisp.</h1>
    </router-link>
    <!-- ログインユーザーがいる場合の表示 -->
    <div v-if="currentUser" class="btns">
      <!-- ヘッダーのユーザーアイコンをクリックするとサインイン中のユーザーのページにアクセス -->
      <router-link :to="'/user/'+currentUser.uid">
        <button :style="'background-image: url('+currentUser.photoURL+')'">
        </button>
      </router-link>
      <button>
        <fa icon="sign-out-alt" @click="signOut" />
      </button>
    </div>
    <!-- ログインユーザーがいない場合の表示 -->
    <div v-else class="btns">
      <button>
        <fa icon="user" @click="signIn" />
      </button>
    </div>
  </header>
</template>
<script>
  // Firebaseのプラグインをインポート
  import firebase from 'firebase'
  // mainからauthをインポートする
  import { auth } from '../main'
  import { db } from '../main'
  export default {
    data () {
      return {
        // currentUser→サインイン中のユーザーデータを格納する変数
        currentUser: {}    
      }
    },
    created () {
      // currentUserという変数の中に、現在サインインしているユーザーのデータを入れる
      auth.onAuthStateChanged(user => {
        this.currentUser = user
      })
    },
    methods: {
      // サインイン
      signIn () {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
        .then((result) => {
          // サインイン後にユーザーページに自動的に移動
          this.$router.push('/user/'+result.user.uid)
          // ユーザ名をアラートで表示
          alert('Hello, '+result.user.displayName+'!')
          this.createUser(result.user)
        })
      },
      // createUser→ユーザー情報作成のための関数
      // userのuidをIDとするドキュメントをusersコレクションに追加
      // name、photoURL、emailをフィールドとして保存
      createUser (user) {
        db.collection('users').doc(user.uid).set({
          'name': user.displayName,
          'photoURL': user.photoURL,
          'email':user.email
        }, { merge: true })
      },
      // サインアウト
      signOut () {
        if (window.confirm('Are You Sure to Sign Out?')) {
          auth.signOut()
          .then(() => {
            // サインアウト後、アラートを出す
            alert('You Safely Signed Out.')
            // トップページに戻る
            this.$router.push('/'),
            // ページをリロード
            location.reload()
          })
        }
      }
    }
  }
</script>
signInの中身
<style lang="stylus" scoped>
header
  position fixed
  top 0
  width 100%
  text-align center
  padding 10px
  h1
    width fit-content
    margin 0 auto
    font-size 1.4rem
  .btns
    position absolute
    top 10px
    right 30px
    cursor pointer
    img
      width 100%
</style>