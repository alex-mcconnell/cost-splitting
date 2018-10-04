<template>
    <nav class="navbar navbar-dark bg-primary">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Cost Splitting</a>        
        </div>
        <div class="nav navbar-nav navbar-right">
          <h5 class="mb-1">Total Cost: <span class="text-muted">{{ totalCost }}</span></h5>
        </div>
  </nav>
</template>

<script>
export default {
  props: {
    totalCost: {
      type: String,
      default: '$0.00'
    }
  }
}
</script>

<style>

</style>
