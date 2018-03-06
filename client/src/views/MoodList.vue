<template>
    <div class="container">
        <h2>HEllo list</h2>
        <ul>
            <li v-for="mood in moods">
                <h3> {{mood.name}} </h3>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {};
</script>

<style>
</style>