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

  const utils = api.useContext();

  const { mutateAsync } = api.tweet.create.useMutation({
    onSuccess: () => {
      setText("");
      void utils.tweet.timeline.invalidate();
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // async function handleSubmit(e) {
    e.preventDefault();
    console.log("in handleSubmit");

    try {
      // await tweetSchema.parse({ text });
      tweetSchema.parse({ text });
    } catch (err) {
      // console.log("err", err);
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
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="mb-4 flex w-full flex-col rounded-md border-2 p-4"
      >
        <textarea
          className="w-full p-4 shadow"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-primary py-2 px-4 text-white"
            type="submit"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
}
