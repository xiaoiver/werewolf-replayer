import {
  ROLE_SIMPLE_VILLAGER,
  ROLES_MAP
} from '../constants/roles'

/**
 * 角色转换成icon
 *
 * @param {string} roleType 角色
 * @return {string} icon
 */
export function roleType2Icon (roleType) {
  return ROLES_MAP[roleType || ROLE_SIMPLE_VILLAGER].icon
}
