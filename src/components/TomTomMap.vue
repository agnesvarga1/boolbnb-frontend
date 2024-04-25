<script>
import tt from "@tomtom-international/web-sdk-maps";

export default {
  name: "TomTomMap",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: "tomtom-map",
    });
  },
};
</script>

<template>
  <div id="tomtom-map"></div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
@use "../styles/partials/mixins" as *;
</style>
