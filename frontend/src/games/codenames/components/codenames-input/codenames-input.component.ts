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
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      id: uuidv4(),
    };
  },
  methods: {
    onInput(e: Event) {
      console.log('input')
      switch (this.type) {
        case 'number':
          this.$emit('update:modelValue', Number((e.target as HTMLInputElement).value));
          break;
        default:
          this.$emit('update:modelValue', (e.target as HTMLInputElement).value.toString());
      }
    },
  },
});
