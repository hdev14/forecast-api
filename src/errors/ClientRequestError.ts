import InternalError from './InternalError'

export default class ClientRequestError extends InternalError {
  constructor (message: string) {
    super(
      `Unexpected error when trying to communicate to StormGlass: ${message}`
    )
  }
}
