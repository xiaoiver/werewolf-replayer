import * as types from './mutation-types'
import * as actions from './actions'

export default {
  state: {
    game: {
      baseInfo: {},
      cast: []
    },
    getGameError: '',
    gameList: [],
    createGameError: ''
  },
  mutations: {
    [types.GET_GAME_LIST]: (state, gameList) => {
      state.gameList = state.gameList.concat(gameList)
    },
    [types.SAVE_GAME_SUCCESS]: (state) => {
      state.createGameError = ''
    },
    [types.SAVE_GAME_FAILED]: (state, err) => {
      state.createGameError = err
    },
    [types.GET_GAME]: (state, game) => {
      state.game = game
    },
    [types.GET_GAME_SUCCESS]: (state) => {
      state.getGameError = ''
    },
    [types.GET_GAME_FAILED]: (state, err) => {
      state.getGameError = err
    }
  },
  getters: {
    gameList: state => state.gameList,
    game: state => state.game
  },
  actions
}
