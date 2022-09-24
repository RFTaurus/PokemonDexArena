<template>
  <div>
    <button class="button-pokemon">Search</button>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.button-pokemon {
  background-color: var(--primary-text-orange);
  color: #181818;
  font-weight: bold;
  border: 2px solid var(--primary-text-orange);
  border-radius: var(--border-radius-full);
  padding: 4px;
  font-size: 1em;
  cursor: pointer;
}

.button-pokemon.secondary {
  background-color: #311b07;
  color: var(--primary-text-orange);
  border: 2px solid var(--primary-text-orange);
}

@media (min-width: 768px) {
  .button-pokemon {
    background-color: var(--primary-text-orange);
    color: var(--vt-c-black);
    border: none;
    border-radius: var(--border-radius-full);
    padding: 8px;
    font-size: 1em;
    cursor: pointer;
  }
}
</style>
