import {WordDto} from '../../children/word/word.dto';
import type {TWordState} from '../../codenames';

export class FieldStateDto {
  readonly word: WordDto;

  readonly state: TWordState;

  readonly position: number;
}
