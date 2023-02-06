import { Configuration, OpenAIApi } from "openai";
import { extract } from "@extractus/article-extractor";
import { stripHtml } from "string-strip-html";
import { NextApiHandler } from "next";
import { Redis } from "@upstash/redis";
import { URL } from "url";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// remove utm params, the most likely for us to be useless
function getCleanUrl(url: string): string {
    const parsed = new URL(url);

    for (const param of Array.from(parsed.searchParams.keys())) {
        if (param.startsWith("utm_")) {
            parsed.searchParams.delete(param);
        }
    }

    return parsed.toString();
}

const findKeyInsight: NextApiHandler = async (req, res) => {
    const { url } = req.body;
    const cleanUrl = getCleanUrl(url);

    console.log(cleanUrl);

    const cached = await redis.get(cleanUrl);

    if (cached) {
        return res.status(200).send(cached);
    }

    const article = await extract(cleanUrl);

    if (!article.title || !article.content) {
        return res.status(400).send("Couldn't extract article");
    }

    const cleanContent = stripHtml(article.content).result;

    const insight1 = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `What is the most surprising insight in this article: ${cleanContent}`,
        temperature: 0.6,
        max_tokens: 800,
    });

    // const insight2 = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: `Turn this description into a viral tweet: ${insight1.data.choices[0].text.trim()}`,
    //     temperature: 0.6,
    //     max_tokens: 800,
    // });

    const finalResult = insight1.data.choices[0].text;

    await redis.set(cleanUrl, finalResult);

    res.status(200).send(finalResult);
};

export default findKeyInsight;
