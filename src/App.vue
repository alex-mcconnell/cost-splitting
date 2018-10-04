<template>
  <div id="app">
    <navbar :totalCost="totalCostFormatted" />
    <add-person v-on:person-added="people.push($event)"/>
    <person-list :people="people" />
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
      totalCost: 0,
      people: []
    }
  },
  computed: {
    totalCostFormatted() {
      return '$' + (this.totalCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  }
}
</script>

<style>

</style>
