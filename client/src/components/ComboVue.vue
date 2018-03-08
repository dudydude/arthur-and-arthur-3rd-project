<template>
  <div>
    <b-button @click="showModal">
      Open Modal
    </b-button>
    <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
      <b-button variant="primary" @click="selectRecipe(this.$root.result.title)">Super combo !</b-button>
                
    </b-modal>
  </div>
</template>

<script>
import result from "../components/SearchForFood.vue";
import api from "../api";

export default {
  methods: {
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    selectRecipe(id) {
      api.selectRecipe(id).then(res => {
        console.log("Im in");
        console.log(res);
      });
    }
  }
};
</script>