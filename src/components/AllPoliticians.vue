<template>
  <div class="container">
    <img style="max-height: 200px;" alt="Vue logo" src="../assets/wook.jpg">
    <h1>{{ msg }}</h1>
    <ModalCreatePerson v-on:userCreated="getUsers" />
    <b-modal ref="modal-2" id="modal-2" class="delete-error" title="There was an error deleting this person. Please try again later." hide-footer></b-modal>
    <div v-if="userData">
      <div class="mt-3">
        <h2>Sort the politicians by their important abilities:</h2>
        <h3>Best at:</h3>
        <b-button-group>
          <b-button v-on:click="sortBy('cooking', 'dsc')" variant="success">Cooking</b-button>
          <b-button v-on:click="sortBy('dogtraining', 'dsc')" variant="info">Dog Training</b-button>
          <b-button v-on:click="sortBy('driving', 'dsc')" variant="success">Driving</b-button>
          <b-button v-on:click="sortBy('singing', 'dsc')" variant="info">Singing</b-button>
        </b-button-group>
        <h3>Worst at:</h3>
        <b-button-group>
          <b-button v-on:click="sortBy('cooking', 'asc')" variant="success">Cooking</b-button>
          <b-button v-on:click="sortBy('dogtraining', 'asc')" variant="info">Dog Training</b-button>
          <b-button v-on:click="sortBy('driving', 'asc')" variant="success">Driving</b-button>
          <b-button v-on:click="sortBy('singing', 'asc')" variant="info">Singing</b-button>
        </b-button-group>
      </div>
      <div v-for="user in userData" v-bind:key="user.id">
        <div class="jumbotron" >
          <router-link v-bind:to="'/politician/' + user.id"><img :src="user.avatar" /></router-link>
          <router-link v-bind:to="'/politician/' + user.id"><h1>{{ user.name }}</h1></router-link>
          <h2>This persons abilities(0-100):</h2>
          <ul class="list-group">
            <li class="list-group-item">Cooking: {{ user.cooking }}</li>
            <li class="list-group-item">Dog Training: {{ user.dogtraining }}</li>
            <li class="list-group-item">Driving: {{ user.driving }}</li>
            <li class="list-group-item">Singing: {{ user.singing }}</li>
          </ul>
          <b-button v-on:click="deletePerson(user.id)" variant="danger">Delete Politician</b-button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>User Data is not currenlty available</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ModalCreatePerson from './ModalCreatePerson.vue';

export default {
  name: 'AllPoliticians',
  components: {
    ModalCreatePerson,
  },
  data() {
    return {
      msg: 'Filter Your Politician',
      userData: [],
      form: {
        name: '',
        cooking: '',
        dogtraining: '',
        driving: '',
        singing: '',
      },
      show: true,
      success: '',
    }
  },
  methods: {

    sortBy: function (type, comparison) {

      if (comparison === 'asc') {
        this.userData.sort((a,b) => (a[type] > b[type]) ? 1 : ((b[type] > a[type] ) ? -1 : 0));
      }

      if (comparison === 'dsc') {
        this.userData.sort((a,b) => (a[type] < b[type]) ? 1 : ((b[type] < a[type] ) ? -1 : 0));
      }


    },

    deletePerson: function(id) {
      axios.delete(`https://5cc1051982ec6a00149f3ffb.mockapi.io/booj/sunshine/${id}`)
      .then(() => {
        this.getUsers();
      })
      .catch(() =>  {
        this.$bvModal.show('modal-2');
      });

    },
    getUsers: function() {
      axios.get('https://5cc1051982ec6a00149f3ffb.mockapi.io/booj/sunshine')
      .then(res => {
          this.userData = res.data;
      })
      .catch(() => this.userData = null);
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
