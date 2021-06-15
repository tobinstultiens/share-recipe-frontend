<template>
  <div>
    <v-textarea v-model="message" color="teal">
      <template v-slot:label>
        <div>Message</div>
      </template>
    </v-textarea>
    <v-btn @click="sendMessage">Send Message</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: () => ({
    message: "",
  }),
  methods: {
    sendMessage(): void {
      Vue.$kweetService.setKweet({ message: this.$data.message });
    },
  },
})
export default class CreateRecipe extends Vue {}
</script>
