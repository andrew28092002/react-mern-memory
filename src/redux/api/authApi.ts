import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserFromClient, TUserData } from "../../types/user";

const baseUrl: string = "https://express-js-mern-memory-production.up.railway.app/user";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    authProfile: builder.mutation<TUserData, IUserFromClient>({
      query: (payload) => ({
        url: "/signin",
        method: "POST",
        body: payload,
      }),
    }),
    registrationProfile: builder.mutation<TUserData, IUserFromClient>({
      query: (payload) => ({
        url: "/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAuthProfileMutation, useRegistrationProfileMutation } =
  authApi;
