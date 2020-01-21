<template>
  <div>
    <h1> {{ data.event.title }}</h1>
    <h3>Participantes que han aceptado la invitación: {{ data.accepted_users}}</h3>
    <v-data-table
      :headers="headers"
      :items="data.invitations"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.status="{ item }">
        <v-chip color="green" class="white--text" v-if="item.status">Aceptado</v-chip>
        <v-chip color="red" class="white--text" v-else>Rechazado</v-chip>
      </template>
      <template v-slot:item.accepted="{ item }">
        <v-btn color="green" :disabled="item.accepted" @click="changeResponse(item)">Aceptar</v-btn>
        <v-btn color="red" :disabled="!item.accepted" @click="changeResponse(item)">Rechazar</v-btn>
      </template>
    </v-data-table>
    <v-btn color="teal" to="/events">Volver</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { async } from "q";
export default {
  data() {
    return {
      headers: [
        { text: "Estado", value: "status" },
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
      if (status == "Rechazado") return "red";
      else return "green";
    },
    changeResponse(item) {
      try {
        axios
          .put(`http://localhost:3000/invitations/${item.id}/change_response/`)
          .then(res => {
            this.getMessage(res.status, item);
          })
          .catch(e => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    },
    getMessage(status, item) {
      if (status == "200") {
        alert("Estado de invitación cambiada.");
        this.refresh();
      } else {
        alert("Hubo un problema en la solicitud.");
      }
    },
    async refresh(){
      const { data: refresh } = await axios.get(`http://localhost:3000/events/${this.$route.params.id}`);
      this.data = refresh
    }
  }
};
</script>
