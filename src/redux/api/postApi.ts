import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  TPostDataFromDB,
  TPostFromDB,
  TPostFromClient,
  TUpdatePostMutation,
  TMessageFromServer,
} from "../../types/post";
import { RootState } from "../store/store";
import { setCredentials, logout } from "../store/slice/tokenSlice";
import { TSearchState } from "../store/slice/searchSlice";

const baseUrl = "https://express-js-mern-memory-production.up.railway.app";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).token.token;
    headers.set("Acces-Control-Allow-Headers", "*");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/user/refresh", api, extraOptions);
    if (refreshResult.data) {
      const user = (api.getState() as RootState).token.user;

      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout(""));
    }
  }
  return result;
};

type TGetOnePost = {
  post: TPostFromDB;
};

type TCommentPost = {
  id: number,
  comment: string,
}

type TResCommentPost = {
  post: TPostFromDB
}

export const postApi = createApi({
  reducerPath: "post",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<TPostDataFromDB, TSearchState>({
      query: (payload) => {
        if (payload) {
          return {
            url: `/posts?searchQuery=${payload?.search || "none"}&tags=${
              payload?.tags
            }&page=${payload?.currentPage}`,
          };
        } else {
          return {
            url: "/posts",
          };
        }
      },
      providesTags: ["Post"],
    }),
    getOnePost: builder.query<TGetOnePost, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
    createPost: builder.mutation<TPostFromDB, TPostFromClient>({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<TPostFromDB, TUpdatePostMutation>({
      query: (payload) => ({
        url: "/posts/" + payload.id,
        method: "PATCH",
        body: payload.updatedFields,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<TMessageFromServer, number>({
      query: (id) => ({
        url: "/posts/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation<TMessageFromServer, number>({
      query: (id) => ({
        url: `/posts/${id}/likePost`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),
    commentPost: builder.mutation<TPostFromDB, TCommentPost>({
      query: ({ id, comment }) => ({
        url: `/posts/${id}/commentPost`,
        method: "PUT",
        body: { comment },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetOnePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useCommentPostMutation
} = postApi;
