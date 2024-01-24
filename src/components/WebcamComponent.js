// WebcamComponent.js

import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamComponent = () => {
  const webcamRef = useRef(null);

  const capture = async () => {
    const image = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = image;

    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    console.log(detections);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Image</button>
    </div>
  );
};

export default WebcamComponent;
