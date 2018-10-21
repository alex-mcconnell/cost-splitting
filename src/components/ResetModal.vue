<template>
  <div class="modal" :style="{'display': display}">
    <div class="modal-dialog d-flex" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Are you sure?</h5>
        </div>
        <div class="modal-body">
          <p>You put a lot of work into this...</p>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="$emit('reset-list')">Yes</button>
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="$emit('cancel-reset-list')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    display: String
  }
}
</script>

<style>
  .modal {
    background-color: rgba(46, 46, 46, 0.85);
  }
</style>