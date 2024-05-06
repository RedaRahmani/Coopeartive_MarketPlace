import React from 'react';

const ImageFrame = ({ src, cadreSize, frameSize, frameColor }) => {
  return (
    <div
      className={`w-${cadreSize} h-${cadreSize} border-${frameColor} border-solid p-${frameSize} inline-block`}
    >
      <img src={src} alt="Image" className="w-full h-full object-cover rounded-lg" />
    </div>
  );
};

export default ImageFrame;
