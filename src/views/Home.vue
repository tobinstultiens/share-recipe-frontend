<template>
  <div>
    <v-app-bar>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-app-bar>
    <v-row>
      <v-col :cols="6">
        <kweet-message class="mt-4" username="sup" message="hey" />
      </v-col>
      <v-col class="mt-4" :cols="6">
        <v-text-field label="Search" outlined></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import ComponentLoader from "@/helpers/ComponentLoader";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    kweetMessage: () => ComponentLoader("kweets/KweetMessage"),
  },
})
export default class Home extends Vue {}
</script>
