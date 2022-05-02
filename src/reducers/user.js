import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { base, countries } from "./common";

export const savePredictions = createAsyncThunk(
  'user/savePredictions',
  async ({ key, items }, thunkAPI) => {
    return fetch(`${base}/vote/${key}`, {
      method: 'POST',
      body: JSON.stringify({ items })
    }).then(res => res.json())
    .then(res => {
      const { predictions } = res;
      console.log(predictions);
      if (predictions.length === 0) {
        return {
          ...res,
          predictions: countries
        }
      } else {
        return res
      }
    })
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "",
    isAuthenticated: false,
    predictions: countries,
  },
  reducers: {
    setUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    updatePredictions: (state, action) => ({
      ...state,
      predictions: action.payload,
    })
  },
  extraReducers: (builder) => {
    builder.addCase(savePredictions.fulfilled, (state, action) => {
      return {...state, predictions: action.payload.items }
    })
  }
});

export const { setUser, updatePredictions } = userSlice.actions;
export default userSlice.reducer;
