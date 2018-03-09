<template>
  <div class="text-center container">
    <h2 class="m-2 mt-3">Dine & Chill<br>watching Movies</h2>
    <hr class="m-3">
    <div>
      <h3 class="m-2">The Concept - coz Netflix'nd Chill is out of date.</h3>
      <p class="text-justify mx-5 my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis et est ut rutrum. Class aptent taciti sociosqu
        ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus semper finibus scelerisque. Nunc convallis
        nulla eget diam egestas, vitae pharetra dolor suscipit. Donec malesuada congue urna et pretium. Integer dignissim
        tortor eu finibus venenatis. Nulla vel ipsum sed felis faucibus tempus sed eu mi.</p>
      <br>
      <b-button :to="`/profile`" class="button-profile">GO✨✨🚀</b-button>
      <br>
    </div>
  </div>
</template>

<style scoped>
.button-profile {
  padding: 2rem;
  margin: 2%;
  width: 25vh;
  background-color: rgb(20, 143, 119);
  color: white;
  font-size: 1.6rem;
  border-radius: 50rem;
}

.button-profile:hover {
  padding: 2rem;
  margin: 2%;
  width: 30vh;
  font-size: 2rem;
  background-color: white;
  color: rgb(20, 143, 119);
  border: 4px solid rgb(20, 143, 119);
  border-radius: 50rem;
}
</style>
