<template>
  <div>
    <v-app-bar>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer />
      <v-btn @click="logout">Log Out</v-btn>
    </v-app-bar>
    <v-row v-model="kweets">
      <div v-for="kweet in kweets" :key="kweet.id">
        <v-col :cols="6">
          <kweet-message class="mt-4" :kweet="kweet" />
        </v-col>
      </div>
      <v-col class="mt-4" :cols="6">
        <v-text-field label="Search" outlined></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import ComponentLoader from "@/helpers/ComponentLoader";
import { IRootState } from "@/interfaces/IRootState";
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";

@Component({
  components: {
    kweetMessage: () => ComponentLoader("kweets/KweetMessage"),
  },
  methods: {
    logout() {
      Vue.$keycloak.logout();
    },
  },
  computed: {
    kweets: {
      get() {
        return (this.$store as Store<IRootState>).state.kweet.kweets;
      },
      set(val) {
        this.$store.commit("card/setCardArray", val);
      },
    },
  },
})
export default class Home extends Vue {}
</script>
