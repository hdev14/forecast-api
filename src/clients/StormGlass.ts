import { AxiosStatic } from 'axios'

import ClientRequestError from '../errors/ClientRequestError'

export type ForecastPoint = {
  noaa: number;
}

export type ForecastHour = {
  readonly time: string;
  readonly swellDirection: ForecastPoint;
  readonly swellHeight: ForecastPoint;
  readonly swellPeriod: ForecastPoint;
  readonly waveDirection: ForecastPoint;
  readonly waveHeight: ForecastPoint,
  readonly windDirection: ForecastPoint;
  readonly windSpeed: ForecastPoint;
}

export type ForecastResponse = {
  hours: ForecastHour[];
}

export type ForecastHourNormalized = {
  time: string,
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  waveDirection: number;
  waveHeight: number;
  windDirection: number;
  windSpeed: number;
}

export default class StormGlass {
  private readonly BASE_URL = 'https://api.stormglass.io/v2/weather/point?'
  private readonly API_PARAMS =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'

  constructor (private clientRequest: AxiosStatic) {}

  public async fetchPoints (lat: number, lng: number): Promise<ForecastHourNormalized[]> {
    try {
      const response = await this.clientRequest.get<ForecastResponse>(
        `${this.BASE_URL}params=${this.API_PARAMS}&source=noaa&end=1592113802&lat=${lat}&lng=${lng}`,
        {
          headers: {
            Authorization: 'fake-token'
          }
        }
      )

      return this.normalizedResponse(response.data)
    } catch (err) {
      throw new ClientRequestError(err.message)
    }
  }

  private normalizedResponse (forecastResponse: ForecastResponse): ForecastHourNormalized[] {
    const filtedHours = forecastResponse.hours.filter(this.isValidHour.bind(this))
    const hoursNormalized = filtedHours.map(hour => ({
      time: hour.time,
      swellDirection: hour.swellDirection.noaa,
      swellHeight: hour.swellHeight.noaa,
      swellPeriod: hour.swellPeriod.noaa,
      waveDirection: hour.waveDirection.noaa,
      waveHeight: hour.waveHeight.noaa,
      windDirection: hour.windDirection.noaa,
      windSpeed: hour.windSpeed.noaa
    }))

    return hoursNormalized
  }

  private isValidHour (hour: Partial<ForecastHour>): boolean {
    return !!(
      hour.time &&
      hour.swellDirection?.noaa &&
      hour.swellHeight?.noaa &&
      hour.swellPeriod?.noaa &&
      hour.waveDirection?.noaa &&
      hour.waveHeight?.noaa &&
      hour.windDirection?.noaa &&
      hour.windSpeed?.noaa
    )
  }
}
