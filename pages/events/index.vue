<template>
  <div>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nombre del evento</th>
              <th class="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td>{{ event.title }}</td>
              <td>
                <v-btn color="#35ca8f" dark :to="`/invitation/` + event.slug">Ver</v-btn>
                <v-btn color="#ca4435" dark @click="deleteEvent(event.slug)">Eliminar</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-flex sm12 pt-3>
      <v-btn color="#35ca8f" dark to="events/new">Nuevo</v-btn>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";
import { async } from "q";
export default {
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    try {
      const res = await axios.get(`http://192.168.0.56:3000/events`);
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
        const res = await axios.delete(`http://192.168.0.56:3000/events/${id}`);
        if (res.status == "200") this.$router.go();
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    }
  }
};
</script>