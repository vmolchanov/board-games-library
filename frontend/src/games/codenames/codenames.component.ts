import {defineComponent} from 'vue';
import TipForm from './components/tip-form/tip-form.vue';
import WordList from './components/word-list/word-list.vue';
import {WebsocketService} from '../../config/websocket-service/websocket-service';
import type {ICodenamesState, IFieldState, ITipFormSubmit} from './codenames';

export default defineComponent({
  name: 'codenames-game',
  components: {
    TipForm,
    WordList,
  },
  created() {
    this.ws.on('initGame', (data: ICodenamesState) => {
      this.state = data;
      if (!this.isFieldShown) {
        this.ws.emit('JOIN_ROOM', {room: data.sessionId}, () => {
          this.isFieldShown = true;
        });
      }
    });

    this.ws.on('updateState', (data: Omit<ICodenamesState, 'currentPlayer'>) => {
      this.state!.fieldState = data.fieldState;
      this.state!.move = data.move;
      this.state!.sessionId = data.sessionId;
      this.state!.tip = data.tip;
    });
  },
  data() {
    return {
      ws: WebsocketService.connect('ws://localhost:7001', {
        transports: ['websocket', 'polling'],
      }),
      state: null as ICodenamesState | null,
      isFieldShown: false,
    };
  },
  computed: {
    getSortedFieldStateByPosition() {
      return this.state!
        .fieldState
        .slice()
        .sort((a: IFieldState, b: IFieldState) => a.position - b.position)
    },

    getCaptainRole(): string {
      const [color] = (this.state!.currentPlayer.role as string).split('_');
      return `${color}_CAPTAIN`;
    },

    isMeCaptain(): boolean {
      const [color, post] = (this.state?.currentPlayer.role as string).split('_');
      return post === 'CAPTAIN';
    },

    getCountOfNotOpenedWords(): number {
      return this.state!
        .fieldState
        .filter(({state}) => state === 'NOT_OPENED')
        .length;
    },

    getAgentRoleOfAllies(): string {
      const [color, post] = (this.state!.currentPlayer.role as string).split('_');
      return `${color}_AGENT`;
    },

    isMoveOfMe(): boolean {
      return this.state!.move === this.state!.currentPlayer.role;
    },

    isMoveOfCaptain(): boolean {
      return this.state!.move === this.getCaptainRole;
    },

    isMoveOfMyTeam(): boolean {
      return this.isMeCaptain && this.state!.move === this.getAgentRoleOfAllies;
    },
  },
  methods: {
    getWordClasses(state: string): string[] {
      const classes = ['card'];

      switch (state) {
        case 'RED_AGENT':
          classes.push('red');
          break;
        case 'BLUE_AGENT':
          classes.push('blue');
          break;
        case 'NEUTRAL':
          classes.push('neutral');
          break;
        case 'KILLER':
          classes.push('killer');
          break;
      }

      return classes;
    },

    onWordClick(word): void {
      if (!this.isMeCaptain && this.state?.currentPlayer.role === this.state.move) {
        const {id, value} = word;
        this.ws!.emit('MAKE_MOVE', {
          word: {id, value},
        });
      }
    },

    onTipFormSubmit(obj: ITipFormSubmit): void {
      if (this.isMeCaptain && 'tip' in obj && 'count' in obj) {
        this.ws.emit('MAKE_TIP', {
          tip: `${obj.tip}, ${obj.count}`,
        });
      }
    },
  },
});
