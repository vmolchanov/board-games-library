import {defineComponent} from 'vue';

import CodenamesInput from '../codenames-input/codenames-input.vue';

export default defineComponent({
  name: 'tip-form',
  props: {
    countOfNotOpenedWords: {
      type: Number,
      required: true,
    },
  },
  components: {
    CodenamesInput,
  },
  mounted() {
    this.tipInput = this.$refs.tipInputRef.$el.querySelector('input');
    this.countInput = this.$refs.countInputRef.$el.querySelector('input');
  },
  data() {
    return {
      tipInput: null as HTMLInputElement | null,
      countInput: null as HTMLInputElement | null,

      tip: '',
      count: 0,
    };
  },
  emits: ['submit'],
  methods: {
    onFormSubmit() {
      if (this.validate()) {
        this.$emit('submit', {
          tip: this.tip,
          count: this.count,
        });
      }
    },

    validate(): boolean {
      const words = this.tip.split(/\s+/);

      // Подсказка состоит только из одного слова
      const isValidTip = words.length === 1;

      // Указано хотя бы одно слово, но не более, чем количество не открытых
      const isValidCount = this.count > 0 && this.count <= this.countOfNotOpenedWords;

      if (!isValidTip) {
        this.tipInput!.setCustomValidity('Подсказка должна состоять из одного слова');
      }

      if (!isValidCount) {
        this.countInput!.setCustomValidity(
          'Должно быть указано хотя бы одно слово, но не более, чем количество не открытых'
        );
      }

      this.tipInput!.reportValidity();
      this.countInput!.reportValidity();

      return isValidTip && isValidCount;
    },
  },

  watch: {
    tip() {
      this.tipInput!.setCustomValidity('');
      this.tipInput!.reportValidity();
    },
    count() {
      this.countInput!.setCustomValidity('');
      this.countInput!.reportValidity();
    },
  },
});
