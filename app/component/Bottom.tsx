/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

type props = {
  setResponse: Dispatch<SetStateAction<string>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
const Bottom = ({ setResponse, setUpdate }: props) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError("");
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const payload = {
        message: value,
        userId: userId || uuidv4(),
      };

      const url = process.env.NEXT_PUBLIC_SERVER_URL;
      const res = await fetch(`${url}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is okay
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // Initialize a text reader to handle streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: chunkDone } = await reader!.read();
        done = chunkDone;
        const text = decoder.decode(value, { stream: true });
        setResponse((prev) => prev + text);
      }

      setValue("");
      setUpdate((prev) => !prev);
      setResponse("");
      localStorage.setItem("userId", payload.userId);
    } catch (error: any) {
      console.error("Error posting message:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-purple-700 px-2 py-3 relative'>
      {error && (
        <div className='p-2 bg-red-100 rounded-lg text-center absolute left-0 bottom-full w-full'>
          <p className='text-red-500'>Error sending message. Try again.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className='relative'>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className='w-full rounded-3xl py-3 px-5 focus:outline-none bg-purple-100'
          placeholder='What do you think?'
          type='text'
        />
        <button
          className='absolute right-5 top-1/2 -translate-y-1/2 text-purple-700'
          disabled={loading || !value}
        >
          {loading ? "Sending..." : <BsFillSendFill size={28} />}
        </button>
      </form>
    </div>
  );
};

export default Bottom;
