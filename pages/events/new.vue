<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="title" :rules="titleRules" :counter="10" label="Title" required></v-text-field>
          </v-col>

          <v-col>
            <v-time-picker v-model="date"></v-time-picker>
          </v-col>

          <v-col>
            <v-date-picker v-model="time"></v-date-picker>
          </v-col>
          date: {{ date }}
          time: {{ time}}
          <v-btn class="mr-4" @click="submit">submit</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    title: "",
    time: "",
    date: "",
    titleRules: [
      v => !!v || "Title is required",
      v => v.length <= 5 || "Title must be less than 5 characters"
    ],
    dateRules: [v => !!v || "Date is required"]
  }),
  methods: {
    async submit() {
      try {
        const res = await axios.post(`http://localhost:3000/events`, {
          title: this.title,
          date: this.date
        });
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    }
  }
};
</script>