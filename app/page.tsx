"use client";
import Card from "@/app/component/Card";
import { useState } from "react";
import Body from "./component/Body";
import Bottom from "./component/Bottom";
import Title from "./component/Title";

const Home = () => {
  const [response, setResponse] = useState("");
  const [update, setUpdate] = useState(false);

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-purple-50'>
      <Card>
        <div className='flex flex-col justify-between h-full'>
          <Title />
          <Body update={update} response={response} />
          <Bottom setUpdate={setUpdate} setResponse={setResponse} />
        </div>
      </Card>
    </div>
  );
};

export default Home;
