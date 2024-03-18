<!-- script setup uses the composition api -->
<script setup>
import { RouterLink } from 'vue-router'
//Props form a one-way data flow from a parent component to a child component
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: { type: String, required: true }
})
</script>

<!-- 
  The template tag hold some content that will be hidden when the page loads,
  vue exposes it.
  div are used because for a component there can only be one HTML tag defined at the top-level 
-->
<template>
  <header>
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <nav>
            <ul>
                <li><RouterLink to="/">Home</RouterLink></li>
                <li><RouterLink to="/about">About</RouterLink></li>
                <li><RouterLink to="/blog">Blog</RouterLink></li>
            </ul>
        </nav>
  </header>
</template>

<!-- the scoped style defines this style only for this component
omitting it would apply it to the entire app  -->
<style scoped>
header {
  margin: auto;
  padding: 20px;
  background-color: #88bbd6;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

header .title {
  font-size: 1em;
  margin: auto;
}

nav {
  margin: auto;
}

nav ul {
  list-style: none;
}

nav li {
  display: inline-block;
  padding-left: 1em;
  font-size: 1.5em;
}

@media screen and (max-width: 700px) {
  header {
    flex-direction: column;
  }
  header .title {
    padding-bottom: 0.5em;
  }
}

nav li a {
  text-decoration: none;
}

nav li a:visited {
  color: black;
}

nav li a.router-link-exact-active {
  position: relative;
}

nav li a.router-link-exact-active:after {
  position: absolute;
  content: '';
  height: 3px;
  left: 0;
  bottom: -10px;
  background: white;
  width: 100%;
}
</style>
