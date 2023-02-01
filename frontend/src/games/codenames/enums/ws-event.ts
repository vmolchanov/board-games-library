export enum EWsServerEvent {
  INIT_GAME = 'initGame',
  UPDATE_STATE = 'updateState',
  GAME_OVER = 'gameOver',
}

export enum EWsClientEvent {
  MAKE_TIP = 'MAKE_TIP',
  MAKE_MOVE = 'MAKE_MOVE',
  JOIN_ROOM = 'JOIN_ROOM',
  GET_KEY = 'GET_KEY',
}
