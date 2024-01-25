

// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';

// const WebcamComponent = () => {
//   const webcamRef = useRef(null);
//   const [faceDetection, setFaceDetection] = useState([]);

//   const capture = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();

//     // Load face-api.js models
//     await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//     await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//     await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

//     // Perform face detection
//     const detections = await faceapi.detectAllFaces(imageSrc, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

//     // Update state with face detections
//     setFaceDetection(detections);

//     // Send the image to your backend for further processing
//     // You'll need to implement this part
//   };

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//       />
//       <button onClick={capture}>Capture Image</button>

//       {/* Display face detections */}
//       {faceDetection.map((face, index) => (
//         <div key={index}>
//           <p>Face {index + 1}</p>
//           <p>Descriptor: {face.descriptor}</p>
//           {/* You can display more information about each face */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WebcamComponent;



// WebcamComponent.js

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [faceDetection, setFaceDetection] = useState([]);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Load face-api.js models
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    // Perform face detection
    const detections = await faceapi.detectAllFaces(imageSrc, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

    // Update state with face detections
    setFaceDetection(detections);

    // Send the image to the backend for further processing
    const formData = new FormData();
    formData.append('image', dataURItoBlob(imageSrc));

    // Replace 'http://localhost:5000' with your backend server address
    fetch('http://localhost:5000/api/capture', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Attendance marked successfully', data);
        // Handle the response from the backend if needed
      })
      .catch((error) => {
        console.error('Error capturing attendance', error);
        // Handle errors
      });
  };

  // Helper function to convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Image</button>

      {/* Display face detections */}
      {faceDetection.map((face, index) => (
        <div key={index}>
          <p>Face {index + 1}</p>
          <p>Descriptor: {face.descriptor}</p>
        </div>
      ))}
    </div>
  );
};

export default WebcamComponent;
