<template>
  <div class="role-board">
    <div class="role-board-header item-content">
      <q-fab
        classNames="primary float-right"
        icon="add"
        direction="down"
      >
        <q-small-fab v-for="validRole in validRoleList"
          class="white"
          @click.native="addRole(validRole.type)"
        >{{validRole.icon}}</q-small-fab>
      </q-fab>
      <span class="role-num item-label">人数: {{roleNum}}</span>
      <label>
        <q-toggle
          v-model="eliminateSide"
        ></q-toggle>
        屠边
      </label>
    </div>
    <div class="list">
      <div v-for="(role, index) in roleList" class="item two-lines">
        <i class="item-primary">
          {{role.icon}}
        </i>
        <div class="item-content has-secondary">
          <div>{{role.name}}</div>
          <div>{{role.desc}}</div>
        </div>
        <i v-if="role.single" class="item-secondary" @click="removeRole(index)">
          clear
        </i>
        <q-numeric class="item-counter" v-if="!role.single" :min="role.min" :max="role.max" v-model="role.num"></q-numeric>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ROLE_WEREWOLF,
  ROLE_SEER,
  ROLE_WITCH,
  ROLE_HUNTER,
  ROLE_SIMPLE_VILLAGER,
  ROLES_MAP
} from '../constants/roles'

export default {
  data () {
    return {
      roleList: [],
      eliminateSide: true
    }
  },
  computed: {
    /**
     * 当前人数
     *
     */
    roleNum () {
      return this.roleList.reduce((prev, cur) => {
        return prev + cur.num || 1
      }, 0)
    },
    /**
     * 当前可添加角色表
     *
     */
    validRoleList () {
      let me = this
      let list = []
      Object.keys(ROLES_MAP).forEach(roleType => {
        if (!ROLES_MAP[roleType].single || !me.roleList.filter(r => roleType === r.type).length) {
          list.push(Object.assign({type: roleType}, ROLES_MAP[roleType]))
        }
      })
      return list
    }
  },
  methods: {
    addRole (roleType, num = 1) {
      let role = this.roleList.filter(r => r.type === roleType)
      role = role && role[0]
      if (role) {
        role.num += num
      }
      else {
        this.roleList.push(Object.assign({
          type: roleType,
          min: 1,
          max: 5
        }, ROLES_MAP[roleType], {num}))
      }
    },
    removeRole (idx) {
      if (idx !== undefined) {
        this.roleList.splice(idx, 1)
      }
    }
  },
  mounted () {
    // 根据初始人数创建角色
    this.addRole(ROLE_WEREWOLF, 3)
    this.addRole(ROLE_SEER)
    this.addRole(ROLE_WITCH)
    this.addRole(ROLE_HUNTER)
    this.addRole(ROLE_SIMPLE_VILLAGER, 3)
  }
}
</script>

<style lang="styl" scoped>
.role-board
  .role-board-header
    display flex
    align-items center
    .role-num
      flex 1
      width 0
  .list
    .item
      .item-counter
        position absolute
        right 0
        top 18px
</style>
