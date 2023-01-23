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
                <>
                    <Script
                        data-domain="whatisthepoint.xyz"
                        src="https://plausible.io/js/script.js"
                    />

                    <Component {...pageProps} />
                </>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
