export enum EServerCommand {
  ERROR_JOIN_ROOM = 'ERROR_JOIN_ROOM',
  INIT_GAME = 'initGame',
  GAME_OVER = 'gameOver',
  UNAUTHORIZED = 'unauthorized',
  UPDATE_STATE = 'updateState',
}

export enum EClientCommand {
  JOIN_ROOM = 'JOIN_ROOM',
  MAKE_MOVE = 'MAKE_MOVE',
  MAKE_TIP = 'MAKE_TIP',
  GET_KEY = 'GET_KEY',
}
