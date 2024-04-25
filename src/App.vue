import
<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import Homepage from "./pages/Homepage.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    Homepage,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter />
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
