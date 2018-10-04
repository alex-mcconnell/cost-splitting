<template>
  <div class="container pt-5">
    <form>
      <fieldset>
        <div class="row justify-content-center">
          <div class="col-sm-auto pb-4">
            <input type="text" class="form-control" placeholder="Name">
          </div>
          <div class="col-sm-auto pb-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
            </div>
              <input type="number" class="form-control" id="spentInput" min="0.00" step="0.01" aria-label="Amount (to the nearest cent)" placeholder="Spent">
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

}
</script>

<style>

</style>
