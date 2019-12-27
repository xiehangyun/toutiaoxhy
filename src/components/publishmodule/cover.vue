<template>
<div class="cover-image">
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog :visible="dialogSwitch" @close="closeDialog">
      <select-cover @selectOneImg="receiveImg"></select-cover>
    </el-dialog>
</div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      coverIndex: -1,
      dialogSwitch: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    receiveImg (img) {
      this.$emit('selectOneImg', img, this.coverIndex)
      this.closeDialog()
    },
    openDialog (index) {
      this.coverIndex = index
      this.dialogSwitch = true
    },
    closeDialog () {
      this.dialogSwitch = false
    }
  }

}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
