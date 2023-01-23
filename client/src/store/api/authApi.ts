import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// interface User {
//   email: string;
//   id: string;
// }

// export interface UserResponse {
//   email: string;
//   id: string;
// }

export interface SignUpRequest {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ticketing.dev/api/users",
  }),
  // tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/signup",
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
