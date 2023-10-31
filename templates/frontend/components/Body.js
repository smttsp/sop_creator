"use client";
import React, { useRef, useState } from 'react';
import Result from './Result';
import AnalysisContainer from './AnalysisContainer';
import SignificantTerms from './SignificantTerms';
import ApryseEditor from './ApryseEditor';
import Button from './Button';

export default function Body() {
  const [showResult, setShowResult] = useState(false);
  const [selectedFile, setSelectedFile] = useState('')
  const fileInputRef = useRef(null);

  const handleIdentifyKeys = (pass) => {
    if (pass){
      setShowResult(true);
    }
    
  };

    const handleUploadClick = () => {
      fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        setSelectedFile(fileURL);
       
      }
    };



  return (
    <div className="p-4 h-auto bg-gradient-to-br from-purple-800 to-purple-200">
      <div className="">
        <div className="grid grid-cols-3">
          <div className="w-full mx-2 pr-4 col-span-2 min-h-96">
            {!selectedFile && (<Button
              text="Upload Resume"
              customClass="bg-purple-900 w-1/2 shadow-xl  
                            text-white py-2 px-4 rounded cursor-pointer"
              onClick={handleUploadClick}
            />)
           }
            <input
              type='file'
              accept='.docx'
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={fileInputRef}/>
            {selectedFile && (
              // Render the ApryseEditor component when showEditor is true
       
              <ApryseEditor text="Identify Keys" 
                            customClass ={""}
                            shower ={handleIdentifyKeys}
                            selectedFile={selectedFile}/>
              
             
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
