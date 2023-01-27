import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { HYDRATE } from "next-redux-wrapper";

export interface currentuserResponse {
  currentUser: null | {
    id: string;
    email: string;
  };
}

const ingressNginxApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
  }),
  endpoints: (builder) => ({
    ingressCurrentUser: builder.query<currentuserResponse, void>({
      query: () => ({
        method: "GET",
        url: "/api/users/currentuser",
      }),
    }),
  }),
});

export { ingressNginxApi };
export const { useIngressCurrentUserQuery } = ingressNginxApi;
