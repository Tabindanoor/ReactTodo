// // Form.js
// import React, { useState } from 'react';
// import WebcamCapture from './WebcamCapture';

// const Form = ({ submitForm }) => {
//   const [formData, setFormData] = useState({
//     ID: '',
//     Name: '',
//     Class: '',
//     CNIC: '',
//     Picture: null,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCapture = (picture) => {
//     setFormData({ ...formData, Picture: picture });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     submitForm(formData);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded p-8 mt-10 shadow-md">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ID">
//             ID:
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             name="ID"
//             value={formData.ID}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
//             Name:
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             name="Name"
//             value={formData.Name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Class">
//             Class:
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             name="Class"
//             value={formData.Class}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CNIC">
//             CNIC:
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             name="CNIC"
//             value={formData.CNIC}
//             onChange={handleChange}
//           />
//         </div>

//         <WebcamCapture onCapture={handleCapture} />

//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="submit"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Form;


// Form.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const Form = ({ submitForm }) => {
  const [formData, setFormData] = useState({
    ID: '',
    Name: '',
    Class: '',
    CNIC: '',
    Picture: null,
  });

  const webcamRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, Picture: imageSrc });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
    submitForm(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-8 mt-10 shadow-md">
      <form onSubmit={handleSubmit}>
        {/* Your form fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ID">
            ID:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
          />
        </div>

        {/* Other fields... */}

        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />

        <button onClick={handleCapture} className='bg-pink-200 m-2 p-3'>Capture Photo</button>

        {formData.Picture && <img src={formData.Picture} alt="Captured" />}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;


