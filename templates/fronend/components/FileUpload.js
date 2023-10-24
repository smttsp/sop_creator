import React from 'react';

export default function FileUploadComponent({ file }) {
  const handleUpload = () => {
    if (file) {
     
      console.log('Uploading file:', file);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div>
      <h2>File Upload Component</h2>
      {file ? (
        <div>
          <p>Selected File: {file.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      ) : (
        <p>No file selected.</p>
      )}
    </div>
  );
}
