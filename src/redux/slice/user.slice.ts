import { createSlice } from "@reduxjs/toolkit";

type TState = {
    listUserSearch: any[];
};

const initialState:TState = {
  listUserSearch: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setListUserSearch:(state, action)=>{
      state.listUserSearch = action.payload;
    }
  },
});

export const { setListUserSearch } = userSlice.actions;

export default userSlice.reducer;