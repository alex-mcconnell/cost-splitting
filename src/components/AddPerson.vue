<template>
  <div class="container pt-5">
    <form @submit.prevent="handleAddPerson">
      <fieldset>
        <div class="row justify-content-center">
          <div class="col-sm-auto pb-4">
            <input 
              type="text" 
              class="form-control"
              id="nameInput"
              placeholder="Name"
              v-model="person.name"
              required>
          </div>
          <div class="col-sm-auto pb-4">
            <div class="input-group mb-3">
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
                v-model="person.spent"
                required>
            </div>
          </div>
          <div class="col-auto pb-4">
            <button type="submit" class="btn btn-primary">Add Person</button>
          </div>
        </div>
      </fieldset>
    </form>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: {
        name: '',
        spent: null
      }
    }
  },
  methods: {
    handleAddPerson() {
      let newPerson = {
        name: this.person.name,
        spent: this.person.spent
      };

      this.$emit('person-added', newPerson);
      
      // Clear fields and refocus cursor
      this.person.name = '';
      this.person.spent = null;
      document.querySelector('#nameInput').focus();
    }
  }
}
</script>

<style>

</style>
