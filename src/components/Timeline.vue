<template>
<div class="game-timeline shadow-1">
  <div v-for="(time, index) in timeline" class="game-time-btn-wrapper">
    <button :class="time.active" class="game-time-btn bg-blue-3 circular" @click="activateTime(index)">
      <i class="on-left">{{time.day && time.day.icon}}</i> {{time.idx}}
    </button>
    <div class="game-time-btn-decoration bg-blue-2"></div>
  </div>
</div>
</template>

<script>
import { Utils } from 'quasar'

const TIME_BTN_WIDTH = 72
const TIME_BTN_OFFSET = 8

export default {
  props: {
    timelineLength: {
      type: Number
    }
  },
  data () {
    return {
      activeIdx: 0,
      timeline: []
    }
  },
  watch: {
    timelineLength (l) {
      for (let i = 0; i < l; i++) {
        this.timeline.push({
          idx: Math.floor(i / 2) + 1,
          day: {
            type: i % 2 === 0 ? 'night' : 'day',
            icon: i % 2 === 0 ? 'brightness_3' : 'wb_sunny'
          },
          active: {}
        })
      }
    }
  },
  methods: {
    /**
     * 激活时间轴上的节点
     *
     * @param {number} index 当前选中
     */
    activateTime (index = 0) {
      // 高亮
      this.timeline[this.activeIdx].active = {}
      this.timeline[index].active = {
        active: true,
        'bg-blue-5': true,
        'text-white': true
      }
      if (index === this.activeIdx) {
        return
      }
      // x轴滚动到屏幕中央
      let {width} = Utils.dom.viewport()
      let targetBtn = document.querySelectorAll('.game-time-btn')[index]
      let {left} = Utils.dom.offset(targetBtn)
      let offset = left - 2 * TIME_BTN_OFFSET + (TIME_BTN_WIDTH - width) / 2
      Velocity(targetBtn, 'scroll', {
        container: this.wrapper,
        duration: 500,
        axis: 'x',
        offset: offset
      })
      // 设置当前选中，发送事件
      this.activeIdx = index
      this.$emit('timeline:select-time', {
        time: this.timeline[index]
      })
    }
  },
  mounted () {
    this.wrapper = document.querySelector('.game-timeline')
  }
}
</script>

<style lang="styl" scoped>
  .game-timeline
    overflow-y scroll
    padding 8px 0
    display flex
    .game-time-btn-wrapper
      padding 0 8px
      position relative
      .game-time-btn
        z-index 2
        &.active
          transform scale(1.2, 1.2)
      .game-time-btn-decoration
        position absolute
        height 6px
        top 25px
        left 0
        right 0
        z-index 1
</style>