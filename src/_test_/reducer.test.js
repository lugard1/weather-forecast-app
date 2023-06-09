import configureMockStore from 'redux-mock-store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const weatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherApiKey = '526b922a2c7a5abf7089c96e64ce008a';

const fetchData = createAsyncThunk('countries/fetch-data', async () => {
  const response = await fetch('https://restcountries.com/v3.1/region/africa');
  const result = await response.json();
  const len = result.length;
  return len;
});

const fetchWeatherData = createAsyncThunk(
  'weather/fetch-weather',
  async () => {
    const response = await fetch(`${weatherApiBaseUrl}?lat=24&lon=90&appid=${weatherApiKey}&units=metric`);
    const result = await response.json();
    let isWeatherFetched = false;
    if (result.name) {
      isWeatherFetched = true;
    }
    return isWeatherFetched;
  },
);

const initialState = {
  countries: 0,
  isWeatherFetched: false,
};

const countriesSlice = createSlice({
  name: 'countryslice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const updatedState = {
        ...state,
        countries: action.payload,
      };
      return updatedState;
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      const updatedState = {
        ...state,
        countries: action.payload,
      };
      return updatedState;
    });
  },
});

const mockStore = configureMockStore([thunk]);

describe('test result async action', () => {
  it('creates FETCH_DATA_SUCCESS when fetching data has beem done', () => {
    const store = mockStore({ country: countriesSlice.reducer });

    const expectedActions = [
      {
        type: fetchData.pending.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
          arg: undefined,
        },
        payload: undefined,
      },
      {
        type: fetchData.fulfilled.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
          arg: undefined,
        },
        payload: 59,
      },
    ];
    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_DATA_SUCCESS when fetching data has been done', () => {
    const store = mockStore({ country: countriesSlice.reducer });

    const expectedActions = [
      {
        type: fetchWeatherData.pending.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
          arg: undefined,
        },
        payload: undefined,
      },
      {
        type: fetchWeatherData.fulfilled.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
          arg: undefined,
        },
        payload: true,
      },
    ];
    return store.dispatch(fetchWeatherData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
