import React, { useState, useRef } from "react";
import ImageModal from "../components/ImageModal";
import baymax_avatar from "../assets/images/baymax_avatar.jpg";
import FetchedInfo from "../components/FetchedInfo";
const Image = ({ socket }) => {
  const textareaRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");
  const [generatedImageURL, setGeneratedImageURL] = useState(baymax_avatar);
  const [fetchedGenerationInfo, setFetchedGenerationInfo] = useState(null);

  socket.on("get_response_info", (result) => {
    setFetchedGenerationInfo(result);
  });

  const loadedImageHandle = () => {
    setFetchedGenerationInfo(null);
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleUserQueryChange = (e) => {
    if (e.target.value.slice(-1) === "\n") {
      if (e.target.value.length > 1) {
        setUserQuery((query) => query.replace(/\n$/, ""));
      }
      return;
    }
    setUserQuery(e.target.value);
    resizeTextarea();
  };

  const handleQuerySubmit = async (q) => {
    socket.emit(
      "get_response",
      [
        {
          role: "user",
          content: q || userQuery,
        },
      ],
      "generate_image"
    );

    socket.on("get_response_callback", (result) => {
      setGeneratedImageURL(result.source);
    });
  };

  return (
    <div className="bg-white h-lvh w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-2/3 max-md:w-5/6">
        <div className="flex justify-center h-[60vh]">
          <ImageModal src={generatedImageURL} onLoaded={loadedImageHandle} />
        </div>
        <div
          className={`h-10 flex gap-2 items-center justify-center bg-background-color bg-opacity-40 w-fit px-3 py-1.5 rounded-md shadow-md ${
            fetchedGenerationInfo ? "visible" : "invisible"
          }`}
        >
          <div className="spinner border-2 border-background-color border-opacity-100 border-t-2 border-t-secondary-600 w-6 h-6 rounded-full"></div>
          <FetchedInfo info={fetchedGenerationInfo} />
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            ref={textareaRef}
            className="w-full h-14 flex bg-white items-center p-4 outline-none resize-none overflow-hidden border rounded-md focus:border-secondary-400 focus:ring-1 focus:ring-secondary-400"
            rows={1}
            name="myInput"
            placeholder="Send a prompt"
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
          <button
            className="bg-secondary-600 hover:bg-secondary-700 cursor-pointer text-white rounded-lg w-20 h-10 text-base max-md:text-sm mx-auto"
            onClick={() => handleQuerySubmit()}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;
