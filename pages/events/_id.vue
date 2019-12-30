<template>
  <div>
    Nombre del evento: {{ data.event.title }}
    <v-data-table
      :headers="headers"
      :items="data.invitations"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.accepted="{ item }">
        <v-chip :color="getColor(item.accepted)">{{ item.accepted }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import { async } from "q";
export default {
  data() {
    return {
      headers: [
        {
          text: "Nombre",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Lastname", value: "lastname" },
        { text: "Phone number", value: "phone" },
        { text: "Accepted", value: "accepted" }
      ]
    };
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}){
    try {
      const res = await axios.get(`http://localhost:3000/events/${params.id}`);
      const data = res.data;
      return { data };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  },
  methods: {
    getColor(status) {
      if (status == "Pendiente") return "yellow";
      else return "green";
    }
  }
};
</script>
