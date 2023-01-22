import Head from "next/head";
import { useState } from "react";
import { useMutation } from "react-query";
import { Box, Button, Container, Input, Label, Spinner } from "theme-ui";
import { KeyInsight } from "../components/KeyInsight";

export default function Home() {
    return (
        <>
            <Head>
                <title>WhatIsThePoint.xyz gives you the point</title>
                <meta
                    name="description"
                    content="Find the point of any longwinded article"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                {/* <ThreadMaker /> */}
                <KeyInsight />
            </Container>
        </>
    );
}
