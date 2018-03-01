<template>
    <section>
<h2 class="m-2" v-if="show">Enter what you're craving for, we will find it for you:</h2>
<h2 class="m-2" v-if="otherShow">Enter what you've, we will do the rest for you:</h2>

    <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" v-elseif="otherShow">
      <b-form-group id="recipeName"
                    label="Recipe name"
                    label-for="exampleInput2">
        <b-form-input id="dishName"
                      type="text"
                      v-model="form.dishname"
                      placeholder="Enter the name of a dish">
        </b-form-input>
      </b-form-group>
      <b-form-group id="cuisineType"
                    label="Cuisine Type"
                    label-for="exampleInput2">
        <b-form-input id="keywordsMarmiton"
                      type="text"
                      v-model="form.keywordsMarmiton"
                      placeholder="Enter a type of cuisine">
        </b-form-input>
      </b-form-group>
      <b-form-group id="courseTypeForm"
                    label="Which course?"
                    label-for="exampleInput3">
        <b-form-select id="courseType"
                      :options="foods"
                      v-model="form.food">
        </b-form-select>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <div class="text-center">
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        dishname: "",
        keywordsMarmiton: [],
        food: null,
        checked: []
      },
      foods: [
        { text: "Select One", value: null },
        "Starter",
        "Main Course",
        "Dessert",
        "Apéritif"
      ],
      show: true,
      otherShow: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.otherShow = false;
      this.$nextTick(() => {
        this.show = true;
        this.otherShow = true;
      });
    }
  }
};
</script>
