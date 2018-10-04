<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <h3>{{ name }} spent {{ spentFormatted }}</h3>
    <h2><span class="badge" :class="pillColor">{{ owedFormatted }}</span></h2>
  </li>
</template>

<script>
export default {
  props: {
    name: String,
    spent: Number,
    owed: Number
  },
  computed: {
    spentFormatted() {
      return ('$' + (this.spent).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace('-', '');
    },
    owedFormatted() {
      return ('$' + (this.owed).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace('-', '');
    },
    pillColor() {
      return this.owed <= 0 ? 'badge-primary' : 'badge-secondary';
    }
  }
}
</script>

<style>

</style>
