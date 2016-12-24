import Vue from 'vue'
import * as types from './mutation-types'

export async function getGameList ({ commit, state }) {
  try {
    let gameList = await Vue.model.post(
      '/data/game/getGameList'
    )
    commit(types.GET_GAME_LIST, gameList)
  }
  catch (e) {
  }
}

export async function saveNewGame ({ commit, state }, params) {
  try {
    let gameId = await Vue.model.post(
      '/data/game/createGame',
      params
    )
    commit(types.SAVE_GAME_SUCCESS)
    return Promise.resolve(gameId)
  }
  catch (e) {
    commit(types.SAVE_GAME_FAILED)
    return Promise.reject()
  }
}

export async function getGameById ({ commit, state }, gameId) {
  try {
    let game = await Vue.model.post(
      '/data/game/getGame',
      {gameId}
    )
    commit(types.GET_GAME, game)
    commit(types.GET_GAME_SUCCESS)
    return Promise.resolve(game)
  }
  catch (e) {
    commit(types.GET_GAME_FAILED)
    return Promise.reject()
  }
}
