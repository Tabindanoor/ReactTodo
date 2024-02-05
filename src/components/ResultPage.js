// ResultPage.js
import React from 'react';

const ResultPage = ({ result }) => {
  return (
    <div>
      <h2>Attendance Result</h2>
      {result === 'Matched' ? (
        <div>
          <p>Congratulations! Attendance Matched.</p>
        </div>
      ) : (
        <div>
          <p>Sorry! Attendance Not Matched.</p>
        </div>
      )}
      <p>{result === 'Matched' ? 'Done' : 'Not Matched'}</p>
    </div>
  );
};

export default ResultPage;
