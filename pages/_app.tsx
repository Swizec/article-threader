import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
