<template>
  <div id="app">
    <navbar :totalCost="totalCostFormatted" />
    <div class="container pt-5">
      <add-person v-on:person-added="people.push($event)"/>
      <hr>
      <person-list :people="people" :amtOwedPerPerson="amtOwedPerPerson"/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import AddPerson from './components/AddPerson.vue';
import PersonList from './components/PersonList.vue';

export default {
  components: {
    Navbar: Navbar,
    AddPerson: AddPerson,
    PersonList: PersonList
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
      return '$' + (this.totalCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    amtOwedPerPerson() {
      return this.totalCost / this.people.length;
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 56px;
  }
</style>
