<template>
  <v-alert
    type='error'
    :value='true'
    dismissible
    transition='scale-transition'
  >
    <h3>{{ message.replace('GraphQL error:', '') }}</h3>
  </v-alert>
</template>

<script>
export default {
  props: ["message"]
};
</script>
