<!-- eslint-disable no-unused-vars -->
<!-- script setup uses the composition api -->
<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'
import Banner from './Banner.vue'
import axios from 'axios'
import { useBannerStore } from '@/store/banner'

const store = useBannerStore()

const message = ref('List of Users:')
const users = ref([])
const showUsers = ref(true)
const largestUserIndex = ref(0)

const createUser = (user) => {
  if (user.name !== '' && user.username !== '' && user.email !== '') {
    var newUser = {
      id: largestUserIndex.value + 1,
      name: user.name,
      username: user.username,
      email: user.email
    }
  }
  // Add the new user to the database via a HTTP POST call
  axios
    .post('https://jsonplaceholder.typicode.com/users', newUser)
    .then((response) => {
      // handle success
      store.setBannerData('SUCCESS! User data was saved!', 'Success')

      // Add the user to the local array of users
      users.value.push(newUser)

      // Increase the largest index used in the database
      largestUserIndex.value++
    })
    .catch((error) => {
      // handle error
      store.setBannerData('ERROR! Unable to save user data!', 'Error')
      console.log(error)
    })
    .finally((response) => {
      // always executed
      console.log('HTTP POST Finished!')
    })
}

const deleteUser = (user) => {
  // Find the user
  var userIndex = users.value.indexOf(user)

  // Delete the user from the database via a HTTP DELETE call
  axios
    .delete('https://jsonplaceholder.typicode.com/users/' + user.id)
    .then((response) => {
      // handle success
      store.setBannerData('SUCCESS! User #' + user.id + ' was deleted!', 'Success')
      // Delete the user from the local array of users
      users.value.splice(userIndex, 1)
    })
    .catch((error) => {
      // handle error
      store.setBannerData('ERROR! Unable to delete user #' + user.id + '!', 'Error')
      console.log(error)
    })
    .finally((response) => {
      // always executed
      console.log('HTTP DELETE Finished!')
    })
}

const updateUser = (user) => {
  // Find the user
  const userIndex = users.value.findIndex((currentUser) => {
    if (currentUser.id === user.id) {
      return true
    }
  })

  // The argument passed in is a custom object with the following fields:
  //   - id: the ID number of the user (as stored in the database)
  //   - name: name of the user
  //   - username: username of the user
  //   - email: email of the user

  // Update the user in the database via a HTTP PUT call
  axios
    .put('https://jsonplaceholder.typicode.com/users/' + user.id)
    .then((response) => {
      // handle success
      store.setBannerData('SUCCESS! User #' + user.id + ' was updated!', 'Success')
      console.log(user)

      // Update the user in the local array of users
      users.value[userIndex].name = user.name
      users.value[userIndex].username = user.username
      users.value[userIndex].email = user.email
    })
    .catch((error) => {
      // handle error
      store.setBannerData('ERROR! Unable to update user #' + user.id + '!', 'Error')
      console.log(error)
    })
    .finally((response) => {
      // always executed
      console.log('HTTP PUT Finished!')
    })
}

// ---------------
// Lifecycle Hooks
// ---------------
onBeforeMount(() => {
  console.log('App.vue: onBeforeMount() called!')
  console.log('Users in the system')
  console.log(users.value.length)
})
onMounted(async () => {
  console.log('App.vue: onMounted() called!')

  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      console.log('Received response.data:')
      console.log(response.data)

      store.setBannerData('SUCCESS! Loaded user data!', 'Success')

      users.value = response.data

      largestUserIndex.value = users.value.length

      console.log('Users array in success callback:')
      console.log(users.value.length)
    })
    .catch((error) => {
      // handle error
      console.log('Error in axios.get() call: ' + error)
      store.setBannerData('ERROR! Unable to load user data!', 'Error')
    })
    .finally((response) => {
      // always executed
      console.log('Finished!')
    })
})

onBeforeUnmount(() => {
  console.log('App.vue: onBeforeUnmount() called!')
  console.log('Users array in success callback:')
  console.log(users.value)
})
onUnmounted(() => {
  console.log('App.vue: onUnmounted() called!')
})
</script>

<!-- 
  The template tag hold some content that will be hidden when the page loads,
  vue exposes it.
  div are used because for a component there can only be one HTML tag defined at the top-level 
-->
<template>
  <main>
    <Banner></Banner>
    <AddNewUser v-on:createUser="createUser"></AddNewUser>
    <h1>{{ message }}</h1>
    <ListUsers v-bind:users="users" v-on:deleteUser="deleteUser" v-on:updateUser="updateUser">
    </ListUsers>
  </main>
</template>

<!-- the scoped style defines this style only for this component
omitting it would apply it to the entire app  -->
<style scoped>
main {
  margin: 0 auto;
  max-width: 400px;
  padding: 1em;
}
button {
  background-color: #99d3df;
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8em;
  text-align: center;
  border: 1px solid black;
}

button:hover {
  background-color: #88bbd6;
  cursor: pointer;
}
</style>
