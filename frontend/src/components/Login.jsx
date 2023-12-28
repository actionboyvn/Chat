import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isLogged, setIsLogged }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLogged(true);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-background-color">
      <div className="flex items-center justify-center bg-white rounded-lg shadow-md h-1/2 max-md:h-1/4 w-1/2 max-md:w-4/5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-1/2 max-md:w-5/6"
        >
          <div>
            <label htmlFor="username" className="block text-xl font-bold">
              Enter your name
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-primary-600 focus:ring-offset-2 font-bold"
          >
            Start chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
