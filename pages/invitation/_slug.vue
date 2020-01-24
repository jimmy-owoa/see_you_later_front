<template>
  <div>
    <v-flex text-md-center>
      <h1>{{ data.title }}</h1> 
      <v-alert type="info">
      Para confirmar tu asistencia, haz click sobre el <v-icon>mdi-check-bold</v-icon>
    </v-alert>
    </v-flex>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left" v-for="(x,idx) in data.beauty_dates" :key="idx">{{x}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.data" :key="item.id">
            <td>{{item.name + " " + item.lastname}}</td>
            <td v-for="(invitation,idx) in item.invitations" :key="idx">
              <v-icon large :color="invitation.accepted ? 'green' : ''" @click="changeResponse(invitation.id)">mdi-check-bold</v-icon>
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
import AcceptedUsers from "@/components/AcceptedUsers"
export default {
  components:{
    AcceptedUsers
  },
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
        { text: "Phone number", value: "phone" }
        // { text: "Accepted", value: "accepted" },
      ],
      beautyDates: [],
      dateIds: []
    };
  },
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
      const res = await axios.get(`http://192.168.0.56:3000/events/${params.slug}`);
      const data = res.data;
      return { data };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  },
  created() {
    // let a = []
    // let b = []
    // this.data.invitations.forEach(element => {
    //   a.push(element.beauty_date)
    //   this.dateIds.push({id: element.id, accepted: element.accepted})
    //   this.headers.push({ text: element.beauty_date, value: element.id });
    // });
    // this.beautyDates = [...new Set(a)]
  },
  methods: {
    getColor(status) {
      if (status == "Rechazado") return "red";
      else return "green";
    },
    getInvitations(){
      return [...new Set(this.data.invitations.map(item => item.user_id))];
    },
    changeResponse(item) {
      // console.log(item)
      try {
        axios
          .put(`http://192.168.0.56:3000/invitations/${item}/change_response/`)
          .then(res => {
            this.getMessage(res.status);
          })
          .catch(e => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    },
    getMessage(status) {
      if (status == "200") {
        this.refresh();
      } else {
        alert("Hubo un problema en la solicitud.");
      }
    },
    async refresh() {
      const { data: refresh } = await axios.get(
        `http://192.168.0.56:3000/events/${this.$route.params.slug}`
      );
      this.data = refresh;
    }
  }
};
</script>
