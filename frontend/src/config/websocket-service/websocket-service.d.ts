import type {ManagerOptions} from 'socket.io-client/build/esm/manager';
import type {SocketOptions} from 'socket.io-client/build/esm/socket';

export type TWebSocketOptions = Partial<ManagerOptions & SocketOptions>;

export type TWebSocketUrl = string | TWebSocketOptions;
