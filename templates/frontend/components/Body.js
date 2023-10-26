"use client";
import React, { useState } from 'react';
import DocxArranger from './DocxArranger';
import ButtonSubmit from './ButtonSubmit';
import Result from './Result';
import AnalysisContainer from './AnalysisContainer';
import SignificantTerms from './SignificantTerms';
import FileUploadComponent  from "@/components/FileUpload";

export default function Body() {
  const [fileText, setFileText] = useState('');
  const [resume, setResume] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleResume = (text) => {
    setResume(text);
  };

  const handleFileTextChange = (text) => {
    setFileText(text);
  };

  const handleIdentifyKeys = () => {
    setShowResult(true);
  };

  return (
    <div className="p-8 h-screen bg-gradient-to-br from-purple-800 to-purple-200">
      <div className="text-md">
        <div className="flex flex-row">
          <div className="w-full pr-4">
            <DocxArranger setShowButton={setShowButton} />
            {showButton && (
              <ButtonSubmit text="Identify Keys" onClick={handleIdentifyKeys} />
            )}
          </div>
          <div className="w-full">
            <Result>
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
