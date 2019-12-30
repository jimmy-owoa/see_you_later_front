<template>
  <div>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.title }}</td>
            <td>{{ event.date }}</td>
            <td>
              <v-btn color="red" @click="deleteEvent(event.id)">Eliminar</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
import { async } from "q";
export default {
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}){
    try {
      const res = await axios.get(`http://localhost:3000/events`);
      const events = res.data;
      return { events };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  },
  methods: {
    async deleteEvent(id) {
      try {
        const res = await axios.delete(`http://localhost:3000/events/${id}`);
        if (res.status == "200")
          this.$router.go()
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    }
  }
};
</script>