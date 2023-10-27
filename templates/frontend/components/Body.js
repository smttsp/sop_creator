"use client";
import React, {useRef, useState} from 'react';

// import DocxArranger from './DocxArranger';
// import ButtonSubmit from './ButtonSubmit';
import Result from './Result';
import AnalysisContainer from './AnalysisContainer';
import SignificantTerms from './SignificantTerms';
import ApryseEditor from './ApryseEditor';
import Button from './Button';


function UploadSection({showEditor, handleIdentifyKeys, handleFileUpload}) {
    const [docxFile, setDocxFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setDocxFile(file);
        console.log("file", file)
        handleFileUpload(file); // Pass the file to the parent component's function for further processing
    };

    const handleUploadResumeClick = () => {
        // Trigger the file input when the "Upload Resume" button is clicked
        fileInputRef.current.click();
    };

    return (
        <div className="w-full mx-2 pr-4 col-span-2 min-h-96">
            <input
                type="file"
                onChange={handleFileChange}
                accept=".docx"
                ref={fileInputRef}
                style={{display: 'none'}} // Hide the file input
            />
            {docxFile && <p>Selected DOCX file: {docxFile.name}</p>}
            <Button
                text="Upload Resume"
                customClass="bg-purple-900 w-1/2 shadow-xl text-white py-2 px-4 rounded cursor-pointer"
                onClick={handleUploadResumeClick} // Trigger file input when this button is clicked
            />
            {showEditor && (
                <ApryseEditor text="Identify Keys" customClass={""} shower={handleIdentifyKeys}/>
            )}
        </div>
    );
}


function ResultsSection({showResult}) {
    return (
        <div className="w-full">
            <Result className="min-h-150 h-auto">
                {showResult && (
                    <AnalysisContainer>
                        <SignificantTerms/>
                    </AnalysisContainer>
                )}
            </Result>
        </div>
    );
}


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
        if (pass) {
            setShowResult(true);
        }
    };

    // this will be used when saving the file into GCP
    const handleFileUpload = (file) => {
        // console.log("Uploaded file:", file);
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
                    <UploadSection showEditor={showEditor} handleIdentifyKeys={handleIdentifyKeys}
                                   handleFileUpload={handleFileUpload}/>

                    <ResultsSection showResult={showResult}/>
                </div>
            </div>
        </div>
    );
}
