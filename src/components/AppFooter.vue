<!-- 
  The template tag hold some content that will be hidden when the page loads,
  vue exposes it.
  div are used because for a component there can only be one HTML tag defined at the top-level 
-->
<template>
  <footer>
    <slot name="message">Default footer</slot>
    <p><slot name="link"></slot></p>
  </footer>
</template>

<!-- the scoped style defines this style only for this component
omitting it would apply it to the entire app  -->
<style scoped>
footer {
  text-align: center;
  border-top: 1px solid #88bbd6;
  padding: 10px;
}
</style>
