import React, { useRef, useState, useEffect } from 'react';
import Result from './Result';
import AnalysisContainer from './AnalysisContainer';
import SignificantTerms from './SignificantTerms';
import ApryseEditor from './ApryseEditor';
import Button from './Button';
import TextAnimation from './TextAnimation';

export default function Body() {
<<<<<<< Updated upstream
    const [showResult, setShowResult] = useState(false);
    const [selectedFile, setSelectedFile] = useState('')
    const fileInputRef = useRef(null);

    const handleIdentifyKeys = (pass) => {
        if (pass) {
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
        <div className="p-4 h-auto bg-gradient-to-br from-purple-900 to-pink-200">
            <div className="">
                <TextAnimation text="Hello, I am AI tool to Assist you to build your carier"
                               speed={100}/>
                <div className="grid grid-cols-2">
                    <div className="w-full mx-2 min-h-96">
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
                            style={{display: 'none'}}
                            ref={fileInputRef}/>
                        {selectedFile && (
                            // Render the ApryseEditor component when showEditor is true

                            <ApryseEditor text="Identify Keys"
                                          customClass={""}
                                          shower={handleIdentifyKeys}
                                          selectedFile={selectedFile}/>

                        )}

                    </div>
                    <div className="w-full ">
                        <Result className="min-h-150 h-auto">
                            {showResult && (
                                <AnalysisContainer>
                                    <SignificantTerms/>
                                </AnalysisContainer>
                            )}
                        </Result>
                    </div>
                </div>
            </div>
=======
  const [showResult, setShowResult] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const fileInputRef = useRef(null);

  const handleIdentifyKeys = (pass) => {
    if (pass) {
      setShowResult(true);
      scrollToMiddle(); // Scroll to the middle of the viewport when showResult is true
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

  const scrollToMiddle = () => {
    // Calculate the position to scroll to the middle of the viewport
    const middlePosition = window.scrollY + window.innerHeight / 2;

    // Scroll to the middle of the viewport with a smooth behavior
    window.scrollTo({
      top: middlePosition,
      behavior: 'smooth',
    });
  };

  return (
    <div className="p-4 h-auto bg-gradient-to-br from-purple-900 to-pink-200">
      <div className="">
        <TextAnimation text="Hello, I am an AI tool to assist you in building your career" speed={90} />
        <div className="grid grid-cols-5">
          <div className="w-full mx-2 pr-4 col-span-3 min-h-96">
            {!selectedFile && (
              <Button
                text="Upload Resume"
                customClass="bg-purple-900 w-1/2 shadow-xl text-white py-2 px-4 rounded cursor-pointer"
                onClick={handleUploadClick}
              />
            )}
            <input
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            {selectedFile && (
              <ApryseEditor
                text="Identify Keys"
                customClass={""}
                shower={handleIdentifyKeys}
                selectedFile={selectedFile}
              />
            )}
          </div>
          <div className="w-full col-span-2">
            <Result className="min-h-150 h-auto">
              {showResult && (
                <AnalysisContainer>
                  <SignificantTerms />
                </AnalysisContainer>
              )}
            </Result>
          </div>
>>>>>>> Stashed changes
        </div>
    );
}
