<template>
  <el-container>
    <el-aside :style="unfoldOrfold ? 'width:60px' : 'width:230px'" style="transition: 0.3s all;background-color:#353b4e;min-height:100vh;width:230px;overflow: hidden;">
      <layout-aside  :unfoldOrfold="unfoldOrfold"></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      unfoldOrfold: false
    }
  },
  created () {
    eventBus.$on('unfoldOrfoldSwitch', () => {
      this.unfoldOrfold = !this.unfoldOrfold
    })
  }
}
</script>

<style>
</style>
