import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
// import

export const routes = (app: any) => {
  return {
    chart: app.use("/api/chart", async (req: any, res: any) => {
      const { content = "", OPENAI_API_KEY = "" } = req.query || {};

      const configuration = new Configuration({
        organization: "org-5ZqRIjonyON5xbje0fcE7zBh",
        apiKey: OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content }],
        max_tokens: 255,
        temperature: 0.5,
      });

      try {
        const { message } = response.data.choices[0];
        // 打印 API 返回的结果
        console.log(response.data.choices[0]);
        return res.status(200).json(message);
      } catch (err: any) {
        console.log("错误", err);
        const { message = "" } = err || {};
        return res.status(404).json({ message });
      }
    }),
  };
};
