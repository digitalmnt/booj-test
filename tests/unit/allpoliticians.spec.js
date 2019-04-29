import { shallowMount, createLocalVue } from "@vue/test-utils";

import axios from 'axios';

import AllPoliticians from "@/components/AllPoliticians.vue"

import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';

// create an extended `Vue` constructor
const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue);
localVue.use(VueRouter);

const dummyData = [
  {
      "id": "6",
      "createdAt": "92832-0900",
      "name": "name 6",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kerem/128.jpg",
      "cooking": 92,
      "driving": 45,
      "dogtraining": 74,
      "singing": 71
  },
  {
      "id": "8",
      "createdAt": "83962-6766",
      "name": "name 8",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/madshensel/128.jpg",
      "cooking": 29,
      "driving": 86,
      "dogtraining": 8,
      "singing": 60
  },
  {
      "id": "9",
      "createdAt": "01882-3386",
      "name": "name 9",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/roybarberuk/128.jpg",
      "cooking": 18,
      "driving": 48,
      "dogtraining": 80,
      "singing": 13
  },
];

describe("AllPoliticians", () => {
  it("When politicians are returned from api, length of data returned should equal to length of element", () => {

    const wrapper = shallowMount(AllPoliticians, {localVue});
    wrapper.setData({userData: dummyData});

    expect(wrapper.findAll('.jumbotron').length).toBe(wrapper.vm.userData.length);

  })
})




const MockAdapter = require("axios-mock-adapter");

describe("AllPoliticians", () => {
  let wrapper;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    wrapper = shallowMount(AllPoliticians, {localVue});
    wrapper.setData({userData: dummyData});
  });

  afterEach(() => {
    mock.restore();
  });

  it("should display error message after politician is deleted.", async () => {

    mock.onDelete(`http://5cc1051982ec6a00149f3ffb.mockapi.io/booj/sunshine/13`).networkError();

    const result = await wrapper.vm.deletePerson(13);
    expect(wrapper.find('.delete-error').exists()).toBeTruthy()

  });
});
