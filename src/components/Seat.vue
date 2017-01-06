<template>   
  <div class="game-seat">
    <span v-if="direction === 'left'">{{seat.seatNum}}</span>
    <button :class="styleClass" class="primary circular" @click="showInfo()">
      <i>{{seat.role|roleType2Icon}}</i>
    </button>
    <span v-if="direction === 'right'">{{seat.seatNum}}</span>
    <div v-show="showMask" class="modal fullscreen flex minimized items-center justify-center"
      @click="showMask = false">
      <div class="modal-content" @click.stop="showMask = true">
        <div class="seat-num">{{seat.seatNum}}</div>
        <div class="floating-label">
          <input required class="full-width" v-model="seat.name">
          <label>玩家名</label>
        </div>
        <q-select
          label="身份"
          type="radio"
          v-model="seat.role"
          :options="roleOptions"
        ></q-select>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {
  ROLES_MAP
} from '../constants/roles'

export default {
  props: {
    seat: {
      type: Object
    },
    selectSeatStatus: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'left'
    }
  },
  data () {
    // 角色选择下拉菜单选项
    let roleOptions = Object.keys(ROLES_MAP).map(k => {
      return {
        label: ROLES_MAP[k].name,
        value: k
      }
    })
    return {
      showMask: false,
      roleOptions
    }
  },
  computed: {
    styleClass () {
      return this.seat.role && this.seat.role.toLowerCase()
    }
  },
  methods: {
    showInfo () {
      if (this.selectSeatStatus) {
        this.$emit('comfirm-seat', {
          seatNum: this.seat.seatNum
        })
        this.$emit('unselect-seat')
      }
      else {
        this.showMask = true
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="styl" scoped>
  .game-seat
    padding 6px 0
    .role_werewolf
      background red
    .modal-content
      padding 8px
      .seat-num
        padding 0 6px
        font-size 30px
        position absolute
        top 0
        right 0
</style>
