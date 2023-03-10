import { useState } from "react";
import { useMutation } from "react-query";
import { Box, Button, Input, Label, Spinner } from "theme-ui";

async function createTwitterThread(vars: { url: string; tweetCount: number }) {
    const res = await fetch("/api/createTwitterThread", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vars),
    });

    if (!res.ok) {
        throw new Error("Failed to createTwitterThread");
    }

    return res.text();
}

const Thread = (props: { text: string }) => {
    const text = props.text.replaceAll(/(\n)+/g, "\n\n");

    return (
        <Box sx={{ p: 3 }}>
            <h3>Here&apos;s your thread:</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{`
${text}
        `}</pre>
        </Box>
    );
};

export const ThreadMaker = () => {
    const [url, setUrl] = useState<string>("");
    const [tweetCount, setTweetCount] = useState<number>(6);

    const {
        data: twitterThread,
        isLoading,
        mutateAsync,
    } = useMutation(createTwitterThread);

    async function makeThread(event: React.FormEvent) {
        event.preventDefault();

        if (url) {
            await mutateAsync({ url, tweetCount });
        }
    }

    return (
        <>
            <form onSubmit={makeThread}>
                <h2>Turn article into Twitter thread</h2>
                <Label>Article URL:</Label>
                <Input
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.currentTarget.value)}
                />
                <Label>How many tweets?</Label>
                <Input
                    name="tweetCount"
                    type="number"
                    value={tweetCount}
                    onChange={(e) =>
                        setTweetCount(Number(e.currentTarget.value))
                    }
                    sx={{ width: 60 }}
                />
                {isLoading ? (
                    <Spinner />
                ) : (
                    <Button type="submit">Make Thread</Button>
                )}
            </form>

            {twitterThread ? <Thread text={twitterThread} /> : null}
        </>
    );
};
