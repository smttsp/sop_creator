"use client";
import React, { useState } from 'react';
import DocxArranger from './DocxArranger';
import ButtonSubmit from './ButtonSubmit';
import Result from './Result';
import AnalysisContainer from './AnalysisContainer';
import SignificantTerms from './SignificantTerms';
import ApryseEditor from './ApryseEditor';
import Button from './Button';

export default function Body() {
  const [fileText, setFileText] = useState('');
  const [resume, setResume] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const handleResume = (text) => {
    setResume(text);
  };

  const handleFileTextChange = (text) => {
    setFileText(text);
  };

  const handleIdentifyKeys = (pass) => {
    if (pass){
      setShowResult(true);
    }
    
  };

  const handleShowEditor = (e) => {
    e.preventDefault();
    setShowEditor(true);
    console.log("showEditor"); // Log the showEditor value after it's updated
  };

  return (
    <div className="p-4 h-auto bg-gradient-to-br from-purple-800 to-purple-200">
      <div className="">
        <div className="grid grid-cols-3">
          <div className="w-full mx-2 pr-4 col-span-2 min-h-96">
            <Button
              text="Upload Resume"
              customClass="bg-purple-900 w-1/2 shadow-xl  
                            text-white py-2 px-4 rounded cursor-pointer"
              onClick={handleShowEditor}
            />
            {showEditor && (
              // Render the ApryseEditor component when showEditor is true
       
              <ApryseEditor text="Identify Keys" 
                            customClass ={""}
                            shower ={handleIdentifyKeys}/>
              
             
            )} 
          
          </div>
          <div className="w-full ">
            <Result className="min-h-150 h-auto">
              {showResult && (
                <AnalysisContainer>
                  <SignificantTerms />
                </AnalysisContainer>
              )}
            </Result>
          </div>
        </div>
      </div>
    </div>
  );
}
