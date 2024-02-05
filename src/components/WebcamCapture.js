// // WebcamCapture.js
// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = ({ onCapture }) => {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//     onCapture(imageSrc);
//   };

//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />

//       <button onClick={capture} className='bg-pink-200 m-2 p-3 '>Capture Photo</button>

//       {capturedImage && <img src={capturedImage} alt="Captured" />}
//     </div>
//   );
// };

// export default WebcamCapture;


// WebcamCapture.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    onCapture(imageSrc);
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />

      <button onClick={capture} className='bg-pink-200 m-2 p-3'>Capture Photo</button>

      {capturedImage && <img src={capturedImage} alt="Captured" />}
    </div>
  );
};

export default WebcamCapture;
