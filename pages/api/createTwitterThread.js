import { Configuration, OpenAIApi } from "openai";
import { extract } from "@extractus/article-extractor";
import { stripHtml } from "string-strip-html";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

const handler = async (req, res) => {
    const { url, tweetCount } = req.body;

    const article = await extract(url);

    if (!article.title || !article.content) {
        res.send(400).text("Can't extract article");
    }

    const cleanContent = stripHtml(article.content);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a blogger trying to promote their latest article on social media. The title is "${article.title}". Write a twitter thread summarizing the following text in ${tweetCount} numbered tweets: ${cleanContent}`,
        temperature: 0.4,
        max_tokens: 800,
        best_of: 2,
    });

    res.status(200).send(completion.data.choices[0].text.trim());
};

export default handler;
