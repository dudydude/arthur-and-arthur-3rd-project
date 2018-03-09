<template>
  <section>
    <ul class="mood">
      <li v-for="mood in moods">
        <b-button class="button-profile" @click="selectMood(mood._id)">{{mood.name}}</b-button>
      </li>
    </ul>
    <div v-if="moodcards.length !== null ">
      <ul>
        <li v-for="moodcard in moodcards.dish">




          <b-card>
            <b-media no-body>
              <b-media-body>
                <div class="text-center">
                  <h2 class="mt-0">{{moodcard.title}}</h2>
                </div>
                <div class="text-center">
                  <p>{{moodcard.cookingTime}}</p>
                </div>
                <p class="text-center">
                  <span class="keyWord" v-for="keyWord in moodcard.keyWords">{{keyWord}}</span>
                </p>
                <hr class="m-5 px-5">
                <div>
                  <div class="text-center">
                    <h5 class="m-1">{{moodcard.indication}}</h5>
                    <br>
                    <h6> Ingredients : </h6>
                  </div>
                  <ul v-if="kg" class="text-center">
                    <li v-for="ingredient in moodcard.ingredients">{{ingredient}}</li>
                  </ul>
                  <ul v-if="!kg" class="text-center">
                    <li v-for="ingredient in moodcards.ingredientsUSA">{{ingredient}}</li>
                  </ul>
                  <div class="text-center my-3">
                    <b-button v-if="btnShow" @click="kg=false ; btnShow=false" variant="warning btn-sm">Switch to oz</b-button>
                    <b-button v-if="!btnShow" @click="kg=true ; btnShow=true" variant="primary btn-sm">Switch to kg</b-button>
                  </div>
                </div>
                <p class="text-justify mx-5">
                  {{moodcard.method}}
                </p>







              </b-media-body>
            </b-media>
          </b-card>
        </li>
      </ul>
      <!-- <ul>
                 <li v-for="movie in results.slice(10*(page-1),10*page)"> -->

    </div>
    </div>
  </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      moods: "",
      moodcards: ""
    };
  },

  methods: {
    selectMood(id) {
      return api
        .selectMood(id)
        .then(selectMood => (this.moodcards = selectMood.data));
    }
  },
  computed: {},

  created() {
    return api.getMood().then(response => (this.moods = response.data));
  }
};
</script>
<style>
.mood {
  display: flex;
  flex-direction: row;
}

.button-profile {
  padding: 2rem;
  margin: 2%;
  width: auto;
  background-color: rgb(20, 143, 119);
  color: white;
  font-size: 1.6rem;
  border-radius: 50rem;
  -webkit-box-sizing: border-box;
  /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.button-profile:hover {
  padding: 2rem;
  margin: 2%;
  width: auto;
  font-size: 1.6rem;
  background-color: white;
  color: rgb(20, 143, 119);
  border: 4px solid rgb(20, 143, 119);
  border-radius: 50rem;
  -webkit-box-sizing: border-box;
  /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>