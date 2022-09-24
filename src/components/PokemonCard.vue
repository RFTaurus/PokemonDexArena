<template>
  <div class="card">
    <div class="card-header py-4">
      <img alt="Vue logo" class="logo" src="@/assets/pokedex-logo.png" />
    </div>
    <div class="card-content">
      <p class="text-pokemon-number">No.001</p>
      <p class="text-pokemon-name"><strong>Bulbasaur</strong></p>
      <br />
      <p class="text-pokemon-title">max CP:</p>
      <p class="text-pokemon-cp">951</p>
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

<script setup></script>

<style lang="css" scoped>
.card-header .logo {
  width: 100%;
  max-width: 128px;
  height: auto;
}

.card-content {
  padding: var(--padding-gap);
  color: #f6f6f6;
  font-size: 1.15em;
}

.card-content .text-pokemon-number {
  font-size: 1.1em;
}
.card-content .text-pokemon-name {
  font-size: 1.25em;
}
.card-content .text-pokemon-number {
  font-size: 1.1em;
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
