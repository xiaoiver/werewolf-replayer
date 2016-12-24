<template>
  <div>
    <q-infinite-scroll :handler="loadMore">
      <div v-for="game in gameList" class="card"
        v-link.replace="'/game/' + game.gameId">
        <div class="item">
          <img class="avatar" src="~assets/quasar-logo.png">
          <div class="item-content">
            <div class="item-label">
              <p class="item-title">Joe</p>
              <p>Web Developer</p>
            </div>
          </div>
        </div>
        <img src="~assets/quasar-logo.png">
        <div class="card-content">
          Card Content
        </div>
        <div class="card-actions">
          <div class="text-primary">
            <i>thumb_up</i> 11k likes
          </div>
          <div class="text-primary">
            <i>mode_comment</i> 8 comments
          </div>
          <div class="auto"></div>
          <div class="text-grey-6">
            23 minutes ago.
          </div>
        </div>
      </div>
      <spinner slot="message" name="dots" :size="40"></spinner>
    </q-infinite-scroll>

    <button class="new-game-btn primary circular fixed" @click="$refs.newGameModal.open()">
      <i>add</i>
    </button>

    <q-modal ref="newGameModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <div class="toolbar">
        <button @click="$refs.newGameModal.close()">
          <i>keyboard_arrow_left</i>
        </button>
        <q-toolbar-title :padding="1">
          创建新游戏
        </q-toolbar-title>
      </div>
      <div class="new-game-panel">
        <q-stepper @finish="saveGame()" ref="stepper">
          <q-step title="选择板子">
            <role-board ref="roleBoard"></role-board>
          </q-step>
          <q-step title="演员表">
            <cast-board ref="castBoard"></cast-board>
          </q-step>
          <q-step title="基本信息">
            <q-datetime
              v-model="baseInfo.datetime"
              type="datetime"
              label="游戏时间"
            ></q-datetime>
            <div class="floating-label">
              <input v-model.lazy="baseInfo.location">
              <label>地点</label>
            </div>
            <label>
              <q-toggle
                v-model="baseInfo.isGodView"
              ></q-toggle>
              上帝视角
            </label>
          </q-step>
        </q-stepper>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RoleBoard from './RoleBoard'
import CastBoard from './CastBoard'

export default {
  components: {
    'role-board': RoleBoard,
    'cast-board': CastBoard
  },
  data () {
    return {
      baseInfo: {
        datetime: '',
        location: '',
        isGodView: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'gameList'
    ])
  },
  methods: {
    ...mapActions([
      'getGameList',
      'saveNewGame'
    ]),
    /**
     * 加载更多游戏列表
     */
    async loadMore (index, done) {
      await this.getGameList()
      done()
    },
    async saveGame () {
      try {
        let newGameId = await this.saveNewGame({
          roleList: this.$refs.roleBoard.roleList,
          cast: this.$refs.castBoard.cast,
          baseInfo: this.baseInfo
        })
        this.$refs.newGameModal.close()
        this.$router.push(`/game/${newGameId}`)
      }
      catch (e) {}
    }
  },
  async mounted () {
    this.$root.hideHeader = false
    try {
      await this.getGameList()
    }
    catch (e) {}
  }
}
</script>

<style lang="styl" scoped>
  .new-game-btn
    bottom 74px
    right 18px
  .new-game-panel
    padding 10px
</style>
