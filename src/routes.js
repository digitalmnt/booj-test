import Politician from './components/Politician.vue';
import AllPoliticians from './components/AllPoliticians.vue';

export default [
  { path: '/', component: AllPoliticians },
  { path: '/politician/:id', component: Politician }
]
