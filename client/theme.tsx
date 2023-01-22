import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    grey: {
      50: "#f0f0f0", // manually adjusted
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
    },
  },
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

// export interface User {
//   first_name: string;
//   last_name: string;
// }

// export interface UserResponse {
//   user: User;
//   token: string;
// }

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "/",
//     prepareHeaders: (headers, { getState }) => {
//       // By default, if we have a token in the store, let's use that for authenticated requests
//       const token = (getState() as RootState).auth.token;
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<UserResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: "login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     protected: builder.mutation<{ message: string }, void>({
//       query: () => "protected",
//     }),
//   }),
// });

// export const { useLoginMutation, useProtectedMutation } = api;
