import { useEffect, useState } from "react";

const useAuctionDuration = (startTime, endTime) => {
  const [status, setStatus] = useState("");
  const [statusInfo, setStatusInfo] = useState("");
  const [state, setState] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });


  useEffect(() => {
    let interval;
    if (startTime && endTime) {
        interval = setInterval(async () => {
        const currentTimestamp = new Date().getTime();
        let countdownDate = 0;

        if (startTime * 1000 > currentTimestamp) {
          countdownDate = startTime * 1000;
          setStatusInfo("Auction starting in");
          setStatus("not_started");
        } else if (endTime * 1000 > currentTimestamp) {
          countdownDate = endTime * 1000;
          setStatusInfo("Auction ending in");
          setStatus("progressing");
        } else {
          setStatusInfo("Auction has ended");
          setStatus("ended");
        }

        if (countdownDate) {
          const distanceToDate = countdownDate - currentTimestamp;

          let days = `${Math.floor(distanceToDate / (1000 * 60 * 60 * 24))}`;
          let hours = Math.floor(
            (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ).toString();
          let minutes = Math.floor(
            (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
          ).toString();
          let seconds = Math.floor(
            (distanceToDate % (1000 * 60)) / 1000
          ).toString();

          const numbersToAddZeroTo = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
          ];

          if (numbersToAddZeroTo.includes(hours)) {
            hours = `0${hours}`;
          } else if (numbersToAddZeroTo.includes(minutes)) {
            minutes = `0${minutes}`;
          } else if (numbersToAddZeroTo.includes(seconds)) {
            seconds = `0${seconds}`;
          }

          setState({ days: days, hours: hours, minutes, seconds });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return {
    status,
    statusInfo,
    state,
  };
};

export default useAuctionDuration;
