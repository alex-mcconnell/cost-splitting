<template>
  <div id="app">
    <navbar />
    <div class="container d-flex justify-content-center text-center pt-5">
      <h2><b>Total Cost: </b><span class="text-muted">{{ totalCostFormatted }}</span></h2>
    </div>
    <div class="container">
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
            @click="handleReset">Reset List</button>  
        </div>
        <person-list
          class="pt-5"
          :people="people" 
          :amtOwedPerPerson="amtOwedPerPerson"
          @delete-person="people.splice($event, 1)"
          @edit-person="handleEditPerson($event)" />        
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import AddPerson from './components/AddPerson.vue';
import PersonList from './components/PersonList.vue';

import swal from 'sweetalert';
import { formatNumber } from './mixins/formatNumber.js';

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
    handleReset() {
      swal("Are you sure? You worked really hard on this...", {
        buttons: {
          yes: {
            text: "Yes",
            value: true
          },
          no: {
            text: "No",
            value: false
          },
          default: false,
        },
        className: "reset-modal" 
      })
      .then((value) => {
        if (value) {
          this.people = [];
        }
      });
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

<style>

.swal-button--yes {
  background-color: #78c2ad;
}

.swal-button--no {
  background-color: #f3969a;
}

.reset-modal .swal-button--yes:hover {
  background-color: #78c2adc5 !important;
}

.reset-modal .swal-button--no:hover {
  background-color: #f3969ac5 !important;
}

#app {
  flex: 1 0 auto;
}

</style>
