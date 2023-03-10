import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
// import

const configuration = new Configuration({
  organization: "org-5ZqRIjonyON5xbje0fcE7zBh",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const routes = (app: any) => {
  return {
    chart: app.use("/api/chart", async (req: any, res: any) => {
      const { content = '' } = req.query || {}

      try {

        const config = {
          url: "https://api.openai.com/v1/chat/completions",
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer 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`,
          },
          data: {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content }],
          }
        }

        axios(config)
          .then((response) => {
            console.log("返参", response);
            if (response.data) {
              const { message } = response.data.choices[0];
              const { content } = message || {};
              return res.status(200).json(content);
            }
          }).catch(err => {
            console.log("返参", err);
            const { message = "" } = err || {};
            return res.status(404).json({ message });
          });

        // const completion = await openai.createChatCompletion({
        //   model: "gpt-3.5-turbo",
        //   messages: [{ role: "user", content: "test" }],
        // });

        // // console.log("返参", completion.data);

        // console.log("返参", completion.data);
        // if (completion.data) {
        //   const { message } = completion.data.choices[0];
        //   const { content } = message || {};
        //   return res.status(200).json(content);
        // }

        // return res.status(400).json("Error");
      } catch (err: any) {
        console.log("错误", err);
        const { message = "" } = err || {};
        return res.status(404).json({ message });
      }
    }),
  };
};
