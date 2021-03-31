export class AuthenticationMockup {
  static getToken = {
    success: {
      token: Math.random().toString(),
      refreshToken: Math.random().toString(),
    },
    error: null,
  }

  static refreshToken = {
    success: {
      token: Math.random().toString(),
      refreshToken: Math.random().toString(),
    },
    error: null,
  }


}
