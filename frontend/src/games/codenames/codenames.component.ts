import {defineComponent} from 'vue';
import TipForm from './components/tip-form/tip-form.vue';
import WordList from './components/word-list/word-list.vue';
import {WebsocketService} from '../../config/websocket-service/websocket-service';
import {ICodenamesState} from './codenames';

enum EWordStatus {
  NOT_OPENED,
  BLUE,
  RED,
  NEUTRAL,
  KILLER,
}

interface IWord {
  value: string;
  state: EWordStatus;
}

interface ITipFormSubmit {
  tip: string;
  count: number;
}

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
    getCaptainRole() {
      const [color] = this.state!.currentPlayer.role.split('_');
      return `${color}_CAPTAIN`;
    },
    isMeCaptain() {
      const [color, post] = this.state?.currentPlayer.role.split('_');
      return post === 'CAPTAIN';
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

    onWordClick(word) {
      if (!this.isMeCaptain && this.state?.currentPlayer.role === this.state.move) {
        const {id, value} = word;
        this.ws!.emit('MAKE_MOVE', {
          word: {id, value},
        });
      }
    },

    onTipFormSubmit(obj: ITipFormSubmit) {
      if (this.isMeCaptain && 'tip' in obj && 'count' in obj) {
        this.ws.emit('MAKE_TIP', {
          tip: `${obj.tip}, ${obj.count}`,
        });
      }
    },
  },
});
