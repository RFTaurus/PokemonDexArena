<template>
  <header>
    <!-- <SiteNavigation /> -->
  </header>
  <div class="text-center">
    <div class="pokedex-logo-wrapper">
      <img
        alt="PokemonDex Arena logo"
        class="pokedex-logo"
        src="@/assets/pokedex-logo.png"
      />
    </div>
  </div>

  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
// import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style lang="css" scoped>
.pokedex-logo-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 160px;
}

.pokedex-logo {
  width: 100%;
  height: auto;
}
</style>
