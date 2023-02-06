import Head from "next/head";
import { Box, Container, Flex, Link } from "theme-ui";
import { KeyInsight } from "../components/KeyInsight";

export default function Home() {
    return (
        <>
            <Head>
                <title>WhatIsThePoint.xyz gives you the point</title>
                <meta
                    name="description"
                    content="Find the point of any article you're too busy to read"
                />

                <meta
                    property="og:url"
                    content="https://www.whatisthepoint.xyz/"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="WhatIsThePoint.xyz gives you the point"
                />
                <meta
                    property="og:description"
                    content="Find the point of any article you're too busy to read"
                />
                <meta
                    property="og:image"
                    content="https://www.whatisthepoint.xyz/logo.png"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="whatisthepoint.xyz" />
                <meta
                    property="twitter:url"
                    content="https://www.whatisthepoint.xyz/"
                />
                <meta
                    name="twitter:title"
                    content="WhatIsThePoint.xyz gives you the point"
                />
                <meta
                    name="twitter:description"
                    content="Find the point of any article you're too busy to read"
                />
                <meta
                    name="twitter:image"
                    content="https://www.whatisthepoint.xyz/logo.png"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="icon" href="/icons/favicon.ico" />
            </Head>

            <Container
                sx={{
                    display: "flex",
                    alignItems: "stretch",
                    minHeight: "100vh",
                    flexDirection: "column",
                }}
            >
                {/* <ThreadMaker /> */}
                <Flex
                    as="main"
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <KeyInsight />
                </Flex>
                <Box as="footer" sx={{ textAlign: "center", p: [1, 3] }}>
                    Created for fun by{" "}
                    <Link href="https://swizec.com">Swizec</Link>
                </Box>
            </Container>
        </>
    );
}
