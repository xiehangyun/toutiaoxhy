<!--
breadBox v2.0  说明：1.0和2.0选择一种方法配置动态路由即可
1.0 breadBox 面包屑跟随路由变化,此方法需要面包屑与路由显示顺序一致，例如path：01/02/03 面包屑也是01/02/03,
2.0 增加路由参数配置项，动态面包屑，面包屑跟随参数变化
（2.0方法虽然万能，但在页面过多的时候不推荐，每次路由跳转带上面包屑参数会造成麻烦
  2.0推荐使用情况:在路由和面包屑根本对不上，重定向也不好用的时候，或者重复路由配置过多的，或者仅一两个页面有面包屑又想引入此组件的）
优点：插拔轻松，容易配置（样式基于elementUI）
-->
<template>
  <div class="breadEval">
    <div class="breadTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="item.path" v-for="item of breadListLast" :key="item.path">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  // 面包屑解决方案，
  data () {
    return {
      // v1.0手动配置项：breadListIm为路由与面包屑名称对应关系,breadLoadName为面包屑组件路由
      // v2.0手动配置项：breadListParam为路由与面包屑名称对应关系,breadBoxIdName为路由参数名
      breadLoadName: '/breadBox',
      breadListIm: [
        {
          path: '01',
          name: '一级'
        },
        {
          path: '02',
          name: '二级'
        },
        {
          path: '03',
          name: '三级'
        }
      ],
      breadListParam: {
        '1': [{ path: '/home/01', name: '一级01' },
          { path: '/home/02/01', name: '二级01' },
          { path: '/home/03/02/01', name: '三级01' }],
        '2': [{ path: '/home/01', name: '一级02' },
          { path: '/home/02/01', name: '二级02' },
          { path: '/home/03/02/01', name: '三级02' }]
      },
      breadBoxIdName: 'breadBoxId',
      breadListLast: []
    }
  },
  methods: {
    loadChange () {
      this.breadListLast = []
      // 获取参数breadBoxId值
      let breadBoxId = this.$route.query[this.breadBoxIdName]
      console.log(breadBoxId)
      if (undefined === breadBoxId || breadBoxId === null || breadBoxId === '') {
        if (this.$route.path.indexOf(this.breadLoadName) === -1) {
          console.log('面包屑路由地址breadLoadName没有配置正确！')
        } else {
          let breadListAgo = this.$route.path.split(this.breadLoadName)
          // let breadListAgo = '/index/indexSchool/breadList/01/02/03'.split(this.breadLoadName)
          let breadList = breadListAgo[1].split('/')
          let obje = {}
          let breadIndex = ''
          // 删除掉数组的前1个，提升遍历性能
          breadList.splice(0, 1)
          // 考虑到顺序问题，只能先遍历breadList,再遍历breadListIm
          for (let p of breadList) {
            for (let q of this.breadListIm) {
              if (p === q.path) {
                breadIndex += '/' + q.path
                obje.path = breadListAgo[0] + this.breadLoadName + breadIndex
                obje.name = q.name
                this.breadListLast.push(obje)
                obje = {}
              }
            }
          }
        };
      } else {
        this.breadListLast = this.breadListParam[breadBoxId]
      }
      // 打印路由配置
      console.log(JSON.stringify(this.breadListLast))
    }
  },
  watch: {
    $route (to, from) {
      this.loadChange()
      // console.log(to.path);
    }
  },
  // 页面挂载之后,解析路由，给出面包屑，路由里面一定要含有breadCom组件的path
  mounted: function () {
    this.loadChange()
  }
}
</script>
<style lang="scss" scoped>
  .breadEval {
    position: relative;
    font-size: 14px;
    height: 100%;
    background: #F3F7FD;
    .breadTitle{
      padding: 20px 30px;
      background: #fff;
    }
  }
</style>
