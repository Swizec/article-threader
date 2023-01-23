import { Configuration, OpenAIApi } from "openai";
import { extract } from "@extractus/article-extractor";
import { stripHtml } from "string-strip-html";
import { NextApiHandler } from "next";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

const findKeyInsight: NextApiHandler = async (req, res) => {
    const { url } = req.body;

    const article = await extract(url);

    if (!article.title || !article.content) {
        return res.send(400);
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

    res.status(200).send(insight1.data.choices[0].text);

    // res.status(200).send(
    //     [
    //         insight1.data.choices[0].text.trim(),
    //         insight2.data.choices[0].text.trim(),
    //     ].join("\n\n")
    // );
};

export default findKeyInsight;
