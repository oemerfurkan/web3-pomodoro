import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { EventList } from "~~/components/EventList";

const ExampleUI: NextPage = () => {
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [countdownStart, setCountdownStart] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const id = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [countdownStart]);

  const handleAddFiveMinutes = () => {
    if (countdown === 0) {
      setCountdown(300);
    } else {
      setCountdown(prevCountdown => prevCountdown + 300);
    }
  };

  const handleAddFifteenMinutes = () => {
    if (countdown === 0) {
      setCountdown(900);
    } else {
      setCountdown(prevCountdown => prevCountdown + 900);
    }
  };

  const handleAddTenSeconds = () => {
    if (countdown === 0) {
      setCountdown(10);
    } else {
      setCountdown(prevCountdown => prevCountdown + 10);
    }
  };

  const { writeAsync: endTimer, isLoading: isEnding } = useScaffoldContractWrite({
    contractName: "Web3Pomodoro",
    functionName: "endTimer",
  });

  const { writeAsync: startTimer, isLoading: isStarting } = useScaffoldContractWrite({
    contractName: "Web3Pomodoro",
    functionName: "startTimer",
    args: [BigNumber.from(countdown)],
  });

  const handleStopCountdown = () => {
    setCountdownStart(false);
    clearInterval(intervalId);
    setCountdown(0);
    endTimer();
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <>
      <Head>
        <title>Timer</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        {countdown > 0 ? <div className="text-9xl font-bold mb-8">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</div> : <div className="text-9xl font-bold mb-8">{`0:00`}</div>}
        <div className="flex space-x-4">
          <button
            className={`bg-opacity-75 hover:bg-opacity-100 text-white py-4 px-8 rounded-lg transition-all duration-500 ease-in-out transform ${
              countdownStart ? "bg-gray-300" : "hover:-translate-y-2 bg-blue-500"
            }`}
            onClick={handleAddTenSeconds}
            disabled={countdownStart ? true : false}
          >
            Add 10 seconds
          </button>
          <button
            className={`bg-opacity-75 hover:bg-opacity-100 text-white py-4 px-8 rounded-lg transition-all duration-500 ease-in-out transform ${
              countdownStart ? "bg-gray-300" : "hover:-translate-y-2 bg-blue-500"
            }`}
            onClick={handleAddFiveMinutes}
            disabled={countdownStart ? true : false}
          >
            Add 5 minutes
          </button>
          <button
            className={`bg-opacity-75 hover:bg-opacity-100 text-white py-4 px-8 rounded-lg transition-all duration-500 ease-in-out transform ${
              countdownStart ? "bg-gray-300" : "hover:-translate-y-2 bg-blue-500"
            }`}
            onClick={handleAddFifteenMinutes}
            disabled={countdownStart ? true : false}
          >
            Add 15 minutes
          </button>
          {!countdownStart && <button
            className="bg-green-500 bg-opacity-75 hover:bg-opacity-100 text-white py-4 px-8 rounded-lg transition-all duration-500 ease-in-out transform hover:-translate-y-2"
            onClick={() => {
              startTimer()
                .then(() => {
                  setCountdownStart(true);
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            }}
          >
            Start Countdown
          </button>}
          {countdownStart && (
            <button
              className="bg-red-500 bg-opacity-75 hover:bg-opacity-100 text-white py-4 px-8 rounded-lg transition-all duration-500 ease-in-out transform hover:-translate-y-2"
              onClick={handleStopCountdown}
            >
              Stop Countdown
            </button>
          )}
        </div>
      </div>
      
    </>
  );
};

export default ExampleUI;
