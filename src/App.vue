<template>
  <div id="app">
    <navbar :totalCost="totalCostFormatted" />
    <div class="container pt-5">
      <add-person @add-person="people.push($event)" />
      <hr class="pb-5">
      <p v-if="people.length == 0" class="text-center"><span class="text-muted">Add a person to get started</span></p>
      <person-list
        v-else
        :people="people" 
        :amtOwedPerPerson="amtOwedPerPerson"
        @delete-person="people.splice($event, 1)"
        @edit-person="handleEditPerson($event)" />
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
  methods: {
    handleEditPerson(data) {
      let id = data.id;
      let person = {
        name: data.editPerson.name,
        spent: Number(data.editPerson.spent)
      }
      this.people.splice(id, 1, person);
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
