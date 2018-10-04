<template>
  <div id="app">
    <navbar :totalCost="totalCostFormatted"></navbar>
    <add-person></add-person>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import AddPerson from './components/AddPerson.vue';

export default {
  components: {
    Navbar: Navbar,
    AddPerson: AddPerson
  },
  data() {
    return {
      totalCost: 0 
    }
  },
  computed: {
    totalCostFormatted: function() {
      return '$' + (this.totalCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  }
}
</script>

<style>

</style>
