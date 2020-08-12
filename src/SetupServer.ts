import express from 'express'
import { Server } from '@overnightjs/core'
import { ForecastController } from './controllers/ForecastController'

export default class SetupServer extends Server {
  constructor (private port = 4000) {
    super()
  }

  public init (): void {
    this.setupExpress()
    this.setupControllers()
  }

  private setupExpress (): void {
    this.app.use(express.json())
  }

  private setupControllers (): void {
    const forecastController = new ForecastController()
    this.addControllers([forecastController])
  }
}
