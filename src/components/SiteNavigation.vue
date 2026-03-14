<template>
  <div>
    <nav class="site-navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/team">Team</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style lang="css" scoped>
.site-navigation {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 8px 0;
}

.site-navigation a {
  color: var(--vt-c-white);
  text-decoration: none;
  font-weight: bold;
  border-bottom: 2px solid transparent;
}

.site-navigation a.router-link-active {
  color: var(--primary-text-orange);
  border-bottom-color: var(--primary-text-orange);
}
</style>
