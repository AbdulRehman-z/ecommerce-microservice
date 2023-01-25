import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import currentuserResponse from "./ingress-nginxApi";
// interface User {
//   email: string;
//   id: string;
// }

export interface UserResponse {
  email: string;
  id: string;
}

export interface SignUpRequest {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ticketing.dev/api/users",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/signup",
        body,
      }),
    }),
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        method: "GET",
        url: "/currentuser",
      }),
    }),
  }),
});

export { authApi };
export const { useSignUpMutation } = authApi;
export const { useGetCurrentUserQuery } = authApi;
