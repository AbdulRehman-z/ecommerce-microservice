import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export interface currentuserResponse {
  currentUser: null | {
    id: string;
    email: string;
  };
}

const ingressNginxApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://ingress-nginx-controller.ingress-nginx-controller.svc.cluster.local",
    headers: {
      HOST: "ticketing.dev",
    },
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
