<template>
  <div class="home">
    <div class="list">
      <!-- Itemコンポーネントをループ表示させつつ、
      各whisperデータのIDをidというプロパティとして、
      また投稿ユーザーのIDをuidというプロパティとして
      それぞれItemコンポーネントに渡しています。 -->
      <Item 
        v-for="whisper in orderBy(whispers,'date',-1)"
        :key="whisper.id"
        :id="whisper.id"
        :uid="whisper.uid" 
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue' 
// Firestoreのデータベースをインポート
import { db } from '../main' 
// vue2-filtersを使えるようにする
import Vue2Filters from 'vue2-filters' 

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      // whispersという空の配列を、Firestoreから取得するwhisperデータの入れ物として用意
      whispers: []
    }
  },
  firestore () {
    // 空の配列whispersにFirestore内にある「whispers」コレクション内のドキュメントを格納
    return {
      whispers: db.collection('whispers')
    }
  },
  components: {
    Item
  },
  // vue2-filtersの機能を使用
  mixins: [Vue2Filters.mixin] 
}
</script>
<style lang="stylus" scoped>
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
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
</style>