<template>
  <div class="page-header text-center">
    <h1>{{ pageTitle }}</h1>
  </div>
</template>

<script setup>
defineProps({
  pageTitle: {
    type: String,
    default: "Welcome",
  },
});
</script>

<style lang="css" scoped>
.page-header {
  color: var(--primary-text-orange);
  font-size: 1em;
}

@media (min-width: 768px) {
  .page-header {
    font-size: 1.25em;
  }
}
</style>
