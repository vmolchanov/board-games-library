import {defineComponent} from 'vue';
import {v4 as uuidv4} from 'uuid';

export default defineComponent({
  name: 'codenames-input',
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
  },
  emits: ['input'],
  data() {
    return {
      id: uuidv4(),
    };
  },
  methods: {
    onInput(value: string) {
      this.$emit('input', value);
    },
  },
});
