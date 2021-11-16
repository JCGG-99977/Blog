<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  // created(){
  //   console.log(" ......................阿弥陀佛......................\n"+
  //                          "                       _oo0oo_                      \n"+
  //                          "                      o8888888o                     \n"+
  //                          "                      88\" . \"88                     \n"+
  //                          "                      (| -_- |)                     \n"+
  //                          "                      0\\  =  /0                     \n"+
  //                          "                   ___/‘---’\\___                   \n"+
  //                          "                  .' \\|       |/ '.                 \n"+
  //                          "                 / \\\\|||  :  |||// \\                \n"+
  //                          "                / _||||| -卍-|||||_ \\               \n"+
  //                          "               |   | \\\\\\  -  /// |   |              \n"+
  //                          "               | \\_|  ''\\---/''  |_/ |              \n"+
  //                          "               \\  .-\\__  '-'  ___/-. /              \n"+
  //                          "             ___'. .'  /--.--\\  '. .'___            \n"+
  //                          "         .\"\" ‘<  ‘.___\\_<|>_/___.’>’ \"\".          \n"+
  //                          "       | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |        \n"+
  //                          "         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /        \n"+
  //                          "    =====‘-.____‘.___ \\_____/___.-’___.-’=====     \n"+
  //                          "                       ‘=---=’                      \n"+
  //                          "                                                    \n"+
  //                          "....................佛祖保佑 ,永无BUG...................");
  // },
  mounted(){
    console.log('联系我们请投邮箱：1848514604@qq.com')
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
ul>li{
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
</style>
