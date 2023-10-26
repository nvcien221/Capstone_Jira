import { createSlice } from "@reduxjs/toolkit";

type TState = {
  listProject: any[];
  projectCategoryArr: any[];
  projectDetail: any;
};

const initialState: TState = {
  listProject: [],
  projectCategoryArr: [],
  projectDetail: "",
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setListProject: (state, action) => {
      state.listProject = action.payload;
    },
    setprojectCategoryArr: (state, action) => {
      state.projectCategoryArr = action.payload;
    },
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload;
    },
  },
  
});

export const { setListProject, setprojectCategoryArr, setProjectDetail } =
  projectSlice.actions;

export default projectSlice.reducer;
