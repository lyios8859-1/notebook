<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <div ref="imgRefs"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    const imgSrc = require('./assets/logo.png')
    const img = new Image()
    img.setAttribute('src', imgSrc)
    this.$refs.imgRefs.appendChild(img)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
