<template>
  <div class="cast-board">
    <q-slider class="text-white" arrows>
      <div v-for="(c, index) in cast" slot="slide">
        <div>
          <span class="circular label bg-primary text-white shadow-1">{{index + 1}}</span>
        </div>
        <div class="floating-label text-white">
          <input v-model.lazy="c.name">
          <label>玩家名</label>
        </div>
      </div>
    </q-slider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cast: []
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    // 初始化
    for (let i = 0; i < 10; i++) {
      this.cast.push({name: ''})
    }
  }
}
</script>

<style lang="styl" scoped>
.role-board
  .role-board-header
    display flex
    align-items center
    .role-num
      flex 1
      width 0
  .list
    .item
      .item-counter
        position absolute
        right 0
        top 18px
</style>
