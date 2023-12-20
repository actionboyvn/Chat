import React from "react";
const ChatInterface = () => {
  return (
    <div className="bg-background-color h-lvh">
      <div className="chat-container bg-background-color">
        <div className="h-[10vh] p-4 bg-primary-600 text-white">
          <div className="flex items-center">
            <div
              className="h-12 w-12 bg-background-color-300 rounded-full flex-shrink-0"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/pw/ABLVV85TiudTJ8C217v5yYhPkX84advXh8wN73zkKe9dORHBxU1EMsCGvsXYISv3dx2iu8IhZW7uD_5VJ_xp1_0UDpstpU5yiBf8gy22qzAj6HdBNJLzv4_kk9OnGfY8OOY_g2J5RTgWDyOj8BZeooFAdael=w1400-h1866-s-no-gm')",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="ml-4">
              <div className="font-bold">Hien Le</div>
              <div className="text-sm">Online</div>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto p-4 h-[80vh]">
          <div className="message yours">Hi Hien</div>
          <div className="message mine">
            I am Hien, here to help you find new friends.
          </div>
          <div className="message yours">
            A vector database, in the context of computer science and data
            management, is a type of database designed specifically for handling
            vector data. Vector data is typically used in applications involving
            machine learning, artificial intelligence, and similar fields. It is
            important to understand the nature of vector data to appreciate the
            role and functionality of a vector database.
          </div>
          <div className="message mine">
            I am Hien, here to help you find new friends.
          </div>
          <div className="message yours">
            A vector database, in the context of computer science and data
            management, is a type of database designed specifically for handling
            vector data. Vector data is typically used in applications involving
            machine learning, artificial intelligence, and similar fields. It is
            important to understand the nature of vector data to appreciate the
            role and functionality of a vector database.
          </div>
        </div>
        <div className="absolute bottom-0 h-[10vh] flex items-center w-full p-4 bg-white shadow-[0px_0px_10px_0px_rgba(203,203,203,1)]">
          <input
            type="text"
            placeholder="Send message"
            className="flex-1 focus:outline-none p-4"
          />
          <button className="bg-primary-600 cursor-pointer text-white rounded-lg p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
