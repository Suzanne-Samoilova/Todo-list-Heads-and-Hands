import { TRootState } from "../index";

export const selectorTodoState = (state: TRootState) => state.todo;
export const selectorDetailState = (state: TRootState) => state.detail;
export const selectorProfileState = (state: TRootState) => state.profile;
export const selectorAuthState = (state: TRootState) => state.auth;
