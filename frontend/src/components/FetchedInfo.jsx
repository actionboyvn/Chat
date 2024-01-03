import React, { useState, useEffect } from "react";

const FetchedInfo = ({ info }) => {
  const [currentInfo, setCurrentInfo] = useState(info);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (info !== currentInfo) {
      setAnimate(true);
    }
  }, [info, currentInfo]);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setCurrentInfo(info);
        setAnimate(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animate, info]);

  return (
    <>
      <div
        className={`font-bold text-sm transition-all duration-200 ${
          animate ? "opacity-0 -translate-y-5" : "opacity-100 translate-y-0"
        }`}
      >
        {currentInfo}
      </div>
    </>
  );
};

export default FetchedInfo;
