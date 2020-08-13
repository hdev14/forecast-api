import AppError from './AppError'

export default class ClientRequestError extends AppError {
  constructor (message: string) {
    super(
      `Unexpected error when trying to communicate to StormGlass: ${message}`
    )
  }
}
