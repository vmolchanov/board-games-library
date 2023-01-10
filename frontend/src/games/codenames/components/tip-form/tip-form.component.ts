import {defineComponent} from 'vue';

export default defineComponent({
  name: 'tip-form',
  props: {
    countOfNotOpenedWords: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tip: '',
      count: 0,
    };
  },
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
        this.$refs.tipInputRef.setCustomValidity('Подсказка должна состоять из одного слова');
      }

      if (!isValidCount) {
        this.$refs.countInputRef.setCustomValidity(
          'Должно быть указано хотя бы одно слово, но не более, чем количество не открытых'
        );
      }

      this.$refs.tipInputRef.reportValidity();
      this.$refs.countInputRef.reportValidity();

      return isValidTip && isValidCount;
    },
  },

  watch: {
    tip() {
      this.$refs.tipInputRef.setCustomValidity('');
      this.$refs.tipInputRef.reportValidity();
    },
    count() {
      this.$refs.countInputRef.setCustomValidity('');
      this.$refs.countInputRef.reportValidity();
    },
  },
});
