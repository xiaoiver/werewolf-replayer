<template>
  <div>
    <div class="game-baseinfo">
      <div class="list">
        <q-collapsible icon="explore" label="基本信息">
          {{game.baseInfo.location}}
        </q-collapsible>
      </div>
    </div>
    <timeline class="game-timeline" :timeline-length="game.cast.length">
    </timeline>
    <div class="game-zone">
      <div class="row">
        <div class="width-1of3 order-3 column items-center">
            <div v-for="seat in seats.col1" class="seat">
              <seat :seat="seat" direction="right"></seat>
            </div>
        </div>
        <div class="width-1of3 order-2 column justify-between items-center">
            <div>
              <button class="primary">
                <i class="on-left">gavel</i> 法官
              </button>
            </div>
            <div v-for="seat in seats.col2" class="seat">
              <seat :seat="seat"></seat>
            </div>
        </div>
        <div class="width-1of3 order-1 column reverse-column items-center">
          <div v-for="seat in seats.col3" class="seat">
            <seat :seat="seat"></seat>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Timeline from './Timeline'
import Seat from './Seat'

export default {
  components: {
    'timeline': Timeline,
    'seat': Seat
  },
  computed: {
    ...mapGetters([
      'game'
    ])
  },
  data () {
    return {
      seats: {
        col1: [], // 第一列
        col2: [], // 第二列，包含法官
        col3: [] // 第三列
      }
    }
  },
  methods: {
    ...mapActions([
      'getGameById'
    ]),
    /**
     * 转成两列的座位
     *
     */
    arrangeSeats (cast) {
      let c = Math.floor(this.game.cast.length / 2)
      this.seats.col1 = this.game.cast.slice(0, c)
      this.seats.col2 = [this.game.cast[c]]
      this.seats.col3 = this.game.cast.slice(c + 1)
    }
  },
  async mounted () {
    try {
      await this.getGameById(this.$route.params.id)
      this.arrangeSeats()
    }
    catch (e) {}
  }
}
</script>

<style lang="styl" scoped>
  .seat
    padding 0
</style>