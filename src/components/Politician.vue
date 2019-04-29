<template>
  <div class="container">
    <router-link v-bind:to="'/'">Back to all users</router-link>
    <div v-if="user">
      <div class="jumbotron">
        <img :src="user.avatar" />
        <h1>{{ user.name }}</h1>
        <h2>This persons abilities(0-100):</h2>
        <ul class="list-group">
          <li class="list-group-item">Cooking: {{ user.cooking }}</li>
          <li class="list-group-item">Dog Training: {{ user.dogtraining }}</li>
          <li class="list-group-item">Driving: {{ user.driving }}</li>
          <li class="list-group-item">Singing: {{ user.singing }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <h1>User Data is not currenlty available</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Politician',
  data () {
    return {
        id: this.$route.params.id,
        user: {
          name: '',
          cooking: '',
          dogtraining: '',
          driving: '',
          singing: '',
          avatar: '',
          id: '',
        }
    }
  },
  methods: {
    getUser: function() {
      axios.get(`https://5cc1051982ec6a00149f3ffb.mockapi.io/booj/sunshine/${this.id}`)
      .then(res => {
          this.user = res.data;
      })
      .catch(() => this.user = null);
    },
  },
  created() {
    this.getUser();
  },
}
</script>
