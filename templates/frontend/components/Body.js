"use client";
import React, { useState } from 'react';
import Jobds from './Jobds';
import Button from './Button';
import Recomendation from './Recomendation';
import ResumeContainer from './ResumeContainer';

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
    <div className="p-8 h-screen bg-gradient-to-br from-purple-800 to-purple-200
    ">
      <div className="text-md">
        <div className="flex flex-row">
          <div className="w-full pr-4">

            <ResumeContainer>
              <Button className= "w-full" name="Upload Resume" onFileTextChange={handleFileTextChange} />
              {fileText && <Jobds description={fileText} />}
            </ResumeContainer>
           
            
          </div>
          
          <div className="w-full">
            <ResumeContainer></ResumeContainer>
          </div>
         
        </div>
        
      </div>
    </div>
  );
}
