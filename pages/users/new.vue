<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="phone" :rules="phoneRules" label="Phone" required></v-text-field>
          </v-col>
          <v-btn class="mr-4" @click="submit">submit</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data: () => ({
    valid: false,
    name: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    phone: "",
    phoneRules: [v => !!v || "Phone is required"]
  }),
  methods: {
    async submit() {
      try {
        const res = await axios.post(`http://192.168.0.56:3000/users`, {name: this.name, lastname: this.lastname, phone: this.phone});
        this.$router.push("/users")
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    }
  }
};
</script>