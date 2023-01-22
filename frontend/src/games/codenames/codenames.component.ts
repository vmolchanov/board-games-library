import {defineComponent} from 'vue';

import type {ICodenamesState, IFieldState, ITipFormSubmit} from './codenames';

import {WebsocketService} from '../../config/websocket-service/websocket-service';
import {EWsClientEvent, EWsServerEvent, EState} from './enums';

import CodenamesKey from './components/codenames-key/codenames-key.vue';
import CodenamesTitle from './components/codenames-title/codenames-title.vue';
import TipForm from './components/tip-form/tip-form.vue';
import WordList from './components/word-list/word-list.vue';

export default defineComponent({
  name: 'codenames-game',
  components: {
    CodenamesKey,
    CodenamesTitle,
    TipForm,
    WordList,
  },
  created() {
    this.ws.on(EWsServerEvent.INIT_GAME, (data: ICodenamesState) => {
      this.state = data;
      if (!this.isFieldShown) {
        this.ws.emit(EWsClientEvent.JOIN_ROOM, {room: data.sessionId}, () => {
          this.isFieldShown = true;

          if (this.isMeCaptain) {
            this.ws.emit(EWsClientEvent.GET_KEY, (key: string) => {
              this.key = key;
            });
          }
        });
      }
    });

    this.ws.on(EWsServerEvent.UPDATE_STATE, (data: Omit<ICodenamesState, 'currentPlayer'>) => {
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
      isKeyShown: false,
      key: '',
    };
  },
  computed: {
    getSortedFieldStateByPosition() {
      return this.state!
        .fieldState
        .slice()
        .sort((a: IFieldState, b: IFieldState) => a.position - b.position)
    },

    isMeCaptain(): boolean {
      const [color, post] = (this.state?.currentPlayer.role as string).split('_');
      return post === 'CAPTAIN';
    },

    getCountOfNotOpenedWords(): number {
      return this.state!
        .fieldState
        .filter(({state}) => state === EState.NOT_OPENED)
        .length;
    },

    isShowTipForm() {
      return this.state!.move === this.state!.currentPlayer.role && this.isMeCaptain;
    },
  },
  methods: {
    getWordClasses(state: string): string[] {
      const classes = ['card'];
      const classByState = {
        [EState.RED_AGENT]: 'red',
        [EState.BLUE_AGENT]: 'blue',
        [EState.NEUTRAL]: 'neutral',
        [EState.KILLER]: 'killer',
      };

      if (state in classByState) {
        classes.push(classByState[state]);
      }

      return classes;
    },

    onWordClick(word): void {
      if (!this.isMeCaptain && this.state?.currentPlayer.role === this.state!.move) {
        const {id, value} = word;
        this.ws!.emit(EWsClientEvent.MAKE_MOVE, {
          word: {id, value},
        });
      }
    },

    onTipFormSubmit(obj: ITipFormSubmit): void {
      if (this.isMeCaptain && 'tip' in obj && 'count' in obj) {
        this.ws.emit(EWsClientEvent.MAKE_TIP, {
          tip: `${obj.tip}, ${obj.count}`,
        });
      }
    },

    onKeyButtonClick(): void {
      this.isKeyShown = !this.isKeyShown;
    }
  },
});
