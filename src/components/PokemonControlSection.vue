<template>
  <div class="sticky-position my-4">
    <div class="input-container">
      <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-8">
          <input
            type="text"
            class="search-bar"
            placeholder="Search Pokemon Name..."
          />
        </div>
        <div class="col-6 col-md-2 my-1">
          <button class="button-pokemon">Search</button>
        </div>
        <div class="col-6 col-md-2 my-1">
          <button
            class="button-pokemon secondary"
            @click="$emit('open-filter')"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["open-filter"]);
</script>

<style lang="css" scoped>
.sticky-position {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: var(--vt-c-black);
  padding-top: 8px;
}

.input-container {
  width: 100%;
  max-width: 720px;
  margin: 0% auto;
}

.search-bar {
  background-color: #181818;
  color: var(--vt-c-white);
  font-size: 0.9em;
  padding: 8px;
  outline: 1px solid var(--vt-c-white);
  border: none;
  border-radius: var(--border-radius-full);
}

.search-bar::placeholder {
  font-size: 0.85em;
}

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
