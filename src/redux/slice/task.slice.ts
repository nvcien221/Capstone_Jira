import { createSlice } from "@reduxjs/toolkit";

type TState = {
    taskTypeArr:any;
    taskStatusArr:any;
    taskPriorityArr:any;
    userArr:any;
    listUser:any;
};

const initialState:TState = {
    taskTypeArr:"",
    taskStatusArr:"",
    taskPriorityArr:"",
    userArr:"",
    listUser:"",
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    
  },
});

export const {  } = taskSlice.actions;

export default taskSlice.reducer;