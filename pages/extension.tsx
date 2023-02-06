import Head from "next/head";
import { PropsWithChildren, useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
    Box,
    Container,
    Flex,
    Heading,
    Link,
    Paragraph,
    Spinner,
} from "theme-ui";
import { findKeyInsight } from "../components/KeyInsight";

const Layout = (props: PropsWithChildren) => {
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

            <Container
                sx={{
                    display: "flex",
                    alignItems: "stretch",
                    flexDirection: "column",
                    minWidth: "400px",
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
    const {
        data: keyInsight,
        isLoading,
        mutateAsync,
    } = useMutation(findKeyInsight);

    async function summarizeArticle() {
        // let [tab] = await chrome.tabs.query({
        //     active: true,
        //     lastFocusedWindow: true,
        // });

        const tab = {
            url: "https://www.garmin.com/en-US/blog/marine/ghost-boat-with-garmin-gps-leads-father-son-duo-to-man-overboard/",
        };

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
        <Layout>
            <Heading>What is the point?</Heading>
            <Paragraph>
                Reading? Ain&apos;t nobody got time for that. Here&apos;s the
                point 👇
            </Paragraph>

            {isLoading ? <Spinner /> : null}

            {keyInsight ? (
                <Paragraph sx={{ m: "auto", p: 2 }}>{keyInsight}</Paragraph>
            ) : null}
        </Layout>
    );
}
