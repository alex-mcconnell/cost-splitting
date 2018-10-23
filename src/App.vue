<template>
  <div id="app">
    <navbar :totalCost="totalCostFormatted" />
    <div class="container pt-5">
      <add-person @add-person="handleAddPerson($event)" />
      <hr class="pb-5">
      <p v-if="people.length == 0" class="text-center"><span class="text-muted">Add a person to get started</span></p>
      <div  v-else>
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-info mr-3"
            @click="handleSort" >Sort By $ Owed <font-awesome-icon 
            :icon="sortDesc ? 'angle-up' : 'angle-down'" /></button>
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
      @cancel-reset-list="cancelModalDisplay = 'none !important'"
      @reset-list="resetList"
      :style="{display: cancelModalDisplay}" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import AddPerson from './components/AddPerson.vue';
import PersonList from './components/PersonList.vue';
import ResetModal from './components/ResetModal.vue';

import { formatNumber } from './mixins/formatNumber.js';

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
      sortDesc: true,
      cancelModalDisplay: 'none !important'
    };
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
    handleAddPerson(data) {
      let person = {
        name: data.name,
        spent: Number(data.spent)
      };

      let isMatch = this.people.findIndex(p => {
        return p.name === person.name;
      });

      if (isMatch > -1) {
        this.people[isMatch].spent += person.spent;
      } else {
        this.people.push(person);
      }
    },
    handleEditPerson(data) {
      let id = data.id;
      let person = {
        name: data.editPerson.name.trim(),
        spent: Number(data.editPerson.spent)
      };

      let isMatch = this.people.findIndex(p => {
        return p.name === person.name;
      });

      if (isMatch > -1 && isMatch != id) {
        this.people[isMatch].spent += person.spent;
        this.people.splice(id, 1)
      } else {
        this.people.splice(id, 1, person);
      }
    },
    handleSort() {
      this.sortDesc = !this.sortDesc;

      this.people.sort((a, b) => {
        if (a.spent - this.amtOwedPerPerson < b.spent - this.amtOwedPerPerson) {
          return this.sortDesc ? 1 : -1;
        } else if (
          a.spent - this.amtOwedPerPerson >
          b.spent - this.amtOwedPerPerson
        ) {
          return !this.sortDesc ? 1 : -1;
        }
        return 0;
      });
    },
    resetList() {
      this.people = [];
      this.cancelModalDisplay = 'none !important';
    }
  },
  watch: {
    people: {
      handler() {
        localStorage.setItem('people', JSON.stringify(this.people));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 56px;
}
</style>
