import { AxiosStatic } from 'axios'

export default class StormGlass {
  private readonly BASE_URL = 'https://api.stormglass.io/v2/weather/point?';
  private readonly API_PARAMS =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';

  constructor (private clientRequest: AxiosStatic) {}

  public async fetchPoints (lat: number, lng: number): Promise<{}> {
    return this.clientRequest.get(
      `${this.BASE_URL}params=${this.API_PARAMS}&source=noaa&end=1592113802&lat=${lat}&lng=${lng}`
    )
  }
}
