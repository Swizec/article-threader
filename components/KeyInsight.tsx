import { useState } from "react";
import { useMutation } from "react-query";
import { Box, Button, Flex, Input, Link, Paragraph, Spinner } from "theme-ui";

export async function findKeyInsight(vars: { url: string }) {
    const res = await fetch("https://whatisthepoint.xyz/api/findKeyInsight", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vars),
    });

    if (!res.ok) {
        throw new Error("Failed to find key insight");
    }

    return res.text();
}

const HowItWorks = () => {
    return (
        <>
            <h3>Here&apos;s how it works:</h3>
            <video autoPlay loop muted style={{ maxHeight: "400px" }}>
                <source src="preview.mp4" type="video/mp4" />
            </video>
        </>
    );
};

export const KeyInsight = () => {
    const [url, setUrl] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const {
        data: keyInsight,
        isLoading,
        mutateAsync,
    } = useMutation(findKeyInsight);

    async function makeThread(event: React.FormEvent) {
        event.preventDefault();

        setIsError(false);

        if (url) {
            try {
                await mutateAsync({ url });
            } catch (e) {
                console.error(e);
                setIsError(true);
            }
        }
    }

    return (
        <Box
            sx={{
                textAlign: "center",
            }}
        >
            <h1>What is the point?</h1>
            <Paragraph>
                Reading? Ain&apos;t nobody got time for that. Paste the URL, get
                the point 👇
            </Paragraph>
            <Paragraph>
                Don&apos;t have a URL handy?{" "}
                <Link
                    href="#"
                    onClick={() =>
                        setUrl(
                            "https://swizec.com/blog/why-senior-engineers-get-nothing-done/"
                        )
                    }
                >
                    Try an example
                </Link>
            </Paragraph>
            <Flex
                as="form"
                onSubmit={makeThread}
                sx={{
                    p: 1,
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Input
                    name="url"
                    value={url}
                    placeholder="Paste URL here"
                    onChange={(e) => setUrl(e.currentTarget.value)}
                    sx={{ m: 3, width: "100%" }}
                />

                {isError ? (
                    <Paragraph sx={{ color: "red" }}>
                        Sorry, choked on that link – likely too long. <br />
                        Try something else
                    </Paragraph>
                ) : null}

                {isLoading ? (
                    <Spinner />
                ) : (
                    <Button type="submit" sx={{ cursor: "pointer" }}>
                        What is the point?
                    </Button>
                )}
            </Flex>

            {keyInsight ? (
                <>
                    <h2>The point 👇</h2>
                    <Paragraph sx={{ m: "auto", p: 2 }}>{keyInsight}</Paragraph>
                    <Paragraph>
                        Read more:{" "}
                        <Link href={url}>{new URL(url).hostname}</Link>
                    </Paragraph>
                </>
            ) : (
                <HowItWorks />
            )}
        </Box>
    );
};
