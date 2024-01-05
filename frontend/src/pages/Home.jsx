import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  let navigate = useNavigate();

  const handleChooseOption = (option) => {
    setTimeout(() => {
      if (option === 0) {
        navigate("/chat");
      }
      if (option === 1) {
        navigate("/image");
      }
    }, 50);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen bg-background-color">
        <div className="flex items-center justify-center bg-white rounded-lg shadow-md h-1/2 max-md:h-1/4 w-1/2 max-md:w-4/5">
          <div className="flex items-center justify-center w-full gap-10 max-md:gap-4">
            <motion.div
              className="w-40 h-40 max-md:w-24 max-md:h-24 cursor-pointer"
              onClick={() => handleChooseOption(0)}
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                bounce: 0.3,
                duration: 0.3,
              }}
            >
              <div className="flex items-center justify-center w-full h-full items-center space-y-2 rounded-md hover:scale-105 ease-in-out duration-150 p-4 bg-primary-600">
                <p className="text-2xl max-md:text-base text-white">Baymax</p>
              </div>
            </motion.div>
            <motion.div
              className="w-40 h-40 max-md:w-24 max-md:h-24 cursor-pointer"
              onClick={() => handleChooseOption(1)}
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                delay: 0.4,
                type: "spring",
                bounce: 0.3,
                duration: 0.3,
              }}
            >
              <div className="flex items-center justify-center w-full h-full items-center space-y-2 rounded-md hover:scale-105 ease-in-out duration-150 p-4 bg-secondary-600">
                <p className="text-2xl max-md:text-base text-white">Image</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
