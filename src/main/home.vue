<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container" />
    </div>
    <div class="main-container">
      <Navbar/>
      <levelbar></levelbar>
        <div :style="'width:100%;height:'+(screenHeight-134)+'px;min-width:12rem;'">
          <router-view :key="key"></router-view>
        </div>
      <FooterBar />
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { Navbar, Sidebar, AppMain ,FooterBar,levelbar} from './../components/Layout';
    export default {
        components: {
            Navbar,
            Sidebar,
            AppMain,
            FooterBar,
            levelbar,
        },
        computed:{
            ...mapState(['sidebar','screenHeight']),
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../assets/css/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
      .sidebar-wrapper {
        transform: translate(-220px, 0);
        .sidebar-container {
          transform: translate(220px, 0);
        }
        &:hover {
          transform: translate(0, 0);
          .sidebar-container {
            transform: translate(0, 0);
          }
        }
      }
      .main-container{
        margin-left: 0;
        position:relative;
      }
    }
    .sidebar-wrapper {
      width: 220px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      transition: all .28s ease-out;
    }
    .sidebar-container {
      transition: all .28s ease-out;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: -17px;
      overflow-y: scroll;
    }
    .main-container {
      position:relative;
      overflow: hidden;
      transition: all .28s ease-out;
      margin-left: 220px;
      height:100vh;

    }
  }
</style>
