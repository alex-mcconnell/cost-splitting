<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <font-awesome-icon icon="edit" class="mr-2" />
      <font-awesome-icon icon="trash-alt" class="mr-4 ml-2" @click="handleDeletePerson"/>
      <h3>{{ name }} spent {{ spentFormatted }}</h3>
    </div>
    <h2><span class="badge" :class="pillColor">{{ owedFormatted }}</span></h2>
  </li>
</template>

<script>
import { formatNumber } from '../mixins/formatNumber.js'

export default {
  props: {
    id: Number,
    name: String,
    spent: Number,
    owed: Number
  },
  mixins: [formatNumber],
  computed: {
    spentFormatted() {
      return formatNumber.toCurrency(this.spent);
    },
    owedFormatted() {
      return formatNumber.toCurrency(this.owed);
    },
    pillColor() {
      return this.owed <= 0 ? 'badge-primary' : 'badge-secondary';
    }
  },
  methods: {
    handleDeletePerson() {
      let id = this.id;
      this.$emit('delete-person', id);
    }    
  }
}
</script>

<style>
  li:hover {
    cursor: default;
  }

  svg[data-icon="trash-alt"]:hover {
    color: #F3969A;
    cursor: pointer;
  }

  svg[data-icon="edit"]:hover {
    color: #78C2AD;
    cursor: pointer;
  }
</style>
