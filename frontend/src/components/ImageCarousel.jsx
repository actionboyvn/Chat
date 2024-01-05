import React, { useState } from "react";
import ImageModal from "./ImageModal";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex flex-col justify-end items-center gap-2">
      <ImageModal
        className={"h-5/6 w-auto object-scale-down"}
        src={images[currentIndex]}
      />
      <div className="flex gap-2">
        <button
          className="bg-accent-300 hover:bg-accent-400 text-accent-800 font-bold py-2 px-4 rounded"
          onClick={goToPrevious}
        >
          &lt;
        </button>
        <button
          className="bg-accent-300 hover:bg-accent-400 text-accent-800 font-bold py-2 px-4 rounded"
          onClick={goToNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
