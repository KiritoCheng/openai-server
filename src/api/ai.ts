import { Configuration, OpenAIApi } from "openai";
import { marked } from "marked";
import query from "../configs/query";

export const routes = (app: any) => {
  return {
    chart: app.use("/api/chart", async (req: any, res: any) => {
      try {
        const { content = "" } = req.query || {};
        const apiKeyRes: any =
          (await query(`select auth_key from openai.user_key;`)) || [];
        const { auth_key: OPENAI_API_KEY } = apiKeyRes[0] || {};

        const configuration = new Configuration({
          organization: "org-5ZqRIjonyON5xbje0fcE7zBh",
          apiKey: OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content }],
          temperature: 1,
        });

        const { message } = response.data.choices[0];
        const messageHtml = message?.content || "";
        const resData = marked.parse(messageHtml);

        return res.send(resData);
      } catch (err: any) {
        const { message = "" } = err || {};
        return res.send(message);
        // return res.status(404).send(resError({ msg: message }));
      }
    }),
    chartBeta: app.use("/api/chartBeta", async (req: any, res: any) => {
      try {
        const { content = "", OPENAI_API_KEY = "" } = req.query || {};
        const configuration = new Configuration({
          organization: "org-5ZqRIjonyON5xbje0fcE7zBh",
          apiKey: OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion({
          model: "text-davinci-002-render-sha",
          prompt: content,
          temperature: 0.7,
        });

        const { text } = response.data.choices[0];
        return res.status(200).json(text);
      } catch (err: any) {
        console.log("Err", err);
        const { message = "" } = err || {};
        return res.status(404).json({ message });
      }
    }),
  };
};
