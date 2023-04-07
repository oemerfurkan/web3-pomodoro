import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { EventList } from "~~/components/EventList";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {

  const {
    data: attempts,
    isLoading: isLoadingAttempts,
    error: errorReadingAttempts,
  } = useScaffoldEventHistory({
    contractName: "Web3Pomodoro",
    eventName: "Attempt",
    fromBlock: Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) || 0,
    blockData: true,
  });

  const {
    data: success,
    isLoading: isLoadingSuccess,
    error: errorReadingSuccess,
  } = useScaffoldEventHistory({
    contractName: "Web3Pomodoro",
    eventName: "Success",
    fromBlock: Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) || 0,
    blockData: true,
  });

  return (
    <>
      <Head>
        <title>Pomodoros</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      
      <div className="flex justify-around align-center text-2xl w-full h-screen">
        <div className="p-5 m-5 text-center bg-slate-700 rounded-2xl shadow-2xl">
          <h1 className="text-[40px] text-red-400">Pomodoro Attempts</h1>
          <EventList events={attempts} />
        </div>
        <div className="p-5 m-5 text-center bg-slate-700 rounded-2xl shadow-2xl">
          <h1 className="text-[40px] text-lime-400">Successful Pomodoros</h1>
          <EventList events={success} />
        </div>
      </div>
    </>

  );
};

export default Home;
