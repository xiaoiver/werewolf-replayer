export const ROLE_WEREWOLF = 'ROLE_WEREWOLF'
export const ROLE_SEER = 'ROLE_SEER'
export const ROLE_WITCH = 'ROLE_WITCH'
export const ROLE_HUNTER = 'ROLE_HUNTER'
export const ROLE_SIMPLE_VILLAGER = 'ROLE_SIMPLE_VILLAGER'
export const ROLES_MAP = {
  ROLE_WEREWOLF: {
    name: '狼人',
    single: false,
    icon: 'pets',
    desc: '晚上杀死一名玩家'
  },
  ROLE_SEER: {
    name: '预言家',
    icon: 'visibility',
    single: true,
    desc: '晚上验明一名玩家'
  },
  ROLE_WITCH: {
    name: '女巫',
    icon: 'invert_colors',
    single: true,
    desc: '晚上使用毒药和解药'
  },
  ROLE_HUNTER: {
    name: '猎人',
    icon: 'my_location',
    single: true,
    desc: '死亡时带走一名玩家'
  },
  ROLE_SIMPLE_VILLAGER: {
    name: '普通村民',
    single: false,
    icon: 'face',
    desc: '白天参与投票'
  }
}
