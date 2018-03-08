<template>
  <section>
    <h2 class="m-2" v-if="showIt">Enter what you're craving for, we will find it for you:</h2>

    <div>
      <!-- search by title -->

      <b-form @submit="onSubmit" @reset="onReset" v-if="showIt">
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

      <b-form @submit="onSubmit" @reset="onReset" v-if="showIt">
        <!-- <b-form-input id="searchTitle" type="text" v-model="searchKeyWords" placeholder="Enter keywords">
          </b-form-input> -->
        <multiselect v-model="searchKeyWords" :multiple="true" :options="keywordOptions" placeholder="Search by keywords" label="name"
          track-by="name" class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2"></multiselect>

        <div class="text-center">
          <b-button type="submit" variant="primary" @click="searchByKeyWords">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>

      <!-- search by ingredients -->

      <b-form @submit="onSubmit" @reset="onReset" v-if="showIt">
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
      <b-button type="submit" variant="primary" @click="() => {page = Math.max(1, page-1)}">Previous Page</b-button>
      Page: {{page}}
      <b-button type="submit" variant="primary" @click="() => {page++}">Next Page</b-button>
      <ul>
        <li v-for="result in results.slice(10*(page-1),10*page)">
          <b-card>
            <b-media no-body>
              <b-media-body class="ml-3">
                <div class="text-center">
                  <h2 class="mt-0">{{result.title}}</h2>
                </div>
                <div class="text-center">
                  <p>{{result.cookingTime}}</p>
                </div>
                <p class="text-center">
                  <span class="keyWord" v-for="keyWord in result.keyWords">{{keyWord}}</span>
                </p>
                <hr class="m-5 px-5">
                <div>
                  Ingredients : {{result.indication}}

                  <br>
                  <ul v-if="kg">
                    <li v-for="ingredient in result.ingredients">{{ingredient}}</li>
                  </ul>
                  <ul v-if="!kg">
                    <li v-for="ingredient in result.ingredientsUSA">{{ingredient}}</li>
                  </ul>
                  <div class="text-left">
                    <b-button v-if="btnShow" @click="kg=false ; btnShow=false" variant="warning btn-sm">Switch to oz</b-button>
                    <b-button v-if="!btnShow" @click="kg=true ; btnShow=true" variant="primary btn-sm">Switch to kg</b-button>
                  </div>
                </div>
                <p class="text-justify">
                  {{result.method}}
                </p>

                <div class="text-center">
                  <b-button variant="primary" :to="`recipes/${result.id}`">See more</b-button>
                  <a :href="result.picURL">
                    <b-button class="primary">More Pictures</b-button>
                  </a>
                  <combo-vue :result="result"></combo-vue>





                </div>
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
  import Multiselect from "vue-multiselect";
  import ComboVue from "../components/ComboVue";

  import optionKeyWords from "../../../server/data/keywords_food.json";

  export default {
    data() {
      return {
        page: 1,
        kg: true,
        btnShow: true,
        searchTitle: "",
        ingredient: "",
        keywordOptions: optionKeyWords,
        searchKeyWords: "",
        showIt: true,
        otherShow: true,
        results: []
      };
    },
    components: {
      Multiselect,
      ComboVue
    },



    methods: {
      showModal() {
        this.$refs.myModalRef.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
      },
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
          this.showIt = true;
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
        const justKeyWords = [];
        const that = this;
        for (let i = 0; i < that.searchKeyWords.length; i++) {
          justKeyWords.push(that.searchKeyWords[i].name);
        }
        api.searchByKeyWords(justKeyWords).then(results => {
          this.results = results;
        });
      },


    }
  };
</script>