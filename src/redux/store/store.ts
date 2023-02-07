import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postApi } from "../api/postApi";
import { authApi } from "../api/authApi";
import { tokenReducer } from "./slice/tokenSlice";
import { updatingPostReducer } from "./slice/updatingPostSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { searchReducer } from "./slice/searchSlice";

const rootReducer = combineReducers({
    [postApi.reducerPath]: postApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    token: tokenReducer,
    updatingPost: updatingPostReducer,
    search: searchReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([postApi.middleware, authApi.middleware])
})

export type RootState = ReturnType<typeof rootReducer>
export const useTypedDispatch: () => typeof store.dispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector