<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <h3>{{ name }} spent {{ spentFormatted }}</h3>
    <h2><span class="badge" :class="pillColor">{{ owedFormatted }}</span></h2>
  </li>
</template>

<script>
import formatNumberToCurrency from '../mixins/formatNumberToCurrency.js';

export default {
  props: {
    name: String,
    spent: Number,
    owed: Number
  },
  mixins: [formatNumberToCurrency],
  computed: {
    spentFormatted() {
      return formatNumberToCurrency(this.spent);
    },
    owedFormatted() {
      return formatNumberToCurrency(this.owed);
    },
    pillColor() {
      return this.owed <= 0 ? 'badge-primary' : 'badge-secondary';
    }
  }
}
</script>

<style>

</style>
