<template>
  <div id="app">
    <navbar :totalCost="totalCostFormatted" />
    <div class="container pt-5">
      <add-person @add-person="people.push($event)" />
      <hr>
      <person-list :people="people" :amtOwedPerPerson="amtOwedPerPerson" />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import AddPerson from './components/AddPerson.vue'
import PersonList from './components/PersonList.vue'

import { formatNumber } from './mixins/formatNumber.js'

export default {
  components: {
    Navbar: Navbar,
    AddPerson: AddPerson,
    PersonList: PersonList
  },
  mixins: [formatNumber],
  mounted() {
    if (localStorage.getItem('people')) {
      this.people = JSON.parse(localStorage.getItem('people'));
    }
  },
  data() {
    return {
      people: []
    }
  },
  computed: {
    totalCost() {
      return this.people.reduce((total, person) => {
        return total + person.spent;
      }, 0);
    },
    totalCostFormatted() {
      return formatNumber.toCurrency(this.totalCost);
    },
    amtOwedPerPerson() {
      return this.totalCost / this.people.length;
    }
  },
  watch: {
    people: {
      handler() {
        localStorage.setItem('people', JSON.stringify(this.people));
      },
      deep:true
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 56px;
  }
</style>
