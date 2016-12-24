<template>   
  <div>
    <span v-if="direction === 'left'">{{seat.seatNum}}</span>
    <q-fab
      classNames="primary"
      icon="keyboard_arrow_up"
      direction="up"
    >
      <q-small-fab
        class="white"
      >mail</q-small-fab>
      <q-small-fab
        class="white"
      >alarm</q-small-fab>
    </q-fab>
    <span v-if="direction === 'right'">{{seat.seatNum}}</span>
  </div>
</template>

<script>
export default {
  props: {
    seat: {
      type: Object
    },
    direction: {
      type: String,
      default: 'left'
    }
  }
}
</script>