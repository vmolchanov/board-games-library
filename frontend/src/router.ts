import Authenticate from './scenes/authenticate/authenticate.vue';

// Games
import Codenames from './games/codenames/codenames.vue';

export const routes = [
  {
    path: '/join/:header/:payload/:signature',
    name: 'Authenticate',
    component: Authenticate,
    props: true,
  },
  {
    path: '/codenames',
    name: 'Codenames',
    component: Codenames,
  },
];
