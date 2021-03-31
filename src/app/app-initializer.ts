import { AuthenticationService } from './services/authentication.service'

export const appInitializer = (auth: AuthenticationService) => () => {
  return new Promise((resolve) => {
    auth.refreshToken().subscribe().add(resolve)
  })
}
