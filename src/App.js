import React, { useEffect, useState } from 'react';
import { Document, HeadingLevel } from 'mammoth';
import { generateSlides } from 'react-pptx-generator';

const WordToPptx = () => {
  const [document, setDocument] = useState(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loadDocument = async () => {
      const response = await fetch('/path/to/word/document.docx');
      const text = await response.text();
      const file = new Document({ text });
      const { value: html } = await file.render();
      setDocument(html);
    };

    loadDocument();
  }, []);

  useEffect(() => {
    if (document) {
      const text = document.replace(/<[^>]+>/g, '');
      const headings = text.match(/#+ [^\n]+/g);
      const slides = [];

      headings.forEach((heading, index) => {
        const slide = {
          elements: [
            {
              type: 'text',
              text: heading.replace(/#+ (.+)/, '$1'),
              options: {
                x: 1,
                y: 1.5,
                width: 9,
                height: 1,
                fontSize: 48,
                fontFamily: 'Arial',
                color: '#000000',
                bold: true,
                background:blue,
                alignment: 'left',
              },
            },
          ],
        };

        if (index % 2 === 0) {
          slide.elements.push({
            type: 'image',
            image: 'https://example.com/image1.png',
            options: {
              x: 10,
              y: 2,
              width: 3,
              height: 3,
            },
          });
        } else {
          slide.elements.push({
            type: 'icon',
            icon: <Icon icon="check" size={48} />,
            options: {
              x: 10,
              y: 2,
              width: 1,
              height: 1,
            },
          });
        }

        slides.push(slide);
      });

      setSlides(slides);
    }
  }, [document]);

  return (
    <div>
      {slides.length > 0 && (
        <button onClick={() => generateSlides(slides, 'output.pptx')}>
          Download PPTX
        </button>
      )}
      {slides.length === 0 && <div>Loading...</div>}
    </div>
  );
};

export default WordToPptx;