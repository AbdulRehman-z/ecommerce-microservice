import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "@mui/system/ThemeProvider";
import { theme } from "theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
