import React, { useState, useRef, useEffect } from "react";
import baymax_avatar from "../assets/images/baymax_avatar.jpg";
import baymax_transparent from "../assets/images/baymax_transparent.png";
import Typewriter from "../components/Typewriter";
import { getResponse } from "../utils/Services/getResponse";

const helloMessage = "Hi there!";
const writerSpeed = 40;

const ChatInterface = () => {
  const [userQuery, setUserQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const textareaRef = useRef(null);
  const scrollableChat = useRef(null);

  const scrollToBottom = () => {
    if (scrollableChat.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollableChat.current;
      if (scrollHeight - scrollTop - clientHeight < 60) {
        scrollableChat.current.scrollTo({
          top: scrollableChat.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const forceScrollToBottom = () => {
    if (scrollableChat.current) {
      scrollableChat.current.scrollTo({
        top: scrollableChat.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleUserQueryChange = (e) => {
    if (e.target.value.slice(-1) === "\n" && e.target.value.length === 1) {
      return;
    }
    setUserQuery(e.target.value);
    resizeTextarea();
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleQuerySubmit = async (q) => {
    setUserQuery("");
    if (q || userQuery) {
      setMessages([
        ...messages,
        {
          role: "user",
          content: q || userQuery,
        },
        {
          role: "assistant",
          content: "",
        },
      ]);

      setIsLoading(true);
      setTimeout(() => {
        getResponse([
          ...messages,
          {
            role: "user",
            content: q || userQuery,
          },
        ]).then((result) => {
          setIsLoading(false);
          setMessages([
            ...messages,
            {
              role: "user",
              content: q || userQuery,
            },
            {
              role: "assistant",
              content: result.response,
            },
          ]);
        });
      }, 2000);

      setTimeout(() => {
        forceScrollToBottom();
        resizeTextarea();
      }, 10);
    }
  };

  useEffect(() => {
    if (scrollableChat.current) {
      if (isWriting) {
        let interval;
        interval = setInterval(scrollToBottom, 400);
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      } else {
        forceScrollToBottom();
      }
    }
  }, [isWriting]);

  return (
    <div className="bg-white h-lvh">
      <div className="relative bg-background-color h-full w-full md:w-2/3 lg:w-1/2 mx-auto">
        <div className="flex px-2 h-[10vh] w-full bg-primary-600 text-white">
          <div className="flex items-center">
            <img
              className="h-12 w-12 bg-background-color-300 rounded-full flex-shrink-0"
              alt="Avatar"
              src={baymax_avatar}
            ></img>
            <div className="ml-4">
              <div className="font-bold">Baymax Assistant</div>
              <div className="text-sm">Online</div>
            </div>
          </div>
        </div>
        <div
          ref={scrollableChat}
          className="overflow-y-auto p-2 h-[80vh] w-full"
        >
          <div className="flex gap-2 my-4">
            <div className="flex-shrink-0 flex flex-col relative items-end">
              <div className="relative flex">
                <img
                  className="rounded-sm w-9"
                  alt="Assistant"
                  src={baymax_transparent}
                />
              </div>
            </div>
            <div className="message baymax">
              <div>
                <Typewriter
                  delay={80}
                  text={helloMessage}
                  setIsWriting={setIsWriting}
                />
              </div>
            </div>
          </div>
          {messages.map(({ role, content }, index) => (
            <div key={index}>
              {role === "user" && <div className="message mine">{content}</div>}
              {role === "assistant" && (
                <div className="flex gap-2 my-4">
                  <div className="flex-shrink-0 flex flex-col relative items-end">
                    <div className="relative flex">
                      <img
                        className="rounded-sm w-9"
                        alt="Assistant"
                        src={baymax_transparent}
                      />
                    </div>
                  </div>
                  {index + 1 === messages.length && isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner border-0 border-white border-t-4 border-t-primary-500 w-8 h-8 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="message baymax">
                      <div>
                        <Typewriter
                          delay={writerSpeed}
                          text={content}
                          setIsWriting={setIsWriting}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 w-full h-[10vh] flex bg-white shadow-[0px_0px_10px_0px_rgba(203,203,203,1)]">
          <div className="w-full flex items-center p-6">
            <textarea
              ref={textareaRef}
              className="flex-1 border-0 outline-none resize-none overflow-hidden"
              rows={1}
              name="myInput"
              placeholder="Send message"
              value={userQuery}
              minLength={1}
              onChange={handleUserQueryChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.shiftKey) {
                    resizeTextarea();
                  } else {
                    handleQuerySubmit();
                  }
                }
              }}
            />
          </div>
          <div className="flex justify-center items-center w-fit px-2">
            <button
              className="bg-primary-600 cursor-pointer text-white rounded-lg w-12"
              onClick={() => handleQuerySubmit()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="p-4"
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
    </div>
  );
};

export default ChatInterface;
