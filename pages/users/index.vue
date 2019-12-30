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
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <v-btn color="red" @click="deleteUser(user.phone)">Eliminar</v-btn>
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
      const res = await axios.get(`http://localhost:3000/users`);
      const users = res.data;
      return { users };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  },
  methods: {
    async deleteUser(phone) {
      try {
        const res = await axios.delete(`http://localhost:3000/users/${phone}`);
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