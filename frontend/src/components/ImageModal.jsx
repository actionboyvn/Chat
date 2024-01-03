import React, { useState } from "react";

const ImageModal = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    let imageURL;
    if (/^(https?:)?\/\//.test(src)) {
      imageURL = process.env.REACT_APP_PROXY_URL + "?url=" + src;
    } else {
      imageURL = src;
    }
    try {
      const response = await fetch(imageURL);
      if (!response.ok) throw new Error("Network response was not ok");
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      const timestamp = Date.now();
      const filename = `Generated-${timestamp}.png`;

      const link = document.createElement("a");
      link.href = imageObjectURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(imageObjectURL);
    } catch (error) {
      console.error("Failed to download the image:", error);
    } finally {
      setDownloading(false);
    }
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <img
        src={src}
        alt="Generated"
        className="cursor-pointer h-full object-contain rounded-xl"
        onClick={toggleModal}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-text-color bg-opacity-90 flex justify-center items-center z-10"
          onClick={toggleModal}
        >
          <div
            className="flex flex-col justify-center items-end"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="object-contain max-h-[90vh]"
              src={src}
              alt="Modal"
            />
            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{ textDecoration: "none" }}
              className="w-fit px-1 py-1 mt-1 mr-1 bg-secondary-500 text-white rounded hover:bg-secondary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block mr-2 -mt-1.5"
                viewBox="0 0 20 20"
                fillRule="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z"
                  fill="#FFFFFF"
                />
              </svg>
              {downloading ? "Downloading..." : "Download Image"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
