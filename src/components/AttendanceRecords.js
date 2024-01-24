// // WebcamComponent.js

// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';
// import axios from 'axios';

// const WebcamComponent = () => {
//   const webcamRef = useRef(null);
//   const [faceDetection, setFaceDetection] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);

//   useEffect(() => {
//     // Fetch attendance records when the component mounts
//     fetchAttendanceRecords();
//   }, []);

//   const fetchAttendanceRecords = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/attendance');
//       setAttendanceRecords(response.data);
//     } catch (error) {
//       console.error('Error fetching attendance records:', error);
//     }
//   };

//   const capture = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();

//     await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//     await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//     await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

//     const detections = await faceapi.detectAllFaces(imageSrc, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
//     setFaceDetection(detections);

//     // Send the image to the backend for further processing
//     try {
//       const response = await axios.post('http://localhost:5000/api/capture', { image: imageSrc });
//       console.log(response.data);

//       // After capturing attendance, fetch updated attendance records
//       fetchAttendanceRecords();
//     } catch (error) {
//       console.error('Error capturing attendance:', error);
//     }
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

//       {/* Display attendance records */}
//       <div>
//         <h2>Attendance Records</h2>
//         <ul>
//           {attendanceRecords.map((record) => (
//             <li key={record._id}>
//               {record.user} - {new Date(record.timestamp).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WebcamComponent;


// AttendanceRecordComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceRecordComponent = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Fetch attendance records when the component mounts
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance');
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <ul>
        {attendanceRecords.map((record) => (
          <li key={record._id}>
            {record.user} - {new Date(record.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceRecordComponent;
