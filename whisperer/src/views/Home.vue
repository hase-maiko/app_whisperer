<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src
// Firestoreのデータベースをインポート
import { db } from '../main' 

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
  }
}
</script>
