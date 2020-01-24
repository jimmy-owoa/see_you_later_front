<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
        <ruby-logo/>
      </div>
      <v-card>
        <v-card-title class="headline"> Nuxt.js + Vuetify 2 + Ruby on Rails 6</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-flex sm12 text-md-center>
          <v-btn color="primary" nuxt to="/events">Ir al listado de eventos</v-btn>

          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import RubyLogo from "~/components/RubyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
    RubyLogo
  }
};
</script>
