<script lang="ts" setup>
import { useCounterStore } from '../store';
const counterStore = useCounterStore()

function plus(num) {
  counterStore.$patch({ count: counterStore.count += num })
}
function plusAsync(num) {
  counterStore.plusAsync(num)
}
</script>

<template>
  <div>
    <h1>{{ counterStore.count }}</h1>
    <button @click="plus(1)">plus</button>
    <button @click="plusAsync(2)">plus-async</button>
  </div>
</template>

<style scoped></style>
