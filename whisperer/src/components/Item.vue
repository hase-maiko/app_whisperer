<!-- Item.vue -->

<template>
  <li class="item">
    <div class="user-box">
      <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div> 
      <p class="user-name">{{user.name}}</p> 
    </div>
    <!-- editing = trueの時にのみ編集用テキストエリアを表示 -->
    <div v-if="editing" class="editor">
      <textarea v-model="whisper.content" placeholder="edit whisper" @keypress.enter="updateWhisper">
      </textarea>
      <p class="message">Press Enter to Whisper</p>
    </div>
    <div v-else class="content" v-html="whisper.content">
    </div>
    <!-- v-if="currentUser.uid == user.uid"
        投稿ユーザのIDとサインイン中のユーザーのIDが等しいかどうか確認 -->
    <button v-if="currentUser && currentUser.uid == user.id" @click="showBtns = !showBtns">
      <fa icon="ellipsis-v" />
    </button>

    <div v-if="showBtns" class="controls">
      <li @click="editing = !editing">edit</li>
      <li @click="deleteWhisper" style="color: red">
        delete
      </li>
    </div>
  </li>
</template>
<script>
import { db } from '../main'
import { auth } from '../main'
export default {
  // Home.vueから取得したwhisperのIDをidというプロパティに格納
  // 投稿ユーザーのIDをuidに格納
  props: ['id','uid'],
  data () {
    return {
      // whisperドキュメントを格納するための空のオブジェクトwhisperを用意
      whisper: {},
      // 同様に投稿ユーザーのドキュメントを格納するためのuserを用意
      user: {},
      currentUser: {},
      showBtns: false,
      editing: false
    }
  },
  methods: {
    deleteWhisper () {
      if (window.confirm('Are You Sure to Delete This Whisper?')) {
        db.collection('whispers').doc(this.$props.id).delete()
      }
    },
    updateWhisper () {
      const date = new Date()
      db.collection('whispers').doc(this.whisper.id).set({
        'content': this.whisper.content,
        'date': date
      }, { merge: true })
      .then(
        this.editing = false
      )
    }
  },
  created () {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  firestore () {
    return {
      // idプロパティと等しいIDを持つwhisperドキュメントを変数whisperに格納
      whisper: db.collection('whispers').doc(this.$props.id),
      // uidプロパティと等しいIDを持つuserドキュメントを変数userに格納
      user: db.collection('users').doc(this.$props.uid)
    }
  }
}
</script>
<style lang="stylus">
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  .editor
  position relative
    width 100%
    textarea
      background transparent
      resize none
      height 80px
      width 96%
      border none
      padding 10px 2%
      font-size .9rem
      font-weight lighter
      &:focus
        outline none
    .message
      opacity 0  
      position absolute
      bottom 5px
      right 10px
      transition .2s
      font-size .8rem
    &:hover
      .message
        opacity 1
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px
  button
    position absolute
    top 5px
    right 0
    background transparent
    color #555
    font-size .9rem
    opacity 0
    transition .2s
  .controls
    background white
    position absolute
    top 5px
    right 35px
    box-shadow 0 0 5px rgba(0,0,0,.05)
    border-radius 3px
    opacity 0
    li
      padding 5px 20px
      border-top 1px solid #eee
      cursor pointer
      &:first-child
        border none
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
    .content
    button
      opacity 1
    .controls
      opacity 1
</style>