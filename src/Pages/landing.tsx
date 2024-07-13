import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import Button from "../components/ui/Button";

const CommentValidator = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

type Comment = z.infer<typeof CommentValidator>;

const Landing = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const [CommentList, setCommentList] = useState<Comment[]>([]);

  const fetchData = async () => {
    const controller = new AbortController();
    const { signal } = controller;

    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments?_limit=15",
        { signal: signal }
      );

      const products = z.array(CommentValidator).parse(response.data);

      setCommentList([...products]);

      setTimeout(() => {
        controller.abort();
      }, 5000);
    } catch (error) {
      toast.error("Failed to get data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Button isLoading={Loading} onClick={() => fetchData()}>
        Get Data
      </Button>
      <div className="w-[300px] h-[500px] flex">
        {CommentList.length > 0 ? (
          <ul
            role="list"
            className="w-full h-full gap-y-3 flex flex-col border border-gray-400 overflow-y-auto p-2 divide-y divide-zinc-400"
          >
            {CommentList.map((comment, index) => (
              <li
                key={index}
                className="flex flex-col gap-y-1font-[Inter] text-lg text-gray-400 hover:text-indigo-400 font-semibold"
              >
                {comment.email}
                <span className="truncate text-xs">{comment.body}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Landing;
