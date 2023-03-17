import { Configuration, OpenAIApi } from "openai";

export const routes = (app: any) => {
  return {
    "chart3.5": app.use("/api/chart3.5", async (req: any, res: any) => {
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
          temperature: 0.5,
        });

        const { message } = response.data.choices[0];
        return res.status(200).json(message);
      } catch (err: any) {
        const { message = "" } = err || {};
        return res.status(404).json({ message });
      }
    }),
    chart: app.use("/api/chart", async (req: any, res: any) => {
      try {
        const { content = "", OPENAI_API_KEY = "" } = req.query || {};
        const configuration = new Configuration({
          organization: "org-5ZqRIjonyON5xbje0fcE7zBh",
          apiKey: OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const model_engine = "text-davinci-002-render-sha";

        const response = await openai.createCompletion({
          model: model_engine,
          prompt: content,
          // n: 1,
          // stop: "\n",
          temperature: 0.7,
        });

        console.log("response", response.data);

        const { text } = response.data.choices[0];
        return res.status(200).json(text);
      } catch (err: any) {
        const { message = "" } = err || {};
        return res.status(404).json({ message });
      }
    }),
  };
};
