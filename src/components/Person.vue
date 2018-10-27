<template>
  <li v-if="!isEditable" class="list-group-item d-flex align-items-center">
      <font-awesome-icon 
        icon="edit" 
        class="mr-3" 
        @click="handleStartEdit" />
      <font-awesome-icon 
        icon="trash-alt"
        class="mr-3" 
        @click="handleDeletePerson" />
    <h3>{{ name }} spent {{ spentFormatted }}</h3>
    <h2 class="ml-auto"><span class="badge" :class="pillColor">{{ owedFormatted }}</span></h2>
  </li>

  <li v-else class="list-group-item d-flex align-items-center">
    <font-awesome-icon 
      icon="save" 
      class="mr-3" 
      @click="handleSaveEdit" />
    <font-awesome-icon 
      icon="undo"
      class="mr-3"
      @click="handleCancelEdit" />
    <div class="d-flex flex-wrap align-items-center edit-fields">
      <input 
        type="text"
        maxlength="30"
        class="form-control"
        v-model="editPerson.name"
        id="name-input"
        placeholder="Name"
        required> 
      <h3>&nbsp;spent&nbsp;</h3>
      <div class="input-group flex-wrap-none" id="spent-input">
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
    <h2 class="ml-auto"><span class="badge" :class="pillColor">{{ owedFormatted }}</span></h2>
  </li>
</template>

<script>
import { formatNumber } from '../mixins/formatNumber.js';

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
    };
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
      this.editPerson = { name: this.name, spent: Number(this.spent) };
      this.cachedPerson = Object.assign({}, this.editPerson);
    },
    handleSaveEdit() {
      this.isEditable = false;

      let id = this.id;
      let editPerson = this.editPerson;
      this.$emit('edit-person', { editPerson, id });
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
};
</script>

<style scoped>
li:hover {
  cursor: default;
}

svg[data-icon='trash-alt']:hover,
svg[data-icon='undo']:hover {
  color: #f3969a;
  cursor: pointer;
}

svg[data-icon='edit']:hover,
svg[data-icon='save']:hover {
  color: #78c2ad;
  cursor: pointer;
}

#name-input {
  max-width: 200px;
}

#spent-input {
  max-width: 200px;
}

.badge {
  min-width: 120px;
  align-self: center;
}

h3,
h2 {
  margin-bottom: 0;
}

@media screen and (max-width: 576px) {
  h3,
  h2 {
    font-size: 14px;
  }

  .badge {
    min-width: 50px;
  }
}
</style>
