
<template>
  <div>
    <h1>Now it's time to choose how can we help you</h1>
    <link-router :to=`/mood`>Mood</router-link>
    <p>Or </p>
    <link-router :to=`/food`>Food</router-link>
  </div>
</template>

<script>

export default {
  data() {
    return {
      secret: null
  }}
};
</script>
