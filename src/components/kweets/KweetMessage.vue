<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ username }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ message }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="imageUrl"></v-img
      ></v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    username: String,
    message: String,
    imageUrl: String,
  },
})
export default class KweetMessage extends Vue {}
</script>
