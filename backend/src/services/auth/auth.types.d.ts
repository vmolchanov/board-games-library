export type TAccessToken = string;

export type TRefreshToken = string;

export type TLoginToken = string;

export interface ITokensPair {
  accessToken: TAccessToken;
  refreshToken: TRefreshToken;
}
