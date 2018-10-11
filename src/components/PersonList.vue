<template>
    <ul class="list-group pt-5">
      <Person 
        v-for="(person, index) in people" 
        :key="index"
        :id="index"
        :name="person.name"
        :spent="Number(person.spent)"
        :owed="amtOwedPerPerson - person.spent"        
        @delete-person="people.splice($event, 1)">
      </Person>
    </ul>
</template>

<script>
import Person from '../components/Person.vue'

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
}
</script>

<style>

</style>
