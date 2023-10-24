"use client";
import React, { useRef, useState } from 'react';
import mammoth from 'mammoth';

export default function Button(props) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [fileText, setFileText] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Show a loading indicator while processing the file.
      setUploading(true);

      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileContent = e.target.result;

        try {
          const result = await mammoth.extractRawText({ arrayBuffer: fileContent });

          
          setFileText(result.value);


          if (props.onFileTextChange) {
            props.onFileTextChange(result.value);
          }
        } catch (error) {
          console.error('Error reading the .docx file:', error);
        }

      
        setUploading(false);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    <div className='flex'>
      <button
        onClick={handleButtonClick}
        className="bg-purple-900 flex-auto w-1/2 h-16 hover-bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg focus-outline-none focus-shadow-outline-blue active-bg-blue-800"
      >
        {props.name}
      </button>
      <input
        type="file"
        accept=".docx"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        ref={fileInputRef}
      />
      {uploading && <p>Processing...</p>}
    </div>
  );
}
