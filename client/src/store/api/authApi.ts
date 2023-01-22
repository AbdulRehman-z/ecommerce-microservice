import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  email: string;
  id: string;
}

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
    baseUrl: "https://tickting.dev/auth",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponse, SignUpRequest>({
      query: (body) => ({
        method: "POST",
        url: "/sign-up",
        body: {
          email: body.email,
          password: body.password,
        },
      }),
    }),
  }),
});

export { authApi };
export const { useSignUpMutation } = authApi;
