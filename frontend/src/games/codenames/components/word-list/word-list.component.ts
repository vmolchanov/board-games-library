import {PropType, defineComponent} from 'vue';
import {ISessionWord} from '../../../../types';

export default defineComponent({
  name: 'word-list',
  props: {
    sessionWords: {
      type: Array as PropType<ISessionWord[]>,
      required: true,
    },
  },
  methods: {
    onWordClick(obj: ISessionWord) {
      return () => {
        this.$emit('click', obj);
      };
    },
  },
});
