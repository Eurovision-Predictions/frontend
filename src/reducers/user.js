import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { base, countries } from "./common";

export const createGroup = createAsyncThunk(
  'groups/create',
  async (user_key, thunkAPI) => {
    return fetch(`${base}/group`, {
      method: 'POST',
      body: JSON.stringify({
        user_key
      })
    }).then(res => res.json())
  }
)

export const joinGroup = createAsyncThunk(
  'groups/join',
  async ({ user_key, group_key }, thunkAPI) => {
    return fetch(`${base}/group/${group_key}`, {
      method: 'POST',
      body: JSON.stringify({
        user_key
      })
    }).then(res => res.json())
  }
)

export const savePredictions = createAsyncThunk(
  'user/savePredictions',
  async ({ key, items }, thunkAPI) => {
    return fetch(`${base}/vote/${key}`, {
      method: 'POST',
      body: JSON.stringify({ items })
    }).then(res => res.json())
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "",
    isAuthenticated: false,
    predictions: countries,
    groups: [],
  },
  reducers: {
    setUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    updatePredictions: (state, action) => ({
      ...state,
      predictions: action.payload,
    }),
    newGroup: (state, action) => ({
      ...state,
      groups: [...state.groups, action.payload],
    }),
    setGroups: (state, action) => ({
      ...state,
      groups: action.payload,
    })
  },
  extraReducers: (builder) => {
    builder.addCase(savePredictions.fulfilled, (state, action) => {
      return {...state, predictions: action.payload.items }
    })

    builder.addCase(createGroup.fulfilled, (state, action) => {
      return {...state, groups: [...state.groups, action.payload]}
    })

    builder.addCase(joinGroup.fulfilled, (state, action) => {
      const { key } = action.payload;
      return {...state, groups: [...state.groups.filter(d => d.key !== key), action.payload]}
    })
  }
});

export const { setUser, updatePredictions, newGroup, setGroups } = userSlice.actions;
export default userSlice.reducer;
