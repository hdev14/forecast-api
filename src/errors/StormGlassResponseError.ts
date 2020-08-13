import AppError from './AppError'

export default class StormGlassResponseError extends AppError {
  constructor (message: string, code: number) {
    super(
      `Unexpected error when trying to communicate to StormGlass: ${message} | ${code}`,
      code
    )
  }
}
