export interface GetTokenResponseInterface {
  token: string,
  refreshToken: string
}

export interface RefreshTokenRequestInterface {
  refreshToken: string
}

export interface RefreshTokenResponseInterface {
  token: string,
  refreshToken: string
}
