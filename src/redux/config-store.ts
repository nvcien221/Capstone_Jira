import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import projectSlice from "./slice/project.slice";
import userSlice from "./slice/user.slice";
import drawerSlice from "./slice/drawer.slice";
import taskSlice from "./slice/task.slice";

// configureStore => redux-devtool
export const store = configureStore({
  reducer: {projectSlice,userSlice,drawerSlice,taskSlice}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
