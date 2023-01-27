import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./api/authApi";
import { ingressNginxApi } from "./api/ingress-nginxApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [ingressNginxApi.reducerPath]: ingressNginxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authApi.middleware)
      .concat(ingressNginxApi.middleware),
});

setupListeners(store.dispatch);

export { store };
export { useSignUpMutation } from "./api/authApi";
export { useIngressCurrentUserQuery } from "./api/ingress-nginxApi";
export { useGetCurrentUserQuery } from "./api/authApi";
