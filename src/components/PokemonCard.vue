<template>
  <div class="row align-items-center justify-content-space-around card">
    <div class="col-4 col-md-5 card-header py-4">
      <img
        alt="Vue pokemon-logo"
        class="pokemon-logo pointer"
        src="@/assets/pokedex-logo.png"
        @click="$emit('show-pokemon-image')"
      />
    </div>
    <div class="col-8 col-md-7 card-content text-left">
      <p class="text-pokemon-title">No. 001</p>
      <p class="text-pokemon-name"><strong>Bulbasaur</strong></p>
      <p class="text-pokemon-title">max CP:</p>
      <p class="text-pokemon-cp">951</p>
    </div>
    <div class="col-12 card-content">
      <p class="text-pokemon-title">Type</p>
      <div class="row chip justify-content-center pt-2">
        <div class="col">
          <span>Grass</span>
        </div>
        <div class="col">
          <span>Grass</span>
        </div>
        <div class="col">
          <span>Grass</span>
        </div>
        <div class="col">
          <span>Grass</span>
        </div>
        <div class="col">
          <span>Grass</span>
        </div>
        <div class="col">
          <span>Grass</span>
        </div>
        <div class="col">
          <span>Grass</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["show-pokemon-image"]);
</script>

<style lang="css" scoped>
.card-header .pokemon-logo {
  width: 100%;
  max-width: 96px;
  height: auto;
  border-radius: var(--border-radius-quarter);
}

.card-content {
  padding: var(--padding-gap);
  color: #f6f6f6;
  font-size: 1em;
}

.card-content .text-pokemon-title {
  font-size: 0.9em;
}
.card-content .text-pokemon-name {
  font-size: 1.25em;
  word-break: break-all;
}
.card-content .text-pokemon-cp {
  color: var(--primary-text-orange);
  font-size: 1.2em;
  font-weight: bold;
}

.card-content .chip {
  width: 100%;
  max-width: 240px;
}

.card-content .chip span {
  background: #78c850;
  width: fit-content;
  padding: 2px var(--padding-gap);
  margin: 4px auto;
  font-size: 0.8em;
  font-weight: bold;
  border-radius: var(--border-radius-full);
}
</style>
