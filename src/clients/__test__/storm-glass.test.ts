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
})
