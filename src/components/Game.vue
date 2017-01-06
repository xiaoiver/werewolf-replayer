<template>
  <div>
    <div :class="selectSeatBackdrop" class="backdrop animate-fade"
      @click="selectSeatBackdrop.opened = false"></div>
    <div class="game-baseinfo">
      <div class="list">
        <q-collapsible icon="explore" label="基本信息">
          {{game.baseInfo.location}}
        </q-collapsible>
      </div>
    </div>
    <timeline class="game-timeline"
      ref="timeline"
      :timeline-length="game.cast.length"
      :current-idx="currentTimeIdx"
      @select-time="onTimelineSelected">
    </timeline>
    <div class="game-zone">
      <div class="row">
        <div class="width-1of3 order-3 column items-center">
            <div v-for="seat in seats.col1" :class="selectSeatBackdrop" class="seat">
              <seat 
                :seat="seat"
                @unselect-seat="onSeatUnselected"
                @comfirm-seat="onSeatConfirmed"
                direction="right"></seat>
            </div>
        </div>
        <div class="width-1of3 order-2 column justify-between items-center">
            <div>
              <q-fab
                classNames="purple"
                icon="gavel"
                direction="down"
              >
                <q-small-fab
                  class="primary"
                  @click.native="enterNextDay()"
                >keyboard_arrow_right</q-small-fab>
                <q-small-fab
                  class="primary"
                  @click.native="enterNextDay()"
                >edit</q-small-fab>
              </q-fab>
            </div>
            <action-board
              @select-seat="onSeatSeleted"
              :action="activeAction"></action-board>
            <div v-for="seat in seats.col2" :class="selectSeatBackdrop" class="seat">
              <seat
                :seat="seat"
                @unselect-seat="onSeatUnselected"
                @comfirm-seat="onSeatConfirmed"></seat>
            </div>
        </div>
        <div class="width-1of3 order-1 column reverse-column items-center">
          <div v-for="seat in seats.col3" :class="selectSeatBackdrop" class="seat">
            <seat
              :seat="seat"
              @unselect-seat="onSeatUnselected"
              @comfirm-seat="onSeatConfirmed"></seat>
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
import ActionBoard from './ActionBoard'

export default {
  components: {
    'timeline': Timeline,
    'action-board': ActionBoard,
    'seat': Seat
  },
  computed: {
    ...mapGetters([
      'game'
    ])
  },
  data () {
    return {
      currentTime: {},
      seats: {
        col1: [], // 第一列
        col2: [], // 第二列，包含法官
        col3: [] // 第三列
      },
      activeAction: {extraNotes:[]},
      actionType: '',
      actions: {},
      currentTimeIdx: -1,
      selectSeatBackdrop: {
        opened: false
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
    },
    /**
     * 时间轴切换处理
     *
     */
    onTimelineSelected ({time}) {
      this.currentTime = Object.assign({}, {
        type: time.day.type,
        idx: time.idx
      })
    },
    /**
     * 座位选择处理
     *
     */
    onSeatSeleted ({action}) {
      this.actionType = action.actionType
      this.selectSeatBackdrop.opened = true
    },
    onSeatUnselected () {
      this.selectSeatBackdrop.opened = false
    },
    onSeatConfirmed ({seat}) {
      this.selectSeatBackdrop.opened = false
      this.activeAction = Object.assign({}, {
        seatNum: seat.seatNum,
        actionType: this.actionType
      })
    },
    /**
     * 进入下一天／夜
     *
     */
    enterNextDay () {
      // 展示时间动画
      // 推进时间线
      this.currentTimeIdx++
      this.$refs.timeline.activateTime(this.currentTimeIdx, true)
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
  .backdrop
    &.opened
      display block
      background rgba(255, 255, 255, 0.5)
      z-index 9
  .game-zone
    position relative
  .seat
    padding 0
    &.opened
      z-index 10
</style>