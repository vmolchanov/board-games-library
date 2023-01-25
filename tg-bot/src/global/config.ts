import {config} from 'dotenv';
import {resolve} from 'path';

export const useConfig: () => void = () => {
  config({
    path: resolve(__dirname, `../../.${process.env.NODE_ENV}.env`),
  });
};
