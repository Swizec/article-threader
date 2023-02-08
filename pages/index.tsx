import Head from "next/head";
import Image from "next/image";
import {
    AspectRatio,
    Box,
    Button,
    Container,
    Flex,
    Link,
    Paragraph,
} from "theme-ui";
import { KeyInsight } from "../components/KeyInsight";
import examplePic from "../public/swizec-example.png";
import { usePlausible } from "next-plausible";

const BrowserExtension = () => {
    const plausible = usePlausible();

    return (
        <Box
            sx={{
                textAlign: "center",
            }}
        >
            <h2>Get the WhatIsPoint.xyz browser extension</h2>
            <AspectRatio ratio={1280 / 800} sx={{ mb: 3 }}>
                <Image
                    src={examplePic}
                    alt="WhatIsPoint.xyz used on an Atlantic article"
                    fill
                />
            </AspectRatio>
            <Paragraph sx={{ mb: ".7em" }}>
                <a href="https://chrome.google.com/webstore/detail/whatispointxyz/ocochaianpngffjfchhcbjmfjgdaligc">
                    WhatIsPoint.xyz
                </a>{" "}
                is a browser extension that leverages the power of GPT-3 to
                simplify the information overload of online articles. With a
                single click, it summarizes the key insights of any article
                you&apos;re reading, providing a convenient and
                easy-to-understand overview of the content.
            </Paragraph>
            <Paragraph sx={{ mb: ".7em" }}>
                Say goodbye to endless scrolling and save time by quickly
                grasping the core ideas of any article. Upgrade your browsing
                experience with{" "}
                <a href="https://chrome.google.com/webstore/detail/whatispointxyz/ocochaianpngffjfchhcbjmfjgdaligc">
                    WhatIsPoint.xyz
                </a>
                .
            </Paragraph>
            <Button
                as="a"
                // @ts-expect-error
                href="https://chrome.google.com/webstore/detail/whatispointxyz/ocochaianpngffjfchhcbjmfjgdaligc"
                target="_blank"
                sx={{ py: 3, px: 4 }}
                onClick={() => plausible("getExtensionClicked")}
            >
                Get the Extension
            </Button>
        </Box>
    );
};

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
                <Flex
                    as="main"
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <KeyInsight />
                    <BrowserExtension />
                </Flex>
                <Box
                    as="footer"
                    sx={{ textAlign: "center", p: [1, 3], fontSize: 1 }}
                >
                    Created for fun by{" "}
                    <Link href="https://swizec.com">Swizec</Link>
                </Box>
            </Container>
        </>
    );
}
