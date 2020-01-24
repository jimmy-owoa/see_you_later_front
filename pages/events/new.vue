<template>
  <v-card>
    <v-container>
      <v-form>
        <!-- date: {{ date }} time: {{ time }}
        formatted: {{ new Date(date + " " + time)}}-->
        <v-flex sm12>
          <v-layout row wrap>
            <v-flex sm3>
                <v-text-field
                  v-model="title"
                  :rules="titleRules"
                  :counter="30"
                  label="Nombre del evento"
                  required
                ></v-text-field>
                <v-date-picker
                  v-model="date"
                  multiple
                  light
                  locale="es-cl"
                  color="#ca4435"
                  header-color="#ca4435"
                ></v-date-picker>
            </v-flex>
            <v-flex sm9 pt-5 mt-5>
                <v-flex v-if="date.length" sm12>
                  <v-layout row wrap>
                    <v-flex v-for="(time,i) in date.length" :key="i">
                      <v-flex text-md-center headline font-weight-bold>{{date[i]}}</v-flex>
                      <v-flex text-md-center>
                        <v-time-picker
                          header-color="#ca4435"
                          @change="addTime(date[i], $event)"
                          light
                          width="250"
                        ></v-time-picker>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>
            </v-flex>
            <v-flex sm12>
              <v-col cols="12">
                <v-autocomplete
                  v-model="participants"
                  :items="users"
                  filled
                  chips
                  color="blue-grey lighten-2"
                  label="Selección de invitados"
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
                      </v-avatar>-->
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
                      </v-list-item-avatar>-->
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-flex md12 text-md-center>
                <v-btn class="mr-4" @click="submit" color="#35ca8f" dark>crear</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-form>
    </v-container>
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
    title: "",
    time: "",
    date: [],
    dates: [],
    titleRules: [
      v => !!v || "Title is required",
      v => v.length >= 5 || "Title must be more than 5 characters",
      v => v.length <= 30 || "Title must be less than 30 characters"
    ],
    dateRules: [v => !!v || "Date is required"]
  }),
  methods: {
    async submit() {
      axios.defaults.baseURL = (process.env.NODE_ENV == "development") ? this.$store.state.env.DEV : this.$store.state.env.PROD
      try {
        const res = await axios.post(`/events`, {
          title: this.title,
          dates: this.dates,
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
    },
    addTime(new_date, e) {
      new_date = new Date(new_date + " " + e);
      let answer = this.dates.find(
        a => a.substring(0, 10) == new_date.toString().substring(0, 10)
      );
      if (answer) {
        // answer = new_date
        let index = this.dates.indexOf(answer);
        this.dates.splice(index, 1);
        this.dates.push(new_date.toString());
      } else {
        console.log(new_date.toString());
        this.dates.push(new_date.toString());
      }
    }
  },
  async beforeMount() {
    try {
      const res = await axios.get(`/users`);
      this.users = res.data;
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  }
};
</script>