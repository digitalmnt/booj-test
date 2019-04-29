<template>
  <div>
    <b-button variant="success" @click="showModal">Create Person</b-button>
    <b-modal ref="modal-1" id="modal-1" title="Create Your Ideal Politician" hide-footer>
      <b-form @submit="addPerson" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Full Name:"
          label-for="input-1"
          description="We'll never share your submission with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Ideal Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Cooking:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.cooking"
            type="number"
            required
            placeholder="23"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Dog Traing:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.dogtraining"
            type="number"
            required
            placeholder="32"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Driving:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.driving"
            type="number"
            required
            placeholder="64"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Singing:" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.singing"
            type="number"
            required
            placeholder="96"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <h1 v-if="success">{{success}}</h1>
    </b-modal>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Modal',
  data() {
    return {
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
    showModal: function() {
      this.show = true;
      this.form = {
        name: '',
        cooking: '',
        dogtraining: '',
        driving: '',
        singing: '',
      }
      this.success = '';
      this.$refs['modal-1'].show();
    },
    addPerson: function(e) {
      e.preventDefault();
      axios.post(`https://5cc1051982ec6a00149f3ffb.mockapi.io/booj/sunshine/`, {
        ...this.form
      })
      .then(() => {
        this.$emit('userCreated');
        this.success = 'You person has been added to the list!';
        this.show = false;
      })
      .catch(() =>  {
        this.$emit('userCreated');
      });
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}

</script>
