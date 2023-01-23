import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <Script
                data-domain="whatisthepoint.xyz"
                src="https://plausible.io/js/script.js"
            />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
