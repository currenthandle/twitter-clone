import { useState } from "react";
import { object, string, ZodError } from "zod";
import { api } from "../utils/api";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet Text is required",
  })
    .min(10)
    .max(280),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync } = api.tweet.create.useMutation();

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      // await tweetSchema.parse({ text });
      tweetSchema.parse({ text });
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.message);
        return;
      }
      setError("Unknown error");
    }

    await mutateAsync({ text });
    // mutateAsync({ text });
  }

  return (
    <>
      {error && JSON.stringify(error)}
      <form onSubmit={void handleSubmit}>
        <textarea onChange={(e) => setText(e.target.value)} />
        <div>
          <button type="submit">Tweet</button>
        </div>
      </form>
    </>
  );
}
