// // import React from 'react'
// // import Form from './components/Form'

// // const App = () => {
// //   return (
// //     <div>


// //     <Form/>

// //     </div>
// //   )
// // }

// // export default App

// import React, { useState } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';

// const App = () => {
//   const [cnic, setCnic] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [image, setImage] = useState(null);

//   const webcamRef = React.useRef(null);

//   const capture = React.useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//   }, [webcamRef, setImage]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     // Send data to backend
//     const formData = new FormData();
//     formData.append('cnic', cnic);
//     formData.append('name', name);
//     formData.append('phone', phone);
//     formData.append('image', image);
//     try {
//       await axios.post('/api/data', formData);
//       alert('Data saved successfully!');
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <input type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder="CNIC" />
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//         <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
//         <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//         <button onClick={capture}>Capture</button>
//         <br />
      
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default App;
