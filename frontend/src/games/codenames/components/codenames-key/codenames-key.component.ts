import {defineComponent} from 'vue';

export default defineComponent({
  name: 'codenames-key',
  props: {
    encodedKey: {
      type: String,
      required: true,
    },
  },

  created() {
    console.log('key', this.encodedKey)
  },
  computed: {
    getCells(): string[] {
      return this.encodedKey
        .slice(2)
        .split(',')
        .flatMap((ch: string) => ch.split(''));
    },

    getMainClasses(): string[] {
      const classes = ['codenames-key'];
      const firstMove = this.encodedKey[0];

      const firstMoveClass = {
        R: 'red',
        B: 'blue',
      };

      if (firstMove in firstMoveClass) {
        classes.push(firstMoveClass[firstMove]);
      }

      return classes;
    },
  },
  methods: {
    getClassesByCellCharacter(character: string) {
      const classes = ['codenames-key__cell'];
      const cellClass = {
        K: 'killer',
        N: 'neutral',
        R: 'red',
        B: 'blue',
      };

      if (character in cellClass) {
        classes.push(cellClass[character]);
      }

      return classes;
    }
  },
});
