"use client";
import React, { useState } from 'react';
import Jobds from './Jobds';
import Button from './Button';
import Recomendation from './Recomendation';

export default function Body() {
  const [fileText, setFileText] = useState('');
  const [resume, setResume] = useState('')
 
  const handleResume = (text) => {
    setResume(text);
  };

  const handleFileTextChange = (text) => {
    setFileText(text);
  };

  return (
    <div className="p-8 h-screen bg-gray-300">
      <div className="text-md">
        <div className="flex flex-row">
          <div className="w-full pr-4">
            <Jobds description={fileText} />
            <Button name="Upload Job description" onFileTextChange={handleFileTextChange} />
          </div>
          
          <div className="w-full">
            <Recomendation/>
          </div>
         
        </div>
        <div>
            <br/>
          <Button  className = "w-full"name="Upload Resume" onFileTextChange={handleResume} />
          </div>
      </div>
    </div>
  );
}
