<template>
    <nav class="navbar navbar-dark bg-primary fixed-top">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">
          <font-awesome-icon icon="hand-holding-usd" class="mr-3 mb-1" />Cost Splitting
        </a>        
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