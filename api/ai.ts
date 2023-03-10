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
      try {
        axios
          .post(
            "https://api.openai.com/v1/chat/completions",

            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              },
              data: {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "test" }],
              },
              // proxy: {
              //   /*
              //   It depends on your real proxy configuration,
              //   Open your proxy client and view the configuration information.
              //   */
              //   host: "127.0.0.1",
              //   port: 10809,
              // },
            }
          )
          .then((response) => {
            console.log("返参", response);
            if (response.data) {
              const { message } = response.data.choices[0];
              const { content } = message || {};
              return res.status(200).json(content);
            }
          }).catch(err => {
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
        const { message = "" } = err || {};
        return res.status(404).json({ message });
      }
    }),
  };
};
