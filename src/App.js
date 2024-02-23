// import React, { useState } from 'react';
// import mammoth from 'mammoth';
// import { create, save } from 'react-native-file-viewer';
// import PptxGenJS from 'pptxgenjs';
// import { saveAs } from 'file-saver';

// const App = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Read the uploaded file
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const arrayBuffer = e.target.result;
//       const text = await mammoth.extractRawText({ arrayBuffer });
//       const textContent = text.value;

//       // Use AI-powered styling techniques to create PowerPoint slides
//       const slides = createSlides(textContent);

//       // Use AI-powered image analysis to find relevant images and insert them into slides
//       slides.forEach((slide) => {
//         const imageUrl = findImageForSlide(slide);
//         slide.addImage({ url: imageUrl, x: 1, y: 1, w: 10, h: 5 });
//       });

//       // Use a library like react-pptx to display and download the PowerPoint file
//       downloadSlides(slides);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const createSlides = (textContent) => {
//     // Logic to create slides from text content
//     const pptx = new PptxGenJS();
//     pptx.addSlidesForRawText(textContent);
//     return pptx;
//   };

//   const findImageForSlide = (slide) => {
//     // Logic to find and return an image URL for the slide
//     return 'https://example.com/image.jpg';
//   };

//   const downloadSlides = (slides) => {
//     // Logic to download the slides
//     const pptxBlob = slides.writeFile({ type: 'blob' });
//     saveAs(pptxBlob, 'convertedSlides.pptx');
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Convert to Slides</button>
//       </form>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import mammoth from 'mammoth'; // Import mammoth for extracting text from Word files
import { createSlides, findImageForSlide, downloadSlides } from './utils'; // Import utility functions

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }

    // Use mammoth to extract text content from the Word file
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const result = await mammoth.extractRawText({ arrayBuffer: reader.result });
      const textContent = result.value;

      // Use AI-powered styling techniques to create PowerPoint slides
      const slides = createSlides(textContent);

      // Use AI-powered image analysis to find relevant images and insert them into slides
      slides.forEach((slide) => {
        const imageUrl = findImageForSlide(slide);
        slide.addImage({ url: imageUrl, x: 1, y: 1, w: 10, h: 5 });
      });

      // Use a library like react-pptx to display and download the PowerPoint file
      downloadSlides(slides);
    };
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Convert to Slides</button>
      </form>
    </div>
  );
};

export default App;
