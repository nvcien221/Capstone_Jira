import { createSlice } from "@reduxjs/toolkit";

type TState = {
  visible: boolean;
  projectValue: any;
};

const initialState: TState = {
  visible: false,
  projectValue: null,
};

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    openDrawer: (state,action) => {
      state.visible = true;
      state.projectValue=action.payload;
    },
    closeDrawer: (state) => {
      state.visible = false;
    },

  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
