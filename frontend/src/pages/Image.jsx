import React, { useState, useRef } from "react";
import { getImage } from "../utils/Services/getImage";
const Image = () => {
  const textareaRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");
  const [generatedImageURL, setGeneratedImageURL] = useState("");

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
    getImage(q || userQuery).then((result) => {
      setGeneratedImageURL(result.source);
    });
  };

  return (
    <div className="bg-white h-lvh w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-2/3 max-md:w-5/6">
        <div className="flex justify-center h-[50vh]">
          <img
            className="w-full h-auto object-contain"
            alt="generated"
            src={generatedImageURL}
          ></img>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full h-14 flex bg-white shadow-[0px_0px_8px_0px_rgba(203,203,203,1)]">
            <div className="w-full flex items-center p-6 max-md:p-4">
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
          </div>
          <button
            className="bg-primary-600 hover:bg-primary-700 cursor-pointer text-white rounded-lg w-20 h-10 text-base max-md:text-sm mx-auto"
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
