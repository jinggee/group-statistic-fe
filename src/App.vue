<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Microsoft Yahei', PingFangSC-Regular, sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @text-color;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: @text-color;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
