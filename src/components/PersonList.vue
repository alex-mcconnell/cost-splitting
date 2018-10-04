<template>
  <div class="container pt-5">
    <ul class="list-group">
      <Person 
        v-for="(person, index) in people" 
        :key="index"
        :name="person.name"
        :spent="Number(person.spent)">
      </Person>
    </ul>
  </div>
</template>

<script>
import Person from '../components/Person.vue';

export default {
  components: {
    Person: Person
  },
  props: {
    people: Array
  }
}
</script>

<style>

</style>
