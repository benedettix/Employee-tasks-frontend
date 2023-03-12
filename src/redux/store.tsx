import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./features/employeesSlice";
import taskSlice from "./features/taskSlice";

export const store = configureStore({
  reducer: {
    employee: employeesSlice,
    task: taskSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
