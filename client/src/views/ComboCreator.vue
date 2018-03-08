<template>

    <div class="container">
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="exampleInputGroup1" label="Enter new combo name:" label-for="exampleInput1" description="Come as you are, we won't judge you.">
                <b-form-input id="exampleInput1" type="text" v-model="moodName" required placeholder="Enter combo name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2" label="Enter new combo name:" label-for="exampleInput1" description="Come as you are, we won't judge you.">

                <multiselect v-model="movieThemeKeyword" :multiple="true" :options="MovieKeywordOptions" placeholder="Search by keywords"
                    label="name" track-by="name" class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2"></multiselect>

            </b-form-group>
            <b-form-group id="exampleInputGroup3" label="Enter new combo name:" label-for="exampleInput1" description="Come as you are, we won't judge you.">

                <multiselect v-model="foodThemeKeyword" :multiple="true" :options="FoodKeywordOptions" placeholder="Search by keywords" label="name"
                    track-by="name" class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2"></multiselect>

            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>


<script>
    import api from "../api";
    import Multiselect from "vue-multiselect";
    import optionKeyWords from "../../../server/data/keywords_food.json";
    import dataKeyword from "../../../server/data/keywords_tmdb.json";

    export default {
        data() {
            return {
                FoodKeywordOptions: optionKeyWords,
                foodThemeKeyword: [],
                MovieKeywordOptions: dataKeyword,
                movieThemeKeyword: [],
                moodName: ""
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

                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            },

            createCombo() { }
        },
        components: {
            Multiselect
        }
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
    .field {
        display: flex;
        flex-direction: row;
    }
</style>