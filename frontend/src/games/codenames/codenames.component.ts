import {defineComponent} from 'vue';
import TipForm from './components/tip-form/tip-form.vue';
import WordList from './components/word-list/word-list.vue';
// import io, {Socket} from 'socket.io-client';
import {WebsocketService} from '../../config/websocket-service/websocket-service';

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

export default defineComponent({
  name: 'codenames-game',
  components: {
    TipForm,
    WordList,
  },
  created() {
    this.ws.on('initGame', (data: object) => {
      console.log('initGame', data)
    });
  },
  data() {
    return {
      ws: WebsocketService.connect('ws://localhost:7001', {
        transports: ['websocket', 'polling'],
      }),
      words: [
        {value: 'Чаша', state: EWordStatus.NOT_OPENED},
        {value: 'Мешок', state: EWordStatus.NOT_OPENED},
        {value: 'Олень', state: EWordStatus.NOT_OPENED},
        {value: 'Пила', state: EWordStatus.NOT_OPENED},
        {value: 'Сестра', state: EWordStatus.NOT_OPENED},
        {value: 'Пещера', state: EWordStatus.NOT_OPENED},
        {value: 'Директор', state: EWordStatus.NOT_OPENED},
        {value: 'Муравей', state: EWordStatus.NOT_OPENED},
        {value: 'Фиалка', state: EWordStatus.NOT_OPENED},
        {value: 'Рис', state: EWordStatus.NOT_OPENED},
        {value: 'Сани', state: EWordStatus.NOT_OPENED},
        {value: 'Вулкан', state: EWordStatus.NOT_OPENED},
        {value: 'Чернила', state: EWordStatus.NOT_OPENED},
        {value: 'Беспорядок', state: EWordStatus.NOT_OPENED},
        {value: 'Космонавт', state: EWordStatus.NOT_OPENED},
        {value: 'Сказка', state: EWordStatus.NOT_OPENED},
        {value: 'Заросли', state: EWordStatus.NOT_OPENED},
        {value: 'Зелень', state: EWordStatus.NOT_OPENED},
        {value: 'Гимн', state: EWordStatus.NOT_OPENED},
        {value: 'Губка', state: EWordStatus.NOT_OPENED},
        {value: 'Чаща', state: EWordStatus.NOT_OPENED},
        {value: 'Почва', state: EWordStatus.NOT_OPENED},
        {value: 'Брат', state: EWordStatus.NOT_OPENED},
        {value: 'Колдун', state: EWordStatus.NOT_OPENED},
        {value: 'Шланг', state: EWordStatus.NOT_OPENED},
      ] as IWord[],
    };
  },
  computed: {
    getWords() {},
  },
  methods: {
    onWordClick(word) {
      this.ws!.emit('test', word, (answer) => {
        console.log('answer', answer);
      });
    },
  },
});
