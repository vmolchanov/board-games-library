import {defineComponent} from 'vue';

export default defineComponent({
  name: 'tip-form',
  data() {
    return {
      tip: '',
      count: 0,
    };
  },
  methods: {
    onFormSubmit() {
      this.$emit('submit', {
        tip: this.tip,
        count: this.count,
      });
    },
  },
});
