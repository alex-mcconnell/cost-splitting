<template>
    <ul class="list-group">
      <Person 
        v-for="(person, index) in people" 
        :key="index"
        :id="index"
        :name="person.name"
        :spent="Number(person.spent)"
        :owed="amtOwedPerPerson - person.spent"        
        @delete-person="$emit('delete-person', $event)"
        @edit-person="$emit('edit-person', $event)" />
    </ul>
</template>

<script>
import Person from '../components/Person.vue';

export default {
  components: {
    Person: Person
  },
  props: {
    people: Array,
    amtOwedPerPerson: {
      type: Number,
      default: 0
    }
  }
};
</script>