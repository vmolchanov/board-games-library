import {defineComponent} from 'vue';
import {AuthService} from '../../api/auth';

export default defineComponent({
  name: 'authenticate',
  props: {
    // from router
    header: {
      type: String,
      required: true,
    },
    // from router
    payload: {
      type: String,
      required: true,
    },
    // from router
    signature: {
      type: String,
      required: true,
    },
  },
  created() {
    const token = `${this.header}.${this.payload}.${this.signature}`;

    AuthService
      .loginByLink(token)
      .then((token: string) => {
        localStorage.setItem('token', token);
        setTimeout(() => {
          this.$router.push({name: 'Codenames'});
        }, 2000);
      });
    console.log('гыгы')
  },
  data() {
    return {
      isAuthenticateError: false,
    };
  },
});
