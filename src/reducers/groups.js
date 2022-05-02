import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchGroupsForUser } from '../api/groups';
import { base } from "./common";

export const fetchUserGroups = createAsyncThunk(
  'groups/fetchUserGroups',
  async (user_key, thunkAPI) => {
    return await fetchGroupsForUser(user_key);
  }
)

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

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [],
  reducers: {
    newGroup: (state, action) => [...state, action.payload],
    setGroups: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserGroups.fulfilled, (state, action) => {
      return action.payload
    })

    builder.addCase(createGroup.fulfilled, (state, action) => {
      return [...state, action.payload]
    })
  }
});

export const { newGroup, setGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
