/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetChat } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuBrain } from "react-icons/lu";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Body = ({ response, update }: { response: string; update: boolean }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useGetChat(userId);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, data]);

  useEffect(() => {
    refetch();
  }, [update, refetch]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <AiOutlineLoading3Quarters className='animate-spin' size={28} />
      </div>
    );
  }

  if (error || !data || (data && data.data.length === 0)) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>No chat history found</p>
      </div>
    );
  }

  return (
    <section className='h-[480px] overflow-auto space-y-2 p-3 scroll'>
      {data.data.map((item: any) => (
        <div
          key={item._id}
          className={`flex ${
            item.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex gap-2 items-start bg-purple-${
              item.role === "user" ? "50" : "50/75"
            } p-2 rounded w-fit overflow-hidden`}
          >
            <div>
              {item.role === "assistant" && (
                <LuBrain size={28} className='text-purple-700' />
              )}
            </div>
            <div className='markdown-body overflow-x-auto scroll'>
              <Markdown remarkPlugins={[remarkGfm]}>{item.message}</Markdown>
            </div>
          </div>
        </div>
      ))}

      {response && (
        <div className='flex gap-2 items-start bg-purple-50/75 p-2 rounded'>
          <div>
            <LuBrain size={28} className='text-purple-700' />
          </div>
          <div className='markdown-body overflow-x-auto scroll'>
            <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
          </div>
        </div>
      )}
      <div ref={bottomRef}></div>
    </section>
  );
};

export default Body;
