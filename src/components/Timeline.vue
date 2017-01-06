<template>
<div class="game-timeline shadow-1">
  <div v-for="(time, index) in timeline" class="game-time-btn-wrapper">
    <i v-show="index === currentIdx" class="game-time-current">arrow_drop_down</i>
    <button :class="[{disabled: index > currentIdx}, time.active]" class="game-time-btn bg-blue-3 circular" @click="activateTime(index)">
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
    },
    currentIdx: { // 实际进度
      type: Number
    }
  },
  data () {
    return {
      activeIdx: -1, // 当前选中日期
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
     * @param {boolean} force 无视不可点击状态
     */
    activateTime (index = 0, force) {
      // 当前不可点击状态
      if (!force && index > this.currentIdx) {
        return
      }
      // 高亮
      if (this.timeline[this.activeIdx]) {
        this.timeline[this.activeIdx].active = {}
      }
      this.timeline[index].active = {
        active: true,
        'shadow-1': true,
        'bg-blue-5': true,
        'text-white': true
      }
      // 当前已经高亮，直接返回
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
      // 设置当前选中，向上发送事件
      this.activeIdx = index
      this.$emit('select-time', {
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
      .game-time-current
        position absolute
        z-index 3
        color red
        left 50%
        margin-left -15px
        top -20px
        font-size 30px
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