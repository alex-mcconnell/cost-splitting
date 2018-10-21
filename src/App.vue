<template>
  <div id="app">
    <navbar :totalCost="totalCostFormatted" />
    <div class="container pt-5">
      <add-person @add-person="people.push($event)" />
      <hr class="pb-5">
      <p v-if="people.length == 0" class="text-center"><span class="text-muted">Add a person to get started</span></p>
      <div  v-else>
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-info mr-3"
            @click="handleSort" >Sort by $ Owed <font-awesome-icon 
            :icon="sortAsc ? 'angle-up' : 'angle-down'" /></button>
            <button
            class="btn btn-danger"
            @click="cancelModalDisplay = 'block'">Reset List</button>  
        </div>
        <person-list
          class="pt-5"
          :people="people" 
          :amtOwedPerPerson="amtOwedPerPerson"
          @delete-person="people.splice($event, 1)"
          @edit-person="handleEditPerson($event)" />        
      </div>
    </div>
    <reset-modal 
      @cancel-reset-list="cancelModalDisplay = 'none'"
      @reset-list="resetList"
      :style="{display: cancelModalDisplay}" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import AddPerson from './components/AddPerson.vue'
import PersonList from './components/PersonList.vue'
import ResetModal from './components/ResetModal.vue'

import { formatNumber } from './mixins/formatNumber.js'

export default {
  components: {
    Navbar: Navbar,
    AddPerson: AddPerson,
    PersonList: PersonList,
    ResetModal: ResetModal
  },
  mixins: [formatNumber],
  mounted() {
    if (localStorage.getItem('people')) {
      this.people = JSON.parse(localStorage.getItem('people'));
    }
  },
  data() {
    return {
      people: [],
      sortAsc: true,
      cancelModalDisplay: 'none' 
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
    },
    handleSort() {
      this.sortAsc = !this.sortAsc;

      this.people.sort((a, b) => {
        if (a.spent - this.amtOwedPerPerson < b.spent - this.amtOwedPerPerson) {
          return this.sortAsc ? 1 : -1
        } else if (a.spent - this.amtOwedPerPerson > b.spent - this.amtOwedPerPerson) {
          return !this.sortAsc ? 1 : -1
        }    
        return 0;
      });
    },
    resetList() {
      this.people = [];
      this.cancelModalDisplay = 'none';
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
