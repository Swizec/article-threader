import Head from "next/head";
import Script from "next/script";
import { PropsWithChildren, useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Link,
    Paragraph,
    Spinner,
} from "theme-ui";
import { findKeyInsight } from "../components/KeyInsight";

const Layout = (props: PropsWithChildren<{ minHeight?: number }>) => {
    return (
        <>
            <Head>
                <title>WhatIsThePoint.xyz gives you the point</title>
                <meta
                    name="description"
                    content="Get the main insight from any article using GPT"
                />

                <link rel="icon" href="/icons/favicon.ico" />
            </Head>

            <Script
                src="/lemon.js"
                strategy="lazyOnload"
                onLoad={() => {
                    // @ts-ignore
                    window.createLemonSqueezy();
                }}
            />

            <Container
                sx={{
                    display: "flex",
                    alignItems: "stretch",
                    flexDirection: "column",
                    minWidth: "500px",
                    minHeight: props.minHeight,
                }}
            >
                <Flex
                    as="main"
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        {props.children}
                    </Box>
                </Flex>

                <Box as="footer" sx={{ textAlign: "center", p: [1, 3] }}>
                    Created for fun by{" "}
                    <Link href="https://swizec.com">Swizec</Link>
                </Box>
            </Container>
        </>
    );
};

export default function Extension() {
    const [minHeight, setMinHeight] = useState<number | undefined>();
    const {
        data: keyInsight,
        isLoading,
        mutateAsync,
    } = useMutation(findKeyInsight);

    async function summarizeArticle() {
        let [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
        });

        // const tab = {
        //     url: "https://www.garmin.com/en-US/blog/marine/ghost-boat-with-garmin-gps-leads-father-son-duo-to-man-overboard/",
        // };

        if (tab.url) {
            try {
                await mutateAsync({ url: tab.url });
            } catch (e) {
                console.error(e);
            }
        }
    }

    useEffect(() => {
        summarizeArticle();
    }, []);

    return (
        <Layout minHeight={minHeight}>
            <Heading>What is the point?</Heading>
            <Paragraph>
                Reading? Ain&apos;t nobody got time for that. Here&apos;s the
                point 👇
            </Paragraph>

            {isLoading ? <Spinner /> : null}

            <Heading as="h2" sx={{ mt: 3 }}>
                The point 👇
            </Heading>

            {keyInsight ? (
                <Paragraph sx={{ m: "auto", p: 2, fontSize: 1 }}>
                    {keyInsight}
                </Paragraph>
            ) : null}

            <Button
                as="a"
                // @ts-expect-error
                href="https://scholarstream.lemonsqueezy.com/checkout/buy/c47d6d06-4103-450b-a3f1-de24e8a3339d?embed=1&discount=0&media=0"
                target="_blank"
                className="lemonsqueezy-button"
                sx={{ my: 2 }}
                onClick={() => setMinHeight(600)}
            >
                Support WhatIsThePoint.xyz
            </Button>
        </Layout>
    );
}
