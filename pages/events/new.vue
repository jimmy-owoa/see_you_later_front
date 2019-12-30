<template>
  <v-card dark>
    <v-form>
      <v-container>
        date: {{ date }} time: {{ time }}
        formatted: {{ new Date(date + " " + time)}}
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="title" :rules="titleRules" :counter="20" label="Title" required></v-text-field>
          </v-col>
          <v-col>
            <v-time-picker v-model="time" light></v-time-picker>
          </v-col>
          <v-col>
            <v-date-picker v-model="date" light></v-date-picker>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="participants"
              :items="users"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="id"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <!-- <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar> -->
                  {{ data.item.name + ' ' + data.item.lastname }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <!-- <v-list-item-avatar>
                    <img :src="data.item.avatar" />
                  </v-list-item-avatar> -->
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          {{ participants }}
          <v-flex md12>
            <v-btn class="mr-4" @click="submit">submit</v-btn>
          </v-flex>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    autoUpdate: true,
    participants: [],
    name: "Midnight Crew",
    users: [],
    title: "The summer breeze",
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
          date: new Date(this.date + " " + this.time),
          invitations: this.participants
        });
        this.$router.push("/events");
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    },
    remove(item) {
      const index = this.participants.indexOf(item.name);
      if (index >= 0) this.participants.splice(index, 1);
    }
  },
  async beforeMount() {
    try {
      const res = await axios.get(`http://localhost:3000/users`);
      console.log(res.data)
      this.users = res.data
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  }
};
</script>