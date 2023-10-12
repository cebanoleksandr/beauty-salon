<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<template>
  <Header />

  <main class="main">
    <router-view></router-view>
  </main>

  <Footer />
</template>

<style>
.main {
  min-height: calc(100vh - 60px);
  width: 80%;
  margin: 0 auto;
  padding-top: 85px;
}
</style>
