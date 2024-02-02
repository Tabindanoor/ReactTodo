
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const App = () => {
// //   const [image, setImage] = useState(null);
// //   const [attendanceRecords, setAttendanceRecords] = useState([]);

// //   useEffect(() => {
// //     fetchAttendanceRecords();
// //   }, []);

// //   const fetchAttendanceRecords = async () => {
// //     try {
// //       const response = await axios.get('/api/attendance');
// //       setAttendanceRecords(response.data);
// //     } catch (error) {
// //       console.error('Error fetching attendance records:', error);
// //     }
// //   };

// //   const handleImageCapture = async () => {
// //     const formData = new FormData();
// //     formData.append('image', image);

// //     try {
// //       await axios.post('/api/capture', formData);
// //       fetchAttendanceRecords();
// //     } catch (error) {
// //       console.error('Error capturing image:', error);
// //     }
// //   };

// //   return (
// //     <div className='App'>
// //       <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
// //       <button onClick={handleImageCapture}>Capture Image</button>

// //       <h2>Attendance Records</h2>
// //       <ul>
// //         {attendanceRecords.map((record) => (
// //           <li key={record._id}>{record.user} - {record.timestamp}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default App;
// // App.js

// import React from 'react';
// import WebcamComponent from './components/WebcamComponent';

// const App = () => {
//   return (
//     <div>
//       <h1>Face Recognition Attendance System</h1>
  
//       <WebcamComponent />
//     </div>
//   );
// };

// export default App;


// Import necessary components and libraries
import React, { useState } from 'react';
import Form from './components/Form';
import Camera from './components/Camera';
import AttendanceStatus from './components/AttendanceStatus';

function App() {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState('');

  // Handle form submission
  const handleSubmit = (userData) => {
   
    setUser(userData);
  };

  // Handle image capture and attendance marking
  const handleCapture = (capturedImage) => {
    
    setStatus('Attendance marked');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      <Camera onCapture={handleCapture} />
      <AttendanceStatus status={status} />
    </div>
  );
}

export default App;

