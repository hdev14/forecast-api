import axios from 'axios'

import StormGlass from '../StormGlass'
import stormGlassWeather3HoursFixture from '../../../test/fixtures/stormglass-weather-3-hours.json'
import stormGlassNormalized3HoursFixture from '../../../test/fixtures/stormglass-normalized-3-hours.json'

jest.mock('axios')

describe('StormGlass Client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  it('should return the normalized forecast from the StormGlass client', async () => {
    const lat = -33.792726
    const lng = 151.289824

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HoursFixture })

    const stormGlass = new StormGlass(mockedAxios)
    const response = await stormGlass.fetchPoints(lat, lng)
    expect(response).toEqual(stormGlassNormalized3HoursFixture)
  })

  it('should exclude incomplete data points', async () => {
    const lat = -33.792726
    const lng = 151.289824
    const incompleteResponse = {
      hours: [
        {
          swellDirection: {
            noaa: 64.26
          },
          time: '2020-04-26T00:00:00+00:00'
        }
      ]
    }

    mockedAxios.get.mockResolvedValue({ data: incompleteResponse })
    const stormGlass = new StormGlass(mockedAxios)
    const response = await stormGlass.fetchPoints(lat, lng)

    expect(response).toEqual([])
  })

  it('should return a generic error from StormGlass when the request fail before reaching the API', async () => {
    const lat = -33.792726
    const lng = 151.289824

    mockedAxios.get.mockRejectedValue({ message: 'Network Error' })
    const stormGlass = new StormGlass(mockedAxios)

    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network Error'
    )
  })

  it('should throw an error when reach the rate limit of request per hour', async () => {
    const lat = -33.792726
    const lng = 151.289824
    const responseErrorRateLimitReached = {
      reponse: {
        status: 429,
        data: { errors: ['Rate Limit reached'] }
      }
    }

    mockedAxios.get.mockRejectedValue(responseErrorRateLimitReached)
    const stormGlass = new StormGlass(mockedAxios)

    await expect(stormGlass.fetchPoints).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Rate Limit reached | 429'
    )
  })
})
