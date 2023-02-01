import {defineComponent, PropType} from 'vue';
import {ERole} from '../../enums';

export default defineComponent({
  name: 'codenames-game-over-popup',
  props: {
    role: {
      type: String as PropType<ERole>,
      required: true,
    },
  },
  computed: {
    getWinner(): string {
      const winner = {
        [ERole.RED_AGENT]: 'красные',
        [ERole.BLUE_AGENT]: 'синие',
      };
      return winner[this.role];
    },
  },
});
