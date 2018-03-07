<template>
  <section>
    <h2 class="m-2" v-if="show">Enter what you're craving for, we will find it for you:</h2>

    <div>
      <!-- search by title -->

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="byRecipeName" label="Recipe name" label-for="exampleInput2">
          <b-form-input id="searchTitle" type="text" v-model="searchTitle" placeholder="Enter the name of a dish">
          </b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary" @click="searchByTitle">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>

      <!-- search by keywords -->

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="byKeyWords" label="Key Words" label-for="exampleInput2">
          <b-form-input id="searchTitle" type="text" v-model="searchKeyWords" placeholder="Enter keywords">
          </b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary" @click="searchByKeyWords">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>

      <!-- search by ingredients -->

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="byIngredients" label="Ingredients" label-for="exampleInput2">
          <b-form-input id="searchTitle" type="text" v-model="ingredient" placeholder="Enter ingredients">
          </b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary" @click="searchByIngredients">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>

    </div>
<div>
      <ul>
        <li v-for="result in results">
          <b-card>
            <b-media no-body>
              <b-media-aside vertical-align="center">
                <b-img width="250" height="400" alt="Miam Miam Pic" :src="result.url" style="width: 20rem; max-height: 50rem"
                />
              </b-media-aside>
              <b-media-body class="ml-3">
                <h3 class="mt-0">Title : {{result.title}}</h3>
                <p>Cooking Indication:
                  <br>{{result.cookingTime}}
                </p>
                <p>
                  {{result.keyWords}}
                </p>
                <p>
                  Ingredients : {{result.indication}}
                  <br>{{result.ingredients}}
                </p>
                <p>
                  <br>{{result.method}}
                </p>


                <b-button variant="primary" :to="`recipes/${result.id}`">See more</b-button>

              </b-media-body>

            </b-media>
          </b-card>
        </li>
      </ul>
</div>
  </section>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      searchTitle: "",
      ingredient: "",
      searchKeyWords: "",
      show: true,
      otherShow: true,
      results: []
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
    },

    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.searchTitle = "";
      this.ingredient = "";
      this.searchKeyWords = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.otherShow = false;
      this.$nextTick(() => {
        this.show = true;
        this.otherShow = true;
      });
    },
    searchByTitle(searchTitle) {
      api.searchByTitle(this.searchTitle).then(results => {
        this.results = results;
      });
    },
    searchByIngredients(ingredient) {
      api.searchByIngredients(this.ingredient).then(results => {
        this.results = results;
      });
    },
    searchByKeyWords(searchKeyWords) {
      api.searchByKeyWords(this.searchKeyWords).then(results => {
        this.results = results;
      });
    }
  }
};
</script>