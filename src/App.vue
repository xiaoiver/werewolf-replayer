<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <div v-show="!hideHeader" slot="header" class="toolbar primary">
        <q-search v-model="searchModel" class="primary"></q-search>
      </div>
      <router-view class="layout-view"></router-view>

      <div slot="footer">
        <q-tabs>
          <q-tab icon="mail" route="/" exact replace>游戏列表</q-tab>
          <q-tab icon="alarm" route="/layout/alarm" exact replace>分析</q-tab>
          <q-tab icon="help" route="/layout/help" exact replace>帮助</q-tab>
        </q-tabs>
      </div>
    </q-layout>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {
  data () {
    return {
      searchModel: '',
      hideHeader: false
    }
  }
}
</script>

<style></style>
