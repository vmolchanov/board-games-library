import {defineComponent, PropType} from 'vue';
import {ERole} from '../../enums';

export default defineComponent({
  name: 'codenames-title',
  props: {
    role: {
      type: String as PropType<ERole>,
      required: true,
    },
    move: {
      type: String as PropType<ERole>,
      required: true,
    },
  },
  computed: {
    getAgentRoleOfAllies(): string {
      const [color, post] = (this.role as string).split('_');
      return `${color}_AGENT`;
    },

    getCaptainRole(): string {
      const [color] = (this.role as string).split('_');
      return `${color}_CAPTAIN`;
    },

    isMoveOfMe(): boolean {
      return this.move === this.role;
    },

    isMoveOfCaptain(): boolean {
      return this.move === this.getCaptainRole;
    },

    isMoveOfMyTeam(): boolean {
      return this.isMeCaptain && this.move === this.getAgentRoleOfAllies;
    },

    isMeCaptain(): boolean {
      const [color, post] = (this.role as string).split('_');
      return post === 'CAPTAIN';
    },
  },
});
