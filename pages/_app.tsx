import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <PlausibleProvider domain="whatispoint.xyz">
                    <Component {...pageProps} />
                </PlausibleProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
