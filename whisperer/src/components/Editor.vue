<!-- Editor.vue -->

<template>
  <li class="item">
    <div class="user-box">
      <div class="avatar" :style="'background-image: url('+currentUser.photoURL+')'"></div>
      <p class="user-name">{{currentUser.displayName}}</p>
    </div>
    <div class="editor">
      <textarea placeholder="new whisper" v-model="newWhisper" @keypress.enter="createWhisper">
      </textarea>
      <p class="message">Press Enter to Whisper</p>
    </div>
  </li>
</template>

<script>
import { db } from '../main'
export default {
  // User.vueから渡されるログインユーザーのデータを受け取れるようにする
  props: ['currentUser'],
    data () {
    return {
      // newWhisperという空の変数を用意し、
      // 後ほどユーザーがテキストエリアに記入した内容を、この変数に入れるように設定する
      newWhisper: ''
    }
  },
  methods: {
    // createWhipserという関数を作成し、その中で上の関数を実行するように設定
    createWhisper () {
      const date = new Date()
      db.collection('whispers').add({
        'content': this.newWhisper,
        'date': date,
        'uid': this.$props.currentUser.uid
      })
      // 新規投稿後にテキストエリアを空欄に戻すよう設定
      .then(
        this.newWhisper = ''
      )
    }
  }
}
</script>