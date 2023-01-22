import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "@mui/system/ThemeProvider";
import { Provider } from "react-redux";
import { theme } from "theme";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
