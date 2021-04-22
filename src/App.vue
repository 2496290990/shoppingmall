<template>
  <div id="app">
    <div></div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
   .fixd {
    width: 100%;
    height: 100%;
    display: block;
    position: fixed;
    content: "";
    background-size: contain;

    /*background-image: url('./assets/bj41.jpg');*/
    opacity: 0.6;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
}
* {
  margin: 0;
  padding: 0;
}
ul ,li ,ol{
  list-style: none;
}
html,body{
   margin: 0;
  padding: 0;
  height: 100%;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
