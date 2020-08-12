import express from 'express'
import { Server } from '@overnightjs/core'

export class SetupServer extends Server {
  constructor (private port = 4000) {
    super()
  }

  public init (): void {
    this.setupExpress()
  }

  private setupExpress (): void {
    this.app.use(express.json())
  }
}
