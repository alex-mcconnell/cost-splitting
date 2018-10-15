<template>
  <li v-if="!isEditable" class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <font-awesome-icon icon="edit" class="mr-3" @click="handleStartEdit" />
      <font-awesome-icon icon="trash-alt" class="mr-3" @click="handleDeletePerson" />   
      <h3>{{ name }} spent {{ spentFormatted }}</h3>
    </div>
    <h2><span class="badge" :class="pillColor">{{ owedFormatted }}</span></h2>
  </li>
  <li v-else class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <font-awesome-icon icon="save" class="mr-3" @click="handleSaveEdit" />
      <font-awesome-icon icon="undo" class="mr-3" @click="handleCancelEdit" />
   
      <div>
        <input 
        type="text" 
        class="form-control"
        v-model="editPerson.name"
        id="nameInput"
        placeholder="Name"
        required>
      </div>     
      <h3>&nbsp;spent&nbsp;</h3>
      <div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
          <input 
            type="number" 
            class="form-control" 
            min="0.00" 
            step="0.01" 
            aria-label="Amount (to the nearest cent)" 
            placeholder="Spent"
            v-model="editPerson.spent"
            required >
        </div>
      </div>
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
  data() {
    return {
      isEditable: false,
      editPerson: {
        name: '',
        spent: 0
      },
      cachedPerson: {
        name: '',
        spent: 0
      }
    }
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

    handleStartEdit() {
      this.isEditable = true;
      this.editPerson = {name: this.name, spent: Number(this.spent)};
      this.cachedPerson = Object.assign({}, this.editPerson);      
    },
    handleSaveEdit() {
      this.isEditable = false;
      
      let id = this.id;
      let editPerson = this.editPerson
      this.$emit('edit-person', {editPerson, id})
    },
      handleCancelEdit() {
        this.isEditable = false;
        this.editPerson = this.cachedPerson;
      },
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

  svg[data-icon="trash-alt"]:hover, svg[data-icon="undo"]:hover {
    color: #F3969A;
    cursor: pointer;
  }

  svg[data-icon="edit"]:hover, svg[data-icon="save"]:hover {
    color: #78C2AD;
    cursor: pointer;
  }
</style>
