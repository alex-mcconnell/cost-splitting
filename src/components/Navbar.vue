<template>
    <nav class="navbar navbar-dark bg-primary fixed-top" id="nav">
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
};
</script>

<style>
@media screen and (max-width: 500px) {
  .navbar-header, 
  .navbar-right {
    float: left;
    text-align: center;
    width: 100%;
  }
  .navbar-brand {
    float: none;
  }
}
</style>
