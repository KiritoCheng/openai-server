import { Configuration, OpenAIApi } from "openai";
import { marked } from "marked";

export const routes = (app: any) => {
  return {
    chart: app.use("/api/chart", async (req: any, res: any) => {
      try {
        const { content = "", OPENAI_API_KEY = "" } = req.query || {};

        const configuration = new Configuration({
          organization: "org-5ZqRIjonyON5xbje0fcE7zBh",
          apiKey: OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content }],
          temperature: 0.7,
        });

        const { message } = response.data.choices[0];
        const messageHtml = message?.content || "";
        return res.status(200).json(marked.parse(messageHtml));
      } catch (err: any) {
        const { message = "" } = err || {};
        return res.status(404).json({ message });
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

        console.log("response", response);

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
