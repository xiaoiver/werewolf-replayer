<template>   
  <div class="game-action-board row">
    <div class="game-action-wrapper">
      <template v-show="action.timeType === 'night'">
        <div class="game-action-field row">
          <i @click="selectSeat('killed')">{{'ROLE_WEREWOLF'|roleType2Icon}}</i>
          {{action.killed}}
        </div>
        <div class="game-action-field row">
          <i>{{'ROLE_SEER'|roleType2Icon}}</i>
          <input class="auto" v-model="action.checked">
        </div>
        <div class="game-action-field row">
          <i>{{'ROLE_WITCH'|roleType2Icon}}</i>
          <input class="auto" v-model="action.saved">
        </div>
        <div class="game-action-field row">
          <i>{{'ROLE_WITCH'|roleType2Icon}}</i>
          <input class="auto" v-model="action.poisoned">
        </div>
        <q-chips v-model="action.extraNotes" placeholder="额外记录"></q-chips>
      </template>
      <template v-show="action.timeType === 'day'">
      </template>
    </div>
  </div>
</template>

<script>
import {
  ROLES_MAP
} from '../constants/roles'

export default {
  props: {
    action: {
      type: Object
    }
  },
  data () {
    return {
      roles: Object.assign({}, ROLES_MAP)
    }
  },
  methods: {
    selectSeat (actionType) {
      this.$emit('select-seat', {
        actionType
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="styl">
  .game-action-board
    width 100%
    .game-action-wrapper
      .game-action-field
        i
          line-height 30px
          font-size 16px
        input
          width 0
    .q-chips input
      width 80px

</style>
